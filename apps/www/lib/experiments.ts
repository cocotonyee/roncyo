export type Experiment = {
  year: number;
  name: string;
  blurb: string;
  status: "live" | "building" | "soon";
  href?: string;
};

export const experiments: Experiment[] = [
  {
    year: 2026,
    name: "DestCard",
    blurb: "Spiritual self-discovery tool",
    status: "live",
    href: "https://destcard.com",
  },
  {
    year: 2026,
    name: "PictureKit",
    blurb: "Image tools — joining the platform soon",
    status: "building",
  },
  {
    year: 2025,
    name: "RonFax",
    blurb: "Document productivity tools",
    status: "live",
    href: "https://www.ronfax.com",
  },
  {
    year: 2026,
    name: "Cozy Cat",
    blurb: "Mobile puzzle game",
    status: "live",
  },
  {
    year: 2026,
    name: "Tools lab",
    blurb: "Small utilities tested under roncyo.com/tools",
    status: "soon",
  },
];
