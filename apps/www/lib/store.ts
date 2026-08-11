import { site } from "@/lib/site";

export type StoreApp = {
  slug: string;
  title: string;
  shortDescription: string;
  playStoreUrl: string;
  collectsPersonalData: boolean;
  childrenTargeted: boolean;
  sdks: string[];
  progressNote: string;
};

/** Store compliance listings — Play Store apps under Roncyo. */
export const storeApps: StoreApp[] = [
  {
    slug: "mochi-cats",
    title: "Mochi Cats",
    shortDescription: "A casual cat game published by Roncyo on Google Play.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.roncyo.mochicats",
    collectsPersonalData: true,
    childrenTargeted: false,
    sdks: ["Google Play services", "Ad SDKs"],
    progressNote:
      "Progress and high scores may be saved locally on your device. Reinstalling the app may reset local data.",
  },
  {
    slug: "cozy-cat-block-puzzle",
    title: "Cozy Cat Block Puzzle",
    shortDescription: "A calm block puzzle game published by Roncyo on Google Play.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.roncyo.cozycat",
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
