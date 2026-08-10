import { CtaButton } from "@/components/CtaButton";
import { getProductBySlug, products } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return buildPageMetadata({
    title: product.name,
    description: product.tagline,
    path: `/products/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
        {product.category} · {product.year}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl tracking-tight text-[var(--color-fg)]">
        {product.name}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">{product.tagline}</p>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">{product.summary}</p>
      <div className="mt-10">
        {product.href ? (
          <CtaButton href={product.href} external>
            Open {product.name} →
          </CtaButton>
        ) : (
          <CtaButton href="/contact" variant="secondary">
            Ask about this project
          </CtaButton>
        )}
      </div>
    </section>
  );
}
