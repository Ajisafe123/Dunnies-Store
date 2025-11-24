import { mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function ensureUploadsDirectory() {
  if (process.env.NODE_ENV === 'production') {
    const uploadDir = join(process.cwd(), '.uploads');
    if (!existsSync(uploadDir)) {
      try {
        await mkdir(uploadDir, { recursive: true });
        console.log('[STARTUP] Created .uploads directory');
      } catch (error) {
        console.error('[STARTUP] Failed to create .uploads directory:', error);
      }
    }
  }
}
