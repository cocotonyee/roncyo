import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hostedPlaySlugs, playBasePath, playIndexUrl } from "@/lib/play-hosting";

/** First path segment under /play/ that is a game asset root (not a game slug). */
const ASSET_ROOT_PREFIXES = ["src", "assets", "cocos-js", "chunks"] as const;

function slugFromReferer(referer: string | null): string | null {
  if (!referer) return null;
  try {
    const { pathname } = new URL(referer);
    const fromGames = pathname.match(/^\/games\/([^/]+)/);
    if (fromGames && hostedPlaySlugs.includes(fromGames[1])) return fromGames[1];
    const fromPlay = pathname.match(/^\/play\/([^/]+)/);
    if (fromPlay && hostedPlaySlugs.includes(fromPlay[1])) return fromPlay[1];
  } catch {
    /* ignore invalid referer */
  }
  return null;
}

/** Cocos / Godot builds often request /play/... instead of /play/[slug]/... */
function isMisplacedPlayAsset(pathAfterPlay: string): boolean {
  const first = pathAfterPlay.split("/")[0] ?? "";
  if (!first || hostedPlaySlugs.includes(first)) return false;
  if (ASSET_ROOT_PREFIXES.includes(first as (typeof ASSET_ROOT_PREFIXES)[number])) return true;
  if (/^style\.[a-f0-9]+\.css$/i.test(first)) return true;
  if (/^index\.[a-f0-9]+\.js$/i.test(first)) return true;
  if (/^application\.[a-f0-9]+\.js$/i.test(first)) return true;
  if (/\.(wasm|pck|js|worklet\.js)$/i.test(first)) return true;
  if (first.endsWith(".png") || first.endsWith(".css")) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/play")) return NextResponse.next();

  /* /play/mochi-cats or /play/mochi-cats/ → index.html (Next has no directory index for public/) */
  const gameRoot = pathname.match(/^\/play\/([^/]+)\/?$/);
  if (gameRoot && hostedPlaySlugs.includes(gameRoot[1])) {
    const url = request.nextUrl.clone();
    url.pathname = playIndexUrl(gameRoot[1]);
    return NextResponse.rewrite(url);
  }

  if (!pathname.startsWith("/play/")) return NextResponse.next();

  const rest = pathname.slice("/play/".length);
  if (!rest || !isMisplacedPlayAsset(rest)) return NextResponse.next();

  const slug = slugFromReferer(request.headers.get("referer"));
  if (!slug) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `${playBasePath(slug)}${rest}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/play/:path*"],
};
