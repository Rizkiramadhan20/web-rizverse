const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f5f5f5",
};

export const metadata = {
  title: "Rizverse - Platform Anime, Donghua, Manga & Film Terdepan",
  description:
    "Rizverse adalah platform entertainment terdepan yang menghadirkan ribuan judul anime, donghua, manga, dan film berkualitas tinggi. Download aplikasi mobile dan desktop kami untuk pengalaman streaming terbaik.",

  authors: [{ name: "Rizverse" }],

  keywords: [
    "rizverse",
    "Rizverse",
    "Anime Platform",
    "Donghua Streaming",
    "Manga Reader",
    "Film Streaming",
    "Entertainment Platform",
    "Anime App",
    "Donghua App",
    "Manga App",
    "Film App",
    "Streaming Service",
    "Anime Company",
    "Entertainment Company",
    "Digital Platform",
    "Content Provider",
  ],

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/favicon.ico",
  },

  tags: [
    {
      name: "Rizverse",
      content: "Entertainment Platform",
    },
  ],

  manifest: "/manifest.json",

  metadataBase: new URL(BASE_URL),

  canonical: BASE_URL,

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#f5f5f5",
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION as string,
  },

  openGraph: {
    type: "website",
    title: "Rizverse - Platform Anime, Donghua, Manga & Film Terdepan",
    description:
      "Rizverse adalah platform entertainment terdepan yang menghadirkan ribuan judul anime, donghua, manga, dan film berkualitas tinggi. Download aplikasi mobile dan desktop kami untuk pengalaman streaming terbaik.",
    url: BASE_URL,
    siteName: "Rizverse",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rizverse - Platform Anime, Donghua, Manga & Film Terdepan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rizverse - Platform Anime, Donghua, Manga & Film Terdepan",
    description:
      "Rizverse adalah platform entertainment terdepan yang menghadirkan ribuan judul anime, donghua, manga, dan film berkualitas tinggi. Download aplikasi mobile dan desktop kami untuk pengalaman streaming terbaik.",
    creator: "@rizverse",
    site: "@rizverse",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "id-ID": BASE_URL,
      "en-US": BASE_URL,
    },
  },
};

export default metadata;
