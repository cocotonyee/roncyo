import { site } from "@/lib/site";

export type StoreApp = {
  slug: string;
  title: string;
  shortDescription: string;
  collectsPersonalData: boolean;
  childrenTargeted: boolean;
  sdks: string[];
  progressNote: string;
};

/** Store compliance listings — not marketed on the company homepage. */
export const storeApps: StoreApp[] = [
  {
    slug: "mochi-cats",
    title: "Mochi Cat",
    shortDescription: "Mobile app published by Roncyo.",
    collectsPersonalData: true,
    childrenTargeted: false,
    sdks: ["Google Play services", "Ad SDKs"],
    progressNote:
      "Progress and high scores may be saved locally on your device. Reinstalling the app may reset local data.",
  },
  {
    slug: "cozy-cat-block-puzzle",
    title: "Cozy Cat Block Puzzle",
    shortDescription: "Mobile app published by Roncyo.",
    collectsPersonalData: true,
    childrenTargeted: false,
    sdks: ["Google Play services", "Ad SDKs"],
    progressNote:
      "Scores and progress may be stored locally on your device depending on your version.",
  },
];

export function getStoreAppBySlug(slug: string) {
  return storeApps.find((a) => a.slug === slug);
}

export function getStoreSlugs() {
  return storeApps.map((a) => a.slug);
}

export const storeCompanyEmail = site.emails.support;
