import { AppLink } from "@/components/AppLink";
import { site } from "@/lib/site";

export function SiteLogo({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "light";
}) {
  const color =
    tone === "light"
      ? "text-white"
      : "text-[var(--color-fg)]";

  return (
    <AppLink
      href="/"
      className={`font-[family-name:var(--font-display)] text-xl font-semibold tracking-tighter transition hover:opacity-80 ${color} ${className}`}
      aria-label={`${site.brand} home`}
    >
      {site.brand}
      <span className="text-[var(--color-accent)]" aria-hidden>
        °
      </span>
    </AppLink>
  );
}
