import Script from "next/script";
import { ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC } from "@/lib/adsense";

export function AdSenseScript() {
  return (
    <Script
      id="adsense-script"
      async
      src={ADSENSE_SCRIPT_SRC}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      data-ad-client={ADSENSE_CLIENT}
    />
  );
}
