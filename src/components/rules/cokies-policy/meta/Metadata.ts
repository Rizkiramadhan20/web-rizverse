import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: "Kebijakan Cookie - Rizverse",
  description:
    "Pelajari bagaimana Rizverse menggunakan cookie dan teknologi pelacakan untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan website.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Kebijakan Cookie - Rizverse",
    description:
      "Pelajari bagaimana Rizverse menggunakan cookie dan teknologi pelacakan untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan website.",
    url: BASE_URL,
    siteName: "Rizverse",
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: "Rizverse Cookies Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Cookie - Rizverse",
    description:
      "Pelajari bagaimana Rizverse menggunakan cookie dan teknologi pelacakan untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan website.",
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
    "Kebijakan Cookie",
    "Cookie Policy",
    "Privacy",
    "Data Protection",
    "Website Cookies",
    "Tracking Technologies",
  ],
  authors: [{ name: "Rizverse", url: BASE_URL }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
