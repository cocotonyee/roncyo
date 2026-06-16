# Store assets

Each game has a folder under `public/store/` with images and a matching entry in `lib/store/listings.ts`.

## Folder layout

```
public/store/mochicat/
  logo.png    — app icon (square)
  top.png     — detail page banner (optional; omit or set hasTopBanner: false)
  1.png       — screenshot
  2.png
  3.png
```

## Add a new game

1. Create `public/store/your-game/` and add the images above.
2. Copy the example block in `lib/store/listings.ts` and fill in:
   - `storeDir` — folder name (e.g. `your-game`)
   - `slug` — URL path `/games/[slug]`
   - `companyName`, `companyLegalName` — publisher
   - `gameName`, `shortDescription`, `about`, `features` — game copy
3. Run `npm run build` (or refresh dev server).

Custom screenshot filenames: set `screenshots: ["a.png", "b.png"]` in the listing.

No top banner: set `hasTopBanner: false` in the listing — a default gradient banner is shown instead.
