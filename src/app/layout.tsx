import { metadata } from "@/base/Meta/Metadata";

import { geistSans, geistMono } from "@/base/Fonts/Fonts";

import "@/base/style/globals.css";

import Header from "@/base/layout/Header";

import Footer from "@/base/layout/Footer"

import LenisProvider from "@/base/helper/LenisProvider";

import { ThemeProvider } from "@/context/ThemaContext";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

export { metadata };

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
  let locale = "id";
  if (params) {
    const resolvedParams = await params;
    locale = resolvedParams.locale;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
