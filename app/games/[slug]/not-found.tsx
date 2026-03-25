import Link from "next/link";
import { ContentPanel, InnerPage } from "@/components/InnerPage";

export default function GameNotFound() {
  return (
    <InnerPage glow="citrus">
      <ContentPanel className="py-14 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-black text-[var(--color-roncy-navy)]">
          Game not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[var(--color-roncy-muted)]">
          That product page does not exist.
        </p>
        <Link
          href="/games"
          className="mt-8 inline-flex rounded-full bg-[var(--color-roncy-teal)] px-8 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_8px_28px_rgba(0,212,200,0.3)] transition hover:-translate-y-0.5"
        >
          View all games
        </Link>
      </ContentPanel>
    </InnerPage>
  );
}
