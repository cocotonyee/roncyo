"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_BANNER_SLOT, ADSENSE_CLIENT } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSenseBanner() {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may be blocked by extensions; ignore.
    }
  }, []);

  return (
    <aside
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 sm:px-8 lg:px-12"
      aria-label="Advertisement"
    >
      <div className="mx-auto max-w-7xl">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ADSENSE_BANNER_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
