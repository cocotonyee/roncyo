import Link from "next/link";
import { AutomationButton } from "@/components/automation/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
        404
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-foreground)]">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-[var(--color-muted)]">
        The page you requested does not exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <AutomationButton href="/">Back home</AutomationButton>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)]"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
