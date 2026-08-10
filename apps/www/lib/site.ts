const SUPPORT = "support@roncyo.com" as const;

export const site = {
  brand: "Roncyo",
  legalName: "RONCY LLC",
  domain: "roncyo.com",
  country: "United States",
  tagline: "A studio that builds and ships digital products.",
  description:
    "Roncyo designs, launches, and grows focused digital products - tools, apps, and experiments people use.",
  emails: {
    support: SUPPORT,
    privacy: SUPPORT,
    legal: SUPPORT,
    hello: SUPPORT,
  },
} as const;

export function absoluteUrl(path: string) {
  const base = `https://${site.domain}`;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
