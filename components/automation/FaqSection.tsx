import type { FaqItem } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";

type Props = {
  faqs: FaqItem[];
  title?: string;
  description?: string;
};

export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  description,
}: Props) {
  if (faqs.length === 0) return null;

  const schema = faqJsonLd(faqs);

  return (
    <Section className="bg-[var(--color-surface)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Reveal>
        <SectionHeader title={title} description={description} align="center" />
      </Reveal>
      <dl className="mx-auto mt-10 max-w-3xl space-y-4">
        {faqs.map((faq, i) => (
          <Reveal key={faq.question} delay={i * 60}>
            <div className="panel-premium p-6">
              <dt className="text-base font-semibold text-[var(--color-foreground)]">
                {faq.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {faq.answer}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
