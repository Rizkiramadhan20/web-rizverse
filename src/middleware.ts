import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip kalau sudah ada locale di URL
  if (/^\/(?:id|en)(?:\/|$)/.test(pathname)) {
    return NextResponse.next();
  }

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

  // 1. Cek cookie locale
  const localeCookie = request.cookies.get("locale")?.value as "id" | "en" | undefined;

  if (localeCookie) {
    // Cegah redirect loop: hanya redirect kalau belum di prefix locale
    if (!pathname.startsWith(`/${localeCookie}`)) {
      const newUrl = new URL(`/${localeCookie}${pathname}`, request.url);
      return NextResponse.redirect(newUrl);
    }
    return NextResponse.next();
  }

  // 2. Ambil data lokasi & bahasa
  const country = (
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    ""
  ).toLowerCase();
  const acceptLanguage = request.headers.get("accept-language") || "";
  const firstLang = acceptLanguage.split(",")[0]?.trim().split("-")[0]?.toLowerCase();

  let preferredLocale: "id" | "en" = "en";
  if (country === "id" || firstLang === "id") {
    preferredLocale = "id";
  }

  // 3. Redirect + set cookie
  const response = NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname}`, request.url)
  );
  response.cookies.set("locale", preferredLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 hari
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|sitemap\\.xml|robots\\.txt|manifest\\.json).*)",
  ],
};
