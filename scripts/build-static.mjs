#!/usr/bin/env node
/**
 * Production build: single index.html (~10 KB) — no Next.js, no extra assets.
 * Deploy only the contents of out/ (currently just index.html).
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");

const SITE = {
  brand: "Roncyo",
  tagline:
    "AI Business Automation Studio for local businesses in Australia & New Zealand",
};

const COPY = {
  headline: "Automate Repetitive Business Tasks",
  subheadline:
    "Custom AI automation for local businesses. We eliminate repetitive work, reduce manual effort, and build automation tailored to your business.",
};

const ROIIFY = {
  sdk: "https://www.roiify.net/sdk/roiify-ads.js",
  placement: "plc_3b7064bbsmtb",
  rotationMs: 30_000,
};

const CSS = `:root{--bg:#fff;--fg:#0a0a0a;--muted:#6b7280;--border:#e5e7eb;--surface:#f9fafb;--accent:#03d8cb;--font:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}@media (prefers-color-scheme:dark){:root{--bg:#050505;--fg:#fafafa;--muted:#a1a1aa;--border:#27272a;--surface:#0f0f0f}}*,*::before,*::after{box-sizing:border-box}html{-webkit-text-size-adjust:100%}body{margin:0;min-height:100dvh;font-family:var(--font);font-size:16px;line-height:1.5;color:var(--fg);background:var(--bg);-webkit-font-smoothing:antialiased}:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.ad-strip{border-bottom:1px solid var(--border);background:var(--surface);padding:1rem 1.25rem}.ad-strip__inner{max-width:80rem;margin:0 auto}.ad-slot{min-height:5rem;width:100%}.home{max-width:42rem;margin:0 auto;padding:4rem 1.25rem}.home__brand{margin:0;font-size:.875rem;font-weight:500;color:var(--muted)}.home__title{margin:1rem 0 0;font-size:clamp(1.875rem,4vw,2.25rem);font-weight:600;line-height:1.2;letter-spacing:-.02em}.home__lead{margin:1.5rem 0 0;font-size:1rem;line-height:1.625;color:var(--muted)}.home__tagline{margin:1rem 0 0;font-size:.875rem;line-height:1.625;color:var(--muted)}@media (min-width:640px){.ad-strip{padding:1rem 2rem}.home{padding:6rem 2rem}}@media (min-width:1024px){.ad-strip{padding:1rem 3rem}.home{padding:6rem 3rem}}`;

const INIT = `(function(){var p="${ROIIFY.placement}",o={theme:"auto",width:"auto",radius:"8",format:"banner"},el=document.querySelector(".ad-slot");function s(){if(window.RoiifyAds&&el)window.RoiifyAds.show(p,el,o)}var t=document.querySelector('script[src*="roiify-ads.js"]');if(window.RoiifyAds)s();else t.addEventListener("load",s);setInterval(s,${ROIIFY.rotationMs})})();`;

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const title = `${SITE.brand} — AI Business Automation Studio`;
const html = `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(SITE.tagline)}">
<style>${CSS}</style>
</head>
<body>
<aside id="roiify-ad-top" class="ad-strip" aria-label="Advertisement">
<div class="ad-strip__inner"><div class="ad-slot" data-roiify-format="banner"></div></div>
</aside>
<main>
<section class="home">
<p class="home__brand">${esc(SITE.brand)}</p>
<h1 class="home__title">${esc(COPY.headline)}</h1>
<p class="home__lead">${esc(COPY.subheadline)}</p>
<p class="home__tagline">${esc(SITE.tagline)}</p>
</section>
</main>
<script src="${ROIIFY.sdk}" async></script>
<script>${INIT}</script>
</body>
</html>
`;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, "index.html"), html, "utf8");

const bytes = Buffer.byteLength(html, "utf8");
const kb = (bytes / 1024).toFixed(1);
console.log(`✓ out/index.html — ${bytes} bytes (${kb} KB)`);

if (bytes > 12_288) {
  console.warn("⚠ Homepage exceeds 12 KB target");
  process.exitCode = 1;
}
