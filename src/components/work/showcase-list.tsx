"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Showcase } from "@/data/showcase";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

const shadow =
  "shadow-[0_1px_2px_rgba(43,48,73,0.06),0_10px_28px_-14px_rgba(43,48,73,0.25)]";

type Shot = Showcase["shots"][number];

/** Phones: small screens in a two-up grid instead of a sideways rail. */
function Grid({ shots, priority }: { shots: Shot[]; priority: boolean }) {
  return (
    <div className="mt-5 grid grid-cols-[repeat(2,minmax(0,140px))] justify-center gap-2 sm:hidden">
      {shots.map((shot, i) => (
        <figure
          key={shot.src}
          className={`relative aspect-[16/10] overflow-hidden rounded-[10px] bg-lilac ${shadow}`}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priority && i === 0}
            sizes="140px"
            className="object-cover object-top"
          />
        </figure>
      ))}
    </div>
  );
}

function Rail({
  project,
  shots,
  priority,
}: {
  project: Showcase;
  shots: Shot[];
  priority: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative mt-6 hidden sm:block">
        <div
          ref={ref}
          role="region"
          aria-label={`${project.name} screens`}
          tabIndex={0}
          className={`rail flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 ${focusRing}`}
          style={{ marginRight: "calc(50% - 50vw)", paddingRight: "max(1.25rem, calc(50vw - 50%))" }}
        >
          {shots.map((shot, i) => (
            <figure
              key={shot.src}
              className={`relative aspect-[16/10] w-[calc((100cqw-40px)/3)] shrink-0 snap-start overflow-hidden rounded-2xl bg-lilac md:w-[calc((100cqw-60px)/4)] ${shadow}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority={priority && i === 0}
                sizes="(max-width: 768px) 33vw, 330px"
                className="object-cover object-top"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className={`mt-4 justify-end gap-2 ${edges.start && edges.end ? "hidden" : "hidden md:flex"}`}>
        <button
          type="button"
          aria-label={`Previous ${project.name} screen`}
          disabled={edges.start}
          onClick={() => page(-1)}
          className={`flex size-9 items-center justify-center rounded-sm text-foreground transition-colors duration-200 hover:bg-lilac disabled:text-mist disabled:hover:bg-transparent ${focusRing}`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          aria-label={`Next ${project.name} screen`}
          disabled={edges.end}
          onClick={() => page(1)}
          className={`flex size-9 items-center justify-center rounded-sm text-foreground transition-colors duration-200 hover:bg-lilac disabled:text-mist disabled:hover:bg-transparent ${focusRing}`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  );
}

function Header({ project }: { project: Showcase }) {
  const action = project.href ? (
    <Link
      href={project.href}
      {...(project.external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`shrink-0 text-[15px] text-foreground underline decoration-mist underline-offset-4 transition-colors duration-200 hover:decoration-ink ${focusRing}`}
    >
      {project.linkLabel ?? "View"}
      {project.external ? " ↗" : ""}
    </Link>
  ) : project.status ? (
    <span className="shrink-0 text-[15px] text-ink">{project.status}</span>
  ) : null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <div className="flex items-start gap-4">
        {project.icon ? (
          <Image
            src={project.icon}
            alt=""
            width={48}
            height={48}
            className="mt-1 size-11 shrink-0 sm:size-12"
          />
        ) : null}
        <div>
          <h3
            id={`showcase-${project.slug}`}
            className="font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-normal leading-tight text-foreground">
            {project.name}
          </h3>
          <p className="mt-1 max-w-[56ch] text-[15px] leading-relaxed text-ink">
            {project.line}
          </p>
        </div>
      </div>
      {action}
    </div>
  );
}

/** Products as header row + screenshot rail, one after another. */
export function ShowcaseList({
  projects,
  maxShots,
}: {
  projects: Showcase[];
  /** Cap screens per product (home uses 4); omit to show all. */
  maxShots?: number;
}) {
  return (
    <div className="space-y-14 sm:space-y-20 md:space-y-24">
      {projects.map((project, i) => {
        const shots = maxShots ? project.shots.slice(0, maxShots) : project.shots;
        return (
          <article
            key={project.slug}
            aria-labelledby={`showcase-${project.slug}`}
            className="@container"
          >
            <Header project={project} />
            <Grid shots={shots} priority={i === 0} />
            <Rail project={project} shots={shots} priority={i === 0} />
          </article>
        );
      })}
    </div>
  );
}
