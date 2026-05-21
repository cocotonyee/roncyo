import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GamePageHeader } from "@/components/GamePageHeader";
import { GamePlaySection } from "@/components/GamePlaySection";
import { SectionEyebrow } from "@/components/CozyUI";
import { canPlayInBrowser } from "@/lib/game-play";
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

function storeRow(label: string, href?: string) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-[var(--color-cozy-brown)]/10 py-3 text-[var(--color-cozy-brown-muted)] last:border-0">
      <span className="font-medium text-[var(--color-cozy-brown)]">{label}</span>
      {href ? (
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className="shrink-0 font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-cozy-terracotta)] hover:underline"
        >
          Open store →
        </a>
      ) : (
        <span className="text-xs font-semibold text-[var(--color-cozy-brown-muted)]">Coming soon</span>
      )}
    </li>
  );
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const canPlayOnPage = canPlayInBrowser(game);

  return (
    <div className="bg-[var(--color-cozy-cream)]">
      <GamePageHeader game={game} />

      {canPlayOnPage ? (
        <div className="px-5 py-8 min-[960px]:px-[52px] min-[960px]:py-10">
          <GamePlaySection game={game} />
        </div>
      ) : null}

      <div className="px-5 pb-16 min-[960px]:px-[52px] min-[960px]:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-14">
            <section className="rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-8 shadow-[0_12px_40px_rgba(93,64,55,0.06)]">
              <SectionEyebrow>About the game</SectionEyebrow>
              <p className="mt-2 leading-relaxed text-[var(--color-cozy-brown-muted)]">{game.about}</p>
            </section>

            {game.story ? (
              <section className="flex flex-col justify-center rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-card)] p-8">
                <div className="mb-6 flex justify-center text-[72px] leading-none">{game.cardEmoji}</div>
                <SectionEyebrow>Story</SectionEyebrow>
                <p className="mt-2 leading-relaxed text-[var(--color-cozy-brown-muted)]">{game.story}</p>
              </section>
            ) : null}
          </div>

          <section className="mt-12">
            <SectionEyebrow>Features</SectionEyebrow>
            <div className="mt-6 grid gap-4 min-[640px]:grid-cols-2 min-[960px]:grid-cols-4">
              {game.features.map((f) => (
                <div
                  key={f}
                  className="rounded-[24px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(93,64,55,0.08)]"
                >
                  <span className="text-[var(--color-cozy-terracotta)]">✓</span>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-cozy-brown)]">{f}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-card)] p-8">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-black text-[var(--color-cozy-brown)]">
              Available on
            </h2>
            <ul className="mt-2">
              {game.platforms.includes("ios") && storeRow(platformLabel("ios"), game.appStoreUrl)}
              {game.platforms.includes("android") &&
                storeRow(platformLabel("android"), game.playStoreUrl)}
              {game.platforms.includes("web") && storeRow("Web / browser", game.webUrl)}
              {game.platforms.includes("tiktok") && storeRow(platformLabel("tiktok"), game.tiktokUrl)}
            </ul>
          </section>

          <p className="mt-10 text-center text-sm text-[var(--color-cozy-brown-muted)]">
            <Link
              href={`/games/${game.slug}/support`}
              className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
            >
              Support
            </Link>
            <span className="mx-2 text-[var(--color-cozy-brown)]/20">·</span>
            <Link
              href={`/games/${game.slug}/privacy`}
              className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
            >
              Privacy
            </Link>
            <span className="mx-2 text-[var(--color-cozy-brown)]/20">·</span>
            <a
              href={`mailto:${site.emails.support}`}
              className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
            >
              {site.emails.support}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
