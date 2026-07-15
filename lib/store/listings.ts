import type { StoreGameConfig } from "@/lib/store/config";
import { site } from "@/lib/site";

/**
 * Titles that need public compliance URLs (privacy / support) for stores or Mini Apps.
 * This is not a consumer play catalog.
 */
export const storeListings: StoreGameConfig[] = [
  {
    slug: "mochi-cats",
    companyName: site.brand,
    companyCountry: site.country,
    companyDescription:
      "Independent game studio crafting mobile puzzle games with cute art and player-first design.",
    companyEmail: site.emails.support,
    gameName: "Mochi Cat",
    genre: "Merge Puzzle",
    shortDescription:
      "Drop adorable cats, merge matching kitties, and keep the stack from overflowing.",
    about:
      "Mochi Cat is a cute cat merge puzzle with relaxing casual play and high-score challenges.",
    features: ["Merge puzzle gameplay", "Casual sessions", "High-score challenges"],
    platforms: ["android", "telegram"],
    version: "1.4.2",
    lastUpdated: "2025-11-18",
    releaseDate: "2024-06-12",
    contentRating: "Everyone",
    categories: ["Puzzle", "Casual", "Merge"],
    languages: ["English", "简体中文", "日本語"],
    size: "48 MB",
    badges: ["featured"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.roncyo.mochicats",
    telegramUrl: "https://t.me/MochiCatsBot/mochi",
    sdks: ["Google Play services", "Ad SDKs"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Progress and high scores may be saved locally on your device. Reinstalling the app may reset local data.",
    knownIssues:
      "If something breaks after an OS update, email us with your device model and Android version.",
  },
  {
    slug: "cozy-cat-block-puzzle",
    companyName: site.brand,
    companyCountry: site.country,
    companyDescription:
      "Independent game studio crafting mobile puzzle games with cute art and player-first design.",
    companyEmail: site.emails.support,
    gameName: "Cozy Cat Block Puzzle",
    genre: "Block Puzzle",
    shortDescription:
      "Drag cozy block shapes onto the grid and clear lines with your feline friends cheering you on.",
    about:
      "Cozy Cat Block Puzzle is a warm grid puzzle for cat lovers and classic block fans.",
    features: [
      "Classic block puzzle",
      "Cat art and animations",
      "Telegram Mini App",
      "Android on Google Play",
    ],
    platforms: ["android", "telegram"],
    version: "2.1.0",
    lastUpdated: "2026-01-08",
    releaseDate: "2025-03-20",
    contentRating: "Everyone",
    categories: ["Puzzle", "Casual", "Block"],
    languages: ["English", "简体中文"],
    size: "62 MB",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.roncyo.cozycat",
    telegramUrl: "https://t.me/roncyo_bot",
    telegramMiniApp: true,
    sdks: ["Google Play services", "Ad SDKs"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Scores and progress may be stored locally on your device depending on your version.",
  },
];
