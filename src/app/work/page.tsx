import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
};

function isExternal(href: string): boolean {
  return !href.startsWith("/");
}

function hostFor(href: string): string {
  if (!isExternal(href)) {
    return "case study";
  }
  return new URL(href).host.replace(/^www\./, "");
}

export default function WorkPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <FadeIn>
        <p className="text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm sm:tracking-[0.25em]">
          work
        </p>
        <h1 className="mt-3 text-balance font-heading text-[32px] font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
          selected work
        </h1>
      </FadeIn>

      <div className="mt-10 border-t border-foreground/10 sm:mt-14">
        {PROJECTS.map((project, index) => (
          <FadeIn key={project.name} delay={index * 0.08} y={16}>
            <a
              href={project.href}
              {...(isExternal(project.href)
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="group block border-b border-foreground/10 py-5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:py-6 md:py-7"
            >
              <div className="flex items-baseline justify-between gap-4 sm:gap-6">
                <div className="min-w-0">
                  <h2 className="relative text-pretty font-heading text-[22px] font-medium leading-tight decoration-[1px] underline-offset-4 group-hover:underline sm:text-2xl md:text-3xl">
                    <span
                      aria-hidden="true"
                      className="absolute -left-5 hidden size-1.5 rounded-full bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                    />
                    {project.name}
                  </h2>
                  <p className="mt-1 font-mono text-xs lowercase text-foreground/50 sm:text-sm">
                    {hostFor(project.href)}
                  </p>
                </div>
                {isExternal(project.href) && (
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 font-mono text-sm text-foreground/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                  >
                    ↗
                  </span>
                )}
              </div>
              <p className="mt-2.5 line-clamp-3 max-w-xl text-pretty text-[15px] leading-[1.65] text-foreground/60 sm:mt-3 sm:line-clamp-2 sm:text-base sm:leading-relaxed">
                {project.description}
              </p>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
