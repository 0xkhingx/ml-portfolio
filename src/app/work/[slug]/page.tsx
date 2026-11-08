import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import {
  JsonLd,
  breadcrumbJsonLd,
  getSiteUrl,
  projectJsonLd,
} from "@/components/seo/json-ld";
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

  const path = `/work/${project.slug}`;

  return {
    title: project.tagline
      ? `${project.name} — ${project.tagline}`
      : project.name,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${project.name} — 0xkhingx`,
      description: project.summary,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — 0xkhingx`,
      description: project.summary,
    },
  };
}

/**
 * Narrative index → gallery indices: which screenshots sit under which
 * part of the story. Sections without an entry are text only.
 */
const NARRATIVE_VISUALS: Record<string, Record<number, number[]>> = {
  matchday: { 2: [3], 4: [0, 1, 2] },
  architektureart: { 1: [0], 2: [1], 3: [2] },
  firstpass: { 1: [0], 2: [1] },
  kynigma: { 0: [0], 1: [1], 2: [2] },
};

function Shot({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        priority={priority}
        sizes="(max-width: 1200px) 100vw, 1152px"
        className="h-auto w-full rounded-sm bg-lilac"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

const linkClass =
  "underline decoration-mist underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/work/${project.slug}`;

  const narrative =
    project.narrative && project.narrative.length > 0
      ? project.narrative
      : [
          { heading: "The problem", body: project.challenge },
          { heading: "The approach", body: project.approach },
        ];

  const projectIndex = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const facts = [project.role, project.year, project.stack.join(", ")].filter(
    Boolean,
  );

  return (
    <article>
      <JsonLd
        data={[
          projectJsonLd({
            siteUrl,
            pageUrl,
            name: project.name,
            summary: project.summary,
            stack: project.stack,
            codeUrl: project.href,
            liveUrl: project.liveUrl,
          }),
          breadcrumbJsonLd(siteUrl, [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.name, path: `/work/${project.slug}` },
          ]),
        ]}
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-28 sm:px-8 md:px-12 md:pt-36">
        <FadeIn>
          <Link
            href="/work"
            className="text-sm text-ink transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            ← Work
          </Link>

          <h1 className="mt-8 font-heading text-[clamp(2.75rem,7vw,6rem)] font-light leading-[1.02] text-foreground">
            {project.name}
          </h1>
          {project.tagline ? (
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink sm:text-xl">
              {project.tagline}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
            <p className="text-ink">{facts.join(" · ")}</p>
            {project.liveUrl ? (
              <Link href={project.liveUrl} target="_blank" rel="noreferrer" className={linkClass}>
                Visit site ↗
              </Link>
            ) : null}
            {project.href ? (
              <Link href={project.href} target="_blank" rel="noreferrer" className={linkClass}>
                Source ↗
              </Link>
            ) : null}
          </div>
        </FadeIn>

        {project.cover ? (
          <FadeIn delay={0.08} y={20}>
            <div className="mt-12 md:mt-16">
              <Shot
                src={project.cover}
                alt={`${project.name} product preview`}
                priority
              />
            </div>
          </FadeIn>
        ) : null}

        <div className="mx-auto mt-20 max-w-3xl space-y-20 md:mt-28 md:space-y-28">
          {narrative.map((block, index) => {
            const visuals = (NARRATIVE_VISUALS[project.slug]?.[index] ?? [])
              .map((i) => project.gallery?.[i])
              .filter((visual) => visual !== undefined);

            return (
              <FadeIn key={block.heading} y={16}>
                <section aria-labelledby={`section-${index}`}>
                  <h2
                    id={`section-${index}`}
                    className="font-heading text-[clamp(1.6rem,3vw,2.25rem)] font-normal leading-tight text-foreground"
                  >
                    {block.heading}
                  </h2>
                  <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.8] text-foreground">
                    {block.body}
                  </p>
                </section>
                {visuals.length > 0 ? (
                  <div className="mt-12 space-y-12 md:-mx-[12%]">
                    {visuals.map((visual) => (
                      <Shot
                        key={visual.src}
                        src={visual.src}
                        alt={visual.alt}
                        caption={visual.caption}
                      />
                    ))}
                  </div>
                ) : null}
              </FadeIn>
            );
          })}

          <FadeIn y={16}>
            <section aria-labelledby="result">
              <h2
                id="result"
                className="font-heading text-[clamp(1.6rem,3vw,2.25rem)] font-normal leading-tight text-foreground"
              >
                Where it landed
              </h2>
              <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.8] text-foreground">
                {project.outcome}
              </p>
              {project.reflection ? (
                <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.8] text-ink">
                  {project.reflection}
                </p>
              ) : null}
              {project.relatedPost ? (
                <p className="mt-8 text-[15px] text-ink">
                  I wrote about it:{" "}
                  <Link
                    href={project.relatedPost.href}
                    className={`text-foreground ${linkClass}`}
                  >
                    {project.relatedPost.title}
                  </Link>
                </p>
              ) : null}
            </section>
          </FadeIn>
        </div>

        <FadeIn y={16}>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mx-auto mt-28 block max-w-3xl focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink md:mt-36"
          >
            <span className="text-sm text-ink">Next</span>
            <span className="mt-2 flex items-baseline justify-between gap-6 font-heading text-[clamp(2rem,5vw,3.75rem)] font-light leading-none text-foreground">
              {nextProject.name}
              <span
                aria-hidden="true"
                className="text-ink transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transform-none"
              >
                →
              </span>
            </span>
          </Link>
        </FadeIn>
      </div>
    </article>
  );
}
