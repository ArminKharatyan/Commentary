import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isAuth = !!token;
  const isOnProtectedRoute =
    req.nextUrl.pathname.startsWith("/r/") &&
    (req.nextUrl.pathname.endsWith("/submit") ||
      req.nextUrl.pathname === "/r/create");

  if (!isAuth && isOnProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/r/:path*/submit", "/r/create"],
};
