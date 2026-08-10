"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[min(100%,280px)]">
      <div className="relative overflow-hidden rounded-[2.15rem] border border-black/20 bg-[#0a0a0a] p-[10px] shadow-[0_40px_90px_rgba(0,0,0,0.32)]">
        <div className="pointer-events-none absolute top-[10px] left-1/2 z-10 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        <div className="pointer-events-none absolute top-[18%] -left-[1px] h-10 w-[3px] rounded-r-sm bg-[#2a2a2e]" />
        <div className="pointer-events-none absolute top-[28%] -left-[1px] h-14 w-[3px] rounded-r-sm bg-[#2a2a2e]" />
        <div className="pointer-events-none absolute top-[28%] -right-[1px] h-20 w-[3px] rounded-l-sm bg-[#2a2a2e]" />
        <div className="relative aspect-[9/19.2] overflow-hidden rounded-[1.7rem] bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}

export function BrowserFrame({
  children,
  url = "app.roncyo.com",
}: {
  children: ReactNode;
  url?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_36px_80px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-2 border-b border-black/6 bg-[#f0f0f2] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1.5 text-[11px] text-black/40">
            {url}
          </div>
        </div>
        <div className="aspect-[16/11] bg-[#fafafa]">{children}</div>
      </div>
    </div>
  );
}

export function DeviceStage({
  device,
  demoKey,
  url,
  children,
}: {
  device: "phone" | "browser" | "card";
  demoKey: string;
  url?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full min-h-[420px] items-center justify-center px-4 py-10 sm:px-8 lg:min-h-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_42%,rgba(4,120,87,0.14),transparent_52%),linear-gradient(180deg,transparent,rgba(255,255,255,0.35))]" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={demoKey}
          initial={reduce ? false : { opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          {device === "phone" ? (
            <PhoneFrame>{children}</PhoneFrame>
          ) : device === "browser" ? (
            <BrowserFrame url={url}>{children}</BrowserFrame>
          ) : (
            children
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
