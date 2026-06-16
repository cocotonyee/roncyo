import Image from "next/image";
import type { Game } from "@/lib/games";

export function GameScreenshotGallery({ game }: { game: Game }) {
  if (!game.screenshots?.length) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-5 shadow-[0_2px_12px_rgba(0,43,80,0.04)] min-[960px]:p-6">
      <h2 className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-wide text-[var(--color-cozy-brown)] uppercase">
        Screenshots
      </h2>
      <ul className="mt-4 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {game.screenshots.map((src, i) => (
          <li key={src} className="shrink-0">
            <div className="relative h-[280px] w-[158px] overflow-hidden rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-[var(--color-cozy-surface)] shadow-[0_4px_16px_rgba(0,43,80,0.08)] min-[640px]:h-[320px] min-[640px]:w-[180px]">
              <Image
                src={src}
                alt={`${game.title} screenshot ${i + 1}`}
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
