import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    slug: "architektureart",
    name: "ArchitektureArt",
    liveUrl: "https://architektureart.xyz",
    description:
      "A gallery storefront for architectural art — landmarks reimagined as collectible pieces.",
    tagline: "Landmarks reimagined as collectible pieces, sold with gallery care.",
    year: "2026",
    role: "Design engineering · storefront",
    categories: ["Web", "Product"],
    cover: "/images/work/architektureart/thumb-full.png",
    gallery: [
      {
        src: "/images/work/architektureart/collection.png",
        alt: "ArchitektureArt collection view showing landmark artworks fanned out under the headline Old landmarks, made to be seen anew",
        caption: "The collection as navigation — landmarks fanned like a gallery wall",
      },
      {
        src: "/images/work/architektureart/archive-hero.png",
        alt: "ArchitektureArt living archive hero with the headline We build, Time edits",
        caption: "The living archive — buildings outlive their builders",
      },
      {
        src: "/images/work/architektureart/orbit.png",
        alt: "ArchitektureArt gallery view with artworks in a slow orbit around the headline 777 works",
        caption: "Gallery orbit — browsing as slow looking",
      },
    ],
    summary:
      "A gallery storefront for architectural art where landmarks are reimagined as collectible pieces — curation, browsing, and collecting in one considered interface.",
    challenge:
      "Selling art online is an interface problem as much as a commerce one: the site has to present each piece with the care of a gallery wall while still working as a storefront visitors can browse and buy from. Architectural subjects add a second constraint — the work trades on place and memory, so flat product grids and generic commerce chrome drain exactly what makes each piece desirable.",
    approach:
      "I built the experience around the work itself — landmark pieces presented as collectibles with room to breathe — keeping navigation quiet so attention stays on the art rather than the chrome around it. Collection structure does the selling: pieces are grouped so browsing feels like walking a curated wall, and each piece gets a dedicated view where scale, detail, and context can land before any buy button appears.",
    outcome:
      "A live gallery site at architektureart.xyz that treats architectural art with gallery seriousness and storefront clarity — a complete browse-to-collect loop where the interface recedes and the pieces carry the decision.",
    sections: [
      {
        label: "curation first",
        body: "The collection is the navigation. Rather than filtering a flat catalog, visitors move through grouped landmarks the way a gallery hangs a wall — each adjacency deliberate, each piece given enough isolation to be considered on its own terms.",
      },
      {
        label: "piece pages",
        body: "Individual works get space for large imagery, the story of the place depicted, and clear collecting details. The goal is a page that answers the two questions every art buyer has — why this piece, and how do I own it — without either answer crowding the other.",
      },
      {
        label: "quiet commerce",
        body: "Checkout and browsing affordances stay visually subordinate to the art. Commerce patterns are present where expected but never compete with the work, so the site reads as a gallery that sells rather than a store that happens to show pictures.",
      },
    ],
    stack: ["Web", "Gallery", "E-commerce"],
    metrics: [
      "Structured collection, not a flat catalog",
      "Piece pages with lore + collecting context",
      "Commerce subordinate to the artwork",
    ],
    architecture: ["Collection", "Piece pages", "Browsing", "Collecting", "Interface"],
    narrative: [
      {
        heading: "Selling art without cheapening it",
        body: "Selling art online is an interface problem as much as a commerce one: the site has to present each piece with the care of a gallery wall while still working as a storefront visitors can browse and buy from. Architectural subjects add a second constraint — the work trades on place and memory, so flat product grids and generic commerce chrome drain exactly what makes each piece desirable.",
      },
      {
        heading: "The collection is the navigation",
        body: "Rather than filtering a flat catalog, visitors move through grouped landmarks the way a gallery hangs a wall — each adjacency deliberate, each piece given enough isolation to be considered on its own terms. Collection structure does the selling before any button appears.",
      },
      {
        heading: "Piece pages that answer two questions",
        body: "Individual works get space for large imagery, the story of the place depicted, and clear collecting details. Every piece page answers the two questions every art buyer has — why this piece, and how do I own it — without either answer crowding the other.",
      },
      {
        heading: "Commerce kept quiet",
        body: "Checkout and browsing affordances stay visually subordinate to the art. Commerce patterns are present where expected but never compete with the work, so the site reads as a gallery that sells rather than a store that happens to show pictures.",
      },
    ],
    reflection:
      "The lesson was restraint as a feature: every commerce element I removed made the remaining ones convert better. Next iteration is performance — large artwork imagery needs to stay fast without losing the gallery feel.",
    theme: {
      glow: "rgba(201, 154, 75, 0.26)",
      wash: "rgba(201, 154, 75, 0.1)",
      border: "rgba(201, 154, 75, 0.28)",
      chip: "rgba(201, 154, 75, 0.08)",
      mark: "#c99a4b",
    },
  },
  {
    slug: "kynigma",
    name: "Kynigma",
    // No public repository — source lives in a private studio repo.
    // The case study at /work/kynigma is the canonical record; omitting
    // `href` hides the "View repository" link instead of 404ing.
    description:
      "Studio site for a two-person design and engineering studio.",
    tagline: "Two people, presented as a practice — taste as the pitch.",
    role: "Design engineering · brand site",
    categories: ["Web", "Brand"],
    cover: "/images/work/kynigma/thumb-full.png",
    gallery: [
      {
        src: "/images/work/kynigma/services.jpeg",
        alt: "Kynigma services section with the headline Two people, three disciplines and Design and Brand, Web and Commerce, Software and ML blocks",
        caption: "Two people, three disciplines — the practice stated plainly",
      },
      {
        src: "/images/work/kynigma/selected-work.png",
        alt: "Kynigma selected work cards for Matchday Fate, Apex Lab, and Shadé Zahrai under the headline Four builds, four different rooms",
        caption: "Four builds, four different rooms — taste as the pitch",
      },
      {
        src: "/images/work/kynigma/contact.jpeg",
        alt: "Kynigma contact section with the headline Every brand is a puzzle, an enquiry form, and a start a project call to action",
        caption: "Engagement without a pitch deck — plan, not promises",
      },
    ],
    summary:
      "The studio site for Kynigma, a two-person design and engineering practice — a compact statement of who they are and what they make.",
    challenge:
      "A studio site has one job: make two people look like a practice. It needs to communicate taste and capability in very few pages without collapsing into a generic template. Every section has to justify its existence, because a thin studio site reads as unfinished while a bloated one reads as insecure.",
    approach:
      "I kept the site compact and deliberate — identity first, work forward — so the design of the site itself demonstrates the studio's range. Typography and spacing carry the identity rather than decoration, and the project views are structured to grow: each new engagement slots into the same considered frame without a redesign.",
    outcome:
      "A studio presence that reads as designed rather than assembled, built to grow as the studio's body of work does — the site is itself the portfolio piece that proves the practice can do the work it sells.",
    sections: [
      {
        label: "identity as proof",
        body: "For a design and engineering studio, the site cannot just describe capability — it has to exhibit it. Type choices, pacing, and restraint are the pitch; a visitor should conclude the studio has taste before reading a single project description.",
      },
      {
        label: "built to grow",
        body: "The structure assumes a small body of work today and a larger one later. Adding a project means filling an existing frame, not rethinking the site — so the studio can publish new work in an afternoon without design drift.",
      },
    ],
    stack: ["Web", "Design engineering", "Brand site"],
    metrics: ["studio identity", "compact build", "design-led"],
    architecture: ["Identity", "Selected work", "Engagement frame", "Site"],
    narrative: [
      {
        heading: "Making two people read as a practice",
        body: "A studio site has one job: make two people look like a practice. It needs to communicate taste and capability in very few pages without collapsing into a generic template. Every section has to justify its existence, because a thin studio site reads as unfinished while a bloated one reads as insecure.",
      },
      {
        heading: "The site is the portfolio piece",
        body: "For a design and engineering studio, the site cannot just describe capability — it has to exhibit it. Typography and spacing carry the identity rather than decoration, and a visitor should conclude the studio has taste before reading a single project description.",
      },
      {
        heading: "A frame that grows with the studio",
        body: "Project views are structured to grow: each new engagement slots into the same considered frame without a redesign, so the studio can publish new work in an afternoon without design drift.",
      },
    ],
    reflection:
      "Small sites punish every extra section, which made this a good exercise in saying no. If I rebuilt it, I would push the work itself even further forward — one project deep-view as the homepage hero.",
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
    tagline: "Backprop by hand, then checked honestly against PyTorch.",
    year: "2025",
    role: "Machine learning · from scratch",
    categories: ["Machine learning", "Experiments"],
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
    architecture: ["NumPy forward pass", "Hand-derived backprop", "SGD", "PyTorch baseline"],
    narrative: [
      {
        heading: "Reproducing the mechanics by hand",
        body: "I wanted to understand the mechanics of training well enough to reproduce them by hand, then compare the result against a PyTorch baseline without hand-waving the math. Small on purpose: a two-layer network where every shape bug is visible and every gradient can be checked.",
      },
      {
        heading: "Keeping the comparison fair",
        body: "Forward pass, backpropagation, and stochastic gradient descent in NumPy, with seed, data split, and architecture controlled so the PyTorch baseline comparison stays honest. The model converged close to the baseline — and the shape bugs along the way built sharper intuition for how training actually fails than any tutorial could.",
      },
    ],
    reflection:
      "Frameworks hide exactly the failure modes you need to recognize in production. Next step would be extending the scratch implementation to convolutions to feel weight sharing the same way.",
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
    tagline: "Five Nigerian languages, told apart by character texture.",
    year: "2025",
    role: "NLP · data to evaluation",
    categories: ["Machine learning", "NLP"],
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
    architecture: ["64k-sentence corpus", "Character n-grams", "TF-IDF", "Logistic regression", "Error table"],
    narrative: [
      {
        heading: "The text mainstream tools misread",
        body: "Generic language detectors often misclassify Nigerian languages, so the goal was a focused classifier for English, Yoruba, Igbo, Hausa, and Pidgin that handled local data instead of pretending the problem was already solved. Real-world text made it harder: English drawn from books behaves differently than English drawn from social media, and Pidgin lives mostly in tweets.",
      },
      {
        heading: "A corpus stitched from four worlds",
        body: "The training set spans 64k+ sentences drawn from NaijaSenti tweets, JW300 parallel text, Wikipedia articles, and Gutenberg books — deliberately mixed registers so the model meets the language where people actually type it.",
      },
      {
        heading: "Why character n-grams, not words",
        body: "Word-level features would have required per-language vocabulary decisions. Character n-grams, two through five characters and TF-IDF weighted, treat all five languages uniformly and pick up the sub-word signals — morphology, digraphs, diacritics, borrowings — that actually distinguish Yoruba and Igbo without tokenizers that assume spaces mean what they mean in English.",
      },
      {
        heading: "Publishing the error table next to the headline",
        body: "The final model reached 99.4% accuracy on the held-out test set — and the failure modes are documented beside it. Yoruba with diacritics classifies near 97% confidence but drops toward 89% when users strip diacritics; Pidgin sits near 82% with the least training data; inputs under five words are unreliable; code-switched sentences, utterly normal in Lagos conversation, are not handled at all.",
      },
    ],
    reflection:
      "The headline number was the least interesting part; the error table taught me more about the languages than the training did. Next: more Pidgin data, diacritic-robust training pairs, a FastAPI serving wrapper, and possibly a Hugging Face Space demo.",
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
    tagline: "Tell it your mood. Wake up with the playlist.",
    year: "2026",
    role: "ML product · classification to integration",
    categories: ["Machine learning", "Product"],
    cover: "/images/work/moodmix/thumb-full.png",
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
      {
        label: "integration reality",
        body: "The Spotify half of the codebase outweighs the model half: OAuth login, token refresh, scope negotiation, rate limits, and error states for each. Shipped ML products are mostly plumbing with a model inside — Moodmix is an honest, compact instance of that ratio.",
      },
    ],
    stack: ["Spotify API", "Python", "classification", "recommendation"],
    metrics: ["mood classification", "playlist automation", "end-to-end flow"],
    architecture: ["Mood input", "Classifier", "Track selection", "Spotify API", "Playlist"],
    narrative: [
      {
        heading: "A prediction nobody can use is a demo",
        body: "The useful part was not predicting mood in isolation, but turning that signal into something a person could actually use without extra friction. Mood is not ground truth: it is subjective and context-dependent, so a classifier trained on tidy labels inherits their tidiness and nothing more. I treated the playlist as inspired by the mood, never graded against it — predictions are suggestions, not verdicts.",
      },
      {
        heading: "The full loop, input to library",
        body: "Input to mood classifier to track selection to the Spotify API to a playlist in the user's library. Each stage degrades gracefully so a weak signal upstream never becomes a blank screen downstream — low-confidence outputs fall back to sensible defaults, converting model uncertainty from a bug into a personality trait.",
      },
      {
        heading: "Surviving contact with someone else's API",
        body: "Integration got the same care as inference: OAuth, token refresh, scope negotiation, rate limits, and error states for every one of them. The ML portion of the codebase is smaller than the portion whose only job is surviving Spotify — which is the honest ratio of nearly every shipped ML product.",
      },
    ],
    reflection:
      "Moodmix taught me the notebook-to-product gap firsthand: the model earns the demo, everything else earns the user. Next I would add listening-history personalization so the same mood resolves differently for different listeners.",
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
    tagline: "Triage guidance that speaks the clinic's languages.",
    year: "2025",
    role: "AI product · multilingual UX",
    categories: ["AI", "Experiments"],
    summary:
      "A multilingual triage assistant designed for Nigerian community health extension workers — structured guidance across language and context barriers, built for low-friction, high-stakes frontline use.",
    challenge:
      "Community health extension workers operate where the stakes are highest and the tooling is thinnest: brief consultations, mixed-literacy settings, and patients who may not share a language with the protocol documents. A generic chatbot demo fails here on three fronts at once — it assumes stable connectivity and long attention, it speaks one language confidently, and it optimizes for conversation rather than for a correct next action.",
    approach:
      "I shaped the assistant around triage support and multilingual communication so it could fit into low-friction, high-stakes use. That meant structuring interactions as guided steps with clear decision points instead of open chat, keeping language switching a first-class path rather than a fallback, and designing every response to end in an actionable recommendation — refer, monitor, or reassure — with the reasoning visible enough to trust and short enough to read between patients.",
    outcome:
      "The result is a focused concept for operational AI in public health rather than a generic chatbot demo — a working sketch of how language models can serve frontline workflows when the interface respects time pressure, language reality, and the need for auditable guidance.",
    sections: [
      {
        label: "guided, not chatty",
        body: "Open-ended chat invites rambling precisely when a health worker has minutes. The assistant drives toward a structured outcome — symptoms in, triage guidance out — with each turn narrowing toward a decision instead of extending a conversation.",
      },
      {
        label: "multilingual as core",
        body: "Nigerian frontline care crosses English, Yoruba, Igbo, Hausa, and Pidgin within a single clinic day. Language support is designed as a primary path with consistent clinical meaning across switches, not a translated skin over an English-only brain.",
      },
      {
        label: "trust under pressure",
        body: "Guidance a worker acts on must show its working. Recommendations carry concise rationales and clear escalation cues, so a worker can sanity-check the assistant's suggestion against their own training in seconds — the assistant advises, the worker decides.",
      },
    ],
    stack: ["LLMs", "multilingual UX", "healthcare", "triage"],
    metrics: ["multilingual support", "frontline workflow", "health context"],
    architecture: ["Symptoms in", "Guided steps", "Triage guidance", "Refer / monitor / reassure"],
    narrative: [
      {
        heading: "Guidance for the thinnest tooling environment",
        body: "Community health extension workers operate where the stakes are highest and the tooling is thinnest: brief consultations, mixed-literacy settings, and patients who may not share a language with the protocol documents. A generic chatbot demo fails here on three fronts at once — it assumes stable connectivity and long attention, it speaks one language confidently, and it optimizes for conversation rather than for a correct next action.",
      },
      {
        heading: "Guided steps, not open chat",
        body: "Open-ended chat invites rambling precisely when a health worker has minutes. The assistant drives toward a structured outcome — symptoms in, triage guidance out — with each turn narrowing toward a decision instead of extending a conversation.",
      },
      {
        heading: "Five languages as a primary path",
        body: "Nigerian frontline care crosses English, Yoruba, Igbo, Hausa, and Pidgin within a single clinic day. Language support is designed as a primary path with consistent clinical meaning across switches, and every response ends in an actionable recommendation — refer, monitor, or reassure — with reasoning visible enough to trust and short enough to read between patients.",
      },
    ],
    reflection:
      "The interface constraint taught more than the model did: advise, never decide, and show your working in seconds. Next would be offline-first behavior and field testing with real workers to see which escalation cues actually get followed.",
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
    tagline: "Football predictions built without using bookmaker odds.",
    year: "2026",
    role: "ML engineering · product",
    categories: ["Machine learning", "Product"],
    cover: "/images/work/matchday/thumb-full.png",
    gallery: [
      {
        src: "/images/work/matchday/fixtures.png",
        alt: "Matchday weekly fixtures board showing Premier League ties with Call It buttons",
        caption: "Weekly fixtures — every tie gets a call",
      },
      {
        src: "/images/work/matchday/predictor.jpeg",
        alt: "Matchday manual predictor for Manchester United vs Manchester City with home, draw and away probabilities",
        caption: "Name-your-tie predictor with honest probabilities",
      },
      {
        src: "/images/work/matchday/simulator.jpeg",
        alt: "Matchday title simulator table after 2,000 simulated seasons",
        caption: "2,000-season Monte Carlo title simulator",
      },
      {
        src: "/images/work/matchday/record.png",
        alt: "Matchday season record dashboard showing 50.7 percent accuracy over 146 calls",
        caption: "Published season record — log-loss disclosed, not hidden",
      },
    ],
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
    architecture: ["Ten seasons of matches", "23 pre-match features", "XGBoost", "FastAPI", "Next.js product"],
    narrative: [
      {
        heading: "An honest comparison to the bookmaker",
        body: "Most football models either leak odds into the features or hide behind accuracy. I wanted a model that could survive an honest comparison to the bookmaker — trained only on what is known before kickoff, evaluated on log-loss, and clear about where it still loses.",
      },
      {
        heading: "Designing the pre-match feature pipeline",
        body: "A 23-feature fair-play pipeline: Elo plus margin Elo, 5/10-match rolling form, head-to-head, rest days, and goals/shots/corners averages — with leakage checks and pinned train/val/test windows so no future information ever contaminates a pre-match prediction.",
      },
      {
        heading: "Why XGBoost, and what it beat",
        body: "A tuned XGBoost multiclass model beat both a logistic-regression baseline and the training-prior naive. The choice was empirical rather than fashionable: gradient boosting captured the non-linear interactions between form, strength, and rest that linear models flattened — verified on a locked 2024/25 test of 1,752 matches, not on validation peeking.",
      },
      {
        heading: "Evaluating against bookmaker probabilities",
        body: "Locked 2024/25 test: naive 1.077 vs XGB 0.985 vs B365 bookmaker 0.965. Live 2026/27-partial test (146 matches): 0.989 log-loss at 50.7% accuracy. The model still loses to the bookmaker — published, not hidden. Taking no odds as input is a deliberate handicap: it keeps the comparison honest but concedes the single strongest pre-match signal that exists.",
      },
      {
        heading: "Serving predictions with FastAPI and Next.js",
        body: "Shipped behind a FastAPI backend (predict, fixtures, evaluate, simulation) with a Next.js frontend: weekly fixtures, name-your-tie predictor, a 2,000-season Monte Carlo title simulator, Dixon-Coles scorelines stamped conditional on XGB, and a model page that publishes log-loss instead of hiding it. Train/serve parity is enforced by a point-in-time test, 51 pytest gates guard regressions, and the full loop — refresh, retrain, reload, simulate — runs from a Makefile in production.",
      },
    ],
    reflection:
      "The honest benchmark changed the project from a model into a product: losing to the bookmaker publicly is what makes the rest of the numbers believable. Next iteration is calibration by league — the residual errors are not evenly distributed, and the model knows it.",
    theme: {
      glow: "rgba(99, 156, 255, 0.34)",
      wash: "rgba(99, 156, 255, 0.12)",
      border: "rgba(99, 156, 255, 0.24)",
      chip: "rgba(99, 156, 255, 0.08)",
      mark: "#639cff",
    },
  },
  {
    slug: "firstpass",
    name: "Firstpass",
    href: "https://github.com/0xkhingx/firstpass",
    description:
      "A GitHub App bot that posts an instant first review on every pull request — FastAPI webhook, Postgres queue, worker, PR comments.",
    tagline: "First review in seconds, before a human looks.",
    year: "2026",
    role: "Backend · bots + queues",
    categories: ["Experiments"],
    cover: "/images/work/firstpass/showcase.png",
    gallery: [
      {
        src: "/images/work/firstpass/pipeline.png",
        alt: "Firstpass pipeline board showing the review comment mock, Postgres queue query, job lifecycle, and deterministic pipeline before the model",
        caption: "The full loop — webhook to queue to comment, model last",
      },
      {
        src: "/images/work/firstpass/architecture.png",
        alt: "Firstpass architecture diagram from GitHub events through FastAPI and Postgres to workers and PR comments",
        caption: "GitHub events to AI review via Postgres queue",
      },
    ],
    summary:
      "A working GitHub App prototype where opening a pull request gets an automatic summary comment within seconds — signed webhooks, an idempotent Postgres job queue, and a worker that claims jobs with FOR UPDATE SKIP LOCKED. Deterministic first, no LLM spend: the intelligence layer has a reserved home in core/llm but v1 proves every integration point with plain diff summaries.",
    challenge:
      "Waiting on first review is dead time: a developer opens a pull request and then waits while obvious context — what changed, how big, which commit — sits one API call away. Most review bots reach for the model first and treat delivery as plumbing; I wanted the boring parts proven before any intelligence was allowed in, because a bot that drops, duplicates, or misfires comments is worse than no bot at all.",
    approach:
      "I sequenced the build so each integration point earns trust before the next is added. Milestones 1–2 stand up the proven loop: HMAC-signed webhook verification, idempotent event storage keyed on delivery ID so GitHub redeliveries are absorbed, a Postgres jobs table claimed with FOR UPDATE SKIP LOCKED and exponential backoff, and a worker that mints a short-lived installation token from the App JWT to post on the PR. Milestone 3 fetches the diff through the Files API and posts a deterministic summary — per-file additions and removals plus the short hash, truncated gracefully on large PRs. Milestone 7 hardens the queue the way production demands: payload validation, retry jitter, a reaper for jobs stuck running after a crash, supersede-cancel on new synchronizations, and editing the bot's comment in place instead of stacking duplicates. Static analyzers, the LLM pass, inline line-mapping, and the dashboard stay explicitly deferred to later milestones behind their reserved seams.",
    outcome:
      "The loop works end to end on a local Docker Compose stack — webhook in, summary comment on the PR within seconds — guarded by 16 pytest gates covering signatures, diff rendering, and queue hardening with mocked GitHub calls. The repo carries its own memory: a PROJECT.md that scopes v1 as deterministic-only under a free-only constraint, ADRs for the stack choices, and a risk ledger that names the known weak spots — init-only schema mounts, uncached per-job tokens — instead of letting them hide.",
    sections: [
      {
        label: "deterministic first",
        body: "No network calls in v1 except to the GitHub API, no paid services, no model spend. The LLM review lives behind a reserved core/llm seam for milestone 5, gated on an explicit provider and budget decision — the bot is useful the day the loop works, not the day the model arrives.",
      },
      {
        label: "queue honesty",
        body: "Postgres is the queue because Postgres is already there: webhook_events plus jobs, idempotent on delivery ID, claimed with SKIP LOCKED so workers never step on each other. The hardening pass — jitter, reaper, supersede-cancel, edit-in-place — treats duplicate and stale comments as the product defect they are.",
      },
    ],
    stack: ["Python", "FastAPI", "Postgres 16", "Docker Compose", "GitHub Apps", "pytest"],
    metrics: ["PR comment in seconds", "16 pytest gates", "idempotent webhook queue"],
    architecture: ["Signed GitHub webhook", "Idempotent event store", "Postgres job queue", "SKIP LOCKED worker", "Diff summary comment"],
    narrative: [
      {
        heading: "Proving the loop before the intelligence",
        body: "Waiting on first review is dead time: a developer opens a pull request and then waits while obvious context sits one API call away. Most review bots reach for the model first and treat delivery as plumbing; I sequenced this one the other way — milestones 1 and 2 prove the full loop with a hardcoded comment so that webhook verification, storage, queueing, and commenting each earn trust before any diff or model is allowed in.",
      },
      {
        heading: "Postgres as the queue",
        body: "Postgres is the queue because Postgres is already there: webhook_events plus a jobs table, idempotent on delivery ID so GitHub redeliveries are absorbed, claimed with FOR UPDATE SKIP LOCKED and exponential backoff. The milestone 7 hardening pass treats duplicate and stale comments as the product defect they are — payload validation, retry jitter, a reaper for jobs stuck running after a crash, supersede-cancel on new pushes, and editing the bot's comment in place instead of stacking duplicates.",
      },
      {
        heading: "A deterministic v1 with the model seams reserved",
        body: "Milestone 3 fetches the diff through the Files API and posts a deterministic summary — per-file additions and removals plus the short hash, truncated gracefully on large PRs. Static analyzers, the LLM pass behind core/llm, inline line-mapping, and the dashboard stay explicitly deferred with reserved seams, gated on real decisions: analyzer set, provider and budget, hosting. Useful the day the loop works, not the day the model arrives.",
      },
    ],
    reflection:
      "Integration-first sequencing was the whole bet: a review bot that drops or duplicates comments is worse than none, so reliability came before intelligence. Next is milestone 4's static analyzers, then the milestone 5 model pass — but only after the provider and budget decision the free-only constraint demands.",
    theme: {
      glow: "rgba(167, 139, 250, 0.34)",
      wash: "rgba(167, 139, 250, 0.12)",
      border: "rgba(167, 139, 250, 0.24)",
      chip: "rgba(167, 139, 250, 0.08)",
      mark: "#a78bfa",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
