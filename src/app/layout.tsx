import { metadata } from "@/base/Meta/Metadata";

import { geistSans, geistMono } from "@/base/Fonts/Fonts";

import "@/base/style/globals.css";

import Header from "@/base/layout/Header";

import Footer from "@/base/layout/Footer"

import LenisProvider from "@/base/helper/LenisProvider";

import { ThemeProvider } from "@/context/ThemaContext";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

import { cookies, headers } from 'next/headers'

export { metadata };

import Script from "next/script";
interface RootLayoutProps {
  children: React.ReactNode;
  params?: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const cookieStore = await cookies();
  const headersList = await headers();
  const localeCookie = cookieStore.get("locale")?.value as "id" | "en" | undefined;
  const acceptLanguage = headersList.get("accept-language") || "";
  const firstLang = acceptLanguage.split(",")[0]?.trim().split("-")[0]?.toLowerCase();

  let locale: "id" | "en" = localeCookie || (firstLang === "id" ? "id" : "en");

  if (params) {
    try {
      const resolvedParams = await params;
      if (resolvedParams?.locale) {
        locale = resolvedParams.locale as "id" | "en";
      }
    } catch { }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": locale === "id" ? "Beranda" : "Home", "item": "https://rizverse.my.id" },
    ]
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        <GoogleTagManagerNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          storageKey="theme">
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
