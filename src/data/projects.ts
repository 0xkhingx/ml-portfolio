import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    slug: "mnist-nn-scratch",
    name: "mnist-nn-scratch",
    href: "https://github.com/0xkhingx/mnist-nn-scratch",
    description:
      "A two-layer neural network from scratch in NumPy — backprop, SGD — benchmarked against PyTorch.",
    summary:
      "A deliberately small neural network that proves the fundamentals still matter when the framework layer is removed.",
    challenge:
      "I wanted to understand the mechanics of training well enough to reproduce them by hand, then compare the result against a PyTorch baseline without hand-waving the math.",
    approach:
      "I built the forward pass, backpropagation, and stochastic gradient descent in NumPy, then controlled the seed, data split, and architecture so the comparison stayed fair.",
    outcome:
      "The model converged close to the PyTorch baseline and turned shape bugs into a much sharper intuition for how training actually fails.",
    stack: ["NumPy", "Python", "PyTorch", "MNIST"],
    metrics: ["2-layer MLP", "trained on MNIST", "baseline parity with PyTorch"],
    theme: {
      glow: "rgba(214, 156, 84, 0.34)",
      wash: "rgba(214, 156, 84, 0.12)",
      border: "rgba(214, 156, 84, 0.22)",
      chip: "rgba(214, 156, 84, 0.08)",
      mark: "#d69c54",
    },
  },
  {
    slug: "nigerian-lang-classifier",
    name: "nigerian-lang-classifier",
    href: "https://github.com/0xkhingx/nigerian-lang-classifier",
    description:
      "Detects English, Yoruba, Igbo, Hausa, and Pidgin from text — 99.4% accuracy across 64k+ sentences.",
    summary:
      "A practical language classifier built for text that mainstream NLP tools routinely misread.",
    challenge:
      "Generic language detectors often misclassify Nigerian languages, so the goal was to create a focused classifier that handled local data instead of pretending the problem was already solved.",
    approach:
      "I trained and evaluated a text classifier on a 64k+ sentence dataset, tuned the feature pipeline, and checked performance across the five target languages.",
    outcome:
      "The final model reached 99.4% accuracy on the held-out test set and gave me a reusable baseline for multilingual Nigerian text.",
    stack: ["Python", "scikit-learn", "NLP", "text classification"],
    metrics: ["99.4% accuracy", "64k+ sentences", "5-language coverage"],
    theme: {
      glow: "rgba(111, 181, 131, 0.34)",
      wash: "rgba(111, 181, 131, 0.12)",
      border: "rgba(111, 181, 131, 0.24)",
      chip: "rgba(111, 181, 131, 0.08)",
      mark: "#6fb583",
    },
  },
  {
    slug: "moodmix",
    name: "Moodmix",
    href: "https://github.com/0xkhingx/Moodmix",
    description:
      "Classifies music by your mood and pushes a matching playlist to your Spotify.",
    summary:
      "A mood-to-music pipeline that turns a lightweight classifier into an immediate listening action.",
    challenge:
      "The useful part was not predicting mood in isolation, but turning that signal into something a person could actually use without extra friction.",
    approach:
      "I linked mood classification to Spotify playlist creation so the result was a full interaction loop instead of a dashboard dead end.",
    outcome:
      "The project became a compact example of ML as product design: infer, decide, act.",
    stack: ["Spotify API", "Python", "classification", "recommendation"],
    metrics: ["mood classification", "playlist automation", "end-to-end flow"],
    theme: {
      glow: "rgba(173, 115, 255, 0.34)",
      wash: "rgba(173, 115, 255, 0.12)",
      border: "rgba(173, 115, 255, 0.22)",
      chip: "rgba(173, 115, 255, 0.08)",
      mark: "#ad73ff",
    },
  },
  {
    slug: "chew-copilot",
    name: "CHEW Copilot",
    href: "https://github.com/0xkhingx/Chew-copilot",
    description:
      "Multilingual AI triage assistant for Nigerian community health extension workers.",
    summary:
      "An assistant designed for frontline healthcare workers who need clear guidance across language and context barriers.",
    challenge:
      "Community health extension workers need support that is fast, legible, and multilingual, which means the interface has to respect the conditions of the real workflow.",
    approach:
      "I shaped the assistant around triage support and multilingual communication so it could fit into low-friction, high-stakes use.",
    outcome:
      "The result is a focused concept for operational AI in public health rather than a generic chatbot demo.",
    stack: ["LLMs", "multilingual UX", "healthcare", "triage"],
    metrics: ["multilingual support", "frontline workflow", "health context"],
    theme: {
      glow: "rgba(233, 122, 90, 0.34)",
      wash: "rgba(233, 122, 90, 0.12)",
      border: "rgba(233, 122, 90, 0.22)",
      chip: "rgba(233, 122, 90, 0.08)",
      mark: "#e97a5a",
    },
  },
  {
    slug: "matchday",
    name: "Matchday",
    href: "https://github.com/0xkhingx/football-prediction",
    liveUrl: "https://matchday.pxxl.click/",
    description:
      "Fair-play football predictor for Europe's top five leagues — tuned XGBoost on 23 pre-match signals, benchmarked against bookmaker odds, shipped as a live product.",
    summary:
      "Matchday turns ten seasons of match data into honest P(H/D/A) calls — no odds inputs, bookmaker as benchmark, and a live app with fixtures, manual predictor, title simulator, and disclosed metrics.",
    challenge:
      "Most football models either leak odds into the features or hide behind accuracy. I wanted a model that could survive an honest comparison to the bookmaker — trained only on what is known before kickoff, evaluated on log-loss, and clear about where it still loses.",
    approach:
      "I built a 23-feature fair-play pipeline — Elo plus margin Elo, 5/10-match rolling form, head-to-head, rest days, and goals/shots/corners averages — with leakage checks and pinned train/val/test windows. A tuned XGBoost multiclass model beat a logistic-regression baseline and the training-prior naive, then shipped behind a FastAPI backend (predict, fixtures, evaluate, simulation) with a Next.js frontend: weekly fixtures, name-your-tie predictor, a 2,000-season Monte Carlo title simulator, Dixon-Coles scorelines stamped conditional on XGB, and a model page that publishes log-loss instead of hiding it.",
    outcome:
      "Locked 2024/25 test (1,752 matches): naive 1.077 → XGB 0.985 vs B365 bookmaker 0.965. Live 2026/27-partial test (146 matches): 0.989 log-loss at 50.7% accuracy. Train/serve parity is enforced by a point-in-time test, 51 pytest gates guard regressions, and the full loop — refresh, retrain, reload, simulate — runs from a Makefile in production on Pxxl + Vercel.",
    stack: ["XGBoost", "FastAPI", "Next.js", "Python", "TypeScript", "Elo + form features"],
    metrics: ["0.985 log-loss", "1,752-match locked test", "5 leagues live"],
    theme: {
      glow: "rgba(99, 156, 255, 0.34)",
      wash: "rgba(99, 156, 255, 0.12)",
      border: "rgba(99, 156, 255, 0.24)",
      chip: "rgba(99, 156, 255, 0.08)",
      mark: "#639cff",
    },
  },
];

export function getProjectBySlug(slug: string) {
  const project = PROJECTS.find((project) => project.slug === slug);
  if (project) return project;
  // Legacy slug: renamed football-prediction -> matchday
  if (slug === "football-prediction") {
    return PROJECTS.find((project) => project.slug === "matchday");
  }
  return undefined;
}
