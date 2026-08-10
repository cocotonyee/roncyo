import { AppLink } from "@/components/AppLink";
import type { BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <AppLink
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col border border-[var(--color-border)] bg-[var(--color-bg)] p-6 transition hover:border-[var(--color-fg)] sm:p-7"
    >
      {post.coverImage ? (
        <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-[var(--color-surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="mb-5 aspect-[16/10] bg-[var(--color-surface)]" aria-hidden />
      )}
      <p className="text-xs text-[var(--color-muted)]">
        {post.date}
        {post.category ? ` · ${post.category}` : ""}
        {post.readTime ? ` · ${post.readTime}` : ""}
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-fg)] transition group-hover:text-[var(--color-accent)] sm:text-2xl">
        {post.title}
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
        {post.description}
      </p>
      <span className="mt-6 text-sm font-medium text-[var(--color-fg)] underline-offset-4 group-hover:text-[var(--color-accent)] group-hover:underline">
        Read
      </span>
    </AppLink>
  );
}
