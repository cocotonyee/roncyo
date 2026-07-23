import type { StoreGameConfig } from "@/lib/store/config";
import { site } from "@/lib/site";

/** Store compliance listings only — not marketed on the company site. */
export const storeListings: StoreGameConfig[] = [
  {
    slug: "mochi-cats",
    companyName: site.brand,
    companyEmail: site.emails.support,
    gameName: "Mochi Cat",
    genre: "App",
    shortDescription: "Mobile app published by Roncyo.",
    about: "Product compliance listing for storefront privacy and support URLs.",
    features: ["Store compliance"],
    platforms: ["android", "telegram"],
    lastUpdated: "2025-11-18",
    categories: ["App"],
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
    companyName: site.brand,
    companyEmail: site.emails.support,
    gameName: "Cozy Cat Block Puzzle",
    genre: "App",
    shortDescription: "Mobile app published by Roncyo.",
    about: "Product compliance listing for storefront privacy and support URLs.",
    features: ["Store compliance"],
    platforms: ["android", "telegram"],
    lastUpdated: "2026-01-08",
    categories: ["App"],
    sdks: ["Google Play services", "Ad SDKs"],
    collectsPersonalData: true,
    childrenTargeted: false,
    progressNote:
      "Scores and progress may be stored locally on your device depending on your version.",
  },
];
