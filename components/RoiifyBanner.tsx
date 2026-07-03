import { ROIIFY_BANNER_PLACEMENT_ID } from "@/lib/roiify";

export function RoiifyBanner() {
  return (
    <aside
      className="border-t border-white/10 bg-[var(--color-cozy-sage-dark)] px-5 py-6 sm:px-8 lg:px-[52px]"
      aria-label="Advertisement"
    >
      <div className="mx-auto max-w-7xl">
        <div
          data-roiify-placement={ROIIFY_BANNER_PLACEMENT_ID}
          data-theme="auto"
          data-width="auto"
          data-radius="8"
          className="min-h-20 w-full"
        />
      </div>
    </aside>
  );
}
