import { buildLlmsTxt, getSiteProfile } from "@goship/core";
import { blogPostToSeoDocument, listBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const profile = getSiteProfile();
  if (!profile) {
    return new Response(
      "# Site profile not configured\n\nSet GOSHIP_SITE_ID, GOSHIP_SITE_NAME, GOSHIP_SITE_DOMAIN.\n",
      {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }

  const docs = (await listBlogPosts())
    .filter((post) => !post.noindex)
    .map((post) => blogPostToSeoDocument(post, profile.siteId, profile.locale));
  const body = buildLlmsTxt(profile, docs);

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
