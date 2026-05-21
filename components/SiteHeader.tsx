"use client";

import Link from "next/link";
import { useState } from "react";
import { CozyButton, PawIcon } from "@/components/CozyUI";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About Us" },
  { href: "/press", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-[200] border-b border-[var(--color-cozy-brown)]/10 bg-[rgba(255,249,240,0.92)] px-5 backdrop-blur-[18px] sm:px-8 lg:px-[52px]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-[family-name:var(--font-display)] text-[22px] font-black tracking-tight text-[var(--color-cozy-brown)]"
        >
          <PawIcon className="size-5 text-[var(--color-cozy-terracotta)]" />
          {site.brand}
        </Link>

        <nav aria-label="Primary" className="hidden min-[960px]:block">
          <ul className="flex list-none items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-[var(--color-cozy-brown-muted)] transition-colors hover:text-[var(--color-cozy-brown)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CozyButton href="/contact" className="hidden !px-5 !py-2.5 text-[13px] min-[640px]:inline-flex">
            <span aria-hidden>🐾</span>
            Join Us
          </CozyButton>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--color-cozy-brown)]/15 bg-white text-[var(--color-cozy-brown)] min-[960px]:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-[var(--color-cozy-brown)]/10 pb-4 min-[960px]:hidden"
        >
          <ul className="flex flex-col gap-1 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--color-cozy-brown)] hover:bg-[var(--color-cozy-card)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="mt-2 block rounded-full bg-[var(--color-cozy-terracotta)] px-4 py-3 text-center text-sm font-extrabold text-white"
                onClick={() => setOpen(false)}
              >
                Join Us
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
