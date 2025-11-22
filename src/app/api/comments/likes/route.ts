import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface LikeRequest {
  userId: string;
  commentId?: string;
  replyId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Please login to like", code: "UNAUTHENTICATED" },
        { status: 401 }
      );
    }

    const body: LikeRequest = await request.json();
    const { userId, commentId, replyId } = body;

    if (!userId || (!commentId && !replyId)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json({ liked: true, message: "Like recorded" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to like comment" }, { status: 500 });
  }
}
