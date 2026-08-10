import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export function AppLink({ className = "", ...props }: Props) {
  return <Link className={className} {...props} />;
}
