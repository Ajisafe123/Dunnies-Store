import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

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
