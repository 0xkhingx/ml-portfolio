"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FEATURED_WORK,
  type FeaturedProject,
} from "@/data/selected-work";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Thumb({ project }: { project: FeaturedProject }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-md border bg-foreground/[0.04]"
      style={{ borderColor: project.accent.edge }}
    >
      {project.thumb ? (
        <Image
          src={project.thumb}
          alt={`${project.name} thumbnail`}
          fill
          sizes="(max-width: 640px) 33vw, 320px"
          className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(100% 100% at 50% 0%, ${project.accent.wash}, transparent 75%)`,
          }}
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-2xl font-medium text-foreground/25"
          >
            {project.name.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}

export function SelectedWork() {
  return (
    <section aria-label="Featured projects" id="work" className="overflow-x-clip">
      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-20">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-mono text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm"
        >
          01 — selected work
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 sm:mt-20 md:grid-cols-[1fr_auto_1fr]">
          <span aria-hidden="true" className="hidden md:block" />

        <div className="flex items-start justify-center gap-3 sm:gap-10">
          {FEATURED_WORK.map((project, index) => (
            <motion.a
              key={project.slug}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.name}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-64px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: EASE }}
              className="group block min-w-0 flex-1 transition-transform duration-200 ease-out hover:-translate-y-[5px] active:scale-[0.99] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 motion-reduce:transform-none sm:flex-none sm:w-60 md:w-80"
            >
              <Thumb project={project} />
              <span className="mt-3 block text-center font-mono text-[11px] tracking-[0.14em] text-foreground/40">
                {project.index}
              </span>
              <h3 className="mt-1 block h-4 text-center text-xs text-foreground/70 opacity-0 transition-all duration-200 group-hover:opacity-100 max-md:opacity-100 motion-reduce:transition-none">
                {project.name}
              </h3>
            </motion.a>
          ))}
        </div>

        <p className="hidden justify-self-end text-[11px] lowercase tracking-wide text-foreground/35 md:block">
          featured projects
        </p>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            href="/work"
            className="group/all -m-2 inline-flex items-center gap-1.5 p-2 text-sm lowercase tracking-wide text-foreground/60 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
          >
            View all work
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/all:translate-x-0.5 motion-reduce:transform-none"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
