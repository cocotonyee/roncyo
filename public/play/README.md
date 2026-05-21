# 网站内嵌游戏（Web 版）

把 **已构建好的 Web 游戏**（含 `index.html` 的文件夹）放到对应目录，即可在  
`https://roncyo.com/games/游戏slug` 页面里直接玩。

## 目录结构

```
public/play/
  mochi-cats/           ← slug 与 lib/games.ts 里一致
    index.html          ← 入口（必须）
    main.js             ← 你的脚本
    assets/             ← 图片、音频等
  cozy-cat-block-puzzle/
    index.html
    ...
```

## 步骤

1. 在 `lib/games.ts` 里确认游戏的 `slug`（例如 `mochi-cats`）。
2. 将 Unity WebGL、Cocos、Phaser、纯 HTML5 等 **导出/Web 构建产物** 整包复制到 `public/play/<slug>/`。
3. 保证能通过 `public/play/<slug>/index.html` 本地打开并运行。
4. 运行 `npm run play:base`，自动为每个 `public/play/<slug>/index.html` 写入  
   `<base href="/play/<slug>/">`（Cocos / Godot 等构建后都建议跑一遍）。
5. 在 `lib/games.ts` 为该游戏设置：
   - `localPlayPath: "/play/<slug>/"`（或省略，默认即此路径）
   - `platforms` 包含 `"web"`
5. 运行 `npm run dev`，打开 `/games/<slug>` 测试。

## 访问地址

| 用途 | URL |
|------|-----|
| 游戏介绍 + 内嵌游玩 | `https://roncyo.com/games/mochi-cats` |
| 仅游戏全屏（新标签） | `https://roncyo.com/play/mochi-cats/`（与 `/play/mochi-cats/index.html` 相同） |

## 注意

- 资源路径请用**相对路径**（`./assets/...`），不要写死本地磁盘路径。
- 大型 WebGL 包建议开启 gzip/brotli；部署在 Vercel 等会自动处理静态文件。
- 若引擎需要特殊响应头（COOP/COEP），在 `next.config.ts` 里为 `/play/*` 配置 headers。

## Telegram Mini App（仅 Telegram 内可玩）

若游戏对接了 Telegram Bot（如 `cozy-cat-block-puzzle`）：

1. 构建产物仍放在 `public/play/<slug>/`，BotFather 填 `https://roncyo.com/play/<slug>/`
2. 在 `lib/games.ts` 设置 `telegramMiniApp: true` 和 `telegramUrl`（`https://t.me/你的Bot`）
3. **不要**设置 `localPlayPath` — 官网游戏页不会 iframe 嵌入，只显示「在 Telegram 中打开」

## 多游戏路径说明

部分引擎会把资源请求发到 `/play/xxx`（缺少游戏名）。站点已用 **middleware** 根据页面来源（Referer）把请求转发到正确的 `/play/<slug>/xxx`，并在 `lib/games.ts` 里为每个带 `localPlayPath` 的游戏生效。新增游戏后执行 `npm run play:base` 即可。
