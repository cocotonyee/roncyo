import { RoiifyAdLayout } from "@/components/RoiifyBanner";
import { RoiifyScript } from "@/components/RoiifyScript";

/** Minimal shell for homepage — Roiify ad only, no nav, footer, or outbound links. */
export default function AdLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RoiifyScript />
      <div className="flex min-h-0 flex-1 flex-col">
        <RoiifyAdLayout>
          <main className="flex-1">{children}</main>
        </RoiifyAdLayout>
      </div>
    </>
  );
}
