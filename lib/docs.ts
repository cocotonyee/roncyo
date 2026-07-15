export type DocPage = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string[] }[];
};

export const docsIndex = {
  title: "Developer documentation",
  description:
    "Guides for building with Roncyo — platform access, distribution, monetization, and integration.",
} as const;

export const docPages: DocPage[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    description: "How to open a partner account and ship your first integration.",
    sections: [
      {
        heading: "Welcome",
        body: [
          "Roncyo Open Platform is for developers and partners who build digital products and want distribution plus ad monetization.",
          "This site is the public developer hub: product overview and docs. Product surfaces and SDKs are provisioned after your partnership is approved.",
        ],
      },
      {
        heading: "Steps",
        body: [
          "1. Email support@roncyo.com with your company name, product type, target platforms, and markets.",
          "2. Complete onboarding (compliance contacts, creative, age rating where required).",
          "3. Receive integration keys / placement IDs and follow the integration guide.",
          "4. Go live with ads.txt / SDK config we provide, then monitor revenue reporting.",
        ],
      },
    ],
  },
  {
    slug: "overview",
    title: "Platform overview",
    description: "What the Open Platform offers developers and content partners.",
    sections: [
      {
        heading: "What Roncyo is",
        body: [
          "Roncyo operates an open developer platform: tools and commercial rails to distribute digital products and monetize traffic with advertising.",
          "Think of this site like a partner developer portal — introduction and documentation — not an end-user destination app.",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Product teams, independent developers, and companies shipping web apps, mobile apps, Mini Apps, or content sites.",
          "If you need distribution partners and authorized ad fill with clear reporting, this platform is built for you.",
        ],
      },
      {
        heading: "Core capabilities",
        body: [
          "Distribution: place approved inventory with traffic and demand partners under defined commercial terms.",
          "Monetization: authorized advertising (for example Google AdSense / network placements) with ads.txt where required.",
          "Operations: compliance URL hosting when storefronts need privacy or support links on our domain.",
        ],
      },
    ],
  },
  {
    slug: "distribution",
    title: "Distribution",
    description: "How products are accepted and distributed through Roncyo partners.",
    sections: [
      {
        heading: "Onboarding materials",
        body: [
          "Company legal name, product name, platforms (web, Android, iOS, Telegram, etc.), and regions you want to serve.",
          "Store or product URLs, icons/screenshots, short description, content rating, and a privacy contact email.",
          "Confirmation that content meets applicable store and advertising policies.",
        ],
      },
      {
        heading: "How distribution works",
        body: [
          "Approved inventory is placed with ad and traffic partners according to each product agreement.",
          "You retain IP ownership. Roncyo provides distribution ops, ad fill coordination, and partner support.",
        ],
      },
    ],
  },
  {
    slug: "monetization",
    title: "Monetization",
    description: "Advertising, revenue share, and policy basics.",
    sections: [
      {
        heading: "Advertising",
        body: [
          "Primary monetization is advertising on properties we enable together (web tags and/or in-app SDKs).",
          "Formats and placements follow network policies and what is enabled for your account.",
        ],
      },
      {
        heading: "Revenue",
        body: [
          "Revenue share, payout schedule, and thresholds are defined in your partnership agreement.",
          "ads.txt and related authorizations help demand partners verify inventory sold on Roncyo properties.",
        ],
      },
      {
        heading: "Policies",
        body: [
          "Site Privacy Policy and Cookie Policy describe advertising technologies on our web surfaces.",
          "Per-product privacy and support URLs can be hosted under /apps/[slug]/ when a storefront requires them.",
        ],
      },
    ],
  },
  {
    slug: "ads-txt",
    title: "ads.txt",
    description: "Authorize sellers of digital inventory on your domain.",
    sections: [
      {
        heading: "What ads.txt is",
        body: [
          "ads.txt lists authorized sellers of your digital advertising inventory at the domain root.",
          "Buyers use it to reduce unauthorized inventory reselling.",
        ],
      },
      {
        heading: "On roncyo.com",
        body: [
          "Live file: https://roncyo.com/ads.txt — currently authorizes Google for pub-7172279368890576.",
          "If inventory lives on another domain under a Roncyo deal, we send the exact lines to publish.",
        ],
      },
      {
        heading: "Verification",
        body: [
          "After deploy, open /ads.txt and confirm lines match our instructions.",
          "Networks may take hours to re-crawl; AdSense status updates are often delayed.",
        ],
      },
    ],
  },
  {
    slug: "integration",
    title: "Integration",
    description: "Technical requirements for web and app partners.",
    sections: [
      {
        heading: "Web",
        body: [
          "Serve a stable HTTPS origin, publish ads.txt, and allow the ad tags we specify.",
          "Do not block crawlers needed for ads.txt or AdSense verification on production.",
        ],
      },
      {
        heading: "Apps & Mini Apps",
        body: [
          "Provide storelisting URLs plus privacy / support URLs. Roncyo can host compliance pages under /apps/[slug]/privacy and /support when needed.",
          "In-app ad SDKs follow your mobile ad contracts; we align naming and disclosures.",
        ],
      },
      {
        heading: "Support",
        body: [
          "Technical questions: support@roncyo.com.",
          "Include company name, property URL or package name, and a short description of the issue.",
        ],
      },
    ],
  },
];

export function getDocBySlug(slug: string) {
  return docPages.find((d) => d.slug === slug);
}

export function getAllDocSlugs() {
  return docPages.map((d) => d.slug);
}
