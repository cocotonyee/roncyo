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
      "Custom Websites",
      "Game Development",
      "AI Automation",
      "SaaS Products",
      "Cloud Fax",
    ],
    knowsAbout: [...SEO_KEYWORDS],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Roncyo services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom websites" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Game services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ronfax cloud fax" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom SaaS" } },
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
      "@type": "CommunicateAction",
      target: absoluteUrl("/contact"),
      name: "Contact Roncyo",
    },
  };
}
