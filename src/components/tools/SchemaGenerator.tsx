import { useMemo, useState } from 'react';

type SchemaType = 'LocalBusiness' | 'Person' | 'Article' | 'FAQPage' | 'Product';

export default function SchemaGenerator() {
  const [type, setType] = useState<SchemaType>('LocalBusiness');
  const [fields, setFields] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }));
  const v = (k: string, fallback = '') => fields[k] ?? fallback;

  const schema = useMemo(() => {
    const base: Record<string, unknown> = { '@context': 'https://schema.org', '@type': type };
    if (type === 'LocalBusiness') {
      base.name = v('name', 'Your business');
      base.url = v('url');
      base.telephone = v('phone');
      base.address = {
        '@type': 'PostalAddress',
        streetAddress: v('street'),
        addressLocality: v('city'),
        addressRegion: v('region'),
        postalCode: v('postal'),
        addressCountry: v('country'),
      };
      base.priceRange = v('priceRange', '$$');
    } else if (type === 'Person') {
      base.name = v('name', 'Your name');
      base.jobTitle = v('jobTitle');
      base.url = v('url');
      base.email = v('email') ? `mailto:${v('email')}` : undefined;
      base.sameAs = (v('sameAs') || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (type === 'Article') {
      base.headline = v('headline');
      base.description = v('description');
      base.author = { '@type': 'Person', name: v('author') };
      base.datePublished = v('datePublished');
      base.image = v('image');
      base.url = v('url');
    } else if (type === 'FAQPage') {
      const qs = (v('qa') || '').split(/\n{2,}/).filter((b) => b.includes('|'));
      base.mainEntity = qs.map((b) => {
        const [q, ...a] = b.split('|');
        return {
          '@type': 'Question',
          name: q.trim(),
          acceptedAnswer: { '@type': 'Answer', text: a.join('|').trim() },
        };
      });
    } else if (type === 'Product') {
      base.name = v('name');
      base.description = v('description');
      base.brand = { '@type': 'Brand', name: v('brand') };
      base.offers = {
        '@type': 'Offer',
        price: v('price'),
        priceCurrency: v('currency', 'USD'),
        availability: 'https://schema.org/InStock',
      };
    }
    // Strip empty leaves
    const clean = JSON.parse(
      JSON.stringify(base, (_, val) => {
        if (val === undefined || val === '') return undefined;
        if (Array.isArray(val) && val.length === 0) return undefined;
        if (val && typeof val === 'object') {
          const entries = Object.entries(val).filter(([, vv]) => vv !== undefined && vv !== '');
          if (entries.length === 0 && !Array.isArray(val)) return undefined;
        }
        return val;
      })
    );
    return clean;
  }, [type, fields]);

  const json = JSON.stringify(schema, null, 2);

  const copy = async () => {
    await navigator.clipboard.writeText(`<script type="application/ld+json">\n${json}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const Input = ({ name, label, placeholder }: { name: string; label: string; placeholder?: string }) => (
    <label className="block">
      <span className="text-body-sm font-semibold text-ink">{label}</span>
      <input
        value={v(name)}
        onChange={(e) => set(name, e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
      />
    </label>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        {(['LocalBusiness', 'Person', 'Article', 'FAQPage', 'Product'] as SchemaType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-[10px] px-4 py-2 text-body-sm transition-colors ${
              type === t ? 'bg-ink text-paper' : 'border border-line text-ink hover:border-line-strong'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {type === 'LocalBusiness' && (
          <>
            <Input name="name" label="Business name" />
            <Input name="url" label="URL" placeholder="https://..." />
            <Input name="phone" label="Phone" />
            <Input name="priceRange" label="Price range" placeholder="$$" />
            <Input name="street" label="Street" />
            <Input name="city" label="City" />
            <Input name="region" label="Region" />
            <Input name="postal" label="Postal code" />
            <Input name="country" label="Country (ISO)" placeholder="US" />
          </>
        )}
        {type === 'Person' && (
          <>
            <Input name="name" label="Full name" />
            <Input name="jobTitle" label="Job title" />
            <Input name="url" label="Personal URL" />
            <Input name="email" label="Email" />
            <label className="md:col-span-2 block">
              <span className="text-body-sm font-semibold text-ink">Profile links (one per line)</span>
              <textarea
                value={v('sameAs')}
                onChange={(e) => set('sameAs', e.target.value)}
                placeholder="https://github.com/..."
                className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 text-body-sm min-h-[80px]"
              />
            </label>
          </>
        )}
        {type === 'Article' && (
          <>
            <Input name="headline" label="Headline" />
            <Input name="author" label="Author" />
            <Input name="datePublished" label="Date published (YYYY-MM-DD)" />
            <Input name="image" label="Hero image URL" />
            <Input name="url" label="Article URL" />
            <label className="md:col-span-2 block">
              <span className="text-body-sm font-semibold text-ink">Description</span>
              <textarea
                value={v('description')}
                onChange={(e) => set('description', e.target.value)}
                className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 text-body-sm min-h-[80px]"
              />
            </label>
          </>
        )}
        {type === 'FAQPage' && (
          <label className="md:col-span-2 block">
            <span className="text-body-sm font-semibold text-ink">
              Q&A — one per block, separate with <code>|</code>, blocks separated by empty lines
            </span>
            <textarea
              value={v('qa', 'How long does it take?|Two to three weeks for most sites.\n\nDo you offer a retainer?|Yes, $1,999/mo for unlimited pages.')}
              onChange={(e) => set('qa', e.target.value)}
              className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 text-body-sm min-h-[160px] font-mono"
            />
          </label>
        )}
        {type === 'Product' && (
          <>
            <Input name="name" label="Product name" />
            <Input name="brand" label="Brand" />
            <Input name="price" label="Price" />
            <Input name="currency" label="Currency" placeholder="USD" />
            <label className="md:col-span-2 block">
              <span className="text-body-sm font-semibold text-ink">Description</span>
              <textarea
                value={v('description')}
                onChange={(e) => set('description', e.target.value)}
                className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 text-body-sm min-h-[80px]"
              />
            </label>
          </>
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-eyebrow text-ink-muted">Generated JSON-LD</p>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-9 items-center rounded-[10px] bg-brand px-4 text-body-sm font-medium text-white hover:bg-brand-hover transition-colors"
          >
            {copied ? 'Copied ✓' : 'Copy script tag'}
          </button>
        </div>
        <pre className="mt-3 overflow-auto rounded-lg bg-ink text-paper p-4 text-[13px] leading-snug font-mono">
          <code className="whitespace-pre">{json}</code>
        </pre>
      </div>
    </div>
  );
}
