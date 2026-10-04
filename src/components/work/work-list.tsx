"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import {
  WORK_FILTERS,
  WORK_ITEMS,
  type WorkFilter,
} from "@/data/work-index";

function FilterBar({
  active,
  onChange,
}: {
  active: WorkFilter;
  onChange: (filter: WorkFilter) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects"
      className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
    >
      {WORK_FILTERS.map((filter) => {
        const selected = filter.value === active;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(filter.value)}
            className={`inline-flex items-center gap-1.5 font-mono text-[13px] lowercase tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 ${
              selected
                ? "text-foreground"
                : "text-foreground/45 hover:text-foreground"
            }`}
          >
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full transition-colors duration-200 ${
                selected ? "bg-foreground" : "bg-transparent"
              }`}
            />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export function WorkList() {
  const [active, setActive] = useState<WorkFilter>("all");
  const items = WORK_ITEMS.filter(
    (item) => active === "all" || item.categories.includes(active),
  );

  return (
    <div>
      <FilterBar active={active} onChange={setActive} />

      <div className="mt-20 space-y-16 sm:mt-24 sm:space-y-20">
        {items.map((item, index) => (
          <FadeIn key={item.slug} delay={Math.min(index * 0.06, 0.18)} y={16}>
            <Link
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              aria-label={item.external ? `${item.name} (opens in a new tab)` : item.name}
              className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-pretty font-heading text-2xl font-medium tracking-tight decoration-[1px] underline-offset-4 group-hover:underline sm:text-3xl">
                  {item.name}
                </h2>
                {item.year ? (
                  <span className="shrink-0 font-mono text-sm text-foreground/50">
                    {item.year}
                  </span>
                ) : null}
              </div>

              <div className="relative mt-4 aspect-[3/2] w-full overflow-hidden rounded-md border border-foreground/10 bg-foreground/[0.04]">
                {item.cover ? (
                  <Image
                    src={item.cover}
                    alt={`${item.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-4xl font-medium text-foreground/20"
                  >
                    {item.name.charAt(0)}
                  </span>
                )}
              </div>

              <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-foreground/60 sm:text-base">
                {item.blurb}
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
