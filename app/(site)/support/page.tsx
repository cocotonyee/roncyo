import { AppLink } from "@/components/AppLink";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Support & Partnerships",
  description: `Contact ${site.brand} for publishing, distribution, and monetization support.`,
  path: "/support",
  keywords: ["Roncyo support", "publisher support", "partnerships"],
});

export default function SupportPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        Support
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        Partnerships &amp; help
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
        For onboarding, distribution, ads.txt, or payment questions, email us with your studio name
        and property details.
      </p>
      <p className="mt-6 text-lg font-semibold text-[var(--color-foreground)]">
        <a className="underline hover:text-[var(--color-accent-hover)]" href={`mailto:${site.emails.support}`}>
          {site.emails.support}
        </a>
      </p>
      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Looking for product documentation? Start at{" "}
        <AppLink href="/docs" className="font-medium text-[var(--color-accent-hover)] underline">
          /docs
        </AppLink>
        .
      </p>
    </section>
  );
}
