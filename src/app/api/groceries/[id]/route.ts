import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

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
