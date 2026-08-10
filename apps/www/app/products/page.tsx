import { ProductGalleryItem } from "@/components/ProductGalleryItem";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Products",
  description: "Selected digital products and experiments from the Roncyo studio.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
      <Reveal>
        <h1 className="max-w-[16ch] font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-5xl">
          A portfolio of small software.
        </h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--color-muted)]">
          Live products, store apps, and upcoming tools. Winners may graduate to their own domains.
          The studio remains the home base.
        </p>
      </Reveal>
      <div className="mt-10">
        {products.map((product, index) => (
          <ProductGalleryItem key={product.slug} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
