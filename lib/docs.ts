export type DocPage = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string[] }[];
};

export const docsIndex = {
  title: "Documentation",
  description:
    "How Roncyo works for publishers — distribution, ads, and requirements for games and websites.",
} as const;

export const docPages: DocPage[] = [
  {
    slug: "overview",
    title: "Platform overview",
    description: "What Roncyo is and how publishing, distribution, and monetization fit together.",
    sections: [
      {
        heading: "What Roncyo does",
        body: [
          "Roncyo helps publishers put games and websites in front of players and visitors, then earn through advertising.",
          "We focus on distribution and ad monetization — not a consumer play catalog. This website is the product home and documentation for partners.",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Independent studios, HTML5 / web publishers, and site owners who want inventory filled with ads and clear reporting.",
          "Mobile or Telegram games can also connect via store listing and compliance pages we host for you.",
        ],
      },
      {
        heading: "What this site is not",
        body: [
          "Roncyo.com is not a Poki-style free play portal. Players do not browse a public game directory here.",
          "Playable builds (if any) are delivered through partner channels we agree with you — not a public trial arcade on this domain.",
        ],
      },
    ],
  },
  {
    slug: "publishing",
    title: "Publishing & distribution",
    description: "How titles and sites are accepted, listed, and distributed.",
    sections: [
      {
        heading: "Onboarding",
        body: [
          "Contact support@roncyo.com with your studio name, titles, platforms (web, Android, iOS, Telegram), and target markets.",
          "We confirm creative, age rating, and compliance materials (privacy, support contacts) before go-live.",
        ],
      },
      {
        heading: "What we need from you",
        body: [
          "Build or URL for web games; store links for mobile; Mini App / bot links for Telegram where relevant.",
          "Screenshots or icon art, short description, content rating, and a privacy contact email.",
          "Confirmation that your content complies with applicable store and advertising policies.",
        ],
      },
      {
        heading: "Distribution",
        body: [
          "We place approved inventory across ad and traffic partners according to the agreement for each title.",
          "You keep ownership of your IP; Roncyo provides distribution, ad fill, and operational support.",
        ],
      },
    ],
  },
  {
    slug: "monetization",
    title: "Ads & revenue",
    description: "How advertising and revenue share work on the platform.",
    sections: [
      {
        heading: "Advertising",
        body: [
          "Monetization is primarily ad-based (for example Google AdSense / authorized networks on web properties).",
          "Ad formats and placements follow network policies and what we enable for each property.",
        ],
      },
      {
        heading: "Revenue",
        body: [
          "Publisher revenue share, payment schedule, and thresholds are defined in your partnership agreement.",
          "We use ads.txt and related authorizations so demand partners can verify inventory on roncyo.com and related properties.",
        ],
      },
      {
        heading: "Compliance",
        body: [
          "Privacy Policy and Cookie Policy on this site disclose advertising technologies used on our web surfaces.",
          "Per-title privacy and support pages remain available for games that require store or Mini App compliance URLs.",
        ],
      },
    ],
  },
  {
    slug: "ads-txt",
    title: "ads.txt setup",
    description: "Authorize ad buyers for inventory served on Roncyo properties.",
    sections: [
      {
        heading: "What ads.txt is",
        body: [
          "ads.txt is a text file at the domain root that lists authorized sellers of your digital inventory.",
          "Buyers and exchanges use it to reduce unauthorized reselling.",
        ],
      },
      {
        heading: "On roncyo.com",
        body: [
          "Our live file is https://roncyo.com/ads.txt and currently authorizes Google for publisher ID pub-7172279368890576.",
          "If you host inventory on another domain under a Roncyo deal, we will tell you the exact ads.txt lines to publish.",
        ],
      },
      {
        heading: "Checking status",
        body: [
          "After deploy, open /ads.txt in a browser and confirm the lines match what we sent you.",
          "Ad networks may take hours to re-crawl; AdSense “ads.txt” status updates are often delayed.",
        ],
      },
    ],
  },
  {
    slug: "integration",
    title: "Technical integration",
    description: "High-level requirements for web and app partners.",
    sections: [
      {
        heading: "Web",
        body: [
          "Serve a stable HTTPS origin, publish ads.txt, and allow placement of the ad tags we specify.",
          "Do not block crawlers needed for ads.txt or AdSense verification on the production host.",
        ],
      },
      {
        heading: "Apps & Mini Apps",
        body: [
          "Provide store listing URLs and privacy / support URLs. Roncyo can host compliance pages under /games/[slug]/privacy and /support when needed.",
          "In-app ad SDKs follow your mobile ad partner contracts; we coordinate naming and data disclosures.",
        ],
      },
      {
        heading: "Support",
        body: [
          "Technical and partnership questions: support@roncyo.com.",
          "Include studio name, property URL or package name, and a short description of the issue.",
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
