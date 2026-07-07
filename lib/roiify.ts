/** DOM ids for ad slots — use in Playwright / e2e selectors */
export const ROIIFY_AD_SLOT_IDS = {
  top: "roiify-ad-top",
  left: "roiify-ad-left",
  right: "roiify-ad-right",
  footerPrimary: "roiify-ad-footer-primary",
  footerSecondary: "roiify-ad-footer-secondary",
} as const;

/** Roiify fixed layout slots — each maps to a named placement in the publisher console */
export const ROIIFY_FIXED_SLOTS = {
  topBar: "plc_wpqgpujk47sl",
  leftBar: "plc_ta8ig7hbdp37",
  rightBar: "plc_7inuwp1hrvhi",
} as const;

/** Footer banner pool — rotated on a timer */
export const ROIIFY_BANNER_PLACEMENTS: readonly string[] = [
  "plc_3b7064bbsmtb",
  "plc_73ie04a8mav5",
];

/** @deprecated Use ROIIFY_BANNER_PLACEMENTS[0] */
export const ROIIFY_BANNER_PLACEMENT_ID = ROIIFY_BANNER_PLACEMENTS[0];

export const ROIIFY_SDK_URL = "https://www.roiify.net/sdk/roiify-ads.js";

/**
 * Load via `<RoiifyScript />` (next/script, strategy="afterInteractive").
 * Do not add `<link rel="preload" href={ROIIFY_SDK_URL} as="script" />` — that
 * triggers "preloaded but not used" warnings when execution is delayed.
 */

/** How often footer banners rotate / refresh creatives (ms) */
export const ROIIFY_ROTATION_INTERVAL_MS = 30_000;

/** Number of footer ad rows (1 or 2) */
export const ROIIFY_PAGE_AD_SLOT_COUNT = 2;

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
