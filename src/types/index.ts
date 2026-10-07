export interface NavLink {
  label: string;
  href: string;
  locked?: boolean;
  /** Renders an in-place action instead of navigating. */
  action?: "book-call";
}

export interface Track {
  name: string;
  artist: string;
  album: string;
  url?: string;
  imageUrl?: string;
}

export interface NowPlayingData {
  configured: boolean;
  isPlaying?: boolean;
  track?: Track | null;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  minutes: number;
}

export interface ProjectSection {
  label: string;
  body: string;
}

/** One editorial section of a case study. `heading` is rendered as a real
    `<h2>` so every section carries semantic, retrievable meaning. */
export interface CaseStudyBlock {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  /** Repository URL. Omit when the source is private/unpublished — the
      case-study page then hides the "View repository" link instead of
      pointing at a 404. */
  href?: string;
  liveUrl?: string;
  summary: string;
  /** One strong sentence under the title — the 10-second pitch. */
  tagline?: string;
  /** Quiet hero metadata. */
  year?: string;
  role?: string;
  categories?: string[];
  /** Path under /public for the full-width hero visual. */
  cover?: string;
  /** Real product screenshots shown inside the story. When present, the
      case-study page renders these instead of dashed placeholders. */
  gallery?: { src: string; alt: string; caption?: string }[];
  /** Ordered pipeline shown as Data ↓ Features ↓ Model ↓ API ↓ Interface. */
  architecture?: string[];
  /** Editorial story sections with semantic headings. Preferred over the
      legacy challenge/approach/outcome cards when present. */
  narrative?: CaseStudyBlock[];
  /** Authored closing note: what was learned / what comes next. */
  reflection?: string;
  challenge: string;
  approach: string;
  outcome: string;
  /** Extra case-study sections (methodology, trade-offs, what's next…). */
  sections?: ProjectSection[];
  /** Link to a related essay in /writing. */
  relatedPost?: { title: string; href: string };
  stack: string[];
  metrics: string[];
  theme: {
    glow: string;
    wash: string;
    border: string;
    chip: string;
    mark: string;
  };
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  summary: string;
}

export interface ExternalPost {
  title: string;
  url: string;
  date: string;
  description: string;
  minutes: number;
}
