#!/usr/bin/env node
/**
 * Import games from https://yxk.jyb99999.cn/
 *
 * Usage:
 *   node scripts/import-yxk-games.mjs           # full import
 *   node scripts/import-yxk-games.mjs --limit 5 # smoke test
 *   node scripts/import-yxk-games.mjs --skip-download
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://yxk.jyb99999.cn";
const STORE = path.join(ROOT, "public/store");
const CATALOG = path.join(ROOT, "lib/store/yxk-catalog.json");

const args = process.argv.slice(2);
const limit = args.includes("--limit")
  ? Number(args[args.indexOf("--limit") + 1])
  : Infinity;
const skipDownload = args.includes("--skip-download");
const detailConcurrency = 12;
const downloadConcurrency = 8;

const SKIP_STORE_DIRS = new Set(["mochicat", "cozycat"]);

function parseTags(part) {
  const tags = [...part.matchAll(/<span class="tag[^"]*">([^<]+)<\/span>/g)].map(
    (m) => m[1].trim(),
  );
  const version = tags.find((t) => /^\d+\.\d+/.test(t));
  const language = tags.includes("英文") ? "English" : tags.includes("中文") ? "简体中文" : undefined;
  const categories = tags.filter(
    (t) =>
      !["最新", "非逆向", "逆向", "TS", "JS", "JavaScript", "TypeScript", "中文", "英文"].includes(t) &&
      !/^\d+\.\d+/.test(t),
  );
  return { version, language, categories };
}

function parseHomeCards(html) {
  return html
    .split('class="game-card"')
    .slice(1)
    .map((part) => {
      const id = (part.match(/data-game-id="(\d+)"/) || [])[1];
      const folder = (part.match(/static\/images\/([^/]+)\/(?:icon|1)\.png/) || [])[1];
      const title = (part.match(/class="game-title">\s*([^<\n]+)/) || [])[1]?.trim();
      const description = (part.match(/class="game-description">\s*([^<]+)/) || [])[1]?.trim();
      const { version, language, categories } = parseTags(part);
      return { id: Number(id), folder, title, description, version, language, categories };
    })
    .filter((g) => g.id && g.folder && g.title);
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "roncy-import/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

async function fetchDetailMeta(id) {
  const html = await fetchText(`${BASE}/detail?id=${id}`);
  const shiwanTag = html.match(/<a class="start"[^>]*id="shiwan"[^>]*>/)?.[0] ?? "";
  const trialMatch = shiwanTag.match(/data-value="(\d)"/);
  const landscapeMatch = shiwanTag.match(/data-screen="(\d)"/);
  const sizeMatch = html.match(/压缩包大小：([^<\s]+)/);
  const descMatch = html.match(/class="info"><span class="con">([\s\S]*?)<\/span>/);
  const desc = descMatch
    ? descMatch[1]
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, "")
        .replace(/压缩包大小：[^\s]+\s*/i, "")
        .replace(/\s+/g, " ")
        .trim()
    : "";
  return {
    trialAvailable: trialMatch ? trialMatch[1] === "1" : false,
    trialLandscape: landscapeMatch ? landscapeMatch[1] === "1" : false,
    size: sizeMatch ? sizeMatch[1] : undefined,
    description: desc,
  };
}

async function mapPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

async function downloadFile(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": "roncy-import/1.0" } });
  if (!res.ok) throw new Error(`Download failed ${res.status} ${url}`);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function downloadAssets(game) {
  const dir = path.join(STORE, game.storeDir);
  await fs.mkdir(dir, { recursive: true });
  const base = `${BASE}/static/images/${game.assetFolder}`;

  async function tryDownload(filename, dest) {
    try {
      await downloadFile(`${base}/${filename}`, dest);
      return true;
    } catch {
      return false;
    }
  }

  const logoOk = await tryDownload("icon.png", path.join(dir, "logo.png"));
  if (!logoOk) await tryDownload("1.png", path.join(dir, "logo.png"));

  for (const n of ["1.png", "2.png", "3.png"]) {
    await tryDownload(n, path.join(dir, n));
  }

  const topPath = path.join(dir, "top.png");
  try {
    await fs.access(topPath);
  } catch {
    try {
      await fs.copyFile(path.join(dir, "1.png"), topPath);
    } catch {
      /* no screenshots yet */
    }
  }
}

function buildCatalogEntry(card, detail) {
  const description = detail.description || card.description || card.title;
  const categories = card.categories?.length ? card.categories : ["Casual"];
  const genre = categories[0] ?? "Casual";
  const shortDescription =
    description.length > 160 ? `${description.slice(0, 157)}…` : description;

  return {
    yxkGameId: card.id,
    storeDir: card.folder,
    slug: card.folder,
    gameName: card.title,
    genre,
    shortDescription,
    about: description,
    features: [
      description.slice(0, 120),
      ...categories.slice(0, 3).map((c) => `${c} gameplay`),
    ].slice(0, 4),
    howToPlay: [
      "Launch the demo and follow the on-screen tutorial.",
      "Complete levels to unlock the next stage.",
    ],
    categories,
    languages: card.language ? [card.language] : ["简体中文"],
    version: card.version,
    size: detail.size,
    platforms: ["web"],
    trialAvailable: detail.trialAvailable,
    trialLandscape: detail.trialLandscape,
    assetFolder: card.folder,
  };
}

async function main() {
  console.log("Fetching catalog from", BASE);
  const homeHtml = await fetchText(`${BASE}/`);
  let cards = parseHomeCards(homeHtml).filter((c) => !SKIP_STORE_DIRS.has(c.folder));
  cards.sort((a, b) => b.id - a.id);
  if (Number.isFinite(limit)) cards = cards.slice(0, limit);
  console.log(`Found ${cards.length} games to import`);

  console.log("Fetching detail pages for trial flags…");
  const details = await mapPool(cards, detailConcurrency, (card) =>
    fetchDetailMeta(card.id).catch((err) => {
      console.warn(`  detail ${card.id} ${card.title}: ${err.message}`);
      return { trialAvailable: false, trialLandscape: false, description: card.description ?? "" };
    }),
  );

  const catalog = cards.map((card, i) => buildCatalogEntry(card, details[i]));

  if (!skipDownload) {
    console.log("Downloading icons and screenshots…");
    let done = 0;
    await mapPool(catalog, downloadConcurrency, async (game) => {
      try {
        await downloadAssets(game);
        done++;
        if (done % 25 === 0 || done === catalog.length) {
          console.log(`  assets ${done}/${catalog.length}`);
        }
      } catch (err) {
        console.warn(`  assets ${game.yxkGameId} ${game.gameName}: ${err.message}`);
      }
    });
  }

  await fs.writeFile(CATALOG, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Wrote ${catalog.length} entries → ${path.relative(ROOT, CATALOG)}`);
  const trialCount = catalog.filter((g) => g.trialAvailable).length;
  console.log(`Trial playable: ${trialCount}/${catalog.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
