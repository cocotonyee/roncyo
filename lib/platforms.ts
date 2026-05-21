import type { GamePlatform } from "@/lib/games";

const labels: Record<GamePlatform, string> = {
  ios: "iOS (App Store)",
  android: "Android (Google Play)",
  web: "Web / browser",
  telegram: "Telegram Mini App",
  tiktok: "TikTok",
};

export function platformLabel(p: GamePlatform) {
  return labels[p];
}
