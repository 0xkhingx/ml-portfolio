import { FadeIn } from "@/components/motion/fade-in";
import { EXPERIENCE } from "@/data/experience";

export function Experience() {
  return (
    <section aria-label="Experience" id="experience">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6 sm:py-20">
        <FadeIn>
          <h2 className="font-mono text-xs font-normal lowercase tracking-[0.2em] text-foreground/50 sm:text-sm">
            03 — experience
          </h2>
        </FadeIn>

        <div className="mt-8 border-b border-foreground/10 sm:mt-10">
          {EXPERIENCE.map((entry, index) => (
            <FadeIn key={entry.org} delay={index * 0.06} y={12}>
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
                  <h3 className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {entry.org}
                  </h3>
                  <p className="shrink-0 text-sm lowercase tracking-wide text-foreground/45 sm:text-right">
                    {entry.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
