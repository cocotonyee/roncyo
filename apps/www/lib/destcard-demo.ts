export type DestCardFaction = "fire" | "water" | "earth" | "void";

export type DestCardArchetype = {
  id: number;
  name: string;
  title: string;
  tagline: string;
  faction: DestCardFaction;
};

/** Compact DestCard demo deck (from Magic Soul archetypes). */
export const DESTCARD_ARCHETYPES: DestCardArchetype[] = [
  {
    id: 1,
    name: "The Magician",
    title: "The Creator",
    tagline: "You turn sparks into substance.",
    faction: "fire",
  },
  {
    id: 2,
    name: "The High Priestess",
    title: "The Oracle",
    tagline: "You feel what is real before words arrive.",
    faction: "water",
  },
  {
    id: 3,
    name: "The Empress",
    title: "The Nurturer",
    tagline: "You grow what you love into more.",
    faction: "earth",
  },
  {
    id: 4,
    name: "The Emperor",
    title: "The Builder",
    tagline: "You shape chaos into order that lasts.",
    faction: "fire",
  },
  {
    id: 5,
    name: "The Hierophant",
    title: "The Mentor",
    tagline: "You translate wisdom into someone's next step.",
    faction: "earth",
  },
  {
    id: 6,
    name: "The Lovers",
    title: "The Aligner",
    tagline: "You choose with the whole heart awake.",
    faction: "water",
  },
  {
    id: 7,
    name: "The Chariot",
    title: "The Strategist",
    tagline: "You move with purpose, not just speed.",
    faction: "fire",
  },
  {
    id: 8,
    name: "Strength",
    title: "The Calm Force",
    tagline: "Your power is quiet, steady, and unshakable.",
    faction: "earth",
  },
  {
    id: 9,
    name: "The Hermit",
    title: "The Seeker",
    tagline: "You find your clearest light in the quiet.",
    faction: "earth",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    title: "The Cycler",
    tagline: "You sense the rhythm beneath every change.",
    faction: "void",
  },
  {
    id: 11,
    name: "Justice",
    title: "The Balancer",
    tagline: "You seek truth, and the courage to act on it.",
    faction: "fire",
  },
  {
    id: 12,
    name: "The Hanged Man",
    title: "The Reframer",
    tagline: "You pause, and see what the rush hides.",
    faction: "water",
  },
  {
    id: 13,
    name: "Death",
    title: "The Renewer",
    tagline: "You turn endings into ground for new beginnings.",
    faction: "void",
  },
  {
    id: 14,
    name: "Temperance",
    title: "The Alchemist",
    tagline: "You blend opposites into a living flow.",
    faction: "earth",
  },
  {
    id: 15,
    name: "The Devil",
    title: "The Shadow Reader",
    tagline: "You name the craving and break the loop.",
    faction: "void",
  },
  {
    id: 16,
    name: "The Tower",
    title: "The Breaker",
    tagline: "You clear what is false so truth can rise.",
    faction: "fire",
  },
  {
    id: 17,
    name: "The Star",
    title: "The Visionary",
    tagline: "You light the path by making hope tangible.",
    faction: "water",
  },
  {
    id: 18,
    name: "The Moon",
    title: "The Dreamwalker",
    tagline: "You navigate emotion with grounded curiosity.",
    faction: "water",
  },
  {
    id: 19,
    name: "The Sun",
    title: "The Radiant",
    tagline: "Your warmth invites others to shine.",
    faction: "fire",
  },
  {
    id: 20,
    name: "Judgement",
    title: "The Awakener",
    tagline: "You hear the inner call and rise.",
    faction: "void",
  },
  {
    id: 21,
    name: "The World",
    title: "The Completer",
    tagline: "You finish what you start and claim your wisdom.",
    faction: "void",
  },
  {
    id: 22,
    name: "The Fool",
    title: "The Free Spirit",
    tagline: "You trust the unknown and leap anyway.",
    faction: "void",
  },
];

/** Dark Soul-card palettes (Magic factionStroke). */
export const DESTCARD_FACTION_COLORS = {
  fire: {
    line: "#FDE047",
    mid: "#D97706",
    soft: "#FBBF24",
    deep: "#78350F",
    glow: "rgba(245,158,11,0.3)",
    paper: "#0A0A0E",
    wash: "rgba(217,119,6,0.3)",
    ink: "#F2EFE8",
    muted: "rgba(253,224,71,0.55)",
  },
  water: {
    line: "#A5F3FC",
    mid: "#0891B2",
    soft: "#67E8F9",
    deep: "#164E63",
    glow: "rgba(6,182,212,0.3)",
    paper: "#0A0A0E",
    wash: "rgba(8,145,178,0.28)",
    ink: "#F2EFE8",
    muted: "rgba(165,243,252,0.55)",
  },
  earth: {
    line: "#F5E6B8",
    mid: "#B45309",
    soft: "#D6BC8A",
    deep: "#78350F",
    glow: "rgba(180,140,80,0.3)",
    paper: "#0A0A0E",
    wash: "rgba(180,83,9,0.28)",
    ink: "#F2EFE8",
    muted: "rgba(245,230,184,0.55)",
  },
  void: {
    line: "#F0ABFC",
    mid: "#A855F7",
    soft: "#E879F9",
    deep: "#581C87",
    glow: "rgba(168,85,247,0.3)",
    paper: "#0A0A0E",
    wash: "rgba(168,85,247,0.28)",
    ink: "#F2EFE8",
    muted: "rgba(240,171,252,0.55)",
  },
} as const;

function dayIndex(date = new Date()) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((now - start) / 86_400_000);
}

function padNo(n: number) {
  return String(((n - 1) % 22) + 1).padStart(2, "0");
}

/** Pick today's DestCard sample (rotates by calendar day). */
export function getDailyDestCard(date = new Date()) {
  const day = dayIndex(date);
  const archetype =
    DESTCARD_ARCHETYPES[day % DESTCARD_ARCHETYPES.length] ??
    DESTCARD_ARCHETYPES[0]!;
  const colors = DESTCARD_FACTION_COLORS[archetype.faction];
  const seed = date.getFullYear() * 10_000 + (date.getMonth() + 1) * 100 + date.getDate();

  const cores = [
    { label: "Heart", n: padNo(seed % 22 || 22) },
    { label: "Karma", n: padNo(archetype.id) },
    { label: "Sky", n: padNo((seed >> 3) % 22 || 7) },
    { label: "Portrait", n: padNo((seed >> 5) % 22 || 14) },
  ] as const;

  return {
    archetype,
    colors,
    cores,
    iconSrc: `/images/destcard/${archetype.id}.webp`,
    dateLabel: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  };
}
