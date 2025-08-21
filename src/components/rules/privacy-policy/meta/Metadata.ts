import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Rizverse",
  description:
    "Pelajari bagaimana Rizverse mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Kami berkomitmen untuk melindungi privasi dan keamanan data Anda.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Kebijakan Privasi - Rizverse",
    description:
      "Pelajari bagaimana Rizverse mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Kami berkomitmen untuk melindungi privasi dan keamanan data Anda.",
    url: BASE_URL,
    siteName: "Rizverse",
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: "Rizverse Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Privasi - Rizverse",
    description:
      "Pelajari bagaimana Rizverse mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Kami berkomitmen untuk melindungi privasi dan keamanan data Anda.",
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
    "Kebijakan Privasi",
    "Privacy Policy",
    "Data Protection",
    "Personal Information",
    "GDPR",
    "User Rights",
    "Data Security",
  ],
  authors: [{ name: "Rizverse", url: BASE_URL }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
