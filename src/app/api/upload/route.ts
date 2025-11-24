import { NextRequest, NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/uploadHandler";
import { mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// Ensure uploads directories exist on startup
async function ensureDirectories() {
  if (process.env.NODE_ENV === 'production') {
    const baseDir = join(process.cwd(), '.uploads');
    if (!existsSync(baseDir)) {
      try {
        await mkdir(baseDir, { recursive: true });
        console.log('[UPLOAD] Created .uploads directory');
      } catch (error) {
        console.error('[UPLOAD] Failed to create .uploads directory:', error);
      }
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure directories exist
    await ensureDirectories();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    const url = await saveUploadedFile(file, folder);
    console.log(`[UPLOAD] File uploaded: ${url}`);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("[UPLOAD]", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
