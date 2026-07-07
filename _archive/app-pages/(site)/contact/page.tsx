import { ContactForm } from "@/components/automation/ContactForm";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { Section } from "@/components/automation/Section";
import { buildPageMetadata, contactPageJsonLd, SEO_KEYWORDS } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contact — Book a Free Automation Consultation",
  description:
    "Request a free consultation for custom AI automation in Australia or New Zealand. Tell us about your repetitive tasks and we'll map what to automate first.",
  path: "/contact",
  keywords: [
    ...SEO_KEYWORDS,
    "free automation consultation",
    "business automation quote",
    "AI automation consultation Australia",
  ],
});

export default function ContactPage() {
  const schema = contactPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Book a free consultation"
        description="Share the repetitive work slowing your team down. We'll reply within one business day."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={100}>
            <aside className="space-y-6">
              <div className="panel-premium p-5 text-sm">
                <p className="font-semibold text-[var(--color-foreground)]">Email</p>
                <a
                  href={`mailto:${site.emails.hello}`}
                  className="mt-1 block text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                >
                  {site.emails.hello}
                </a>
              </div>
              <div className="panel-premium p-5 text-sm">
                <p className="font-semibold text-[var(--color-foreground)]">Regions served</p>
                <p className="mt-1 text-[var(--color-muted)]">
                  Australia (Sydney, Melbourne, Brisbane, Perth, Adelaide) &amp; New Zealand
                  (Auckland, Wellington, Christchurch)
                </p>
              </div>
              <div className="panel-premium p-5 text-sm">
                <p className="font-semibold text-[var(--color-foreground)]">Typical delivery</p>
                <p className="mt-1 text-[var(--color-muted)]">72 hours from project sign-off</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
