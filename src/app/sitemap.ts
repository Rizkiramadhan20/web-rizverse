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

async function getDownloadVersions(): Promise<
  Array<{ version: string; updatedAt: Date }>
> {
  try {
    const downloads: DownloadItem[] = await fetchDownloadData();
    // Get unique versions and their latest creation dates
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

export default async function sitemap() {
  try {
    const downloadVersions = await getDownloadVersions();
    const currentDate = new Date().toISOString();

    // Define supported locales
    const locales = ["id", "en"];

    // Static pages for each locale
    const staticUrls = locales.flatMap((locale) => [
      {
        url: `${BASE_URL}/${locale}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/${locale}/download`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/${locale}/rules/terms-of-use`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/${locale}/rules/privacy-policy`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/${locale}/rules/cookies-policy`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ]);

    // Dynamic download version URLs for each locale
    const dynamicUrls = locales.flatMap((locale) =>
      downloadVersions.map(
        (download: { version: string; updatedAt: Date }) => ({
          url: `${BASE_URL}/${locale}/download?version=${download.version}`,
          lastModified: download.updatedAt.toISOString(),
          changeFrequency: "weekly",
          priority: 0.8,
        })
      )
    );

    const urls = [...staticUrls, ...dynamicUrls];

    return urls;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return minimal valid sitemap if there's an error
    return [
      {
        url: BASE_URL,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  }
}
