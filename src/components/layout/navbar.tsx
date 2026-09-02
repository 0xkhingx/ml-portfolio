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
import { NAV_ALL, NAV_LEFT, NAV_RIGHT } from "@/data/nav";
import type { NavLink } from "@/types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

interface DesktopNavItemProps {
  link: NavLink;
  active: boolean;
  hovered: string | null;
  onHover: (href: string | null) => void;
}

function DesktopNavItem({ link, active, hovered, onHover }: DesktopNavItemProps) {
  const showUnderline = hovered === link.href || (!hovered && active);

  return (
      <Link
       href={link.href}
       onMouseEnter={() => onHover(link.href)}
       onMouseLeave={() => onHover(null)}
       className={`relative text-[17px] lowercase tracking-wide transition-colors ${
         active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
       }`}
    >
      <motion.span variants={itemVariants} className="block">
        {link.label}
      </motion.span>
      {showUnderline ? (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1.5 left-0 h-px w-full bg-current"
          transition={{ duration: 0.35, ease: EASE }}
        />
      ) : null}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (open) {
      setHidden(false);
    } else {
      const previous = scrollY.getPrevious() ?? 0;
      setHidden(y > previous && y > 160);
    }
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
  const isActive = (href: string) => pathname.startsWith(href);

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
          transition={{ duration: 0.45, ease: EASE }}
          className={`transition-colors duration-300 ${
            scrolled || open
              ? "border-b border-foreground/10 bg-background/70 backdrop-blur-md"
              : "border-b border-transparent"
          }`}
        >
          <div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-2 px-5 py-3.5 sm:py-4 md:grid-cols-[1fr_auto_1fr] md:px-10">
          <div className="flex items-center justify-self-start md:justify-self-end md:pr-10">
            <nav aria-label="Primary" className="hidden items-center gap-12 md:flex">
              {NAV_LEFT.map((link) => (
                <DesktopNavItem
                  key={link.href}
                  link={link}
                  active={isActive(link.href)}
                  hovered={hovered}
                  onHover={setHovered}
                />
              ))}
            </nav>
          </div>

          <Link href="/" aria-label="Home" className="justify-self-center">
            <motion.span variants={itemVariants} className="block">
              <Logo className="h-8 w-auto text-foreground sm:h-9" />
            </motion.span>
          </Link>

          <div className="flex items-center justify-self-end md:justify-self-start md:pl-10">
            <nav aria-label="Secondary" className="hidden items-center gap-12 md:flex">
              {NAV_RIGHT.map((link) => (
                <DesktopNavItem
                  key={link.href}
                  link={link}
                  active={isActive(link.href)}
                  hovered={hovered}
                  onHover={setHovered}
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
              className="relative flex size-9 flex-col items-center justify-center gap-1.5 md:hidden"
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col items-center gap-9">
              {NAV_ALL.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.07,
                    duration: 0.5,
                    ease: EASE,
                  }}
                >
                  <Link
                     href={link.href}
                     onClick={closeMenu}
                     className="text-5xl lowercase tracking-tight text-foreground"
                   >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
