import { notFound } from "next/navigation";
import { YxkTrialPlayer } from "@/components/YxkTrialPlayer";
import { games, getGameBySlug } from "@/lib/games";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return games.filter((g) => g.yxkGameId).map((g) => ({ slug: g.slug }));
}

export default async function GameTrialPage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game?.yxkGameId || !game.playUrl?.endsWith("/trial")) notFound();

  return (
    <YxkTrialPlayer
      gameId={game.yxkGameId}
      title={game.title}
      landscape={game.trialLandscape}
      backHref={`/games/${slug}`}
    />
  );
}
