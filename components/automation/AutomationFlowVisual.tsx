"use client";

const row1 = [
  { label: "Inbox", col: 1 },
  { label: "CRM", col: 2 },
  { label: "Sheets", col: 3 },
] as const;

const row2 = [
  { label: "Invoice", col: 1 },
  { label: "Notify", col: 2 },
  { label: "Done", col: 3 },
] as const;

function FlowNode({ label, delay }: { label: string; delay: number }) {
  return (
    <div
      className="flow-node flex justify-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex h-11 w-full max-w-[88px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[11px] font-semibold text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md sm:text-xs">
        {label}
      </div>
    </div>
  );
}

export function AutomationFlowVisual() {
  return (
    <div className="flow-panel relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_80px_rgba(3,216,203,0.08)] backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-[var(--color-accent)]/80" />
        </div>
        <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">
          Live workflow
        </span>
      </div>

      <div className="relative mt-5">
        <svg
          className="pointer-events-none absolute inset-0 z-0 size-full"
          viewBox="0 0 300 160"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <path
            d="M 50 36 L 150 36 L 250 36 M 150 36 L 150 88 M 50 124 L 150 124 L 250 124 M 150 88 L 50 124 M 150 88 L 250 124"
            fill="none"
            stroke="url(#flow-gradient)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
            className="flow-line"
          />
          <defs>
            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(3,216,203,0.25)" />
              <stop offset="50%" stopColor="rgba(3,216,203,0.9)" />
              <stop offset="100%" stopColor="rgba(3,216,203,0.35)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 grid grid-cols-3 gap-x-3 gap-y-10 px-1 py-4 sm:gap-x-4 sm:px-2">
          {row1.map((node, i) => (
            <FlowNode key={node.label} label={node.label} delay={i * 0.35} />
          ))}
          {row2.map((node, i) => (
            <FlowNode key={node.label} label={node.label} delay={1.2 + i * 0.35} />
          ))}
        </div>
      </div>

      <div className="mt-2 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-3">
        <p className="text-[10px] font-semibold tracking-wide text-[var(--color-accent)] uppercase sm:text-xs">
          Running
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">
          Quote follow-up sent · Invoice filed · Team notified
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        {[
          { label: "Hours saved", value: "12h" },
          { label: "Tasks / week", value: "48" },
          { label: "Errors", value: "0" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/5 px-2 py-2.5 text-center">
            <p className="text-base font-semibold text-white">{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-white/45">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
