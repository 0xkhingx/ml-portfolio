import { getSpotifyAuthUrl, hasClientCredentials } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasClientCredentials()) {
    return new Response(
      "Spotify login is not set up yet. Add SPOTIFY_CLIENT_ID and SPOTIFY_REDIRECT_URI to .env.local first.",
      { status: 503 }
    );
  }

  return Response.redirect(getSpotifyAuthUrl(), 302);
}
