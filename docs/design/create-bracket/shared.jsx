// Shared mock data + tokens + reusable atoms for the Create Bracket exploration.
// Visual language is locked to Streamer Native (matching theme-streamer.jsx).

const CB_TOKENS = {
  bg: '#0e0e12',
  bgNav: '#0a0a0e',
  bgCard: '#18181f',
  bgInput: '#0a0a0e',
  bgHover: '#1f1f28',
  fg: '#e8e6f0',
  fgSec: '#c4c2d2',
  fgMuted: '#9b9aab',
  fgQuiet: '#6b6b7d',
  purple: '#7c3aed',
  purpleLight: '#b794f4',
  green: '#38e07b',
  ring: 'rgba(255,255,255,0.06)',
  border: '#1f1f28',
};

// Mock parsed entries — these illustrate the most important state of any
// Create Bracket variant: a queue of YouTube/image URLs that have been
// parsed into editable rows. Mix of YT successes, image-direct, in-progress
// parse, and a manual-fallback (failed parse) so every state shows up.
const CB_ENTRIES = [
  { id: 'e1', kind: 'yt', title: 'AESPA — Whiplash (Performance Ver.)',     ch: 'aespa Official', t0: '00:42', dur: '3:15', hue: 280, ok: true },
  { id: 'e2', kind: 'yt', title: 'NEWJEANS — Supernatural (Live Stage)',    ch: 'M COUNTDOWN',     t0: '01:08', dur: '3:42', hue: 200, ok: true },
  { id: 'e3', kind: 'yt', title: 'IVE — HEYA (MV)',                          ch: 'starshipTV',      t0: '00:00', dur: '3:01', hue: 340, ok: true },
  { id: 'e4', kind: 'img', title: 'LE SSERAFIM — Easy concept photo',        ch: 'imgur',           t0: null,    dur: null,  hue:  30, ok: true },
  { id: 'e5', kind: 'yt', title: 'ITZY — UNTOUCHABLE Performance',           ch: 'JYP Entertainment', t0: '00:00', dur: '3:05', hue: 160, ok: true },
  { id: 'e6', kind: 'yt', title: 'BABYMONSTER — SHEESH',                     ch: 'BABYMONSTER',     t0: '00:00', dur: '3:15', hue:  10, ok: true },
  { id: 'e7', kind: 'yt', title: 'RIIZE — Get A Guitar',                     ch: 'SMTOWN',          t0: '00:18', dur: '2:52', hue: 220, ok: true },
  { id: 'e8', kind: 'parsing', title: 'youtube.com/watch?v=K…',              ch: null,              t0: null,    dur: null,  hue:   0, ok: null },
  { id: 'e9', kind: 'failed', title: 'broken-mirror.example.com/track-7',    ch: null,              t0: null,    dur: null,  hue:   0, ok: false },
  { id: 'eA', kind: 'yt', title: 'Stray Kids — Chk Chk Boom',                ch: 'Stray Kids',      t0: '00:54', dur: '3:11', hue:  60, ok: true },
  { id: 'eB', kind: 'yt', title: 'TWICE — STRATEGY (feat. Megan)',           ch: 'JYP Entertainment', t0: '00:24', dur: '3:00', hue: 310, ok: true },
  { id: 'eC', kind: 'yt', title: 'TXT — Over the Moon',                      ch: 'BIGHIT MUSIC',    t0: '00:42', dur: '3:18', hue: 250, ok: true },
];

const CB_TAGS = ['k-pop', 'girl groups', 'boy groups', 'performance', 'mv', '2026', 'rookies', '4th gen', 'visuals', 'choreography', 'b-sides', 'concept'];

// Diagonal-stripe placeholder (matches data.jsx: streamer-native fallback)
function cbPlaceholder(hue, l = 55) {
  const a = `oklch(${l}% 0.14 ${hue})`;
  const b = `oklch(${l - 12}% 0.14 ${hue})`;
  return `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`;
}

// Tiny atoms reused across directions
function MonoLabel({ children, color = CB_TOKENS.fgQuiet, size = 11, style }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: size,
      letterSpacing: '0.15em', textTransform: 'uppercase',
      color, fontWeight: 600, ...style,
    }}>{children}</div>
  );
}

