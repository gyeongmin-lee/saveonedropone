// First-Visit Onboarding Modal — state artboards.
// The modal sits over the existing home feed. Anonymous visitors are nudged,
// not gated: skip is always available, and selection reshuffles the feed
// behind the closing modal — no separate landing page.
//
// States
//   1. fresh        — modal open, nothing selected. Home dimmed beneath.
//   2. selecting    — three categories chosen, primary CTA live.
//   3. reshuffle    — modal closing/fading, feed reshuffling underneath
//                     ("personalized" rail revealed at the top).
//   4. dismissed    — user tapped Skip; default feed visible, a small
//                     "Personalize" pill parks bottom-right so they can
//                     re-open onboarding later.

const ON_T = {
  bg: '#0e0e12', bgNav: '#0a0a0e', bgCard: '#18181f', bgInput: '#0a0a0e',
  fg: '#e8e6f0', fgSec: '#c4c2d2', fgMuted: '#9b9aab', fgQuiet: '#6b6b7d',
  purple: '#7c3aed', purpleLight: '#b794f4', green: '#38e07b',
  border: '#1f1f28', ring: 'rgba(255,255,255,0.06)',
};

const ON_CATS = [
  { id: 'kpop',    label: 'K-pop',           sub: '482K plays this week', hue: 320, glyph: '♪' },
  { id: 'anime',   label: 'Anime & manga',   sub: 'Shōnen, isekai, slice', hue: 260, glyph: '◐' },
  { id: 'gaming',  label: 'Gaming',          sub: 'FPS, fighters, RPG',    hue: 200, glyph: '◆' },
  { id: 'movies',  label: 'Movies & TV',     sub: 'Casts, characters',     hue: 30,  glyph: '▶' },
  { id: 'sports',  label: 'Sports',          sub: 'NBA, soccer, F1',       hue: 130, glyph: '●' },
  { id: 'music',   label: 'Music',           sub: 'Hip-hop, indie, rock',  hue: 350, glyph: '♫' },
  { id: 'memes',   label: 'Internet & memes',sub: 'Streamers, weird web',  hue: 60,  glyph: '◇' },
  { id: 'food',    label: 'Food',            sub: 'Snacks, regional',      hue: 90,  glyph: '✱' },
  { id: 'tech',    label: 'Tech',            sub: 'Phones, AI, IDEs',      hue: 220, glyph: '⌘' },
  { id: 'books',   label: 'Books',           sub: 'Lit, sff, romance',     hue: 10,  glyph: '※' },
];

function onPlaceholder(hue, l = 55) {
  const a = `oklch(${l}% 0.14 ${hue})`;
  const b = `oklch(${l - 12}% 0.14 ${hue})`;
  return `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`;
}

// ── Faux home feed used as backdrop ────────────────────────────────────────

function ONFrame({ children, dim = 0, blur = 0, personalized = false }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: ON_T.bg, overflow: 'hidden' }}>
      <ONTopNav />
      <div style={{
        display: 'grid', gridTemplateColumns: '220px 1fr', height: 'calc(100% - 56px)',
        filter: blur ? `blur(${blur}px)` : 'none',
        opacity: 1 - dim,
        transition: 'opacity 200ms, filter 200ms',
      }}>
        <ONSidebar />
        <ONHomeFeed personalized={personalized} />
      </div>
      {children}
    </div>
  );
}

function ONTopNav() {
  const grad = {
    background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text',
    WebkitTextFillColor: 'transparent', color: 'transparent',
  };
  return (
    <div style={{
      height: 56, background: ON_T.bgNav, borderBottom: '1px solid ' + ON_T.border,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#0a0a0e',
          }}>S</div>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Save<span style={grad}>1</span>Drop<span style={grad}>1</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, fontSize: 13, color: ON_T.fgMuted }}>
          {['Browse', 'Live', 'Create'].map((n, i) => (
            <div key={n} style={{
              padding: '6px 12px', borderRadius: 6,
              background: i === 0 ? 'rgba(124,58,237,0.15)' : 'transparent',
              color: i === 0 ? ON_T.purpleLight : ON_T.fgMuted, fontWeight: 600,
            }}>{n}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          padding: '6px 14px', fontSize: 12, color: ON_T.fgMuted,
          background: 'transparent', border: '1px solid ' + ON_T.border, borderRadius: 6,
        }}>Sign in</div>
        <div style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, background: ON_T.purple, borderRadius: 6 }}>Create bracket</div>
      </div>
    </div>
  );
}

