import { useEffect, useMemo, useState } from 'react';

type Item = { id: string; label: string; hint?: string };
type Group = { name: string; items: Item[] };

const GROUPS: Group[] = [
  {
    name: 'SEO fundamentals',
    items: [
      { id: 'meta-title', label: 'Unique <title> on every page', hint: 'Targets primary keyword, under 60 chars' },
      { id: 'meta-desc', label: 'Meta description on every page', hint: 'Compelling, under 155 chars' },
      { id: 'canonical', label: 'Canonical URL set on every page' },
      { id: 'og', label: 'OG image + og:title + og:description' },
      { id: 'twitter', label: 'twitter:card = summary_large_image' },
      { id: 'h1', label: 'Exactly one H1 per page' },
      { id: 'schema', label: 'JSON-LD for Person/Organization and any rich-result pages' },
      { id: 'sitemap', label: 'sitemap.xml accessible and submitted to GSC' },
      { id: 'robots', label: 'robots.txt present and not blocking by mistake' },
      { id: 'favicon', label: 'Favicon + apple-touch-icon' },
    ],
  },
  {
    name: 'Performance',
    items: [
      { id: 'lh-perf', label: 'Lighthouse Performance ≥ 90 on mobile' },
      { id: 'lcp', label: 'LCP < 2.5s on mobile' },
      { id: 'cls', label: 'CLS < 0.1 on every page' },
      { id: 'images', label: 'All images served as WebP/AVIF with srcset' },
      { id: 'lazy', label: 'Below-fold images lazy-loaded' },
      { id: 'fonts', label: 'Fonts self-hosted or preconnected, with font-display: swap' },
      { id: 'js', label: 'No unused JS shipped (split or removed)' },
    ],
  },
  {
    name: 'Links + redirects',
    items: [
      { id: 'internal', label: 'No broken internal links (crawl with link checker)' },
      { id: '301', label: '301 redirects for every old URL (if migrating)' },
      { id: 'external', label: 'External links open in new tab with rel="noopener"' },
      { id: '404', label: 'Custom 404 page with navigation' },
    ],
  },
  {
    name: 'Analytics + conversion',
    items: [
      { id: 'ga', label: 'Analytics installed (GA4, Plausible, Fathom)' },
      { id: 'events', label: 'Key events tracked (form submit, CTA click)' },
      { id: 'forms', label: 'All forms submit + send notifications' },
      { id: 'thanks', label: 'Thank-you page exists for conversion tracking' },
    ],
  },
  {
    name: 'CMS + content',
    items: [
      { id: 'cms', label: 'CMS Collections populated with real content' },
      { id: 'copy', label: 'All copy proofread (run through spell checker)' },
      { id: 'alt', label: 'Every image has alt text' },
      { id: 'lorem', label: 'No lorem ipsum anywhere in production' },
    ],
  },
  {
    name: 'Launch day',
    items: [
      { id: 'dns', label: 'DNS points to production and SSL is active' },
      { id: 'www', label: 'www + apex both resolve (redirect one to the other)' },
      { id: 'password', label: 'Remove any staging passwords' },
      { id: 'indexing', label: 'Request indexing in Google Search Console' },
      { id: 'monitor', label: 'Uptime monitoring enabled' },
      { id: 'backup', label: 'First backup taken' },
      { id: 'retainer', label: 'Handoff call scheduled with client / team' },
      { id: 'celebrate', label: 'Tell everyone. You launched. 🎉' },
    ],
  },
];

const STORAGE_KEY = 'mahade.webflow-launch-checklist.v1';

export default function LaunchChecklist() {
  const allIds = useMemo(() => GROUPS.flatMap((g) => g.items.map((i) => i.id)), []);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {}
  }, [checked]);

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const reset = () => {
    if (confirm('Reset all progress?')) setChecked({});
  };

  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / allIds.length) * 100);

  return (
    <div>
      <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-eyebrow text-ink-muted">Progress</p>
            <p className="mt-1 text-display-md font-display text-ink">
              {done}
              <span className="text-ink-muted">/{allIds.length}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-heading-md font-semibold text-brand">{pct}%</span>
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-9 items-center rounded-[10px] border border-line-strong px-4 text-body-sm font-medium text-ink hover:bg-paper-tint transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper-sunken">
          <div className="h-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-body-sm text-ink-muted">
          Progress saves automatically in your browser (localStorage).
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        {GROUPS.map((group) => (
          <section key={group.name} className="rounded-xl border border-line bg-paper p-6 md:p-8">
            <h3 className="text-heading-lg text-ink">{group.name}</h3>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.id}>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={!!checked[item.id]}
                      onChange={() => toggle(item.id)}
                      className="mt-1 h-4 w-4 accent-[#4353FF]"
                    />
                    <div>
                      <span
                        className={`text-body-lg ${
                          checked[item.id] ? 'text-ink-subtle line-through' : 'text-ink'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.hint && (
                        <p className="text-body-sm text-ink-muted">{item.hint}</p>
                      )}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
