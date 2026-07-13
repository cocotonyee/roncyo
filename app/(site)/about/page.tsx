import { AutomationButton } from "@/components/automation/Button";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";
import { howItWorks } from "@/lib/automation";
import { buildPageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About Roncyo — AI Business Automation Studio",
  description:
    "Roncyo helps local businesses in Australia and New Zealand save time through custom AI automation. We eliminate repetitive work without replacing your existing software.",
  path: "/about",
  keywords: [...SEO_KEYWORDS],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We help local businesses save time through automation"
        description={`${site.brand} is an AI Business Automation Studio for service businesses in Australia and New Zealand. We map your repetitive tasks, build custom workflows, and deliver automation that pays for itself in hours saved.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeader title="What we believe" />
              <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
                Business owners don&apos;t care whether we use AI, scripts, or integrations. They care
                whether they can hire one fewer part-timer, leave the office an hour earlier, and
                stop worrying about missed follow-ups.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                Every project starts with a free consultation. We map the workflow, quote a fixed scope,
                and deliver a working automation — usually within 72 hours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <SectionHeader title="How we work" />
              <ol className="mt-6 space-y-4">
                {howItWorks.map((step) => (
                  <li key={step.step} className="panel-premium flex gap-4 p-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-foreground)] text-xs font-semibold text-[var(--color-bg)]">
                      {step.step}
                    </span>
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">{step.title}</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <div className="mt-10">
            <AutomationButton href="/contact">Book a Free Consultation</AutomationButton>
          </div>
        </Reveal>
      </Section>

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
