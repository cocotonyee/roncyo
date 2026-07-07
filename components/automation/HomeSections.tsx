import { AutomationButton } from "@/components/automation/Button";
import { AutomationFlowVisual } from "@/components/automation/AutomationFlowVisual";
import { automation } from "@/lib/automation";

export function HomeHero() {
  return (
    <section className="hero-dark relative overflow-hidden px-5 pt-16 pb-20 sm:px-8 lg:px-12 lg:pt-20 lg:pb-28">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-glow pointer-events-none absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full" aria-hidden />
      <div className="hero-glow-accent pointer-events-none absolute top-1/2 right-0 size-[400px] -translate-y-1/2 translate-x-1/3 rounded-full" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="hero-enter">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/70">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-soft" />
            AI Business Automation Studio
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.08] font-semibold tracking-tight text-white">
            {automation.headline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            {automation.subheadline}
          </p>
          <div className="hero-enter-delay mt-10">
            <AutomationButton href="/contact" variant="primary">
              {automation.ctas.primary}
            </AutomationButton>
          </div>
        </div>

        <div className="hero-enter-visual lg:pl-4">
          <AutomationFlowVisual />
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Let's automate your business.",
  description = "Book a free consultation — we'll map your repetitive tasks and show you what to automate first.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta-band relative overflow-hidden border-t border-[var(--color-border)] px-5 py-24 sm:px-8 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(3,216,203,0.25), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/60">{description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <AutomationButton href="/contact" className="!bg-white !text-black hover:!bg-white/90">
            Book a Free Consultation
          </AutomationButton>
        </div>
      </div>
    </section>
  );
}
