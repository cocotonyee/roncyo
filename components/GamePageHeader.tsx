import Link from "next/link";
import { Breadcrumb } from "@/components/InnerPage";
import { canPlayInBrowser, hasTelegramPlay, showTelegramSection } from "@/lib/game-play";
import type { Game } from "@/lib/games";

export function GamePageHeader({ game }: { game: Game }) {
  const canPlayOnPage = canPlayInBrowser(game);
  const telegramOnly = showTelegramSection(game);
  const telegramLink = hasTelegramPlay(game);

  return (
    <header className="border-b border-[var(--color-cozy-brown)]/10 bg-[var(--color-cozy-cream)] px-5 py-5 min-[960px]:px-[52px] min-[960px]:py-6">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb items={[{ href: "/games", label: "Games" }, { label: game.title }]} />

        <div className="mt-5 flex flex-col gap-5 min-[960px]:flex-row min-[960px]:items-center min-[960px]:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-[18px] text-3xl shadow-[0_6px_20px_rgba(93,64,55,0.1)] min-[960px]:size-[72px] min-[960px]:text-4xl"
              style={{ background: game.cardColor }}
            >
              {game.cardEmoji}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--color-cozy-card)] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
                  {game.genre}
                </span>
                {game.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-[var(--color-cozy-brown)]/12 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[var(--color-cozy-brown-muted)] capitalize"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-black leading-tight text-[var(--color-cozy-brown)]">
                {game.title}
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
                {game.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2.5 min-[960px]:justify-end">
            {canPlayOnPage ? (
              <a
                href="#play"
                className="inline-flex rounded-full bg-[var(--color-cozy-terracotta)] px-6 py-2.5 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_6px_20px_rgba(229,142,115,0.3)] transition hover:-translate-y-0.5"
              >
                {game.playButtonLabel ?? "Play now"}
              </a>
            ) : null}
            {telegramLink && game.telegramUrl ? (
              <a
                href={game.telegramUrl}
                rel="noopener noreferrer"
                target="_blank"
                className={`inline-flex rounded-full px-6 py-2.5 font-[family-name:var(--font-display)] text-sm font-extrabold transition hover:-translate-y-0.5 ${
                  telegramOnly || !canPlayOnPage
                    ? "bg-[#229ED9] text-white shadow-[0_6px_20px_rgba(34,158,217,0.3)]"
                    : "border-2 border-[#229ED9]/35 bg-[#E8F4FC] text-[#229ED9] hover:border-[#229ED9]"
                }`}
              >
                {telegramOnly || !canPlayOnPage ? "Play in Telegram" : "Telegram"}
              </a>
            ) : null}
            {!canPlayOnPage && !telegramOnly && game.playStoreUrl ? (
              <a
                href={game.playStoreUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex rounded-full bg-[var(--color-cozy-terracotta)] px-6 py-2.5 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_6px_20px_rgba(229,142,115,0.3)] transition hover:-translate-y-0.5"
              >
                Google Play
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
