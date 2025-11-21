import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/uploadHandler";

export async function GET(request: NextRequest) {
  try {
    const gifts = await prisma.gift.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ gifts });
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
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await saveUploadedFile(imageFile, "gifts");
    }

    const gift = await prisma.gift.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        imageUrl: imageUrl || "",
      },
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
