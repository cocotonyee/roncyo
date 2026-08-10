import { buildLlmsTxt, getSiteProfile, type SiteProfile } from "@goship/core";
import { blogPostToSeoDocument, listBlogPosts } from "@/lib/blog";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function resolveProfile(): SiteProfile {
  const fromEnv = getSiteProfile();
  if (fromEnv) return fromEnv;

  const domain =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    `https://${site.domain}`;

  return {
    siteId: "roncyo",
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? site.brand,
    domain,
    locale: "en",
    defaultTitleTemplate: `%s | ${site.brand}`,
    defaultDescription:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? site.description,
    organization: {
      name: site.legalName,
      url: domain,
    },
    productBlurb: site.tagline,
    contactEmail: site.emails.hello,
  };
}

function withStudioPages(profile: SiteProfile, body: string): string {
  const base = profile.domain.replace(/\/$/, "");
  const studioLines = [
    `- Products: ${base}/products`,
    ...products.map((p) => `- ${p.name}: ${base}/products/${p.slug}`),
    `- Labs: ${base}/labs`,
    `- Tools: ${base}/tools`,
    `- About: ${base}/about`,
    `- Contact: ${base}/contact`,
    `- Support: ${base}/support`,
    `- Privacy: ${base}/privacy-policy`,
    `- Terms: ${base}/terms-of-service`,
  ].join("\n");

  if (body.includes("## Optional")) {
    return body.replace("## Optional", `${studioLines}\n\n## Optional`);
  }

  return `${body.trimEnd()}\n${studioLines}\n`;
}

export async function GET() {
  const profile = resolveProfile();
  const docs = (await listBlogPosts())
    .filter((post) => !post.noindex)
    .map((post) => blogPostToSeoDocument(post, profile.siteId, profile.locale));

  const body = withStudioPages(profile, buildLlmsTxt(profile, docs));

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
