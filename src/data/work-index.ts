import { PROJECTS } from "@/data/projects";

export type WorkFilter = "all" | "web" | "ml" | "experiments";

export type WorkCategory = Exclude<WorkFilter, "all">;

export const WORK_FILTERS: { value: WorkFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "ml", label: "Machine Learning" },
  { value: "experiments", label: "Experiments" },
];

export interface WorkItem {
  slug: string;
  name: string;
  blurb: string;
  categories: WorkCategory[];
  /** Omit when unknown — the row simply hides the year. */
  year?: string;
  /** Path under /public. Omit when no visual is available yet. */
  cover?: string;
  href: string;
  external?: boolean;
}

const META: Record<string, { categories: WorkCategory[]; year?: string }> = {
  architektureart: { categories: ["web"], year: "2026" },
  kynigma: { categories: ["web"] },
  "mnist-nn-scratch": { categories: ["ml", "experiments"] },
  "nigerian-lang-classifier": { categories: ["ml"] },
  moodmix: { categories: ["ml"], year: "2026" },
  "chew-copilot": { categories: ["experiments"] },
  matchday: { categories: ["ml", "web"], year: "2026" },
};

const COVERS: Record<string, string> = {
  architektureart: "/images/work/architektureart/thumb-full.png",
  kynigma: "/images/work/kynigma/thumb-full.png",
  matchday: "/images/work/matchday/thumb-full.png",
  moodmix: "/images/work/moodmix/thumb-full.png",
};

const ORDER = [
  "architektureart",
  "matchday",
  "kynigma",
  "moodmix",
  "nigerian-lang-classifier",
  "chew-copilot",
  "mnist-nn-scratch",
];

const PROJECT_ITEMS: WorkItem[] = PROJECTS.map((project) => ({
  slug: project.slug,
  name: project.name,
  blurb: project.description,
  categories: META[project.slug]?.categories ?? ["experiments"],
  year: META[project.slug]?.year,
  cover: COVERS[project.slug],
  href: `/work/${project.slug}`,
}));

const BY_SLUG = new Map<string, WorkItem>(
  PROJECT_ITEMS.map((item) => [item.slug, item]),
);

export const WORK_ITEMS: WorkItem[] = ORDER.map((slug) => BY_SLUG.get(slug)).filter(
  (item): item is WorkItem => Boolean(item),
);
