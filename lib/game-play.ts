import type { Game } from "@/lib/games";

export { playBasePath as defaultLocalPlayPath, playIndexUrl, playPageUrl } from "@/lib/play-hosting";

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
