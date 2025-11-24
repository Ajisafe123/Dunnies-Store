import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const gifts = await prisma.gift.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Fetch all comments and likes for these gifts
    const giftIds = gifts.map((g: any) => g.id);
    const allComments = await prisma.productComment.findMany({
      where: { productId: { in: giftIds } },
    });
    const allLikes = await prisma.productLike.findMany({
      where: { productId: { in: giftIds } },
    });

    // Create maps for efficient lookup
    const commentsMap = new Map<string, any[]>();
    const likesMap = new Map<string, any[]>();
    
    allComments.forEach((c: any) => {
      if (!commentsMap.has(c.productId)) commentsMap.set(c.productId, []);
      commentsMap.get(c.productId)!.push(c);
    });
    
    allLikes.forEach((l: any) => {
      if (!likesMap.has(l.productId)) likesMap.set(l.productId, []);
      likesMap.get(l.productId)!.push(l);
    });

    const giftsWithProcessedImages = gifts.map((gift: any) => {
      const giftComments = commentsMap.get(gift.id) || [];
      const giftLikes = likesMap.get(gift.id) || [];

      // Map imageUrls array to image (first) and images (all)
      const imageUrls = Array.isArray(gift.imageUrls) && gift.imageUrls.length > 0
        ? gift.imageUrls
        : (gift.imageUrl && typeof gift.imageUrl === 'string')
        ? [gift.imageUrl]
        : [];

      // Calculate average rating
      const ratings = (giftComments as any[]).map((c: any) => c.rating);
      const averageRating = ratings.length > 0 
        ? Math.round((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) * 10) / 10
        : 0;

      return {
        ...gift,
        image: imageUrls[0] || "",
        images: imageUrls,
        imageUrl: imageUrls[0] || gift.imageUrl || "",
        averageRating,
        totalComments: giftComments.length,
        totalLikes: giftLikes.length,
      };
    });

    return NextResponse.json({ gifts: giftsWithProcessedImages }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error("[GIFTS_GET]", error);
    return NextResponse.json(
      { error: "Unable to fetch gifts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, imageUrls, categoryId } = body;

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: "Name, description, and price are required" },
        { status: 400 }
      );
    }

    const giftData: any = {
      name,
      description,
      price: parseFloat(price),
    };

    // Handle imageUrls array from frontend
    if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
      giftData.imageUrls = imageUrls;
      giftData.imageUrl = imageUrls[0] || imageUrl;
    } else if (imageUrl && String(imageUrl).trim()) {
      giftData.imageUrl = imageUrl;
      giftData.imageUrls = [imageUrl];
    }

    if (categoryId && String(categoryId).trim() && String(categoryId) !== "null") {
      giftData.categoryId = categoryId;
    }

    const gift = await prisma.gift.create({
      data: giftData,
    });

    return NextResponse.json({ gift }, { status: 201 });
  } catch (error) {
    console.error("[GIFTS_POST]", error);
    return NextResponse.json(
      { error: "Unable to create gift" },
      { status: 500 }
    );
  }
}
