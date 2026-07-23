import type { Game } from "@/lib/games";
import type { StoreGameConfig } from "@/lib/store/config";
import { site } from "@/lib/site";

export function buildGameFromStore(config: StoreGameConfig): Game {
  return {
    slug: config.slug,
    title: config.gameName,
    genre: config.genre,
    shortDescription: config.shortDescription,
    publisherId: "roncy",
    companyName: config.companyName,
    companyEmail: config.companyEmail,
    lastUpdated: config.lastUpdated,
    categories: config.categories,
    platforms: config.platforms,
    sdks: config.sdks ?? [],
    collectsPersonalData: config.collectsPersonalData ?? false,
    childrenTargeted: config.childrenTargeted ?? false,
    progressNote: config.progressNote ?? "",
    knownIssues: config.knownIssues,
    heroImage: site.logo,
    cardColor: "#e3f2fd",
    cardEmoji: "·",
    about: config.about,
    features: config.features,
  };
}
