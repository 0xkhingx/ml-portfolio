import { fetchLiveTrack, fetchRecentTrack, isFullyConfigured } from "@/lib/spotify";
import type { NowPlayingData } from "@/types";

export const dynamic = "force-dynamic";

const UPSTREAM_INTERVAL_MS = 15_000;

let upstreamCache: { body: string; fetchedAt: number } | null = null;

function jsonResponse(body: string): Response {
  return new Response(body, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(): Promise<Response> {
  if (!isFullyConfigured()) {
    upstreamCache = null;
    return jsonResponse(JSON.stringify({ configured: false }));
  }

  const now = Date.now();
  if (upstreamCache && now - upstreamCache.fetchedAt < UPSTREAM_INTERVAL_MS) {
    return jsonResponse(upstreamCache.body);
  }

  let payload: NowPlayingData;

  try {
    const live = await fetchLiveTrack();

    if (live) {
      payload = { configured: true, isPlaying: true, track: live };
    } else {
      const recent = await fetchRecentTrack().catch(() => null);
      payload = { configured: true, isPlaying: false, track: recent };
    }
  } catch {
    payload = { configured: false };
  }

  const body = JSON.stringify(payload);
  upstreamCache = { body, fetchedAt: Date.now() };

  return jsonResponse(body);
}
