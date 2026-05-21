import Link from "next/link";
import { CozyButton, PawIcon } from "@/components/CozyUI";
import { getGamePlaySrc } from "@/lib/game-play";
import type { Game } from "@/lib/games";

export function GamePlaySection({ game }: { game: Game }) {
  const playSrc = getGamePlaySrc(game);
  const isLocal = Boolean(game.localPlayPath && playSrc === game.localPlayPath);
  const fullscreenHref = game.localPlayPath ?? playSrc;

  return (
    <section
      id="play"
      className="scroll-mt-[88px] mx-auto grid max-w-7xl grid-cols-1 gap-6 min-[960px]:grid-cols-[1fr_280px] min-[960px]:gap-8"
    >
      <div className="overflow-hidden rounded-[28px] border-[3px] border-[var(--color-cozy-brown)]/10 bg-white shadow-[0_20px_60px_rgba(93,64,55,0.1)]">
        {playSrc ? (
          <iframe
            title={`${game.title} — play`}
            src={playSrc}
            className="aspect-[16/10] w-full min-h-[420px] bg-[#1a1a2e] min-[960px]:min-h-[560px]"
            allow="fullscreen; gamepad; autoplay"
            allowFullScreen
          />
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#FFE8DC] to-[#D4E8D0] p-10 text-center">
            <span className="text-6xl">{game.cardEmoji}</span>
            <p className="max-w-sm text-base text-[var(--color-cozy-brown-muted)]">
              Browser play is not available yet. Try the store links below.
            </p>
          </div>
        )}
      </div>

      <aside className="flex flex-col gap-4">
        <div className="rounded-[24px] border-2 border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-card)] p-5">
          <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-black text-[var(--color-cozy-brown)]">
            <PawIcon className="size-4 text-[var(--color-cozy-terracotta)]" />
            How to play
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
            {(game.howToPlay ?? [
              "Use mouse or touch to interact.",
              "Follow on-screen goals.",
              "Take breaks anytime.",
            ]).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        {isLocal ? (
          <p className="rounded-[16px] border border-[var(--color-cozy-brown)]/10 bg-white px-4 py-3 text-xs leading-relaxed text-[var(--color-cozy-brown-muted)]">
            Web build folder:{" "}
            <code className="text-[var(--color-cozy-brown)]">public/play/{game.slug}/</code>
          </p>
        ) : null}

        {fullscreenHref ? (
          <CozyButton href={fullscreenHref} variant="outline" external className="w-full !justify-center">
            Fullscreen ↗
          </CozyButton>
        ) : null}

        {game.playStoreUrl ? (
          <CozyButton href={game.playStoreUrl} variant="outline" external className="w-full !justify-center">
            Google Play ↗
          </CozyButton>
        ) : null}

        <p className="text-center text-xs text-[var(--color-cozy-brown-muted)]">
          <Link
            href={`/games/${game.slug}/support`}
            className="font-semibold text-[var(--color-cozy-terracotta)] hover:underline"
          >
            Support
          </Link>
          <span className="mx-1.5">·</span>
          <Link href="/privacy-policy" className="underline hover:text-[var(--color-cozy-brown)]">
            Privacy
          </Link>
        </p>
      </aside>
    </section>
  );
}
