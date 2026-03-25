import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/InnerPage";
import type { Game } from "@/lib/games";
import { resolvePlayCTA } from "@/lib/games";

const outlineBtn =
  "inline-flex rounded-full border-2 border-white/70 bg-white/10 px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-extrabold text-white backdrop-blur-md transition hover:border-white hover:bg-white/20";

const primaryBtn =
  "inline-flex rounded-full bg-[var(--color-roncy-teal)] px-10 py-4 font-[family-name:var(--font-display)] text-base font-extrabold text-white shadow-[0_12px_40px_rgba(0,212,200,0.45)] transition hover:-translate-y-0.5 hover:bg-[#00e5d8] hover:shadow-[0_16px_48px_rgba(0,212,200,0.55)]";

export function GamePageHero({ game }: { game: Game }) {
  const fallbackPlay = resolvePlayCTA(game);
  const showWebFirst = Boolean(game.webUrl);
  const hasStores = Boolean(game.appStoreUrl || game.playStoreUrl);

  return (
    <section className="relative h-[min(88dvh,920px)] w-full overflow-hidden bg-[var(--color-roncy-navy)]">
      <Image
        src={game.heroImage}
        alt={`${game.title} — key art`}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/75 to-[#0f172a]/35"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/55 via-transparent to-[#0f172a]/25" aria-hidden />

      <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-2 sm:top-8 sm:right-8">
        <Link
          href={`/games/${game.slug}/support`}
          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold tracking-wide text-white uppercase backdrop-blur-md transition hover:border-white/40 hover:bg-white/20"
        >
          Support
        </Link>
        <Link
          href={`/games/${game.slug}/privacy`}
          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold tracking-wide text-white uppercase backdrop-blur-md transition hover:border-white/40 hover:bg-white/20"
        >
          Privacy
        </Link>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-12 pt-24 sm:px-10 sm:pb-16 lg:px-[52px] lg:pb-20">
        <Breadcrumb
          light
          items={[{ href: "/games", label: "Games" }, { label: game.title }]}
        />
        <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,3.75rem)] font-black tracking-tight text-white drop-shadow-sm">
          {game.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/88">{game.shortDescription}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {game.playUrl ? (
            <a
              href={game.playUrl}
              rel="noopener noreferrer"
              target="_blank"
              className={primaryBtn}
            >
              {game.playButtonLabel ?? "Play now"}
            </a>
          ) : null}

          {!game.playUrl && showWebFirst && game.webUrl ? (
            <a href={game.webUrl} rel="noopener noreferrer" target="_blank" className={primaryBtn}>
              {game.playButtonLabel ?? "Play Online"}
            </a>
          ) : null}

          {!game.playUrl && !showWebFirst && fallbackPlay ? (
            <a
              href={fallbackPlay.href}
              rel="noopener noreferrer"
              target="_blank"
              className={primaryBtn}
            >
              {fallbackPlay.label}
            </a>
          ) : null}

          {!game.playUrl && showWebFirst && hasStores ? (
            <>
              {game.appStoreUrl ? (
                <a
                  href={game.appStoreUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={outlineBtn}
                >
                  App Store
                </a>
              ) : null}
              {game.playStoreUrl ? (
                <a
                  href={game.playStoreUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={outlineBtn}
                >
                  Google Play
                </a>
              ) : null}
            </>
          ) : null}

          {!game.playUrl && !fallbackPlay && !showWebFirst ? (
            <span className="inline-flex rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-[family-name:var(--font-display)] text-sm font-extrabold text-white/70 backdrop-blur-sm">
              Coming soon
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
