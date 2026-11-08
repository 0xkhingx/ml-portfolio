"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Showcase } from "@/data/showcase";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

function Rail({ project, priority }: { project: Showcase; priority: boolean }) {
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
      <div className="relative mt-6">
        <div
          ref={ref}
          role="region"
          aria-label={`${project.name} screens`}
          tabIndex={0}
          className={`rail flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 sm:gap-5 ${focusRing}`}
          style={{ marginRight: "calc(50% - 50vw)", paddingRight: "max(1.25rem, calc(50vw - 50%))" }}
        >
          {project.shots.map((shot, i) => (
            <figure
              key={shot.src}
              className="relative aspect-[16/10] w-[74vw] shrink-0 snap-start overflow-hidden rounded-sm bg-lilac shadow-[0_1px_2px_rgba(43,48,73,0.06),0_10px_28px_-14px_rgba(43,48,73,0.25)] sm:w-[320px] lg:w-[360px]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority={priority && i === 0}
                sizes="(max-width: 640px) 74vw, 360px"
                className="object-cover object-top"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-4 hidden justify-end gap-2 md:flex">
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
export function ShowcaseList({ projects }: { projects: Showcase[] }) {
  return (
    <div className="space-y-20 md:space-y-24">
      {projects.map((project, i) => (
        <article key={project.slug} aria-labelledby={`showcase-${project.slug}`}>
          <Header project={project} />
          <Rail project={project} priority={i === 0} />
        </article>
      ))}
    </div>
  );
}
