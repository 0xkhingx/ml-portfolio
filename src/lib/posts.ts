import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

interface RawPost extends Post {
  body: string;
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "").slice(0, 10);
}

function computeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function readRawPosts(): RawPost[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));

  const rawPosts: RawPost[] = [];

  for (const file of files) {
    const { data, content } = matter(
      fs.readFileSync(path.join(POSTS_DIR, file), "utf8"),
    );

    if (data.draft === true) {
      continue;
    }

    const slug = file.replace(/\.md$/, "");

    rawPosts.push({
      slug,
      title: String(data.title ?? slug),
      date: normalizeDate(data.date),
      description: String(data.description ?? ""),
      minutes:
        typeof data.minutes === "number" ? data.minutes : computeMinutes(content),
      body: content.trim(),
    });
  }

  return rawPosts.sort((a, b) => b.date.localeCompare(a.date));
}

let cached: RawPost[] | null = null;

function allRawPosts(): RawPost[] {
  if (!cached) {
    cached = readRawPosts();
  }
  return cached;
}

export function getAllPosts(): Post[] {
  return allRawPosts().map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    description: entry.description,
    minutes: entry.minutes,
  }));
}

export function getPostBySlug(
  slug: string,
): { post: Post; body: string } | undefined {
  const found = allRawPosts().find((entry) => entry.slug === slug);

  if (!found) {
    return undefined;
  }

  const { body, ...post } = found;
  return { post, body };
}