function ONSidebar() {
  const items = [
    ['Home', true], ['Live now', false], ['Trending', false],
    ['Categories', false, true], ['K-pop', false], ['Anime', false], ['Gaming', false], ['Sports', false],
  ];
  return (
    <div style={{ background: ON_T.bgNav, borderRight: '1px solid ' + ON_T.border, padding: '16px 12px' }}>
      {items.map(([n, active, header], i) => (
        <div key={i} style={{
          padding: header ? '14px 12px 6px' : '7px 12px',
          fontSize: header ? 10 : 13,
          fontFamily: header ? '"JetBrains Mono", monospace' : 'inherit',
          letterSpacing: header ? '0.15em' : 'normal',
          textTransform: header ? 'uppercase' : 'none',
          color: header ? ON_T.fgQuiet : (active ? ON_T.purpleLight : ON_T.fgMuted),
          background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
          borderRadius: 6, fontWeight: header ? 600 : (active ? 600 : 500),
        }}>{n}</div>
      ))}
    </div>
  );
}

function ONHomeFeed({ personalized }) {
  // Trending row (always present), plus an optional "For you" rail at the top.
  const trending = [
    { t: 'K-Pop Girl Group 2026',  hue: 320, plays: '482K' },
    { t: 'Best B-Sides',           hue: 200, plays: '94K' },
    { t: 'Visual Showdown',        hue: 30,  plays: '267K' },
    { t: 'Boy Group Members',      hue: 260, plays: '391K' },
  ];
  const personalizedRail = [
    { t: 'Bias wrecker bracket',     hue: 340, plays: '128K', tag: 'K-POP' },
    { t: 'Best 4th gen vocal',       hue: 280, plays:  '76K', tag: 'K-POP' },
    { t: 'Stage outfits 2026',       hue: 360, plays: '210K', tag: 'K-POP' },
    { t: 'Anime opening battle',     hue: 220, plays: '180K', tag: 'ANIME' },
  ];
  return (
    <div style={{ padding: '20px 24px', overflow: 'hidden' }}>
      {personalized && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>For you</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.15em',
                color: ON_T.green, fontWeight: 600, padding: '2px 7px',
                background: 'rgba(56,224,123,0.16)', borderRadius: 999,
              }}>3 INTERESTS</span>
            </div>
            <span style={{ fontSize: 11, color: ON_T.fgQuiet }}>Edit interests</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {personalizedRail.map((b, i) => <ONBracketTile key={i} b={b} ring />)}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Trending today</span>
        <span style={{ fontSize: 11, color: ON_T.fgQuiet }}>See all →</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {trending.map((b, i) => <ONBracketTile key={i} b={b} />)}
      </div>
      <div style={{ height: 16 }} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Quick play</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
        {['Stage outfits', 'Vocal lines', 'Best raps', 'Variety moments', 'Debut MVs'].map((t, i) => (
          <div key={i} style={{
            background: ON_T.bgCard, border: '1px solid ' + ON_T.ring, borderRadius: 8, padding: 10,
            fontSize: 12, fontWeight: 600, color: ON_T.fgSec,
          }}>▶ {t}</div>
        ))}
      </div>
    </div>
  );
}

function ONBracketTile({ b, ring }) {
  return (
    <div style={{
      borderRadius: 10, overflow: 'hidden',
      background: ON_T.bgCard,
      border: '1px solid ' + (ring ? 'rgba(124,58,237,0.4)' : ON_T.ring),
    }}>
      <div style={{ height: 92, background: onPlaceholder(b.hue, 55), position: 'relative' }}>
        {b.tag && (
          <div style={{
            position: 'absolute', top: 8, left: 8, padding: '3px 7px', borderRadius: 999,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#fff',
            fontFamily: '"JetBrains Mono", monospace',
          }}>{b.tag}</div>
        )}
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.25 }}>{b.t}</div>
        <div style={{ fontSize: 11, color: ON_T.fgQuiet, fontFamily: '"JetBrains Mono", monospace' }}>{b.plays} plays</div>
      </div>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────

