import Image from "next/image";
import { Logo } from "@/components/ui/logo";

type StripItem =
  | { kind: "image"; src: string; alt: string; width: string }
  | { kind: "logo"; width: string };

const ITEMS: StripItem[] = [
  {
    kind: "image",
    src: "/images/about/portrait-main.png",
    alt: "Portrait of Dre",
    width: "w-44 sm:w-52",
  },
  {
    kind: "image",
    src: "/images/work/architektureart/thumb-full.png",
    alt: "ArchitektureArt gallery site preview",
    width: "w-64 sm:w-80",
  },
  {
    kind: "logo",
    width: "w-44 sm:w-52",
  },
  {
    kind: "image",
    src: "/images/work/matchday/thumb-full.png",
    alt: "Matchday football predictor preview",
    width: "w-64 sm:w-80",
  },
  {
    kind: "image",
    src: "/images/work/moodmix/thumb-full.png",
    alt: "Moodmix mood-to-music app preview",
    width: "w-56 sm:w-72",
  },
  {
    kind: "image",
    src: "/images/about/portrait-secondary.png",
    alt: "",
    width: "w-44 sm:w-52",
  },
  {
    kind: "image",
    src: "/images/work/kynigma/thumb-full.png",
    alt: "Kynigma studio site preview",
    width: "w-64 sm:w-80",
  },
];

/**
 * A shallow, full-bleed band of work + personal imagery that drifts
 * continuously and loops seamlessly. No cards, no captions, no controls —
 * just a visual glimpse. Pauses on hover/focus; static when the visitor
 * prefers reduced motion. The second copy is hidden from assistive tech.
 * To add a code or research screenshot later, append an entry above.
 */
export function AboutStrip() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="strip-marquee flex w-max">
        <StripCopy />
        <StripCopy hidden />
      </div>
    </div>
  );
}

function StripCopy({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex h-44 flex-none gap-2 pr-2 md:h-52"
    >
      {ITEMS.map((item, index) => (
        <div
          key={`${item.kind === "image" ? item.src : `logo-${index}`}${hidden ? "-copy" : ""}`}
          className={`relative h-full flex-none overflow-hidden rounded-[3px] ${item.width}`}
        >
          {item.kind === "image" ? (
            <Image
              src={item.src}
              alt={hidden ? "" : item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 320px"
              className="object-cover"
            />
          ) : (
            <div
              aria-label="0xkhingx logo"
              role="img"
              className="flex h-full w-full items-center justify-center bg-foreground/[0.04]"
            >
              <Logo className="h-12 w-auto text-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
