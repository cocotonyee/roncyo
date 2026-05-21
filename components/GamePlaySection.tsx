import Link from "next/link";
import { CozyButton, PawIcon } from "@/components/CozyUI";
import { GamePhoneFrame } from "@/components/GamePhoneFrame";
import { getGamePlaySrc, playIndexUrl, playPageUrl } from "@/lib/game-play";
import type { Game } from "@/lib/games";

export function GamePlaySection({ game }: { game: Game }) {
  const playSrc = getGamePlaySrc(game);
  const fullscreenHref = game.localPlayPath ? playPageUrl(game.slug) : playSrc;
  const iframeSrc = game.localPlayPath ? playIndexUrl(game.slug) : playSrc;

  return (
    <section
      id="play"
      className="scroll-mt-[88px] border-b border-[var(--color-cozy-brown)]/8 bg-gradient-to-b from-[var(--color-cozy-card)] to-[var(--color-cozy-cream)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-0 py-8 min-[960px]:flex-row min-[960px]:items-start min-[960px]:justify-center min-[960px]:gap-10 min-[960px]:py-10">
        {playSrc && iframeSrc ? (
          <GamePhoneFrame src={iframeSrc} title={`${game.title} — play`} />
        ) : (
          <div className="flex h-[min(60vh,480px)] w-[280px] items-center justify-center rounded-[2.25rem] border-2 border-dashed border-[var(--color-cozy-brown)]/20 bg-[var(--color-cozy-card)] p-8 text-center">
            <div>
              <span className="text-5xl">{game.cardEmoji}</span>
              <p className="mt-4 text-sm text-[var(--color-cozy-brown-muted)]">
                Browser play is not available yet.
              </p>
            </div>
          </div>
        )}

        <aside className="w-full max-w-[300px] shrink-0 space-y-4 min-[960px]:sticky min-[960px]:top-24">
          <div className="rounded-[24px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-5 shadow-[0_8px_28px_rgba(93,64,55,0.06)]">
            <p className="text-[10px] font-bold tracking-wide text-[var(--color-cozy-terracotta)] uppercase">
              Play {game.title}
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              {fullscreenHref ? (
                <CozyButton href={fullscreenHref} external className="w-full !justify-center">
                  Fullscreen ↗
                </CozyButton>
              ) : null}
              {game.telegramUrl ? (
                <CozyButton
                  href={game.telegramUrl}
                  external
                  className="w-full !justify-center !bg-[#229ED9] !shadow-[0_8px_24px_rgba(34,158,217,0.28)]"
                >
                  Play in Telegram
                </CozyButton>
              ) : null}
              {game.playStoreUrl ? (
                <CozyButton href={game.playStoreUrl} variant="outline" external className="w-full !justify-center">
                  Google Play ↗
                </CozyButton>
              ) : null}
            </div>
            {playSrc ? (
              <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--color-cozy-brown-muted)]">
                Game stuck on blue? Try{" "}
                <a href={fullscreenHref ?? "#"} className="font-semibold text-[var(--color-cozy-terracotta)] underline">
                  Fullscreen
                </a>{" "}
                or refresh the page.
              </p>
            ) : null}
          </div>

          <div className="rounded-[24px] border-2 border-[var(--color-cozy-brown)]/8 bg-white/90 p-5">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-black text-[var(--color-cozy-brown)]">
              <PawIcon className="size-4 text-[var(--color-cozy-terracotta)]" />
              How to play
            </h2>
            <ol className="mt-3 space-y-2.5">
              {(game.howToPlay ?? []).map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-cozy-terracotta)]/15 font-[family-name:var(--font-display)] text-xs font-black text-[var(--color-cozy-terracotta)]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-center text-xs text-[var(--color-cozy-brown-muted)]">
            <Link
              href={`/games/${game.slug}/support`}
              className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
            >
              Support
            </Link>
            <span className="mx-1.5 opacity-40">·</span>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
          </p>
        </aside>
      </div>
    </section>
  );
}
