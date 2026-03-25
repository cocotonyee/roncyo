import type { Metadata } from "next";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press",
  description: `Press and media contact for ${site.brand}.`,
};

export default function PressPage() {
  return (
    <InnerPage glow="mist">
      <PageIntro
        eyebrow="Media"
        title="Press & media"
        lead="Review keys, fact sheets, and interview requests — we read serious press notes."
        tone="muted"
      />
      <ContentPanel>
        <Prose contained={false}>
          <p>
            {site.brand} is an independent studio publishing {site.tagline}. For review keys, fact
            sheets, or interview requests, email{" "}
            <a href={`mailto:${site.emails.hello}`}>{site.emails.hello}</a> with &quot;Press&quot; in
            the subject line.
          </p>
          <h2>Brand usage</h2>
          <p>
            Please do not modify our logos or game marks. Request official assets by email; we will
            send approved artwork where available.
          </p>
          <h2>Company facts</h2>
          <ul>
            <li>Legal name: {site.legalName}</li>
            <li>Jurisdiction: {site.country}</li>
            <li>Public website: {site.domain}</li>
          </ul>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
