import type { Game } from "@/lib/games";
import type { StoreGameConfig } from "@/lib/store/config";
import { resolveStoreAssets } from "@/lib/store/assets";

export function buildGameFromStore(config: StoreGameConfig): Game {
  const hasTopBanner = config.hasTopBanner !== false;
  const assets = resolveStoreAssets(config.storeDir, config.screenshots, hasTopBanner);

  return {
    slug: config.slug,
    title: config.gameName,
    genre: config.genre,
    shortDescription: config.shortDescription,
    publisherId: "roncy",
    storeDir: config.storeDir,
    companyName: config.companyName,
    companyLegalName: config.companyLegalName,
    companyDescription: config.companyDescription,
    companyEmail: config.companyEmail,
    companyWebsite: config.companyWebsite,
    logoUrl: assets.logo,
    topBannerUrl: assets.topBanner,
    screenshots: assets.screenshots,
    heroImage: assets.topBanner ?? assets.logo,
    cardColor: "#e3f2fd",
    cardEmoji: "🐱",
    version: config.version,
    lastUpdated: config.lastUpdated,
    releaseDate: config.releaseDate,
    contentRating: config.contentRating,
    categories: config.categories,
    languages: config.languages,
    size: config.size,
    rating: config.rating,
    reviewCount: config.reviewCount,
    badges: config.badges,
    about: config.about,
    story: config.story,
    features: config.features,
    howToPlay: config.howToPlay,
    platforms: config.platforms,
    playStoreUrl: config.playStoreUrl,
    appStoreUrl: config.appStoreUrl,
    telegramUrl: config.telegramUrl,
    telegramMiniApp: config.telegramMiniApp,
    telegramMiniAppPath: config.telegramMiniAppPath,
    playButtonLabel: config.playButtonLabel,
    sdks: config.sdks ?? [],
    collectsPersonalData: config.collectsPersonalData ?? false,
    childrenTargeted: config.childrenTargeted ?? false,
    progressNote: config.progressNote ?? "",
    knownIssues: config.knownIssues,
  };
}
