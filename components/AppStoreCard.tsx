import Link from "next/link";
import { GameIcon } from "@/components/GameIcon";
import type { Game } from "@/lib/games";
import { getCompanyDisplay, resolvePlayCTA } from "@/lib/games";
import { getPublisherById } from "@/lib/publishers";
import { platformLabel } from "@/lib/platforms";

const BADGE_LABELS: Record<NonNullable<Game["badges"]>[number], string> = {
  new: "New",
  featured: "Featured",
  "editor-choice": "Editor's Choice",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-cozy-brown)]">
      <span className="text-[var(--color-cozy-terracotta)]" aria-hidden>
        ★
      </span>
      {rating.toFixed(1)}
    </span>
  );
}

export function AppStoreCard({ game }: { game: Game }) {
  const publisher = getPublisherById(game.publisherId);
  const company = getCompanyDisplay(game);
  const cta = resolvePlayCTA(game);

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white shadow-[0_2px_12px_rgba(0,43,80,0.04)] transition hover:-translate-y-0.5 hover:border-[var(--color-cozy-terracotta)]/25 hover:shadow-[0_8px_28px_rgba(0,43,80,0.08)]"
    >
      <div className="flex items-start gap-4 p-4">
        <GameIcon game={game} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {game.badges?.map((badge) => (
              <span
                key={badge}
                className="rounded-md bg-[var(--color-cozy-terracotta)]/12 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[var(--color-cozy-terracotta)] uppercase"
              >
                {BADGE_LABELS[badge]}
              </span>
            ))}
            <span className="text-[10px] font-semibold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
              {game.genre}
            </span>
          </div>
          <h2 className="mt-1 truncate font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-cozy-brown)] group-hover:text-[var(--color-cozy-terracotta)]">
            {game.title}
          </h2>
          {(company ?? publisher) ? (
            <p className="mt-0.5 truncate text-xs text-[var(--color-cozy-brown-muted)]">
              {company?.brandName ?? publisher?.brandName}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            {game.rating != null ? <StarRating rating={game.rating} /> : null}
            {game.platforms.slice(0, 3).map((p) => (
              <span
                key={p}
                className="text-[10px] font-medium text-[var(--color-cozy-brown-muted)]"
              >
                {platformLabel(p).split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto border-t border-[var(--color-cozy-brown)]/6 px-4 py-3">
        <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-cozy-brown-muted)]">
          {game.shortDescription}
        </p>
        {cta ? (
          <span className="mt-2 inline-flex text-xs font-bold text-[var(--color-cozy-terracotta)]">
            {cta.label} →
          </span>
        ) : null}
      </div>
    </Link>
  );
}
