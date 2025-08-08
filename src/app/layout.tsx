import { metadata } from "@/base/Meta/Metadata";
import { geistSans, geistMono } from "@/base/Fonts/Fonts";
import "@/base/style/globals.css";
import Header from "@/base/layout/Header";

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
  // Get locale from params if available (for [locale] routes)
  let locale = "id"; // default to Indonesian
  if (params) {
    const resolvedParams = await params;
    locale = resolvedParams.locale;
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
