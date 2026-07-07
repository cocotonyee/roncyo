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

export default function HomePage() {
  return (
    <section className="home">
      <p className="home__brand">{site.brand}</p>
      <h1 className="home__title">{automation.headline}</h1>
      <p className="home__lead">{automation.subheadline}</p>
      <p className="home__tagline">{site.tagline}</p>
    </section>
  );
}
