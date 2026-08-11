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
    `- Tools: ${base}/tools`,
    `- Journal: ${base}/blog`,
    `- About: ${base}/about`,
    `- Contact: ${base}/contact`,
    `- Support: ${base}/support`,
    `- Privacy: ${base}/privacy-policy`,
    `- Terms: ${base}/terms-of-service`,
  ].join("\n");

  let next = body.replace(`- Blog: ${base}/blog`, `- Journal: ${base}/blog`);

  const geoBlock = [
    "",
    "## Studio model",
    `${profile.name} is a product studio (operated by RONCY LLC), not a single SaaS company.`,
    "Products such as DestCard and RonFax are incubated under Roncyo; the Journal records how ideas are discovered, built, validated, and grown.",
    "",
  ].join("\n");

  if (next.includes("## Optional")) {
    next = next.replace("## Optional", `${studioLines}${geoBlock}\n## Optional`);
  } else {
    next = `${next.trimEnd()}\n${studioLines}${geoBlock}\n`;
  }

  return next;
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
