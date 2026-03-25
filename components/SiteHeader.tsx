import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-[200] flex h-[68px] items-center justify-between border-b border-[var(--color-roncy-border)] bg-[rgba(255,255,255,0.88)] px-5 backdrop-blur-[18px] sm:px-8 lg:px-[52px]">
      <Link
        href="/"
        className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[22px] font-black tracking-tight text-[var(--color-roncy-navy)]"
      >
        <span
          className="inline-block size-2.5 shrink-0 rounded-full bg-[var(--color-roncy-yellow)] shadow-[0_0_0_3px_rgba(255,217,61,0.25)]"
          aria-hidden
        />
        {site.brand}
      </Link>
      <nav aria-label="Primary">
        <ul className="hidden list-none items-center gap-8 min-[960px]:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-semibold text-[var(--color-roncy-muted)] transition-colors hover:text-[var(--color-roncy-navy)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link
        href="/contact"
        className="font-[family-name:var(--font-display)] rounded-full bg-[var(--color-roncy-navy)] px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_4px_16px_rgba(15,23,42,0.18)] transition hover:bg-[var(--color-roncy-text)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.22)] min-[960px]:px-6"
      >
        Get in touch
      </Link>
    </header>
  );
}
