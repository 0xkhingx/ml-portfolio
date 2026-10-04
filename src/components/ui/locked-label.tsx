import { LockIcon } from "@/icons/lock";

interface LockedLabelProps {
  label: string;
  className?: string;
  iconClassName?: string;
}

/**
 * Intentionally-unavailable nav label. Renders as a non-interactive element
 * (never a link): muted, not-allowed cursor, tiny lock, and a minimal
 * "Coming soon" tooltip on hover and keyboard focus.
 */
export function LockedLabel({
  label,
  className = "",
  iconClassName = "size-3",
}: LockedLabelProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-label={`${label} — coming soon`}
      title="Coming soon"
      tabIndex={0}
      className={`group/locked relative inline-flex cursor-not-allowed items-center gap-1 opacity-40 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40 ${className}`}
    >
      <span aria-hidden="true">{label}</span>
      <LockIcon className={iconClassName} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-[3px] border border-foreground/10 bg-foreground px-2 py-1 text-[11px] lowercase tracking-wide text-background opacity-0 transition-opacity duration-150 group-hover/locked:opacity-100 group-focus-visible/locked:opacity-100"
      >
        Coming soon
      </span>
    </span>
  );
}
