import type { Metadata } from "next";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { LegalUpdatedBadge } from "@/components/LegalUpdated";
import { Prose } from "@/components/Prose";
import { games } from "@/lib/games";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${site.brand} privacy policy — how we collect and use data.`,
};

export default function PrivacyPolicyPage() {
  const gameExamples =
    games.length > 0
      ? `${games.map((g) => g.title).join(", ")} and other titles`
      : "our other titles";

  return (
    <InnerPage wide glow="indigo">
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How we collect, use, and share information across our games, apps, and websites."
        tone="navy"
      />
      <ContentPanel>
        <LegalUpdatedBadge />
        <Prose contained={false}>
          <p>
            <strong>Effective date:</strong> {LEGAL_LAST_UPDATED}
          </p>
          <p>
            This Privacy Policy explains how {site.legalName} (&quot;RONCY,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information when you use
            our games, apps, websites, and related services, including but not limited to{" "}
            {gameExamples} published by {site.legalName}.
          </p>

          <h2>1. Information We May Collect</h2>

          <h3>a. Information you provide directly</h3>
          <p>
            In many of our games, we do not require you to create an account or directly submit
            personal information. If you contact us, however, we may collect information such as your
            name, email address, and the contents of your message.
          </p>

          <h3>b. Information collected automatically</h3>
          <p>
            When you use our services, we or our service providers may automatically collect certain
            information, which may include:
          </p>
          <ul>
            <li>Device type and device identifiers</li>
            <li>Operating system and app version</li>
            <li>Language and region settings</li>
            <li>Gameplay events and progress data</li>
            <li>Crash logs and diagnostics</li>
            <li>Advertising identifiers, where permitted by applicable law and platform settings</li>
            <li>General usage and analytics information</li>
          </ul>

          <h3>c. Information from third parties</h3>
          <p>
            We may receive information from app stores, analytics providers, advertising partners, or
            other third-party services that help us operate, measure, and improve our services.
          </p>

          <h2>2. How We Use Information</h2>
          <p>We may use information we collect to:</p>
          <ul>
            <li>Provide, operate, maintain, and improve our games and services</li>
            <li>Save gameplay progress and support core functionality</li>
            <li>Analyze performance, engagement, and technical issues</li>
            <li>Fix bugs and prevent abuse or fraud</li>
            <li>Show ads, where applicable</li>
            <li>Respond to support requests and communicate with users</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Advertising and Analytics</h2>
          <p>
            Our services may use third-party analytics tools and advertising partners. These third
            parties may collect information as described in their own privacy policies, including
            device identifiers, usage information, and ad performance data, where permitted by law and
            platform rules.
          </p>
          <p>
            If our services display ads, those ads may be contextual or personalized depending on
            your device settings, region, and applicable law.
          </p>

          <h2>4. Sharing of Information</h2>
          <p>We may share information:</p>
          <ul>
            <li>
              With service providers that help us operate our services (such as hosting, analytics,
              crash reporting, customer support, and advertising partners)
            </li>
            <li>When required by law, regulation, legal process, or government request</li>
            <li>To protect the rights, safety, and security of users, our company, or others</li>
            <li>In connection with a business transfer such as a merger, acquisition, or asset sale</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            We retain information for as long as necessary to provide our services, resolve disputes,
            comply with legal obligations, and enforce our agreements. Retention periods may vary
            depending on the type of information and the purpose for which it was collected.
          </p>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended to knowingly collect personal information from children in
            violation of applicable law. If you believe that a child has provided personal information
            to us inappropriately, please contact us and we will take reasonable steps to review and
            address the issue.
          </p>

          <h2>7. International Data Transfers</h2>
          <p>
            Your information may be processed in countries other than your own. By using our
            services, you understand that your information may be transferred to and processed in
            jurisdictions that may have different data protection laws than your country of residence.
          </p>

          <h2>8. Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, such
            as the right to access, correct, delete, or restrict certain processing. You may also be
            able to control personalized advertising through your device settings or platform
            permissions.
          </p>
          <p>To make a privacy-related request, contact us at the email below.</p>

          <h2>9. Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational measures to help protect
            information under our control. However, no method of transmission or storage is completely
            secure, and we cannot guarantee absolute security.
          </p>

          <h2>10. Third-Party Links and Services</h2>
          <p>
            Our services may contain links to third-party websites or use third-party SDKs and
            services. We are not responsible for the privacy practices of those third parties, and we
            encourage you to review their policies separately.
          </p>

          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will
            update the effective date above. Your continued use of our services after changes become
            effective means you accept the updated Privacy Policy.
          </p>

          <h2>12. Contact Us</h2>
          <p>If you have any questions or requests regarding this Privacy Policy, please contact us at:</p>
          <p>
            Email:{" "}
            <a href={`mailto:${site.emails.privacy}`}>{site.emails.privacy}</a>
            <br />
            Company: {site.legalName}
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
