import { AppLink } from "@/components/AppLink";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Game Categories",
  description: `Browse free online games by category on ${site.brand}.`,
  path: "/categories",
  keywords: ["game categories", "arcade", "puzzle", "casual games"],
});

export default function CategoriesPage() {
  const counts = new Map<string, number>();
  for (const game of games) {
    for (const cat of game.categories ?? []) {
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
  }
  const categories = Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        Discover
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-foreground)] sm:text-4xl">
        Categories
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
        Find the vibe you want — arcade speed, cozy puzzles, and more.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([name, count]) => (
          <AppLink
            key={name}
            href={`/categories/${encodeURIComponent(name.toLowerCase())}`}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
          >
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">{name}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {count} game{count === 1 ? "" : "s"}
            </p>
          </AppLink>
        ))}
      </div>
    </section>
  );
}
