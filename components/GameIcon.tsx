import Image from "next/image";
import type { Game } from "@/lib/games";

type Props = {
  game: Game;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { box: "size-[72px] rounded-[18px]", img: 72, emoji: "text-[36px]" },
  md: { box: "size-[88px] rounded-[22px]", img: 88, emoji: "text-[44px]" },
  lg: { box: "size-[120px] rounded-[28px]", img: 120, emoji: "text-[56px]" },
} as const;

export function GameIcon({ game, size = "md", className = "" }: Props) {
  const s = sizes[size];

  if (game.logoUrl) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden shadow-[0_8px_28px_rgba(0,43,80,0.12)] ${s.box} ${className}`}
      >
        <Image
          src={game.logoUrl}
          alt={`${game.title} icon`}
          width={s.img}
          height={s.img}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center shadow-[0_8px_28px_rgba(0,43,80,0.12)] ${s.box} ${s.emoji} ${className}`}
      style={{ background: game.cardColor }}
    >
      {game.cardEmoji}
    </div>
  );
}
