import { games } from "@/lib/games";

function staticPlaySlugs() {
  const slugs = new Set<string>();
  for (const g of games) {
    if (g.localPlayPath) slugs.add(g.slug);
    if (g.telegramMiniApp) slugs.add(g.slug);
  }
  return [...slugs];
}

/** Slugs with files under `public/play/[slug]/` (browser and/or Telegram Mini App). */
export const hostedPlaySlugs = staticPlaySlugs();

export function playBasePath(slug: string) {
  return `/play/${slug}/`;
}

export function playIndexUrl(slug: string) {
  return `${playBasePath(slug)}index.html`;
}

/** Fullscreen / direct play URL (same as iframe entry). */
export function playPageUrl(slug: string) {
  return playBasePath(slug);
}

export function isTelegramOnlyGame(slug: string) {
  const g = games.find((x) => x.slug === slug);
  return Boolean(g?.telegramMiniApp && !g.localPlayPath);
}
