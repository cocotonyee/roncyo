export type GamePlatform = "ios" | "android" | "web" | "telegram" | "tiktok";

export type Game = {
  slug: string;
  title: string;
  genre: string;
  shortDescription: string;
  /** Publisher / client that owns this app listing */
  publisherId: string;
  /** Folder under `public/store/` — when set, logo/top/screenshots load from there */
  storeDir?: string;
  /** From store config; overrides publisher display name when set */
  companyName?: string;
  companyLegalName?: string;
  companyDescription?: string;
  companyEmail?: string;
  companyWebsite?: string;
  logoUrl?: string;
  topBannerUrl?: string;
  screenshots?: string[];
  /** Full-bleed hero (`/public/...` or `https://...`) */
  heroImage: string;
  /** Card accent on homepage */
  cardColor: string;
  cardEmoji: string;
  /** App store metadata */
  version?: string;
  lastUpdated?: string;
  releaseDate?: string;
  contentRating?: string;
  categories?: string[];
  languages?: string[];
  size?: string;
  /** Optional store-style rating (omit if not available) */
  rating?: number;
  reviewCount?: number;
  badges?: ("new" | "featured" | "editor-choice")[];
  about: string;
  story?: string;
  features: string[];
  howToPlay?: string[];
  platforms: GamePlatform[];
  /**
   * Self-hosted Web build under `public/play/[slug]/` (served at `/play/[slug]/`).
   * Drop your game's index.html + assets there to play on `/games/[slug]`.
   */
  localPlayPath?: string;
  /** Primary “play” CTA; if omitted, uses local → embed → store URLs */
  playUrl?: string;
  playButtonLabel?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  webUrl?: string;
  /** External embed URL (itch.io, etc.) — used if no localPlayPath */
  embedUrl?: string;
  /** Telegram bot link, e.g. https://t.me/YourBot */
  telegramUrl?: string;
  /**
   * Static Mini App files under `public/play/[slug]/` — for BotFather only.
   * Website shows “Play in Telegram”, not an iframe.
   */
  telegramMiniApp?: boolean;
  /** Defaults to `/play/[slug]/` */
  telegramMiniAppPath?: string;
  tiktokUrl?: string;
  sdks: string[];
  collectsPersonalData: boolean;
  childrenTargeted: boolean;
  progressNote: string;
  knownIssues?: string;
};

import { buildGameFromStore } from "@/lib/store/build-game";
import { storeListings } from "@/lib/store/listings";

export function resolvePlayCTA(game: Game): { href: string; label: string } | null {
  if (game.telegramMiniApp && game.telegramUrl) {
    return {
      href: game.telegramUrl,
      label: game.playButtonLabel ?? "Open in Telegram",
    };
  }
  if (game.playUrl) {
    return {
      href: game.playUrl,
      label: game.playButtonLabel ?? "Download",
    };
  }
  if (game.playStoreUrl)
    return {
      href: game.playStoreUrl,
      label: game.playButtonLabel ?? "Get on Google Play",
    };
  if (game.appStoreUrl)
    return { href: game.appStoreUrl, label: game.playButtonLabel ?? "Download on App Store" };
  if (game.telegramUrl)
    return { href: game.telegramUrl, label: game.playButtonLabel ?? "Open in Telegram" };
  if (game.webUrl) return { href: game.webUrl, label: game.playButtonLabel ?? "Visit website" };
  if (game.tiktokUrl)
    return { href: game.tiktokUrl, label: game.playButtonLabel ?? "Open on TikTok" };
  return null;
}

export const games: Game[] = storeListings.map(buildGameFromStore);

/** Homepage featured game cards (live titles only) */
export const featuredGameCards = games.map((g) => ({
  slug: g.slug,
  title: g.title,
  genre: g.genre,
  color: g.cardColor,
  emoji: g.cardEmoji,
  href: `/games/${g.slug}` as string,
}));

export function getGameBySlug(slug: string) {
  return games.find((g) => g.slug === slug);
}

/** Company name shown on cards and detail pages — store config overrides publisher. */
export function getCompanyDisplay(game: Game) {
  if (game.companyName) {
    return {
      brandName: game.companyName,
      legalName: game.companyLegalName,
    };
  }
  return null;
}

export function getAllSlugs() {
  return games.map((g) => g.slug);
}

export function getGamesByPublisher(publisherId: string) {
  return games.filter((g) => g.publisherId === publisherId);
}

export function getRelatedGames(slug: string, limit = 4) {
  const game = getGameBySlug(slug);
  if (!game) return [];
  return games.filter((g) => g.slug !== slug && g.publisherId === game.publisherId).slice(0, limit);
}
