import { AppLink } from "@/components/AppLink";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Developer Support",
  description: `Contact ${site.brand} Open Platform for onboarding, integration, and monetization support.`,
  path: "/support",
  keywords: ["Roncyo support", "developer support", "open platform"],
});

export default function SupportPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        Support
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        Developer &amp; partner help
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
        For account onboarding, integration, ads.txt, or payouts, email us with your company name
        and product details.
      </p>
      <p className="mt-6 text-lg font-semibold text-[var(--color-foreground)]">
        <a className="underline hover:text-[var(--color-accent-hover)]" href={`mailto:${site.emails.support}`}>
          {site.emails.support}
        </a>
      </p>
      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Prefer docs first?{" "}
        <AppLink href="/docs/getting-started" className="font-medium text-[var(--color-accent-hover)] underline">
          Getting started
        </AppLink>
        .
      </p>
    </section>
  );
}
