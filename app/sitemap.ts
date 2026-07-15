import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs";
import { games } from "@/lib/games";
import { STATIC_SITEMAP_ROUTES } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const docEntries: MetadataRoute.Sitemap = getAllDocSlugs().map((slug) => ({
    url: absoluteUrl(`/docs/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /** Compliance URLs for store / Mini App listings — not a public play catalog. */
  const gameComplianceEntries: MetadataRoute.Sitemap = games.flatMap((game) => {
    const gameUpdated = game.lastUpdated ? new Date(game.lastUpdated) : lastModified;
    return [
      {
        url: absoluteUrl(`/games/${game.slug}/support`),
        lastModified: gameUpdated,
        changeFrequency: "monthly" as const,
        priority: 0.35,
      },
      {
        url: absoluteUrl(`/games/${game.slug}/privacy`),
        lastModified: gameUpdated,
        changeFrequency: "yearly" as const,
        priority: 0.35,
      },
    ];
  });

  return [...staticEntries, ...docEntries, ...gameComplianceEntries];
}
