import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard/admin",
  "/dashboard/admin/overview",
  "/dashboard/admin/manageusers",
  "/dashboard/admin/orders",
  "/dashboard/admin/settings",
  
];

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("access_token");

  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*"],
};