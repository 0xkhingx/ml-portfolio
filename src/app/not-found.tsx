import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-6 pb-24 pt-36 md:pt-44">
      <FadeIn>
        <p className="text-sm lowercase tracking-[0.25em] text-foreground/50">
          404
        </p>
        <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight md:text-5xl">
          page not found
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-foreground/80">
          The page you’re looking for doesn’t exist — it may have moved or the
          link is off.
        </p>
      </FadeIn>

      <FadeIn delay={0.08} y={16}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base lowercase tracking-wide text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
          >
            ← back home
          </Link>
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-sm lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
          >
            browse writing
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.14} y={16}>
        <p className="mt-16 font-mono text-sm lowercase text-foreground/40">
          or try <Link href="/work" className="underline underline-offset-4 hover:text-foreground/60">work</Link> · <Link href="/contact" className="underline underline-offset-4 hover:text-foreground/60">contact</Link>
        </p>
      </FadeIn>
    </div>
  );
}
