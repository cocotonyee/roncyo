"use client";

import { useCallback, useEffect, useRef } from "react";
import { ROIIFY_BANNER_PLACEMENT_ID } from "@/lib/roiify";

type RoiifyAdsApi = {
  show: (
    placementId: string,
    target: string | Element,
    options?: { theme?: string; format?: string },
  ) => void;
};

declare global {
  interface Window {
    RoiifyAds?: RoiifyAdsApi;
  }
}

export function RoiifyBanner() {
  const slotRef = useRef<HTMLDivElement>(null);
  const shownRef = useRef(false);

  const showBanner = useCallback(() => {
    if (shownRef.current || !window.RoiifyAds || !slotRef.current) return;
    shownRef.current = true;
    window.RoiifyAds.show(ROIIFY_BANNER_PLACEMENT_ID, slotRef.current, {
      theme: "light",
      format: "banner",
    });
  }, []);

  useEffect(() => {
    showBanner();
    window.addEventListener("load", showBanner);
    return () => window.removeEventListener("load", showBanner);
  }, [showBanner]);

  return (
    <aside
      className="border-t border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-cream)] px-5 py-6 sm:px-8 lg:px-[52px]"
      aria-label="Advertisement"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={slotRef}
          data-roiify-placement
          data-roiify-format="banner"
          className="min-h-20 w-full"
        />
      </div>
    </aside>
  );
}
