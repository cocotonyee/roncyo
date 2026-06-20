import type { Metadata } from "next";
import type { Game } from "@/lib/games";
import { site, absoluteUrl } from "@/lib/site";

export const DEFAULT_KEYWORDS = [
  site.brand,
  "mobile games",
  "web games",
  "app store",
  "puzzle games",
  "casual games",
  "free games",
  "play online",
  "game publisher",
  "Android games",
  "browser games",
] as const;

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const url = absoluteUrl(input.path);
  const keywords = [...new Set([...(input.keywords ?? []), ...DEFAULT_KEYWORDS])];
  const image = input.image?.startsWith("http")
    ? input.image
    : absoluteUrl(input.image ?? site.logo);

  return {
    title: input.title,
    description: input.description,
    keywords,
    alternates: { canonical: url },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: input.type ?? "website",
      locale: "en_US",
      siteName: site.brand,
      title: input.title,
      description: input.description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: input.imageAlt ?? input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export function gameKeywords(game: Game, publisherName: string) {
  return [
    game.title,
    game.genre,
    ...(game.categories ?? []),
    ...game.platforms.map((p) => `${p} game`),
    publisherName,
    "play demo",
    "download",
  ];
}

export function gameSeoTitle(game: Game) {
  return `${game.title} — ${game.genre} Game | Play Free Online`;
}

export function gameSeoDescription(game: Game, publisherName: string) {
  const platforms = game.platforms.join(", ");
  return `${game.shortDescription} Available on ${platforms}. Published by ${publisherName}. Browse screenshots, features, and download links on ${site.brand}.`;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    email: site.emails.support,
    address: {
      "@type": "PostalAddress",
      addressCountry: site.country,
    },
  };
}

/** Static marketing and legal routes for sitemap generation. */
export const STATIC_SITEMAP_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/games", priority: 0.95, changeFrequency: "daily" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/press", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/support", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/cookie-policy", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/data-deletion", priority: 0.4, changeFrequency: "yearly" as const },
];
