export default function Loading() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:pt-44">
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-2/3 rounded-sm bg-lilac" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded-sm bg-lilac" />
          <div className="h-4 w-5/6 rounded-sm bg-lilac" />
          <div className="h-4 w-3/4 rounded-sm bg-lilac" />
        </div>
      </div>
    </div>
  );
}
