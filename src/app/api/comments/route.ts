import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface CommentRequest {
  productId: string;
  userId: string;
  text: string;
  rating?: number;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Please login to comment", code: "UNAUTHENTICATED" },
        { status: 401 }
      );
    }

    const body: CommentRequest = await request.json();
    const { productId, userId, text, rating } = body;

    if (!productId || !userId || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = await prisma.productComment.create({
      data: {
        productId,
        userId,
        text,
        rating: rating || 5,
      },
      include: {
        user: {
          select: { id: true, fullName: true },
        },
      },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const comments = await prisma.productComment.findMany({
      where: { productId },
      include: {
        user: {
          select: { id: true, fullName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
