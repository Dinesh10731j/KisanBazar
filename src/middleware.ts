
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface CustomJWTPayload extends JWTPayload {
  user_id?: number;
  role?: "admin" | "farmer" | "user";
}

const protectedRoutes = [
  "/dashboard/admin",
  "/dashboard/farmer",
  "/dashboard/customer",
];

async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify<CustomJWTPayload>(token, secret, {
      algorithms: ["HS256"],
    });
    console.log("JWT payload:", payload);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isProtected) {
    const decoded = await verifyToken(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { role } = decoded;

    if (!role || !["admin", "farmer", "user"].includes(role)) {
      console.error("Invalid or missing role in token payload:", role);
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/dashboard/farmer") && role !== "farmer") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/dashboard/customer") && role !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}



export const config = {
  matcher: ["/dashboard/:path*"],
};