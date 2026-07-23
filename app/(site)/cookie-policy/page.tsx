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
              <strong>Analytics</strong> — if enabled in the future, to measure traffic and
              performance.
            </li>
          </ul>
          <h2>Advertising</h2>
          <p>
            This company website does not currently use Google AdSense or similar third-party ad
            networks to show ads. Our mobile apps may still use advertising SDKs as disclosed in
            each app&apos;s privacy materials.
          </p>
          <h2>Your choices</h2>
          <p>
            You can control cookies through your browser settings. Blocking some cookies may affect
            Site functionality.
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
