import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Roncyo — Websites, Games, AI Automation & SaaS";
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
          background: "#050505",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#03d8cb",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Roncyo
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 58,
            fontWeight: 600,
            lineHeight: 1.1,
            maxWidth: 920,
          }}
        >
          Websites. Games. Automation. SaaS.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Custom software and product builds — contact us to commission.
        </div>
      </div>
    ),
    { ...size },
  );
}
