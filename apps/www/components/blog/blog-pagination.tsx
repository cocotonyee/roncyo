import { AppLink } from "@/components/AppLink";
import { blogHref, type BlogSort } from "@/lib/blog";

type Props = {
  page: number;
  pageCount: number;
  category: string;
  sort: BlogSort;
  q: string;
};

function qs(category: string, sort: BlogSort, q: string) {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (sort !== "newest") params.set("sort", sort);
  if (q) params.set("q", q);
  const s = params.toString();
  return s ? `?${s}` : "";
}

function pageList(current: number, total: number): number[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  return Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
}

export function BlogPagination({ page, pageCount, category, sort, q }: Props) {
  if (pageCount <= 1) return null;
  const suffix = qs(category, sort, q);
  const pages = pageList(page, pageCount);

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-[var(--color-border)] pt-8 sm:flex-row"
    >
      {page > 1 ? (
        <AppLink
          href={`${blogHref(page - 1)}${suffix}`}
          className="text-sm text-[var(--color-fg)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
        >
          Previous
        </AppLink>
      ) : (
        <span className="text-sm text-[var(--color-muted)]">Previous</span>
      )}

      <ul className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((p, i) => {
          const prev = pages[i - 1];
          const showGap = prev != null && p - prev > 1;
          return (
            <li key={p} className="flex items-center gap-2">
              {showGap ? (
                <span className="px-1 text-sm text-[var(--color-muted)]" aria-hidden>
                  …
                </span>
              ) : null}
              <AppLink
                href={`${blogHref(p)}${suffix}`}
                aria-current={p === page ? "page" : undefined}
                className={`inline-flex min-w-10 items-center justify-center px-3 py-2 text-sm transition ${
                  p === page
                    ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
                    : "border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-fg)]"
                }`}
              >
                {p}
              </AppLink>
            </li>
          );
        })}
      </ul>

      {page < pageCount ? (
        <AppLink
          href={`${blogHref(page + 1)}${suffix}`}
          className="text-sm text-[var(--color-fg)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
        >
          Next
        </AppLink>
      ) : (
        <span className="text-sm text-[var(--color-muted)]">Next</span>
      )}
    </nav>
  );
}
