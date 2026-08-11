"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const FAX_TO = "fax@ronfax.com";
const FAX_PDF = "invoice-q3.pdf";

export function RonFaxBrowserDemo() {
  const reduce = useReducedMotion();
  /** 0 idle → 1 typing → 2 uploading → 3 ready → 4 sending → 5 delivered */
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

    const typeStart = 350;
    later(() => setPhase(1), typeStart);

    let i = 0;
    later(() => {
      const typeId = window.setInterval(() => {
        i += 1;
        setEmail(FAX_TO.slice(0, i));
        if (i >= FAX_TO.length) window.clearInterval(typeId);
      }, 48);
      intervals.push(typeId);
    }, typeStart);

    const uploadStart = typeStart + FAX_TO.length * 48 + 400;
    later(() => {
      setPhase(2);
      let pct = 0;
      const upId = window.setInterval(() => {
        pct = Math.min(100, pct + 14);
        setUploadPct(pct);
        if (pct >= 100) window.clearInterval(upId);
      }, 80);
      intervals.push(upId);
    }, uploadStart);

    later(() => setPhase(3), uploadStart + 900);
    later(() => setPhase(4), uploadStart + 1600);
    later(() => setPhase(5), uploadStart + 2800);
    later(() => setCycle((c) => c + 1), uploadStart + 4800);

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

  const status = done
    ? "Delivered"
    : sending
      ? "Sending fax"
      : fileReady
        ? "Ready to send"
        : phase === 2
          ? "Uploading PDF"
          : "Enter recipient";

  return (
    <div className="flex h-full flex-col bg-[#f7f7f8] text-[#0a0a0a]">
      <div className="flex items-center justify-between border-b border-black/6 px-5 py-3">
        <div>
          <p className="text-xs font-medium">New fax</p>
          <p className="text-[11px] text-black/40">
            {email ? `to ${email}` : "Add recipient email"}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
            done
              ? "bg-emerald-50 text-emerald-700"
              : "bg-black/[0.04] text-black/45"
          }`}
        >
          {done ? "Delivered" : "Secure"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[11px] text-black/40">To</p>
          <div className="mt-1.5 flex min-h-[42px] items-center rounded-lg border border-black/10 bg-white px-3 py-2.5 font-mono text-[13px] tracking-tight">
            <span className={email ? "text-black/85" : "text-black/25"}>
              {email || "name@company.com"}
            </span>
            {typing || phase === 0 ? (
              <motion.span
                className="ml-0.5 inline-block h-4 w-[2px] bg-[var(--color-accent)] align-middle"
                animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
              />
            ) : null}
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-dashed border-black/12 bg-white">
          {!hasFile ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
              <span className="flex size-9 items-center justify-center rounded-lg bg-black/[0.04] text-sm text-black/40">
                PDF
              </span>
              <p className="text-[12px] text-black/45">Drop a PDF to fax</p>
            </div>
          ) : (
            <div className="flex h-full flex-col p-3">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-rose-50 text-[10px] font-semibold tracking-wide text-rose-700">
                  PDF
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-black/85">
                    {FAX_PDF}
                  </p>
                  <p className="mt-0.5 text-[11px] text-black/40">
                    {fileReady ? "2 pages · 184 KB" : `Uploading… ${uploadPct}%`}
                  </p>
                  {!fileReady ? (
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/6">
                      <motion.div
                        className="h-full rounded-full bg-[var(--color-accent)]"
                        animate={{ width: `${uploadPct}%` }}
                        transition={{ ease: "linear", duration: 0.08 }}
                      />
                    </div>
                  ) : null}
                </div>
                {fileReady ? (
                  <span className="text-[11px] font-medium text-emerald-700">✓</span>
                ) : null}
              </div>
              <div className="mt-3 flex-1 rounded-md bg-gradient-to-br from-zinc-50 to-emerald-50/80 p-3">
                <div className="h-1.5 w-2/3 rounded bg-black/10" />
                <div className="mt-2 h-1.5 w-full rounded bg-black/6" />
                <div className="mt-2 h-1.5 w-5/6 rounded bg-black/6" />
                <div className="mt-3 h-10 rounded bg-white/70" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-black/40">{status}</p>
          <button
            type="button"
            disabled={!fileReady || sending || done}
            onClick={() => {
              if (!fileReady || sending || done) return;
              setPhase(4);
              window.setTimeout(() => setPhase(5), 1200);
            }}
            className={`rounded-lg px-4 py-2.5 text-[12px] font-medium text-white transition active:scale-[0.98] ${
              done
                ? "bg-emerald-600"
                : fileReady && !sending
                  ? "bg-[#0a0a0a] hover:bg-[var(--color-accent)]"
                  : "cursor-default bg-black/25"
            }`}
          >
            {done ? "Sent ✓" : sending ? "Sending…" : "Send fax"}
          </button>
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
