import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const priority = searchParams.get("priority");

    const where: any = {};
    if (priority) where.priority = priority;

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return NextResponse.json(
      { error: "Unable to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, categoryId, priority } = body;

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: "Name, description, and price are required" },
        { status: 400 }
      );
    }

    const productData: any = {
      name,
      description,
      price: parseFloat(price),
      imageUrl: imageUrl || "",
      categoryId: categoryId || null,
    };
    
    // Only include priority if it's provided
    if (priority) productData.priority = priority;

    const product = await prisma.product.create({
      data: productData,
      include: { category: true },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return NextResponse.json(
      { error: "Unable to create product" },
      { status: 500 }
    );
  }
}
