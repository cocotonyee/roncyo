import type { GamePlatform } from "@/lib/games";

/**
 * One row in the store catalog — edit this file to add games.
 *
 * Assets live in `public/store/[storeDir]/`:
 * - logo.png      — app icon
 * - top.png       — detail page banner (optional; set hasTopBanner: false to skip)
 * - 1.png, 2.png, 3.png — screenshots (or list custom names in `screenshots`)
 */
export type StoreGameConfig = {
  /** Folder under `public/store/` (e.g. `mochicat`) */
  storeDir: string;
  /** URL path: `/games/[slug]` */
  slug: string;

  /** Company / publisher */
  companyName: string;
  companyLegalName: string;
  companyCountry?: string;
  companyDescription?: string;
  companyEmail?: string;
  companyWebsite?: string;

  /** Game info */
  gameName: string;
  genre: string;
  shortDescription: string;
  about: string;
  story?: string;
  features: string[];
  howToPlay?: string[];

  /** Override default screenshot filenames if needed */
  screenshots?: string[];
  /** Set false when `top.png` is not in the store folder */
  hasTopBanner?: boolean;

  platforms: GamePlatform[];
  version?: string;
  lastUpdated?: string;
  releaseDate?: string;
  contentRating?: string;
  categories?: string[];
  languages?: string[];
  size?: string;
  rating?: number;
  reviewCount?: number;
  badges?: ("new" | "featured" | "editor-choice")[];

  playStoreUrl?: string;
  appStoreUrl?: string;
  telegramUrl?: string;
  telegramMiniApp?: boolean;
  telegramMiniAppPath?: string;
  playButtonLabel?: string;

  sdks?: string[];
  collectsPersonalData?: boolean;
  childrenTargeted?: boolean;
  progressNote?: string;
  knownIssues?: string;
};
