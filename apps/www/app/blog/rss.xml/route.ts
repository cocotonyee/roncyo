import { getSiteProfile } from "@goship/core";
import { listBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const profile = getSiteProfile();
  const base =
    profile?.domain.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://roncyo.com";

  const posts = (await listBlogPosts()).filter((p) => !p.noindex);
  const channelTitle = profile?.name ? `${profile.name} Journal` : "Roncyo Journal";

  const items = posts
    .map((post) => {
      const link = `${base}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${escapeXml(post.description)}</description>`,
        post.category ? `<category>${escapeXml(post.category)}</category>` : "",
        "</item>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(channelTitle)}</title>
<link>${escapeXml(`${base}/blog`)}</link>
<description>${escapeXml(profile?.defaultDescription ?? "Studio journal")}</description>
<language>${escapeXml(profile?.locale ?? "en")}</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
