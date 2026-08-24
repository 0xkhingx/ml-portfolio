"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";
import { CURRENT_TRACK } from "@/data/now-playing";
import type { NowPlayingData } from "@/types";

const POLL_INTERVAL_MS = 30_000;

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/spotify/now-playing", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      const next = (await response.json()) as NowPlayingData;
      setData(next);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    const refresh = () => {
      if (!document.hidden) void load();
    };

    const initial = setTimeout(refresh, 0);
    document.addEventListener("visibilitychange", refresh);
    const interval = setInterval(refresh, POLL_INTERVAL_MS);

    return () => {
      clearTimeout(initial);
      document.removeEventListener("visibilitychange", refresh);
      clearInterval(interval);
    };
  }, [load]);

  const liveTrack =
    !failed && data !== null && data.configured && data.track ? data.track : null;
  const track = liveTrack ?? CURRENT_TRACK;
  const isLive = liveTrack !== null && data?.isPlaying === true;
  const eyebrow = isLive
    ? "now playing"
    : liveTrack
      ? "recently played"
      : "on repeat";

  return (
    <aside className="border-l-2 border-foreground/10 pl-5">
      <FadeIn y={12}>
        <p className="flex items-center gap-2 text-xs lowercase tracking-wide text-foreground/50">
          {isLive ? (
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="size-1.5 rounded-full bg-foreground/70"
            />
          ) : (
            <span className="size-1.5 rounded-full bg-foreground/30" />
          )}
          {eyebrow}
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${track.name}-${track.artist}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 flex items-start gap-4"
          >
            {track.imageUrl ? (
              <Image
                src={track.imageUrl}
                alt={`${track.album} album cover`}
                width={64}
                height={64}
                className="size-16 rounded-sm object-cover"
              />
            ) : (
              <div className="size-16 rounded-sm border border-foreground/10 bg-foreground/5" />
            )}
            <div className="min-w-0 flex-1">
              {track.url ? (
                <a
                  href={track.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm leading-snug decoration-[1px] underline-offset-[3px] transition-colors hover:text-foreground/70 hover:underline"
                >
                  {track.name}
                </a>
              ) : (
                <p className="text-sm leading-snug">{track.name}</p>
              )}
              <p className="mt-1 text-xs text-foreground/60">{track.artist}</p>
              <p className="mt-2 text-xs text-foreground/50">from {track.album}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </FadeIn>
    </aside>
  );
}
