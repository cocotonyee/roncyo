import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppStoreCard } from "@/components/AppStoreCard";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function allCategories() {
  return Array.from(new Set(games.flatMap((g) => g.categories ?? [])));
}

export function generateStaticParams() {
  return allCategories().map((cat) => ({ slug: cat.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = allCategories().find((c) => c.toLowerCase() === slug);
  if (!name) return {};
  return buildPageMetadata({
    title: `${name} Games`,
    description: `Play free ${name.toLowerCase()} games on ${site.brand}.`,
    path: `/categories/${slug}`,
    keywords: [name, `${name} games`, "free online games"],
  });
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const name = allCategories().find((c) => c.toLowerCase() === slug);
  if (!name) notFound();

  const list = games.filter((g) => g.categories?.some((c) => c.toLowerCase() === slug));

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        Category
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-foreground)] sm:text-4xl">
        {name}
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)]">
        {list.length} game{list.length === 1 ? "" : "s"}
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((game) => (
          <AppStoreCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
