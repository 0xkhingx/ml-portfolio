import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <FadeIn>
        <h1 className="text-balance font-heading text-[32px] font-medium leading-[1.05] sm:text-4xl md:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-[17px] leading-[1.7] text-foreground sm:mt-6 sm:text-xl sm:leading-relaxed">
          The page you’re looking for doesn’t exist — it may have moved or the
          link is off.
        </p>
      </FadeIn>

      <FadeIn delay={0.08} y={16}>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-6 py-3.5 text-[15px] text-cream transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink sm:w-auto sm:py-3 sm:text-base"
          >
            ← back home
          </Link>
          <Link
            href="/writing"
            className="inline-flex w-full items-center justify-center gap-2 text-sm text-ink transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink sm:w-auto sm:text-sm"
          >
            browse writing
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.14} y={16}>
        <p className="mt-12 text-sm text-ink sm:mt-16 sm:text-sm">
          or try <Link href="/work" className="underline underline-offset-4 hover:text-ink">work</Link> · <Link href="/contact" className="underline underline-offset-4 hover:text-ink">contact</Link>
        </p>
      </FadeIn>
    </div>
  );
}
