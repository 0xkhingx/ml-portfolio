import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    name: "mnist-nn-scratch",
    href: "https://github.com/0xkhingx/mnist-nn-scratch",
    description:
      "A two-layer neural network from scratch in NumPy — backprop, SGD — benchmarked against PyTorch.",
  },
  {
    name: "nigerian-lang-classifier",
    href: "https://github.com/0xkhingx/nigerian-lang-classifier",
    description:
      "Detects English, Yoruba, Igbo, Hausa, and Pidgin from text — 99.4% accuracy across 64k+ sentences.",
  },
  {
    name: "Moodmix",
    href: "https://github.com/0xkhingx/Moodmix",
    description:
      "Classifies music by your mood and pushes a matching playlist to your Spotify.",
  },
  {
    name: "CHEW Copilot",
    href: "https://github.com/0xkhingx/Chew-copilot",
    description:
      "Multilingual AI triage assistant for Nigerian community health extension workers.",
  },
  {
    name: "football-prediction",
    href: "https://github.com/0xkhingx/football-prediction",
    description:
      "Predicts home win / draw / away win across Europe's top five leagues — XGBoost benchmarked against bookmaker odds.",
  },
];
