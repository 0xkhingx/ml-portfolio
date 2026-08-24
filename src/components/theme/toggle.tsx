"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { MoonIcon } from "@/icons/moon";
import { SunIcon } from "@/icons/sun";
import { useTheme } from "@/components/theme/provider";

const emptySubscribe = (onChange: () => void) => () => onChange;

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex size-9 items-center justify-center text-foreground/80 transition-colors hover:text-foreground"
    >
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="block"
          >
            {theme === "dark" ? (
              <SunIcon className="size-[18px]" />
            ) : (
              <MoonIcon className="size-[18px]" />
            )}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="block size-[18px]" />
      )}
    </button>
  );
}