function Pill({ children, tone = 'neutral', size = 'md' }) {
  const tones = {
    neutral: { bg: '#1f1f28', fg: '#e8e6f0' },
    purple:  { bg: 'rgba(124,58,237,0.18)', fg: '#b794f4' },
    green:   { bg: 'rgba(56,224,123,0.16)', fg: '#38e07b' },
    danger:  { bg: 'rgba(255,95,95,0.14)', fg: '#ff7a7a' },
    soft:    { bg: '#0e0e12', fg: '#9b9aab' },
  };
  const t = tones[tone];
  const pads = size === 'sm' ? '3px 8px' : '4px 10px';
  return (
    <span style={{
      background: t.bg, color: t.fg, padding: pads, borderRadius: 999,
      fontSize: size === 'sm' ? 10 : 11, fontWeight: 600,
      fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function Btn({ children, variant = 'primary', size = 'md', style, icon }) {
  const variants = {
    primary:   { bg: '#7c3aed', fg: '#fff', bd: 'transparent' },
    secondary: { bg: '#1f1f28', fg: '#e8e6f0', bd: 'transparent' },
    ghost:     { bg: 'transparent', fg: '#9b9aab', bd: '#1f1f28' },
    quiet:     { bg: 'transparent', fg: '#9b9aab', bd: 'transparent' },
    danger:    { bg: 'transparent', fg: '#ff7a7a', bd: '#3a2228' },
  };
  const v = variants[variant];
  const pads = size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 22px' : '9px 16px';
  const fs = size === 'sm' ? 12 : size === 'lg' ? 14 : 13;
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: v.bg, color: v.fg, border: '1px solid ' + v.bd,
      borderRadius: 6, padding: pads, fontSize: fs, fontWeight: 600,
      fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
      ...style,
    }}>{icon && <span style={{ fontSize: fs }}>{icon}</span>}{children}</button>
  );
}

function Field({ label, hint, children, error }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: error ? '#ff7a7a' : '#9b9aab', fontWeight: 600,
        }}>{label}</span>
      )}
      {children}
      {hint && (
        <span style={{ fontSize: 11, color: error ? '#ff7a7a' : '#6b6b7d' }}>{hint}</span>
      )}
    </label>
  );
}

function TextInput({ value, placeholder, mono = false, prefix, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: '#0a0a0e', border: '1px solid #1f1f28', borderRadius: 6,
      padding: '0 10px', height: 38, ...style,
    }}>
      {prefix && (
        <span style={{ color: '#6b6b7d', fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>{prefix}</span>
      )}
      <input
        defaultValue={value}
        placeholder={placeholder}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          color: '#e8e6f0', fontFamily: mono ? '"JetBrains Mono", monospace' : 'inherit',
          fontSize: 13, fontWeight: 500, height: '100%',
        }}
      />
    </div>
  );
}

function Card({ children, style, padding = 20 }) {
  return (
    <div style={{
      background: '#18181f', borderRadius: 10,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.06)', padding,
      ...style,
    }}>{children}</div>
  );
}

// Tiny entry-row thumbnail with state badge
function EntryThumb({ entry, size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 6, flexShrink: 0,
      background: entry.ok ? cbPlaceholder(entry.hue, 55) : '#0e0e12',
      border: entry.ok ? 'none' : '1px dashed #3a2228',
      position: 'relative', overflow: 'hidden',
    }}>
      {entry.kind === 'yt' && entry.ok && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 9,
          }}>▶</div>
        </div>
      )}
      {entry.kind === 'parsing' && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#b794f4', fontSize: 18,
        }}>◐</div>
      )}
      {entry.kind === 'failed' && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#ff7a7a', fontSize: 18,
        }}>!</div>
      )}
    </div>
  );
}

Object.assign(window, {
  CB_TOKENS, CB_ENTRIES, CB_TAGS, cbPlaceholder,
  MonoLabel, Pill, Btn, Field, TextInput, Card, EntryThumb,
});
