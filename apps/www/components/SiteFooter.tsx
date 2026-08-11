import { AppLink } from "@/components/AppLink";
import { site } from "@/lib/site";

const links = [
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
  { href: "/support", label: "Support" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tighter text-[var(--color-fg)]">
              {site.brand}
              <span className="text-[var(--color-accent)]">°</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
              {site.tagline} Operated by {site.legalName}.
            </p>
          </div>
          <a
            href={`mailto:${site.emails.hello}`}
            className="group inline-flex flex-col gap-1 sm:items-end"
          >
            <span className="text-xs font-medium tracking-[0.16em] text-[var(--color-muted)] uppercase">
              Email
            </span>
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-fg)] underline decoration-[var(--color-border)] underline-offset-4 transition group-hover:text-[var(--color-accent)] group-hover:decoration-[var(--color-accent)] sm:text-2xl">
              {site.emails.hello}
            </span>
          </a>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((item) => (
              <li key={item.href}>
                <AppLink
                  href={item.href}
                  className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-fg)]"
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
