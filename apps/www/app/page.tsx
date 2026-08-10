import { AppLink } from "@/components/AppLink";
import { HomeHero } from "@/components/HomeHero";
import { ProductScrollShowcase } from "@/components/product-showcase/ProductScrollShowcase";
import { Reveal } from "@/components/Reveal";
import { experiments } from "@/lib/experiments";
import { listBlogPosts } from "@/lib/blog";
import { getFeaturedProducts } from "@/lib/products";
import { withReferral } from "@/lib/outbound";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: `${site.brand} - ${site.tagline}`,
  description: site.description,
  path: "/",
  keywords: ["Roncyo", "digital product studio", "indie tools", "DestCard", "RonFax"],
});

export default async function HomePage() {
  const featured = getFeaturedProducts();
  const posts = (await listBlogPosts()).filter((p) => !p.noindex).slice(0, 2);

  return (
    <>
      <div className="-mt-16">
        <HomeHero />
      </div>

      <ProductScrollShowcase products={featured} />

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="max-w-[14ch] font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-4xl">
              A studio, not a sales deck.
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-[var(--color-muted)]">
              <p>
                Roncyo is a small digital product studio. We create tools, apps, and experiments
                that solve real problems, then let winners earn their own stage.
              </p>
              <p>
                The mother brand builds trust. Products earn attention, signups, and revenue. We are
                not an all-in-one AI platform.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-4xl">
            The lab notebook.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-0 border-y border-[var(--color-border)] md:grid-cols-2">
          {experiments.map((item, i) => (
            <li
              key={`${item.year}-${item.name}`}
              className={`border-b border-[var(--color-border)] py-7 md:px-6 md:py-8 ${
                i % 2 === 0 ? "md:border-r" : ""
              } ${i >= experiments.length - 2 ? "md:border-b-0" : ""}`}
            >
              <Reveal delay={i * 0.04}>
                <p className="text-xs text-[var(--color-muted)]">
                  {item.year} · {item.status}
                </p>
                {item.href ? (
                  <a
                    href={withReferral(item.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-fg)] transition hover:text-[var(--color-accent)]"
                  >
                    {item.name}
                  </a>
                ) : (
                  <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
                    {item.name}
                  </p>
                )}
                <p className="mt-2 text-sm text-[var(--color-muted)]">{item.blurb}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="pt-8">
          <AppLink
            href="/labs"
            className="text-sm font-medium text-[var(--color-fg)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
          >
            Visit Labs
          </AppLink>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-4xl">
                Notes from the studio.
              </h2>
              <AppLink
                href="/blog"
                className="text-sm font-medium text-[var(--color-fg)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
              >
                All entries
              </AppLink>
            </div>
          </Reveal>
          <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 0.06}>
                  <AppLink href={`/blog/${post.slug}`} className="group block">
                    <p className="text-xs text-[var(--color-muted)]">
                      {post.date}
                      {post.readTime ? ` · ${post.readTime}` : ""}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-fg)] transition group-hover:text-[var(--color-accent)]">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[var(--color-muted)]">
                      {post.description}
                    </p>
                  </AppLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] text-[var(--color-bg)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-20 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
          <Reveal>
            <div className="max-w-xl">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter sm:text-4xl">
                Say hello.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                Partnerships, press, product ideas, or just a note. We read every message.
              </p>
            </div>
          </Reveal>
          <AppLink
            href="/contact"
            className="inline-flex bg-[var(--color-bg)] px-5 py-3 text-sm font-medium text-[var(--color-fg)] transition hover:bg-[var(--color-accent)] hover:text-white active:scale-[0.98]"
          >
            Contact
          </AppLink>
        </div>
      </section>
    </>
  );
}
