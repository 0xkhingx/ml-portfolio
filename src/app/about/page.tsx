import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { RESUME_URL } from "@/data/socials";
import { EXPERIENCE, MANIFESTO, STACK } from "@/data/experience";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <FadeIn>
        <p className="text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm sm:tracking-[0.25em]">
          about
        </p>
        <div className="mt-5 size-16 overflow-hidden rounded-full border border-foreground/10 bg-foreground/[0.04] sm:mt-6 sm:size-20 md:size-24">
          <Image
            src="/images/profile.jpg"
            alt="Portrait of Oluwadamilare"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="mt-5 text-balance font-heading text-[32px] font-medium leading-[1.05] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl">
          Machine learning,
          <br />
          human touch
        </h1>
      </FadeIn>

      <FadeIn delay={0.08} y={16}>
        <p className="mt-8 max-w-xl text-pretty text-[17px] leading-[1.7] text-foreground/80 sm:mt-10 sm:text-lg sm:leading-relaxed md:text-xl">
          {MANIFESTO}
        </p>
      </FadeIn>

      <FadeIn delay={0.14} y={16}>
        <div className="mt-12 flex items-center gap-4 sm:mt-16">
          <span className="font-mono text-xs lowercase text-foreground/50 sm:text-sm">
            experience
          </span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>
      </FadeIn>

      <div>
        {EXPERIENCE.map((entry, index) => (
          <FadeIn key={entry.role} delay={0.18 + index * 0.06} y={16}>
            <div
              className={
                index === 0 ? "py-6 sm:py-7" : "border-t border-foreground/10 py-6 sm:py-7"
              }
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <h2 className="text-pretty font-heading text-[19px] font-medium leading-tight sm:text-xl md:text-2xl">
                    {entry.role}
                  </h2>
                  <p className="mt-1 text-[14px] text-foreground/60 sm:text-base">{entry.org}</p>
                </div>
                <span className="font-mono text-xs lowercase text-foreground/50 sm:shrink-0 sm:text-sm">
                  {entry.period}
                </span>
              </div>
              <p className="mt-2 max-w-xl text-pretty text-[15px] leading-[1.65] text-foreground/60 sm:text-base sm:leading-relaxed">
                {entry.summary}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.32} y={16}>
        <div className="mt-10 flex items-center gap-4 sm:mt-12">
          <span className="font-mono text-xs lowercase text-foreground/50 sm:text-sm">
            stack
          </span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>
      </FadeIn>

      <div className="mt-6 space-y-6 sm:mt-8">
        {STACK.map((group) => (
          <FadeIn key={group.label} delay={0.36} y={16}>
            <div>
              <p className="font-mono text-xs lowercase text-foreground/40 sm:text-sm">
                {group.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-foreground/15 px-2.5 py-1 font-mono text-xs lowercase text-foreground/60 sm:px-3 sm:py-1 sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.42} y={16}>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex items-center gap-2 font-mono text-xs lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:mt-16 sm:text-sm"
        >
          resume <span aria-hidden="true">↗</span>
        </a>
      </FadeIn>
    </div>
  );
}
