import { AppLink } from "@/components/AppLink";
import { SiteLogo } from "@/components/SiteLogo";
import { site } from "@/lib/site";

const year = new Date().getFullYear();

const product = [
  { href: "/docs", label: "Documentation" },
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
] as const;

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/data-deletion", label: "Data Deletion" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <AppLink href="/" className="inline-flex">
              <SiteLogo className="site-logo h-8 w-auto" />
            </AppLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              {site.tagline}
            </p>
            <p className="mt-4 text-xs text-[var(--color-muted)]">
              {site.legalName} · {site.country}
            </p>
          </div>

          <nav aria-label="Product" className="flex flex-col gap-2.5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--color-foreground)] uppercase">
              Product
            </p>
            {product.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          <nav aria-label="Legal" className="flex flex-col gap-2.5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--color-foreground)] uppercase">
              Legal
            </p>
            {legal.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)]">
          © {year} {site.legalName}. Open platform for developers.
        </div>
      </div>
    </footer>
  );
}
