import { games } from "@/lib/games";

/** Slugs with a folder under `public/play/[slug]/` */
export const hostedPlaySlugs = games
  .filter((g) => g.localPlayPath)
  .map((g) => g.slug);

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
