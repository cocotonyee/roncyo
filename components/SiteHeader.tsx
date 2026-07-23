"use client";

import { AppLink } from "@/components/AppLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-[200] border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <AppLink href="/" className="flex shrink-0 items-center">
          <SiteLogo className="site-logo h-8 w-auto" />
        </AppLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex list-none items-center gap-8">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <AppLink
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      active
                        ? "text-[var(--color-foreground)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
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
            className="hidden rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[13px] font-semibold text-black transition hover:bg-[var(--color-accent-hover)] sm:inline-flex"
          >
            Start a project
          </AppLink>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <nav aria-label="Mobile" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] pb-4 md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <AppLink
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-surface)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
            <li>
              <AppLink
                href="/contact"
                className="mt-2 block rounded-xl bg-[var(--color-accent)] px-3 py-2.5 text-center text-sm font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                Start a project
              </AppLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
