import { fetchDownloadData } from "@/utils/FetchDownload";

import metadata from "@/base/Meta/Metadata";

import { DownloadItem } from "@/types/Download";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

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

async function getDownloadVersions(): Promise<
  Array<{ version: string; updatedAt: Date }>
> {
  try {
    const downloads: DownloadItem[] = await fetchDownloadData();

    // Get unique versions and their latest creation dates
    const versionMap = new Map<string, Date>();
    downloads.forEach((download) => {
      const createdAt = new Date(download.createdAt);
      const existing = versionMap.get(download.version);
      if (!existing || createdAt > existing) {
        versionMap.set(download.version, createdAt);
      }
    });

    return Array.from(versionMap.entries()).map(([version, updatedAt]) => ({
      version,
      updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching download versions:", error);
    return [];
  }
}

async function generateSitemap() {
  const downloadVersions = await getDownloadVersions();
  const currentDate = new Date().toISOString();

  // Define supported locales
  const locales = ["id", "en"];

  // Static pages for each locale
  const staticUrls = locales.flatMap((locale) => [
    { url: `/${locale}`, lastmod: currentDate, priority: "1.0" },
    { url: `/${locale}/download`, lastmod: currentDate, priority: "0.9" },
    {
      url: `/${locale}/rules/terms-of-use`,
      lastmod: currentDate,
      priority: "0.7",
    },
    {
      url: `/${locale}/rules/privacy-policy`,
      lastmod: currentDate,
      priority: "0.7",
    },
    {
      url: `/${locale}/rules/cookies-policy`,
      lastmod: currentDate,
      priority: "0.7",
    },
  ]);

  // Dynamic download version URLs for each locale
  const dynamicUrls = locales.flatMap((locale) =>
    downloadVersions.map((download: { version: string; updatedAt: Date }) => ({
      url: `/${locale}/download?version=${download.version}`,
      lastmod: download.updatedAt.toISOString(),
      priority: "0.8",
    }))
  );

  const urls = [...staticUrls, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((item) => {
    const isHomePage = item.url.match(/^\/(id|en)$/);
    const isDownloadPage = item.url.includes("/download");
    const isRulesPage = item.url.includes("/rules/");

    let title: string;
    let description: string;

    if (isHomePage) {
      title = metadata.title;
      description = metadata.openGraph.description;
    } else if (isDownloadPage) {
      title = `Download - ${metadata.title}`;
      description = `Download the latest version of Rizverse - ${metadata.openGraph.description}`;
    } else if (isRulesPage) {
      const ruleType = item.url.split("/").pop();
      title = `${ruleType
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())} - ${metadata.title}`;
      description = `${title} - ${metadata.openGraph.description}`;
    } else {
      title = `${item.url.split("/").pop() || ""} - ${metadata.title}`;
      description = `${title} - ${metadata.openGraph.description}`;
    }

    return `
  <url>
    <loc>${escapeXml(BASE_URL)}${escapeXml(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${item.priority}</priority>
    <xhtml:link rel="alternate" hreflang="${escapeXml(
      metadata.openGraph.locale
    )}" href="${escapeXml(BASE_URL)}${escapeXml(item.url)}" />
    <image:image>
      <image:loc>${escapeXml(BASE_URL)}${escapeXml(
      metadata.openGraph.images[0].url
    )}</image:loc>
      <image:title>${escapeXml(metadata.openGraph.images[0].alt)}</image:title>
      <image:caption>${escapeXml(description)}</image:caption>
      <image:license>${escapeXml(BASE_URL)}</image:license>
    </image:image>
  </url>`;
  })
  .join("")}
</urlset>`;

  return sitemapXml;
}

// INI ROUTE HANDLER NEXT 13/14 YANG BENAR UNTUK GENERATE SITEMAP
export async function GET() {
  try {
    const body = await generateSitemap();

    return new Response(body, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
