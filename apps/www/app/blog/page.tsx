import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSiteProfile } from "@goship/core";
import { BlogCard, BlogFilters, BlogPagination } from "@/components/blog";
import { blogHref, queryBlogPosts, type BlogSort } from "@/lib/blog";
import { site } from "@/lib/site";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    q?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Journal",
  description: `${site.brand} Journal — mother-brand narrative, product incubation notes, and launch learnings from a studio that builds DestCard, RonFax, and other digital products.`,
  alternates: { canonical: "/blog" },
};

function parseSort(value?: string): BlogSort {
  if (value === "oldest" || value === "title") return value;
  return "newest";
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const category = params.category?.trim() || "all";
  const sort = parseSort(params.sort);
  const q = params.q?.trim() || "";

  if (page > 1) {
    const qs = new URLSearchParams();
    if (category !== "all") qs.set("category", category);
    if (sort !== "newest") qs.set("sort", sort);
    if (q) qs.set("q", q);
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    redirect(`${blogHref(page)}${suffix}`);
  }

  const result = await queryBlogPosts({ page: 1, category, sort, q });
  const profile = getSiteProfile();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <p className="text-xs text-[var(--color-muted)]">
        <Link href="/" className="hover:text-[var(--color-fg)]">
          Home
        </Link>{" "}
        / Journal
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-5xl lg:text-6xl">
        {profile?.name ? `${profile.name} Journal` : "Journal"}
      </h1>
      <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
        Mother-brand narrative, product incubation records, and launch learnings —
        so people (and AI) can see how Roncyo discovers, ships, and grows products.
      </p>

      <BlogFilters
        categories={result.categories}
        category={category}
        sort={sort}
        q={q}
      />

      <p className="mt-8 text-sm text-[var(--color-muted)]">
        {result.total} article{result.total === 1 ? "" : "s"}
        {result.pageCount > 1 ? ` · Page ${result.page} of ${result.pageCount}` : ""}
      </p>

      {result.posts.length === 0 ? (
        <div className="mt-8 border border-[var(--color-border)] p-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-fg)]">
            No posts yet
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            New writing will show up here as we publish.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {result.posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <BlogPagination
        page={result.page}
        pageCount={result.pageCount}
        category={category}
        sort={sort}
        q={q}
      />
    </section>
  );
}
