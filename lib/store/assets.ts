/** Public URL for a file under `public/store/[storeDir]/` */
export function storeAsset(storeDir: string, filename: string) {
  return `/store/${storeDir}/${filename}`;
}

export type StoreAssets = {
  logo: string;
  topBanner?: string;
  screenshots: string[];
};

const DEFAULT_SCREENSHOTS = ["1.png", "2.png", "3.png"] as const;

/** Resolve logo, top banner, and screenshot URLs from a store folder. */
export function resolveStoreAssets(
  storeDir: string,
  screenshots?: string[],
  hasTopBanner = true,
): StoreAssets {
  const files = screenshots ?? [...DEFAULT_SCREENSHOTS];
  return {
    logo: storeAsset(storeDir, "logo.png"),
    topBanner: hasTopBanner ? storeAsset(storeDir, "top.png") : undefined,
    screenshots: files.map((f) => storeAsset(storeDir, f)),
  };
}
