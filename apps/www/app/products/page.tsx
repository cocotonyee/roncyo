import { ProductGalleryItem } from "@/components/ProductGalleryItem";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Products",
  description:
    "DestCard, RonFax, and other focused digital products from the Roncyo studio — things people can use today.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
      <Reveal>
        <h1 className="max-w-[16ch] font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-5xl">
          Products people can use.
        </h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--color-muted)]">
          Shipped software with clear entry points. Build logs and incubation notes live in the
          Journal — this page is for the products themselves.
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
