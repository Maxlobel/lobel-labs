export function nextFactId(
  ids: string[],
  seen: string[],
  random = Math.random,
): string | null {
  const available = ids.filter((id) => !seen.includes(id));
  return available.length
    ? available[Math.floor(random() * available.length)]
    : null;
}
