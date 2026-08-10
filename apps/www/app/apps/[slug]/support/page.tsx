import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getStoreAppBySlug, getStoreSlugs } from "@/lib/store";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getStoreSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getStoreAppBySlug(slug);
  if (!app) return { title: "Support" };
  return buildPageMetadata({
    title: `${app.title} Support`,
    description: `Support and contact for ${app.title} on ${site.brand}.`,
    path: `/apps/${slug}/support`,
    noIndex: true,
  });
}

export default async function AppSupportPage({ params }: Props) {
  const { slug } = await params;
  const app = getStoreAppBySlug(slug);
  if (!app) notFound();

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
        App support
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--color-fg)]">
        Support — {app.title}
      </h1>
      <p className="mt-4 text-base text-[var(--color-muted)]">
        Help for this product. Include device model and OS version in bug reports.
      </p>

      <div className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6">
        <p className="text-sm font-medium text-[var(--color-muted)]">Email</p>
        <a
          href={`mailto:${site.emails.support}`}
          className="mt-2 inline-block font-[family-name:var(--font-display)] text-2xl text-[var(--color-fg)] hover:text-[var(--color-accent)]"
        >
          {site.emails.support}
        </a>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          <strong className="text-[var(--color-fg)]">Response time:</strong> 2–3 business days
        </p>
      </div>

      <div className="prose-legal mt-10">
        <h2 className="!mt-0">Frequently asked questions</h2>
        <h3>The app crashes on startup. What should I do?</h3>
        <p>
          Force-quit and restart your device. If it continues, reinstall. If the problem persists,
          email us with your device and OS version.
        </p>
        <h3>I lost my progress. Can it be restored?</h3>
        <p>{app.progressNote}</p>
        <h3>How do I request a refund?</h3>
        <p>
          Purchases through Apple are managed by Apple; purchases through Google are managed by
          Google. For other channels, contact us with your receipt details.
        </p>
        <h3>How do I delete my data?</h3>
        <p>
          Uninstalling the app removes local data on most devices. For other requests, email{" "}
          {site.emails.privacy}. See also our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
}
