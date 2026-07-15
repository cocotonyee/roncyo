import { SEO_KEYWORDS } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#service`,
    name: `${site.brand} Open Platform`,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    email: site.emails.support,
    description: site.tagline,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "Developer Platform",
      "Content Distribution",
      "Ad Monetization",
      "Partner Integration",
    ],
    knowsAbout: [...SEO_KEYWORDS],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Open Platform",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Developer documentation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Distribution" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ad monetization" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Integration support" } },
      ],
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: `${site.brand} Open Platform`,
    url: absoluteUrl("/"),
    description: site.tagline,
    inLanguage: ["en"],
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    potentialAction: {
      "@type": "ReadAction",
      target: absoluteUrl("/docs"),
      name: "Read developer documentation",
    },
  };
}
