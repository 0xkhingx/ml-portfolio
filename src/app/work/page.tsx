import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { WorkList } from "@/components/work/work-list";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-40">
      <FadeIn>
        <p className="text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm sm:tracking-[0.25em]">
          work
        </p>
        <h1 className="mt-3 max-w-md text-balance font-heading text-[32px] font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-[44px]">
          Here&rsquo;s what I&rsquo;ve been building.
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-foreground/60 sm:text-base">
          A selection of products, experiments, and systems I&rsquo;ve built
          across software engineering, the web, and machine learning.
        </p>
      </FadeIn>

      <WorkList />
    </div>
  );
}
