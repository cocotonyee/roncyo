"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ROIIFY_SDK_LOADED_EVENT } from "@/components/RoiifyScript";
import {
  ROIIFY_AD_SLOT_IDS,
  ROIIFY_DEFAULT_SLOT_OPTIONS,
  ROIIFY_FIXED_SLOTS,
  type RoiifyAdSlotOptions,
} from "@/lib/roiify";

type RoiifyAdsApi = {
  show: (
    placementId: string,
    element: string | HTMLElement,
    options?: RoiifyAdSlotOptions,
  ) => void;
};

declare global {
  interface Window {
    RoiifyAds?: RoiifyAdsApi;
  }
}

function waitForRoiify(timeoutMs = 15_000): Promise<RoiifyAdsApi | null> {
  return new Promise((resolve) => {
    if (window.RoiifyAds) {
      resolve(window.RoiifyAds);
      return;
    }

    const started = Date.now();

    const onReady = () => {
      cleanup();
      resolve(window.RoiifyAds ?? null);
    };

    const timer = window.setInterval(() => {
      if (window.RoiifyAds) {
        onReady();
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        cleanup();
        resolve(null);
      }
    }, 100);

    const cleanup = () => {
      window.clearInterval(timer);
      window.removeEventListener(ROIIFY_SDK_LOADED_EVENT, onReady);
    };

    window.addEventListener(ROIIFY_SDK_LOADED_EVENT, onReady);
  });
}

export function RoiifyAdSlot({
  placementId,
  options = ROIIFY_DEFAULT_SLOT_OPTIONS,
  className = "",
}: {
  placementId: string;
  options?: RoiifyAdSlotOptions;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const ads = await waitForRoiify();
      if (cancelled || !ads || !containerRef.current) return;
      ads.show(placementId, containerRef.current, options);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [placementId, options]);

  return (
    <div
      ref={containerRef}
      data-roiify-format={options.format ?? "banner"}
      className={`ad-slot ${className}`.trim()}
    />
  );
}

function RoiifyTopBar() {
  return (
    <aside id={ROIIFY_AD_SLOT_IDS.top} className="ad-strip" aria-label="Advertisement">
      <div className="ad-strip__inner">
        <RoiifyAdSlot placementId={ROIIFY_FIXED_SLOTS.topBar} />
      </div>
    </aside>
  );
}

/** Top banner only — wraps page content below the ad strip */
export function RoiifyAdLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RoiifyTopBar />
      {children}
    </>
  );
}

/** @deprecated Use RoiifyAdLayout */
export function RoiifyBanner() {
  return <RoiifyTopBar />;
}
