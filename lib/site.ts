/** All inbound mail goes to one inbox */
const SUPPORT = "support@roncyo.com" as const;

export const site = {
  /** Public name — use in UI, marketing, and general copy */
  brand: "Roncy",
  /** Legal entity — use sparingly (e.g. one line in formal legal pages / press facts) */
  legalName: "RONCY LLC",
  domain: "roncyo.com",
  country: "United States",
  tagline: "Mobile & browser games",
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
