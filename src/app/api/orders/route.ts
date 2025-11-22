import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail, generateOrderConfirmationEmail, generateAdminOrderNotificationEmail } from "@/lib/email";

interface OrderItemInput {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItemInput[];
  total: number;
  source: "site" | "whatsapp" | "other";
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();

    const { customerName, customerEmail, customerPhone, items, total, source, notes } = body;

    if (!customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        total,
        source,
        notes,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });


    try {
      const emailContent = generateOrderConfirmationEmail(
        customerName,
        items,
        total,
        source
      );

      await sendEmail({
        to: customerEmail,
        subject: `Order Confirmation - Order #${order.id}`,
        html: emailContent,
      });
    } catch (emailError) {
      console.error("Failed to send customer confirmation email:", emailError);
    }


    const adminEmail = process.env.ADMIN_EMAIL || process.env.FORMSPREE_EMAIL;
    if (adminEmail) {
      try {
        const adminEmailContent = generateAdminOrderNotificationEmail(
          customerName,
          customerEmail,
          customerPhone,
          items,
          total,
          source,
          order.id
        );

        await sendEmail({
          to: adminEmail,
          subject: `[NEW ORDER] #${order.id} - ${customerName}`,
          html: adminEmailContent,
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
    }

    return NextResponse.json(
      { order, message: "Order created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ORDERS_POST]", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source");
    const status = searchParams.get("status");

    const where: any = {};

    if (source) {
      where.source = source;
    }

    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
