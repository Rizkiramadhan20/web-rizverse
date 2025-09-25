import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip untuk file statis & API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".") ||
    pathname.startsWith("/manifest.json") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/robots.txt")
  ) {
    return NextResponse.next();
  }

  // Kalau URL sudah pakai locale (/id atau /en), biarkan
  if (/^\/(?:id|en)(?:\/|$)/.test(pathname)) {
    return NextResponse.next();
  }

  // Default redirect ke /id
  return NextResponse.redirect(new URL(`/id${pathname}`, request.url));
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|sitemap\\.xml|robots\\.txt|manifest\\.json).*)",
  ],
};
