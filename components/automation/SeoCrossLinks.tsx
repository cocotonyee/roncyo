import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import type { IndustryPage } from "@/lib/industries";
import type { ServicePage } from "@/lib/services";

type Props = {
  industries?: IndustryPage[];
  services?: ServicePage[];
  caseStudies?: CaseStudy[];
};

export function SeoCrossLinks({ industries, services, caseStudies }: Props) {
  const hasLinks =
    (industries?.length ?? 0) > 0 ||
    (services?.length ?? 0) > 0 ||
    (caseStudies?.length ?? 0) > 0;

  if (!hasLinks) return null;

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {industries && industries.length > 0 ? (
        <nav aria-label="Related industries">
          <p className="text-xs font-semibold tracking-[0.12em] text-[var(--color-foreground)] uppercase">
            Related industries
          </p>
          <ul className="mt-3 space-y-2">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
                >
                  {industry.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {services && services.length > 0 ? (
        <nav aria-label="Related services">
          <p className="text-xs font-semibold tracking-[0.12em] text-[var(--color-foreground)] uppercase">
            Related services
          </p>
          <ul className="mt-3 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {caseStudies && caseStudies.length > 0 ? (
        <nav aria-label="Related case studies">
          <p className="text-xs font-semibold tracking-[0.12em] text-[var(--color-foreground)] uppercase">
            Case studies
          </p>
          <ul className="mt-3 space-y-2">
            {caseStudies.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
                >
                  {study.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
