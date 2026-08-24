import type { Track } from "@/types";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const SCOPES = ["user-read-currently-playing", "user-read-recently-played"];

interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyTrackItem {
  name: string;
  artists: { name: string }[];
  album?: { name: string; images: SpotifyImage[] };
  external_urls?: { spotify?: string };
}

interface SpotifyCurrentlyPlaying {
  item?: SpotifyTrackItem | null;
}

interface SpotifyRecentlyPlayed {
  items?: { track?: SpotifyTrackItem | null }[];
}

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

export function hasClientCredentials(): boolean {
  return Boolean(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_REDIRECT_URI);
}

export function isFullyConfigured(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REDIRECT_URI &&
      process.env.SPOTIFY_REFRESH_TOKEN
  );
}

export function getSpotifyAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? "",
    scope: SCOPES.join(" "),
  });
  return `${AUTHORIZE_ENDPOINT}?${params.toString()}`;
}

async function exchangeToken(body: URLSearchParams): Promise<SpotifyTokenResponse> {
  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed (${response.status})`);
  }

  return response.json();
}

export async function getAccessTokenFromCode(code: string): Promise<SpotifyTokenResponse> {
  return exchangeToken(
    new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? "",
    })
  );
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.accessToken;
  }

  const data = await exchangeToken(
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
    })
  );

  if (data.refresh_token && data.refresh_token !== process.env.SPOTIFY_REFRESH_TOKEN) {
    console.warn(
      "[spotify] refresh token was rotated by Spotify. Re-run /api/spotify/login and update SPOTIFY_REFRESH_TOKEN."
    );
  }

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.accessToken;
}

function normalizeTrack(item: SpotifyTrackItem): Track | null {
  if (!item.album) return null;

  return {
    name: item.name,
    artist: item.artists.map((artist) => artist.name).join(", "),
    album: item.album.name,
    imageUrl: item.album.images[0]?.url,
    url: item.external_urls?.spotify,
  };
}

async function spotifyGet<T>(url: string): Promise<T | null> {
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 204 || response.status === 404) {
    return null;
  }

  if (response.status === 401) {
    cachedToken = null;
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`Spotify request failed (${response.status})`);
  }

  return response.json();
}

async function spotifyGetWithRetry<T>(url: string): Promise<T | null> {
  try {
    return await spotifyGet<T>(url);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return spotifyGet<T>(url);
    }
    throw error;
  }
}

export async function fetchLiveTrack(): Promise<Track | null> {
  const data = await spotifyGetWithRetry<SpotifyCurrentlyPlaying>(
    CURRENTLY_PLAYING_ENDPOINT
  );
  if (!data?.item) return null;
  return normalizeTrack(data.item);
}

export async function fetchRecentTrack(): Promise<Track | null> {
  const data = await spotifyGetWithRetry<SpotifyRecentlyPlayed>(
    RECENTLY_PLAYED_ENDPOINT
  );
  const item = data?.items?.[0]?.track;
  if (!item) return null;
  return normalizeTrack(item);
}
