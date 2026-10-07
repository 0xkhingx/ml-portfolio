/**
 * Featured-work index data.
 *
 * THUMBNAILS — placeholder slots for now. To swap in real thumbnails later:
 *   1. Drop a roughly square image at `public/images/work/<slug>/thumb.png`.
 *   2. Set that entry's `thumb` below to the path.
 * Layout, sizing, and motion stay as-is.
 */

export interface FeaturedProject {
  slug: string;
  index: string;
  name: string;
  /** Path under /public, or null while awaiting a real thumbnail. */
  thumb: string | null;
  href: string;
  accent: {
    /** Subtle tint for the placeholder thumbnail. */
    wash: string;
    /** Hairline for the thumbnail border. */
    edge: string;
  };
}

export const FEATURED_WORK: FeaturedProject[] = [
  {
    slug: "architektureart",
    index: "01",
    name: "ArchitektureArt",
    thumb: "/images/work/architektureart/thumb-full.png",
    href: "/work/architektureart",
    accent: {
      wash: "rgba(201, 154, 75, 0.08)",
      edge: "rgba(201, 154, 75, 0.2)",
    },
  },
  {
    slug: "kynigma",
    index: "02",
    name: "Kynigma",
    thumb: "/images/work/kynigma/thumb-full.png",
    href: "/work/kynigma",
    accent: {
      wash: "rgba(111, 194, 184, 0.08)",
      edge: "rgba(111, 194, 184, 0.18)",
    },
  },
  {
    slug: "matchday",
    index: "03",
    name: "Matchday",
    thumb: "/images/work/matchday/thumb-full.png",
    href: "/work/matchday",
    accent: {
      wash: "rgba(122, 162, 247, 0.08)",
      edge: "rgba(122, 162, 247, 0.18)",
    },
  },
];
