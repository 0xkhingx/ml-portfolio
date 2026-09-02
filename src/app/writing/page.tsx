import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { getAllPosts } from "@/lib/posts";
import { getSubstackPosts } from "@/lib/substack";
import { formatDate, groupByYear } from "@/lib/post-utils";

export const metadata: Metadata = {
  title: "Writing",
};

export const revalidate = 3600;

interface Entry {
  key: string;
  title: string;
  date: string;
  description: string;
  minutes: number;
  href: string;
  external: boolean;
}

export default async function WritingPage() {
  const localPosts = getAllPosts();
  const substackPosts = await getSubstackPosts();

  const entries: Entry[] = [
    ...localPosts.map((post) => ({
      key: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
      minutes: post.minutes,
      href: `/writing/${post.slug}`,
      external: false,
    })),
    ...substackPosts.map((post) => ({
      key: post.url,
      title: post.title,
      date: post.date,
      description: post.description,
      minutes: post.minutes,
      href: post.url,
      external: true,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const groups = groupByYear(entries);

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <FadeIn>
        <p className="text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm sm:tracking-[0.25em]">
          writing
        </p>
        <h1 className="mt-3 text-balance font-heading text-[32px] font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
          essays &amp; notes
        </h1>
      </FadeIn>

      {groups.length === 0 ? (
        <p className="mt-12 text-pretty text-[15px] leading-relaxed text-foreground/60 sm:mt-16 sm:text-base">
          nothing published yet — first pieces are in progress.
        </p>
      ) : (
        <div className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">
          {groups.map(([year, posts]) => (
            <section key={year}>
              <FadeIn y={12}>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs lowercase text-foreground/50 sm:text-sm">
                    {year}
                  </span>
                  <span className="h-px flex-1 bg-foreground/10" />
                </div>
              </FadeIn>
              <div className="mt-6 space-y-8 sm:mt-8 sm:space-y-10">
                {posts.map((entry, index) => {
                  const rowClasses =
                    "group relative block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40";
                  return (
                    <FadeIn key={entry.key} delay={index * 0.08} y={16}>
                      <article>
                        {entry.external ? (
                          <a
                            href={entry.href}
                            target="_blank"
                            rel="noreferrer"
                            className={rowClasses}
                          >
                            <EntryBody entry={entry} />
                          </a>
                        ) : (
                          <Link href={entry.href} className={rowClasses}>
                            <EntryBody entry={entry} />
                          </Link>
                        )}
                      </article>
                    </FadeIn>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function EntryBody({ entry }: { entry: Entry }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4 sm:gap-6">
        <h2 className="relative min-w-0 text-pretty font-heading text-[22px] font-medium leading-tight decoration-[1px] underline-offset-4 group-hover:underline sm:text-2xl md:text-3xl">
          <span
            aria-hidden="true"
            className="absolute -left-5 hidden size-1.5 rounded-full bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
          />
          {entry.title}
        </h2>
        {entry.external && (
          <span
            aria-hidden="true"
            className="hidden shrink-0 font-mono text-sm text-foreground/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
          >
            ↗
          </span>
        )}
      </div>
      <p className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-xs lowercase text-foreground/50 sm:gap-3 sm:text-sm">
        <span>
          {formatDate(entry.date)} · {entry.minutes} min
        </span>
        {entry.external && (
          <span className="text-foreground/30">· substack</span>
        )}
      </p>
      <p className="mt-2 line-clamp-3 max-w-xl text-pretty text-[15px] leading-[1.65] text-foreground/60 sm:mt-2 sm:line-clamp-2 sm:text-base sm:leading-relaxed">
        {entry.description}
      </p>
    </>
  );
}
