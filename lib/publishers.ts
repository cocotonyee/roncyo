import { site } from "@/lib/site";

export type Publisher = {
  id: string;
  /** Display name shown in the store */
  brandName: string;
  /** Legal entity name for compliance */
  legalName: string;
  country: string;
  description: string;
  website?: string;
  supportEmail: string;
  founded?: string;
  /** Visual placeholder until real logo assets are added */
  logoEmoji: string;
  logoColor: string;
};

export const publishers: Publisher[] = [
  {
    id: "roncy",
    brandName: site.brand,
    legalName: site.legalName,
    country: site.country,
    description:
      "Independent game studio crafting cozy mobile and browser experiences — merge puzzles, block games, and Telegram Mini Apps with warm art and player-first design.",
    website: `https://${site.domain}`,
    supportEmail: site.emails.support,
    founded: "2020",
    logoEmoji: "🐾",
    logoColor: "#FFD6C8",
  },
];

export function getPublisherById(id: string) {
  return publishers.find((p) => p.id === id);
}

export function getAllPublishers() {
  return publishers;
}
