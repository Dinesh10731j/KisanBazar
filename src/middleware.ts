import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface CustomPayload extends JWTPayload {
  role?: "admin" | "farmer" | "user";
}

async function verifyToken(token: string): Promise<CustomPayload | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify<CustomPayload>(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Require token for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = await verifyToken(token);
    console.log("Decoded JWT:", decoded);
    if (!decoded || !decoded.role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = decoded?.role

    if (
      (pathname.startsWith("/dashboard/admin") && role !== "admin") ||
      (pathname.startsWith("/dashboard/farmer") && role !== "farmer") ||
      (pathname.startsWith("/dashboard/customer") && role !== "user")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
