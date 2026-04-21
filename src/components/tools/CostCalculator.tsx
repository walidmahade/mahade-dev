import { useMemo, useState } from 'react';

type Cms = 'none' | 'basic' | 'complex';
type Migration = 'none' | 'wp' | 'squarespace' | 'framer' | 'custom';
type Seo = 'basic' | 'standard' | 'advanced';

const currency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function CostCalculator() {
  const [pages, setPages] = useState(8);
  const [cms, setCms] = useState<Cms>('basic');
  const [migration, setMigration] = useState<Migration>('none');
  const [seo, setSeo] = useState<Seo>('standard');

  const estimate = useMemo(() => {
    const perPage = pages <= 5 ? 320 : pages <= 15 ? 260 : 220;
    const pagesCost = pages * perPage;
    const cmsCost = cms === 'none' ? 0 : cms === 'basic' ? 600 : 1800;
    const migrationCost =
      migration === 'none'
        ? 0
        : migration === 'framer'
        ? 600
        : migration === 'squarespace'
        ? 900
        : migration === 'wp'
        ? 1400
        : 1800;
    const seoCost = seo === 'basic' ? 0 : seo === 'standard' ? 500 : 1400;

    const base = pagesCost + cmsCost + migrationCost + seoCost;
    const low = Math.round(base * 0.9);
    const high = Math.round(base * 1.25);

    return { low, high, base };
  }, [pages, cms, migration, seo]);

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-body-sm font-semibold text-ink">{children}</label>
  );

  const Choice = <T extends string>({
    value,
    current,
    onSelect,
    children,
  }: {
    value: T;
    current: T;
    onSelect: (v: T) => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`rounded-[10px] border px-4 py-2 text-body-sm text-left transition-colors ${
        current === value
          ? 'border-brand bg-brand-soft text-ink'
          : 'border-line bg-paper text-ink hover:border-line-strong'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-6">
        <div>
          <Label>How many pages?</Label>
          <div className="mt-3 flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={40}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="flex-1 accent-[#4353FF]"
              aria-label="Number of pages"
            />
            <span className="min-w-[3ch] text-heading-md font-semibold text-ink">{pages}</span>
          </div>
        </div>

        <div>
          <Label>CMS collections</Label>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Choice value="none" current={cms} onSelect={setCms}>None</Choice>
            <Choice value="basic" current={cms} onSelect={setCms}>Basic blog</Choice>
            <Choice value="complex" current={cms} onSelect={setCms}>Multi-collection</Choice>
          </div>
        </div>

        <div>
          <Label>Migration from</Label>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
            <Choice value="none" current={migration} onSelect={setMigration}>Greenfield</Choice>
            <Choice value="framer" current={migration} onSelect={setMigration}>Framer</Choice>
            <Choice value="squarespace" current={migration} onSelect={setMigration}>Squarespace</Choice>
            <Choice value="wp" current={migration} onSelect={setMigration}>WordPress</Choice>
            <Choice value="custom" current={migration} onSelect={setMigration}>Custom</Choice>
          </div>
        </div>

        <div>
          <Label>SEO depth</Label>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Choice value="basic" current={seo} onSelect={setSeo}>Basic meta</Choice>
            <Choice value="standard" current={seo} onSelect={setSeo}>Standard</Choice>
            <Choice value="advanced" current={seo} onSelect={setSeo}>Advanced + schema</Choice>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-ink text-paper p-6 md:p-8">
        <p className="text-eyebrow text-brand-soft">Estimated one-time cost</p>
        <p className="mt-3 text-display-md font-display">
          {currency(estimate.low)} – {currency(estimate.high)}
        </p>
        <p className="mt-3 text-paper/80 text-body-sm leading-relaxed">
          Most projects in this bracket launch in {pages <= 5 ? '1–2' : pages <= 15 ? '2–4' : '4–8'} weeks.
          Prefer a monthly retainer? That is a flat <strong className="text-paper">$1,999/mo</strong> for unlimited pages at 48-hour turnaround.
        </p>
      </div>
    </div>
  );
}
