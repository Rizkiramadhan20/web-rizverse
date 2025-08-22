export default function robots() {
  const BASE_URL = (() => {
    if (process.env.NEXT_PUBLIC_URL) {
      return process.env.NEXT_PUBLIC_URL.replace(/^http:\/\//i, "https://");
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return "https://rizverse.com";
  })();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
