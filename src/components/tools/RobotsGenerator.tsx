import { useMemo, useState } from 'react';

type Preset = 'webflow' | 'wordpress' | 'spa' | 'strict' | 'custom';

const presets: Record<Preset, { disallow: string[]; allow: string[] }> = {
  webflow: { disallow: [], allow: [] },
  wordpress: { disallow: ['/wp-admin/', '/wp-login.php', '/?s=', '/*?*'], allow: ['/wp-admin/admin-ajax.php'] },
  spa: { disallow: [], allow: [] },
  strict: { disallow: ['/admin/', '/private/', '/*.pdf$', '/thank-you/'], allow: [] },
  custom: { disallow: [], allow: [] },
};

export default function RobotsGenerator() {
  const [preset, setPreset] = useState<Preset>('webflow');
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml');
  const [disallow, setDisallow] = useState(presets.webflow.disallow.join('\n'));
  const [allow, setAllow] = useState(presets.webflow.allow.join('\n'));
  const [blockAi, setBlockAi] = useState(false);
  const [copied, setCopied] = useState(false);

  const applyPreset = (p: Preset) => {
    setPreset(p);
    setDisallow(presets[p].disallow.join('\n'));
    setAllow(presets[p].allow.join('\n'));
  };

  const output = useMemo(() => {
    const lines: string[] = [];
    lines.push('User-agent: *');
    allow
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((l) => lines.push(`Allow: ${l}`));
    disallow
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((l) => lines.push(`Disallow: ${l}`));
    if (allow.trim() === '' && disallow.trim() === '') lines.push('Allow: /');
    if (blockAi) {
      lines.push('', '# Block common AI crawlers');
      ['GPTBot', 'ClaudeBot', 'CCBot', 'anthropic-ai', 'Google-Extended', 'PerplexityBot'].forEach((ua) => {
        lines.push(`User-agent: ${ua}`, 'Disallow: /', '');
      });
    }
    if (sitemap) lines.push('', `Sitemap: ${sitemap}`);
    return lines.join('\n').replace(/\n{3,}/g, '\n\n');
  }, [allow, disallow, sitemap, blockAi]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const PresetBtn = ({ v, label }: { v: Preset; label: string }) => (
    <button
      type="button"
      onClick={() => applyPreset(v)}
      className={`rounded-[10px] px-4 py-2 text-body-sm ${
        preset === v ? 'bg-ink text-paper' : 'border border-line text-ink hover:border-line-strong'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div>
        <p className="text-body-sm font-semibold text-ink">Preset</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <PresetBtn v="webflow" label="Webflow (open)" />
          <PresetBtn v="wordpress" label="WordPress" />
          <PresetBtn v="spa" label="SPA / marketing site" />
          <PresetBtn v="strict" label="Strict (admin hidden)" />
          <PresetBtn v="custom" label="Custom" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Disallow (one per line)</span>
          <textarea
            value={disallow}
            onChange={(e) => setDisallow(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 font-mono text-body-sm min-h-[120px]"
          />
        </label>
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Allow (one per line)</span>
          <textarea
            value={allow}
            onChange={(e) => setAllow(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 font-mono text-body-sm min-h-[120px]"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-body-sm font-semibold text-ink">Sitemap URL</span>
        <input
          value={sitemap}
          onChange={(e) => setSitemap(e.target.value)}
          className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
        />
      </label>

      <label className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={blockAi}
          onChange={(e) => setBlockAi(e.target.checked)}
          className="h-4 w-4 accent-[#4353FF]"
        />
        <span className="text-body-sm text-ink">Block common AI crawlers (GPTBot, ClaudeBot, CCBot, etc.)</span>
      </label>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-eyebrow text-ink-muted">robots.txt</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-9 items-center rounded-[10px] border border-line-strong px-4 text-body-sm font-medium text-ink hover:bg-paper-tint transition-colors"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={download}
              className="inline-flex h-9 items-center rounded-[10px] bg-brand px-4 text-body-sm font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Download
            </button>
          </div>
        </div>
        <pre className="mt-3 overflow-auto rounded-lg bg-ink text-paper p-4 font-mono text-[13px] leading-snug whitespace-pre">
{output}
        </pre>
      </div>
    </div>
  );
}
