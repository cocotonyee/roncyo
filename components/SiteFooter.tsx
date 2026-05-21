import Link from "next/link";
import { PawIcon } from "@/components/CozyUI";
import { site } from "@/lib/site";

const year = new Date().getFullYear();

const social = [
  { label: "Discord", href: "#", icon: "D" },
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "YouTube", href: "#", icon: "▶" },
  { label: "Instagram", href: "#", icon: "◎" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[var(--color-cozy-sage)] px-5 py-8 sm:px-8 lg:px-[52px]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between min-[768px]:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 font-[family-name:var(--font-display)] text-lg font-black text-[var(--color-cozy-brown)] min-[768px]:justify-start">
            <PawIcon className="size-4 text-[var(--color-cozy-terracotta)]" />
            {site.brand}
          </div>
          <p className="mt-1 text-xs font-medium text-[var(--color-cozy-brown)]/70">
            © {year} {site.brand}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Social" className="flex items-center gap-3">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--color-cozy-brown)]/15 bg-[var(--color-cozy-cream)] text-sm font-bold text-[var(--color-cozy-brown)] transition hover:-translate-y-0.5 hover:border-[var(--color-cozy-brown)]/30"
            >
              {s.icon}
            </a>
          ))}
        </nav>

        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-[var(--color-cozy-brown)]/80 min-[768px]:justify-end">
          <Link href="/privacy-policy" className="transition hover:text-[var(--color-cozy-brown)]">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="transition hover:text-[var(--color-cozy-brown)]">
            Terms of Service
          </Link>
          <Link href="/contact" className="transition hover:text-[var(--color-cozy-brown)]">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
