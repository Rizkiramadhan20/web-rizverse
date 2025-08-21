import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Rizverse",
  description:
    "Pelajari bagaimana Rizverse mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Kami berkomitmen untuk melindungi privasi dan keamanan data Anda.",
  alternates: {
    canonical: "/rules/privacy-policy",
  },
  openGraph: {
    title: "Kebijakan Privasi - Rizverse",
    description:
      "Pelajari bagaimana Rizverse mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Kami berkomitmen untuk melindungi privasi dan keamanan data Anda.",
    url: "http://rizverse.my.id/rules/privacy-policy",
    siteName: "Rizverse",
    images: [
      {
        url: "http://rizverse.my.id/logo.png",
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
    "Kebijakan Privasi",
    "Privacy Policy",
    "Data Protection",
    "Personal Information",
    "GDPR",
    "User Rights",
    "Data Security",
  ],
  authors: [{ name: "Rizverse", url: "http://rizverse.my.id" }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
