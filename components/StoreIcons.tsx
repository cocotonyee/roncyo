import type { ReactNode } from "react";
import type { GamePlatform } from "@/lib/games";
import { platformLabel } from "@/lib/platforms";

type IconProps = { className?: string };

function IconBase({
  className = "size-4",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function PlatformIcon({ platform, className = "size-4" }: { platform: GamePlatform; className?: string }) {
  switch (platform) {
    case "android":
      return (
        <IconBase className={className}>
          <path d="M8 4l-1 2M16 4l1 2M7 10h10M6 10v7a2 2 0 002 2h8a2 2 0 002-2v-7" />
          <circle cx="9.5" cy="7" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="7" r="0.75" fill="currentColor" stroke="none" />
        </IconBase>
      );
    case "ios":
      return (
        <IconBase className={className}>
          <path d="M16.5 12.5c0 2.5-2 4.5-4.5 4.5S7.5 15 7.5 12.5 9.5 8 12 8s4.5 2 4.5 4.5z" />
          <path d="M12 4c.5-1.5 1.5-2.5 3-3" />
        </IconBase>
      );
    case "web":
      return (
        <IconBase className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9" />
        </IconBase>
      );
    case "telegram":
      return (
        <IconBase className={className}>
          <path d="M21 4L4 11l6 2 2 6 3-7 7-8z" />
          <path d="M10 13l3 3" />
        </IconBase>
      );
    case "tiktok":
      return (
        <IconBase className={className}>
          <path d="M15 5c.5 2 2 3.5 4 4v3c-2.5 0-4.5-.8-6-2.5V16a5 5 0 11-4-4.9" />
        </IconBase>
      );
  }
}

export function PublisherIcon({ className = "size-4" }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-6h6v6" />
      <path d="M9 10h6" />
    </IconBase>
  );
}

export function StarIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.9H22l-5.8 4.3 2.2 7.1L12 17.8 5.6 20.3l2.2-7.1L2 8.9h7.1z" />
    </svg>
  );
}

export function TagIcon({ className = "size-3.5" }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M20 12l-8 8-8-8V4h8l8 8z" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function ShieldIcon({ className = "size-3.5" }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </IconBase>
  );
}

export function VersionIcon({ className = "size-3.5" }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 8v8M8 12h8" />
      <circle cx="12" cy="12" r="9" />
    </IconBase>
  );
}

export function MailIcon({ className = "size-3.5" }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </IconBase>
  );
}

export function CalendarIcon({ className = "size-3.5" }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </IconBase>
  );
}

export function MetaDot() {
  return (
    <span className="text-[var(--color-cozy-brown-muted)]/40" aria-hidden>
      ·
    </span>
  );
}

export function PlatformIconRow({ platforms }: { platforms: GamePlatform[] }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {platforms.map((p) => (
        <span
          key={p}
          title={platformLabel(p)}
          className="inline-flex size-7 items-center justify-center rounded-md bg-[var(--color-cozy-surface)] text-[var(--color-cozy-brown-muted)]"
        >
          <PlatformIcon platform={p} className="size-4" />
        </span>
      ))}
    </span>
  );
}

export function MetaItem({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-cozy-brown-muted)]">
      <span className="text-[var(--color-cozy-brown-muted)]">{icon}</span>
      {children}
    </span>
  );
}
