#!/usr/bin/env node
/**
 * Production build: deploy gravity-ball static site to out/.
 */
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const ROOT = process.cwd();
const SRC = join(ROOT, "gravity-ball");
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "out");

const SITE_CONFIG = {
  apiOrigin: "https://www.roiify.net",
  bannerPlacementId: "plc_3b7064bbsmtb",
};

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(SRC, OUT, { recursive: true });
await writeFile(join(OUT, "site-config.json"), `${JSON.stringify(SITE_CONFIG)}\n`, "utf8");

if (existsSync(PUBLIC)) {
  await cp(PUBLIC, OUT, { recursive: true });
}

const { readdir } = await import("node:fs/promises");
const files = await readdir(OUT, { recursive: true, withFileTypes: true });
const count = files.filter((f) => f.isFile()).length;
console.log(`✓ out/ — ${count} files (gravity-ball + site-config.json)`);
console.log(`  ad placement: ${SITE_CONFIG.bannerPlacementId}`);
