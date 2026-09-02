export default function Loading() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-6 pb-24 pt-36 md:pt-44">
      <div className="space-y-4 animate-pulse">
        <div className="h-3 w-16 rounded-full bg-foreground/10" />
        <div className="h-8 w-2/3 rounded bg-foreground/10" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-foreground/10" />
          <div className="h-4 w-5/6 rounded bg-foreground/10" />
          <div className="h-4 w-3/4 rounded bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}
