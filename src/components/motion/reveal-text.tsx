"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
  text: string;
  className?: string;
}

/**
 * Body copy that brightens word by word as it travels through the
 * viewport — dim at the bottom, full once scrolled past. Scrub-linked,
 * so scrolling back up dims it again. Opacity-only: no layout shift.
 * Renders plain text when the visitor prefers reduced motion.
 */
export function RevealText({ text, className }: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  if (reduceMotion) {
    return (
      <p className={className}>{text}</p>
    );
  }

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }}>
      {children}
      {` `}
    </motion.span>
  );
}
