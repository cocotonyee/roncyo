"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ROIIFY_SDK_LOADED_EVENT } from "@/components/RoiifyScript";
import {
  ROIIFY_AD_SLOT_IDS,
  ROIIFY_BANNER_PLACEMENTS,
  ROIIFY_DEFAULT_SLOT_OPTIONS,
  ROIIFY_FIXED_SLOTS,
  ROIIFY_PAGE_AD_SLOT_COUNT,
  ROIIFY_ROTATION_INTERVAL_MS,
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

function pathnameSeed(pathname: string) {
  return pathname.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
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
  refreshKey = 0,
  options = ROIIFY_DEFAULT_SLOT_OPTIONS,
  className = "",
}: {
  placementId: string;
  refreshKey?: number;
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
  }, [placementId, refreshKey, options]);

  return (
    <div
      ref={containerRef}
      data-roiify-format={options.format ?? "banner"}
      className={`min-h-20 w-full ${className}`.trim()}
    />
  );
}

const horizontalShellClass =
  "border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 sm:px-8 lg:px-12";

const sideShellClass =
  "hidden w-[160px] shrink-0 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-6 xl:block";

function RoiifyTopBar() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRefreshKey((current) => current + 1);
    }, ROIIFY_ROTATION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside
      id={ROIIFY_AD_SLOT_IDS.top}
      className={`border-b ${horizontalShellClass}`}
      aria-label="Advertisement"
    >
      <div className="mx-auto max-w-7xl">
        <RoiifyAdSlot placementId={ROIIFY_FIXED_SLOTS.topBar} refreshKey={refreshKey} />
      </div>
    </aside>
  );
}

function RoiifySideBar({ side }: { side: "left" | "right" }) {
  const placementId =
    side === "left" ? ROIIFY_FIXED_SLOTS.leftBar : ROIIFY_FIXED_SLOTS.rightBar;
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRefreshKey((current) => current + 1);
    }, ROIIFY_ROTATION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside
      id={side === "left" ? ROIIFY_AD_SLOT_IDS.left : ROIIFY_AD_SLOT_IDS.right}
      className={`${sideShellClass} ${side === "left" ? "border-r" : "border-l"} sticky top-20 self-start`}
      aria-label="Advertisement"
    >
      <RoiifyAdSlot placementId={placementId} refreshKey={refreshKey} className="min-h-[280px]" />
    </aside>
  );
}

function RoiifyFooterAds() {
  const pathname = usePathname();
  const placements = ROIIFY_BANNER_PLACEMENTS;
  const effectiveSlotCount =
    placements.length > 1
      ? Math.min(Math.max(1, ROIIFY_PAGE_AD_SLOT_COUNT), 2)
      : 1;

  const [rotationIndex, setRotationIndex] = useState(() =>
    placements.length ? pathnameSeed(pathname) % placements.length : 0,
  );

  useEffect(() => {
    setRotationIndex(pathnameSeed(pathname) % placements.length);
  }, [pathname, placements.length]);

  useEffect(() => {
    if (placements.length === 0) return;

    const timer = window.setInterval(() => {
      setRotationIndex((current) => current + 1);
    }, ROIIFY_ROTATION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [placements.length]);

  if (!placements.length) return null;

  const primaryPlacement = placements[rotationIndex % placements.length];
  const secondaryPlacement = placements[(rotationIndex + 1) % placements.length];

  return (
    <>
      {effectiveSlotCount >= 2 ? (
        <aside
          id={ROIIFY_AD_SLOT_IDS.footerSecondary}
          className={`border-t ${horizontalShellClass} py-6`}
          aria-label="Advertisement"
        >
          <div className="mx-auto max-w-7xl">
            <RoiifyAdSlot
              placementId={secondaryPlacement}
              refreshKey={rotationIndex}
            />
          </div>
        </aside>
      ) : null}

      <aside
        id={ROIIFY_AD_SLOT_IDS.footerPrimary}
        className={`border-t ${horizontalShellClass} py-6`}
        aria-label="Advertisement"
      >
        <div className="mx-auto max-w-7xl">
          <RoiifyAdSlot placementId={primaryPlacement} refreshKey={rotationIndex} />
        </div>
      </aside>
    </>
  );
}

/** Wraps page content with top / side / footer Roiify placements */
export function RoiifyAdLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <RoiifyTopBar />
      <div className="flex min-h-0 flex-1">
        <RoiifySideBar side="left" />
        <div className="min-w-0 flex-1">{children}</div>
        <RoiifySideBar side="right" />
      </div>
      <RoiifyFooterAds />
    </div>
  );
}

/** @deprecated Use RoiifyAdLayout */
export function RoiifyBanner() {
  return <RoiifyFooterAds />;
}
