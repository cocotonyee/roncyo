import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/case-studies";
import { games } from "@/lib/games";
import { getAllIndustrySlugs } from "@/lib/industries";
import { getAllServiceSlugs } from "@/lib/services";
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

  const serviceEntries: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryEntries: MetadataRoute.Sitemap = getAllIndustrySlugs().map((slug) => ({
    url: absoluteUrl(`/industries/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudySlugs().map((slug) => ({
    url: absoluteUrl(`/case-studies/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const gameEntries: MetadataRoute.Sitemap = games.flatMap((game) => {
    const gameUpdated = game.lastUpdated ? new Date(game.lastUpdated) : lastModified;
    return [
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

  return [
    ...staticEntries,
    ...serviceEntries,
    ...industryEntries,
    ...caseStudyEntries,
    ...gameEntries,
  ];
}
