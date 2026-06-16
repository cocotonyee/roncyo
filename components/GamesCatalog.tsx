"use client";

import { useMemo, useState } from "react";
import { AppStoreCard } from "@/components/AppStoreCard";
import type { Game, GamePlatform } from "@/lib/games";
import { getAllPublishers } from "@/lib/publishers";
import { platformLabel } from "@/lib/platforms";

type FilterPlatform = GamePlatform | "all";

export function GamesCatalog({ games }: { games: Game[] }) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<FilterPlatform>("all");
  const [publisherId, setPublisherId] = useState<string>("all");

  const publishers = getAllPublishers();

  const platforms = useMemo(() => {
    const set = new Set<GamePlatform>();
    games.forEach((g) => g.platforms.forEach((p) => set.add(p)));
    return Array.from(set);
  }, [games]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter((g) => {
      if (publisherId !== "all" && g.publisherId !== publisherId) return false;
      if (platform !== "all" && !g.platforms.includes(platform)) return false;
      if (!q) return true;
      return (
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.shortDescription.toLowerCase().includes(q) ||
        g.categories?.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [games, query, platform, publisherId]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-4 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[640px]:flex-row min-[640px]:items-center min-[640px]:p-5">
        <div className="relative min-w-0 flex-1">
          <span
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-cozy-brown-muted)]"
            aria-hidden
          >
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps by name, genre, or category…"
            className="w-full rounded-xl border border-[var(--color-cozy-brown)]/12 bg-[var(--color-cozy-surface)] py-2.5 pr-4 pl-10 text-sm text-[var(--color-cozy-brown)] outline-none placeholder:text-[var(--color-cozy-brown-muted)]/60 focus:border-[var(--color-cozy-terracotta)]"
            aria-label="Search apps"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {publishers.length > 1 ? (
            <select
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
              className="rounded-xl border border-[var(--color-cozy-brown)]/12 bg-[var(--color-cozy-surface)] px-3 py-2.5 text-sm font-medium text-[var(--color-cozy-brown)] outline-none focus:border-[var(--color-cozy-terracotta)]"
              aria-label="Filter by publisher"
            >
              <option value="all">All publishers</option>
              {publishers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brandName}
                </option>
              ))}
            </select>
          ) : null}
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as FilterPlatform)}
            className="rounded-xl border border-[var(--color-cozy-brown)]/12 bg-[var(--color-cozy-surface)] px-3 py-2.5 text-sm font-medium text-[var(--color-cozy-brown)] outline-none focus:border-[var(--color-cozy-terracotta)]"
            aria-label="Filter by platform"
          >
            <option value="all">All platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {platformLabel(p)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((g) => (
            <li key={g.slug}>
              <AppStoreCard game={g} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-white/25 bg-white/10 px-6 py-12 text-center">
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
            No apps match your search
          </p>
          <p className="mt-2 text-sm text-white/70">
            Try adjusting filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
}
