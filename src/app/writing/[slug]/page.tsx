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
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <FadeIn>
        <Link
          href="/writing"
          className="inline-block font-mono text-xs lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:text-sm"
        >
          ← all writing
        </Link>
      </FadeIn>

      <FadeIn delay={0.05} y={16}>
        <h1 className="mt-8 text-pretty font-heading text-[28px] font-medium leading-[1.1] tracking-tight sm:mt-10 sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 flex flex-wrap gap-2 font-mono text-xs lowercase text-foreground/50 sm:mt-4 sm:text-sm">
          <span>{formatDate(post.date)}</span>
          <span className="text-foreground/25">·</span>
          <span>{post.minutes} min read</span>
        </p>
        <hr className="mt-8 border-t border-foreground/10 sm:mt-10" />
      </FadeIn>

      <FadeIn delay={0.12} y={16}>
        <div
          className="post-body mt-8 sm:mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </FadeIn>
    </div>
  );
}
