export type ProductStatus = "live" | "lab" | "soon";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: ProductStatus;
  year: number;
  href?: string;
  playStoreUrl?: string;
  category: string;
  featured?: boolean;
  image?: string;
};

export const products: Product[] = [
  {
    slug: "destcard",
    name: "DestCard",
    tagline: "Discover your hidden patterns through the Destiny Matrix.",
    summary:
      "A spiritual self-discovery product that turns birth data into a visual reading. Already earning organic search attention.",
    status: "live",
    year: 2026,
    href: "https://destcard.com",
    category: "Digital product",
    featured: true,
    image: "/images/product-destcard.jpg",
  },
  {
    slug: "ronfax",
    name: "RonFax",
    tagline: "Simple document tools for modern workflows.",
    summary:
      "Cloud fax and document productivity for teams that still need reliable send and receive.",
    status: "live",
    year: 2025,
    href: "https://www.ronfax.com",
    category: "Productivity",
    featured: true,
    image: "/images/product-ronfax.jpg",
  },
  {
    slug: "picturekit",
    name: "PictureKit",
    tagline: "Image tools for makers who ship every day.",
    summary:
      "Coming into the Roncyo platform as a focused image toolkit: editor workflows without the noise.",
    status: "soon",
    year: 2026,
    category: "Tools",
    featured: true,
    image: "/images/product-picturekit.jpg",
  },
  {
    slug: "mochi-cats",
    name: "Mochi Cats",
    tagline: "A casual cat game on Google Play.",
    summary:
      "Light feline play published under the Roncyo umbrella. Available now on Google Play.",
    status: "live",
    year: 2026,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.roncyo.mochicats",
    href: "https://play.google.com/store/apps/details?id=com.roncyo.mochicats",
    category: "Games",
    featured: false,
  },
  {
    slug: "cozy-cat",
    name: "Cozy Cat Block Puzzle",
    tagline: "A calm mobile block puzzle with a soft feline mood.",
    summary:
      "Block puzzle play published as a store app under the Roncyo umbrella. Available now on Google Play.",
    status: "live",
    year: 2026,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.roncyo.cozycat",
    href: "https://play.google.com/store/apps/details?id=com.roncyo.cozycat",
    category: "Games",
    featured: false,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
