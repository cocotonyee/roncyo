import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Roncyo — AI Business Automation Studio for local businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#03d8cb",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Roncyo
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Eliminate repetitive work for local businesses
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          AI automation for Australia &amp; New Zealand · Delivered in 72 hours
        </div>
      </div>
    ),
    { ...size },
  );
}
