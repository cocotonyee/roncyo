import type { Metadata } from "next";
import { GamesCatalog } from "@/components/GamesCatalog";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "App Store — Browse Games & Apps",
  description: `Browse the full ${site.brand} catalog — puzzle games, casual apps, tower defense, simulations, and web demos with publisher info and download links.`,
  path: "/games",
  keywords: ["game catalog", "browse mobile games", "app listings", "play demo"],
});

export default function GamesIndexPage() {
  return (
    <div className="bg-[var(--color-cozy-cream)] px-5 py-10 min-[960px]:px-[52px] min-[960px]:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/20 bg-white p-6 shadow-[0_8px_32px_rgba(0,43,80,0.12)] min-[960px]:p-8">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--color-cozy-brown-muted)] uppercase">
            {site.brand} App Store
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] font-black text-[var(--color-cozy-brown)]">
            Discover apps & games
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-cozy-brown-muted)]">
            A curated catalog of mobile and web applications from verified publishers.
            Each listing includes full app details, publisher information, and direct download links.
          </p>
        </div>

        <div className="mt-8">
          <GamesCatalog games={games} />
        </div>
      </div>
    </div>
  );
}
