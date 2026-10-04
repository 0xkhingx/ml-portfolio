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
import { NAV_ALL, NAV_LEFT, NAV_RIGHT } from "@/data/nav";
import type { NavLink } from "@/types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
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
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

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
                className="relative flex size-9 flex-col items-center justify-center gap-1.5 text-foreground md:hidden"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="block h-px w-5 bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="block h-px w-5 bg-current"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col items-center gap-8">
              {NAV_ALL.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.06,
                    duration: 0.4,
                    ease: EASE,
                  }}
                >
                  {link.action === "book-call" ? (
                    <BookCallTrigger
                      onClick={closeMenu}
                      className="text-4xl lowercase tracking-tight text-foreground"
                    >
                      {link.label}
                    </BookCallTrigger>
                  ) : link.locked ? (
                    <LockedLabel
                      label={link.label}
                      className="text-4xl lowercase tracking-tight"
                      iconClassName="size-5"
                    />
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="text-4xl lowercase tracking-tight text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
