import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLink } from "@/components/AppLink";
import { GamePlaySection } from "@/components/GamePlaySection";
import { GameTelegramSection } from "@/components/GameTelegramSection";
import { RelatedGames } from "@/components/RelatedGames";
import {
  getAllSlugs,
  getCompanyDisplay,
  getGameBySlug,
  resolvePlayCTA,
} from "@/lib/games";
import { canPlayInBrowser, showTelegramSection } from "@/lib/game-play";
import { platformLabel } from "@/lib/platforms";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return buildPageMetadata({
    title: `${game.title} — Play Free`,
    description: game.shortDescription,
    path: `/games/${game.slug}`,
    keywords: [game.title, game.genre, ...(game.categories ?? []), "free online game"],
  });
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const company = getCompanyDisplay(game);
  const cta = resolvePlayCTA(game);
  const playable = canPlayInBrowser(game);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12">
      <nav className="text-xs text-[var(--color-muted)]">
        <AppLink href="/games" className="hover:text-[var(--color-foreground)]">
          Games
        </AppLink>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--color-foreground)]">{game.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {game.genre}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            {game.title}
          </h1>
          {company ? (
            <p className="mt-2 text-sm text-[var(--color-muted)]">by {company.brandName}</p>
          ) : null}
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            {game.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {game.platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]"
              >
                {platformLabel(p)}
              </span>
            ))}
            {game.categories?.map((c) => (
              <AppLink
                key={c}
                href={`/categories/${encodeURIComponent(c.toLowerCase())}`}
                className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent-hover)]"
              >
                {c}
              </AppLink>
            ))}
          </div>

          {cta ? (
            <div className="mt-8">
              <AppLink
                href={cta.href}
                className="inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--color-accent-hover)]"
              >
                {cta.label}
              </AppLink>
            </div>
          ) : null}

          {playable ? (
            <div className="mt-10">
              <GamePlaySection game={game} />
            </div>
          ) : null}

          {showTelegramSection(game) ? (
            <div className="mt-8">
              <GameTelegramSection game={game} />
            </div>
          ) : null}

          <section className="mt-12">
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{game.about}</p>
            {game.features.length > 0 ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
                {game.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : null}
          </section>

          {game.howToPlay?.length ? (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">How to play</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--color-muted)]">
                {game.howToPlay.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm">
            <p className="font-semibold text-[var(--color-foreground)]">Details</p>
            <dl className="mt-3 space-y-2 text-[var(--color-muted)]">
              {game.version ? (
                <div className="flex justify-between gap-4">
                  <dt>Version</dt>
                  <dd className="text-[var(--color-foreground)]">{game.version}</dd>
                </div>
              ) : null}
              {game.size ? (
                <div className="flex justify-between gap-4">
                  <dt>Size</dt>
                  <dd className="text-[var(--color-foreground)]">{game.size}</dd>
                </div>
              ) : null}
              {game.contentRating ? (
                <div className="flex justify-between gap-4">
                  <dt>Rating</dt>
                  <dd className="text-[var(--color-foreground)]">{game.contentRating}</dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-5 flex flex-col gap-2 border-t border-[var(--color-border)] pt-4 text-xs">
              <AppLink
                href={`/games/${game.slug}/support`}
                className="text-[var(--color-accent-hover)] hover:underline"
              >
                Support
              </AppLink>
              <AppLink
                href={`/games/${game.slug}/privacy`}
                className="text-[var(--color-accent-hover)] hover:underline"
              >
                Privacy
              </AppLink>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)]">
          More games
        </h2>
        <div className="mt-6">
          <RelatedGames game={game} />
        </div>
      </section>
    </div>
  );
}
