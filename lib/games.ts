export type GamePlatform = "ios" | "android" | "web" | "telegram" | "tiktok";

/** Minimal app record for store compliance pages (privacy / support). */
export type Game = {
  slug: string;
  title: string;
  genre: string;
  shortDescription: string;
  publisherId: string;
  companyName?: string;
  companyEmail?: string;
  lastUpdated?: string;
  categories?: string[];
  platforms: GamePlatform[];
  sdks: string[];
  collectsPersonalData: boolean;
  childrenTargeted: boolean;
  progressNote: string;
  knownIssues?: string;
  heroImage: string;
  cardColor: string;
  cardEmoji: string;
  about: string;
  features: string[];
};

import { buildGameFromStore } from "@/lib/store/build-game";
import { storeListings } from "@/lib/store/listings";

export const games: Game[] = storeListings.map(buildGameFromStore);

export function getGameBySlug(slug: string) {
  return games.find((g) => g.slug === slug);
}

export function getAllSlugs() {
  return games.map((g) => g.slug);
}
