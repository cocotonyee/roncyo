import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameScreenshotGallery } from "@/components/GameScreenshotGallery";
import { GameInfoSidebar } from "@/components/GameInfoSidebar";
import { GamePageHeader } from "@/components/GamePageHeader";
import { PublisherPanel } from "@/components/PublisherPanel";
import { RelatedGames } from "@/components/RelatedGames";
import { getAllSlugs, getGameBySlug } from "@/lib/games";
import { getPublisherById } from "@/lib/publishers";
import { platformLabel } from "@/lib/platforms";
import {
  buildGameChangelog,
  buildGameFaq,
  buildGameplayContent,
  gameVideoGameJsonLd,
} from "@/lib/game-seo";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  gameKeywords,
  gameSeoDescription,
  gameSeoTitle,
} from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "App" };
  const publisher = getPublisherById(game.publisherId);
  const publisherName = game.companyName ?? publisher?.brandName ?? site.brand;

  return buildPageMetadata({
    title: gameSeoTitle(game),
    description: gameSeoDescription(game, publisherName),
    path: `/games/${slug}`,
    keywords: gameKeywords(game, publisherName),
    image: game.heroImage,
    imageAlt: `${game.title} — ${game.genre} game on ${site.brand}`,
    type: "article",
  });
}

function platformLink(label: string, href?: string) {
  if (!href) {
    return (
      <span className="inline-flex rounded-xl border border-dashed border-[var(--color-cozy-brown)]/20 bg-[var(--color-cozy-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-cozy-brown-muted)]">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-cozy-brown)]/12 bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-cozy-brown)] shadow-sm transition hover:border-[var(--color-cozy-terracotta)] hover:text-[var(--color-cozy-terracotta)]"
    >
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const publisher = getPublisherById(game.publisherId);
  const publisherName = game.companyName ?? publisher?.brandName ?? site.brand;

  const jsonLd = gameVideoGameJsonLd(game, slug, publisherName);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "App Store", path: "/games" },
    { name: game.title, path: `/games/${slug}` },
  ]);

  const gameplay = buildGameplayContent(game, publisherName);
  const faqItems = buildGameFaq(game, publisherName, slug);
  const changelog = buildGameChangelog(game);

  const sectionClass =
    "rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-8";

  return (
    <div className="bg-[var(--color-cozy-surface)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <GamePageHeader game={game} />

      <div className="px-5 py-10 min-[960px]:px-[52px] min-[960px]:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 min-[960px]:grid-cols-[1fr_320px] min-[960px]:gap-10">
            <div className="space-y-8">
              {publisher ? <PublisherPanel publisher={publisher} game={game} /> : null}

              <GameScreenshotGallery game={game} />

              <section className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
                  About this app
                </h2>
                <p className="mt-4 text-base leading-[1.85] text-[var(--color-cozy-brown-muted)]">
                  {game.about}
                </p>
                {game.story ? (
                  <div className="mt-6 rounded-xl bg-[var(--color-cozy-surface)] p-5">
                    <h3 className="text-xs font-bold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
                      Story
                    </h3>
                    <p className="mt-2 text-sm leading-[1.8] text-[var(--color-cozy-brown-muted)]">
                      {game.story}
                    </p>
                  </div>
                ) : null}
              </section>

              <section className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
                  Features
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {game.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3 rounded-xl border border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-surface)]/50 p-4"
                    >
                      <span className="mt-0.5 shrink-0 text-[var(--color-cozy-terracotta)]">✓</span>
                      <span className="text-sm font-medium leading-relaxed text-[var(--color-cozy-brown)]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {game.howToPlay && game.howToPlay.length > 0 ? (
                <section className={sectionClass}>
                  <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
                    How to play
                  </h2>
                  <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
                    {game.howToPlay.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
              ) : null}

              <article className={sectionClass}>
                <section>
                  <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
                    Core features &amp; gameplay
                  </h2>
                  <p className="mt-4 text-base leading-[1.85] text-[var(--color-cozy-brown-muted)]">
                    {gameplay.intro}
                  </p>
                  <details className="group mt-5 rounded-xl border border-[var(--color-cozy-brown)]/10 bg-[var(--color-cozy-surface)]/60 open:bg-[var(--color-cozy-surface)]">
                    <summary className="cursor-pointer list-none px-5 py-4 text-sm font-bold text-[var(--color-cozy-terracotta)] marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">Read the full gameplay guide →</span>
                      <span className="hidden group-open:inline">Hide full gameplay guide ↑</span>
                    </summary>
                    <div className="space-y-4 border-t border-[var(--color-cozy-brown)]/8 px-5 py-4">
                      {gameplay.expandedParagraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="text-sm leading-[1.85] text-[var(--color-cozy-brown-muted)]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </details>
                </section>
              </article>

              <section className={sectionClass} aria-labelledby="game-faq-heading">
                <h2
                  id="game-faq-heading"
                  className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase"
                >
                  Frequently asked questions
                </h2>
                <div className="mt-5 space-y-3">
                  {faqItems.map((item) => (
                    <details
                      key={item.question}
                      className="rounded-xl border border-[var(--color-cozy-brown)]/10 bg-[var(--color-cozy-surface)]/40 open:bg-[var(--color-cozy-surface)]"
                    >
                      <summary className="cursor-pointer px-5 py-4 text-sm font-bold leading-snug text-[var(--color-cozy-brown)] marker:content-none [&::-webkit-details-marker]:hidden">
                        {item.question}
                      </summary>
                      <p className="border-t border-[var(--color-cozy-brown)]/8 px-5 py-4 text-sm leading-[1.85] text-[var(--color-cozy-brown-muted)]">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              <section className={sectionClass} aria-labelledby="game-changelog-heading">
                <h2
                  id="game-changelog-heading"
                  className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase"
                >
                  Update log
                </h2>
                <article className="mt-5 rounded-xl border border-[var(--color-cozy-brown)]/10 bg-[var(--color-cozy-surface)]/50 p-5">
                  <h3 className="text-sm font-bold text-[var(--color-cozy-brown)]">
                    Version {changelog.version}
                    <span className="ml-2 font-medium text-[var(--color-cozy-brown-muted)]">
                      · {changelog.date}
                    </span>
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-[1.85] text-[var(--color-cozy-brown-muted)]">
                    {changelog.entries.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </article>
              </section>

              <section className={sectionClass}>
                <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
                  Download & platforms
                </h2>
                <p className="mt-2 text-sm text-[var(--color-cozy-brown-muted)]">
                  Choose your platform to download or{" "}
                  {game.playUrl ? (
                    <Link href={game.playUrl} className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline">
                      play the demo
                    </Link>
                  ) : (
                    "get the app"
                  )}
                  .
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {game.platforms.includes("ios") &&
                    platformLink(platformLabel("ios"), game.appStoreUrl)}
                  {game.platforms.includes("android") &&
                    platformLink(platformLabel("android"), game.playStoreUrl)}
                  {game.platforms.includes("web") &&
                    platformLink("Web / browser", game.playUrl ?? game.webUrl)}
                  {game.platforms.includes("telegram") &&
                    game.telegramUrl &&
                    platformLink(platformLabel("telegram"), game.telegramUrl)}
                  {game.platforms.includes("tiktok") &&
                    platformLink(platformLabel("tiktok"), game.tiktokUrl)}
                </div>
              </section>

              <RelatedGames game={game} />
            </div>

            <div className="min-[960px]:sticky min-[960px]:top-[88px] min-[960px]:self-start">
              <GameInfoSidebar game={game} />
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center gap-3 border-t border-[var(--color-cozy-brown)]/10 pt-8 text-center text-xs text-[var(--color-cozy-brown-muted)] min-[640px]:flex-row min-[640px]:justify-between min-[640px]:text-left">
            <p>
              Published by {publisherName} ·{" "}
              <Link href="/games" className="font-semibold hover:underline">
                App Store
              </Link>
              {" · "}
              <Link href={`/games/${slug}/support`} className="font-semibold hover:underline">
                Support
              </Link>
              {" · "}
              <Link href={`/games/${slug}/privacy`} className="font-semibold hover:underline">
                Privacy
              </Link>
              {" · "}
              <Link href="/privacy-policy" className="font-semibold hover:underline">
                Site Privacy
              </Link>
              {" · "}
              <Link href="/terms-of-service" className="font-semibold hover:underline">
                Terms
              </Link>
            </p>
            <a
              href={`mailto:${game.companyEmail ?? site.emails.support}`}
              className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
            >
              {game.companyEmail ?? site.emails.support}
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
