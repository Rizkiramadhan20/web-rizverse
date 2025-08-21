import { fetchDownloadData } from "@/utils/FetchDownload";

// Static base URL for sitemap generation (no dynamic headers usage)
const BASE_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://rizverse.my.id");

// Revalidate sitemap periodically
export const revalidate = 3600; // seconds

// Add XML escape function
function escapeXml(unsafe?: string): string {
  const s = String(unsafe ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getDownloadUrls() {
  try {
    const downloadData = await fetchDownloadData();

    // Group by version and create URLs for each version
    const downloadUrls: Array<{
      url: string;
      lastmod: string;
      priority: string;
      changefreq: string;
    }> = [];
    const versions = [...new Set(downloadData.map((item) => item.version))];

    for (const version of versions) {
      // Add download page URLs for each version
      downloadUrls.push(
        {
          url: `/id/download?v=${version}`,
          lastmod: new Date().toISOString(),
          priority: "0.9",
          changefreq: "weekly",
        },
        {
          url: `/en/download?v=${version}`,
          lastmod: new Date().toISOString(),
          priority: "0.9",
          changefreq: "weekly",
        }
      );
    }

    return downloadUrls;
  } catch (error) {
    console.error("Error fetching download data:", error);
    return [];
  }
}

async function generateSitemap(baseUrl: string) {
  const staticUrls = [
    {
      url: "/",
      lastmod: new Date().toISOString(),
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      url: "/id",
      lastmod: new Date().toISOString(),
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      url: "/en",
      lastmod: new Date().toISOString(),
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      url: "/id/download",
      lastmod: new Date().toISOString(),
      priority: "0.9",
      changefreq: "weekly",
    },
    {
      url: "/en/download",
      lastmod: new Date().toISOString(),
      priority: "0.9",
      changefreq: "weekly",
    },
  ];

  // Legal pages for both locales
  const legalPages = [
    {
      url: "/id/rules/cookies-policy",
      lastmod: new Date().toISOString(),
      priority: "0.6",
      changefreq: "monthly",
    },
    {
      url: "/en/rules/cookies-policy",
      lastmod: new Date().toISOString(),
      priority: "0.6",
      changefreq: "monthly",
    },
    {
      url: "/id/rules/privacy-policy",
      lastmod: new Date().toISOString(),
      priority: "0.6",
      changefreq: "monthly",
    },
    {
      url: "/en/rules/privacy-policy",
      lastmod: new Date().toISOString(),
      priority: "0.6",
      changefreq: "monthly",
    },
    {
      url: "/id/rules/terms-of-use",
      lastmod: new Date().toISOString(),
      priority: "0.6",
      changefreq: "monthly",
    },
    {
      url: "/en/rules/terms-of-use",
      lastmod: new Date().toISOString(),
      priority: "0.6",
      changefreq: "monthly",
    },
  ];

  // Get download URLs with version parameters
  const downloadUrls = await getDownloadUrls();

  const urls = [...staticUrls, ...legalPages, ...downloadUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((item) => {
    return `  <url>
    <loc>${escapeXml(baseUrl)}${escapeXml(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return sitemapXml;
}

// INI ROUTE HANDLER NEXT 13/14 YANG BENAR UNTUK GENERATE SITEMAP
export async function GET() {
  try {
    const body = await generateSitemap(BASE_URL);

    return new Response(body, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
