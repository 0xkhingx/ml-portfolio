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
    <div className="mx-auto min-h-screen w-full max-w-2xl px-6 pb-24 pt-36 md:pt-44">
      <FadeIn>
        <p className="text-sm lowercase tracking-[0.25em] text-foreground/50">
          contact
        </p>
        <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight md:text-5xl">
          say hello
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-foreground/80">
          A project, a role, or just a good idea — my inbox is open.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-base lowercase tracking-wide text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
        >
          {EMAIL}
        </a>
      </FadeIn>

      <FadeIn delay={0.12} y={16}>
        <div className="mt-16 flex items-center gap-4">
          <span className="font-mono text-sm lowercase text-foreground/50">
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
              className="group block border-b border-foreground/10 py-6 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="relative font-heading text-2xl font-medium decoration-[1px] underline-offset-4 group-hover:underline">
                  <span
                    aria-hidden="true"
                    className="absolute -left-5 size-1.5 rounded-full bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  {channel.label}
                </h2>
                <span className="flex shrink-0 items-baseline gap-3">
                  <span className="font-mono text-sm lowercase text-foreground/50">
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
