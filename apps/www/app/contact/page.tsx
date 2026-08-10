import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: `Contact ${site.brand} — partnerships, press, and product notes.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
        Contact
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--color-fg)] sm:text-5xl">
        Write to the studio.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
        For product questions, partnerships, press, or support — one inbox is enough.
      </p>
      <div className="mt-12 border-y border-[var(--color-border)] py-10">
        <p className="text-xs tracking-[0.16em] text-[var(--color-accent)] uppercase">Email</p>
        <a
          href={`mailto:${site.emails.hello}`}
          className="mt-3 inline-block font-[family-name:var(--font-display)] text-3xl text-[var(--color-fg)] transition hover:text-[var(--color-accent)]"
        >
          {site.emails.hello}
        </a>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          We aim to reply within one business day.
        </p>
      </div>
    </section>
  );
}
