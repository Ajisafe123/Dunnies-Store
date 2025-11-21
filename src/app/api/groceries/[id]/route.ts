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

    const grocery = await prisma.grocery.findUnique({
      where: { id },
    });

    if (!grocery) {
      return NextResponse.json(
        { error: "Grocery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ grocery });
  } catch (error) {
    console.error("[GROCERIES_GET]", error);
    return NextResponse.json(
      { error: "Unable to fetch grocery" },
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
      imageUrl = await saveUploadedFile(imageFile, "groceries");
    }

    const updateData: any = {
      name,
      description: description || "",
      price: parseFloat(price),
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const grocery = await prisma.grocery.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ grocery });
  } catch (error) {
    console.error("[GROCERIES_PUT]", error);
    return NextResponse.json(
      { error: "Unable to update grocery" },
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

    const grocery = await prisma.grocery.delete({
      where: { id },
    });

    return NextResponse.json({ grocery });
  } catch (error) {
    console.error("[GROCERIES_DELETE]", error);
    return NextResponse.json(
      { error: "Unable to delete grocery" },
      { status: 500 }
    );
  }
}
