import { GamesCatalog } from "@/components/GamesCatalog";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "All Games — Free Online Games",
  description: `Browse all free games on ${site.brand}. Filter by platform, genre, and publisher.`,
  path: "/games",
  keywords: ["free games", "online games catalog", "browser games"],
});

export default function GamesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        Catalog
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-foreground)] sm:text-4xl">
        All games
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">
        Play in the browser when available, or continue on your favorite store and platforms.
      </p>
      <div className="mt-10">
        <GamesCatalog games={games} />
      </div>
    </section>
  );
}
