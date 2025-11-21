import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function saveUploadedFile(
  file: File,
  folder: string
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads", folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const ext = file.name.split(".").pop();
    const filename = `${timestamp}-${random}.${ext}`;

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return relative path for database storage
    return `/uploads/${folder}/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Failed to save uploaded file");
  }
}
