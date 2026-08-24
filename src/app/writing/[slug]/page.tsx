import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { renderMarkdown } from "@/lib/markdown";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/post-utils";

interface WritingPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: WritingPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getPostBySlug(slug);

  if (!result) {
    return {};
  }

  return { title: result.post.title, description: result.post.description };
}

export default async function WritingPostPage({
  params,
}: WritingPostPageProps) {
  const { slug } = await params;
  const result = getPostBySlug(slug);

  if (!result) {
    notFound();
  }

  const { post, body } = result;
  const html = await renderMarkdown(body);

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-6 pb-24 pt-36 md:pt-44">
      <FadeIn>
        <Link
          href="/writing"
          className="inline-block font-mono text-xs lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
        >
          ← all writing
        </Link>
      </FadeIn>

      <FadeIn delay={0.05} y={16}>
        <h1 className="mt-10 font-heading text-3xl font-medium tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 font-mono text-xs lowercase text-foreground/50">
          {formatDate(post.date)} · {post.minutes} min read
        </p>
        <hr className="mt-10 border-t border-foreground/10" />
      </FadeIn>

      <FadeIn delay={0.12} y={16}>
        <div
          className="post-body mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </FadeIn>
    </div>
  );
}
