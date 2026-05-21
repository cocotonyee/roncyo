import { redirect } from "next/navigation";
import { getAllSlugs, getGameBySlug } from "@/lib/games";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Legacy /play URL → unified game page */
export default async function GamePlayRedirect({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) redirect("/games");
  redirect(`/games/${slug}#play`);
}
