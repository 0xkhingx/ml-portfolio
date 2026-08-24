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
    <div className="mx-auto min-h-screen w-full max-w-2xl px-6 pb-24 pt-36 md:pt-44">
      <FadeIn>
        <p className="text-sm lowercase tracking-[0.25em] text-foreground/50">
          work
        </p>
        <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight md:text-5xl">
          selected work
        </h1>
      </FadeIn>

      <div className="mt-14 border-t border-foreground/10">
        {PROJECTS.map((project, index) => (
          <FadeIn key={project.name} delay={index * 0.08} y={16}>
            <a
              href={project.href}
              {...(isExternal(project.href)
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="group block border-b border-foreground/10 py-6 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 md:py-7"
            >
              <div className="flex items-baseline justify-between gap-6">
                <div className="min-w-0">
                  <h2 className="relative font-heading text-2xl font-medium decoration-[1px] underline-offset-4 group-hover:underline md:text-3xl">
                    <span
                      aria-hidden="true"
                      className="absolute -left-5 size-1.5 rounded-full bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    {project.name}
                  </h2>
                  <p className="mt-1 font-mono text-sm lowercase text-foreground/50">
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
              <p className="mt-3 line-clamp-2 max-w-xl text-base leading-relaxed text-foreground/60">
                {project.description}
              </p>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
