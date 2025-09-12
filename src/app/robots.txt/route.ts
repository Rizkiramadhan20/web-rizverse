const BASE_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://rizverse.my.id");

export const revalidate = 3600; // 1 hour

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
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
