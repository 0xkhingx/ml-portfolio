import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import Link from "next/link";
import { ShowcaseList } from "@/components/work/showcase-list";
import { SHOWCASE } from "@/data/showcase";
import { WORK_ITEMS } from "@/data/work-index";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Dre (0xkhingx) — end-to-end products and experiments across software engineering, the web, and machine learning: Matchday, ArchitektureArt, Kynigma, Moodmix, and more.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Dre (0xkhingx)",
    description:
      "Products, experiments, and systems built by Dre (0xkhingx) across software engineering, the web, and machine learning.",
    url: "/work",
  },
};

const SHOWN = new Set(SHOWCASE.map((project) => project.slug));
const MORE = WORK_ITEMS.filter((item) => !SHOWN.has(item.slug));

export default function WorkPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] overflow-x-clip px-5 pb-24 pt-28 sm:px-8 sm:pt-36 md:px-12 md:pt-40">
      <FadeIn>
        <h1 className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05]">
          Work
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-ink sm:text-base">
          Products, models and experiments across the web and machine
          learning.
        </p>
      </FadeIn>

      <div className="mt-16 md:mt-20">
        <ShowcaseList projects={SHOWCASE} />
      </div>

      {MORE.length > 0 ? (
        <section aria-labelledby="more-heading" className="mt-28 md:mt-36">
          <h2
            id="more-heading"
            className="font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-normal text-foreground"
          >
            More projects
          </h2>
          <ul className="mt-8 space-y-7">
            {MORE.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="group block max-w-3xl focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <span className="font-heading text-xl text-foreground underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-ink">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-ink">
                    {item.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
