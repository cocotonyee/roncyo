import { AppLink } from "@/components/AppLink";
import { AppStoreCard } from "@/components/AppStoreCard";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Roncyo — Free Online Games",
  description:
    "Play free browser games instantly on Roncyo. Arcade, puzzle, and casual titles — no downloads. Discover featured games and popular categories.",
  path: "/",
  keywords: [
    "free online games",
    "browser games",
    "play games online",
    "arcade games",
    "puzzle games",
    "Roncyo games",
  ],
});

const categories = Array.from(
  new Set(games.flatMap((g) => g.categories ?? [])),
).sort();

export default function HomePage() {
  const featured = games.filter((g) => g.badges?.includes("featured"));
  const playable = games.filter((g) => g.playUrl?.startsWith("/play/") || g.localPlayPath);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(3,216,203,0.18), transparent), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(3,216,203,0.08), transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
              {site.brand} Games
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
              Free online games.
              <br />
              Play instantly.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              {site.tagline}. Browse our catalog, jump into featured titles, and keep sessions short
              and fun.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AppLink
                href="/games"
                className="inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--color-accent-hover)]"
              >
                Browse all games
              </AppLink>
              {playable[0] ? (
                <AppLink
                  href={playable[0].playUrl ?? `/games/${playable[0].slug}`}
                  className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-foreground)]"
                >
                  Play {playable[0].title}
                </AppLink>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(featured.length ? featured : games).slice(0, 4).map((game) => (
              <AppLink
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-surface)] text-2xl">
                  {game.cardEmoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-accent-hover)]">
                    {game.title}
                  </span>
                  <span className="block truncate text-xs text-[var(--color-muted)]">{game.genre}</span>
                </span>
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
              Featured
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
              Play these next
            </h2>
          </div>
          <AppLink href="/games" className="text-sm font-semibold text-[var(--color-accent-hover)]">
            View all →
          </AppLink>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <AppStoreCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)]">
            Categories
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Jump in by mood or genre.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <AppLink
                key={cat}
                href={`/categories/${encodeURIComponent(cat.toLowerCase())}`}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
              >
                {cat}
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
