import { withReferral } from "@/lib/outbound";

export function GooglePlayBadge({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <a
      href={withReferral(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition hover:opacity-90 active:scale-[0.98]"
      aria-label={`Get ${title} on Google Play`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/google-play-badge.png"
        alt="Get it on Google Play"
        width={149}
        height={44}
        className="h-11 w-auto"
      />
    </a>
  );
}
