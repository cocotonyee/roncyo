import type { Metadata } from "next";
import Link from "next/link";
import { InnerPage, PageIntro } from "@/components/InnerPage";
import { games } from "@/lib/games";
import { platformLabel } from "@/lib/platforms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Games",
  description: `Games and products published by ${site.brand}.`,
};

export default function GamesIndexPage() {
  return (
    <InnerPage wide glow="citrus">
      <PageIntro
        eyebrow="Catalog"
        title="Games & products"
        lead="Each title has store links, per-game support, and privacy details you can paste into App Store Connect, Google Play, and other consoles."
        tone="yellow"
      />
      <ul className="mx-auto flex max-w-4xl flex-col gap-4">
        {games.map((g, idx) => (
          <li key={g.slug}>
            <div className="rounded-[22px] border-2 border-[var(--color-roncy-border)] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition hover:border-[var(--color-roncy-teal)] hover:shadow-[0_16px_48px_rgba(0,212,200,0.1)] min-[640px]:p-8">
              <div className="flex flex-col gap-6 min-[640px]:flex-row min-[640px]:items-start min-[640px]:justify-between">
                <div className="flex gap-5 min-[640px]:gap-8">
                  <span className="font-[family-name:var(--font-display)] text-sm font-black tracking-wider text-[var(--color-roncy-border)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-roncy-navy)]">
                      <Link href={`/games/${g.slug}`} className="hover:text-[var(--color-roncy-teal2)]">
                        {g.title}
                      </Link>
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-roncy-muted)]">
                      {g.shortDescription}
                    </p>
                    <p className="mt-3 text-xs font-medium text-[var(--color-roncy-muted)]">
                      {g.platforms.map(platformLabel).join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/games/${g.slug}`}
                    className="rounded-full bg-[var(--color-roncy-teal)] px-6 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(0,212,200,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,212,200,0.35)]"
                  >
                    Game page
                  </Link>
                  <Link
                    href={`/games/${g.slug}/support`}
                    className="rounded-full border-2 border-[var(--color-roncy-border)] px-5 py-2.5 text-sm font-bold text-[var(--color-roncy-text)] transition hover:border-[var(--color-roncy-navy)] hover:bg-[var(--color-roncy-surface)]"
                  >
                    Support
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </InnerPage>
  );
}
