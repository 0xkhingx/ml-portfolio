import { FadeIn } from "@/components/motion/fade-in";
import { BookCallTrigger } from "@/components/booking/book-call";
import { EMAIL, SOCIALS } from "@/data/socials";

const FOOTER_SOCIALS = SOCIALS.filter((link) =>
  ["github", "linkedin", "x"].includes(link.label),
);

export function ContactFooter() {
  return (
    <div>
      <section aria-label="Contact" id="contact">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6 sm:py-20">
          <FadeIn>
            <p className="font-mono text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm">
              04 — contact
            </p>
            <h2 className="mt-3 max-w-md text-balance font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Got an idea, opportunity, or something worth discussing?
            </h2>
            <div className="mt-4 flex flex-col items-start gap-2.5">
              <BookCallTrigger className="group/book inline-flex items-center gap-1.5 text-[15px] text-foreground/70 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:text-base">
                Book a call
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/book:translate-x-0.5 motion-reduce:transform-none"
                >
                  ↗
                </span>
              </BookCallTrigger>
              <a
                href={`mailto:${EMAIL}`}
                className="group/mail inline-flex items-center gap-1.5 text-[15px] text-foreground/70 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:text-base"
              >
                Email me
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/mail:translate-x-0.5 motion-reduce:transform-none"
                >
                  ↗
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer aria-label="Footer">
        <div className="mx-auto w-full max-w-5xl px-5 pb-10 sm:px-6 sm:pb-12">
          <div className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-5 font-mono text-xs lowercase tracking-wide text-foreground/45">
            <nav aria-label="Social links" className="flex items-center gap-4">
              {FOOTER_SOCIALS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <p>Lagos, Nigeria — © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
