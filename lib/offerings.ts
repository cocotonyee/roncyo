export type Offering = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  points: string[];
  ctaLabel: string;
};

export const offerings: Offering[] = [
  {
    slug: "websites",
    title: "Websites",
    eyebrow: "Web",
    summary:
      "Marketing sites, product pages, and conversion-focused web experiences — designed, built, and shipped for your brand.",
    points: [
      "Brand-led landing and company sites",
      "Fast Next.js delivery and clean SEO foundations",
      "Ongoing polish, analytics, and launch support",
    ],
    ctaLabel: "Request a website",
  },
  {
    slug: "games",
    title: "Game services",
    eyebrow: "Games",
    summary:
      "Custom casual and HTML5 games, store-ready packaging, and publishing support — from concept to live release.",
    points: [
      "Custom game builds for web, mobile, and Mini Apps",
      "Store compliance, privacy URLs, and listing assets",
      "Monetization setup and partner distribution",
    ],
    ctaLabel: "Order a custom game",
  },
  {
    slug: "automation",
    title: "AI automation",
    eyebrow: "Automation",
    summary:
      "Replace repetitive ops with practical AI workflows — email, documents, reporting, and handoffs wired to tools you already use.",
    points: [
      "Scoped automation for real business processes",
      "Integrations with mail, sheets, CRM, and portals",
      "Fixed scope and clear handoff documentation",
    ],
    ctaLabel: "Discuss automation",
  },
  {
    slug: "ronfax",
    title: "Ronfax",
    eyebrow: "SaaS",
    summary:
      "Cloud fax for teams that still need reliable send and receive — a focused SaaS product under the Roncyo umbrella.",
    points: [
      "Send and receive faxes online",
      "Built for business continuity and compliance workflows",
      "Product onboarding and support from our team",
    ],
    ctaLabel: "Ask about Ronfax",
  },
  {
    slug: "saas",
    title: "SaaS tools",
    eyebrow: "Products",
    summary:
      "Lightweight SaaS utilities and custom software for operators who want owned tools — not another generic dashboard.",
    points: [
      "Product discovery and MVP scoping",
      "Custom SaaS builds with clean UX",
      "Hosting, iteration, and long-term support",
    ],
    ctaLabel: "Build a SaaS with us",
  },
];

export function getOfferingBySlug(slug: string) {
  return offerings.find((o) => o.slug === slug);
}
