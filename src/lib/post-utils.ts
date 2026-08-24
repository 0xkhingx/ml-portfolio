export function formatDate(iso: string): string {
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso));
  return formatted.toLowerCase();
}

export function groupByYear<T extends { date: string }>(
  posts: T[],
): [string, T[]][] {
  const groups = new Map<string, T[]>();
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  for (const post of sorted) {
    const year = post.date.slice(0, 4);
    const existing = groups.get(year);
    if (existing) {
      existing.push(post);
    } else {
      groups.set(year, [post]);
    }
  }

  return [...groups.entries()];
}
