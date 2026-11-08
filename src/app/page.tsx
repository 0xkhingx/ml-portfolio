import type { CSSProperties } from "react";
import { BookCallTrigger } from "@/components/booking/book-call";
import { LivingGradient } from "@/components/home/living-gradient";
import { SelectedWork } from "@/components/work/selected-work";
import { Experience } from "@/components/home/experience";

const HEADLINE = "I build software for the web and machine learning.";

export default function HomePage() {
  const words = HEADLINE.split(" ");

  return (
    <div className="relative">
      <section
        aria-labelledby="intro-title"
        className="relative isolate overflow-hidden"
      >
        <LivingGradient className="-z-10" />

        <div className="mx-auto flex min-h-[max(600px,92svh)] w-full max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 md:px-12 md:pb-24">
          <h1
            id="intro-title"
            aria-label={HEADLINE}
            className="max-w-[15ch] font-heading text-[clamp(2.6rem,6vw,5.75rem)] font-light leading-[1.04] text-foreground"
          >
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                aria-hidden="true"
                className="hero-word"
                style={{ "--w": i } as CSSProperties}
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          <div className="hero-fade mt-8 flex flex-col items-start gap-6">
            <p className="max-w-[40ch] text-[15px] leading-relaxed text-foreground sm:text-base">
              I&rsquo;m Dre (0xkhingx), based in Lagos. I take products from
              data and models through to the interface people use.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm text-cream transition-colors duration-200 hover:bg-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                See the work <span aria-hidden="true">↓</span>
              </a>
              <BookCallTrigger className="px-3 py-3 text-sm text-foreground underline decoration-mist underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink">
                Book a call
              </BookCallTrigger>
            </div>
          </div>
        </div>
      </section>

      <SelectedWork />
      <Experience />
    </div>
  );
}
