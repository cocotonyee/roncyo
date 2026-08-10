export type ProductStatus = "live" | "lab" | "soon";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: ProductStatus;
  year: number;
  href?: string;
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
    slug: "cozy-cat",
    name: "Cozy Cat",
    tagline: "A calm mobile puzzle game.",
    summary:
      "Block puzzle play with a soft feline mood. Published as a store app under the Roncyo umbrella.",
    status: "live",
    year: 2026,
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
