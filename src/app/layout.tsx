import { metadata } from "@/base/Meta/Metadata";

import { geistSans, geistMono } from "@/base/Fonts/Fonts";

export { metadata };

import "@/base/style/globals.css";

import Header from "@/base/layout/Header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
