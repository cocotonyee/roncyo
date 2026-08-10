"use client";

import { getDailyDestCard } from "@/lib/destcard-demo";
import { useEffect, useId, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";

function BrandMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      fill="none"
      aria-hidden
    >
      <path
        d="M11.2 6.8c-3.6 2.2-5.4 5.8-5.2 10.2.3 5.4 3.2 9.4 8.2 12.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M24.8 6.8c3.6 2.2 5.4 5.8 5.2 10.2-.3 5.4-3.2 9.4-8.2 12.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M13.4 8.6c-2.6 1.7-3.9 4.5-3.7 8 .2 4.2 2.4 7.3 6.3 9.9"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.82"
      />
      <path
        d="M22.6 8.6c2.6 1.7 3.9 4.5 3.7 8-.2 4.2-2.4 7.3-6.3 9.9"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.82"
      />
      <path
        d="M15.4 10.6c-1.55 1.15-2.35 3-2.2 5.35.2 3 1.55 5.2 4.4 7.15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.74"
      />
      <path
        d="M20.6 10.6c1.55 1.15 2.35 3 2.2 5.35-.2 3-1.55 5.2-4.4 7.15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.74"
      />
      <path
        d="M18 12.4c.95 0 1.7.75 1.7 1.7 0 1.35-.7 2.35-1.7 3.25-.95-.85-1.65-1.85-1.65-3.2 0-.95.7-1.75 1.65-1.75"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/** Round SVG coords so Node/browser float trig can't drift and break hydration. */
function svgCoord(n: number) {
  return Math.round(n * 1e4) / 1e4;
}

function Starburst({
  gradientId,
  soft,
  mid,
  line,
}: {
  gradientId: string;
  soft: string;
  mid: string;
  line: string;
}) {
  const rays = useMemo(() => {
    const deg = Math.PI / 180;
    return Array.from({ length: 16 }, (_, i) => {
      const angle = ((i * 360) / 16) * deg;
      return {
        angle,
        inner: 22,
        length: 48 + (i % 2) * 20,
        opacity: 0.22 + (i % 3) * 0.1,
        dashed: i % 4 === 0,
      };
    });
  }, []);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={soft} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={line} stopOpacity={0} />
        </linearGradient>
      </defs>
      <g transform="translate(100, 100)">
        {rays.map((ray, i) => {
          const cos = Math.cos(ray.angle);
          const sin = Math.sin(ray.angle);
          const outer = ray.inner + ray.length;
          return (
            <line
              key={i}
              x1={svgCoord(cos * ray.inner)}
              y1={svgCoord(sin * ray.inner)}
              x2={svgCoord(cos * outer)}
              y2={svgCoord(sin * outer)}
              stroke={`url(#${gradientId})`}
              strokeWidth={0.8}
              strokeOpacity={ray.opacity}
              strokeDasharray={ray.dashed ? "2 2" : undefined}
            />
          );
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const d = 42 + (i % 3) * 12;
          return (
            <circle
              key={`d-${i}`}
              cx={svgCoord(Math.cos(a) * d)}
              cy={svgCoord(Math.sin(a) * d)}
              r={1.2}
              fill={mid}
              fillOpacity={0.35}
            />
          );
        })}
      </g>
    </svg>
  );
}

function HoloFoil({ soft = false }: { soft?: boolean }) {
  return (
    <div className={`dc-holo-foil${soft ? " dc-holo-foil--soft" : ""}`} aria-hidden>
      <div className="dc-holo-foil__metal" />
      <div className="dc-holo-foil__glare" />
      <div className="dc-holo-foil__sparkle" />
    </div>
  );
}

