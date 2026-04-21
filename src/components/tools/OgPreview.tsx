import { useState } from 'react';

export default function OgPreview() {
  const [imageUrl, setImageUrl] = useState('https://mahade.dev/images/og-default.svg');
  const [title, setTitle] = useState('Webflow Developer — Mahade Walid');
  const [description, setDescription] = useState(
    'Professional Webflow development. Flat monthly retainer, or hourly via Upwork.'
  );
  const [domain, setDomain] = useState('mahade.dev');

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageUrl(String(ev.target?.result ?? ''));
    reader.readAsDataURL(file);
  };

  const Card = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div>
      <p className="text-eyebrow text-ink-muted mb-3">{label}</p>
      {children}
    </div>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-5">
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">OG image URL</span>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
            placeholder="https://..."
          />
        </label>
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">
            Or upload a file (stays local to your browser)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            className="mt-2 block w-full text-body-sm"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-body-sm font-semibold text-ink">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
            />
          </label>
          <label className="block">
            <span className="text-body-sm font-semibold text-ink">Domain</span>
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper h-10 px-3 text-body-sm"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-[6px] border border-line-strong bg-paper p-3 text-body-sm min-h-[80px]"
          />
        </label>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card label="Twitter / X summary_large_image">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <img src={imageUrl} alt="" className="aspect-[1200/630] w-full object-cover" />
            <div className="p-3">
              <p className="text-[13px] text-[#536471]">{domain}</p>
              <p className="mt-1 text-[15px] font-medium leading-tight text-[#0f1419] line-clamp-2">
                {title}
              </p>
            </div>
          </div>
        </Card>

        <Card label="LinkedIn">
          <div className="overflow-hidden rounded-md border border-[#e0e0e0] bg-white">
            <img src={imageUrl} alt="" className="aspect-[1200/630] w-full object-cover" />
            <div className="p-3 bg-[#eef3f8]">
              <p className="text-[14px] font-semibold leading-tight text-[#000000de] line-clamp-2">
                {title}
              </p>
              <p className="mt-1 text-[12px] text-[#00000099]">{domain}</p>
            </div>
          </div>
        </Card>

        <Card label="Slack / Discord unfurl">
          <div className="rounded-md border-l-4 border-brand bg-paper-tint p-3">
            <p className="text-[12px] text-ink-muted">{domain}</p>
            <p className="mt-1 text-[14px] font-semibold text-ink">{title}</p>
            <p className="mt-1 text-[13px] text-ink-muted line-clamp-2">{description}</p>
            <img src={imageUrl} alt="" className="mt-3 max-h-40 rounded object-cover" />
          </div>
        </Card>

        <Card label="Facebook">
          <div className="overflow-hidden rounded-md border border-[#dadde1] bg-white">
            <img src={imageUrl} alt="" className="aspect-[1200/630] w-full object-cover" />
            <div className="p-3 bg-[#f2f3f5]">
              <p className="text-[12px] uppercase text-[#606770]">{domain}</p>
              <p className="mt-1 text-[16px] font-semibold leading-tight text-[#1d2129] line-clamp-2">
                {title}
              </p>
              <p className="mt-1 text-[14px] text-[#606770] line-clamp-2">{description}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
