import { automation } from "@/lib/automation";
import { buildPageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Roncyo — AI Business Automation for Local Businesses in Australia & NZ",
  description:
    "Custom AI automation for local businesses in Australia and New Zealand. Eliminate repetitive work with workflow, email, browser, spreadsheet, PDF, and reporting automation.",
  path: "/",
  keywords: [...SEO_KEYWORDS],
});

/** WATP landing — top Roiify ad only, no nav or outbound links. */
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
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{site.tagline}</p>
    </section>
  );
}
