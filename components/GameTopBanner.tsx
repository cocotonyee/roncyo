"use client";

import Image from "next/image";
import { useState } from "react";
import type { Game } from "@/lib/games";

function DefaultGameBanner({ game }: { game: Game }) {
  return (
    <div
      className="relative h-44 w-full overflow-hidden min-[960px]:h-56"
      style={{
        background: `linear-gradient(135deg, var(--color-cozy-cream) 0%, var(--color-cozy-sage) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-16 right-[10%] size-56 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[15%] size-40 rounded-full bg-[var(--color-cozy-terracotta)]/15 blur-2xl"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-20" aria-hidden>
        <span className="text-[120px] leading-none min-[960px]:text-[160px]">{game.cardEmoji}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
    </div>
  );
}

export function GameTopBanner({ game }: { game: Game }) {
  const [imageFailed, setImageFailed] = useState(false);
  const url = game.topBannerUrl;
  const useDefault = !url || imageFailed;

  if (useDefault) {
    return <DefaultGameBanner game={game} />;
  }

  return (
    <div className="relative h-44 w-full min-[960px]:h-56">
      <Image
        src={url}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        onError={() => setImageFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/55 to-transparent" />
    </div>
  );
}
