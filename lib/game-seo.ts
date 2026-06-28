import type { Game } from "@/lib/games";
import { platformLabel } from "@/lib/platforms";
import { absoluteUrl } from "@/lib/site";

const OS_LABELS: Record<Game["platforms"][number], string> = {
  ios: "iOS",
  android: "Android",
  web: "Web browser",
  telegram: "Telegram",
  tiktok: "TikTok",
};

export function gameOperatingSystems(game: Game) {
  return game.platforms.map((p) => OS_LABELS[p]).join(", ");
}

function resolveOfferUrl(game: Game, slug: string) {
  return (
    game.playUrl ??
    game.playStoreUrl ??
    game.appStoreUrl ??
    game.webUrl ??
    game.telegramUrl ??
    absoluteUrl(`/games/${slug}`)
  );
}

function resolveGameImage(game: Game) {
  const image = game.logoUrl ?? game.heroImage;
  return image.startsWith("http") ? image : absoluteUrl(image);
}

export function buildGameplayContent(game: Game, publisherName: string) {
  const platformText = game.platforms.map((p) => platformLabel(p)).join(", ");
  const categoryText =
    game.categories?.length ? game.categories.join(", ") : game.genre;

  const intro = `${game.title} is a ${game.genre.toLowerCase()} title from ${publisherName}. ${game.shortDescription} Whether you want a quick session or a longer run, the game is built for accessible, rewarding play on ${platformText}.`;

  const expandedParagraphs = [
    game.about,
    game.story,
    `Core gameplay highlights include ${game.features.slice(0, 3).join(", ")}${game.features.length > 3 ? ", and more" : ""}. ${game.title} fits players who enjoy ${categoryText.toLowerCase()} experiences with clear goals and steady progression.`,
    game.howToPlay?.length
      ? `Getting started is straightforward: ${game.howToPlay.join(" ")}`
      : `Pick up ${game.title}, follow the on-screen tutorial, and start progressing through levels at your own pace.`,
    game.size
      ? `The current build (${game.version ?? "latest"}) requires approximately ${game.size} of storage where applicable. Supported languages include ${game.languages?.join(", ") ?? "English"}.`
      : `Supported platforms include ${platformText}. Check the download section above for the fastest install path on your device.`,
  ].filter(Boolean) as string[];

  return { intro, expandedParagraphs };
}

export type GameFaqItem = { question: string; answer: string };

export function buildGameFaq(game: Game, publisherName: string, slug: string): GameFaqItem[] {
  const platformText = game.platforms.map((p) => platformLabel(p)).join(", ");
  const installSteps: string[] = [];

  if (game.platforms.includes("android") && game.playStoreUrl) {
    installSteps.push(`open Google Play and install from the official listing`);
  }
  if (game.platforms.includes("ios") && game.appStoreUrl) {
    installSteps.push(`download from the App Store`);
  }
  if (game.platforms.includes("web") && (game.playUrl || game.webUrl)) {
    installSteps.push(`play instantly in your web browser without a separate install`);
  }
  if (game.platforms.includes("telegram") && game.telegramUrl) {
    installSteps.push(`launch the Telegram Mini App from the official bot link`);
  }

  const installAnswer =
    installSteps.length > 0
      ? `Visit this page on ${platformText}, then ${installSteps.join(", or ")}. All links on Roncy point to verified publisher listings for ${game.title}.`
      : `Open the download section on this page, choose ${platformText}, and follow the store or browser prompt to add ${game.title} to your device.`;

  const isFree =
    game.playUrl || game.playStoreUrl || game.appStoreUrl || game.webUrl || game.telegramUrl;

  return [
    {
      question: `How do I install and download ${game.title}?`,
      answer: installAnswer,
    },
    {
      question: `Is ${game.title} free to play?`,
      answer: isFree
        ? `${game.title} is free to download and play on Roncy. ${game.title} may include optional in-app purchases depending on the platform store listing, but you can start playing at no upfront cost.`
        : `${game.title} is listed on Roncy as a free-to-try title. Check the platform store page for any optional purchases before installing.`,
    },
    {
      question: `What are the system requirements for ${game.title}?`,
      answer: `${game.title} runs on ${platformText}.${game.size ? ` The app package is about ${game.size}.` : ""} For mobile installs, use a recent version of Android or iOS with enough free storage. For browser play, use an up-to-date Chrome, Safari, Firefox, or Edge browser with a stable internet connection.`,
    },
    {
      question: `Who publishes ${game.title} and where can I get help?`,
      answer: `${game.title} is published by ${publisherName}. For account, billing, or gameplay questions, visit the Support page at ${absoluteUrl(`/games/${slug}/support`)} or email ${game.companyEmail ?? "support@roncyo.com"}.`,
    },
  ];
}

export function buildGameChangelog(game: Game) {
  const version = game.version ?? "1.0.0";
  const date = game.lastUpdated ?? game.releaseDate ?? "Recent update";
  const entries: string[] = [];

  if (game.progressNote) entries.push(game.progressNote);
  if (game.knownIssues) entries.push(`Known issues: ${game.knownIssues}`);
  if (entries.length === 0) {
    entries.push(
      `Performance improvements and stability fixes for ${game.platforms.map((p) => OS_LABELS[p]).join(", ")} builds.`,
      `Updated store metadata, screenshots, and compatibility notes on Roncy.`,
    );
  }

  return { version, date, entries };
}

/** Valid schema.org VideoGame JSON-LD — omits invalid aggregateRating when review count is zero. */
export function gameVideoGameJsonLd(game: Game, slug: string, publisherName: string) {
  const url = absoluteUrl(`/games/${slug}`);
  const offerUrl = resolveOfferUrl(game, slug);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": `${url}#videogame`,
    name: game.title,
    description: game.shortDescription,
    genre: game.genre,
    gamePlatform: game.platforms.map((p) => OS_LABELS[p]),
    operatingSystem: gameOperatingSystems(game),
    applicationCategory: "Game",
    url,
    image: resolveGameImage(game),
    author: {
      "@type": "Organization",
      name: publisherName,
      url: game.companyWebsite ?? absoluteUrl("/"),
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: offerUrl.startsWith("http") ? offerUrl : absoluteUrl(offerUrl),
    },
  };

  if (game.version) jsonLd.softwareVersion = game.version;
  if (game.releaseDate) jsonLd.datePublished = game.releaseDate;

  if (game.rating != null && game.reviewCount != null && game.reviewCount > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: game.rating,
      reviewCount: game.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return jsonLd;
}
