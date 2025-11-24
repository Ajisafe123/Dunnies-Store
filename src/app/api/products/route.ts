import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/uploadHandler";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const priority = searchParams.get("priority");

    const where: any = {};
    if (priority) where.priority = priority;

    const products = await prisma.product.findMany({
      where,
      include: { 
        category: true,
        comments: true,
        likes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Debug: Log first product to see structure
    if (products.length > 0) {
      console.log("[API] First product:", {
        id: products[0].id,
        name: products[0].name,
        imageUrl: products[0].imageUrl,
        imageUrls: products[0].imageUrls,
      });
    }

    const productsWithRatings = products.map((product: any) => {
      const ratings = product.comments.map((c: any) => c.rating);
      const averageRating = ratings.length > 0 
        ? Math.round((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) * 10) / 10
        : 0;

      // Map imageUrls array to image (first) and images (all)
      // Handle null imageUrl from existing products
      const imageUrls = Array.isArray(product.imageUrls) && product.imageUrls.length > 0
        ? product.imageUrls
        : (product.imageUrl && typeof product.imageUrl === 'string')
        ? [product.imageUrl]
        : [];

      return {
        ...product,
        image: imageUrls[0] || "",
        images: imageUrls,
        imageUrl: imageUrls[0] || product.imageUrl || "",
        averageRating,
        totalComments: product.comments.length,
        totalLikes: product.likes.length,
      };
    });

    return NextResponse.json({ products: productsWithRatings });
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
        categoryId: formData.get("categoryId"),
        priority: formData.get("priority"),
        images: formData.getAll("images"),
      };
    } else {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const { name, description, price, imageUrl, categoryId, priority, images } = body;

    console.log("[PRODUCTS_POST] Received:", {
      name,
      imageUrl,
      imagesCount: images?.length || 0,
      images: images?.map((img: any) => ({
        name: img.name || img.filename,
        size: img.size,
        type: img.type,
      })),
    });

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
    };
    
    // Only include categoryId if it has a valid value
    if (categoryId && String(categoryId).trim() && String(categoryId) !== "null") {
      productData.categoryId = categoryId;
    }
    
    if (priority) productData.priority = priority;

    // Handle multiple images
    if (images && Array.isArray(images) && images.length > 0) {
      const processedImages: string[] = [];
      for (const image of images) {
        if (image instanceof File) {
          const uploadedUrl = await saveUploadedFile(image, "products");
          console.log(`[PRODUCTS_POST] Uploaded image: ${image.name} -> ${uploadedUrl}`);
          if (uploadedUrl) {
            processedImages.push(uploadedUrl);
          }
        }
      }
      if (processedImages.length > 0) {
        productData.imageUrls = processedImages;
        // Set imageUrl to first image for backward compatibility
        productData.imageUrl = processedImages[0];
        console.log("[PRODUCTS_POST] Setting imageUrls:", processedImages);
      }
    } else if (imageUrl && String(imageUrl).trim()) {
      // If no images uploaded but imageUrl provided, use it
      productData.imageUrl = imageUrl;
    }
    // imageUrl is now optional, so we don't set it to empty string as fallback

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
