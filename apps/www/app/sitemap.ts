import type { MetadataRoute } from "next";
import { getSiteProfile } from "@goship/core";
import { listBlogPosts, queryBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profile = getSiteProfile();
  const base =
    profile?.domain.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://roncyo.com";

  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/products`, lastModified: now },
    { url: `${base}/labs`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/blog/rss.xml`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/privacy-policy`, lastModified: now },
    { url: `${base}/terms-of-service`, lastModified: now },
    { url: `${base}/support`, lastModified: now },
  ];

  const allPosts = await listBlogPosts();
  const posts = allPosts
    .filter((post) => !post.noindex)
    .map((post) => ({
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

  return [...staticRoutes, ...archivePages, ...posts];
}
