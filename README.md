# Roncyo Platform

Mother brand + product incubator for [roncyo.com](https://roncyo.com).

## Structure

```
apps/
  www          # Roncyo mother site (this deploys to roncyo.com)
packages/      # shared UI later
vendor/        # local npm tarballs (goship-core.tgz)
```

### GoShip Site — local npm pack（不合并）

```bash
npm run pack:goship   # 调用 GoShip pack → 写入 vendor/goship-core.tgz
npm install
```

| 产物 | 路径 |
|------|------|
| GoShip 打包 | `../GoShip/site/.local-packs/goship-core-*.tgz` |
| Roncyo 引用 | `vendor/goship-core.tgz` |
| 依赖 | `"@goship/core": "file:../../vendor/goship-core.tgz"` |

GoShip 更新后重新 `pack:goship` + `npm install`。

| Layer | Owner |
|-------|--------|
| Auth / billing / SEO / `seo_documents` | `@goship/core`（本地 npm） |
| Blog 契约 | `apps/www/lib/blog.ts`（锁定） |
| Skin | `apps/www/components/*` |
| Hub SEO | 独立工具，运营时再挂 |

GoShip 侧也可直接：`pnpm pack:site` / `pnpm pack:site:all`。

## Develop

```bash
npm run pack:goship   # first time / after GoShip updates
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

Commit `vendor/goship-core.tgz`. Set project **Root Directory** to `apps/www`. Domain: `roncyo.com`.

## Preserved routes

These URLs must stay live when switching DNS to this project:

- `/privacy-policy`
- `/apps/mochi-cats/privacy` · `/apps/mochi-cats/support`
- `/apps/cozy-cat-block-puzzle/privacy` · `/apps/cozy-cat-block-puzzle/support`
- `/terms-of-service` (alias `/terms`)
- `/support`
