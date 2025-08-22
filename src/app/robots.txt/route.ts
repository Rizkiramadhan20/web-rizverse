const BASE_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://rizverse.my.id");

// Revalidate robots.txt periodically
export const revalidate = 3600; // seconds

export async function GET() {
  const robotsTxt = `# Rizverse Robots.txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Additional sitemaps for different content types
Sitemap: ${BASE_URL}/sitemap.xml

# Host
Host: ${BASE_URL}
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
