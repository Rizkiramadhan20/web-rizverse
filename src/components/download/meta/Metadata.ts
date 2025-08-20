import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Rizverse",
  description: "Download Rizverse",
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Download Rizverse",
    description: "Download Rizverse",
    url: "https://rizverse.com/download",
    siteName: "Rizverse",
    images: [
      {
        url: "https://rizverse.com/logo.png",
        width: 800,
        height: 600,
        alt: "Rizverse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Rizverse",
    description: "Download Rizverse",
    images: ["https://rizverse.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  keywords: ["Rizverse", "Download", "Rizverse Download"],
  authors: [{ name: "Rizverse", url: "https://rizverse.com" }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
