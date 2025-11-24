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

    // On Render, use the project root. On local, use public folder
    const baseDir = process.env.NODE_ENV === 'production' 
      ? join(process.cwd(), '.uploads')  // Render persistent storage
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

    return `/uploads/${folder}/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Failed to save uploaded file");
  }
}
