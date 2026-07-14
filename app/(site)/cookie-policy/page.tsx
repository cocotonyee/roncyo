import type { Metadata } from "next";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { LegalUpdatedBadge } from "@/components/LegalUpdated";
import { Prose } from "@/components/Prose";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description: `How ${site.brand} uses cookies and similar technologies on ${site.domain}.`,
  path: "/cookie-policy",
  keywords: ["cookie policy", "tracking"],
});

export default function CookiePolicyPage() {
  return (
    <InnerPage wide glow="amber">
      <PageIntro
        eyebrow="Legal"
        title="Cookie Policy"
        lead={`How we use cookies and similar technologies on ${site.domain}.`}
        tone="yellow"
      />
      <ContentPanel>
        <LegalUpdatedBadge />
        <Prose contained={false}>
          <p>
            This page explains how {site.brand} uses cookies and similar technologies on{" "}
            {site.domain} (the &quot;Site&quot;).
          </p>
          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device. They help remember preferences,
            maintain security, and understand how visitors use the Site.
          </p>
          <h2>How we use cookies</h2>
          <ul>
            <li>
              <strong>Essential</strong> — required for basic Site operation (for example, load
              balancing or security).
            </li>
            <li>
              <strong>Advertising (Google AdSense)</strong> — we use Google AdSense to show ads on
              the Site. Google may set or read cookies (and similar technologies) to deliver and
              measure ads, including personalized ads where permitted by your settings and applicable
              law.
            </li>
            <li>
              <strong>Analytics</strong> — if enabled in the future, to measure traffic and
              performance.
            </li>
          </ul>
          <h2>Google advertising</h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s
            prior visits to this website or other websites. Google&apos;s use of advertising cookies
            enables it and its partners to serve ads based on visits to this Site and/or other sites
            on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{" "}
            <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
              Google Ads Settings
            </a>
            . Learn more about Google partner sites at{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              rel="noopener noreferrer"
              target="_blank"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </p>
          <h2>Your choices</h2>
          <p>
            You can also control cookies through your browser settings. Blocking some cookies may
            affect Site functionality or ad measurement.
          </p>
          <h2>Contact</h2>
          <p>
            <a href={`mailto:${site.emails.privacy}`}>{site.emails.privacy}</a>
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
