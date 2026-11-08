/**
 * Products shown as a header row + screenshot rail (home and /work).
 *
 * Screens live in public/images/work/<slug>/rail/NN.webp (1600×1000).
 * To add a product: drop its screens in that folder, add an entry here,
 * and list its slug in HOME_SHOWCASE if it should appear on the homepage.
 */

export interface Showcase {
  slug: string;
  name: string;
  /** One sentence: what it is, for whom. */
  line: string;
  /** Where the header link goes; omit for private work. */
  href?: string;
  linkLabel?: string;
  external?: boolean;
  /** Shown instead of a link, e.g. for work still being built. */
  status?: string;
  icon?: string;
  shots: { src: string; alt: string }[];
}

/**
 * `version` goes into the filename (01-v2.webp). Bump it whenever a
 * product's screens are replaced, so no browser or image cache serves
 * the old ones under the same URL.
 */
const rail = (slug: string, alts: string[], version?: string) =>
  alts.map((alt, i) => ({
    src: `/images/work/${slug}/rail/${String(i + 1).padStart(2, "0")}${version ? `-${version}` : ""}.webp`,
    alt,
  }));

export const SHOWCASE: Showcase[] = [
  {
    slug: "matchday",
    name: "Matchday",
    line: "Football predictions for Europe's top five leagues, benchmarked in public against the bookmaker.",
    href: "/work/matchday",
    linkLabel: "Case study",
    icon: "/images/work/matchday/icon.svg",
    shots: rail("matchday", [
      "Matchday home page, Call every fixture, with the five league badges",
      "This week's ties: Premier League fixture cards with predict buttons",
      "Name your tie: the manual predictor with Arsenal against Chelsea",
      "Who lifts it? Title odds from 2,000 simulated seasons",
      "Premier League table with simulated title and top-four chances",
      "Honest numbers: log-loss over time against the bookmaker",
    ], "v2"),
  },
  {
    slug: "architektureart",
    name: "ArchitektureArt",
    line: "A gallery storefront where world landmarks are reimagined as collectible art.",
    href: "/work/architektureart",
    linkLabel: "Case study",
    icon: "/images/work/architektureart/icon.png",
    shots: rail("architektureart", [
      "Home page with landmark artworks fanned under the line Old landmarks, made to be seen anew",
      "Gallery with filters for ancient, medieval, modern and mythic pieces",
      "Piece page for the Great Pyramid of Giza artwork",
      "The Lore page, We build. Time edits.",
    ]),
  },
  {
    slug: "moodmix",
    name: "MoodMix",
    line: "Say or type how you feel; a classifier reads the mood and builds a Spotify playlist to match.",
    href: "/work/moodmix",
    linkLabel: "Case study",
    icon: "/images/work/moodmix/icon.png",
    shots: rail("moodmix", [
      "MoodMix input screen asking How are you feeling?",
      "A happy result with mood breakdown and a matching playlist",
      "How it works, and the seven moods MoodMix recognises",
    ]),
  },
  {
    slug: "kynigma",
    name: "Kynigma",
    line: "The studio site for a two-person design and engineering practice in Lagos.",
    href: "/work/kynigma",
    linkLabel: "Case study",
    icon: "/images/work/kynigma/icon.svg",
    shots: rail("kynigma", [
      "Kynigma home page, Websites that sell. Software that thinks.",
      "Selected work grid",
      "Services page covering design, brand, web and commerce",
      "Pricing page with Launch, Studio and Commerce packages",
    ]),
  },
  {
    slug: "letters",
    name: "Letters",
    line: "A private, self-hosted place to write letters to someone you love. She reads with no login and no tracking.",
    status: "Private project",
    shots: rail("letters", [
      "A letter in the warm paper reading view",
      "The reader's archive of letters",
      "The writer's dashboard with published letters and a draft",
    ]),
  },
  {
    slug: "arc-escrow",
    name: "ARC Escrow",
    line: "Trustless USDC escrow for AI agent payments, built on the Arc testnet.",
    href: "https://arc-escrow-app-psi.vercel.app",
    linkLabel: "Live app",
    external: true,
    shots: rail("arc-escrow", [
      "Landing page, Trustless payments for AI agents",
      "Why Arc: USDC gas, sub-second finality",
      "Escrow dashboard for locking funds against a task",
      "Agent registry and directory",
    ]),
  },
  {
    slug: "circuits-and-soles",
    name: "Circuits&Soles",
    line: "A community-first streetwear marketplace: catalog, culture and test-mode checkout.",
    href: "https://github.com/0xkhingx/circuits-and-soles",
    linkLabel: "Source",
    external: true,
    shots: rail("circuits-and-soles", [
      "Home page with sneakers and streetwear fanned across the hero",
      "Product page for the Star Graphic Low sneaker",
      "Product page for the Cargo Runner fit",
      "Product page for the Rope-Lace Low sneaker",
    ]),
  },
  {
    slug: "attune",
    name: "Attune",
    line: "Ear training and sight reading in a few focused minutes a day.",
    status: "In progress",
    shots: rail("attune", [
      "Attune start screen, Train your ear and read music",
      "Today view with a recommended drill and weekly streak",
      "An interval drill after a correct answer",
      "Session debrief at 80% accuracy",
      "Calibration step, Can you read a staff?",
    ]),
  },
];

export const HOME_SHOWCASE = ["matchday", "architektureart", "moodmix", "kynigma"];
