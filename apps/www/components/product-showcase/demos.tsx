"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function RonFaxBrowserDemo() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % 4), 1800);
    return () => window.clearInterval(id);
  }, [reduce]);

  const progress = step === 0 ? 8 : step === 1 ? 42 : step === 2 ? 78 : 100;
  const status =
    step < 3 ? (step === 0 ? "Preparing document" : "Sending fax") : "Delivered";

  return (
    <div className="flex h-full flex-col bg-[#f7f7f8] text-[#0a0a0a]">
      <div className="flex items-center justify-between border-b border-black/6 px-5 py-3">
        <div>
          <p className="text-xs font-medium">New fax</p>
          <p className="text-[11px] text-black/40">to +1 (415) 555-0192</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
          Secure
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[0.9fr_1.1fr] gap-4 p-4">
        <div className="relative overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/[0.03] to-transparent" />
          <div className="space-y-2 p-4 pt-6">
            <div className="h-2 w-3/4 rounded bg-black/10" />
            <div className="h-2 w-full rounded bg-black/6" />
            <div className="h-2 w-5/6 rounded bg-black/6" />
            <div className="mt-4 h-20 rounded bg-gradient-to-br from-emerald-50 to-zinc-100" />
            <div className="h-2 w-2/3 rounded bg-black/6" />
            <div className="h-2 w-4/5 rounded bg-black/5" />
          </div>
          <motion.div
            className="absolute inset-x-3 bottom-3 rounded-md bg-[#0a0a0a] px-3 py-2 text-[10px] text-white"
            animate={{ opacity: step === 3 ? 1 : 0.85, y: step === 3 ? 0 : 4 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            tax-form-2026.pdf · 2 pages
          </motion.div>
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-black/8 bg-white p-4 shadow-sm">
          <div>
            <p className="text-[11px] text-black/40">Status</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
              {status}
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/6">
              <motion.div
                className="h-full rounded-full bg-emerald-600"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {["Upload", "Confirm number", "Transmit", "Receipt"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 text-[11px]">
                <span
                  className={`flex size-4 items-center justify-center rounded-full text-[9px] font-medium ${
                    i < step
                      ? "bg-emerald-600 text-white"
                      : i === step
                        ? "bg-emerald-600 text-white"
                        : "bg-black/6 text-black/35"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={i <= step ? "text-black/80" : "text-black/35"}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PictureKitBrowserDemo() {
  const reduce = useReducedMotion();
  const [tool, setTool] = useState(0);
  const tools = ["Crop", "Enhance", "Export"];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTool((t) => (t + 1) % tools.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce, tools.length]);

  return (
    <div className="flex h-full flex-col bg-[#f7f7f8] text-[#0a0a0a]">
      <div className="flex items-center gap-2 border-b border-black/6 px-4 py-3">
        {tools.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setTool(i)}
            className={`rounded-md px-3 py-1.5 text-[11px] transition ${
              tool === i
                ? "bg-[var(--color-fg)] text-white"
                : "bg-black/[0.04] text-black/50 hover:bg-black/[0.07] hover:text-black/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative flex flex-1 items-center justify-center p-5">
        <div className="relative aspect-[4/3] w-full max-w-[280px] overflow-hidden rounded-xl border border-black/8 bg-white shadow-sm">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(4,120,87,0.18),transparent_48%),linear-gradient(145deg,#e8f5ef,#f4f4f5_55%,#ece7df)]"
            animate={{
              scale: tool === 1 ? 1.06 : 1,
              filter: tool === 1 ? "saturate(1.2) contrast(1.05)" : "none",
            }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          />
          <motion.div
            className="absolute border-2 border-emerald-600/80"
            animate={
              tool === 0
                ? { top: "12%", right: "14%", bottom: "12%", left: "14%", opacity: 1 }
                : {
                    top: "4%",
                    right: "4%",
                    bottom: "4%",
                    left: "4%",
                    opacity: tool === 2 ? 0 : 0.3,
                  }
            }
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          />
          {tool === 2 ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-x-4 bottom-4 rounded-lg bg-[var(--color-fg)] px-3 py-2 text-center text-[11px] font-medium text-white"
            >
              Ready · PNG 1420×1065
            </motion.div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-black/6 px-4 py-3">
        <div className="flex items-center justify-between text-[11px] text-black/40">
          <span>Canvas</span>
          <span>{tools[tool]}</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/6">
          <motion.div
            className="h-full bg-emerald-600"
            animate={{ width: `${((tool + 1) / tools.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
}
