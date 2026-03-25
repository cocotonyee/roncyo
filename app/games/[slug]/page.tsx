import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GamePageHero } from "@/components/GamePageHero";
import { ContentPanel, InnerPage } from "@/components/InnerPage";
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
    <li className="flex items-center justify-between gap-3 border-b border-[var(--color-roncy-border)] py-3 text-[var(--color-roncy-muted)] last:border-0">
      <span className="font-medium text-[var(--color-roncy-text)]">{label}</span>
      {href ? (
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className="shrink-0 font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-roncy-teal2)] hover:text-[var(--color-roncy-teal)] hover:underline"
        >
          Open store →
        </a>
      ) : (
        <span className="text-xs font-semibold text-[var(--color-roncy-muted)]">Coming soon</span>
      )}
    </li>
  );
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <>
      <GamePageHero game={game} />
      <InnerPage glow="pixel" className="!pt-8 md:!pt-12">
        <ContentPanel className="mb-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-roncy-navy)]">
            About the game
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--color-roncy-muted)]">{game.about}</p>
        </ContentPanel>

        <ContentPanel className="mb-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-roncy-navy)]">
            Features
          </h2>
          <ul className="mt-4 space-y-2">
            {game.features.map((f) => (
              <li
                key={f}
                className="flex gap-3 rounded-xl bg-[var(--color-roncy-surface)] px-4 py-3 text-sm text-[var(--color-roncy-text)]"
              >
                <span className="text-[var(--color-roncy-teal)]">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </ContentPanel>

        <ContentPanel className="mb-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-roncy-navy)]">
            Available on
          </h2>
          <ul className="mt-2">
            {game.platforms.includes("ios") && storeRow(platformLabel("ios"), game.appStoreUrl)}
            {game.platforms.includes("android") &&
              storeRow(platformLabel("android"), game.playStoreUrl)}
            {game.platforms.includes("web") && storeRow("Web / browser", game.webUrl)}
            {game.platforms.includes("tiktok") && storeRow(platformLabel("tiktok"), game.tiktokUrl)}
          </ul>
        </ContentPanel>

        <p className="text-center text-sm text-[var(--color-roncy-muted)]">
          <Link href={`/games/${game.slug}/support`} className="font-semibold text-[var(--color-roncy-teal2)] hover:underline">
            Support
          </Link>
          <span className="mx-2 text-[var(--color-roncy-border)]">·</span>
          <Link href={`/games/${game.slug}/privacy`} className="font-semibold text-[var(--color-roncy-teal2)] hover:underline">
            Privacy
          </Link>
          <span className="mx-2 text-[var(--color-roncy-border)]">·</span>
          <a href={`mailto:${site.emails.support}`} className="font-semibold text-[var(--color-roncy-teal2)] hover:underline">
            {site.emails.support}
          </a>
        </p>
      </InnerPage>
    </>
  );
}
