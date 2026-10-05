# 0xkhingx — SWE × ML Portfolio

> Machine learning, human touch.

Personal portfolio of **Ogundele Oluwadamilare (0xkhingx)** — software engineer working across full-stack web and machine learning: bioinformatics & ML research, production NLP/classification models, and the web apps that ship them.

**Live:** https://ml-portfolio-plum-three.vercel.app

## What's inside

| Route | Content |
|---|---|
| `/` | Landing — tagline, selected work, writing teasers |
| `/work` | Case studies with challenge → approach → outcome write-ups |
| `/writing` | Markdown posts (rendered with syntax highlighting), shareable links |
| `/about` | Experience, stack, manifesto |
| `/contact` | Contact + book-a-call (Cal.com embed) |

Featured builds (sourced from [`src/data/projects.ts`](src/data/projects.ts)):

- **[Matchday](https://github.com/0xkhingx/football-prediction)** — fair-play football predictor (tuned XGBoost, 0.985 log-loss on a 1,752-match locked test), live at [matchday.pxxl.click](https://matchday.pxxl.click)
- **[nigerian-lang-classifier](https://github.com/0xkhingx/nigerian-lang-classifier)** — 5-language Nigerian text classifier, 99.4% accuracy on 64k+ sentences
- **[mnist-nn-scratch](https://github.com/0xkhingx/mnist-nn-scratch)** — 2-layer neural net from scratch in NumPy, benchmarked against PyTorch
- **[Moodmix](https://github.com/0xkhingx/Moodmix)** — mood-to-Spotify playlist pipeline (Electric Sheep Africa capstone)
- **[CHEW Copilot](https://github.com/0xkhingx/Chew-copilot)** — multilingual AI triage assistant concept for community health workers

## Tech stack

- **Web:** TypeScript, Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Content:** Markdown + gray-matter, remark/rehype pipeline, Shiki highlighting
- **Integrations:** Cal.com booking embed, Vercel Analytics
- **ML & data (across featured work):** Python, NumPy, scikit-learn, XGBoost, PyTorch

## Run it locally

Requires Node 20+.

```bash
npm ci
npm run dev      # http://localhost:3000
```

```bash
npm run lint     # eslint
npx tsc --noEmit # typecheck (strict mode)
npm run build    # production build
```

## Content workflow

- Writing posts live in `src/content/posts/` as Markdown; metadata helpers in `src/lib/` (`posts.ts`, `post-utils.ts`, `markdown.ts`).
- Project/experience data lives in `src/data/` (`projects.ts`, `experience.ts`, `selected-work.ts`, `socials.ts`) — edit data, not markup, to update the site.
- Booking link is a single source of truth in `src/data/booking.ts` (`CAL_LINK`).

## Deploy

Deploys to Vercel on every push to `master`. No extra config — see `next.config.ts`.

## Contact

- Email: [0xkhingx@gmail.com](mailto:0xkhingx@gmail.com)
- GitHub: [@0xkhingx](https://github.com/0xkhingx) · LinkedIn: [0xkhingx](https://www.linkedin.com/in/0xkhingx) · X: [@0xkhingx](https://x.com/0xkhingx)

## License

MIT — see [LICENSE](LICENSE).
