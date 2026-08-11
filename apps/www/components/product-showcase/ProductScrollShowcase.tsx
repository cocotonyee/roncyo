"use client";

import { AppLink } from "@/components/AppLink";
import { CtaButton } from "@/components/CtaButton";
import {
  PictureKitBrowserDemo,
  RonFaxBrowserDemo,
} from "@/components/product-showcase/demos";
import { DestCardPhoneDemo } from "@/components/product-showcase/DestCardSoulDemo";
import { DeviceStage } from "@/components/product-showcase/DeviceStage";
import type { Product } from "@/lib/products";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useMemo, useRef, useState, type ReactNode } from "react";

type DeviceKind = "phone" | "browser" | "card";

type ShowcaseItem = {
  product: Product;
  device: DeviceKind;
  detail: string;
  url?: string;
  demo: ReactNode;
};

const statusLabel: Record<Product["status"], string> = {
  live: "Live",
  lab: "Lab",
  soon: "Soon",
};

function buildItems(products: Product[]): ShowcaseItem[] {
  return products.map((product) => {
    if (product.slug === "destcard") {
      return {
        product,
        device: "card",
        detail: "Birth data becomes a visual reading you can revisit.",
        demo: <DestCardPhoneDemo />,
      };
    }
    if (product.slug === "ronfax") {
      return {
        product,
        device: "browser",
        url: "app.ronfax.com/send",
        detail: "Upload, confirm, and watch delivery complete in one pass.",
        demo: <RonFaxBrowserDemo />,
      };
    }
    return {
      product,
      device: "browser",
      url: "picturekit.roncyo.com",
      detail: "Crop, enhance, and export without leaving the canvas.",
      demo: <PictureKitBrowserDemo />,
    };
  });
}

export function ProductScrollShowcase({ products }: { products: Product[] }) {
  const items = useMemo(() => buildItems(products), [products]);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (items.length === 0) return;
    // Bias slightly ahead so the switch feels on-beat with scroll, not late.
    const next = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(value * items.length + 0.08)),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  if (items.length === 0) return null;

  const current = items[active]!;
  const exploreHref = current.product.href ?? `/products/${current.product.slug}`;
  const external = Boolean(current.product.href);

  return (
    <section id="products" ref={containerRef} className="relative">
      {/* Mobile: stacked, no pin */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-4xl">
            Work that ships.
          </h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-[var(--color-muted)]">
            Shipped products from the Roncyo studio.
          </p>
        </div>
        <ul className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {items.map((item) => {
            const href = item.product.href ?? `/products/${item.product.slug}`;
            const isExternal = Boolean(item.product.href);
            return (
              <li key={item.product.slug} className="px-5 py-12 sm:px-8">
                <p className="text-sm text-[var(--color-muted)]">
                  {item.product.category} / {statusLabel[item.product.status]}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)]">
                  {item.product.name}
                </h3>
                <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-[var(--color-muted)]">
                  {item.product.tagline}
                </p>
                <div className="mt-8">
                  <DeviceStage
                    device={item.device}
                    demoKey={item.product.slug}
                    url={item.url}
                  >
                    {item.demo}
                  </DeviceStage>
                </div>
                <div className="mt-6">
                  <CtaButton href={href} external={isExternal}>
                    Explore {item.product.name}
                  </CtaButton>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop: sticky scroll product refresh + device stage */}
      <div
        className="relative hidden lg:block"
        style={{ height: `${items.length * 85}vh` }}
      >
        <div className="sticky top-16 h-[calc(100dvh-4rem)] overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-[0.92fr_1.08fr]">
            <div className="relative flex flex-col justify-center border-r border-[var(--color-border)] bg-[var(--color-bg)] px-12 py-16">
              <div className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)] xl:text-4xl">
                  Work that ships.
                </h2>
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-[var(--color-muted)]">
                  Shipped products from the Roncyo studio.
                </p>
              </div>

              <div className="relative min-h-[220px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.product.slug}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-sm text-[var(--color-muted)]">
                      {current.product.category} / {statusLabel[current.product.status]}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tighter text-[var(--color-fg)] xl:text-6xl">
                      {current.product.name}
                    </h3>
                    <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-[var(--color-muted)]">
                      {current.product.tagline}
                    </p>
                    <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-[var(--color-muted)]">
                      {current.detail}
                    </p>
                    <div className="mt-8">
                      <CtaButton href={exploreHref} external={external}>
                        Explore {current.product.name}
                      </CtaButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 flex items-center gap-2.5" aria-hidden>
                {items.map((item, i) => (
                  <span
                    key={item.product.slug}
                    className={`h-1 rounded-full transition-all duration-200 ${
                      i === active
                        ? "w-10 bg-[var(--color-accent)]"
                        : "w-3 bg-[var(--color-border)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative bg-[var(--color-surface)]">
              <DeviceStage
                device={current.device}
                demoKey={current.product.slug}
                url={current.url}
              >
                {current.demo}
              </DeviceStage>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[1400px] px-12 py-10 lg:block">
        <AppLink
          href="/products"
          className="text-sm font-medium text-[var(--color-fg)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
        >
          Open catalog
        </AppLink>
      </div>
      <div className="px-5 py-8 lg:hidden sm:px-8">
        <AppLink
          href="/products"
          className="text-sm font-medium text-[var(--color-fg)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
        >
          Open catalog
        </AppLink>
      </div>
    </section>
  );
}
