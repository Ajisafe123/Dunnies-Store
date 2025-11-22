import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ReplyRequest {
  commentId: string;
  userId: string;
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Please login to reply", code: "UNAUTHENTICATED" },
        { status: 401 }
      );
    }

    const body: ReplyRequest = await request.json();
    const { commentId, userId, text } = body;

    if (!commentId || !userId || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = await prisma.productComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    const reply = await prisma.commentReply.create({
      data: {
        commentId,
        userId,
        text,
      },
      include: {
        user: {
          select: { id: true, fullName: true },
        },
      },
    });

    return NextResponse.json({ reply }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reply" }, { status: 500 });
  }
}
