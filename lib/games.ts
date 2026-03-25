export type GamePlatform = "ios" | "android" | "web" | "tiktok";

export type Game = {
  slug: string;
  title: string;
  shortDescription: string;
  /** Full-bleed hero (`/public/...` or `https://...`) */
  heroImage: string;
  about: string;
  features: string[];
  platforms: GamePlatform[];
  /** Primary “play” CTA; if omitted, uses webUrl → tiktokUrl → app store URLs */
  playUrl?: string;
  playButtonLabel?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  webUrl?: string;
  tiktokUrl?: string;
  sdks: string[];
  collectsPersonalData: boolean;
  childrenTargeted: boolean;
  progressNote: string;
  knownIssues?: string;
};

export function resolvePlayCTA(game: Game): { href: string; label: string } | null {
  if (game.playUrl) {
    return {
      href: game.playUrl,
      label: game.playButtonLabel ?? "Play now",
    };
  }
  if (game.webUrl) return { href: game.webUrl, label: game.playButtonLabel ?? "Play in browser" };
  if (game.tiktokUrl)
    return { href: game.tiktokUrl, label: game.playButtonLabel ?? "Play on TikTok" };
  if (game.appStoreUrl)
    return { href: game.appStoreUrl, label: game.playButtonLabel ?? "Download on App Store" };
  if (game.playStoreUrl)
    return { href: game.playStoreUrl, label: game.playButtonLabel ?? "Get on Google Play" };
  return null;
}

export const games: Game[] = [
  {
    slug: "kitty-merge",
    title: "Kitty Merge",
    shortDescription:
      "Merge cute cats, unlock new breeds, and unwind with satisfying combos — short rounds or a longer chill session.",
    heroImage:
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=1920&q=80",
    about:
      "Kitty Merge is a casual merge game built for relaxed play. Clear goals, gentle pacing, and no surprise permissions — pick up when you have a minute and put it down anytime.",
    features: [
      "Merge progression with collectible cats",
      "Sessions that fit a break or a longer run",
      "Browser and mobile friendly",
      "No account required to start",
    ],
    platforms: ["web", "ios", "android"],
    webUrl: "https://milfun.itch.io/mondo-drop",
    playButtonLabel: "Play Online",
    appStoreUrl: "https://apps.apple.com/",
    playStoreUrl: "https://play.google.com/",
    sdks: ["Firebase Analytics"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Progress may be saved locally on your device or to your account, depending on the version you use. Reinstalling the app may reset local progress.",
    knownIssues:
      "We are not aware of critical issues on current OS versions. If something breaks after an OS update, email us with your device model and OS version.",
  },
];

export function getGameBySlug(slug: string) {
  return games.find((g) => g.slug === slug);
}

export function getAllSlugs() {
  return games.map((g) => g.slug);
}
