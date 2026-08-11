"use client";

import { BrowserFrame } from "@/components/product-showcase/DeviceStage";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const PANELS = [
  {
    id: "launch",
    label: "Launch",
    url: "studio.roncyo.com/launch",
  },
  {
    id: "fax",
    label: "Fax",
    url: "app.ronfax.com/send",
  },
  {
    id: "tools",
    label: "Tools",
    url: "tools.roncyo.com",
  },
] as const;

type PanelId = (typeof PANELS)[number]["id"];

function LaunchPanel({ reduce }: { reduce: boolean | null }) {
  const [checks, setChecks] = useState([true, true, false, false]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setChecks((prev) => {
        const next = [...prev];
        const idx = next.findIndex((v) => !v);
        if (idx === -1) return [true, false, false, false];
        next[idx] = true;
        return next;
      });
    }, 1400);
    return () => window.clearInterval(id);
  }, [reduce]);

  const items = ["Ship landing page", "Wire analytics", "Index sitemap", "First search click"];

  return (
    <div className="flex h-full flex-col justify-between p-5 text-[#0a0a0a]">
      <div>
        <p className="text-[11px] text-black/40">Studio checklist</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
          Ready to launch
        </p>
        <ul className="mt-5 space-y-2.5">
          {items.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() =>
                  setChecks((prev) => {
                    const next = [...prev];
                    next[i] = !next[i];
                    return next;
                  })
                }
                className="flex w-full items-center gap-3 rounded-lg border border-black/8 bg-white px-3 py-2.5 text-left transition hover:border-black/20"
              >
                <span
                  className={`flex size-5 items-center justify-center rounded-md text-[11px] ${
                    checks[i]
                      ? "bg-[var(--color-accent)] text-white"
                      : "border border-black/15 bg-white text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className={`text-sm ${checks[i] ? "text-black/80" : "text-black/45"}`}>
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-[#0a0a0a] px-4 py-3 text-white">
        <span className="text-xs text-white/60">Progress</span>
        <span className="font-[family-name:var(--font-display)] text-sm font-semibold">
          {checks.filter(Boolean).length}/{checks.length}
        </span>
      </div>
    </div>
  );
}

const FAX_TO = "fax@ronfax.com";
const FAX_PDF = "invoice-q3.pdf";

function FaxPanel({ reduce }: { reduce: boolean | null }) {
  const [phase, setPhase] = useState(0);
  const [email, setEmail] = useState("");
  const [uploadPct, setUploadPct] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) {
      setEmail(FAX_TO);
      setUploadPct(100);
      setPhase(5);
      return;
    }

    setEmail("");
    setUploadPct(0);
    setPhase(0);

    const timeouts: number[] = [];
    const intervals: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timeouts.push(window.setTimeout(fn, ms));
    };

    const typeStart = 280;
    later(() => setPhase(1), typeStart);
    later(() => {
      let i = 0;
      const typeId = window.setInterval(() => {
        i += 1;
        setEmail(FAX_TO.slice(0, i));
        if (i >= FAX_TO.length) window.clearInterval(typeId);
      }, 42);
      intervals.push(typeId);
    }, typeStart);

    const uploadStart = typeStart + FAX_TO.length * 42 + 320;
    later(() => {
      setPhase(2);
      let pct = 0;
      const upId = window.setInterval(() => {
        pct = Math.min(100, pct + 16);
        setUploadPct(pct);
        if (pct >= 100) window.clearInterval(upId);
      }, 70);
      intervals.push(upId);
    }, uploadStart);

    later(() => setPhase(3), uploadStart + 750);
    later(() => setPhase(4), uploadStart + 1300);
    later(() => setPhase(5), uploadStart + 2400);
    later(() => setCycle((c) => c + 1), uploadStart + 4000);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
    };
  }, [reduce, cycle]);

  const hasFile = phase >= 2;
  const fileReady = phase >= 3;
  const sending = phase === 4;
  const done = phase >= 5;
  const typing = phase === 1;

  return (
    <div className="flex h-full flex-col gap-3 p-5 text-[#0a0a0a]">
      <div>
        <p className="text-[11px] text-black/40">To</p>
        <div className="mt-1.5 flex min-h-[40px] items-center rounded-lg border border-black/10 bg-white px-3 py-2.5 font-mono text-sm tracking-tight">
          <span className={email ? "text-black/85" : "text-black/25"}>
            {email || "name@company.com"}
          </span>
          {typing || phase === 0 ? (
            <motion.span
              className="ml-0.5 inline-block h-4 w-[2px] bg-[var(--color-accent)] align-middle"
              animate={reduce ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          ) : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-dashed border-black/12 bg-white">
        {!hasFile ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <span className="flex size-8 items-center justify-center rounded-md bg-black/[0.04] text-[11px] text-black/40">
              PDF
            </span>
            <p className="text-[11px] text-black/40">Drop a PDF to fax</p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col p-3">
            <div className="flex items-start gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-rose-50 text-[10px] font-semibold text-rose-700">
                PDF
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium">{FAX_PDF}</p>
                <p className="mt-0.5 text-[11px] text-black/40">
                  {fileReady ? "2 pages · 184 KB" : `Uploading… ${uploadPct}%`}
                </p>
                {!fileReady ? (
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/6">
                    <div
                      className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-75"
                      style={{ width: `${uploadPct}%` }}
                    />
                  </div>
                ) : null}
              </div>
              {fileReady ? (
                <span className="text-[11px] font-medium text-emerald-700">✓</span>
              ) : null}
            </div>
            <div className="mt-3 flex-1 rounded-md bg-gradient-to-br from-emerald-50 to-zinc-100" />
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={!fileReady || sending || done}
        onClick={() => {
          if (!fileReady || sending || done) return;
          setPhase(4);
          window.setTimeout(() => setPhase(5), 1100);
        }}
        className={`rounded-lg px-4 py-3 text-sm font-medium text-white transition active:scale-[0.98] ${
          done
            ? "bg-emerald-600"
            : fileReady && !sending
              ? "bg-[#0a0a0a] hover:bg-[var(--color-accent)]"
              : "cursor-default bg-black/25"
        }`}
      >
        {done ? "Delivered ✓" : sending ? "Sending…" : "Send fax"}
      </button>
    </div>
  );
}

function ToolsPanel({ reduce }: { reduce: boolean | null }) {
  const [enhance, setEnhance] = useState(42);
  const [crop, setCrop] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setEnhance((v) => (v >= 86 ? 28 : v + 14));
      setCrop((c) => !c);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex h-full flex-col gap-4 p-5 text-[#0a0a0a]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-black/40">Image tool</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
            Quick edit
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCrop((c) => !c)}
          className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
            crop ? "bg-emerald-50 text-emerald-700" : "bg-black/5 text-black/45"
          }`}
        >
          Crop {crop ? "on" : "off"}
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-black/8 bg-white">
        <motion.div
          className="absolute inset-6 rounded-lg bg-gradient-to-br from-zinc-200 via-emerald-100 to-zinc-300"
          animate={{
            scale: crop ? 1.08 : 1,
            borderRadius: crop ? 12 : 18,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent p-4 pt-10">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-black/45">Enhance</span>
            <span className="font-medium text-black/80">{enhance}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={enhance}
            onChange={(e) => setEnhance(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-accent)]"
            aria-label="Enhance"
          />
        </div>
      </div>
    </div>
  );
}

export function HeroWebDemo() {
  const reduce = useReducedMotion();
  const [panel, setPanel] = useState<PanelId>("launch");

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setPanel((prev) => {
        const idx = PANELS.findIndex((p) => p.id === prev);
        return PANELS[(idx + 1) % PANELS.length]!.id;
      });
    }, 5200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const active = PANELS.find((p) => p.id === panel) ?? PANELS[0];

  return (
    <BrowserFrame url={active.url}>
      <div className="flex h-full flex-col bg-[#f4f4f5]">
        <div className="flex gap-1 border-b border-black/6 px-3 py-2">
          {PANELS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPanel(item.id)}
              className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition ${
                panel === item.id
                  ? "bg-[#0a0a0a] text-white"
                  : "text-black/45 hover:bg-black/[0.05] hover:text-black/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={panel}
              className="h-full"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {panel === "launch" ? (
                <LaunchPanel reduce={reduce} />
              ) : panel === "fax" ? (
                <FaxPanel reduce={reduce} />
              ) : (
                <ToolsPanel reduce={reduce} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </BrowserFrame>
  );
}
