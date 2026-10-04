"use client";

import { useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_LINK, CAL_NAMESPACE } from "@/data/booking";
import { useTheme } from "@/components/theme/provider";

/**
 * Initializes the Cal.com popup embed for our namespace and keeps the
 * embed theme in sync with the site theme. Safe to call from every
 * trigger — `getCalApi` caches per namespace.
 */
export function useCalPopup() {
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", { layout: "month_view", theme });
    })();
    return () => {
      cancelled = true;
    };
  }, [theme]);
}

interface BookCallTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Opens the Cal.com booking flow in a modal. Rendered as a native
 * `<button>`, so it is keyboard-focusable and activatable by default.
 * Style it like surrounding links — no floating button, no widget.
 */
export function BookCallTrigger({
  children,
  ...props
}: BookCallTriggerProps) {
  useCalPopup();

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      aria-label="Book a call via Cal.com"
      {...props}
    >
      {children}
    </button>
  );
}
