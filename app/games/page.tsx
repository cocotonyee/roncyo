import type { Metadata } from "next";
import Link from "next/link";
import { PawIcon, SectionEyebrow } from "@/components/CozyUI";
import { games } from "@/lib/games";
import { platformLabel } from "@/lib/platforms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Games",
  description: `Cozy games published by ${site.brand}.`,
};

export default function GamesIndexPage() {
  return (
    <div className="bg-[var(--color-cozy-cream)] px-5 py-14 min-[960px]:px-[52px] min-[960px]:py-18">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>Our Games</SectionEyebrow>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-black text-[var(--color-cozy-brown)]">
          Games & products
        </h1>
        <p className="mt-3 max-w-xl text-base text-[var(--color-cozy-brown-muted)]">
          Open a game page to play in the browser and read about the title.
        </p>

        <ul className="mt-12 flex flex-col gap-6">
          {games.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/games/${g.slug}`}
                className="group grid grid-cols-1 overflow-hidden rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-white shadow-[0_12px_40px_rgba(93,64,55,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--color-cozy-terracotta)]/40 hover:shadow-[0_16px_48px_rgba(93,64,55,0.1)] min-[640px]:grid-cols-[200px_1fr_auto]"
              >
                <div
                  className="flex aspect-[4/3] items-center justify-center text-[64px] min-[640px]:aspect-auto min-[640px]:min-h-[180px]"
                  style={{ background: g.cardColor }}
                >
                  {g.cardEmoji}
                </div>
                <div className="flex flex-col justify-center p-6 min-[640px]:p-8">
                  <span className="text-[10px] font-bold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
                    {g.genre}
                  </span>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-black text-[var(--color-cozy-brown)] group-hover:text-[var(--color-cozy-terracotta)]">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
                    {g.shortDescription}
                  </p>
                  <p className="mt-3 text-xs font-medium text-[var(--color-cozy-brown-muted)]">
                    {g.platforms.map(platformLabel).join(" · ")}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 border-t border-[var(--color-cozy-brown)]/8 p-6 min-[640px]:border-t-0 min-[640px]:border-l min-[640px]:px-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cozy-terracotta)] px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white">
                    <PawIcon className="size-4" />
                    Open game
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
