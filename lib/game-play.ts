import type { Game } from "@/lib/games";

/** Static HTML5 build folder under `public/play/[slug]/` → served at `/play/[slug]/` */
export function defaultLocalPlayPath(slug: string) {
  return `/play/${slug}/`;
}

/** URL loaded inside the game page iframe (local build preferred). */
export function getGamePlaySrc(game: Game): string | null {
  if (game.localPlayPath) return game.localPlayPath;
  if (game.embedUrl) return game.embedUrl;
  if (game.webUrl) return game.webUrl;
  return null;
}

export function canPlayInBrowser(game: Game): boolean {
  return Boolean(getGamePlaySrc(game));
}
