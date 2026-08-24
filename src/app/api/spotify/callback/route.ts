import { getAccessTokenFromCode, hasClientCredentials } from "@/lib/spotify";

export const dynamic = "force-dynamic";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function page(title: string, bodyHtml: string): Response {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body style="font-family:sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.6"><h1>${escapeHtml(title)}</h1>${bodyHtml}</body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const error = searchParams.get("error");
  if (error) {
    return page(
      "Authorization declined",
      `<p>Spotify said: <code>${escapeHtml(error)}</code></p>`
    );
  }

  const code = searchParams.get("code");
  if (!code) {
    return page("Missing code", "<p>No authorization code was returned by Spotify.</p>");
  }

  if (!hasClientCredentials() || !process.env.SPOTIFY_CLIENT_SECRET) {
    return page(
      "Not configured",
      "<p>Add SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REDIRECT_URI to .env.local first.</p>"
    );
  }

  try {
    const tokens = await getAccessTokenFromCode(code);

    if (!tokens.refresh_token) {
      return page(
        "No refresh token returned",
        "<p>Remove this app's access in your Spotify account settings, then run this flow again to get a fresh refresh token.</p>"
      );
    }

    return page(
      "Setup complete",
      `<p>Add this line to your <code>.env.local</code>:</p><pre style="background:#f4f3f1;padding:1rem;overflow-x:auto">SPOTIFY_REFRESH_TOKEN=${escapeHtml(tokens.refresh_token)}</pre><p>This page exists only for one-time setup.</p>`
    );
  } catch {
    return page(
      "Exchange failed",
      "<p>Could not exchange the authorization code for tokens. Check that your client secret and redirect URI are correct.</p>"
    );
  }
}
