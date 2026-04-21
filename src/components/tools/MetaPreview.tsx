import { useMemo, useState } from 'react';

// Approximate Google SERP max pixel widths
const TITLE_MAX_PX = 580;
const DESC_MAX_PX = 990;

function measureText(text: string, font: string): number {
  if (typeof document === 'undefined') return 0;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;
  ctx.font = font;
  return ctx.measureText(text).width;
}

function truncateToPx(text: string, maxPx: number, font: string): string {
  if (measureText(text, font) <= maxPx) return text;
  let low = 0;
  let high = text.length;
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    if (measureText(text.slice(0, mid) + '…', font) <= maxPx) low = mid;
    else high = mid - 1;
  }
  return text.slice(0, low) + '…';
}

export default function MetaPreview() {
  const [title, setTitle] = useState('Webflow Developer — Mahade Walid');
  const [description, setDescription] = useState(
    'Professional Webflow development for agencies and teams. Unlimited pages on a flat monthly retainer, or hourly via Upwork.'
  );
  const [url, setUrl] = useState('https://mahade.dev/');

  const TITLE_FONT = '20px Arial, sans-serif';
  const DESC_FONT = '14px Arial, sans-serif';

  const display = useMemo(() => {
    if (typeof window === 'undefined') return { t: title, d: description, tPx: 0, dPx: 0 };
    const tPx = Math.round(measureText(title, TITLE_FONT));
    const dPx = Math.round(measureText(description, DESC_FONT));
    return {
      t: truncateToPx(title, TITLE_MAX_PX, TITLE_FONT),
      d: truncateToPx(description, DESC_MAX_PX, DESC_FONT),
      tPx,
      dPx,
    };
  }, [title, description]);

  const Bar = ({ value, max }: { value: number; max: number }) => (
    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-paper-sunken">
      <div
        className={`h-full transition-all ${value > max ? 'bg-[#C8322D]' : 'bg-brand'}`}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-5">
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Page title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
            placeholder="Your page title"
          />
          <div className="mt-1 flex justify-between text-body-sm text-ink-muted">
            <span>
              {display.tPx}px / {TITLE_MAX_PX}px · {title.length} chars
            </span>
            <span className={display.tPx > TITLE_MAX_PX ? 'text-[#C8322D]' : 'text-ink-muted'}>
              {display.tPx > TITLE_MAX_PX ? 'Will be truncated' : 'Fits'}
            </span>
          </div>
          <Bar value={display.tPx} max={TITLE_MAX_PX} />
        </label>

        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Meta description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 text-body-sm min-h-[96px]"
            placeholder="Two compelling sentences with your primary keyword"
          />
          <div className="mt-1 flex justify-between text-body-sm text-ink-muted">
            <span>
              {display.dPx}px / {DESC_MAX_PX}px · {description.length} chars
            </span>
            <span className={display.dPx > DESC_MAX_PX ? 'text-[#C8322D]' : 'text-ink-muted'}>
              {display.dPx > DESC_MAX_PX ? 'Will be truncated' : 'Fits'}
            </span>
          </div>
          <Bar value={display.dPx} max={DESC_MAX_PX} />
        </label>

        <label className="block">
          <span className="text-body-sm font-semibold text-ink">URL</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
          />
        </label>
      </div>

      <div className="mt-8 rounded-lg border border-line bg-white p-6">
        <p className="text-eyebrow text-ink-muted">Google SERP preview</p>
        <div className="mt-4 max-w-[600px]">
          <p className="text-[14px] text-[#202124] truncate">{url}</p>
          <p className="mt-1 text-[20px] leading-[1.3] text-[#1a0dab] cursor-pointer hover:underline">
            {display.t || 'Your title will appear here'}
          </p>
          <p className="mt-1 text-[14px] leading-[1.58] text-[#4d5156]">
            {display.d || 'Your meta description will appear here.'}
          </p>
        </div>
      </div>
    </div>
  );
}
