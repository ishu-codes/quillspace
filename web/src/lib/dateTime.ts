type ParseOptions = { assumeUTC?: boolean; locale?: string };

export function getRelativeTime(input: string | Date | number, opts: ParseOptions = {}): string {
    const { assumeUTC = true, locale = "en" } = opts;

    function parseInput(i: string | Date | number): Date | null {
        if (i instanceof Date) return i;
        if (typeof i === "number") return new Date(i);
        if (typeof i !== "string") return null;

        const s = i.trim();
        let iso = s.replace(" ", "T");

        // If assumeUTC, append 'Z' when no timezone present (so it's treated as UTC)
        const tzPresent = /(?:Z|[+-]\d{2}:\d{2})$/.test(iso);
        if (assumeUTC && !tzPresent) iso += "Z";

        const d = new Date(iso);
        if (!Number.isNaN(d.getTime())) return d;

        // Fallback: manual parse (YYYY-MM-DD HH:MM:SS(.sss)?)
        const m = s.match(
            /^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d+))?)?/
        );
        if (!m) return null;
        const [, y, mo, da, hh, mm, ss = "0", ms = "0"] = m;
        if (assumeUTC) {
            return new Date(
                Date.UTC(
                    Number(y),
                    Number(mo) - 1, // 0-index based
                    Number(da),
                    Number(hh),
                    Number(mm),
                    Number(ss),
                    Math.floor(Number(ms) / 10 ** Math.max(0, ms.length - 3))
                )
            );
        }
        return new Date(
            Number(y),
            Number(mo) - 1,
            Number(da),
            Number(hh),
            Number(mm),
            Number(ss),
            Math.floor(Number(ms) / 10 ** Math.max(0, ms.length - 3))
        );
    }

    const parsed = parseInput(input);
    if (!parsed || Number.isNaN(parsed.getTime())) return "invalid date";

    const now = new Date();
    const diffMs = parsed.getTime() - now.getTime();
    const diffSec = Math.round(diffMs / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    // units ordered largest -> smallest with seconds per unit
    const units: [Intl.RelativeTimeFormatUnit, number][] = [
        ["year", 60 * 60 * 24 * 365],
        ["month", 60 * 60 * 24 * 30],
        ["week", 60 * 60 * 24 * 7],
        ["day", 60 * 60 * 24],
        ["hour", 60 * 60],
        ["minute", 60],
        ["second", 1],
    ];

    for (const [unit, secondsInUnit] of units) {
        const value = Math.round(diffSec / secondsInUnit);
        if (Math.abs(value) >= 1) return rtf.format(value, unit);
    }

    return "just now";
}
