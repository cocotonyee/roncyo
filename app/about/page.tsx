import type { Metadata } from "next";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { Prose } from "@/components/Prose";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us — Game Publisher & App Studio",
  description: `Learn about ${site.brand}, an independent game publisher based in the ${site.country}. Mobile games, web demos, and professional app distribution.`,
  path: "/about",
  keywords: ["about Roncy", "game studio", "app publisher"],
});

export default function AboutPage() {
  return (
    <InnerPage glow="lavender">
      <PageIntro
        eyebrow="About"
        title={site.brand}
        lead={`Independent studio based in the ${site.country}. We ship ${site.tagline} with clear support and honest privacy practices.`}
        tone="navy"
      />
      <ContentPanel>
        <Prose contained={false}>
          <p>
            We design and publish mobile and browser games, with a focus on clear player
            communication and honest data practices.
          </p>
          <p className="text-sm text-[var(--color-roncy-muted)]">
            Legal entity: {site.legalName} ({site.country}).
          </p>
          <p>
            For business, press, or general inquiries, email{" "}
            <a href={`mailto:${site.emails.hello}`}>{site.emails.hello}</a>. For player support, use{" "}
            <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>.
          </p>
          <h2>What we do</h2>
          <ul>
            <li>Develop and operate casual and puzzle-style games</li>
            <li>Publish on major app stores and the open web where applicable</li>
            <li>Maintain public support and legal pages for every live product</li>
          </ul>
          <h2>Registration &amp; jurisdiction</h2>
          <p>
            {site.brand} operates from the {site.country}. Information on this page is provided for
            store reviewers, payment providers, and partners verifying that we are an active publisher.
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
