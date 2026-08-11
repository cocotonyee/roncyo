import { withReferral } from "@/lib/outbound";
import type { BlogPost } from "@/lib/blog";

type Offer = {
  id: "destcard" | "ronfax";
  product: string;
  pitch: string;
  cta: string;
  href: string;
};

const OFFERS: Offer[] = [
  {
    id: "destcard",
    product: "DestCard",
    pitch: "Enter your birth date and get a personalized Blueprint PDF.",
    cta: "Get Blueprint PDF",
    href: "https://destcard.com",
  },
  {
    id: "ronfax",
    product: "RonFax",
    pitch: "Send a fax online in minutes — upload, confirm, deliver.",
    cta: "Send a fax",
    href: "https://www.ronfax.com",
  },
];

function rankOffers(post: BlogPost): Offer[] {
  const hay = `${post.slug} ${post.title} ${post.tags.join(" ")} ${post.keywords.join(" ")}`.toLowerCase();
  const score = (id: Offer["id"]) => {
    if (id === "destcard") {
      return /(destcard|destiny|blueprint|matrix)/.test(hay) ? 2 : 0;
    }
    return /(ronfax|fax|document|workflow)/.test(hay) ? 2 : 0;
  };
  return [...OFFERS].sort((a, b) => score(b.id) - score(a.id));
}

export function BlogConvertRail({ post }: { post: BlogPost }) {
  const offers = rankOffers(post);

  return (
    <aside className="hidden xl:block" aria-label="Try Roncyo products">
      <div className="sticky top-24 space-y-4">
        <p className="text-[11px] font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
          Try a product
        </p>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
          >
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-fg)]">
              {offer.product}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {offer.pitch}
            </p>
            <a
              href={withReferral(offer.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center bg-[var(--color-fg)] px-3 py-2.5 text-sm font-medium text-[var(--color-bg)] transition hover:bg-[var(--color-accent)] active:scale-[0.98]"
            >
              {offer.cta}
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}

/** Mobile / tablet floating convert dock — right edge. */
export function BlogConvertFloat({ post }: { post: BlogPost }) {
  const primary = rankOffers(post)[0]!;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4 xl:hidden">
      <div className="pointer-events-auto ml-auto max-w-[280px] border border-[var(--color-border)] bg-[var(--color-bg)]/95 p-3 shadow-[0_12px_40px_rgba(10,10,10,0.14)] backdrop-blur-md">
        <p className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--color-fg)]">
          {primary.product}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
          {primary.pitch}
        </p>
        <a
          href={withReferral(primary.href)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center bg-[var(--color-fg)] px-3 py-2 text-sm font-medium text-[var(--color-bg)] transition hover:bg-[var(--color-accent)]"
        >
          {primary.cta}
        </a>
      </div>
    </div>
  );
}
