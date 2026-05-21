import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GamePageHeader } from "@/components/GamePageHeader";
import { GamePlaySection } from "@/components/GamePlaySection";
import { GameTelegramSection } from "@/components/GameTelegramSection";
import { PawIcon, SectionEyebrow } from "@/components/CozyUI";
import { canPlayInBrowser, showTelegramSection } from "@/lib/game-play";
import { getAllSlugs, getGameBySlug } from "@/lib/games";
import { platformLabel } from "@/lib/platforms";
import { site, absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "Game" };
  return {
    title: game.title,
    description: game.shortDescription,
    openGraph: {
      title: game.title,
      description: game.shortDescription,
      url: absoluteUrl(`/games/${slug}`),
      images: game.heroImage.startsWith("http")
        ? [{ url: game.heroImage, width: 1920, height: 1080, alt: game.title }]
        : undefined,
    },
  };
}

function platformLink(label: string, href?: string) {
  if (!href) {
    return (
      <span className="inline-flex rounded-full border border-dashed border-[var(--color-cozy-brown)]/20 bg-[var(--color-cozy-surface)] px-4 py-2 text-sm font-medium text-[var(--color-cozy-brown-muted)]">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-cozy-brown)]/12 bg-white px-5 py-2.5 text-sm font-extrabold text-[var(--color-cozy-brown)] shadow-sm transition hover:border-[var(--color-cozy-terracotta)] hover:text-[var(--color-cozy-terracotta)]"
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

  const canPlayOnPage = canPlayInBrowser(game);
  const telegramPlay = showTelegramSection(game);

  return (
    <div className="bg-[var(--color-cozy-cream)]">
      <GamePageHeader game={game} />

      {canPlayOnPage ? (
        <div className="px-5 min-[960px]:px-[52px]">
          <GamePlaySection game={game} />
        </div>
      ) : null}

      {telegramPlay ? (
        <div className="px-5 py-8 min-[960px]:px-[52px]">
          <GameTelegramSection game={game} />
        </div>
      ) : null}

      <div className="px-5 py-12 min-[960px]:px-[52px] min-[960px]:py-16">
        <div className="mx-auto max-w-7xl space-y-14">
          <div className="grid grid-cols-1 gap-6 min-[960px]:grid-cols-5 min-[960px]:gap-8">
            <section className="min-[960px]:col-span-3 rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-7 shadow-[0_10px_36px_rgba(93,64,55,0.05)] min-[960px]:p-9">
              <SectionEyebrow>About the game</SectionEyebrow>
              <p className="mt-4 text-base leading-[1.85] text-[var(--color-cozy-brown-muted)]">
                {game.about}
              </p>
            </section>

            {game.story ? (
              <section className="flex flex-col justify-center rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-card)] p-7 min-[960px]:col-span-2 min-[960px]:p-9">
                <div className="mb-4 text-center text-5xl leading-none min-[960px]:text-left">
                  {game.cardEmoji}
                </div>
                <SectionEyebrow>Story</SectionEyebrow>
                <p className="mt-3 text-sm leading-[1.8] text-[var(--color-cozy-brown-muted)]">
                  {game.story}
                </p>
              </section>
            ) : null}
          </div>

          <section>
            <SectionEyebrow>Features</SectionEyebrow>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {game.features.map((f) => (
                <div
                  key={f}
                  className="flex gap-3 rounded-[20px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-5 transition hover:border-[var(--color-cozy-terracotta)]/30 hover:shadow-[0_8px_24px_rgba(93,64,55,0.07)]"
                >
                  <span className="mt-0.5 text-[var(--color-cozy-terracotta)]">✓</span>
                  <p className="text-sm font-medium leading-relaxed text-[var(--color-cozy-brown)]">{f}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-7 min-[960px]:p-9">
            <div className="flex flex-col gap-4 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
              <div>
                <SectionEyebrow>Available on</SectionEyebrow>
                <p className="mt-2 text-sm text-[var(--color-cozy-brown-muted)]">
                  Choose your platform to download or play.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {game.platforms.includes("ios") && platformLink(platformLabel("ios"), game.appStoreUrl)}
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

          <footer className="flex flex-col items-center gap-4 border-t border-[var(--color-cozy-brown)]/10 pt-8 text-center text-sm text-[var(--color-cozy-brown-muted)] min-[640px]:flex-row min-[640px]:justify-between min-[640px]:text-left">
            <p className="flex items-center gap-2 font-[family-name:var(--font-display)] font-bold text-[var(--color-cozy-brown)]">
              <PawIcon className="size-4 text-[var(--color-cozy-terracotta)]" />
              {game.title}
            </p>
            <p>
              <Link
                href={`/games/${game.slug}/support`}
                className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
              >
                Support
              </Link>
              <span className="mx-2 opacity-30">·</span>
              <Link
                href={`/games/${game.slug}/privacy`}
                className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
              >
                Privacy
              </Link>
              <span className="mx-2 opacity-30">·</span>
              <a
                href={`mailto:${site.emails.support}`}
                className="hover:text-[var(--color-cozy-brown)] hover:underline"
              >
                {site.emails.support}
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
