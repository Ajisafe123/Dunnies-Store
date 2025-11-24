import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface LikeRequest {
  userId: string;
  commentId?: string;
  replyId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LikeRequest = await request.json();
    const { userId, commentId, replyId } = body;

    if (!userId || (!commentId && !replyId)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists and is logged in
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found - Please login to like" },
        { status: 401 }
      );
    }

    if (commentId) {
      // Handle comment like - use findFirst for compound keys
      const existingLike = await prisma.commentLike.findFirst({
        where: {
          userId,
          commentId,
          replyId: null,
        },
      });

      if (existingLike) {
        // Unlike
        await prisma.commentLike.delete({
          where: { id: existingLike.id },
        });

        const likeCount = await prisma.commentLike.count({
          where: { commentId },
        });

        return NextResponse.json(
          { liked: false, likeCount },
          { status: 200 }
        );
      } else {
        // Like
        await prisma.commentLike.create({
          data: {
            userId,
            commentId,
          },
        });

        const likeCount = await prisma.commentLike.count({
          where: { commentId },
        });

        return NextResponse.json(
          { liked: true, likeCount },
          { status: 200 }
        );
      }
    } else if (replyId) {
      // Handle reply like
      const existingLike = await prisma.commentLike.findFirst({
        where: {
          userId,
          replyId,
          commentId: null,
        },
      });

      if (existingLike) {
        // Unlike
        await prisma.commentLike.delete({
          where: { id: existingLike.id },
        });

        const likeCount = await prisma.commentLike.count({
          where: { replyId },
        });

        return NextResponse.json(
          { liked: false, likeCount },
          { status: 200 }
        );
      } else {
        // Like
        await prisma.commentLike.create({
          data: {
            userId,
            replyId,
          },
        });

        const likeCount = await prisma.commentLike.count({
          where: { replyId },
        });

        return NextResponse.json(
          { liked: true, likeCount },
          { status: 200 }
        );
      }
    }

    return NextResponse.json({ liked: true, message: "Like recorded" }, { status: 200 });
  } catch (error) {
    console.error("Error liking comment:", error);
    return NextResponse.json({ error: "Failed to like comment" }, { status: 500 });
  }
}
