import type { NavLink } from "@/types";

export const NAV_LEFT: NavLink[] = [
  { label: "work", href: "/work", locked: true },
  { label: "about", href: "/about", locked: true },
];

export const NAV_RIGHT: NavLink[] = [
  { label: "writing", href: "/writing", locked: true },
  { label: "contact", href: "/contact", action: "book-call" },
];

export const NAV_ALL: NavLink[] = [...NAV_LEFT, ...NAV_RIGHT];
