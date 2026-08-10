import type { BlogSort } from "@/lib/blog";

type Props = {
  categories: string[];
  category: string;
  sort: BlogSort;
  q: string;
};

export function BlogFilters({ categories, category, sort, q }: Props) {
  return (
    <form method="get" action="/blog" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <label className="flex min-w-[10rem] flex-1 flex-col gap-1 text-xs text-[var(--color-muted)]">
        Search
        <input
          name="q"
          defaultValue={q}
          placeholder="Search posts"
          className="border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-fg)]"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-[var(--color-muted)]">
        Category
        <select
          name="category"
          defaultValue={category}
          className="border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-fg)] outline-none"
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs text-[var(--color-muted)]">
        Sort
        <select
          name="sort"
          defaultValue={sort}
          className="border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-fg)] outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </label>
      <button
        type="submit"
        className="border border-[var(--color-fg)] bg-[var(--color-fg)] px-4 py-2 text-sm text-[var(--color-bg)] transition hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
      >
        Apply
      </button>
    </form>
  );
}
