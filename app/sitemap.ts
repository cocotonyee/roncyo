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

  const categories = Array.from(new Set(games.flatMap((g) => g.categories ?? [])));
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: absoluteUrl(`/categories/${encodeURIComponent(cat.toLowerCase())}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const gameEntries: MetadataRoute.Sitemap = games.flatMap((game) => {
    const gameUpdated = game.lastUpdated ? new Date(game.lastUpdated) : lastModified;
    return [
      {
        url: absoluteUrl(`/games/${game.slug}`),
        lastModified: gameUpdated,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      },
      {
        url: absoluteUrl(`/games/${game.slug}/support`),
        lastModified: gameUpdated,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      },
      {
        url: absoluteUrl(`/games/${game.slug}/privacy`),
        lastModified: gameUpdated,
        changeFrequency: "yearly" as const,
        priority: 0.4,
      },
    ];
  });

  return [...staticEntries, ...categoryEntries, ...gameEntries];
}
