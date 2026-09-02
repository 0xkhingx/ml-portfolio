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
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <p className="text-xs lowercase tracking-[0.2em] text-foreground/50 sm:text-sm sm:tracking-[0.25em]">
        error
      </p>
      <h1 className="mt-3 text-balance font-heading text-[32px] font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
        something went wrong
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-[17px] leading-[1.7] text-foreground/80 sm:mt-6 sm:text-xl sm:leading-relaxed">
        An unexpected error occurred. Try again or head back home.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[15px] lowercase tracking-wide text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:w-auto sm:py-3 sm:text-base"
        >
          try again
        </button>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 font-mono text-xs lowercase text-foreground/50 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 sm:w-auto sm:text-sm"
        >
          back home
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 font-mono text-xs lowercase text-foreground/30 sm:mt-8">
          digest: {error.digest}
        </p>
      ) : null}
    </div>
  );
}
