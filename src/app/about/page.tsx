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
    <div className="mx-auto min-h-screen w-full max-w-2xl px-6 pb-24 pt-36 md:pt-44">
      <FadeIn>
        <p className="text-sm lowercase tracking-[0.25em] text-foreground/50">
          about
        </p>
        <div className="mt-6 size-20 overflow-hidden rounded-full border border-foreground/10 bg-foreground/[0.04] md:size-24">
          <Image
            src="/images/profile.jpg"
            alt="Portrait of Oluwadamilare"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight md:text-5xl">
          Machine learning,
          <br />
          human touch
        </h1>
      </FadeIn>

      <FadeIn delay={0.08} y={16}>
        <p className="mt-10 max-w-xl text-xl leading-relaxed text-foreground/80">
          {MANIFESTO}
        </p>
      </FadeIn>

      <FadeIn delay={0.14} y={16}>
        <div className="mt-16 flex items-center gap-4">
          <span className="font-mono text-sm lowercase text-foreground/50">
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
                index === 0 ? "py-7" : "border-t border-foreground/10 py-7"
              }
            >
              <div className="flex items-baseline justify-between gap-6">
                <div className="min-w-0">
                  <h2 className="font-heading text-xl font-medium md:text-2xl">
                    {entry.role}
                  </h2>
                  <p className="mt-1 text-base text-foreground/60">{entry.org}</p>
                </div>
                <span className="shrink-0 font-mono text-sm lowercase text-foreground/50">
                  {entry.period}
                </span>
              </div>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-foreground/60">
                {entry.summary}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.32} y={16}>
        <div className="mt-12 flex items-center gap-4">
          <span className="font-mono text-sm lowercase text-foreground/50">
            stack
          </span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>
      </FadeIn>

      <div className="mt-8 space-y-6">
        {STACK.map((group) => (
          <FadeIn key={group.label} delay={0.36} y={16}>
            <div>
              <p className="font-mono text-sm lowercase text-foreground/40">
                {group.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-foreground/15 px-3 py-1 font-mono text-sm lowercase text-foreground/60"
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
          className="mt-16 inline-flex items-center gap-2 font-mono text-sm lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
        >
          resume <span aria-hidden="true">↗</span>
        </a>
      </FadeIn>
    </div>
  );
}
