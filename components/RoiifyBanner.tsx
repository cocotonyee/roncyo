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
      className={`min-h-20 w-full ${className}`.trim()}
    />
  );
}

function RoiifyBottomBar() {
  return (
    <aside
      id={ROIIFY_AD_SLOT_IDS.bottom}
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 sm:px-8 lg:px-12"
      aria-label="Advertisement"
    >
      <div className="mx-auto max-w-7xl">
        <RoiifyAdSlot placementId={ROIIFY_FIXED_SLOTS.bottomBar} />
      </div>
    </aside>
  );
}

/** Bottom banner — page content above the ad strip */
export function RoiifyAdLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-w-0 flex-1">{children}</div>
      <RoiifyBottomBar />
    </div>
  );
}

/** @deprecated Use RoiifyAdLayout */
export function RoiifyBanner() {
  return <RoiifyBottomBar />;
}
