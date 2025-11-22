import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

const AUTH_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin routes protection
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/manage-") || pathname.startsWith("/admin-settings") || pathname.startsWith("/product-analytics")) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = jwt.verify(token, AUTH_SECRET) as TokenPayload;
      
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // User routes protection - prevent admin access to user pages unnecessarily
  if (pathname.startsWith("/settings") || pathname.startsWith("/addresses") || pathname.startsWith("/payment-methods")) {
    const token = request.cookies.get("auth_token")?.value;

    if (token) {
      try {
        const decoded = jwt.verify(token, AUTH_SECRET) as TokenPayload;
        
        if (decoded.role === "admin") {
          // Allow admin to access, but could restrict if needed
        }
      } catch (error) {
        // Token invalid, continue
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/manage-:path*",
    "/admin-settings/:path*",
    "/product-analytics/:path*",
  ],
};
