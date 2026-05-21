import Link from "next/link";
import { CozyButton, PawIcon } from "@/components/CozyUI";
import type { Game } from "@/lib/games";

export function GameTelegramSection({ game }: { game: Game }) {
  return (
    <section
      id="play"
      className="scroll-mt-[88px] mx-auto max-w-7xl overflow-hidden rounded-[28px] border-2 border-[#229ED9]/20 bg-gradient-to-br from-[#E8F4FC] via-white to-[var(--color-cozy-card)] shadow-[0_12px_40px_rgba(34,158,217,0.1)]"
    >
      <div className="grid grid-cols-1 gap-8 p-8 min-[960px]:grid-cols-[1fr_auto] min-[960px]:items-center min-[960px]:p-10">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#229ED9]/10 px-3 py-1 text-xs font-bold tracking-wide text-[#229ED9] uppercase">
            <PawIcon className="size-3.5" />
            Telegram Mini App
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-black text-[var(--color-cozy-brown)]">
            Play {game.title} in Telegram
          </h2>
          <p className="mt-3 text-sm leading-[1.75] text-[var(--color-cozy-brown-muted)]">
            This version uses Telegram Web App APIs and only runs inside Telegram. Open our bot to
            start playing — the browser preview on this site is not available.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row min-[960px]:flex-col min-[960px]:min-w-[220px]">
          {game.telegramUrl ? (
            <CozyButton
              href={game.telegramUrl}
              external
              className="w-full !justify-center !bg-[#229ED9] !shadow-[0_8px_24px_rgba(34,158,217,0.3)]"
            >
              Open in Telegram
            </CozyButton>
          ) : null}
          {game.playStoreUrl ? (
            <CozyButton href={game.playStoreUrl} variant="outline" external className="w-full !justify-center">
              Google Play ↗
            </CozyButton>
          ) : null}
        </div>
      </div>
      <p className="border-t border-[#229ED9]/10 py-4 text-center text-xs text-[var(--color-cozy-brown-muted)]">
        <Link
          href={`/games/${game.slug}/support`}
          className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
        >
          Support
        </Link>
      </p>
    </section>
  );
}
