import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Cookie - Rizverse",
  description: "Pelajari bagaimana Rizverse menggunakan cookie dan teknologi pelacakan untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan website.",
  alternates: {
    canonical: "/rules/cookies-policy",
  },
  openGraph: {
    title: "Kebijakan Cookie - Rizverse",
    description: "Pelajari bagaimana Rizverse menggunakan cookie dan teknologi pelacakan untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan website.",
    url: "http://rizverse.my.id/rules/cookies-policy",
    siteName: "Rizverse",
    images: [
      {
        url: "http://rizverse.my.id/logo.png",
        width: 800,
        height: 600,
        alt: "Rizverse Cookies Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Cookie - Rizverse",
    description: "Pelajari bagaimana Rizverse menggunakan cookie dan teknologi pelacakan untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan website.",
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
  keywords: ["Rizverse", "Kebijakan Cookie", "Cookie Policy", "Privacy", "Data Protection", "Website Cookies", "Tracking Technologies"],
  authors: [{ name: "Rizverse", url: "http://rizverse.my.id" }],
  creator: "Rizverse",
  publisher: "Rizverse",
  category: "technology",
};

export default metadata;
