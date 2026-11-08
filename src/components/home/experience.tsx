import { FadeIn } from "@/components/motion/fade-in";
import { EXPERIENCE } from "@/data/experience";

export function Experience() {
  return (
    <section aria-labelledby="experience-heading" id="experience">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.7fr] md:gap-16 md:px-12 md:py-28">
        <FadeIn>
          <h2
            id="experience-heading"
            className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none text-foreground"
          >
            Experience
          </h2>
        </FadeIn>

        <div>
          {EXPERIENCE.map((entry, index) => (
            <FadeIn key={entry.org} delay={index * 0.06} y={12}>
              <div
                className={`flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                  index === 0 ? "pt-0 sm:pt-1" : ""
                }`}
              >
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground sm:text-2xl">
                    {entry.org}
                  </h3>
                  <p className="mt-1 text-sm text-ink">
                    {entry.role}
                  </p>
                </div>
                <p className="shrink-0 text-[13px] text-ink sm:text-right">
                  {entry.period}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
