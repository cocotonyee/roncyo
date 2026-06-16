import { NextResponse } from "next/server";

const YXK_BASE = "https://yxk.jyb99999.cn";

type TrialResponse = {
  code: number;
  url?: string;
  msg?: string;
};

export async function GET(request: Request) {
  const gameId = new URL(request.url).searchParams.get("gameId");
  if (!gameId || !/^\d+$/.test(gameId)) {
    return NextResponse.json({ error: "Invalid gameId" }, { status: 400 });
  }

  try {
    const res = await fetch(`${YXK_BASE}/api/trial-token?game_id=${gameId}`, {
      headers: { "User-Agent": "roncy-website/1.0" },
      next: { revalidate: 0 },
    });
    const data = (await res.json()) as TrialResponse;
    if (data.code === 0 && data.url) {
      const url = data.url.startsWith("http") ? data.url : `${YXK_BASE}${data.url}`;
      return NextResponse.json({ url });
    }
    return NextResponse.json(
      { error: data.msg ?? "Trial unavailable" },
      { status: 502 },
    );
  } catch {
    return NextResponse.json({ error: "Failed to reach trial server" }, { status: 502 });
  }
}
