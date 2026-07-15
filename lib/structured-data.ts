import { SEO_KEYWORDS } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#service`,
    name: site.brand,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    email: site.emails.support,
    description: site.tagline,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "Game Publishing",
      "Game Distribution",
      "Website Monetization",
      "Advertising Distribution",
    ],
    knowsAbout: [...SEO_KEYWORDS],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Publishing & Monetization",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Game Publishing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Game Distribution" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Ad Monetization" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "ads.txt & Ad Integration" } },
      ],
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: site.brand,
    url: absoluteUrl("/"),
    description: site.tagline,
    inLanguage: ["en"],
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    potentialAction: {
      "@type": "ReadAction",
      target: absoluteUrl("/docs"),
      name: "Read documentation",
    },
  };
}
