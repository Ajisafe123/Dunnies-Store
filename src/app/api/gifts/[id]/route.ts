import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/uploadHandler";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const gift = await prisma.gift.findUnique({
      where: { id },
    });

    if (!gift) {
      return NextResponse.json(
        { error: "Gift not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ gift });
  } catch (error) {
    console.error("[GIFTS_GET]", error);
    return NextResponse.json(
      { error: "Unable to fetch gift" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contentType = request.headers.get("content-type");
    let body: any = {};

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string,
        imageFile: formData.get("image") as File | null,
      };
    } else {
      body = await request.json();
    }

    const { name, description, price, imageFile } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    let imageUrl = undefined;
    if (imageFile) {
      imageUrl = await saveUploadedFile(imageFile, "gifts");
    }

    const updateData: any = {
      name,
      description: description || "",
      price: parseFloat(price),
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const gift = await prisma.gift.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ gift });
  } catch (error) {
    console.error("[GIFTS_PUT]", error);
    return NextResponse.json(
      { error: "Unable to update gift" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const gift = await prisma.gift.delete({
      where: { id },
    });

    return NextResponse.json({ gift });
  } catch (error) {
    console.error("[GIFTS_DELETE]", error);
    return NextResponse.json(
      { error: "Unable to delete gift" },
      { status: 500 }
    );
  }
}
