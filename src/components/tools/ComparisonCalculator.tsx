import { useMemo, useState } from 'react';

const currency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function ComparisonCalculator() {
  const [pages, setPages] = useState(10);
  const [updatesPerMonth, setUpdatesPerMonth] = useState(4);
  const [devRate, setDevRate] = useState(75);
  const [years, setYears] = useState(5);

  const costs = useMemo(() => {
    // Webflow: site plan + CMS plan baseline
    const webflowHostingPerYear = 432; // $36/mo CMS plan
    const webflowBuild = pages * 240;
    const webflowUpdateMinutes = 20;
    const webflowUpdatesCost =
      (updatesPerMonth * 12 * years * webflowUpdateMinutes * devRate) / 60;
    const webflowMaintenance = years * 0;
    const webflowTotal =
      webflowBuild + webflowHostingPerYear * years + webflowUpdatesCost + webflowMaintenance;

    // WordPress: hosting + plugin licenses + dev time
    const wpHostingPerYear = 348; // $29/mo managed WP
    const wpPluginsPerYear = 240;
    const wpBuild = pages * 200;
    const wpUpdateMinutes = 45;
    const wpUpdatesCost = (updatesPerMonth * 12 * years * wpUpdateMinutes * devRate) / 60;
    const wpPluginIncidentsPerYear = 3;
    const wpSecurityTimePerIncident = 60;
    const wpIncidentCost =
      (wpPluginIncidentsPerYear * years * wpSecurityTimePerIncident * devRate) / 60;
    const wpTotal =
      wpBuild +
      (wpHostingPerYear + wpPluginsPerYear) * years +
      wpUpdatesCost +
      wpIncidentCost;

    const savings = wpTotal - webflowTotal;
    return { webflow: webflowTotal, wp: wpTotal, savings };
  }, [pages, updatesPerMonth, devRate, years]);

  const Slider = ({
    label,
    value,
    min,
    max,
    step = 1,
    suffix,
    onChange,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    suffix?: string;
    onChange: (n: number) => void;
  }) => (
    <div>
      <label className="flex items-baseline justify-between">
        <span className="text-body-sm font-semibold text-ink">{label}</span>
        <span className="text-heading-md font-semibold text-ink">
          {value}
          {suffix}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#4353FF]"
        aria-label={label}
      />
    </div>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Slider label="Pages on the site" value={pages} min={3} max={60} onChange={setPages} />
        <Slider
          label="Updates per month"
          value={updatesPerMonth}
          min={0}
          max={20}
          onChange={setUpdatesPerMonth}
        />
        <Slider
          label="Developer hourly rate"
          value={devRate}
          min={25}
          max={250}
          step={5}
          suffix=" USD"
          onChange={setDevRate}
        />
        <Slider
          label="Horizon"
          value={years}
          min={1}
          max={10}
          suffix=" yrs"
          onChange={setYears}
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-brand text-white p-6">
          <p className="text-eyebrow text-white/80">Webflow, {years}-year TCO</p>
          <p className="mt-2 text-display-md font-display">{currency(costs.webflow)}</p>
          <ul className="mt-3 space-y-1 text-body-sm text-white/80">
            <li>Hosting + CMS plan included</li>
            <li>Updates take ~20 min each</li>
            <li>No plugin security work</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-paper p-6">
          <p className="text-eyebrow text-ink-muted">WordPress, {years}-year TCO</p>
          <p className="mt-2 text-display-md font-display text-ink">{currency(costs.wp)}</p>
          <ul className="mt-3 space-y-1 text-body-sm text-ink-muted">
            <li>Managed hosting + plugins</li>
            <li>Updates take ~45 min each</li>
            <li>~3 security incidents/yr</li>
          </ul>
        </div>
      </div>

      {costs.savings > 0 ? (
        <p className="mt-6 rounded-lg bg-brand-soft p-4 text-ink">
          <strong>Webflow saves you {currency(costs.savings)}</strong> over {years} years with these inputs.
        </p>
      ) : (
        <p className="mt-6 rounded-lg bg-paper-sunken p-4 text-ink">
          With these inputs, WordPress is cheaper by {currency(-costs.savings)}. Still worth weighing
          the designer-handoff and security tradeoffs.
        </p>
      )}
    </div>
  );
}
