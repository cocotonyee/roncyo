import type { StoreGameConfig } from "@/lib/store/config";
import { site } from "@/lib/site";
import { yxkStoreListings } from "@/lib/store/yxk-import";

/**
 * Store catalog — add one entry per game folder in `public/store/`.
 *
 * - Mochi Cat / Cozy Cat: edit `companyName`, etc. on each entry below.
 * - 18 demo games: edit per-game `company` in `lib/store/yxk-catalog.json`.
 *
 * Example folder layout:
 *   public/store/mochicat/
 *     logo.png
 *     top.png
 *     1.png
 *     2.png
 *     3.png
 */
export const storeListings: StoreGameConfig[] = [
  {
    storeDir: "mochicat",
    slug: "mochi-cats",

    companyName: site.brand,
    companyCountry: site.country,
    companyDescription:
      "Independent game studio crafting mobile puzzle games with cute art and player-first design.",
    companyEmail: site.emails.support,

    gameName: "Mochi Cat",
    genre: "Merge Puzzle",
    shortDescription:
      "Drop adorable cats, merge matching kitties, and keep the stack from overflowing — cute merge puzzle fun with a high-score challenge.",
    about:
      "Mochi Cat is a cute cat merge puzzle that blends relaxing casual play, fluffy kitty collection, and satisfying high-score runs. Easy to pick up, tricky to master — every drop and merge matters as you stack adorable cats and unlock new forms.",
    story:
      "Drop mochi-soft kitties into the box, merge pairs into rarer fluffballs, and chase your best score before the stack hits the danger line.",
    features: [
      "Cute cat merge puzzle gameplay",
      "Simple controls — relaxing casual sessions",
      "Merge matching cats to unlock new kitties",
      "Stacking and space management with a danger line",
      "Charming fluffy cat collection",
      "High-score challenges",
    ],
    howToPlay: [
      "Drop cute cats into the puzzle box.",
      "Merge two identical cats to create a new cat.",
      "Keep merging to discover more fluffy kitties.",
      "Manage your space and stay above the danger line.",
      "Beat your best score each round.",
    ],

    platforms: ["android", "telegram"],
    version: "1.4.2",
    lastUpdated: "2025-11-18",
    releaseDate: "2024-06-12",
    contentRating: "Everyone",
    categories: ["Puzzle", "Casual", "Merge"],
    languages: ["English", "简体中文", "日本語"],
    size: "48 MB",
    rating: 4.7,
    reviewCount: 1280,
    badges: ["featured"],

    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.roncyo.mochicats",
    telegramUrl: "https://t.me/MochiCatsBot/mochi",
    playButtonLabel: "Get on Google Play",

    sdks: ["Google Play services", "Ad SDKs"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Progress and high scores may be saved locally on your device. Reinstalling the app may reset local data.",
    knownIssues:
      "If something breaks after an OS update, email us with your device model and Android version.",
  },
  {
    storeDir: "cozycat",
    slug: "cozy-cat-block-puzzle",

    companyName: site.brand,
    companyCountry: site.country,
    companyDescription:
      "Independent game studio crafting mobile puzzle games with cute art and player-first design.",
    companyEmail: site.emails.support,

    gameName: "Cozy Cat Block Puzzle",
    genre: "Block Puzzle",
    shortDescription:
      "Drag cozy block shapes onto the grid, clear lines with your feline friends cheering you on — no timers, pure relaxing brain training.",
    about:
      "Cozy Cat Block Puzzle is a warm, aesthetic grid puzzle for cat lovers and classic block fans. Fill rows and columns, chain combos, and unwind with companion cats cheering every clear — available on Android and as a Telegram Mini App.",
    story:
      "Leave daily stress behind and settle into a soft grid where every line you clear brings a purr of encouragement. Thoughtful moves, cozy art, and gentle sound make each session feel like a quiet retreat.",
    features: [
      "Classic block puzzle on a cozy grid board",
      "Heart-warming cat art and smooth animations",
      "Combo multipliers for big line clears",
      "Telegram Mini App with bot integration",
      "Android version on Google Play",
      "No timers — stress-free, zen pacing",
    ],
    howToPlay: [
      "Drag block shapes from the bottom onto the grid.",
      "Fill complete horizontal rows or vertical columns to clear them.",
      "Clear multiple lines at once for combo multipliers.",
      "Plan ahead — the game ends when no shapes fit on the board.",
      "Enjoy your cats cheering on every line you clear.",
    ],

    platforms: ["android", "telegram"],
    version: "2.1.0",
    lastUpdated: "2026-01-08",
    releaseDate: "2025-03-20",
    contentRating: "Everyone",
    categories: ["Puzzle", "Casual", "Block"],
    languages: ["English", "简体中文"],
    size: "62 MB",
    rating: 4.8,
    reviewCount: 540,
    badges: ["new"],

    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.roncyo.cozycat",
    telegramUrl: "https://t.me/roncyo_bot",
    telegramMiniApp: true,
    telegramMiniAppPath: "/play/cozy-cat-block-puzzle/",
    playButtonLabel: "Open in Telegram",

    sdks: ["Google Play services", "Ad SDKs"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Scores and progress may be stored locally on your device depending on your version.",
  },
  ...yxkStoreListings(),
];
