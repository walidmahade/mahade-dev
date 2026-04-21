import { useMemo, useState } from 'react';

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.trim().replace('#', '').match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function luminance([r, g, b]: [number, number, number]): number {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrast(fg: [number, number, number], bg: [number, number, number]): number {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const light = Math.max(L1, L2);
  const dark = Math.min(L1, L2);
  return (light + 0.05) / (dark + 0.05);
}

export default function ContrastChecker() {
  const [fg, setFg] = useState('#0B0D13');
  const [bg, setBg] = useState('#FFFFFF');

  const result = useMemo(() => {
    const f = hexToRgb(fg);
    const b = hexToRgb(bg);
    if (!f || !b) return null;
    const ratio = contrast(f, b);
    return {
      ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaNormal: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    };
  }, [fg, bg]);

  const Field = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <label className="block">
      <span className="text-body-sm font-semibold text-ink">{label}</span>
      <div className="mt-2 flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-10 w-14 rounded-[6px] border border-line-strong"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-[6px] border border-line-strong bg-paper h-10 px-3 font-mono text-body-sm uppercase"
        />
      </div>
    </label>
  );

  const Verdict = ({ pass, label }: { pass: boolean; label: string }) => (
    <div
      className={`rounded-lg px-4 py-3 flex items-center justify-between ${
        pass ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEE2E2] text-[#991B1B]'
      }`}
    >
      <span className="text-body-sm font-semibold">{label}</span>
      <span className="text-body-sm font-semibold">{pass ? 'Pass' : 'Fail'}</span>
    </div>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Foreground" value={fg} onChange={setFg} />
        <Field label="Background" value={bg} onChange={setBg} />
      </div>

      <div
        className="mt-8 rounded-lg p-8 text-center"
        style={{ backgroundColor: bg, color: fg, border: '1px solid var(--color-line)' }}
      >
        <p style={{ fontSize: '2rem', fontWeight: 500, fontFamily: 'var(--font-display)' }}>
          Large text sample
        </p>
        <p className="mt-3" style={{ fontSize: '1rem' }}>
          The quick brown fox jumps over the lazy dog. Body-sized copy to verify comfort at
          paragraph scale.
        </p>
      </div>

      {result && (
        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <p className="text-eyebrow text-ink-muted">Contrast ratio</p>
            <p className="text-display-md font-display text-ink">{result.ratio.toFixed(2)}:1</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Verdict pass={result.aaNormal} label="WCAG AA — Normal text (≥ 4.5)" />
            <Verdict pass={result.aaLarge} label="WCAG AA — Large text (≥ 3)" />
            <Verdict pass={result.aaaNormal} label="WCAG AAA — Normal text (≥ 7)" />
            <Verdict pass={result.aaaLarge} label="WCAG AAA — Large text (≥ 4.5)" />
          </div>
        </div>
      )}
    </div>
  );
}
