import { useMemo, useState } from 'react';

type Sep = '-' | '_';

function slugify(input: string, sep: Sep): string {
  const base = input
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '') // strip accents (é -> e)
    .replace(/['’`]/g, '') // don't -> dont
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric -> hyphen
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
  return sep === '-' ? base : base.replace(/-/g, sep);
}

const EXAMPLE = 'How to Hire a Webflow Developer in 2026\nFigma → Webflow: The Handoff Spec\nWhat’s the Best Webflow CMS Structure?';

export default function SlugGenerator() {
  const [text, setText] = useState(EXAMPLE);
  const [sep, setSep] = useState<Sep>('-');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const rows = useMemo(
    () =>
      text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => ({ original: line, slug: slugify(line, sep) })),
    [text, sep]
  );

  const copy = async (value: string, idx: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1200);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(rows.map((r) => r.slug).join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1200);
  };

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="block flex-1 min-w-[240px]">
          <span className="text-body-sm font-semibold text-ink">Titles (one per line)</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 text-body-sm min-h-[120px]"
          />
        </label>
        <div>
          <span className="block text-body-sm font-semibold text-ink mb-2">Separator</span>
          <div className="flex gap-2">
            {(['-', '_'] as Sep[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSep(s)}
                className={`h-10 w-10 rounded-[10px] font-mono text-body-sm transition-colors ${
                  sep === s ? 'bg-ink text-paper' : 'border border-line text-ink hover:border-line-strong'
                }`}
                aria-pressed={sep === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-eyebrow text-ink-muted">{rows.length} slug{rows.length > 1 ? 's' : ''}</p>
            <button
              type="button"
              onClick={copyAll}
              className="inline-flex h-9 items-center rounded-[10px] bg-brand px-4 text-body-sm font-medium text-white hover:bg-brand-hover transition-colors"
            >
              {copiedAll ? 'Copied ✓' : 'Copy all'}
            </button>
          </div>
          <ul className="mt-3 divide-y divide-line rounded-lg border border-line">
            {rows.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-body-sm text-ink-muted">{r.original}</p>
                  <p className="truncate font-mono text-body-sm text-ink">{r.slug}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copy(r.slug, i)}
                  className="shrink-0 rounded-[8px] border border-line px-3 py-1.5 text-body-sm text-ink hover:border-line-strong transition-colors"
                >
                  {copiedIdx === i ? 'Copied ✓' : 'Copy'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
