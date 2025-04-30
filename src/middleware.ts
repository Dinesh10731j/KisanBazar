import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Map roles to their corresponding dashboard paths
const roleRouteMap: Record<string, string> = {
  admin: "admin",
  user: "customer",
  farmer: "farmer",
};

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    const userRole = payload.role as string;

    const expectedPath = `/dashboard/${roleRouteMap[userRole]}`;

    // If visiting just /dashboard, redirect to proper role-based dashboard
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(expectedPath, request.url));
    }

    // If user is visiting wrong dashboard path
    if (!pathname.startsWith(expectedPath)) {
      return NextResponse.redirect(new URL(expectedPath, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/dashboard/:path*"],
};
