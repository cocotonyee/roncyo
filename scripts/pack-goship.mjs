#!/usr/bin/env node
/**
 * Pack GoShip Site (@goship/core) as a local npm tarball and vendor it here.
 *
 * 1. Runs GoShip `site/scripts/pack-local.mjs`
 * 2. Copies the .tgz into Roncyo/vendor/
 * 3. Prints the file: dependency to use
 *
 * Usage: npm run pack:goship
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const goshipRoot = path.resolve(root, "../GoShip");
const packScript = path.join(goshipRoot, "site/scripts/pack-local.mjs");
const packsDir = path.join(goshipRoot, "site/.local-packs");
const vendorDir = path.join(root, "vendor");

if (!fs.existsSync(packScript)) {
  console.error(`GoShip pack script not found: ${packScript}`);
  process.exit(1);
}

const packed = spawnSync(process.execPath, [packScript], {
  cwd: goshipRoot,
  stdio: "inherit",
});
if (packed.status !== 0) process.exit(packed.status ?? 1);

const tarballs = fs
  .readdirSync(packsDir)
  .filter((f) => f.startsWith("goship-core-") && f.endsWith(".tgz"))
  .sort();

if (tarballs.length === 0) {
  console.error("No goship-core-*.tgz produced");
  process.exit(1);
}

const latest = tarballs.at(-1);
fs.mkdirSync(vendorDir, { recursive: true });

// Keep a single stable filename so package.json file: path stays stable.
const stableName = "goship-core.tgz";
const dest = path.join(vendorDir, stableName);
fs.copyFileSync(path.join(packsDir, latest), dest);

// Remove old versioned copies if any
for (const f of fs.readdirSync(vendorDir)) {
  if (f !== stableName && f.startsWith("goship-core") && f.endsWith(".tgz")) {
    fs.unlinkSync(path.join(vendorDir, f));
  }
}

console.log(`\nVendored → ${path.relative(root, dest)} (from ${latest})`);
console.log("Next: npm install");
