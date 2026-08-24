import type { Experience } from "@/types";

export const TAGLINE = ["Machine learning,", "human touch"];

export const MANIFESTO =
  "I build because I choose to. No grand mission — just the conviction that if I'm spending my time here, it'll be on things I actually believe in. Code that feels right, interfaces that respect the person using them, models that do something real. Not because there's hope or a higher purpose. Because this is mine to decide.";

export const EXPERIENCE: Experience[] = [
  {
    role: "Bioinformatics & ML researcher",
    org: "Obafemi Awolowo University",
    period: "2025 — present",
    summary:
      "Research at the intersection of biochemistry and machine learning — protein structure prediction and drug discovery pipelines.",
  },
  {
    role: "Machine learning fellow",
    org: "Electric Sheep Africa",
    period: "2025 — 2026",
    summary:
      "Intensive program covering supervised learning, neural networks, and model deployment — bringing AI skills into a full-stack toolkit.",
  },
  {
    role: "Freelance frontend developer & python engineer",
    org: "Self-employed",
    period: "2020 — present",
    summary:
      "Responsive web apps and Python backend services for international clients — with NLP and computer vision models integrated into production.",
  },
];

export const STACK: { label: string; items: string[] }[] = [
  {
    label: "ml & data",
    items: ["python", "numpy", "scikit-learn", "xgboost", "pytorch"],
  },
  {
    label: "web",
    items: [
      "typescript",
      "next.js",
      "react",
      "node.js",
      "fastapi",
      "flask",
      "supabase",
    ],
  },
];
