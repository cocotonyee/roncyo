import { storeListings } from "@/lib/store/listings";

export function getStoreListingBySlug(slug: string) {
  return storeListings.find((l) => l.slug === slug);
}

export function getStoreListingByDir(storeDir: string) {
  return storeListings.find((l) => l.storeDir === storeDir);
}
