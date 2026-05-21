import Link from "next/link";
import { Breadcrumb } from "@/components/InnerPage";
import { canPlayInBrowser } from "@/lib/game-play";
import type { Game } from "@/lib/games";

const outlineBtn =
  "inline-flex rounded-full border-2 border-[var(--color-cozy-brown)]/15 bg-white px-4 py-2 text-xs font-extrabold text-[var(--color-cozy-brown)] transition hover:border-[var(--color-cozy-brown)]/30";

export function GamePageHeader({ game }: { game: Game }) {
  const hasStores = Boolean(game.appStoreUrl || game.playStoreUrl);
  const canPlayOnPage = canPlayInBrowser(game);

  return (
    <header className="border-b border-[var(--color-cozy-brown)]/10 bg-[var(--color-cozy-card)] px-5 py-6 min-[960px]:px-[52px] min-[960px]:py-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb items={[{ href: "/games", label: "Games" }, { label: game.title }]} />
        <div className="mt-4 flex flex-col gap-6 min-[960px]:flex-row min-[960px]:items-end min-[960px]:justify-between">
          <div className="flex gap-5">
            <div
              className="flex size-20 shrink-0 items-center justify-center rounded-[20px] text-4xl shadow-[0_8px_24px_rgba(93,64,55,0.08)]"
              style={{ background: game.cardColor }}
            >
              {game.cardEmoji}
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
                {game.genre}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[var(--color-cozy-brown)]">
                {game.title}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
                {game.shortDescription}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {canPlayOnPage ? (
              <a
                href="#play"
                className="inline-flex rounded-full bg-[var(--color-cozy-terracotta)] px-7 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(229,142,115,0.35)] transition hover:-translate-y-0.5"
              >
                {game.playButtonLabel ?? "Play now"}
              </a>
            ) : game.playStoreUrl ? (
              <a
                href={game.playStoreUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex rounded-full bg-[var(--color-cozy-terracotta)] px-7 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(229,142,115,0.35)] transition hover:-translate-y-0.5"
              >
                Get on Google Play
              </a>
            ) : null}
            {hasStores && canPlayOnPage ? (
              <>
                {game.appStoreUrl ? (
                  <a href={game.appStoreUrl} rel="noopener noreferrer" target="_blank" className={outlineBtn}>
                    App Store
                  </a>
                ) : null}
                {game.playStoreUrl ? (
                  <a href={game.playStoreUrl} rel="noopener noreferrer" target="_blank" className={outlineBtn}>
                    Google Play
                  </a>
                ) : null}
              </>
            ) : null}
            <Link href={`/games/${game.slug}/support`} className={outlineBtn}>
              Support
            </Link>
            <Link href={`/games/${game.slug}/privacy`} className={outlineBtn}>
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
