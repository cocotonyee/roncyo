"use client";

import { AppLink } from "@/components/AppLink";
import { SiteLogo } from "@/components/SiteLogo";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/labs", label: "Labs" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 56);
  });

  const overHero = isHome && !scrolled && !open;
  const light = overHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <SiteLogo tone={light ? "light" : "default"} />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex list-none items-center gap-7">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <AppLink
                    href={item.href}
                    className={`text-sm tracking-tight transition-colors ${
                      light
                        ? active
                          ? "text-white"
                          : "text-white/65 hover:text-white"
                        : active
                          ? "text-[var(--color-fg)]"
                          : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {item.label}
                  </AppLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <AppLink
            href="/contact"
            className={`hidden rounded-none px-4 py-2 text-sm font-medium transition active:scale-[0.98] sm:inline-flex ${
              light
                ? "bg-white text-[#0a0a0a] hover:bg-[var(--color-accent)] hover:text-white"
                : "bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-[var(--color-accent)]"
            }`}
          >
            Contact
          </AppLink>
          <button
            type="button"
            className={`flex size-10 items-center justify-center border md:hidden ${
              light
                ? "border-white/30 text-white"
                : "border-[var(--color-border)] text-[var(--color-fg)]"
            }`}
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <AppLink
                  href={item.href}
                  className="block py-1 text-base text-[var(--color-fg)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
            <li>
              <AppLink
                href="/contact"
                className="block py-1 text-base text-[var(--color-fg)]"
                onClick={() => setOpen(false)}
              >
                Contact
              </AppLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
