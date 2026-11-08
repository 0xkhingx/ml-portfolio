"use client";

import { useEffect, useState } from "react";
import { LinkedinIcon, XBrandIcon } from "@/icons/social";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // user dismissed — no-op
    }
  }

  const linkClasses =
    "inline-flex items-center gap-1.5 py-1 text-sm text-ink underline decoration-mist underline-offset-4 transition-colors hover:text-foreground hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <div className="mt-16 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-20">
      <p className="text-sm text-ink">Share</p>
      <div className="contents">
        <a
          href={url ? `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` : undefined}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Share "${title}" on X`}
          className={linkClasses}
        >
          <XBrandIcon className="size-3.5" />
          <span>x</span>
        </a>
        <a
          href={url ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` : undefined}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Share "${title}" on LinkedIn`}
          className={linkClasses}
        >
          <LinkedinIcon className="size-3.5" />
          <span>linkedin</span>
        </a>
        <button
          type="button"
          onClick={copyLink}
          disabled={!url}
          aria-live="polite"
          className={`${linkClasses} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
          <span>{copied ? "copied" : "copy link"}</span>
        </button>
        {canNativeShare && (
          <button type="button" onClick={nativeShare} className={linkClasses}>
            <span aria-hidden="true">↗</span>
            <span>share</span>
          </button>
        )}
      </div>
    </div>
  );
}
