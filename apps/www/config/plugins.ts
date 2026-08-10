/**
 * Feature flags for Site runtime plugins (written by Site .env, not Hub factory).
 * Blog is not a plugin — it reads seo_documents per contracts/seo-document.v1.json.
 */
export type GoShipPluginId = "stripe" | "auth" | "telemetry";

function parseEnabled(): Set<string> {
  const raw = process.env.PLUGINS_ENABLED ?? "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isPluginEnabled(id: GoShipPluginId): boolean {
  const enabled = parseEnabled();
  if (enabled.size === 0) {
    if (id === "auth") {
      return Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      );
    }
    if (id === "stripe") {
      return Boolean(
        process.env.STRIPE_SECRET_KEY &&
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
    }
    if (id === "telemetry") {
      return Boolean(process.env.GOSHIP_TELEMETRY_KEY);
    }
  }
  return enabled.has(id);
}

export function listEnabledPlugins(): GoShipPluginId[] {
  return (["auth", "stripe", "telemetry"] as const).filter((id) =>
    isPluginEnabled(id),
  );
}
