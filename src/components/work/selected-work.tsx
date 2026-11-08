import Link from "next/link";
import { HOME_SHOWCASE, SHOWCASE } from "@/data/showcase";
import { ShowcaseList } from "@/components/work/showcase-list";

const FEATURED = HOME_SHOWCASE.map((slug) =>
  SHOWCASE.find((project) => project.slug === slug),
).filter((project) => project !== undefined);

/** Home: the featured products, each as a header row + screenshot rail. */
export function SelectedWork() {
  return (
    <section aria-labelledby="work-heading" id="work" className="scroll-mt-8 overflow-x-clip">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-20 sm:px-8 md:px-12 md:pb-28 md:pt-28">
        <div className="flex items-baseline justify-between gap-6">
          <h2
            id="work-heading"
            className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none text-foreground"
          >
            Selected work
          </h2>
          <Link
            href="/work"
            className="text-[15px] text-foreground underline decoration-mist underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            All work
          </Link>
        </div>

        <div className="mt-12 md:mt-16">
          <ShowcaseList projects={FEATURED} maxShots={4} />
        </div>
      </div>
    </section>
  );
}
