"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EMAIL, RESUME_URL } from "@/data/socials";
import { NAV_ALL } from "@/data/nav";
import { LockedLabel } from "@/components/ui/locked-label";
import { SelectedWork } from "@/components/work/selected-work";
import { AboutTeaser } from "@/components/about/about-teaser";
import { Experience } from "@/components/home/experience";
import { ContactFooter } from "@/components/home/contact-footer";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ResumeIcon,
  XBrandIcon,
} from "@/icons/social";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/0xkhingx",
    Icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/0xkhingx",
    Icon: LinkedinIcon,
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/0xkhingx",
    Icon: XBrandIcon,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    Icon: MailIcon,
    external: false,
  },
  {
    label: "Résumé",
    href: RESUME_URL,
    Icon: ResumeIcon,
    external: true,
  },
];

function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
          className="text-foreground/55 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
        >
          <Icon className="size-[19px]" />
        </a>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      <section aria-label="Introduction" className="relative">
        <div className="mx-auto flex min-h-[68svh] w-full max-w-2xl flex-col justify-center px-5 pb-14 pt-28 sm:px-6 md:min-h-[80vh] md:pb-16 md:pt-32">
          <motion.div {...fadeUp(0)}>
            <Image
              src="/images/hero-portrait.png"
              alt="Illustrated portrait of Dre"
              width={80}
              height={80}
              priority
              className="size-20 rounded-full object-cover"
            />
          </motion.div>

          <h1 className="mt-7 font-heading leading-[1.05] tracking-tight text-foreground">
            <motion.span
              {...fadeUp(0.08)}
              className="block text-[2rem] font-normal sm:text-[52px]"
            >
              Hey, I&rsquo;m Dre.
            </motion.span>
            <motion.span
              {...fadeUp(0.16)}
              className="block text-[2.25rem] font-semibold sm:text-[58px]"
            >
              Software Engineer
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.24)}
            className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-foreground/60 sm:text-base"
          >
            I build software for the web, explore machine learning, and create
            thoughtful digital experiences.
          </motion.p>

          <motion.nav
            aria-label="Sections"
            {...fadeUp(0.28)}
            className="mt-7 flex items-center gap-5 text-sm lowercase tracking-wide text-foreground/50 md:hidden"
          >
            {NAV_ALL.map((link) =>
              link.locked ? (
                <LockedLabel
                  key={link.href}
                  label={link.label}
                  iconClassName="size-3"
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                >
                  {link.label}
                </Link>
              )
            )}
          </motion.nav>

          <motion.div {...fadeUp(0.32)} className="md:hidden">
            <SocialIcons className="mt-8 flex items-center gap-5" />
          </motion.div>
        </div>

        <motion.nav
          aria-label="Social links"
          {...fadeUp(0.32)}
          className="absolute right-12 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex lg:right-16"
        >
          <SocialIcons className="flex flex-col items-center gap-5" />
        </motion.nav>
      </section>

      <SelectedWork />
      <AboutTeaser />
      <Experience />
      <ContactFooter />
    </div>
  );
}
