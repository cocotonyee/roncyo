import { typicalAutomations } from "@/lib/automation";

export function AutomationMarquee() {
  const items = [...typicalAutomations, ...typicalAutomations];

  return (
    <div className="marquee-mask relative overflow-hidden py-2">
      <ul className="marquee-track flex w-max gap-3">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-5 py-2.5 text-sm font-medium text-[var(--color-foreground)] shadow-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
