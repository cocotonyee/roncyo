import { AppLink } from "@/components/AppLink";
import { SiteLogo } from "@/components/SiteLogo";
import { site } from "@/lib/site";

const year = new Date().getFullYear();

const company = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const resources = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/locations", label: "Locations" },
  { href: "/llms.txt", label: "AI Site Info" },
] as const;

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/data-deletion", label: "Data Deletion" },
  { href: "/support", label: "Support" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
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

          <nav aria-label="Company" className="flex flex-col gap-2.5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--color-foreground)] uppercase">
              Company
            </p>
            {company.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          <nav aria-label="Resources" className="flex flex-col gap-2.5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--color-foreground)] uppercase">
              Resources
            </p>
            {resources.map((item) => (
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
          © {year} {site.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
