#!/usr/bin/env node
/**
 * Production build: single index.html — no Next.js, no extra assets.
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

const SECTIONS = [
  {
    title: "What we automate",
    body: "Most local businesses lose hours every week on work that never needs a human touch.",
    list: [
      "Appointment reminders and follow-up emails",
      "Quote requests, job sheets, and status updates",
      "Spreadsheet updates and weekly reporting",
      "PDF intake, form data entry, and file sorting",
      "Browser tasks across portals, dashboards, and admin panels",
    ],
  },
  {
    title: "Built for Australian & NZ businesses",
    body: "We work with owner-led teams that want practical automation — not another software subscription to manage.",
    list: [
      "Dentists and medical clinics handling recalls and intake",
      "Electricians and plumbers quoting and scheduling jobs",
      "Accountants chasing documents and reconciling files",
      "Law firms and professional services managing client workflows",
    ],
  },
  {
    title: "How it works",
    ordered: [
      "We map the tasks your team repeats every day",
      "We design a workflow around your existing tools",
      "We build, test, and hand over automation that fits your process",
      "You keep running the business while repetitive work runs itself",
    ],
  },
  {
    title: "Questions owners ask",
    items: [
      {
        q: "Do we need to replace our current software?",
        a: "Usually no. We connect to the email, spreadsheets, CRM, and web tools you already use.",
      },
      {
        q: "How long before we see results?",
        a: "Many workflows go live within a few weeks once we understand your process.",
      },
      {
        q: "Is this only for large companies?",
        a: "No. We focus on local businesses with small teams and high manual workload.",
      },
    ],
  },
  {
    title: "Why teams come to us",
    body: "You are not buying a generic AI chatbot. You get automation shaped around how your business actually operates — fewer copy-paste steps, fewer missed follow-ups, and more time for customers.",
  },
];

const ROIIFY = {
  sdk: "https://www.roiify.net/sdk/roiify-ads.js",
  placement: "plc_3b7064bbsmtb",
};

const CSS = `:root{--bg:#fff;--fg:#0a0a0a;--muted:#6b7280;--border:#e5e7eb;--surface:#f9fafb;--accent:#03d8cb;--font:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}@media (prefers-color-scheme:dark){:root{--bg:#050505;--fg:#fafafa;--muted:#a1a1aa;--border:#27272a;--surface:#0f0f0f}}*,*::before,*::after{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{margin:0;min-height:100dvh;font-family:var(--font);font-size:16px;line-height:1.5;color:var(--fg);background:var(--bg);-webkit-font-smoothing:antialiased}:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.ad-strip{border-bottom:1px solid var(--border);background:var(--surface);padding:1rem 1.25rem}.ad-strip__inner{max-width:48rem;margin:0 auto}.ad-slot{min-height:5rem;width:100%}.page{max-width:48rem;margin:0 auto;padding:0 1.25rem 5rem}.hero{padding:3rem 0 1rem}.hero__brand{margin:0;font-size:.875rem;font-weight:500;color:var(--muted)}.hero__title{margin:1rem 0 0;font-size:clamp(1.75rem,4vw,2.125rem);font-weight:600;line-height:1.2;letter-spacing:-.02em}.hero__lead{margin:1.25rem 0 0;font-size:1rem;line-height:1.625;color:var(--muted)}.hero__tagline{margin:.75rem 0 0;font-size:.875rem;line-height:1.625;color:var(--muted)}.sec{padding:2rem 0;border-top:1px solid var(--border)}.sec__title{margin:0;font-size:1.125rem;font-weight:600}.sec__body{margin:.75rem 0 0;font-size:.9375rem;line-height:1.65;color:var(--muted)}.sec__list{margin:.75rem 0 0;padding-left:1.2rem;font-size:.9375rem;line-height:1.65;color:var(--muted)}.sec__list li{margin:.4rem 0}.faq{margin:.75rem 0 0}.faq dt{margin:.9rem 0 0;font-size:.9375rem;font-weight:600;color:var(--fg)}.faq dd{margin:.35rem 0 0;font-size:.9375rem;line-height:1.65;color:var(--muted)}.foot{margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border);font-size:.8125rem;line-height:1.6;color:var(--muted)}@media (min-width:640px){.ad-strip,.page{padding-left:2rem;padding-right:2rem}.hero{padding-top:4rem}}@media (min-width:1024px){.ad-strip,.page{padding-left:3rem;padding-right:3rem}}`;

const INIT = `(function(){var p="${ROIIFY.placement}",o={theme:"auto",width:"auto",radius:"8",format:"banner"},el=document.querySelector(".ad-slot");function s(){if(window.RoiifyAds&&el)window.RoiifyAds.show(p,el,o)}var t=document.querySelector('script[src*="roiify-ads.js"]');if(window.RoiifyAds)s();else t.addEventListener("load",s)})();`;

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sectionHtml(sec) {
  let inner = `<h2 class="sec__title">${esc(sec.title)}</h2>`;
  if (sec.body) inner += `<p class="sec__body">${esc(sec.body)}</p>`;
  if (sec.list) {
    inner += `<ul class="sec__list">${sec.list.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>`;
  }
  if (sec.ordered) {
    inner += `<ol class="sec__list">${sec.ordered.map((li) => `<li>${esc(li)}</li>`).join("")}</ol>`;
  }
  if (sec.items) {
    inner += `<dl class="faq">${sec.items
      .map((item) => `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`)
      .join("")}</dl>`;
  }
  return `<section class="sec">${inner}</section>`;
}

const AD_STRIP = `<aside id="roiify-ad-top" class="ad-strip" aria-label="Advertisement"><div class="ad-strip__inner"><div class="ad-slot" data-roiify-format="banner"></div></div></aside>`;

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
${AD_STRIP}
<main class="page">
<section class="hero">
<p class="hero__brand">${esc(SITE.brand)}</p>
<h1 class="hero__title">${esc(COPY.headline)}</h1>
<p class="hero__lead">${esc(COPY.subheadline)}</p>
<p class="hero__tagline">${esc(SITE.tagline)}</p>
</section>
${SECTIONS.map(sectionHtml).join("")}
<p class="foot">${esc(SITE.brand)} helps local businesses in Australia and New Zealand reduce manual work with practical AI automation — built around your existing tools and daily routines.</p>
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

if (bytes > 15_360) {
  console.warn("⚠ Homepage exceeds 15 KB target");
  process.exitCode = 1;
}
