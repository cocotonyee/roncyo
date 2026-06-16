import Link from "next/link";
import type { ReactNode } from "react";
import {
  CalendarIcon,
  MailIcon,
  PublisherIcon,
  ShieldIcon,
  TagIcon,
} from "@/components/StoreIcons";
import type { Game } from "@/lib/games";
import type { Publisher } from "@/lib/publishers";
import { site } from "@/lib/site";

function PanelLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <dt className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
      <span className="text-[var(--color-cozy-brown-muted)]">{icon}</span>
      {children}
    </dt>
  );
}

export function PublisherPanel({
  publisher,
  game,
}: {
  publisher: Publisher;
  game?: Game;
}) {
  const brandName = game?.companyName ?? publisher.brandName;
  const legalName = game?.companyLegalName ?? publisher.legalName;
  const description = game?.companyDescription ?? publisher.description;
  const supportEmail = game?.companyEmail ?? publisher.supportEmail;

  return (
    <section className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-5 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-6">
      <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
        <PublisherIcon className="size-4 text-[var(--color-cozy-brown-muted)]" />
        Publisher Information
      </h2>

      <div className="mt-4 flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-[0_4px_16px_rgba(0,43,80,0.08)]"
          style={{ background: publisher.logoColor }}
        >
          {publisher.logoEmoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-cozy-brown)]">
            {brandName}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[var(--color-cozy-brown-muted)]">
            <PublisherIcon className="size-3.5 shrink-0" />
            {legalName} · {publisher.country}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
        {description}
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {publisher.founded ? (
          <div className="rounded-xl bg-[var(--color-cozy-surface)] px-4 py-3">
            <PanelLabel icon={<CalendarIcon />}>Founded</PanelLabel>
            <dd className="mt-1.5 text-sm font-semibold text-[var(--color-cozy-brown)]">
              {publisher.founded}
            </dd>
          </div>
        ) : null}
        <div className="rounded-xl bg-[var(--color-cozy-surface)] px-4 py-3">
          <PanelLabel icon={<MailIcon />}>Support</PanelLabel>
          <dd className="mt-1.5">
            <a
              href={`mailto:${supportEmail}`}
              className="text-sm font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
            >
              {supportEmail}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--color-cozy-brown)]/6 pt-4 text-xs font-semibold">
        <Link href="/about" className="text-[var(--color-cozy-terracotta)] hover:underline">
          About {site.brand}
        </Link>
        <Link href="/press" className="text-[var(--color-cozy-brown-muted)] hover:text-[var(--color-cozy-brown)]">
          Press
        </Link>
        <Link href="/privacy-policy" className="text-[var(--color-cozy-brown-muted)] hover:text-[var(--color-cozy-brown)]">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="text-[var(--color-cozy-brown-muted)] hover:text-[var(--color-cozy-brown)]">
          Terms of Service
        </Link>
        <Link href="/contact" className="text-[var(--color-cozy-brown-muted)] hover:text-[var(--color-cozy-brown)]">
          Contact
        </Link>
      </div>
    </section>
  );
}
