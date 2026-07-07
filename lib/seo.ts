import type { Metadata } from "next";
import type { Game } from "@/lib/games";
import type { FaqItem } from "@/lib/faqs";
import { site, absoluteUrl } from "@/lib/site";

/** Core + long-tail SEO keywords for landing pages (no blog). */
export const SEO_KEYWORDS = [
  "AI Automation Australia",
  "AI Automation New Zealand",
  "Business Process Automation",
  "Workflow Automation",
  "AI Automation for Dentists",
  "AI Automation for Electricians",
  "AI Automation for Plumbers",
  "AI Automation for Accountants",
  "custom business automation",
  "local business automation",
  "small business automation",
  "automate repetitive tasks",
  "email automation for small business",
  "browser automation services",
  "spreadsheet automation",
  "PDF automation",
  "reporting automation",
  "automation for tradies Australia",
  "business automation Sydney",
  "business automation Melbourne",
  "business automation Auckland",
  "AI automation for professional services",
  "custom workflow automation",
  "Roncyo",
] as const;

export const DEFAULT_KEYWORDS = [site.brand, ...SEO_KEYWORDS] as const;

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

  const ogImage = input.image
    ? input.image.startsWith("http")
      ? input.image
      : absoluteUrl(input.image)
    : undefined;

  return {
    title: input.title,
    description: input.description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-AU": url,
        "en-NZ": url,
        en: url,
      },
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type: input.type ?? "website",
      locale: "en_AU",
      alternateLocale: ["en_NZ", "en_US"],
      siteName: site.brand,
      title: input.title,
      description: input.description,
      url,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: input.imageAlt ?? input.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.brand}`,
    url: absoluteUrl("/contact"),
    description: "Book a free automation consultation for your business.",
    mainEntity: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.emails.hello,
        areaServed: ["AU", "NZ"],
        availableLanguage: "English",
      },
    },
  };
}

export function gameKeywords(game: Game, publisherName: string) {
  return [game.title, game.genre, ...(game.categories ?? []), publisherName, "privacy policy"];
}

export function gameSeoTitle(game: Game) {
  return `${game.title} Privacy & Support`;
}

export function gameSeoDescription(game: Game, publisherName: string) {
  return `Privacy policy and support for ${game.title}, published by ${publisherName} on ${site.brand}.`;
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
    "@id": `${absoluteUrl("/")}#organization`,
    name: site.brand,
    alternateName: "Roncyo",
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    email: site.emails.support,
    description: site.tagline,
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "New Zealand" },
    ],
    knowsAbout: [...SEO_KEYWORDS],
    address: {
      "@type": "PostalAddress",
      addressCountry: site.country,
    },
  };
}

/** Static marketing and legal routes for sitemap generation. */
export const STATIC_SITEMAP_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/case-studies", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/support", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/cookie-policy", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/data-deletion", priority: 0.4, changeFrequency: "yearly" as const },
];
