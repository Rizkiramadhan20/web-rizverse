import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unduh Rizverse - Download Aplikasi Anime, Donghua, Manga & Film",
  description:
    "Unduh aplikasi Rizverse untuk Android, iOS, macOS, dan Windows. Nikmati ribuan judul anime, donghua, manga, dan film berkualitas tinggi dengan pengalaman streaming terbaik.",
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Unduh Rizverse - Download Aplikasi Anime, Donghua, Manga & Film",
    description:
      "Unduh aplikasi Rizverse untuk Android, iOS, macOS, dan Windows. Nikmati ribuan judul anime, donghua, manga, dan film berkualitas tinggi dengan pengalaman streaming terbaik.",
    url: "http://rizverse.my.id/download",
    siteName: "Rizverse",
    images: [
      {
        url: "http://rizverse.my.id/logo.png",
        width: 800,
        height: 600,
        alt: "Rizverse Download",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unduh Rizverse - Download Aplikasi Anime, Donghua, Manga & Film",
    description:
      "Unduh aplikasi Rizverse untuk Android, iOS, macOS, dan Windows. Nikmati ribuan judul anime, donghua, manga, dan film berkualitas tinggi dengan pengalaman streaming terbaik.",
    images: ["http://rizverse.my.id/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  keywords: [
    "Rizverse",
    "Download Rizverse",
    "Unduh Rizverse",
    "Anime App",
    "Donghua App",
    "Manga App",
    "Film App",
    "Streaming App",
    "Android App",
    "iOS App",
    "macOS App",
    "Windows App",
    "Entertainment Platform",
    "Anime Streaming",
    "Donghua Streaming",
    "Manga Reader",
    "Film Streaming",
  ],
  authors: [{ name: "Rizverse", url: "http://rizverse.my.id" }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
