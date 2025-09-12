import { NextResponse } from "next/server";
import { fetchDownloadData } from "@/utils/FetchDownload";
import { DownloadItem } from "@/types/Download";

// Pastikan BASE_URL selalu HTTPS
const BASE_URL = (() => {
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL.replace(/^http:\/\//i, "https://");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://rizverse.com";
})();

type UrlEntry = {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
};

async function getDownloadVersions(): Promise<
  Array<{ version: string; updatedAt: Date }>
> {
  try {
    const downloads: DownloadItem[] = await fetchDownloadData();
    const versionMap = new Map<string, Date>();
    downloads.forEach((download) => {
      if (download.version && download.createdAt) {
        const createdAt = new Date(download.createdAt);
        const existing = versionMap.get(download.version);
        if (!existing || createdAt > existing) {
          versionMap.set(download.version, createdAt);
        }
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

function toXml(urls: UrlEntry[]): string {
  const urlset = urls
    .map((entry) => {
      return (
        `<url>` +
        `<loc>${entry.url}</loc>` +
        `<lastmod>${entry.lastModified}</lastmod>` +
        `<changefreq>${entry.changeFrequency}</changefreq>` +
        `<priority>${entry.priority.toFixed(1)}</priority>` +
        `</url>`
      );
    })
    .join("");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urlset +
    `</urlset>`
  );
}

export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const downloadVersions = await getDownloadVersions();
    const currentDate = new Date().toISOString();

    const staticUrls: UrlEntry[] = [
      {
        url: `${BASE_URL}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/download`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/rules/terms-of-use`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/rules/privacy-policy`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/rules/cookies-policy`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ];

    const dynamicUrls: UrlEntry[] = downloadVersions.map(
      (download: { version: string; updatedAt: Date }) => ({
        url: `${BASE_URL}/download?version=${download.version}`,
        lastModified: download.updatedAt.toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    );

    const urls: UrlEntry[] = [...staticUrls, ...dynamicUrls];
    const xml = toXml(urls);
    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    const fallback: UrlEntry[] = [
      {
        url: BASE_URL,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
    const xml = toXml(fallback);
    return new NextResponse(xml, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  }
}
