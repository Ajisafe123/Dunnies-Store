import { join } from "path";
import { readFile, stat } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const filepath = path.join("/");

    // Security: prevent directory traversal
    if (filepath.includes("..") || filepath.includes("//")) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    // Construct full file path
    const baseDir = process.env.NODE_ENV === 'production'
      ? join(process.cwd(), '.uploads')
      : join(process.cwd(), 'public', 'uploads');
    
    const fullPath = join(baseDir, filepath);

    // Check if file exists
    try {
      await stat(fullPath);
    } catch {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Read and serve the file
    const fileBuffer = await readFile(fullPath);
    
    // Determine content type
    let contentType = 'application/octet-stream';
    if (fullPath.endsWith('.jpg') || fullPath.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (fullPath.endsWith('.png')) {
      contentType = 'image/png';
    } else if (fullPath.endsWith('.gif')) {
      contentType = 'image/gif';
    } else if (fullPath.endsWith('.webp')) {
      contentType = 'image/webp';
    }

    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', contentType);
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    
    return response;
  } catch (error) {
    console.error("[UPLOADS_GET]", error);
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    );
  }
}
