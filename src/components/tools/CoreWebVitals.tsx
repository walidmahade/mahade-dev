import { useState } from 'react';

type Vital = { label: string; value: string; verdict: 'good' | 'ni' | 'poor' | 'na' };

type ResultState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; mobile: Vital[]; desktop: Vital[]; finalUrl: string };

const PSI = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

function fmtMs(ms?: number | null) {
  if (ms == null) return '—';
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${Math.round(ms)} ms`;
}

function verdict(metric: string, v: number): Vital['verdict'] {
  if (metric === 'LCP') return v <= 2500 ? 'good' : v <= 4000 ? 'ni' : 'poor';
  if (metric === 'INP') return v <= 200 ? 'good' : v <= 500 ? 'ni' : 'poor';
  if (metric === 'CLS') return v <= 0.1 ? 'good' : v <= 0.25 ? 'ni' : 'poor';
  if (metric === 'FCP') return v <= 1800 ? 'good' : v <= 3000 ? 'ni' : 'poor';
  if (metric === 'TTFB') return v <= 800 ? 'good' : v <= 1800 ? 'ni' : 'poor';
  return 'na';
}

function extract(data: any): Vital[] {
  const audits = data?.lighthouseResult?.audits ?? {};
  const out: Vital[] = [];
  const push = (label: string, a: any) => {
    const v = a?.numericValue;
    const display = a?.displayValue ?? (v != null ? fmtMs(v) : '—');
    out.push({ label, value: display, verdict: v != null ? verdict(label, v) : 'na' });
  };
  push('LCP', audits['largest-contentful-paint']);
  push('INP', audits['interaction-to-next-paint'] ?? audits['total-blocking-time']);
  push('CLS', audits['cumulative-layout-shift']);
  push('FCP', audits['first-contentful-paint']);
  push('TTFB', audits['server-response-time']);
  return out;
}

export default function CoreWebVitals() {
  const [url, setUrl] = useState('https://mahade.dev/');
  const [state, setState] = useState<ResultState>({ status: 'idle' });

  const run = async () => {
    setState({ status: 'loading' });
    try {
      const [mobile, desktop] = await Promise.all([
        fetch(`${PSI}?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`).then((r) =>
          r.json()
        ),
        fetch(`${PSI}?url=${encodeURIComponent(url)}&strategy=desktop&category=performance`).then(
          (r) => r.json()
        ),
      ]);
      if (mobile?.error || desktop?.error) {
        throw new Error(mobile?.error?.message || desktop?.error?.message || 'Unknown error');
      }
      setState({
        status: 'ok',
        mobile: extract(mobile),
        desktop: extract(desktop),
        finalUrl: mobile?.lighthouseResult?.finalUrl ?? url,
      });
    } catch (e) {
      setState({ status: 'error', message: (e as Error).message });
    }
  };

  const badgeColor: Record<Vital['verdict'], string> = {
    good: 'bg-[#D1FAE5] text-[#065F46]',
    ni: 'bg-[#FEF3C7] text-[#92400E]',
    poor: 'bg-[#FEE2E2] text-[#991B1B]',
    na: 'bg-paper-sunken text-ink-muted',
  };

  const badgeLabel: Record<Vital['verdict'], string> = {
    good: 'Good',
    ni: 'Needs work',
    poor: 'Poor',
    na: 'n/a',
  };

  const Table = ({ title, vitals }: { title: string; vitals: Vital[] }) => (
    <div className="rounded-lg border border-line bg-paper p-5">
      <p className="text-eyebrow text-ink-muted">{title}</p>
      <table className="mt-3 w-full">
        <tbody>
          {vitals.map((v) => (
            <tr key={v.label} className="border-b border-line last:border-0">
              <td className="py-2 text-body-sm font-semibold text-ink">{v.label}</td>
              <td className="py-2 text-body-sm text-ink tabular-nums">{v.value}</td>
              <td className="py-2 text-right">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeColor[v.verdict]}`}
                >
                  {badgeLabel[v.verdict]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <label className="block">
        <span className="text-body-sm font-semibold text-ink">URL to test</span>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-[6px] border border-line-strong bg-paper h-11 px-3 text-body-sm"
            placeholder="https://example.com"
          />
          <button
            type="button"
            onClick={run}
            disabled={state.status === 'loading'}
            className="inline-flex h-11 items-center justify-center rounded-[10px] bg-brand px-5 font-medium text-white hover:bg-brand-hover disabled:opacity-60 transition-colors"
          >
            {state.status === 'loading' ? 'Measuring…' : 'Run test'}
          </button>
        </div>
      </label>

      <p className="mt-2 text-body-sm text-ink-muted">
        Powered by Google PageSpeed Insights. Test takes about 20–40 seconds. No API key, no
        server-side tracking.
      </p>

      <div className="mt-8">
        {state.status === 'error' && (
          <div className="rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] p-4 text-[#991B1B] text-body-sm">
            Error: {state.message}
          </div>
        )}
        {state.status === 'ok' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Table title="Mobile" vitals={state.mobile} />
            <Table title="Desktop" vitals={state.desktop} />
          </div>
        )}
      </div>
    </div>
  );
}