/** Bare DestCard soul card - daily rotating archetype, no phone chrome. */
export function DestCardPhoneDemo() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [daily, setDaily] = useState(() => getDailyDestCard());
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    setDaily(getDailyDestCard(new Date()));
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setFlipped((v) => !v), 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const { archetype, colors, cores, iconSrc, dateLabel } = daily;
  const role = archetype.title.toUpperCase().startsWith("THE ")
    ? archetype.title.toUpperCase()
    : `THE ${archetype.title.toUpperCase()}`;

  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col items-center px-2">
      <button
        type="button"
        aria-label={flipped ? "Show card front" : "Flip soul card"}
        aria-pressed={flipped}
        onClick={() => setFlipped((v) => !v)}
        className="dc-holo w-full outline-none"
      >
        <div className="dc-flip__stage dc-flip__stage--hero">
          <div className={`dc-flip__inner${flipped ? " is-flipped" : ""}`}>
            <div className="dc-flip__side dc-flip__side--front">
              <article
                className="relative h-full w-full overflow-hidden rounded-[14px] border bg-[#0A0A0E] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                style={{ borderColor: `${colors.mid}55` }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 44%, ${colors.wash} 0%, #0A0A0E 52%, #050508 100%)`,
                  }}
                />
                <HoloFoil />
                <div className="dc-bank__hero" aria-hidden>
                  <div
                    className="dc-bank__glow"
                    style={{ background: colors.glow }}
                  />
                  <div className="dc-bank__burst">
                    <Starburst
                      gradientId={`dc-grad-${uid}`}
                      soft={colors.soft}
                      mid={colors.mid}
                      line={colors.line}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={iconSrc}
                      alt=""
                      width={88}
                      height={88}
                      className="relative z-10 drop-shadow-[0_0_18px_rgba(232,200,114,0.45)]"
                      draggable={false}
                    />
                  </div>
                </div>
                <div className="dc-bank relative z-10">
                  <div className="dc-bank__top">
                    <span style={{ color: colors.line }}>
                      <BrandMark size={20} />
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.14em] uppercase"
                      style={{ color: colors.muted }}
                    >
                      {dateLabel}
                    </span>
                  </div>
                  <div className="dc-bank__mid">
                    <h4
                      className="dc-bank__role"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${colors.line}, ${colors.mid}, ${colors.line})`,
                      }}
                    >
                      {role}
                    </h4>
                  </div>
                </div>
              </article>
            </div>

            <div className="dc-flip__side dc-flip__side--back">
              <article
                className="relative h-full w-full overflow-hidden rounded-[14px] border bg-[#0A0A0E] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                style={{ borderColor: `${colors.mid}55` }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 40% 50%, ${colors.wash} 0%, #0A0A0E 55%, #050508 100%)`,
                  }}
                />
                <HoloFoil soft />
                <div className="dc-bank dc-bank--back relative z-10">
                  <div className="dc-bank__top">
                    <div
                      className="inline-flex items-center gap-1.5"
                      style={{ color: colors.line }}
                    >
                      <BrandMark size={14} />
                      <span className="font-mono text-[9px] font-semibold tracking-[0.1em] uppercase opacity-90">
                        DestCard
                      </span>
                    </div>
                    <span
                      className="font-mono text-[9px] tracking-[0.16em] uppercase"
                      style={{ color: `${colors.line}b3` }}
                    >
                      NO. {String(archetype.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div
                    className="dc-back-cores"
                    style={{ borderColor: `${colors.mid}33` }}
                  >
                    {cores.map((item) => (
                      <div key={item.label} className="dc-back-core">
                        <span
                          className="dc-back-core__l"
                          style={{ color: `${colors.line}80` }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="dc-back-core__n"
                          style={{ color: colors.line }}
                        >
                          {item.n}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p
                    className="dc-back-quote"
                    style={{ color: `${colors.line}e6` }}
                  >
                    &ldquo;{archetype.tagline}&rdquo;
                  </p>

                  <p
                    className="font-mono text-[9px] tracking-[0.18em] uppercase"
                    style={{ color: `${colors.line}99` }}
                  >
                    {archetype.name.replace(/^The\s+/i, "").toUpperCase()}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] tracking-[0.08em] text-stone-500 uppercase">
          {flipped ? "Tap for front" : "Today's card · tap to flip"}
        </p>
      </button>
    </div>
  );
}
