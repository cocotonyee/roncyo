import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Reserved for future staggered motion; content is always visible for SSR/a11y. */
  delayMs?: number;
};

/** Layout wrapper only — content stays visible without waiting for client JS. */
export function Reveal({ children, className = "" }: Props) {
  return <div className={className}>{children}</div>;
}
