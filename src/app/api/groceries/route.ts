import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/uploadHandler";

export async function GET(request: NextRequest) {
  try {
    const groceries = await prisma.grocery.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ groceries });
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
      imageUrl = await saveUploadedFile(imageFile, "groceries");
    }

    const grocery = await prisma.grocery.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        imageUrl: imageUrl || "",
      },
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
