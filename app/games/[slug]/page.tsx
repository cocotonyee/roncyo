import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameScreenshotGallery } from "@/components/GameScreenshotGallery";
import { GameInfoSidebar } from "@/components/GameInfoSidebar";
import { GamePageHeader } from "@/components/GamePageHeader";
import { PublisherPanel } from "@/components/PublisherPanel";
import { getAllSlugs, getGameBySlug } from "@/lib/games";
import { getPublisherById } from "@/lib/publishers";
import { platformLabel } from "@/lib/platforms";
import { site, absoluteUrl } from "@/lib/site";

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
  return {
    title: game.title,
    description: game.shortDescription,
    openGraph: {
      title: game.title,
      description: game.shortDescription,
      url: absoluteUrl(`/games/${slug}`),
      images: game.heroImage.startsWith("http")
        ? [{ url: game.heroImage, width: 1920, height: 1080, alt: game.title }]
        : [{ url: absoluteUrl(game.heroImage), width: 1920, height: 1080, alt: game.title }],
    },
    other: publisher
      ? { "application:developer": publisherName }
      : undefined,
  };
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: game.title,
    description: game.shortDescription,
    applicationCategory: "GameApplication",
    operatingSystem: game.platforms.join(", "),
    ...(game.rating != null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: game.rating,
        reviewCount: game.reviewCount ?? 0,
      },
    }),
    ...(publisher && {
      author: {
        "@type": "Organization",
        name: publisherName,
        url: publisher.website,
      },
    }),
  };

  return (
    <div className="bg-[var(--color-cozy-surface)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                <section className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-8">
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

              <section className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
                  Download & platforms
                </h2>
                <p className="mt-2 text-sm text-[var(--color-cozy-brown-muted)]">
                  Choose your platform to download.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {game.platforms.includes("ios") &&
                    platformLink(platformLabel("ios"), game.appStoreUrl)}
                  {game.platforms.includes("android") &&
                    platformLink(platformLabel("android"), game.playStoreUrl)}
                  {game.platforms.includes("web") && platformLink("Web / browser", game.webUrl)}
                  {game.platforms.includes("telegram") &&
                    game.telegramUrl &&
                    platformLink(platformLabel("telegram"), game.telegramUrl)}
                  {game.platforms.includes("tiktok") &&
                    platformLink(platformLabel("tiktok"), game.tiktokUrl)}
                </div>
              </section>
            </div>

            <div className="min-[960px]:sticky min-[960px]:top-[88px] min-[960px]:self-start">
              <GameInfoSidebar game={game} />
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center gap-3 border-t border-[var(--color-cozy-brown)]/10 pt-8 text-center text-xs text-[var(--color-cozy-brown-muted)] min-[640px]:flex-row min-[640px]:justify-between min-[640px]:text-left">
            <p>
              Published by {publisherName} ·{" "}
              <Link href="/privacy-policy" className="font-semibold hover:underline">
                Privacy
              </Link>
              {" · "}
              <Link href="/terms-of-service" className="font-semibold hover:underline">
                Terms
              </Link>
            </p>
            <a
              href={`mailto:${site.emails.support}`}
              className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
            >
              {site.emails.support}
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
