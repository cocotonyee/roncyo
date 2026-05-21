#!/usr/bin/env node
/**
 * Ensures each public/play/<slug>/index.html has <base href="/play/<slug>/">.
 * Run after dropping a new Web build: node scripts/ensure-play-base.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const playDir = path.join(root, "public", "play");

if (!fs.existsSync(playDir)) {
  console.log("No public/play directory.");
  process.exit(0);
}

const BASE_RE = /<base\s+href=["']\/play\/[^"']+["']\s*\/?>/i;

for (const slug of fs.readdirSync(playDir, { withFileTypes: true })) {
  if (!slug.isDirectory() || slug.name === "node_modules") continue;
  const indexPath = path.join(playDir, slug.name, "index.html");
  if (!fs.existsSync(indexPath)) continue;

  let html = fs.readFileSync(indexPath, "utf8");
  const tag = `<base href="/play/${slug.name}/">`;

  if (BASE_RE.test(html)) {
    html = html.replace(BASE_RE, tag);
    console.log(`Updated base: ${slug.name}`);
  } else if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head([^>]*)>/i, `<head$1>\n  ${tag}`);
    console.log(`Added base: ${slug.name}`);
  } else {
    console.warn(`Skip (no <head>): ${slug.name}`);
    continue;
  }

  fs.writeFileSync(indexPath, html);
}

console.log("Done.");
