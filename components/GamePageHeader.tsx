import { Breadcrumb } from "@/components/InnerPage";
import { GameIcon } from "@/components/GameIcon";
import { GameTopBanner } from "@/components/GameTopBanner";
import {
  MetaDot,
  MetaItem,
  PlatformIcon,
  PlatformIconRow,
  PublisherIcon,
  ShieldIcon,
  StarIcon,
  TagIcon,
  VersionIcon,
} from "@/components/StoreIcons";
import type { Game } from "@/lib/games";
import { getCompanyDisplay } from "@/lib/games";

const BADGE_LABELS: Record<NonNullable<Game["badges"]>[number], string> = {
  new: "New",
  featured: "Featured",
  "editor-choice": "Editor's Choice",
};

function StoreBadge({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-[var(--color-cozy-brown)]/12 bg-[var(--color-cozy-surface)] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
      {label}
    </span>
  );
}

export function GamePageHeader({ game }: { game: Game }) {
  const company = getCompanyDisplay(game);

  return (
    <header className="overflow-hidden border-b border-[var(--color-cozy-brown)]/10 bg-white">
      <GameTopBanner game={game} />

      <div className="px-5 py-6 min-[960px]:px-[52px] min-[960px]:py-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ href: "/games", label: "App Store" }]} />

          <div className="-mt-10 flex flex-col gap-5 min-[960px]:-mt-14 min-[960px]:flex-row min-[960px]:gap-8">
            <GameIcon game={game} size="lg" className="shrink-0 ring-4 ring-white" />

            <div className="flex min-w-0 flex-1 flex-col gap-5 min-[960px]:flex-row min-[960px]:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-black leading-tight text-[var(--color-cozy-brown)]">
                    {game.title}
                  </h1>
                  {game.badges?.map((badge) => (
                    <StoreBadge key={badge} label={BADGE_LABELS[badge]} />
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                  <PlatformIconRow platforms={game.platforms} />
                  <MetaDot />
                  <MetaItem icon={<TagIcon />}>{game.genre}</MetaItem>
                  {game.rating != null ? (
                    <>
                      <MetaDot />
                      <MetaItem icon={<StarIcon className="size-3.5 text-[var(--color-cozy-terracotta)]" />}>
                        {game.rating.toFixed(1)}
                        {game.reviewCount != null ? (
                          <span className="font-normal text-[var(--color-cozy-brown-muted)]/80">
                            {" "}
                            ({game.reviewCount.toLocaleString()})
                          </span>
                        ) : null}
                      </MetaItem>
                    </>
                  ) : null}
                  {game.contentRating ? (
                    <>
                      <MetaDot />
                      <MetaItem icon={<ShieldIcon />}>{game.contentRating}</MetaItem>
                    </>
                  ) : null}
                  {game.version ? (
                    <>
                      <MetaDot />
                      <MetaItem icon={<VersionIcon />}>v{game.version}</MetaItem>
                    </>
                  ) : null}
                </div>

                {company ? (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[var(--color-cozy-surface)] px-3 py-2">
                    <span className="inline-flex size-7 items-center justify-center rounded-md bg-white text-[var(--color-cozy-brown-muted)] shadow-sm">
                      <PublisherIcon className="size-4" />
                    </span>
                    <div className="min-w-0 text-sm leading-snug">
                      <span className="font-semibold text-[var(--color-cozy-brown)]">
                        {company.brandName}
                      </span>
                      {company.legalName ? (
                        <span className="text-[var(--color-cozy-brown-muted)]">
                          {" "}
                          · {company.legalName}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
                  {game.shortDescription}
                </p>
              </div>

              <div className="flex shrink-0 flex-row flex-wrap gap-2.5 min-[960px]:max-w-[220px] min-[960px]:flex-col min-[960px]:items-stretch">
                {game.playStoreUrl ? (
                  <a
                    href={game.playStoreUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-cozy-terracotta)] px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_6px_20px_rgba(0,210,106,0.35)] transition hover:-translate-y-0.5 min-[960px]:flex-none"
                  >
                    <PlatformIcon platform="android" className="size-4" />
                    Get
                  </a>
                ) : null}
                {game.telegramUrl ? (
                  <a
                    href={game.telegramUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_6px_20px_rgba(34,158,217,0.3)] transition hover:-translate-y-0.5 min-[960px]:flex-none"
                  >
                    <PlatformIcon platform="telegram" className="size-4" />
                    Telegram
                  </a>
                ) : null}
                {game.appStoreUrl ? (
                  <a
                    href={game.appStoreUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-cozy-brown)]/15 bg-white px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-cozy-brown)] transition hover:border-[var(--color-cozy-brown)]/30 min-[960px]:flex-none"
                  >
                    <PlatformIcon platform="ios" className="size-4" />
                    App Store
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
