import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSiteProfile } from "@goship/core";
import { BlogCard, BlogFilters, BlogPagination } from "@/components/blog";
import { blogHref, queryBlogPosts, type BlogSort } from "@/lib/blog";

interface PageProps {
  params: Promise<{ page: string }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
    q?: string;
  }>;
}

function parseSort(value?: string): BlogSort {
  if (value === "oldest" || value === "title") return value;
  return "newest";
}

export async function generateStaticParams() {
  const { pageCount } = await queryBlogPosts({ page: 1 });
  const pages: { page: string }[] = [];
  for (let page = 2; page <= pageCount; page++) {
    pages.push({ page: String(page) });
  }
  return pages;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = Number(pageParam);
  if (!Number.isFinite(page) || page < 1) {
    return { title: "Journal" };
  }
  return {
    title: `Journal · Page ${page}`,
    description: `Journal archive page ${page}.`,
    alternates: { canonical: blogHref(page) },
  };
}

export default async function BlogArchivePage({ params, searchParams }: PageProps) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);
  if (!Number.isFinite(page) || page < 1) notFound();
  if (page === 1) redirect("/blog");

  const sp = await searchParams;
  const category = sp.category?.trim() || "all";
  const sort = parseSort(sp.sort);
  const q = sp.q?.trim() || "";

  const result = await queryBlogPosts({ page, category, sort, q });
  if (page > result.pageCount) notFound();

  const profile = getSiteProfile();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <p className="text-xs text-[var(--color-muted)]">
        <Link href="/" className="hover:text-[var(--color-fg)]">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:text-[var(--color-fg)]">
          Journal
        </Link>{" "}
        / Page {page}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-5xl">
        {profile?.name ? `${profile.name} Journal` : "Journal"}
      </h1>

      <BlogFilters categories={result.categories} category={category} sort={sort} q={q} />

      <p className="mt-8 text-sm text-[var(--color-muted)]">
        {result.total} articles · Page {result.page} of {result.pageCount}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {result.posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

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
