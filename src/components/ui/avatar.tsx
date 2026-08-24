import Image from "next/image";
import { Logo } from "@/components/ui/logo";

interface AvatarProps {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt }: AvatarProps) {
  return (
    <div className="flex size-20 items-center justify-center overflow-hidden rounded-full border border-foreground/10 bg-foreground/5">
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          width={80}
          height={80}
          className="size-full object-cover"
        />
      ) : (
        <Logo className="h-10 w-auto text-foreground" />
      )}
    </div>
  );
}
