import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = /^\/(?:id|en)(?:\/|$)/.test(pathname);

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".") ||
    pathname.startsWith("/manifest.json")
  ) {
    return NextResponse.next();
  }

  // Get the preferred locale from the request
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage.includes("en") ? "en" : "id";

  // Redirect to the preferred locale
  const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
