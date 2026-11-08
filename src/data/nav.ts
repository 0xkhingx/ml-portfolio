import type { NavLink } from "@/types";
import { RESUME_URL } from "@/data/socials";

export const NAV_LEFT: NavLink[] = [
  { label: "work", href: "/work" },
  { label: "writing", href: "/writing" },
];

export const NAV_RIGHT: NavLink[] = [
  { label: "contact", href: "/contact", action: "book-call" },
  { label: "résumé", href: RESUME_URL, external: true },
];

export const NAV_ALL: NavLink[] = [...NAV_LEFT, ...NAV_RIGHT];
