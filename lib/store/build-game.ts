import type { Game } from "@/lib/games";
import type { StoreGameConfig } from "@/lib/store/config";
import { resolveStoreAssets } from "@/lib/store/assets";
import { site } from "@/lib/site";

const fallbackImage = site.logo;

export function buildGameFromStore(config: StoreGameConfig): Game {
  const hasTopBanner = config.hasTopBanner !== false;
  const assets = config.storeDir
    ? resolveStoreAssets(config.storeDir, config.screenshots, hasTopBanner)
    : { logo: undefined, topBanner: undefined, screenshots: [] as string[] };

  const logo = assets.logo ?? fallbackImage;
  const hero = assets.topBanner ?? assets.logo ?? fallbackImage;

  return {
    slug: config.slug,
    title: config.gameName,
    genre: config.genre,
    shortDescription: config.shortDescription,
    publisherId: "roncy",
    storeDir: config.storeDir,
    companyName: config.companyName,
    companyCountry: config.companyCountry,
    companyDescription: config.companyDescription,
    companyEmail: config.companyEmail,
    companyWebsite: config.companyWebsite,
    logoUrl: logo,
    topBannerUrl: assets.topBanner,
    screenshots: assets.screenshots,
    heroImage: hero,
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
    playUrl: config.playUrl,
    yxkGameId: config.yxkGameId,
    trialLandscape: config.trialLandscape,
    sdks: config.sdks ?? [],
    collectsPersonalData: config.collectsPersonalData ?? false,
    childrenTargeted: config.childrenTargeted ?? false,
    progressNote: config.progressNote ?? "",
    knownIssues: config.knownIssues,
  };
}
