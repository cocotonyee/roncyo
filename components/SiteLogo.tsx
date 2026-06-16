import Image from "next/image";
import { site } from "@/lib/site";

/** Main site wordmark — `public/logo.png` */
export function SiteLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src={site.logo}
      alt={site.brand}
      width={140}
      height={40}
      className={className}
      priority
    />
  );
}
