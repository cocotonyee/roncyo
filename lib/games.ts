export type GamePlatform = "ios" | "android" | "web" | "tiktok";

export type Game = {
  slug: string;
  title: string;
  genre: string;
  shortDescription: string;
  /** Full-bleed hero (`/public/...` or `https://...`) */
  heroImage: string;
  /** Card accent on homepage */
  cardColor: string;
  cardEmoji: string;
  about: string;
  story?: string;
  features: string[];
  howToPlay?: string[];
  platforms: GamePlatform[];
  /**
   * Self-hosted Web build under `public/play/[slug]/` (served at `/play/[slug]/`).
   * Drop your game's index.html + assets there to play on `/games/[slug]`.
   */
  localPlayPath?: string;
  /** Primary “play” CTA; if omitted, uses local → embed → store URLs */
  playUrl?: string;
  playButtonLabel?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  webUrl?: string;
  /** External embed URL (itch.io, etc.) — used if no localPlayPath */
  embedUrl?: string;
  tiktokUrl?: string;
  sdks: string[];
  collectsPersonalData: boolean;
  childrenTargeted: boolean;
  progressNote: string;
  knownIssues?: string;
};

const PLAY_MOCHI_CATS =
  "https://play.google.com/store/apps/details?id=com.roncyo.mochicats" as const;
const PLAY_COZY_CAT =
  "https://play.google.com/store/apps/details?id=com.roncyo.cozycat" as const;

export function resolvePlayCTA(game: Game): { href: string; label: string; internal?: boolean } | null {
  if (game.localPlayPath || game.embedUrl || game.webUrl) {
    return {
      href: `/games/${game.slug}#play`,
      label: game.playButtonLabel ?? "Play now",
      internal: true,
    };
  }
  if (game.playUrl) {
    return {
      href: game.playUrl,
      label: game.playButtonLabel ?? "Play now",
    };
  }
  if (game.playStoreUrl)
    return {
      href: game.playStoreUrl,
      label: game.playButtonLabel ?? "Get on Google Play",
    };
  if (game.webUrl) return { href: game.webUrl, label: game.playButtonLabel ?? "Play in browser" };
  if (game.tiktokUrl)
    return { href: game.tiktokUrl, label: game.playButtonLabel ?? "Play on TikTok" };
  if (game.appStoreUrl)
    return { href: game.appStoreUrl, label: game.playButtonLabel ?? "Download on App Store" };
  return null;
}

export const games: Game[] = [
  {
    slug: "mochi-cats",
    title: "Mochi Cats",
    genre: "Merge Puzzle",
    shortDescription:
      "Drop adorable cats, merge matching kitties, and keep the stack from overflowing — cozy merge puzzle fun with a high-score challenge.",
    heroImage:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1920&q=80",
    cardColor: "#FFD6C8",
    cardEmoji: "🐱",
    about:
      "Mochi Cats is a cute cat merge puzzle that blends relaxing casual play, fluffy kitty collection, and satisfying high-score runs. Easy to pick up, tricky to master — every drop and merge matters as you stack adorable cats and unlock new forms.",
    story:
      "Drop mochi-soft kitties into the box, merge pairs into rarer fluffballs, and chase your best score before the stack hits the danger line. A cozy pocket of purrs for quick breaks or longer puzzle sessions.",
    features: [
      "Cute cat merge puzzle gameplay",
      "Simple controls — relaxing casual sessions",
      "Merge matching cats to unlock new kitties",
      "Stacking and space management with a danger line",
      "Charming fluffy cat collection",
      "Cozy visuals and high-score challenges",
    ],
    howToPlay: [
      "Drop cute cats into the puzzle box.",
      "Merge two identical cats to create a new cat.",
      "Keep merging to discover more fluffy kitties.",
      "Manage your space and stay above the danger line.",
      "Beat your best score each round.",
    ],
    localPlayPath: "/play/mochi-cats/",
    platforms: ["android", "web"],
    playStoreUrl: PLAY_MOCHI_CATS,
    playButtonLabel: "Play now",
    sdks: ["Google Play services", "Ad SDKs"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Progress and high scores may be saved locally on your device. Reinstalling the app may reset local data.",
    knownIssues:
      "If something breaks after an OS update, email us with your device model and Android version.",
  },
  {
    slug: "cozy-cat-block-puzzle",
    title: "Cozy Cat Block Puzzle",
    genre: "Block Puzzle",
    shortDescription:
      "Drag cozy block shapes onto the grid, clear lines with your feline friends cheering you on — no timers, pure relaxing brain training.",
    heroImage:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1920&q=80",
    cardColor: "#D4E8D0",
    cardEmoji: "🧩",
    about:
      "Cozy Cat Block Puzzle is a warm, aesthetic grid puzzle for cat lovers and classic block fans. Fill rows and columns, chain combos, and unwind with companion cats — playable offline with no rush or pressure.",
    story:
      "Leave daily stress behind and settle into a soft 10×10 world where every line you clear brings a purr of encouragement. Thoughtful moves, cozy art, and gentle sound make each session feel like a quiet retreat.",
    features: [
      "Classic block puzzle on a cozy grid board",
      "Heart-warming cat art and smooth animations",
      "Combo multipliers for big clears",
      "Play offline anytime — no Wi‑Fi needed",
      "No timers — stress-free, zen pacing",
      "Free to play with optional ads",
    ],
    howToPlay: [
      "Drag block shapes from the bottom onto the grid.",
      "Fill complete horizontal rows or vertical columns to clear them.",
      "Clear multiple lines at once for combo multipliers.",
      "Plan ahead — the game ends when no shapes fit on the board.",
      "Enjoy your cats cheering on every line you clear.",
    ],
    localPlayPath: "/play/cozy-cat-block-puzzle/",
    platforms: ["android", "web"],
    playStoreUrl: PLAY_COZY_CAT,
    playButtonLabel: "Play now",
    sdks: ["Google Play services", "Ad SDKs"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Scores and progress may be stored locally on your device depending on your version.",
  },
];

/** Homepage featured game cards (live titles only) */
export const featuredGameCards = games.map((g) => ({
  slug: g.slug,
  title: g.title,
  genre: g.genre,
  color: g.cardColor,
  emoji: g.cardEmoji,
  href: `/games/${g.slug}` as string,
}));

export function getGameBySlug(slug: string) {
  return games.find((g) => g.slug === slug);
}

export function getAllSlugs() {
  return games.map((g) => g.slug);
}
