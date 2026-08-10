import { CtaButton } from "@/components/CtaButton";
import type { Product } from "@/lib/products";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const statusLabel: Record<Product["status"], string> = {
  live: "Live",
  lab: "Lab",
  soon: "Soon",
};

export function ProductGalleryItem({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const exploreHref = product.href ?? `/products/${product.slug}`;
  const external = Boolean(product.href);
  const imageLeft = index % 2 === 1;

  const copy = (
    <div className={imageLeft ? "lg:pl-4" : "lg:pr-4"}>
      <p className="text-sm text-[var(--color-muted)]">
        {product.category} / {statusLabel[product.status]}
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-4xl lg:text-5xl">
        {product.name}
      </h3>
      <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-[var(--color-muted)]">
        {product.tagline}
      </p>
      <div className="mt-8">
        <CtaButton href={exploreHref} external={external}>
          Explore {product.name}
        </CtaButton>
      </div>
    </div>
  );

  const media = (
    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-surface)]">
      {product.image ? (
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
      )}
    </div>
  );

  return (
    <Reveal delay={index * 0.06}>
      <article className="group border-t border-[var(--color-border)] py-12 sm:py-16">
        <div
          className={`grid items-center gap-8 lg:gap-14 ${
            imageLeft
              ? "lg:grid-cols-[1.15fr_0.85fr]"
              : "lg:grid-cols-[0.85fr_1.15fr]"
          }`}
        >
          {imageLeft ? (
            <>
              {media}
              {copy}
            </>
          ) : (
            <>
              {copy}
              {media}
            </>
          )}
        </div>
      </article>
    </Reveal>
  );
}
