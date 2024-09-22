import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./utils/cookieUtils";

export function middleware(req: NextRequest): NextResponse {
  if (req.nextUrl.pathname.startsWith("/login")) {
    return sessionCheckMiddleware(req);
  }

  const token = getCookie("token");
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup/:path*"],
};

export const sessionCheckMiddleware = (req: NextRequest): NextResponse => {
  if (req.nextUrl.pathname.startsWith("/login")) {
    const token = getCookie("token");
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};
