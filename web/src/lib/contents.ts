export type HeadingItem = {
  id: string;
  text: string;
  level: number; // 1 or 2
};

export function extractHeadings(markdown: string): HeadingItem[] {
  const lines = markdown.split("\n");
  const occurrences: Record<string, number> = {};
  const headings: HeadingItem[] = [];

  for (const line of lines) {
    const match = /^(#{1,2})\s+(.*)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length;
    if (level !== 1 && level !== 2) continue;

    const raw = match[2].trim();
    const base = raw
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    occurrences[base] = (occurrences[base] || 0) + 1;
    const suffix = occurrences[base] > 1 ? `-${occurrences[base]}` : "";

    const id = `${base}${suffix}`;

    headings.push({ id, text: raw, level });
  }

  return headings;
}
