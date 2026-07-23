import type { GamePlatform } from "@/lib/games";

/** Compliance listing for store / Mini App privacy & support URLs. */
export type StoreGameConfig = {
  slug: string;
  companyName: string;
  companyEmail?: string;
  gameName: string;
  genre: string;
  shortDescription: string;
  about: string;
  features: string[];
  platforms: GamePlatform[];
  lastUpdated?: string;
  categories?: string[];
  sdks?: string[];
  collectsPersonalData?: boolean;
  childrenTargeted?: boolean;
  progressNote?: string;
  knownIssues?: string;
};
