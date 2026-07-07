import type { Metadata } from "next";
import type { FaqItem } from "@/lib/faqs";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export type CountryCode = "au" | "nz";

export type LocationSlug =
  | "australia"
  | "new-zealand"
  | "sydney"
  | "melbourne"
  | "brisbane"
  | "perth"
  | "adelaide"
  | "auckland"
  | "wellington"
  | "christchurch";

export type LocationPage = {
  slug: LocationSlug;
  type: "country" | "city";
  country: CountryCode;
  countryName: string;
  title: string;
  headline: string;
  description: string;
  seoKeyword: string;
  seoIntro: string;
  highlights: string[];
  faqs: FaqItem[];
};

const australiaCountry: LocationPage = {
  slug: "australia",
  type: "country",
  country: "au",
  countryName: "Australia",
  title: "Australia",
  headline: "AI automation for Australian businesses",
  description:
    "Custom business automation for local service businesses across Australia — Sydney, Melbourne, Brisbane, Perth, and Adelaide.",
  seoKeyword: "AI Automation Australia",
  seoIntro:
    "Roncyo builds custom AI automation for Australian local businesses. From tradies in Brisbane to dental practices in Melbourne and accounting firms in Sydney, we eliminate repetitive admin work — delivered remotely with video calls for discovery and handover.",
  highlights: [
    "Remote delivery — no on-site required",
    "Integrates with Xero, MYOB, Gmail, and local tools",
    "Typical go-live in 72 hours",
  ],
  faqs: [
    {
      question: "Do you work with businesses across Australia?",
      answer:
        "Yes. We serve businesses in Sydney, Melbourne, Brisbane, Perth, Adelaide, and nationwide. All projects are delivered remotely.",
    },
    {
      question: "What industries do you automate in Australia?",
      answer:
        "Dentists, electricians, plumbers, accountants, and professional services are our most common clients. Most workflows involve follow-ups, quotes, documents, and data entry.",
    },
  ],
};

const newZealandCountry: LocationPage = {
  slug: "new-zealand",
  type: "country",
  country: "nz",
  countryName: "New Zealand",
  title: "New Zealand",
  headline: "AI automation for New Zealand businesses",
  description:
    "Custom business automation for Kiwi local businesses — Auckland, Wellington, Christchurch, and nationwide.",
  seoKeyword: "AI Automation New Zealand",
  seoIntro:
    "Roncyo helps New Zealand local businesses automate repetitive work. Whether you're an electrician in Auckland or an accountant in Wellington, we build custom workflows integrated with the tools you already use — Xero, Gmail, and job management software.",
  highlights: [
    "Built for NZ small businesses and tradies",
    "Works with Xero and common Kiwi business tools",
    "Free consultation — fixed scope quotes",
  ],
  faqs: [
    {
      question: "Do you work with New Zealand businesses?",
      answer:
        "Yes. We serve Auckland, Wellington, Christchurch, and businesses across New Zealand. Delivery is fully remote.",
    },
    {
      question: "Can you integrate with Xero?",
      answer:
        "Yes. Many of our NZ automations connect with Xero, Gmail, and spreadsheets for invoicing, follow-ups, and reporting.",
    },
  ],
};

