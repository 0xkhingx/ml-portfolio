import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[32rem]"
        style={{
          background: `radial-gradient(circle at top, ${project.theme.glow}, transparent 58%)`,
        }}
      />
      <div className="mx-auto min-h-screen w-full max-w-4xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
        <FadeIn>
          <Link
            href="/work"
            className="inline-block font-mono text-xs lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:text-sm"
          >
            {"<"} all work
          </Link>
        </FadeIn>

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <FadeIn delay={0.05} y={16}>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-12"
                style={{ backgroundColor: project.theme.mark }}
              />
              <p className="font-mono text-xs lowercase tracking-[0.22em] text-foreground/45 sm:text-sm">
                case study
              </p>
            </div>
            <h1 className="mt-3 max-w-2xl text-balance font-heading text-[clamp(2.35rem,6vw,4.9rem)] font-medium leading-[0.94] tracking-[-0.04em]">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[1.05rem] leading-[1.75] text-foreground/70 sm:text-[1.1rem]">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/60"
                  style={{
                    borderColor: project.theme.border,
                    backgroundColor: project.theme.chip,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.14} y={18}>
            <div
              className="rounded-[1.5rem] border p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6"
              style={{
                borderColor: project.theme.border,
                background: `linear-gradient(180deg, ${project.theme.wash}, rgba(18,17,16,0.86))`,
              }}
            >
              <div className="grid gap-4 pb-5 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric} className="space-y-1">
                    <div
                      className="h-px w-8"
                      style={{ backgroundColor: project.theme.mark }}
                    />
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {metric}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-4 text-sm leading-7 text-foreground/70">
                <p>{project.challenge}</p>
                <p>{project.approach}</p>
                <p>{project.outcome}</p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {[
            {
              label: "challenge",
              value: project.challenge,
            },
            {
              label: "approach",
              value: project.approach,
            },
            {
              label: "outcome",
              value: project.outcome,
            },
          ].map((section, index) => (
            <FadeIn key={section.label} delay={0.18 + index * 0.06} y={14}>
              <section
                className="h-full rounded-[1.25rem] border bg-background/40 p-5"
                style={{ borderColor: project.theme.border }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                  {section.label}
                </p>
                <p className="mt-4 text-pretty text-[15px] leading-[1.75] text-foreground/68">
                  {section.value}
                </p>
              </section>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} y={14}>
          <div
            className="mt-12 flex flex-wrap items-center gap-4 border-t pt-6 text-sm text-foreground/55"
            style={{ borderTopColor: project.theme.border }}
          >
            {project.liveUrl ? (
              <>
                <span className="font-mono uppercase tracking-[0.18em]">
                  Live
                </span>
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
                >
                  View live product
                </Link>
                <span
                  aria-hidden="true"
                  className="text-foreground/25"
                >
                  /
                </span>
              </>
            ) : null}
            <span className="font-mono uppercase tracking-[0.18em]">Source</span>
            <Link
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
            >
              View repository
            </Link>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
