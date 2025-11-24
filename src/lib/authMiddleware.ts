import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";

/**
 * Verify if user is authenticated by checking token and user existence
 */
export async function verifyUserAuth(request: NextRequest) {
  try {
    // Get token from cookie or Authorization header
    const token = request.cookies.get("auth_token")?.value ||
      request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return {
        isAuthenticated: false,
        user: null,
        error: "No authentication token provided",
      };
    }

    // Decode token (assuming it's in format: userId)
    // In production, you should use proper JWT verification
    const userId = token;

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    if (!user) {
      return {
        isAuthenticated: false,
        user: null,
        error: "User not found or token invalid",
      };
    }

    return {
      isAuthenticated: true,
      user,
      error: null,
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return {
      isAuthenticated: false,
      user: null,
      error: "Authentication verification failed",
    };
  }
}

/**
 * Verify and return unauthorized response
 */
export function unauthorizedResponse(message: string = "Unauthorized") {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}
