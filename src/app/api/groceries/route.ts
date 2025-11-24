import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/uploadHandler";

export async function GET(request: NextRequest) {
  try {
    const groceries = await prisma.grocery.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Fetch all comments and likes for these groceries
    const groceryIds = groceries.map((g: any) => g.id);
    const allComments = await prisma.productComment.findMany({
      where: { productId: { in: groceryIds } },
    });
    const allLikes = await prisma.productLike.findMany({
      where: { productId: { in: groceryIds } },
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

    const groceriesWithProcessedImages = groceries.map((grocery: any) => {
      const groceryComments = commentsMap.get(grocery.id) || [];
      const groceryLikes = likesMap.get(grocery.id) || [];

      // Map imageUrls array to image (first) and images (all)
      const imageUrls = Array.isArray(grocery.imageUrls) && grocery.imageUrls.length > 0
        ? grocery.imageUrls
        : (grocery.imageUrl && typeof grocery.imageUrl === 'string')
        ? [grocery.imageUrl]
        : [];

      // Calculate average rating
      const ratings = (groceryComments as any[]).map((c: any) => c.rating);
      const averageRating = ratings.length > 0 
        ? Math.round((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) * 10) / 10
        : 0;

      return {
        ...grocery,
        image: imageUrls[0] || "",
        images: imageUrls,
        imageUrl: imageUrls[0] || grocery.imageUrl || "",
        averageRating,
        totalComments: groceryComments.length,
        totalLikes: groceryLikes.length,
      };
    });

    return NextResponse.json({ groceries: groceriesWithProcessedImages }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error("[GROCERIES_GET]", error);
    return NextResponse.json(
      { error: "Unable to fetch groceries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");
    let body: any = {};

    if (contentType?.includes("application/json")) {
      body = await request.json();
    } else if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        imageUrl: formData.get("imageUrl"),
        images: formData.getAll("images"),
      };
    } else {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const { name, description, price, imageUrl, images } = body;

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: "Name, description, and price are required" },
        { status: 400 }
      );
    }

    const groceryData: any = {
      name,
      description,
      price: parseFloat(price),
    };

    // Handle multiple images
    if (images && Array.isArray(images) && images.length > 0) {
      const processedImages: string[] = [];
      for (const image of images) {
        if (image instanceof File) {
          const uploadedUrl = await saveUploadedFile(image, "groceries");
          if (uploadedUrl) {
            processedImages.push(uploadedUrl);
          }
        }
      }
      if (processedImages.length > 0) {
        groceryData.imageUrls = processedImages;
        // Set imageUrl to first image for display
        groceryData.imageUrl = processedImages[0];
      }
    } else if (imageUrl && String(imageUrl).trim()) {
      // If no images uploaded but imageUrl provided, use it
      groceryData.imageUrl = imageUrl;
    }

    const grocery = await prisma.grocery.create({
      data: groceryData,
    });

    return NextResponse.json({ grocery }, { status: 201 });
  } catch (error) {
    console.error("[GROCERIES_POST]", error);
    return NextResponse.json(
      { error: "Unable to create grocery" },
      { status: 500 }
    );
  }
}
