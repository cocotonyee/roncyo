import Link from "next/link";
import { AppStoreCard } from "@/components/AppStoreCard";
import { getRelatedGames, type Game } from "@/lib/games";
import { site } from "@/lib/site";

export function RelatedGames({ game, limit = 4 }: { game: Game; limit?: number }) {
  const related = getRelatedGames(game.slug, limit);
  if (related.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
            More {game.genre} games
          </h2>
          <p className="mt-1 text-sm text-[var(--color-cozy-brown-muted)]">
            Explore similar titles in the {site.brand} catalog.
          </p>
        </div>
        <Link
          href="/games"
          className="text-sm font-bold text-[var(--color-cozy-terracotta)] hover:underline"
        >
          View all apps →
        </Link>
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {related.map((g) => (
          <li key={g.slug}>
            <AppStoreCard game={g} />
          </li>
        ))}
      </ul>
    </section>
  );
}
