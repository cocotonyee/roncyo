import Link from "next/link";
import type { Game } from "@/lib/games";
import { getPublisherById } from "@/lib/publishers";

export function MoreFromPublisher({ games, currentSlug }: { games: Game[]; currentSlug: string }) {
  const related = games.filter((g) => g.slug !== currentSlug);
  if (related.length === 0) return null;

  const publisher = related[0] ? getPublisherById(related[0].publisherId) : null;

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-cozy-brown)]">
        More from {publisher?.brandName ?? "this publisher"}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {related.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/games/${g.slug}`}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-cozy-brown)]/10 bg-white p-3 transition hover:border-[var(--color-cozy-terracotta)]/30 hover:shadow-[0_4px_16px_rgba(0,43,80,0.06)]"
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-xl text-xl"
                style={{ background: g.cardColor }}
              >
                {g.cardEmoji}
              </div>
              <div className="min-w-0">
                <p className="truncate font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-cozy-brown)]">
                  {g.title}
                </p>
                <p className="truncate text-xs text-[var(--color-cozy-brown-muted)]">{g.genre}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
