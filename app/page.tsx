import Link from "next/link";
import { AutomationButton } from "@/components/automation/Button";
import { automation } from "@/lib/automation";
import { buildPageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Roncyo — AI Business Automation for Local Businesses in Australia & NZ",
  description:
    "Custom AI automation for local businesses in Australia and New Zealand. Eliminate repetitive work with workflow, email, browser, spreadsheet, PDF, and reporting automation. Free consultation.",
  path: "/",
  keywords: [...SEO_KEYWORDS],
});

export default function HomePage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <p className="text-sm font-medium text-[var(--color-muted)]">{site.brand}</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        {automation.headline}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
        {automation.subheadline}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
        {site.tagline}
      </p>
      <div className="mt-10">
        <AutomationButton href="/contact">{automation.ctas.primary}</AutomationButton>
      </div>
      <p className="mt-10 text-sm text-[var(--color-muted)]">
        <Link href="/services" className="underline hover:text-[var(--color-foreground)]">
          Services
        </Link>
        {" · "}
        <Link href="/contact" className="underline hover:text-[var(--color-foreground)]">
          Contact
        </Link>
      </p>
    </section>
  );
}
