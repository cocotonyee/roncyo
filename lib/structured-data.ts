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
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "New Zealand" },
    ],
    serviceType: [
      "AI Workflow Automation",
      "Business Process Automation",
      "Workflow Automation",
      "Email Automation",
      "Browser Automation",
      "Spreadsheet Automation",
      "PDF Automation",
      "Reporting Automation",
    ],
    knowsAbout: [...SEO_KEYWORDS],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business Automation Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Workflow Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Browser Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spreadsheet Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "PDF Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reporting Automation" } },
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
    inLanguage: ["en-AU", "en-NZ"],
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    potentialAction: {
      "@type": "ContactAction",
      target: absoluteUrl("/contact"),
      name: "Book a Free Consultation",
    },
  };
}
