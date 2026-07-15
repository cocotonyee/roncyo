import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLink } from "@/components/AppLink";
import { docPages, getAllDocSlugs, getDocBySlug } from "@/lib/docs";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return buildPageMetadata({
    title: `${doc.title} — Docs`,
    description: doc.description,
    path: `/docs/${doc.slug}`,
    keywords: [doc.title, "Roncyo documentation", "publishing"],
  });
}

export default async function DocDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[220px_1fr] sm:px-8 lg:px-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-muted)] uppercase">
          Docs
        </p>
        <nav className="mt-4 flex flex-col gap-1" aria-label="Documentation">
          <AppLink
            href="/docs"
            className="rounded-lg px-3 py-2 text-sm text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]"
          >
            All docs
          </AppLink>
          {docPages.map((item) => (
            <AppLink
              key={item.slug}
              href={`/docs/${item.slug}`}
              className={`rounded-lg px-3 py-2 text-sm ${
                item.slug === doc.slug
                  ? "bg-[var(--color-surface)] font-semibold text-[var(--color-foreground)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {item.title}
            </AppLink>
          ))}
        </nav>
      </aside>

      <article>
        <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
          Documentation
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">
          {doc.description}
        </p>

        <div className="mt-10 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-[var(--color-muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)]">
          Need a partnership?{" "}
          <AppLink href="/support" className="font-medium text-[var(--color-accent-hover)] underline">
            Contact support
          </AppLink>
          .
        </p>
      </article>
    </div>
  );
}
