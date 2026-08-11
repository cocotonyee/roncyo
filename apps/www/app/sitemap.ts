import type { MetadataRoute } from "next";
import { buildSitemapEntries, getSiteProfile } from "@goship/core";
import { blogPostToSeoDocument, listBlogPosts, queryBlogPosts } from "@/lib/blog";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { storeApps } from "@/lib/store";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function siteBase(): string {
  const profile = getSiteProfile();
  return (
    profile?.domain.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    `https://${site.domain}`
  );
}

function entry(
  base: string,
  path: string,
  opts: {
    lastModified?: Date;
    changeFrequency?: Freq;
    priority?: number;
  } = {},
): MetadataRoute.Sitemap[number] {
  const url = path === "/" ? `${base}/` : `${base}${path}`;
  return {
    url,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profile = getSiteProfile();
  const base = siteBase();
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    entry(base, "/", { changeFrequency: "weekly", priority: 1 }),
    entry(base, "/products", { changeFrequency: "weekly", priority: 0.9 }),
    entry(base, "/blog", { changeFrequency: "weekly", priority: 0.9 }),
    entry(base, "/about", { changeFrequency: "monthly", priority: 0.7 }),
    entry(base, "/contact", { changeFrequency: "monthly", priority: 0.7 }),
    entry(base, "/support", { changeFrequency: "monthly", priority: 0.6 }),
    entry(base, "/tools", { changeFrequency: "monthly", priority: 0.5 }),
    entry(base, "/llms.txt", { changeFrequency: "weekly", priority: 0.4 }),
    entry(base, "/privacy-policy", { changeFrequency: "yearly", priority: 0.3 }),
    entry(base, "/terms-of-service", {
      changeFrequency: "yearly",
      priority: 0.3,
    }),
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) =>
    entry(base, `/products/${product.slug}`, {
      changeFrequency: product.status === "soon" ? "monthly" : "weekly",
      priority: product.featured ? 0.8 : 0.7,
      lastModified: now,
    }),
  );

  const storeRoutes: MetadataRoute.Sitemap = storeApps.flatMap((app) => [
    entry(base, `/apps/${app.slug}/support`, {
      changeFrequency: "monthly",
      priority: 0.5,
    }),
    entry(base, `/apps/${app.slug}/privacy`, {
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  ]);

  const allPosts = await listBlogPosts();
  const indexable = allPosts.filter((post) => !post.noindex);

  const postRoutes: MetadataRoute.Sitemap = profile
    ? buildSitemapEntries(
        profile,
        indexable.map((post) =>
          blogPostToSeoDocument(post, profile.siteId, profile.locale),
        ),
      )
        .filter((item) => item.url !== profile.domain && item.url !== `${base}/`)
        .map((item) => ({
          url: item.url,
          lastModified: item.lastModified
            ? new Date(item.lastModified)
            : now,
          changeFrequency: "monthly" as const,
          priority: 0.75,
        }))
    : indexable.map((post) =>
        entry(base, `/blog/${post.slug}`, {
          lastModified: new Date(post.updated || post.date),
          changeFrequency: "monthly",
          priority: 0.75,
        }),
      );

  const { pageCount } = await queryBlogPosts({ page: 1 });
  const archiveRoutes: MetadataRoute.Sitemap = [];
  for (let page = 2; page <= pageCount; page++) {
    archiveRoutes.push(
      entry(base, `/blog/page/${page}`, {
        changeFrequency: "weekly",
        priority: 0.55,
      }),
    );
  }

  const seen = new Set<string>();
  return [
    ...core,
    ...productRoutes,
    ...storeRoutes,
    ...archiveRoutes,
    ...postRoutes,
  ].filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}
