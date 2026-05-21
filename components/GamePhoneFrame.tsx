"use client";

import { useCallback, useEffect, useRef } from "react";

type Props = {
  src: string;
  title: string;
};

/** Cocos/Godot need a resize event after the iframe gets its final size. */
export function GamePhoneFrame({ src, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const notifyResize = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    try {
      iframe.contentWindow.dispatchEvent(new Event("resize"));
    } catch {
      /* cross-origin — ignore */
    }
  }, []);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const ro = new ResizeObserver(() => {
      notifyResize();
    });
    ro.observe(screen);
    return () => ro.disconnect();
  }, [notifyResize]);

  return (
    <div
      className="flex h-[min(80vh,780px)] w-[min(100%,calc(min(80vh,780px)*9/19.5))] max-w-[340px] shrink-0 flex-col rounded-[2.25rem] border-[8px] border-[var(--color-cozy-brown)] bg-[var(--color-cozy-brown)] p-2 shadow-[0_24px_56px_rgba(93,64,55,0.18)]"
      aria-label="Phone preview"
    >
      <div className="mx-auto mb-1.5 h-4 w-16 shrink-0 rounded-full bg-black/25" aria-hidden />
      <div
        ref={screenRef}
        className="relative w-full overflow-hidden rounded-[1.65rem] bg-black"
        style={{ height: "calc(min(80vh, 780px) - 2.5rem)" }}
      >
        <iframe
          ref={iframeRef}
          title={title}
          src={src}
          className="absolute inset-0 block h-full w-full border-0"
          allow="fullscreen; gamepad; autoplay"
          onLoad={notifyResize}
        />
      </div>
      <div className="mx-auto mt-1.5 h-0.5 w-14 shrink-0 rounded-full bg-white/35" aria-hidden />
    </div>
  );
}
