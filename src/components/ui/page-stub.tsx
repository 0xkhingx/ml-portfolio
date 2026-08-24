import { FadeIn } from "@/components/motion/fade-in";

interface PageStubProps {
  title: string;
}

export function PageStub({ title }: PageStubProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-start justify-center px-6">
      <FadeIn>
        <p className="text-sm lowercase tracking-wide text-foreground/50">
          {title}
        </p>
        <h1 className="mt-3 text-5xl font-medium lowercase tracking-tight md:text-7xl">
          coming soon
        </h1>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="mt-6 max-w-md text-base text-foreground/60">
          This page is under construction. The good stuff is on its way.
        </p>
      </FadeIn>
    </div>
  );
}
