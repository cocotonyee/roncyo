import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${site.brand} websites, apps, and related products.`,
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--color-fg)]">
        Terms of Service
      </h1>
      <p className="mt-6 text-sm text-[var(--color-muted)]">Last updated: {LEGAL_LAST_UPDATED}</p>
      <div className="prose-legal mt-10">
        <p>
          These Terms govern your use of websites, apps, and digital products operated by{" "}
          {site.legalName} (&quot;RONCY,&quot; &quot;we,&quot; &quot;us&quot;). By using our
          services, you agree to these Terms.
        </p>
        <h2>1. Services</h2>
        <p>
          We provide websites, apps, tools, and related digital products. Features may change over
          time. Some products may have their own supplemental terms.
        </p>
        <h2>2. Acceptable use</h2>
        <p>
          You agree not to misuse our services, attempt unauthorized access, interfere with other
          users, or use our products for unlawful purposes.
        </p>
        <h2>3. Intellectual property</h2>
        <p>
          Content, branding, and software associated with {site.brand} and our products remain owned
          by {site.legalName} or our licensors, except where otherwise noted.
        </p>
        <h2>4. Disclaimers</h2>
        <p>
          Services are provided &quot;as is&quot; to the fullest extent permitted by law. We do not
          guarantee uninterrupted or error-free operation.
        </p>
        <h2>5. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {site.legalName} is not liable for indirect,
          incidental, or consequential damages arising from your use of the services.
        </p>
        <h2>6. Contact</h2>
        <p>
          Questions: <a href={`mailto:${site.emails.legal}`}>{site.emails.legal}</a>
        </p>
      </div>
    </section>
  );
}
