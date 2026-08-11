"use client";

import { CtaButton } from "@/components/CtaButton";
import { DestCardPhoneDemo } from "@/components/product-showcase/DestCardSoulDemo";
import { site } from "@/lib/site";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-[var(--color-bg)] text-[var(--color-fg)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(4,120,87,0.1),transparent_48%),radial-gradient(ellipse_at_12%_88%,rgba(10,10,10,0.04),transparent_40%),linear-gradient(180deg,#f7f7f8_0%,#fafafa_55%,#f4f4f5_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-border)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:px-12 lg:pb-20 lg:pt-24">
        <motion.div
          className="max-w-xl"
          style={reduce ? undefined : { y: contentY }}
        >
          <motion.p
            className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,9vw,7.25rem)] font-semibold leading-[0.88] tracking-tighter text-[var(--color-fg)]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.04 }}
          >
            {site.brand}
            <motion.span
              className="inline-block text-[var(--color-accent)]"
              aria-hidden
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }
              }
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              °
            </motion.span>
          </motion.p>

          <motion.h1
            className="mt-7 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.2vw,2.75rem)] font-semibold leading-[1.12] tracking-tighter text-[var(--color-fg)]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.12 }}
          >
            A studio that builds and ships digital products.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[38ch] text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.2 }}
          >
            Focused tools and apps, launched to market, grown when people keep using them.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.28 }}
          >
            <CtaButton href="/#products" variant="primary">
              Explore products
            </CtaButton>
            <CtaButton href="/about" variant="secondary">
              About the studio
            </CtaButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center lg:justify-end"
          style={reduce ? undefined : { y: stageY }}
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.18 }}
        >
          <div
            className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(4,120,87,0.16),transparent_68%)] blur-2xl"
            aria-hidden
          />
          <div className="relative w-full max-w-[420px]">
            <DestCardPhoneDemo />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
