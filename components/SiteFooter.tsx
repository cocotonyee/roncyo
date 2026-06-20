import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
import { site } from "@/lib/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[var(--color-cozy-sage-dark)] px-5 py-10 sm:px-8 lg:px-[52px]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 min-[768px]:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex">
              <SiteLogo className="h-8 w-auto" />
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {site.tagline}
            </p>
            <p className="mt-3 text-xs text-white/50">
              {site.legalName} · {site.country}
            </p>
          </div>

          <nav aria-label="Store" className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-wide text-white/90 uppercase">
              Store
            </p>
            <Link href="/games" className="text-sm font-medium text-white/65 hover:text-white">
              App Store
            </Link>
            <Link href="/about" className="text-sm font-medium text-white/65 hover:text-white">
              About
            </Link>
            <Link href="/press" className="text-sm font-medium text-white/65 hover:text-white">
              Press
            </Link>
            <Link href="/support" className="text-sm font-medium text-white/65 hover:text-white">
              Support
            </Link>
            <Link href="/contact" className="text-sm font-medium text-white/65 hover:text-white">
              Contact
            </Link>
          </nav>

          <nav aria-label="Legal" className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-wide text-white/90 uppercase">
              Legal
            </p>
            <Link href="/privacy-policy" className="text-sm font-medium text-white/65 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm font-medium text-white/65 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-sm font-medium text-white/65 hover:text-white">
              Cookie Policy
            </Link>
            <Link href="/data-deletion" className="text-sm font-medium text-white/65 hover:text-white">
              Data Deletion
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/50 min-[768px]:text-left">
          © {year} {site.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
