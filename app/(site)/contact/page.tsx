import { ContactForm } from "@/components/ContactForm";
import { buildPageMetadata, contactPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: `Contact ${site.brand} to commission a website, custom game, AI automation, Ronfax, or SaaS product.`,
  path: "/contact",
  keywords: ["contact Roncyo", "custom game order", "SaaS development quote"],
});

export default function ContactPage() {
  const schema = contactPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1fr_1.1fr] sm:px-8 lg:px-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
            Contact
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
            Tell us what to build
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
            Custom websites, games, automation, Ronfax, or SaaS — send a short brief and we&apos;ll
            reply with next steps.
          </p>
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            Prefer email?{" "}
            <a
              href={`mailto:${site.emails.hello}`}
              className="font-semibold text-[var(--color-foreground)] underline underline-offset-4"
            >
              {site.emails.hello}
            </a>
          </p>
        </div>
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 sm:p-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
