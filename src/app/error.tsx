"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-6 pb-24 pt-36 md:pt-44">
      <p className="text-sm lowercase tracking-[0.25em] text-foreground/50">
        error
      </p>
      <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight md:text-5xl">
        something went wrong
      </h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-foreground/80">
        An unexpected error occurred. Try again or head back home.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base lowercase tracking-wide text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
        >
          try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-sm lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
        >
          back home
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-8 font-mono text-xs lowercase text-foreground/30">
          digest: {error.digest}
        </p>
      ) : null}
    </div>
  );
}
