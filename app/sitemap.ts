import type { MetadataRoute } from "next";
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

  const gameEntries: MetadataRoute.Sitemap = games.flatMap((game) => {
    const gameUpdated = game.lastUpdated ? new Date(game.lastUpdated) : lastModified;
    return [
      {
        url: absoluteUrl(`/games/${game.slug}`),
        lastModified: gameUpdated,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: absoluteUrl(`/games/${game.slug}/support`),
        lastModified: gameUpdated,
        changeFrequency: "monthly" as const,
        priority: 0.55,
      },
      {
        url: absoluteUrl(`/games/${game.slug}/privacy`),
        lastModified: gameUpdated,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      },
    ];
  });

  return [...staticEntries, ...gameEntries];
}
