"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  gameId: number;
  title: string;
  landscape?: boolean;
  backHref: string;
};

export function YxkTrialPlayer({ gameId, title, landscape, backHref }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/yxk-trial?gameId=${gameId}`);
        const data = (await res.json()) as { url?: string; error?: string };
        if (cancelled) return;
        if (!res.ok || !data.url) {
          setError(data.error ?? "Demo unavailable");
          return;
        }
        setSrc(data.url);
      } catch {
        if (!cancelled) setError("Network error — please try again");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gameId]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0a1628] text-white">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <Link
          href={backHref}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <h1 className="truncate text-sm font-bold">{title}</h1>
        <span className="w-16 text-right text-xs text-white/50">{landscape ? "Landscape" : "Portrait"}</span>
      </header>

      <div className="relative flex flex-1 items-center justify-center p-2 min-[960px]:p-4">
        {error ? (
          <div className="max-w-md rounded-2xl bg-white/5 px-6 py-8 text-center">
            <p className="text-lg font-bold text-white">{error}</p>
            <Link
              href={backHref}
              className="mt-4 inline-block rounded-xl bg-[var(--color-cozy-terracotta,#00d26a)] px-5 py-2.5 text-sm font-bold text-[#002b50]"
            >
              Back to game page
            </Link>
          </div>
        ) : src ? (
          <iframe
            title={`${title} trial`}
            src={src}
            className={`h-full w-full max-w-5xl rounded-xl border border-white/10 bg-black shadow-2xl ${
              landscape ? "aspect-video max-h-[min(80dvh,720px)]" : "aspect-[9/16] max-h-[min(92dvh,820px)] max-w-md"
            }`}
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-white/70">
            <div className="size-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <p className="text-sm">Loading demo…</p>
          </div>
        )}
      </div>
    </div>
  );
}
