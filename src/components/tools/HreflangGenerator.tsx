import { useMemo, useState } from 'react';

type Row = { hreflang: string; url: string };

const COMMON_CODES = [
  'en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'es', 'es-ES', 'es-MX', 'fr', 'fr-FR',
  'fr-CA', 'de', 'de-DE', 'it', 'pt', 'pt-BR', 'nl', 'sv', 'da', 'no', 'fi', 'pl',
  'ja', 'ko', 'zh', 'zh-CN', 'zh-TW', 'ar', 'hi', 'ru', 'tr',
];

const VALID = /^[a-z]{2,3}(-[A-Z]{2})?$/;

export default function HreflangGenerator() {
  const [rows, setRows] = useState<Row[]>([
    { hreflang: 'en', url: 'https://example.com/' },
    { hreflang: 'es', url: 'https://example.com/es/' },
  ]);
  const [xDefault, setXDefault] = useState('https://example.com/');
  const [copied, setCopied] = useState(false);

  const setRow = (i: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const addRow = () => setRows((rs) => [...rs, { hreflang: '', url: '' }]);
  const removeRow = (i: number) => setRows((rs) => rs.filter((_, idx) => idx !== i));

  const filled = rows.filter((r) => r.hreflang.trim() && r.url.trim());

  const tags = useMemo(() => {
    const lines = filled.map(
      (r) => `<link rel="alternate" hreflang="${r.hreflang.trim()}" href="${r.url.trim()}" />`
    );
    if (xDefault.trim()) {
      lines.push(`<link rel="alternate" hreflang="x-default" href="${xDefault.trim()}" />`);
    }
    return lines.join('\n');
  }, [filled, xDefault]);

  const badCodes = filled.filter((r) => !VALID.test(r.hreflang.trim()));

  const copy = async () => {
    await navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <datalist id="hreflang-codes">
        {COMMON_CODES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3">
            <input
              value={r.hreflang}
              onChange={(e) => setRow(i, { hreflang: e.target.value })}
              list="hreflang-codes"
              placeholder="en-US"
              aria-label={`Language/region code, row ${i + 1}`}
              className="h-10 w-28 rounded-[6px] border border-line-strong bg-paper px-3 font-mono text-body-sm"
            />
            <input
              value={r.url}
              onChange={(e) => setRow(i, { url: e.target.value })}
              placeholder="https://example.com/page"
              aria-label={`URL, row ${i + 1}`}
              className="h-10 flex-1 min-w-[200px] rounded-[6px] border border-line-strong bg-paper px-3 text-body-sm"
            />
            <button
              type="button"
              onClick={() => removeRow(i)}
              disabled={rows.length === 1}
              aria-label={`Remove row ${i + 1}`}
              className="h-10 w-10 shrink-0 rounded-[8px] border border-line text-ink-muted hover:border-line-strong disabled:opacity-40 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 inline-flex h-9 items-center rounded-[10px] border border-line px-4 text-body-sm font-medium text-ink hover:border-line-strong transition-colors"
      >
        + Add language
      </button>

      <label className="mt-6 block">
        <span className="text-body-sm font-semibold text-ink">x-default URL (recommended)</span>
        <input
          value={xDefault}
          onChange={(e) => setXDefault(e.target.value)}
          placeholder="https://example.com/"
          className="mt-2 h-10 w-full rounded-[6px] border border-line-strong bg-paper px-3 text-body-sm"
        />
        <span className="mt-1 block text-body-sm text-ink-muted">
          Where users go when no language matches — usually your default/global page.
        </span>
      </label>

      {badCodes.length > 0 && (
        <p className="mt-4 rounded-lg border border-line bg-paper-tint px-4 py-3 text-body-sm text-ink-muted">
          Heads up: <span className="font-mono text-ink">{badCodes.map((b) => b.hreflang).join(', ')}</span>{' '}
          may be invalid. Use a lowercase language code, optionally with an uppercase region — e.g.{' '}
          <span className="font-mono">en</span> or <span className="font-mono">en-US</span>.
        </p>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-eyebrow text-ink-muted">Generated tags</p>
          <button
            type="button"
            onClick={copy}
            disabled={!tags}
            className="inline-flex h-9 items-center rounded-[10px] bg-brand px-4 text-body-sm font-medium text-white hover:bg-brand-hover disabled:opacity-50 transition-colors"
          >
            {copied ? 'Copied ✓' : 'Copy tags'}
          </button>
        </div>
        <pre className="mt-3 overflow-auto rounded-lg bg-ink text-paper p-4 text-[13px] leading-relaxed font-mono">
          <code className="whitespace-pre">{tags || '<!-- Add at least one language + URL -->'}</code>
        </pre>
        <p className="mt-3 text-body-sm text-ink-muted">
          Every page in a language set must list <strong className="text-ink">all</strong> versions, including
          itself, and they must point back at each other. Paste these in each page&rsquo;s{' '}
          <code className="font-mono">&lt;head&gt;</code>.
        </p>
      </div>
    </div>
  );
}
