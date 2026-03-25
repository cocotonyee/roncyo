import Link from "next/link";
import { ContentPanel, InnerPage } from "@/components/InnerPage";

export default function NotFound() {
  return (
    <InnerPage glow="grape">
      <ContentPanel className="py-16 text-center">
        <p
          className="font-[family-name:var(--font-display)] text-7xl font-black tracking-tighter text-[var(--color-roncy-teal)]/25"
          aria-hidden
        >
          404
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black text-[var(--color-roncy-navy)]">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[var(--color-roncy-muted)]">
          The page you requested does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--color-roncy-navy)] px-8 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-lg transition hover:bg-[var(--color-roncy-text)]"
        >
          Back home
        </Link>
      </ContentPanel>
    </InnerPage>
  );
}
