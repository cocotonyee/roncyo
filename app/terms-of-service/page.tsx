import type { Metadata } from "next";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { LegalUpdatedBadge } from "@/components/LegalUpdated";
import { Prose } from "@/components/Prose";
import { games } from "@/lib/games";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${site.brand} products and websites.`,
};

export default function TermsPage() {
  const gameExamples =
    games.length > 0
      ? `${games.map((g) => g.title).join(", ")} and other current or future titles`
      : "our current or future titles";

  return (
    <InnerPage wide glow="storm">
      <PageIntro
        eyebrow="Legal"
        title="Terms of Service"
        lead="Rules for using our games, apps, websites, and related services."
        tone="navy"
      />
      <ContentPanel>
        <LegalUpdatedBadge />
        <Prose contained={false}>
          <p>
            <strong>Effective date:</strong> {LEGAL_LAST_UPDATED}
          </p>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the games,
            apps, websites, and related services provided by {site.legalName} (&quot;RONCY,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our services,
            you agree to these Terms.
          </p>

          <h2>1. Who We Are</h2>
          <p>
            {site.legalName} is a software and game development company. These Terms apply to all
            games, websites, and related services published or operated by {site.legalName},
            including but not limited to {gameExamples}.
          </p>

          <h2>2. Use of Our Services</h2>
          <p>
            You may use our services only in compliance with applicable laws and these Terms. You agree
            not to misuse our services, interfere with their normal operation, or attempt to access them
            in unauthorized ways.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must be legally permitted to use our services in your jurisdiction. If you are under
            the age of majority in your jurisdiction, you may only use our services with the
            involvement of a parent or legal guardian.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content, software, designs, graphics, logos, text, audio, video, and other materials
            in our services are owned by or licensed to {site.legalName} and are protected by
            applicable intellectual property laws. Except as expressly permitted, you may not copy,
            modify, distribute, sell, or reverse engineer any part of our services.
          </p>

          <h2>5. Virtual Items and Game Progress</h2>
          <p>
            Our games may include points, progress, unlocks, cosmetic items, or other virtual content.
            These items are licensed, not sold, and have no real-world monetary value unless explicitly
            stated otherwise. We may modify, rebalance, or remove virtual content at any time as part
            of maintaining or improving our services.
          </p>

          <h2>6. In-App Purchases and Payments</h2>
          <p>
            If our services offer in-app purchases, all purchases are processed by the relevant
            platform provider (such as Apple, Google, TikTok, or another app store). Purchases are
            subject to that platform&apos;s billing and refund policies. {site.legalName} does not
            directly process payment card information for in-app purchases unless explicitly stated.
          </p>

          <h2>7. Advertising</h2>
          <p>
            Our services may display advertisements from us or from third-party advertising
            partners. We are not responsible for the content of third-party ads or external links.
          </p>

          <h2>8. Updates and Availability</h2>
          <p>
            We may update, change, suspend, or discontinue any part of our services at any time, with
            or without notice. We do not guarantee that our services will always be available,
            uninterrupted, secure, or error-free.
          </p>

          <h2>9. Acceptable Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services for unlawful purposes;</li>
            <li>Exploit bugs, cheats, automation tools, or unauthorized modifications;</li>
            <li>Upload or transmit harmful code, malware, or abusive content;</li>
            <li>Harass, abuse, or harm other users or our team;</li>
            <li>Interfere with the integrity or performance of our services.</li>
          </ul>

          <h2>10. Third-Party Services</h2>
          <p>
            Our services may include third-party tools, analytics, ad networks, or platform
            integrations. Your use of those third-party services may also be subject to their own
            terms and privacy policies.
          </p>

          <h2>11. Disclaimer</h2>
          <p>
            Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties
            of any kind, express or implied, to the fullest extent permitted by law. We do not guarantee
            that the services will meet your expectations or be free from defects or interruptions.
          </p>

          <h2>12. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {site.legalName} shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of data,
            profits, or goodwill arising from or related to your use of our services.
          </p>

          <h2>13. Termination</h2>
          <p>
            We may suspend or terminate access to our services if we believe you have violated these
            Terms or if required to do so by law or platform policy.
          </p>

          <h2>14. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. If we make material changes, we will update
            the effective date above. Continued use of our services after updated Terms become
            effective means you accept the revised Terms.
          </p>

          <h2>15. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            Email:{" "}
            <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>
            <br />
            Company: {site.legalName}
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
