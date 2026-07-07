"use client";

import Script from "next/script";
import { ROIIFY_SDK_URL } from "@/lib/roiify";

/** Dispatched when roiify-ads.js has finished loading (see RoiifyAdSlot). */
export const ROIIFY_SDK_LOADED_EVENT = "roiify-sdk-loaded";

/**
 * Load Roiify SDK via next/script — do NOT add `<link rel="preload">` for this URL.
 * @see https://www.roiify.net — use afterInteractive, not preload + delayed execution.
 */
export function RoiifyScript() {
  return (
    <Script
      id="roiify-ads-sdk"
      src={ROIIFY_SDK_URL}
      strategy="afterInteractive"
      onLoad={() => {
        window.dispatchEvent(new Event(ROIIFY_SDK_LOADED_EVENT));
      }}
    />
  );
}
