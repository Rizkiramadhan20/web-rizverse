import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan - Rizverse",
  description:
    "Baca syarat dan ketentuan penggunaan layanan Rizverse. Ketahui hak dan kewajiban Anda sebagai pengguna platform software kami.",
  alternates: {
    canonical: "/rules/terms-of-use",
  },
  openGraph: {
    title: "Syarat dan Ketentuan - Rizverse",
    description:
      "Baca syarat dan ketentuan penggunaan layanan Rizverse. Ketahui hak dan kewajiban Anda sebagai pengguna platform software kami.",
    url: "http://rizverse.my.id/rules/terms-of-use",
    siteName: "Rizverse",
    images: [
      {
        url: "http://rizverse.my.id/logo.png",
        width: 800,
        height: 600,
        alt: "Rizverse Terms of Use",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syarat dan Ketentuan - Rizverse",
    description:
      "Baca syarat dan ketentuan penggunaan layanan Rizverse. Ketahui hak dan kewajiban Anda sebagai pengguna platform software kami.",
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
    "Syarat dan Ketentuan",
    "Terms of Use",
    "Legal Agreement",
    "User Agreement",
    "Service Terms",
    "Platform Rules",
    "User Rights",
  ],
  authors: [{ name: "Rizverse", url: "http://rizverse.my.id" }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
