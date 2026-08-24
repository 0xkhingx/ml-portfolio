import { Fragment } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { NowPlaying } from "@/components/now-playing";
import { SOCIALS } from "@/data/socials";

const linkHover =
  "transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40";

export default function HomePage() {
  return (
    <div className="relative">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 md:px-10">
        <FadeIn>
          <p className="font-mono text-xs lowercase tracking-[0.25em] text-foreground/50">
            ML engineer
          </p>
        </FadeIn>
        <FadeIn delay={0.08} y={16}>
          <h1 className="mt-4 font-display text-4xl font-medium uppercase text-foreground md:text-6xl">
            Oluwadamilare
          </h1>
        </FadeIn>
        <FadeIn delay={0.16} y={16}>
          <nav
            aria-label="sections"
            className="mt-10 flex items-center gap-3 font-mono text-xs lowercase text-foreground/50"
          >
            <Link href="/work" className={linkHover}>
              work
            </Link>
            <span aria-hidden="true" className="text-foreground/25">
              ·
            </span>
            <Link href="/writing" className={linkHover}>
              writing
            </Link>
            <span aria-hidden="true" className="text-foreground/25">
              ·
            </span>
            <Link href="/contact" className={linkHover}>
              contact
            </Link>
          </nav>
        </FadeIn>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 px-6 pb-20 md:px-10">
        <NowPlaying />
        <nav
          aria-label="socials"
          className="ml-auto flex items-center gap-3 font-mono text-xs lowercase text-foreground/50"
        >
          {SOCIALS.map((social, index) => (
            <Fragment key={social.href}>
              {index > 0 && (
                <span aria-hidden="true" className="text-foreground/25">
                  ·
                </span>
              )}
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={linkHover}
              >
                {social.label}
              </a>
            </Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
