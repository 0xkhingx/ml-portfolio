import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { BookCallTrigger } from "@/components/booking/book-call";
import { EMAIL, RESUME_URL, SOCIALS } from "@/data/socials";

const FOOTER_NAV = [
  { label: "work", href: "/work" },
  { label: "writing", href: "/writing" },
];

const FOOTER_SOCIALS = SOCIALS.filter((link) =>
  ["github", "linkedin", "x"].includes(link.label),
);

const linkClass =
  "transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" aria-label="Footer" className="relative">
      <PointerGlow className="footer-glow relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 md:px-12">
        <div className="flex flex-col gap-6 py-20 sm:py-28 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-balance font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.02] text-foreground">
            Have something worth building?
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <BookCallTrigger className="inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm text-cream transition-colors duration-200 hover:bg-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink">
              Book a call
            </BookCallTrigger>
            <a
              href={`mailto:${EMAIL}`}
              className="px-3 py-3 text-sm text-foreground underline decoration-mist underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex items-center gap-3 text-foreground"
          >
            <Logo className="h-6 w-auto" />
            <span className="text-sm text-ink">
              Dre · software engineer, Lagos
            </span>
          </Link>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm lowercase text-ink"
          >
            {FOOTER_NAV.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              résumé
            </a>
                        {FOOTER_SOCIALS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between gap-4 pb-10 text-[13px] text-ink">
          <p>© {year} Oluwadamilare Ogundele</p>
          <a href="#" className={linkClass}>
            back to top ↑
          </a>
        </div>
      </div>
      </PointerGlow>
    </footer>
  );
}
