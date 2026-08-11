import type { MetadataRoute } from "next";
import { buildSitemapEntries, getSiteProfile } from "@goship/core";
import { blogPostToSeoDocument, listBlogPosts, queryBlogPosts } from "@/lib/blog";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { storeApps } from "@/lib/store";

function siteBase(): string {
  const profile = getSiteProfile();
  return (
    profile?.domain.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    `https://${site.domain}`
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profile = getSiteProfile();
  const base = siteBase();
  const now = new Date();

  const staticPaths = [
    "/",
    "/products",
    "/tools",
    "/blog",
    "/blog/rss.xml",
    "/llms.txt",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/support",
  ];

  const productPaths = products.map((p) => `/products/${p.slug}`);
  const storePaths = storeApps.flatMap((app) => [
    `/apps/${app.slug}/privacy`,
    `/apps/${app.slug}/support`,
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    ...staticPaths,
    ...productPaths,
    ...storePaths,
  ].map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: now,
  }));

  const allPosts = await listBlogPosts();
  const indexable = allPosts.filter((post) => !post.noindex);

  const postRoutes: MetadataRoute.Sitemap = profile
    ? buildSitemapEntries(
        profile,
        indexable.map((post) =>
          blogPostToSeoDocument(post, profile.siteId, profile.locale),
        ),
      )
        .filter((entry) => entry.url !== profile.domain && entry.url !== `${base}/`)
        .map((entry) => ({
          url: entry.url,
          lastModified: entry.lastModified
            ? new Date(entry.lastModified)
            : now,
        }))
    : indexable.map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.updated || post.date),
      }));

  const { pageCount } = await queryBlogPosts({ page: 1 });
  const archivePages: MetadataRoute.Sitemap = [];
  for (let page = 2; page <= pageCount; page++) {
    archivePages.push({
      url: `${base}/blog/page/${page}`,
      lastModified: now,
    });
  }

  return [...staticRoutes, ...archivePages, ...postRoutes];
}
