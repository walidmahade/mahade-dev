import { useCallback, useEffect, useState } from 'react';

const SUMMARY_URL = 'https://status.webflow.com/api/v2/summary.json';
const STATUS_PAGE = 'https://status.webflow.com';

type Indicator = 'none' | 'minor' | 'major' | 'critical' | 'maintenance';
type CompStatus =
  | 'operational'
  | 'degraded_performance'
  | 'partial_outage'
  | 'major_outage'
  | 'under_maintenance';

type Summary = {
  page?: { updated_at?: string };
  status: { indicator: Indicator; description: string };
  components: { id: string; name: string; status: CompStatus; group?: boolean }[];
  incidents: { id: string; name: string; status: string; shortlink?: string; updated_at?: string }[];
};

const INDICATOR: Record<Indicator, { up: boolean; label: string; tone: string; dot: string }> = {
  none: { up: true, label: 'All systems operational', tone: 'border-emerald-200 bg-emerald-50 text-emerald-800', dot: 'bg-emerald-500' },
  minor: { up: false, label: 'Minor service issues', tone: 'border-amber-200 bg-amber-50 text-amber-900', dot: 'bg-amber-500' },
  major: { up: false, label: 'Partial outage', tone: 'border-orange-200 bg-orange-50 text-orange-900', dot: 'bg-orange-500' },
  critical: { up: false, label: 'Major outage', tone: 'border-red-200 bg-red-50 text-red-900', dot: 'bg-red-500' },
  maintenance: { up: true, label: 'Under maintenance', tone: 'border-sky-200 bg-sky-50 text-sky-900', dot: 'bg-sky-500' },
};

const COMP: Record<CompStatus, { label: string; cls: string }> = {
  operational: { label: 'Operational', cls: 'text-emerald-700' },
  degraded_performance: { label: 'Degraded', cls: 'text-amber-700' },
  partial_outage: { label: 'Partial outage', cls: 'text-orange-700' },
  major_outage: { label: 'Major outage', cls: 'text-red-700' },
  under_maintenance: { label: 'Maintenance', cls: 'text-sky-700' },
};

function fmt(iso?: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return '';
  }
}

export default function WebflowStatus() {
  const [data, setData] = useState<Summary | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [checkedAt, setCheckedAt] = useState<string>('');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const res = await fetch(SUMMARY_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as Summary;
      setData(json);
      setState('ok');
      setCheckedAt(new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }));
    } catch {
      setState('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const ind = data ? INDICATOR[data.status.indicator] ?? INDICATOR.none : null;
  const components = (data?.components ?? []).filter((c) => !c.group);

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      {state === 'loading' && (
        <p className="py-8 text-center text-ink-muted">Checking Webflow’s status…</p>
      )}

      {state === 'error' && (
        <div className="rounded-lg border border-line bg-paper-tint p-6 text-center">
          <p className="text-heading-md text-ink">Couldn’t reach the status feed</p>
          <p className="mt-2 text-body-sm text-ink-muted">
            That usually means a network/ad-blocker hiccup on your end, not a Webflow outage.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={load}
              className="inline-flex h-10 items-center rounded-[10px] bg-ink px-4 text-body-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Try again
            </button>
            <a
              href={STATUS_PAGE}
              target="_blank"
              rel="noopener"
              className="inline-flex h-10 items-center rounded-[10px] border border-line-strong px-4 text-body-sm font-medium text-ink no-underline hover:bg-paper-tint transition-colors"
            >
              Open status.webflow.com
            </a>
          </div>
        </div>
      )}

      {state === 'ok' && data && ind && (
        <>
          <div className={`flex items-center gap-4 rounded-xl border p-5 ${ind.tone}`}>
            <span className="relative flex h-3 w-3 shrink-0">
              {!ind.up && (
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${ind.dot}`} />
              )}
              <span className={`relative inline-flex h-3 w-3 rounded-full ${ind.dot}`} />
            </span>
            <div>
              <p className="text-heading-md font-semibold">
                {ind.up ? 'No — Webflow is up.' : 'Yes — Webflow is reporting issues.'}
              </p>
              <p className="text-body-sm opacity-80">{data.status.description || ind.label}</p>
            </div>
          </div>

          {data.incidents.length > 0 && (
            <div className="mt-6">
              <p className="text-eyebrow text-ink-muted">Active incidents</p>
              <ul className="mt-3 space-y-3">
                {data.incidents.map((inc) => (
                  <li key={inc.id} className="rounded-lg border border-line bg-paper-tint p-4">
                    <a
                      href={inc.shortlink || STATUS_PAGE}
                      target="_blank"
                      rel="noopener"
                      className="text-body-sm font-medium text-ink no-underline hover:text-brand"
                    >
                      {inc.name}
                    </a>
                    <p className="mt-1 text-body-sm text-ink-muted capitalize">
                      {inc.status.replace(/_/g, ' ')} · updated {fmt(inc.updated_at)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <p className="text-eyebrow text-ink-muted">Components</p>
            <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {components.map((c) => {
                const s = COMP[c.status] ?? COMP.operational;
                return (
                  <li key={c.id} className="flex items-center justify-between gap-3 border-b border-line py-1.5">
                    <span className="text-body-sm text-ink">{c.name}</span>
                    <span className={`text-body-sm font-medium ${s.cls}`}>{s.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-body-sm text-ink-muted">
            <span>
              Live from Webflow’s status feed{checkedAt ? ` · checked ${checkedAt}` : ''}
              {data.page?.updated_at ? ` · feed updated ${fmt(data.page.updated_at)}` : ''}
            </span>
            <button
              type="button"
              onClick={load}
              className="inline-flex h-9 items-center rounded-[10px] border border-line px-4 font-medium text-ink hover:border-line-strong transition-colors"
            >
              Refresh
            </button>
          </div>
        </>
      )}
    </div>
  );
}
