/** DOM id for the top ad slot — use in Playwright / e2e selectors */
export const ROIIFY_AD_SLOT_IDS = {
  top: "roiify-ad-top",
} as const;

/** Active placement — top banner only */
export const ROIIFY_FIXED_SLOTS = {
  topBar: "plc_3b7064bbsmtb",
} as const;

export const ROIIFY_SDK_URL = "https://www.roiify.net/sdk/roiify-ads.js";

/**
 * Load via `<RoiifyScript />` (next/script, strategy="afterInteractive").
 * Do not add `<link rel="preload" href={ROIIFY_SDK_URL} as="script" />` — that
 * triggers "preloaded but not used" warnings when execution is delayed.
 */

/** How often the top banner refreshes creatives (ms) */
export const ROIIFY_ROTATION_INTERVAL_MS = 30_000;

export type RoiifyAdSlotOptions = {
  theme?: "auto" | "light" | "dark";
  width?: "auto" | "fixed";
  radius?: "0" | "4" | "8";
  format?: "banner";
};

export const ROIIFY_DEFAULT_SLOT_OPTIONS: RoiifyAdSlotOptions = {
  theme: "auto",
  width: "auto",
  radius: "8",
  format: "banner",
};