export const locations: LocationPage[] = [
  australiaCountry,
  newZealandCountry,
  {
    slug: "sydney",
    type: "city",
    country: "au",
    countryName: "Australia",
    title: "Sydney",
    headline: "Business automation in Sydney",
    description:
      "Custom AI automation for Sydney local businesses — eliminate repetitive admin, follow-ups, and data entry.",
    seoKeyword: "business automation Sydney",
    seoIntro:
      "Sydney business owners lose hours every week to manual follow-ups, document handling, and data entry. Roncyo builds custom automation for service businesses across Greater Sydney — from trades and professional services to dental practices and accounting firms in the CBD, North Shore, and Western Sydney.",
    highlights: [
      "Quote follow-ups and lead nurturing",
      "Document and invoice automation",
      "CRM and inbox workflow routing",
    ],
    faqs: [
      {
        question: "What can Sydney businesses automate?",
        answer:
          "Common automations include quote follow-ups for trades, client document chasing for accountants, appointment reminders for dental practices, and lead capture from websites.",
      },
      {
        question: "How do consultations work for Sydney businesses?",
        answer:
          "We run discovery calls over video. No on-site visit needed. Most Sydney projects go live within 72 hours of sign-off.",
      },
    ],
  },
  {
    slug: "melbourne",
    type: "city",
    country: "au",
    countryName: "Australia",
    title: "Melbourne",
    headline: "Business automation in Melbourne",
    description:
      "Custom AI automation for Melbourne local businesses — save hours on admin every week.",
    seoKeyword: "business automation Melbourne",
    seoIntro:
      "Melbourne's local service businesses — dentists, electricians, plumbers, and accountants — spend too much time on repetitive admin. Roncyo builds custom automation tailored to how your Melbourne business actually runs, integrated with the software you already trust.",
    highlights: [
      "Dental recall and appointment automation",
      "Trade quote and invoice workflows",
      "Month-end document chasing for firms",
    ],
    faqs: [
      {
        question: "Do you have Melbourne case studies?",
        answer:
          "Yes. We've helped a Melbourne dental practice automate patient recalls, saving 6+ hours per week. See our case studies for details.",
      },
    ],
  },
  {
    slug: "brisbane",
    type: "city",
    country: "au",
    countryName: "Australia",
    title: "Brisbane",
    headline: "Business automation in Brisbane",
    description:
      "AI automation for Brisbane trades, professional services, and local businesses.",
    seoKeyword: "business automation Brisbane",
    seoIntro:
      "Brisbane tradies and service businesses juggle quotes, follow-ups, and job admin between site visits. Roncyo automates the repetitive work — lead capture, customer updates, invoicing, and reporting — so you can focus on the job.",
    highlights: [
      "Lead capture and emergency call routing",
      "Job completion to invoice workflows",
      "Customer ETA and review requests",
    ],
    faqs: [
      {
        question: "Can Brisbane plumbers automate lead capture?",
        answer:
          "Yes. We build automations that capture website and portal leads, send instant confirmations, and alert your team for emergencies.",
      },
    ],
  },
  {
    slug: "perth",
    type: "city",
    country: "au",
    countryName: "Australia",
    title: "Perth",
    headline: "Business automation in Perth",
    description:
      "Custom automation for Perth local businesses — workflow, email, and document automation.",
    seoKeyword: "business automation Perth",
    seoIntro:
      "Perth business owners across WA benefit from automation that connects their existing tools — no rip-and-replace. Roncyo builds custom workflows for trades, professional services, and admin-heavy small businesses throughout Perth and Western Australia.",
    highlights: [
      "Remote delivery across WA",
      "Spreadsheet and reporting automation",
      "Email follow-up sequences",
    ],
    faqs: [
      {
        question: "Do you serve Perth and regional WA?",
        answer:
          "Yes. All delivery is remote. We work with Perth metro and regional WA businesses via video consultation.",
      },
    ],
  },
  {
    slug: "adelaide",
    type: "city",
    country: "au",
    countryName: "Australia",
    title: "Adelaide",
    headline: "Business automation in Adelaide",
    description:
      "AI automation for Adelaide small businesses — reduce manual work and save time.",
    seoKeyword: "business automation Adelaide",
    seoIntro:
      "Adelaide local businesses can reclaim hours every week with custom automation. Roncyo helps dentists, trades, accountants, and professional services automate follow-ups, documents, and data entry — integrated with your current software.",
    highlights: [
      "Small business focused — no enterprise bloat",
      "Fixed-scope quotes after free consultation",
      "72-hour typical delivery",
    ],
    faqs: [
      {
        question: "Is Roncyo suitable for small Adelaide businesses?",
        answer:
          "Yes. We're built for owner-operated and small teams — the businesses that feel admin pain most acutely.",
      },
    ],
  },
  {
    slug: "auckland",
    type: "city",
    country: "nz",
    countryName: "New Zealand",
    title: "Auckland",
    headline: "Business automation in Auckland",
    description:
      "Custom AI automation for Auckland local businesses and tradies.",
    seoKeyword: "business automation Auckland",
    seoIntro:
      "Auckland is New Zealand's largest market for trades and professional services — and the admin burden matches the opportunity. Roncyo builds automation for Auckland businesses: faster quotes, consistent follow-ups, and less time on spreadsheets and email.",
    highlights: [
      "Electrician and trade workflow automation",
      "Xero-integrated invoicing flows",
      "Lead follow-up sequences",
    ],
    faqs: [
      {
        question: "Do you have Auckland case studies?",
        answer:
          "Yes. We helped an Auckland electrical contractor automate quote follow-ups, increasing conversion by 18%. See our case studies.",
      },
    ],
  },
  {
    slug: "wellington",
    type: "city",
    country: "nz",
    countryName: "New Zealand",
    title: "Wellington",
    headline: "Business automation in Wellington",
    description:
      "AI automation for Wellington professional services and local businesses.",
    seoKeyword: "business automation Wellington",
    seoIntro:
      "Wellington's professional services firms and local businesses run on documents, deadlines, and client communication. Roncyo automates the repetitive parts — intake, reminders, filing, and reporting — without compromising control.",
    highlights: [
      "Professional services intake automation",
      "Document collection and naming",
      "Deadline and appointment reminders",
    ],
    faqs: [
      {
        question: "Can Wellington law firms use Roncyo?",
        answer:
          "Yes. We automate intake, document collection, status updates, and deadline reminders for legal and professional services practices.",
      },
    ],
  },
  {
    slug: "christchurch",
    type: "city",
    country: "nz",
    countryName: "New Zealand",
    title: "Christchurch",
    headline: "Business automation in Christchurch",
    description:
      "Custom automation for Christchurch local businesses — trades, services, and admin workflows.",
    seoKeyword: "business automation Christchurch",
    seoIntro:
      "Christchurch businesses across Canterbury benefit from automation that fits how they already work. Roncyo builds custom workflows for trades, accountants, and service businesses — eliminating manual follow-ups, data entry, and document handling.",
    highlights: [
      "Trade and construction admin automation",
      "Client communication sequences",
      "Reporting and spreadsheet sync",
    ],
    faqs: [
      {
        question: "Do you work with Christchurch tradies?",
        answer:
          "Yes. Common automations include quote follow-ups, job-to-invoice workflows, and customer update notifications.",
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

export function getAllLocationSlugs() {
  return locations.map((l) => l.slug);
}

export function getCitiesByCountry(country: CountryCode) {
  return locations.filter((l) => l.type === "city" && l.country === country);
}

export function getCountryForCity(city: LocationPage) {
  if (city.type === "country") return city;
  return locations.find(
    (l) => l.type === "country" && l.country === city.country,
  );
}

export function locationMetadata(location: LocationPage): Metadata {
  const path = `/locations/${location.slug}`;
  return buildPageMetadata({
    title: `${location.seoKeyword} — ${location.title} | Roncyo`,
    description: `${location.description} Custom AI automation for local businesses in ${location.title}, ${location.countryName}. Free consultation.`,
    path,
    keywords: [
      location.seoKeyword,
      `AI automation ${location.title}`,
      `business automation ${location.title}`,
      location.countryName === "Australia"
        ? "AI Automation Australia"
        : "AI Automation New Zealand",
      "custom business automation",
      "workflow automation",
    ],
  });
}

export function locationJsonLd(location: LocationPage) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.brand} — ${location.title}`,
    description: location.description,
    url: absoluteUrl(`/locations/${location.slug}`),
    areaServed: {
      "@type": location.type === "city" ? "City" : "Country",
      name: location.title,
      ...(location.type === "city"
        ? { containedInPlace: { "@type": "Country", name: location.countryName } }
        : {}),
    },
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    serviceType: "Business Process Automation",
  };
}
