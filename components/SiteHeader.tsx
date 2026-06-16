"use client";

import Link from "next/link";
import { useState } from "react";
import { CozyButton } from "@/components/CozyUI";
import { SiteLogo } from "@/components/SiteLogo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/games", label: "App Store" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-[200] border-b border-white/10 bg-[var(--color-cozy-sage)] px-5 sm:px-8 lg:px-[52px]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          <SiteLogo className="h-9 w-auto min-[640px]:h-10" />
        </Link>

        <nav aria-label="Primary" className="hidden min-[960px]:block">
          <ul className="flex list-none items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CozyButton href="/games" className="hidden !px-5 !py-2.5 text-[13px] min-[640px]:inline-flex">
            Browse Apps
          </CozyButton>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-white min-[960px]:hidden"
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
          className="border-t border-white/10 pb-4 min-[960px]:hidden"
        >
          <ul className="flex flex-col gap-1 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/games"
                className="mt-2 block rounded-full bg-[var(--color-cozy-terracotta)] px-4 py-3 text-center text-sm font-extrabold text-white"
                onClick={() => setOpen(false)}
              >
                Browse Apps
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
