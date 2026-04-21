import { useMemo, useState } from 'react';

type Source = 'wordpress' | 'squarespace' | 'framer' | 'custom' | 'shopify';

const currency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const baseHoursBySource: Record<Source, number> = {
  wordpress: 14,
  squarespace: 10,
  framer: 6,
  custom: 20,
  shopify: 18,
};

export default function MigrationCalculator() {
  const [source, setSource] = useState<Source>('wordpress');
  const [pages, setPages] = useState(12);
  const [cmsItems, setCmsItems] = useState(30);
  const [redirects, setRedirects] = useState(true);
  const [rate, setRate] = useState(75);

  const est = useMemo(() => {
    const base = baseHoursBySource[source];
    const pageHours = Math.ceil(pages * 0.7);
    const cmsHours = Math.ceil(cmsItems / 25) * 2;
    const redirectHours = redirects ? Math.ceil(pages / 20) * 2 + 2 : 0;
    const qaHours = Math.ceil((base + pageHours + cmsHours + redirectHours) * 0.15);
    const total = base + pageHours + cmsHours + redirectHours + qaHours;

    return {
      hours: total,
      lowCost: Math.round(total * rate * 0.95),
      highCost: Math.round(total * rate * 1.2),
      breakdown: [
        { label: `${source} setup + parity`, h: base },
        { label: `${pages} pages`, h: pageHours },
        { label: `${cmsItems} CMS items`, h: cmsHours },
        { label: redirects ? 'Redirect map + SEO preservation' : 'No redirects', h: redirectHours },
        { label: 'QA + cross-browser', h: qaHours },
      ],
    };
  }, [source, pages, cmsItems, redirects, rate]);

  const SourceBtn = ({ v, label }: { v: Source; label: string }) => (
    <button
      type="button"
      onClick={() => setSource(v)}
      className={`rounded-[10px] border px-4 py-2 text-body-sm ${
        source === v
          ? 'border-brand bg-brand-soft text-ink'
          : 'border-line bg-paper text-ink hover:border-line-strong'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-6">
        <div>
          <label className="text-body-sm font-semibold text-ink">Migrating from</label>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
            <SourceBtn v="wordpress" label="WordPress" />
            <SourceBtn v="squarespace" label="Squarespace" />
            <SourceBtn v="framer" label="Framer" />
            <SourceBtn v="shopify" label="Shopify" />
            <SourceBtn v="custom" label="Custom/hand-coded" />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <label className="block">
            <span className="text-body-sm font-semibold text-ink">Pages</span>
            <input
              type="number"
              min={1}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
            />
          </label>
          <label className="block">
            <span className="text-body-sm font-semibold text-ink">CMS items (posts, etc.)</span>
            <input
              type="number"
              min={0}
              value={cmsItems}
              onChange={(e) => setCmsItems(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
            />
          </label>
          <label className="block">
            <span className="text-body-sm font-semibold text-ink">Dev rate (USD/hr)</span>
            <input
              type="number"
              min={10}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
            />
          </label>
        </div>
        <label className="flex items-center gap-2 text-ink">
          <input
            type="checkbox"
            checked={redirects}
            onChange={(e) => setRedirects(e.target.checked)}
            className="h-4 w-4 accent-[#4353FF]"
          />
          <span className="text-body-sm">Preserve SEO — build redirect map + keep meta</span>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-ink text-paper p-6">
          <p className="text-eyebrow text-brand-soft">Estimated migration</p>
          <p className="mt-2 text-display-md font-display">{est.hours} hours</p>
          <p className="mt-2 text-paper/80">
            {currency(est.lowCost)} – {currency(est.highCost)}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-paper p-6">
          <p className="text-eyebrow text-ink-muted">Breakdown</p>
          <ul className="mt-3 space-y-2">
            {est.breakdown.map((row) => (
              <li key={row.label} className="flex justify-between text-body-sm">
                <span className="text-ink">{row.label}</span>
                <span className="font-semibold text-ink">{row.h}h</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
