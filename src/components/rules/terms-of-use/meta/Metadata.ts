import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan - Rizverse",
  description:
    "Baca syarat dan ketentuan penggunaan layanan Rizverse. Ketahui hak dan kewajiban Anda sebagai pengguna platform software kami.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Syarat dan Ketentuan - Rizverse",
    description:
      "Baca syarat dan ketentuan penggunaan layanan Rizverse. Ketahui hak dan kewajiban Anda sebagai pengguna platform software kami.",
    url: BASE_URL,
    siteName: "Rizverse",
    images: [
      {
        url: `${BASE_URL}/logo.png`,
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
      "Baca syarat dan Ketentuan penggunaan layanan Rizverse. Ketahui hak dan kewajiban Anda sebagai pengguna platform software kami.",
    images: [`${BASE_URL}/logo.png`],
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
  authors: [{ name: "Rizverse", url: BASE_URL }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
