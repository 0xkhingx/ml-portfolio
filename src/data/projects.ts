import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    slug: "architektureart",
    name: "ArchitektureArt",
    href: "https://github.com/0xkhingx",
    liveUrl: "https://architektureart.xyz",
    description:
      "A gallery site for architectural art — landmarks reimagined as collectible pieces.",
    summary:
      "A gallery storefront for architectural art where landmarks are reimagined as collectible pieces — curation, browsing, and collecting in one considered interface.",
    challenge:
      "Selling art online is an interface problem as much as a commerce one: the site has to present each piece with the care of a gallery wall while still working as a storefront visitors can browse and buy from.",
    approach:
      "I built the experience around the work itself — landmark pieces presented as collectibles with room to breathe — keeping navigation quiet so attention stays on the art rather than the chrome around it.",
    outcome:
      "A live gallery site at architektureart.xyz that treats architectural art with gallery seriousness and storefront clarity.",
    stack: ["Web", "Gallery", "E-commerce"],
    metrics: ["live storefront", "curated collection", "gallery experience"],
    theme: {
      glow: "rgba(167, 139, 250, 0.34)",
      wash: "rgba(167, 139, 250, 0.12)",
      border: "rgba(167, 139, 250, 0.22)",
      chip: "rgba(167, 139, 250, 0.08)",
      mark: "#a78bfa",
    },
  },
  {
    slug: "kynigma",
    name: "Kynigma",
    href: "https://github.com/0xkhingx/enigma",
    description:
      "Studio site for a two-person design and engineering studio.",
    summary:
      "The studio site for Kynigma, a two-person design and engineering practice — a compact statement of who they are and what they make.",
    challenge:
      "A studio site has one job: make two people look like a practice. It needs to communicate taste and capability in very few pages without collapsing into a generic template.",
    approach:
      "I kept the site compact and deliberate — identity first, work forward — so the design of the site itself demonstrates the studio's range.",
    outcome:
      "A live studio presence that reads as designed rather than assembled, built to grow as the studio's body of work does.",
    stack: ["Web", "Design engineering", "Brand site"],
    metrics: ["studio identity", "compact build", "design-led"],
    theme: {
      glow: "rgba(111, 194, 184, 0.34)",
      wash: "rgba(111, 194, 184, 0.12)",
      border: "rgba(111, 194, 184, 0.22)",
      chip: "rgba(111, 194, 184, 0.08)",
      mark: "#6fc2b8",
    },
  },
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
    relatedPost: {
      title: "backprop by hand",
      href: "/writing/backprop-by-hand",
    },
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
      "A practical language classifier built for text that mainstream NLP tools routinely misread — character n-grams over five Nigerian languages, with an honest error table next to the headline number.",
    challenge:
      "Generic language detectors often misclassify Nigerian languages, so the goal was a focused classifier for English, Yoruba, Igbo, Hausa, and Pidgin that handled local data instead of pretending the problem was already solved. Real-world text made it harder: English drawn from books behaves differently than English drawn from social media, and Pidgin lives mostly in tweets.",
    approach:
      "I chose character-level features over word-level ones: character n-grams, two through five characters, TF-IDF weighted, feeding logistic regression. Yoruba and Igbo are morphologically rich, so character n-grams capture the texture of a language — its digraphs, diacritics, and borrowings — without tokenizers that assume spaces mean what they mean in English. The training set spans 64k+ sentences drawn from NaijaSenti tweets, JW300 parallel text, Wikipedia articles, and Gutenberg books.",
    outcome:
      "The final model reached 99.4% accuracy on the held-out test set — and I published the error table alongside it. Yoruba with diacritics classifies at ~97% confidence but drops toward 89% when users strip diacritics; Pidgin sits near 82% with the least training data; inputs under five words are unreliable; code-switched sentences, utterly normal in Lagos conversation, are not handled at all.",
    sections: [
      {
        label: "why character-level",
        body: "Word-level features would have required per-language vocabulary decisions. Character n-grams treat all five languages uniformly and pick up the sub-word signals — morphology, digraphs, diacritics — that actually distinguish them.",
      },
      {
        label: "where it breaks",
        body: "Stripped diacritics, short inputs, thin Pidgin data, and code-switching. Each failure mode is documented next to the headline number so the classifier earns trust for everything else it claims.",
      },
      {
        label: "what's next",
        body: "More Pidgin data, diacritic-robust training pairs, a FastAPI serving wrapper, and possibly a Hugging Face Space demo.",
      },
    ],
    stack: ["Python", "scikit-learn", "NLP", "text classification"],
    metrics: ["99.4% accuracy", "64k+ sentences", "5-language coverage"],
    relatedPost: {
      title: "classifying nigerian languages",
      href: "/writing/classifying-nigerian-languages",
    },
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
      "A mood-to-music pipeline that turns a lightweight classifier into an immediate listening action — input to playlist with no dashboard dead end.",
    challenge:
      "The useful part was not predicting mood in isolation, but turning that signal into something a person could actually use without extra friction. And mood is not ground truth: it is subjective and context-dependent, so a classifier trained on tidy labels inherits their tidiness and nothing more.",
    approach:
      "I built the full loop — input to mood classifier to track selection to the Spotify API to a playlist in the user's library — and treated the playlist as inspired by the mood, never graded against it. Predictions are suggestions, not verdicts. Integration got the same care as inference: OAuth, token refresh, scope negotiation, rate limits, and error states for every one of them, plus graceful degradation so low-confidence predictions still produce a sensible playlist instead of an empty screen.",
    outcome:
      "The project became a compact example of ML as product design: infer, decide, act. The ML portion of the codebase is smaller than the portion whose only job is surviving contact with someone else's API — and from the user's side, that integration work is the product while the model is a rumor inside it.",
    sections: [
      {
        label: "pipeline",
        body: "Input to mood classifier to track selection to the Spotify API to a finished playlist. Each stage degrades gracefully so a weak signal upstream never becomes a blank screen downstream.",
      },
      {
        label: "designing for uncertainty",
        body: "Two listeners can disagree on the mood of the same song, so the interface never presents a prediction as fact. Low-confidence outputs fall back to sensible defaults, converting model uncertainty from a bug into a personality trait.",
      },
    ],
    stack: ["Spotify API", "Python", "classification", "recommendation"],
    metrics: ["mood classification", "playlist automation", "end-to-end flow"],
    relatedPost: {
      title: "from notebook to product",
      href: "/writing/from-notebook-to-product",
    },
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
    sections: [
      {
        label: "trade-offs",
        body: "The model still loses to the bookmaker (0.985 vs 0.965 log-loss) — published, not hidden. Taking no odds as input is a deliberate handicap: it keeps the comparison honest but concedes the single strongest pre-match signal that exists.",
      },
    ],
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
