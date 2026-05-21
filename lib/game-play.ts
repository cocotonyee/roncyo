import type { Game } from "@/lib/games";

export { playBasePath as defaultLocalPlayPath, playIndexUrl, playPageUrl } from "@/lib/play-hosting";

/** URL loaded inside the game page iframe (local build preferred). Telegram-only builds are excluded. */
export function getGamePlaySrc(game: Game): string | null {
  if (game.telegramMiniApp && !game.localPlayPath) return null;
  if (game.localPlayPath) return game.localPlayPath;
  if (game.embedUrl) return game.embedUrl;
  if (game.webUrl) return game.webUrl;
  return null;
}

export function canPlayInBrowser(game: Game): boolean {
  return Boolean(getGamePlaySrc(game));
}

/** Full-page Telegram notice (no browser iframe). */
export function showTelegramSection(game: Game): boolean {
  return Boolean(game.telegramMiniApp && game.telegramUrl);
}

export function hasTelegramPlay(game: Game): boolean {
  return Boolean(game.telegramUrl);
}
