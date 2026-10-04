import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { BookCallTrigger } from "@/components/booking/book-call";
import { AboutStrip } from "@/components/about/about-strip";
import { EXPERIENCE } from "@/data/experience";
import { EMAIL, SOCIALS } from "@/data/socials";

export const metadata: Metadata = {
  title: "About",
};

const FOOTER_SOCIALS = SOCIALS.filter((link) =>
  ["github", "linkedin", "x"].includes(link.label),
);

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full pb-20 sm:pb-24">
      <div className="mx-auto w-full max-w-5xl px-5 pt-28 sm:px-6 sm:pt-36 md:pt-44">
        <FadeIn>
          <p className="text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm sm:tracking-[0.25em]">
            about
          </p>
          <h1 className="mt-5 max-w-2xl text-balance font-heading text-[32px] font-medium leading-[1.05] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl">
            I&rsquo;m Dre, and I like building things that actually get used.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-foreground/60 sm:mt-6 sm:text-base">
            Software engineer working across the web, machine learning, and
            product-focused systems.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.1} y={16}>
        <div className="mt-10 sm:mt-14">
          <AboutStrip />
        </div>
      </FadeIn>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-5 pt-16 sm:px-6 sm:pt-24 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <FadeIn delay={0.05} y={16}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45 sm:text-[13px]">
              I like building things from the inside out
            </p>
            <p className="mt-4 text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
              Software first. Interface second. Both have to make sense.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} y={16}>
          <div className="max-w-xl space-y-5 text-pretty text-[15px] leading-[1.75] text-foreground/70 sm:text-base">
            <p>
              I got into software because I liked the idea that something could
              begin as a thought and end up as something another person could
              actually use.
            </p>
            <p>
              Most of my work sits somewhere between software engineering,
              machine learning and the web. I like understanding how things
              work underneath, but I care just as much about whether the final
              product feels clear and considered.
            </p>
            <p>
              Lately I&rsquo;ve been spending more time building complete
              products rather than isolated experiments — taking ideas from
              rough concepts through implementation, interface decisions and
              deployment.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-5 pt-16 sm:px-6 sm:pt-24 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <FadeIn delay={0.05} y={16}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45 sm:text-[13px]">
              Outside the editor
            </p>
            <p className="mt-4 text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
              Software isn&rsquo;t the whole story.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} y={16}>
          <div className="max-w-xl space-y-5 text-pretty text-[15px] leading-[1.75] text-foreground/70 sm:text-base">
            <p>
              Outside the editor I care about how things look and feel —
              architecture, digital art, and interfaces worth staring at.
              ArchitektureArt is what that looks like when I build it, and
              Moodmix exists because I wanted my playlists to keep up with my
              mood.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 pt-16 sm:px-6 sm:pt-24">
        <FadeIn>
          <p className="font-mono text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm">
            experience
          </p>
        </FadeIn>

        <div className="mt-8 border-b border-foreground/10 sm:mt-10">
          {EXPERIENCE.map((entry, index) => (
            <FadeIn key={entry.org} delay={0.06 + index * 0.06} y={12}>
              <div
                className={
                  index === 0
                    ? "pb-7 sm:pb-8"
                    : "border-t border-foreground/10 pb-7 pt-6 sm:pb-8 sm:pt-7"
                }
              >
                <p className="font-mono text-xs lowercase text-foreground/45 sm:text-[13px]">
                  {entry.period}
                </p>
                <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h2 className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {entry.org}
                  </h2>
                  <p className="shrink-0 text-sm lowercase tracking-wide text-foreground/45 sm:text-right">
                    {entry.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 pt-16 sm:px-6 sm:pt-24">
        <FadeIn>
          <h2 className="max-w-md text-balance font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            That&rsquo;s enough about me.
          </h2>
          <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-foreground/60 sm:text-base">
            If you&rsquo;re building something interesting, I&rsquo;d like to
            hear about it.
          </p>
          <div className="mt-4 flex flex-col items-start gap-2.5">
            <BookCallTrigger className="group/book inline-flex items-center gap-1.5 text-[15px] text-foreground/70 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:text-base">
              Book a call
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/book:translate-x-0.5 motion-reduce:transform-none"
              >
                ↗
              </span>
            </BookCallTrigger>
            <a
              href={`mailto:${EMAIL}`}
              className="group/mail inline-flex items-center gap-1.5 text-[15px] text-foreground/70 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:text-base"
            >
              Email me
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/mail:translate-x-0.5 motion-reduce:transform-none"
              >
                ↗
              </span>
            </a>
          </div>
        </FadeIn>
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 pt-12 sm:px-6 sm:pt-14">
        <div className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-6 font-mono text-xs lowercase tracking-wide text-foreground/45">
          <nav aria-label="Social links" className="flex items-center gap-4">
            {FOOTER_SOCIALS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p>Lagos, Nigeria — © 2026</p>
        </div>
      </div>
    </div>
  );
}
