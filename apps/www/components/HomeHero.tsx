"use client";

import { CtaButton } from "@/components/CtaButton";
import { site } from "@/lib/site";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
      >
        <Image
          src="/images/hero-studio.jpg"
          alt="Quiet studio workspace with soft window light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[42%_center]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,8,0.82)_0%,rgba(6,6,8,0.55)_42%,rgba(6,6,8,0.18)_68%,rgba(6,6,8,0.35)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,8,0.45)_0%,transparent_28%,transparent_62%,rgba(6,6,8,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_70%,rgba(4,120,87,0.16),transparent_42%)]" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:px-12 lg:pb-24 lg:pt-24"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="w-full max-w-2xl">
          <motion.p
            className="font-[family-name:var(--font-display)] text-[clamp(3.75rem,10vw,8rem)] font-semibold leading-[0.9] tracking-tighter text-white"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.05 }}
          >
            {site.brand}
            <motion.span
              className="inline-block text-[var(--color-accent)]"
              aria-hidden
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: [0.55, 1, 0.55],
                      scale: [1, 1.08, 1],
                    }
              }
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              °
            </motion.span>
          </motion.p>

          <motion.h1
            className="mt-8 max-w-[18ch] pb-1 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.6vw,3.15rem)] font-semibold leading-[1.12] tracking-tighter text-white/95"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.14 }}
          >
            A studio that builds and ships digital products.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[40ch] text-base leading-relaxed text-white/62 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.22 }}
          >
            We design focused tools and apps, launch them to market, and grow the ones people keep using.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
          >
            <CtaButton href="/#products" variant="inverse">
              Explore products
            </CtaButton>
            <a
              href="/about"
              className="inline-flex items-center justify-center border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium tracking-tight text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10 active:scale-[0.98]"
            >
              About the studio
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
