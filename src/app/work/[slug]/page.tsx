import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { RevealText } from "@/components/motion/reveal-text";
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

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

/**
 * Stand-in for a visual the project owner will supply later.
 * Renders as a quiet dashed slot — never a decorative gradient.
 */
function VisualPlaceholder({
  label,
  aspect = "aspect-[16/9]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      aria-label={`${label} (image placeholder)`}
      role="img"
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-foreground/15 bg-foreground/[0.02]`}
    >
      <p className="font-mono text-xs lowercase tracking-[0.18em] text-foreground/40">
        {label}
      </p>
      <p className="font-mono text-[11px] lowercase text-foreground/25">
        image slot — asset coming later
      </p>
    </div>
  );
}

function BrowserFrame({
  domain,
  children,
}: {
  domain?: string;
  children: ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-foreground/12 bg-foreground/[0.02]">
      <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
        </span>
        {domain ? (
          <figcaption className="ml-2 truncate font-mono text-xs text-foreground/40">
            {domain}
          </figcaption>
        ) : null}
      </div>
      {children}
    </figure>
  );
}

function domainOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/**
 * Narrative index → gallery indices. Only entries listed here render a
 * visual; any other placeholder slot is dropped (rather than showing an
 * empty dashed box) when the project ships real screenshots.
 */
const NARRATIVE_VISUALS: Record<string, Record<number, number[]>> = {
  matchday: { 2: [3], 4: [0, 1, 2] },
  architektureart: { 1: [0] },
  firstpass: { 1: [0], 2: [1] },
  kynigma: { 0: [0], 1: [1], 2: [2] },
};

function StoryVisual({
  src,
  alt,
  caption,
  domain,
}: {
  src: string;
  alt: string;
  caption?: string;
  domain?: string;
}) {
  return (
    <figure>
      <BrowserFrame domain={domain}>
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1200}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 896px"
          className="h-auto w-full"
        />
      </BrowserFrame>
      {caption ? (
        <figcaption className="mt-3 font-mono text-[11px] lowercase tracking-[0.18em] text-foreground/40">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/work/${project.slug}`;

  // Prefer the editorial narrative; fall back to the legacy cards so no
  // project ever renders empty during migration.
  const narrative =
    project.narrative && project.narrative.length > 0
      ? project.narrative
      : [
          { heading: "The challenge", body: project.challenge },
          { heading: "The approach", body: project.approach },
          { heading: "The outcome", body: project.outcome },
          ...(project.sections ?? []).map((section) => ({
            heading: section.label,
            body: section.body,
          })),
        ];

  const projectIndex = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const metaRows: { label: string; value: ReactNode }[] = [];
  if (project.role) metaRows.push({ label: "Role", value: project.role });
  if (project.year) metaRows.push({ label: "Year", value: project.year });
  metaRows.push({ label: "Stack", value: project.stack.join(" · ") });
  if (project.liveUrl) {
    metaRows.push({
      label: "Live",
      value: (
        <Link
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
        >
          Visit ↗
        </Link>
      ),
    });
  }
  if (project.href) {
    metaRows.push({
      label: "Source",
      value: (
        <Link
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
        >
          GitHub ↗
        </Link>
      ),
    });
  }

  return (
    <article className="relative">
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

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
        {/* Top bar: back link + project marker */}
        <FadeIn>
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/work"
              className="inline-block font-mono text-xs lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:text-sm"
            >
              {"<"} back to work
            </Link>
            <p className="font-mono text-xs lowercase tracking-[0.18em] text-foreground/40 sm:text-sm">
              {project.slug}
              {project.year ? ` / ${project.year}` : ""}
            </p>
          </div>
        </FadeIn>

        {/* Hero: monumental title left, overview right (55/45) */}
        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <FadeIn delay={0.05} y={16} className="flex flex-col justify-end">
            <div>
              <p className="font-mono text-xs lowercase tracking-[0.2em] text-foreground/45 sm:text-sm">
                {[project.year, ...(project.categories ?? [])]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <h1 className="mt-3 max-w-3xl text-balance font-heading text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.04em]">
                {project.name}
              </h1>
              {project.tagline ? (
                <p className="mt-5 max-w-xl text-pretty font-heading text-[1.35rem] font-normal leading-[1.3] tracking-tight text-foreground/90 sm:text-[1.6rem]">
                  {project.tagline}
                </p>
              ) : null}
            </div>
          </FadeIn>

          <FadeIn delay={0.12} y={18}>
            <div className="lg:pt-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                Overview
              </p>
              <p className="mt-4 max-w-xl text-pretty text-base leading-[1.8] text-foreground/75 sm:text-[1.05rem]">
                {project.summary}
              </p>

              {/* Quiet metadata — small labels, strong values */}
              <dl className="mt-8 space-y-3 border-t border-foreground/10 pt-6">
                {metaRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[5.5rem_1fr] gap-3 text-[15px]"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                      {row.label}
                    </dt>
                    <dd className="leading-relaxed text-foreground/85">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </div>

        {/* Hero visual: large, raw, in a thin browser frame — no glow */}
        <FadeIn delay={0.1} y={20}>
          <div className="mt-10 lg:mt-14">
            {project.cover ? (
              <BrowserFrame domain={domainOf(project.liveUrl)}>
                <Image
                  src={project.cover}
                  alt={`${project.name} product preview`}
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 1152px"
                  className="aspect-[16/9] w-full object-cover"
                />
              </BrowserFrame>
            ) : (
              <VisualPlaceholder label={`${project.name} — hero visual`} />
            )}
          </div>
        </FadeIn>

        {/* Editorial story: semantic h2s with shifting rhythm */}
        <div className="mx-auto mt-16 max-w-4xl space-y-16 sm:mt-24 sm:space-y-24">
          {narrative.map((block, index) => {
            const pattern = index % 3;
            const visualIndices =
              NARRATIVE_VISUALS[project.slug]?.[index] ?? null;
            const visuals =
              visualIndices && project.gallery
                ? visualIndices
                    .map((galleryIndex) => project.gallery?.[galleryIndex])
                    .filter((visual) => visual !== undefined)
                : null;
            const hasGallery = (project.gallery?.length ?? 0) > 0;
            return (
              <FadeIn key={block.heading} delay={0.05} y={16}>
                {pattern === 0 ? (
                  <section
                    aria-labelledby={`section-${project.slug}-${index}`}
                  >
                    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                      <div>
                        <p
                          className="font-mono text-xs tracking-[0.2em] text-foreground/35"
                          aria-hidden="true"
                        >
                          {padIndex(index)}
                        </p>
                        <h2
                          id={`section-${project.slug}-${index}`}
                          className="mt-2 text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl"
                        >
                          {block.heading}
                        </h2>
                      </div>
                    <RevealText
                      text={block.body}
                      className="text-pretty text-base leading-[1.8] text-foreground/75 sm:text-[1.05rem]"
                    />
                    </div>
                    {visuals && visuals.length > 0 ? (
                      <div className="mt-8 space-y-10">
                        {visuals.map((visual) => (
                          <StoryVisual
                            key={visual.src}
                            src={visual.src}
                            alt={visual.alt}
                            caption={visual.caption}
                            domain={domainOf(project.liveUrl)}
                          />
                        ))}
                      </div>
                    ) : null}
                  </section>
                ) : pattern === 1 ? (
                  <section
                    aria-labelledby={`section-${project.slug}-${index}`}
                  >
                    <p
                      className="font-mono text-xs tracking-[0.2em] text-foreground/35"
                      aria-hidden="true"
                    >
                      {padIndex(index)}
                    </p>
                    <h2
                      id={`section-${project.slug}-${index}`}
                      className="mt-2 max-w-2xl text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl"
                    >
                      {block.heading}
                    </h2>
                    <RevealText
                      text={block.body}
                      className="mt-4 max-w-2xl text-pretty text-base leading-[1.8] text-foreground/75 sm:text-[1.05rem]"
                    />
                    {visuals && visuals.length > 0 ? (
                      <div className="mt-8 space-y-10">
                        {visuals.map((visual) => (
                          <StoryVisual
                            key={visual.src}
                            src={visual.src}
                            alt={visual.alt}
                            caption={visual.caption}
                            domain={domainOf(project.liveUrl)}
                          />
                        ))}
                      </div>
                    ) : hasGallery ? null : (
                      <div className="mt-8">
                        <VisualPlaceholder
                          label={`Story visual — ${block.heading}`}
                        />
                      </div>
                    )}
                  </section>
                ) : visuals && visuals.length === 1 ? (
                  <section
                    aria-labelledby={`section-${project.slug}-${index}`}
                  >
                    <p
                      className="font-mono text-xs tracking-[0.2em] text-foreground/35"
                      aria-hidden="true"
                    >
                      {padIndex(index)}
                    </p>
                    <h2
                      id={`section-${project.slug}-${index}`}
                      className="mt-2 text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl"
                    >
                      {block.heading}
                    </h2>
                    <div className="mt-6 grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
                      <StoryVisual
                        src={visuals[0].src}
                        alt={visuals[0].alt}
                        caption={visuals[0].caption}
                        domain={domainOf(project.liveUrl)}
                      />
                    <RevealText
                      text={block.body}
                      className="text-pretty text-base leading-[1.8] text-foreground/75 sm:text-[1.05rem]"
                    />
                    </div>
                  </section>
                ) : visuals && visuals.length > 1 ? (
                  <section
                    aria-labelledby={`section-${project.slug}-${index}`}
                  >
                    <p
                      className="font-mono text-xs tracking-[0.2em] text-foreground/35"
                      aria-hidden="true"
                    >
                      {padIndex(index)}
                    </p>
                    <h2
                      id={`section-${project.slug}-${index}`}
                      className="mt-2 text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl"
                    >
                      {block.heading}
                    </h2>
                    <RevealText
                      text={block.body}
                      className="mt-4 max-w-2xl text-pretty text-base leading-[1.8] text-foreground/75 sm:text-[1.05rem]"
                    />
                    <div className="mt-8 space-y-10">
                      {visuals.map((visual) => (
                        <StoryVisual
                          key={visual.src}
                          src={visual.src}
                          alt={visual.alt}
                          caption={visual.caption}
                          domain={domainOf(project.liveUrl)}
                        />
                      ))}
                    </div>
                  </section>
                ) : hasGallery ? (
                  <section
                    aria-labelledby={`section-${project.slug}-${index}`}
                  >
                    <p
                      className="font-mono text-xs tracking-[0.2em] text-foreground/35"
                      aria-hidden="true"
                    >
                      {padIndex(index)}
                    </p>
                    <h2
                      id={`section-${project.slug}-${index}`}
                      className="mt-2 max-w-2xl text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl"
                    >
                      {block.heading}
                    </h2>
                    <RevealText
                      text={block.body}
                      className="mt-4 max-w-2xl text-pretty text-base leading-[1.8] text-foreground/75 sm:text-[1.05rem]"
                    />
                  </section>
                ) : (
                  <section
                    aria-labelledby={`section-${project.slug}-${index}`}
                  >
                    <p
                      className="font-mono text-xs tracking-[0.2em] text-foreground/35"
                      aria-hidden="true"
                    >
                      {padIndex(index)}
                    </p>
                    <h2
                      id={`section-${project.slug}-${index}`}
                      className="mt-2 text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl"
                    >
                      {block.heading}
                    </h2>
                    <div className="mt-6 grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
                      <VisualPlaceholder label={`Detail view — ${block.heading}`} />
                    <RevealText
                      text={block.body}
                      className="text-pretty text-base leading-[1.8] text-foreground/75 sm:text-[1.05rem]"
                    />
                    </div>
                  </section>
                )}
              </FadeIn>
            );
          })}

          {/* Site views — the interface recedes, the pieces carry it */}
          {project.slug === "architektureart" &&
          project.gallery &&
          project.gallery.length > 1 ? (
            <FadeIn y={16}>
              <section aria-label="Selected site views">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                  Selected views
                </p>
                <div className="mt-6 space-y-10">
                  {project.gallery.slice(1).map((visual) => (
                    <StoryVisual
                      key={visual.src}
                      src={visual.src}
                      alt={visual.alt}
                      caption={visual.caption}
                      domain={domainOf(project.liveUrl)}
                    />
                  ))}
                </div>
              </section>
            </FadeIn>
          ) : null}

          {/* Structure: information architecture as a left-rail flow */}
          {project.architecture && project.architecture.length > 0 ? (
            <FadeIn y={16}>
              <section aria-label={`${project.name} structure`}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                  Structure
                </p>
                <ol className="mt-8 space-y-0">
                  {project.architecture.map((step, index) => (
                    <li key={step} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-8 last:pb-0">
                      <span className="flex flex-col items-center">
                        <span
                          className="flex size-8 items-center justify-center rounded-full border font-mono text-[11px] text-foreground/70"
                          style={{ borderColor: project.theme.border }}
                        >
                          {padIndex(index)}
                        </span>
                        {index < (project.architecture?.length ?? 0) - 1 ? (
                          <span
                            aria-hidden="true"
                            className="mt-2 w-px flex-1 bg-foreground/15"
                          />
                        ) : null}
                      </span>
                      <p className="pt-1 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </FadeIn>
          ) : null}

          {/* The result: outcome prose first, supporting points after */}
          <FadeIn y={16}>
            <section aria-label={`${project.name} result`}>
              <div className="border-t border-foreground/10 pt-8">
                <h2 className="text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
                  The result
                </h2>
                <RevealText
                  text={project.outcome}
                  className="mt-4 max-w-2xl text-pretty text-base leading-[1.8] text-foreground/80 sm:text-lg sm:leading-[1.8]"
                />
                <dl className="mt-8 grid gap-8 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric}>
                      <div
                        className="h-px w-10"
                        style={{ backgroundColor: project.theme.mark }}
                      />
                      <dd className="mt-3 font-heading text-xl font-medium tracking-tight text-foreground sm:text-[1.4rem]">
                        {metric}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          </FadeIn>

          {/* Reflection — authored, given weight */}
          {project.reflection ? (
            <FadeIn y={16}>
              <section aria-label="Reflection">
                <div
                  className="border-l-2 pl-6 sm:pl-8"
                  style={{ borderColor: project.theme.mark }}
                >
                  <h2 className="text-balance font-heading text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
                    If I built it again
                  </h2>
                  <p className="mt-4 max-w-2xl text-pretty text-base leading-[1.8] text-foreground/80 sm:text-lg sm:leading-[1.8]">
                    {project.reflection}
                  </p>
                </div>
              </section>
            </FadeIn>
          ) : null}

          {/* Further reading + source */}
          <FadeIn y={14}>
            <div
              className="border-t pt-6"
              style={{ borderTopColor: project.theme.border }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                Further reading + source
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-foreground/75 sm:text-base">
                {project.relatedPost ? (
                  <Link
                    href={project.relatedPost.href}
                    className="group/related inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                  >
                    {project.relatedPost.title}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/related:translate-x-0.5 motion-reduce:transform-none"
                    >
                      ↗
                    </span>
                  </Link>
                ) : null}
                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                  >
                    GitHub ↗
                  </Link>
                ) : null}
                {project.liveUrl ? (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                  >
                    Live product ↗
                  </Link>
                ) : null}
                {!project.relatedPost && !project.href && !project.liveUrl ? (
                  <span className="text-foreground/50">
                    Case study only — no public links.
                  </span>
                ) : null}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Next project — large transition with descriptor */}
        <FadeIn y={16}>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group/next mt-20 block border-t border-foreground/10 pt-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:mt-28"
            aria-label={`Next project: ${nextProject.name}`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
              Next project
            </p>
            <p className="mt-3 flex items-baseline justify-between gap-6 font-heading text-[clamp(2rem,6vw,4rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
              <span className="transition-transform duration-300 ease-out group-hover/next:translate-x-2 motion-reduce:transform-none">
                {nextProject.name}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-foreground/40 transition-all duration-300 group-hover/next:translate-x-1 group-hover/next:text-foreground motion-reduce:transform-none"
              >
                →
              </span>
            </p>
            <p className="mt-3 font-mono text-xs lowercase tracking-[0.14em] text-foreground/40">
              {[
                nextProject.year,
                ...(nextProject.categories ?? []),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </Link>
        </FadeIn>
      </div>
    </article>
  );
}
