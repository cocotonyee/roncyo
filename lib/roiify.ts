/** DOM id for the bottom ad slot — use in Playwright / e2e selectors */
export const ROIIFY_AD_SLOT_IDS = {
  bottom: "roiify-ad-bottom",
} as const;

/** Active placement — bottom banner */
export const ROIIFY_FIXED_SLOTS = {
  bottomBar: "plc_3b7064bbsmtb",
} as const;

export const ROIIFY_SDK_URL = "https://www.roiify.net/sdk/roiify-ads.js";

/**
 * Load via `<RoiifyScript />` (next/script, strategy="afterInteractive").
 * Do not add `<link rel="preload" href={ROIIFY_SDK_URL} as="script" />` — that
 * triggers "preloaded but not used" warnings when execution is delayed.
 */

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
