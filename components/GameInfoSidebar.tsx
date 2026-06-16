import Link from "next/link";
import type { ReactNode } from "react";
import {
  CalendarIcon,
  PlatformIconRow,
  ShieldIcon,
  StarIcon,
  TagIcon,
  VersionIcon,
} from "@/components/StoreIcons";
import type { Game } from "@/lib/games";
import { platformLabel } from "@/lib/platforms";

const ROW_ICONS: Record<string, ReactNode> = {
  Version: <VersionIcon />,
  Updated: <CalendarIcon />,
  Released: <CalendarIcon />,
  Size: <TagIcon />,
  "Content rating": <ShieldIcon />,
  Category: <TagIcon />,
  Languages: <TagIcon />,
  Platforms: null,
};

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  if (!value) return null;
  const icon = ROW_ICONS[label];
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--color-cozy-brown)]/6 py-3 last:border-0">
      <dt className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[var(--color-cozy-brown-muted)]">
        {icon ? <span className="text-[var(--color-cozy-brown-muted)]">{icon}</span> : null}
        {label}
      </dt>
      <dd className="text-right text-xs font-semibold text-[var(--color-cozy-brown)]">{value}</dd>
    </div>
  );
}

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function GameInfoSidebar({ game }: { game: Game }) {
  return (
    <aside className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-5 shadow-[0_2px_12px_rgba(0,43,80,0.04)]">
      <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
        <TagIcon className="size-4 text-[var(--color-cozy-brown-muted)]" />
        App Information
      </h2>

      {game.rating != null ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-[var(--color-cozy-surface)] p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white text-[var(--color-cozy-terracotta)] shadow-sm">
            <StarIcon className="size-5" />
          </div>
          <div>
            <div className="font-[family-name:var(--font-display)] text-2xl font-black leading-none text-[var(--color-cozy-brown)]">
              {game.rating.toFixed(1)}
            </div>
            {game.reviewCount != null ? (
              <p className="mt-0.5 text-xs text-[var(--color-cozy-brown-muted)]">
                {game.reviewCount.toLocaleString()} ratings
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-1.5">
        <PlatformIconRow platforms={game.platforms} />
      </div>

      <dl className="mt-4">
        <InfoRow label="Version" value={game.version} />
        <InfoRow label="Updated" value={formatDate(game.lastUpdated)} />
        <InfoRow label="Released" value={formatDate(game.releaseDate)} />
        <InfoRow label="Size" value={game.size} />
        <InfoRow label="Content rating" value={game.contentRating} />
        <InfoRow label="Category" value={game.categories?.join(", ")} />
        <InfoRow label="Languages" value={game.languages?.join(", ")} />
        <InfoRow
          label="Platforms"
          value={game.platforms.map(platformLabel).join(", ")}
        />
      </dl>

      <div className="mt-4 flex flex-col gap-2 border-t border-[var(--color-cozy-brown)]/6 pt-4">
        <Link
          href={`/games/${game.slug}/support`}
          className="text-xs font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
        >
          App Support →
        </Link>
        <Link
          href={`/games/${game.slug}/privacy`}
          className="text-xs font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
        >
          Privacy Policy →
        </Link>
      </div>
    </aside>
  );
}
