import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { EMAIL } from "@/data/socials";

export const metadata: Metadata = {
  title: "Contact",
};

const CHANNELS = [
  { label: "github", href: "https://github.com/0xkhingx" },
  { label: "linkedin", href: "https://www.linkedin.com/in/0xkhingx" },
  { label: "x", href: "https://x.com/0xkhingx" },
];

function hostFor(href: string): string {
  return new URL(href).host.replace(/^www\./, "");
}

export default function ContactPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <FadeIn>
        <p className="text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm sm:tracking-[0.25em]">
          contact
        </p>
        <h1 className="mt-3 text-balance font-heading text-[32px] font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
          say hello
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-[17px] leading-[1.7] text-foreground/80 sm:mt-6 sm:text-lg sm:leading-relaxed md:text-xl">
          A project, a role, or just a good idea — my inbox is open.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[15px] lowercase tracking-wide text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:mt-8 sm:w-auto sm:py-3 sm:text-base"
        >
          <span className="break-all">{EMAIL}</span>
        </a>
      </FadeIn>

      <FadeIn delay={0.12} y={16}>
        <div className="mt-12 flex items-center gap-4 sm:mt-16">
          <span className="font-mono text-xs lowercase text-foreground/50 sm:text-sm">
            elsewhere
          </span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>
      </FadeIn>

      <FadeIn delay={0.18} y={16}>
        <div className="border-t border-foreground/10">
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="group block border-b border-foreground/10 py-5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:py-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h2 className="relative text-pretty font-heading text-[20px] font-medium leading-tight decoration-[1px] underline-offset-4 group-hover:underline sm:text-2xl">
                  <span
                    aria-hidden="true"
                    className="absolute -left-5 hidden size-1.5 rounded-full bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                  />
                  {channel.label}
                </h2>
                <span className="flex shrink-0 items-baseline gap-3">
                  <span className="font-mono text-xs lowercase text-foreground/50 sm:text-sm">
                    {hostFor(channel.href)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden font-mono text-sm text-foreground/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                  >
                    ↗
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
