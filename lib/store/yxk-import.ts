import type { StoreGameConfig } from "@/lib/store/config";
import { site } from "@/lib/site";
import catalog from "@/lib/store/yxk-catalog.json";

/** Per-game publisher override — set in `lib/store/yxk-catalog.json` on each entry. */
export type YxkCompanyOverride = {
  companyName: string;
  companyCountry?: string;
  companyDescription?: string;
  companyEmail?: string;
  companyWebsite?: string;
};

export type YxkCatalogEntry = {
  yxkGameId: number;
  storeDir: string;
  slug: string;
  gameName: string;
  genre: string;
  shortDescription: string;
  about: string;
  story?: string;
  features: string[];
  howToPlay?: string[];
  categories?: string[];
  languages?: string[];
  version?: string;
  size?: string;
  platforms: StoreGameConfig["platforms"];
  trialAvailable?: boolean;
  trialLandscape?: boolean;
  /** Per-game publisher — required on every catalog row */
  company: YxkCompanyOverride;
};

const DEFAULT_COMPANY = {
  companyName: site.brand,
  companyCountry: site.country,
  companyDescription:
    "Independent game studio crafting mobile puzzle games with cute art and player-first design.",
  companyEmail: site.emails.support,
};

function resolveCompany(entry: YxkCatalogEntry) {
  const c = entry.company;
  return {
    companyName: c.companyName,
    companyCountry: c.companyCountry ?? DEFAULT_COMPANY.companyCountry,
    companyDescription: c.companyDescription ?? DEFAULT_COMPANY.companyDescription,
    companyEmail: c.companyEmail ?? DEFAULT_COMPANY.companyEmail,
    companyWebsite: c.companyWebsite,
  };
}

/** Convert imported YXK catalog rows into store listings. */
export function yxkStoreListings(): StoreGameConfig[] {
  return (catalog as YxkCatalogEntry[]).map((entry) => {
    const config: StoreGameConfig = {
      ...resolveCompany(entry),
      storeDir: entry.storeDir,
      slug: entry.slug,
      gameName: entry.gameName,
      genre: entry.genre,
      shortDescription: entry.shortDescription,
      about: entry.about,
      story: entry.story,
      features: entry.features,
      howToPlay: entry.howToPlay,
      categories: entry.categories,
      languages: entry.languages,
      version: entry.version,
      size: entry.size,
      platforms: entry.platforms,
      contentRating: "Everyone",
      yxkGameId: entry.yxkGameId,
      trialLandscape: entry.trialLandscape,
    };

    if (entry.trialAvailable) {
      config.playUrl = `/games/${entry.slug}/trial`;
      config.playButtonLabel = "Play Demo";
    }

    return config;
  });
}
