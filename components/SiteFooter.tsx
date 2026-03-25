import Link from "next/link";
import { site } from "@/lib/site";

const year = new Date().getFullYear();

const links = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
  { href: "/data-deletion", label: "Data deletion" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[var(--color-roncy-navy)] px-5 py-6 sm:px-8 lg:px-[52px]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between min-[640px]:text-left">
        <div className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-black text-white">
          <span
            className="inline-block size-2.5 shrink-0 rounded-full bg-[var(--color-roncy-yellow)] shadow-[0_0_0_3px_rgba(255,217,61,0.25)]"
            aria-hidden
          />
          {site.brand}
        </div>
        <nav aria-label="Legal and support" className="flex flex-wrap justify-center gap-x-5 gap-y-2 min-[640px]:justify-end">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-semibold text-white/45 transition hover:text-white/90"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs font-medium whitespace-nowrap text-white/30">
          © {year} {site.brand} · {site.domain}
        </p>
      </div>
    </footer>
  );
}
