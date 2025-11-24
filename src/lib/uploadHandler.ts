import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function saveUploadedFile(
  file: File | Blob,
  folder: string
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // On Render production, use .uploads folder (persistent storage)
    // On local/dev, use public/uploads folder
    const baseDir = process.env.NODE_ENV === 'production' 
      ? join(process.cwd(), '.uploads')
      : join(process.cwd(), 'public', 'uploads');
    
    const uploadDir = join(baseDir, folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    
    const filename = `${timestamp}-${random}.${
      (file as File).name?.split(".").pop() || "jpg"
    }`;

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return API route URL that works on both local and production
    // On production (Render), files are served via /api/uploads/[...path]
    // On local dev, files are served directly from public folder
    return `/api/uploads/${folder}/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Failed to save uploaded file");
  }
}
