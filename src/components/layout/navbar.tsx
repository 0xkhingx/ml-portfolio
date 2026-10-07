"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { LockedLabel } from "@/components/ui/locked-label";
import { BookCallTrigger } from "@/components/booking/book-call";
import { NAV_LEFT, NAV_RIGHT } from "@/data/nav";
import { EMAIL, RESUME_URL, SOCIALS } from "@/data/socials";
import type { NavLink } from "@/types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Editorial order for the large mobile menu: Work → Writing → About → Contact. */
const MOBILE_PRIMARY: NavLink[] = [
  { label: "work", href: "/work" },
  { label: "writing", href: "/writing" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact", action: "book-call" },
];

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: "easeOut" } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: { opacity: 0, y: 12, scale: 0.99, transition: { duration: 0.22 } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
  exit: {},
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function DesktopNavItem({ link, active }: { link: NavLink; active: boolean }) {
  if (link.action === "book-call") {
    return (
      <motion.span variants={itemVariants} className="block">
        <BookCallTrigger className="text-sm lowercase tracking-wide text-foreground/55 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40">
          {link.label}
        </BookCallTrigger>
      </motion.span>
    );
  }

  if (link.locked) {
    return (
      <motion.span variants={itemVariants} className="block">
        <LockedLabel
          label={link.label}
          className="text-sm lowercase tracking-wide"
          iconClassName="size-3"
        />
      </motion.span>
    );
  }

  return (
    <Link
      href={link.href}
      className={`relative text-sm lowercase tracking-wide transition-colors duration-200 ${
        active ? "text-foreground" : "text-foreground/55 hover:text-foreground"
      }`}
    >
      <motion.span variants={itemVariants} className="block">
        {link.label}
      </motion.span>
      {active ? (
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full bg-current"
        />
      ) : null}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (open) {
      setHidden(false);
      return;
    }
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 160);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const isActive = (href: string) =>
    href === "/contact"
      ? false
      : pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          animate={{ y: hidden && !open ? "-110%" : "0%" }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="mx-auto grid w-full max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-2 px-5 py-4 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center justify-self-start md:justify-self-end md:pr-10">
              <nav
                aria-label="Primary"
                className="hidden items-center gap-8 md:flex"
              >
                {NAV_LEFT.map((link) => (
                  <DesktopNavItem
                    key={link.href}
                    link={link}
                    active={isActive(link.href)}
                  />
                ))}
              </nav>
            </div>

            <Link href="/" aria-label="Home" className="justify-self-center">
              <motion.span variants={itemVariants} className="block">
                <Logo className="h-7 w-auto text-foreground" />
              </motion.span>
            </Link>

            <div className="flex items-center justify-self-end md:justify-self-start md:pl-10">
              <nav
                aria-label="Secondary"
                className="hidden items-center gap-8 md:flex"
              >
                {NAV_RIGHT.map((link) => (
                  <DesktopNavItem
                    key={link.href}
                    link={link}
                    active={isActive(link.href)}
                  />
                ))}
              </nav>
              <button
                type="button"
                onClick={() => {
                  setOpen((value) => !value);
                  setHidden(false);
                }}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative flex h-9 min-w-9 items-center justify-center gap-2.5 text-foreground md:hidden"
              >
                <span
                  aria-hidden="true"
                  className="text-xs lowercase tracking-[0.18em] text-foreground/60"
                >
                  {open ? "close" : "menu"}
                </span>
                <span className="relative flex w-5 flex-col items-center justify-center gap-1.5">
                  <motion.span
                    animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="block h-px w-5 bg-current"
                  />
                  <motion.span
                    animate={
                      open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.25, ease: EASE }}
                    className="block h-px w-5 bg-current"
                  />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col px-3 pt-[68px] pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          >
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-hidden="true"
              onClick={closeMenu}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#211f1d]/95 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.7)]"
            >
              <motion.nav
                aria-label="Mobile"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-h-0 flex-1 overflow-y-auto px-7 pt-3 sm:px-8"
              >
                <ul className="divide-y divide-white/8">
                  {MOBILE_PRIMARY.map((link, index) => {
                    const active =
                      link.action !== "book-call" && isActive(link.href);
                    const row = (
                      <span className="group flex w-full items-baseline justify-between gap-4 py-5 text-left sm:py-6">
                        <span
                          className={`font-heading text-[clamp(2.1rem,9.5vw,2.9rem)] leading-[1.05] font-semibold tracking-tight transition-colors duration-200 ${
                            active
                              ? "text-foreground"
                              : "text-foreground/90 group-active:text-foreground"
                          }`}
                        >
                          {link.label}
                        </span>
                        <span className="flex shrink-0 items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="font-mono text-[11px] tracking-widest text-foreground/35"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`size-1.5 rounded-full transition-colors duration-200 ${
                              active ? "bg-foreground" : "bg-foreground/20"
                            }`}
                          />
                        </span>
                      </span>
                    );
                    return (
                      <motion.li key={link.href} variants={rowVariants}>
                        {link.action === "book-call" ? (
                          <BookCallTrigger
                            onClick={closeMenu}
                            className="block w-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                          >
                            {row}
                          </BookCallTrigger>
                        ) : link.locked ? (
                          <LockedLabel
                            label={link.label}
                            className="w-full py-5 font-heading text-[clamp(2.1rem,9.5vw,2.9rem)] leading-[1.05] font-semibold tracking-tight sm:py-6"
                            iconClassName="size-5"
                          />
                        ) : (
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            aria-current={active ? "page" : undefined}
                            className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                          >
                            {row}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>

              <motion.div
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="shrink-0 border-t border-white/8 px-7 pt-5 pb-5 sm:px-8"
              >
                <p className="font-mono text-[11px] tracking-[0.22em] text-foreground/35 uppercase">
                  elsewhere
                </p>
                <nav
                  aria-label="Social"
                  className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5"
                >
                  {SOCIALS.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeMenu}
                      className="text-sm lowercase tracking-wide text-foreground/60 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                    >
                      {social.label}
                    </a>
                  ))}
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                    className="text-sm lowercase tracking-wide text-foreground/60 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                  >
                    resume
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    onClick={closeMenu}
                    className="text-sm lowercase tracking-wide text-foreground/60 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
                  >
                    email
                  </a>
                </nav>
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
