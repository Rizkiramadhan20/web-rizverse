const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export async function GET() {
  const manifest = {
    name: "Rizverse - Platform Anime, Donghua, Manga & Film",
    short_name: "Rizverse",
    description:
      "Platform entertainment terdepan untuk anime, donghua, manga, dan film berkualitas tinggi",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    scope: "/",
    lang: "id",
    dir: "ltr",
    categories: ["entertainment", "streaming", "anime"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "/og-image.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Rizverse Desktop App",
      },
      {
        src: "/mobile.jpg",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Rizverse Mobile App",
      },
    ],
    shortcuts: [
      {
        name: "Download App",
        short_name: "Download",
        description: "Download Rizverse app",
        url: "/download",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "96x96",
          },
        ],
      },
      {
        name: "Privacy Policy",
        short_name: "Privacy",
        description: "Read our privacy policy",
        url: "/rules/privacy-policy",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "96x96",
          },
        ],
      },
    ],
    related_applications: [
      {
        platform: "web",
        url: BASE_URL,
      },
    ],
    prefer_related_applications: false,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