function ONModal({ selected, closing }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(8,8,12,0.72)', backdropFilter: 'blur(6px)',
      opacity: closing ? 0.55 : 1, transition: 'opacity 200ms',
    }}>
      <div style={{
        width: 720, background: ON_T.bgCard, borderRadius: 14,
        border: '1px solid ' + ON_T.ring,
        boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
        transform: closing ? 'translateY(8px) scale(0.985)' : 'none',
        transition: 'transform 200ms',
      }}>
        <div style={{ padding: '28px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: ON_T.purpleLight, fontWeight: 600, marginBottom: 10,
            }}>Welcome</div>
            <h1 style={{
              fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
              fontSize: 30, lineHeight: 1.05, margin: '0 0 6px', color: ON_T.fg,
            }}>What's your scene?</h1>
            <div style={{ fontSize: 13, color: ON_T.fgMuted, lineHeight: 1.5, maxWidth: 540 }}>
              Pick a few categories and we'll pin matching brackets to the top of your home.
              You can change these any time.
            </div>
          </div>
          <button style={{
            background: 'transparent', border: 'none', color: ON_T.fgQuiet,
            fontSize: 22, cursor: 'pointer', padding: 0, lineHeight: 1,
          }}>×</button>
        </div>

        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {ON_CATS.map(c => <ONCategoryTile key={c.id} c={c} active={selected.includes(c.id)} />)}
        </div>

        <div style={{
          padding: '14px 24px 22px', borderTop: '1px solid ' + ON_T.border,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 12, color: ON_T.fgMuted }}>
            {selected.length === 0
              ? 'Pick at least one to personalize'
              : <>
                  <span style={{ color: ON_T.green, fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>{selected.length}</span>
                  {' selected · '}
                  <span style={{ color: ON_T.fgSec }}>{selected.length * 4} brackets pinned for you</span>
                </>
            }
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              padding: '10px 14px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              background: 'transparent', color: ON_T.fgMuted, border: 'none', borderRadius: 6, cursor: 'pointer',
            }}>Skip for now</button>
            <button style={{
              padding: '10px 18px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              background: selected.length === 0 ? '#2a1f4a' : ON_T.purple,
              color: selected.length === 0 ? ON_T.fgQuiet : '#fff',
              border: 'none', borderRadius: 6, cursor: 'pointer',
              opacity: selected.length === 0 ? 0.7 : 1,
            }}>{selected.length === 0 ? 'Pick categories' : 'Save & explore →'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ONCategoryTile({ c, active }) {
  return (
    <div style={{
      position: 'relative', padding: 12,
      background: active ? 'rgba(124,58,237,0.14)' : ON_T.bgInput,
      border: '1px solid ' + (active ? ON_T.purple : ON_T.border),
      borderRadius: 10, cursor: 'pointer',
      transition: 'all 120ms',
    }}>
      <div style={{
        height: 56, borderRadius: 6,
        background: onPlaceholder(c.hue, 55),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, fontWeight: 800, color: 'rgba(0,0,0,0.55)',
        marginBottom: 10,
      }}>{c.glyph}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: active ? ON_T.purpleLight : ON_T.fg, lineHeight: 1.2, marginBottom: 3 }}>{c.label}</div>
      <div style={{ fontSize: 10, color: ON_T.fgQuiet, fontFamily: '"JetBrains Mono", monospace' }}>{c.sub}</div>
      {active && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          width: 18, height: 18, borderRadius: 999, background: ON_T.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800, color: '#0a0a0e',
        }}>✓</div>
      )}
    </div>
  );
}

// ── Persistent re-open pill (for skip / dismissed state) ───────────────────

function ONReopenPill() {
  return (
    <div style={{
      position: 'absolute', right: 24, bottom: 24,
      background: ON_T.bgCard, border: '1px solid ' + ON_T.ring,
      borderRadius: 999, padding: '10px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800, color: '#0a0a0e',
      }}>★</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: ON_T.fg }}>Personalize home</span>
        <span style={{ fontSize: 10, color: ON_T.fgQuiet, fontFamily: '"JetBrains Mono", monospace' }}>30 sec · always editable</span>
      </div>
      <button style={{
        marginLeft: 8, padding: '4px 10px', fontSize: 11, fontWeight: 600,
        background: ON_T.purple, color: '#fff', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
      }}>Open</button>
    </div>
  );
}

// ── Reshuffle hint toast (during/after the close transition) ───────────────

function ONReshuffleToast() {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)',
      background: ON_T.bgCard, border: '1px solid ' + ON_T.ring,
      borderRadius: 999, padding: '8px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: 999, background: ON_T.green,
        boxShadow: `0 0 8px ${ON_T.green}`,
      }} />
      <span style={{ fontSize: 12, color: ON_T.fg, fontWeight: 600 }}>
        12 brackets pinned to your home
      </span>
    </div>
  );
}

// ── Artboards ──────────────────────────────────────────────────────────────

function ONFresh() {
  return <ONFrame dim={0.4} blur={2}><ONModal selected={[]} /></ONFrame>;
}

function ONSelecting() {
  return <ONFrame dim={0.4} blur={2}><ONModal selected={['kpop', 'anime', 'gaming']} /></ONFrame>;
}

function ONReshuffle() {
  return (
    <ONFrame dim={0.05} blur={0} personalized>
      <ONModal selected={['kpop', 'anime', 'gaming']} closing />
      <ONReshuffleToast />
    </ONFrame>
  );
}

function ONDismissed() {
  return (
    <ONFrame>
      <ONReopenPill />
    </ONFrame>
  );
}

Object.assign(window, { ONFresh, ONSelecting, ONReshuffle, ONDismissed });
