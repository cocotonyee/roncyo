/** Append `?ref=roncyo` to outbound product URLs for attribution. */
export function withReferral(
  href: string,
  ref = "roncyo",
): string {
  try {
    const url = new URL(href);
    if (!url.searchParams.has("ref")) {
      url.searchParams.set("ref", ref);
    }
    return url.toString();
  } catch {
    return href;
  }
}
