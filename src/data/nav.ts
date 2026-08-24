import type { NavLink } from "@/types";

export const NAV_LEFT: NavLink[] = [
  { label: "work", href: "/work" },
  { label: "about", href: "/about" },
];

export const NAV_RIGHT: NavLink[] = [
  { label: "writing", href: "/writing" },
  { label: "contact", href: "/contact" },
];

export const NAV_ALL: NavLink[] = [...NAV_LEFT, ...NAV_RIGHT];
