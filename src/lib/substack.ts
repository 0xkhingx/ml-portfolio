import type { ExternalPost } from "@/types";

const FEED_TIMEOUT_MS = 10_000;
export const SUBSTACK_REVALIDATE_SECONDS = 3600;

function decodeCdata(raw: string): string {
  const match = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (match ? match[1] : raw).trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(item: string, tag: string): string {
  const match = item.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"),
  );
  return match ? decodeCdata(match[1]) : "";
}

function truncate(text: string, max = 180): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function normalizeDate(value: string): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

function parseFeed(xml: string): ExternalPost[] {
  return xml
    .split("<item>")
    .slice(1)
    .map((chunk) => chunk.split("</item>")[0])
    .map((item) => {
      const title = extractTag(item, "title");
      const link = extractTag(item, "link");
      const pubDate = extractTag(item, "pubDate");
      const rawContent =
        extractTag(item, "content:encoded") || extractTag(item, "description");
      const text = stripHtml(rawContent);
      const words = text.split(/\s+/).filter(Boolean).length;

      return {
        title,
        url: link,
        date: normalizeDate(pubDate),
        description: truncate(text),
        minutes: Math.max(1, Math.ceil(words / 200)),
      };
    })
    .filter((post) => post.title && post.url && post.date)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20);
}

export async function getSubstackPosts(): Promise<ExternalPost[]> {
  const url = process.env.SUBSTACK_FEED_URL;

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: SUBSTACK_REVALIDATE_SECONDS },
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
    });

    if (!response.ok) {
      return [];
    }

    return parseFeed(await response.text());
  } catch {
    return [];
  }
}
