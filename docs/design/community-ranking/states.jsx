// Full Community Ranking — fullscreen modal opened from the result page
// Community Verdict "View all N". Shows every entrant ranked by % of
// players who picked them as champion. Viewer's own champion + runner-up
// get a subtle row tint and a "your pick" tag.
//
// States
//   1. loading       — header in, skeleton rows
//   2. populated     — full ranked list, viewer's picks highlighted
//   3. insufficient  — too few completions to show a meaningful ranking

const CR_T = {
  bg: '#0e0e12', bgNav: '#0a0a0e', bgCard: '#18181f', bgInput: '#0a0a0e',
  fg: '#e8e6f0', fgSec: '#c4c2d2', fgMuted: '#9b9aab', fgQuiet: '#6b6b7d',
  purple: '#7c3aed', purpleLight: '#b794f4', green: '#38e07b',
  border: '#1f1f28', ring: 'rgba(255,255,255,0.06)',
};

// Mock 64 entrants with descending pick rates. First two are the viewer's picks.
const CR_VIEWER = { champ: 'jw', runnerUp: 'ay' };

const CR_NAMES = [
  ['jw','Jiwoo','NEONWAVE',340], ['sr','Seora','VELVET',280], ['ay','Ayeon','STARFALL',320],
  ['hj','Haejin','AURORA',30], ['mk','Minkyu','PROJECT-7',220], ['do','Doyun','NEONWAVE',190],
  ['ji','Jihan','PROJECT-7',260], ['so','Sohyun','VELVET',350], ['rk','Rikku','AURORA',160],
  ['ny','Nayoon','CITRUS',60], ['eu','Eunsae','CITRUS',45], ['mn','Minseo','STARFALL',210],
  ['tu','Taeun','BLACKLINE',0], ['rv','Riven','BLACKLINE',240], ['ha','Hana','NEONWAVE',10],
  ['yu','Yuna','PROJECT-7',130], ['kl','Kyla','VELVET',300], ['nr','Nari','AURORA',50],
  ['si','Siyeon','STARFALL',330], ['cw','Chaewon','CITRUS',75], ['hr','Hara','NEONWAVE',355],
  ['mh','Minha','PROJECT-7',230], ['bm','Boram','VELVET',290], ['ed','Eunji','AURORA',20],
  ['mr','Mira','BLACKLINE',250], ['rn','Rina','CITRUS',80], ['ds','Dasom','STARFALL',310],
  ['hl','Hyelin','NEONWAVE',345], ['jn','Junhee','PROJECT-7',225], ['so2','Soyul','VELVET',285],
  ['ah','Areum','AURORA',25], ['ts','Tasha','BLACKLINE',5],
];
// Compute pick% with a long tail
function crPick(rank, total = 64) {
  // Exponential decay, sums roughly to 100 across the top.
  const decay = Math.exp(-rank * 0.18);
  return Math.max(0.4, decay * 18);
}

function crPlaceholder(hue, l = 55) {
  const a = `oklch(${l}% 0.14 ${hue})`;
  const b = `oklch(${l - 12}% 0.14 ${hue})`;
  return `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`;
}

// ── Modal frame ────────────────────────────────────────────────────────────

function CRFrame({ children }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: CR_T.bg, color: CR_T.fg, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <CRHeader />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

function CRHeader() {
  return (
    <div style={{
      padding: '20px 32px', borderBottom: '1px solid ' + CR_T.border,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: CR_T.bgNav, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={{
          width: 32, height: 32, background: CR_T.bgCard, border: '1px solid ' + CR_T.ring,
          borderRadius: 8, color: CR_T.fgSec, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
        }}>←</button>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: CR_T.fgQuiet, fontWeight: 600, marginBottom: 4,
          }}>Community ranking</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>K-Pop Girl Group Members 2026</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <CRStatChip label="Players" value="482K" />
        <CRStatChip label="Entrants" value="64" />
        <CRStatChip label="Updated" value="Live" green />
        <button style={{
          padding: '8px 14px', fontSize: 13, fontWeight: 600,
          background: 'transparent', color: CR_T.fgSec, border: '1px solid ' + CR_T.border,
          borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
        }}>↗ Share</button>
        <button style={{
          width: 32, height: 32, background: 'transparent', border: 'none',
          color: CR_T.fgQuiet, fontSize: 20, cursor: 'pointer', fontFamily: 'inherit',
        }}>×</button>
      </div>
    </div>
  );
}

function CRStatChip({ label, value, green }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 14, fontWeight: 700,
        color: green ? CR_T.green : CR_T.fg,
      }}>{green && <span style={{
        display: 'inline-block', width: 7, height: 7, borderRadius: 999,
        background: CR_T.green, marginRight: 6, verticalAlign: 'middle',
        boxShadow: `0 0 6px ${CR_T.green}`,
      }} />}{value}</span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: CR_T.fgQuiet, fontWeight: 600,
      }}>{label}</span>
    </div>
  );
}

// ── Filter bar ─────────────────────────────────────────────────────────────

function CRFilterBar({ activeTab = 'all' }) {
  const tabs = [
    ['all', 'All entrants'], ['mine', 'My picks'], ['groups', 'By group'], ['upsets', 'Biggest upsets'],
  ];
  return (
    <div style={{
      padding: '14px 32px', borderBottom: '1px solid ' + CR_T.border,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0, background: CR_T.bg,
    }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {tabs.map(([id, label]) => (
          <div key={id} style={{
            padding: '7px 12px', fontSize: 12, fontWeight: 600, borderRadius: 6,
            background: activeTab === id ? 'rgba(124,58,237,0.18)' : 'transparent',
            color: activeTab === id ? CR_T.purpleLight : CR_T.fgMuted,
            cursor: 'pointer',
          }}>{label}</div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          padding: '7px 12px', fontSize: 12, color: CR_T.fgMuted,
          background: CR_T.bgCard, border: '1px solid ' + CR_T.ring, borderRadius: 6,
          display: 'flex', alignItems: 'center', gap: 8, minWidth: 200,
        }}>
          <span>⌕</span><span>Search by name or group…</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: CR_T.fgMuted }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: CR_T.fgQuiet }}>Sort</span>
          <div style={{ padding: '7px 12px', fontSize: 12, color: CR_T.fgSec, background: CR_T.bgCard, border: '1px solid ' + CR_T.ring, borderRadius: 6 }}>
            % picked as champion ↓
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Row ────────────────────────────────────────────────────────────────────

function CRRow({ rank, entry, pct, mine, isChamp }) {
  const tint = mine ? 'rgba(124,58,237,0.10)' : 'transparent';
  const ringColor = mine ? 'rgba(124,58,237,0.45)' : CR_T.ring;
  const [id, name, group, hue] = entry;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '64px 1fr 360px 120px',
      alignItems: 'center', gap: 16,
      padding: '12px 32px',
      background: tint,
      borderBottom: '1px solid ' + ringColor,
    }}>
      {/* Rank */}
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 22, fontWeight: 700,
        color: rank <= 3 ? CR_T.fg : CR_T.fgQuiet,
        fontVariantNumeric: 'tabular-nums',
      }}>{String(rank).padStart(2, '0')}</div>

      {/* Portrait + name + tags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 8, flexShrink: 0,
          background: crPlaceholder(hue, 55),
        }} />
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: CR_T.fg }}>{name}</span>
            {mine && (
              <span style={{
                padding: '2px 8px', borderRadius: 999,
                background: 'rgba(124,58,237,0.22)', color: CR_T.purpleLight,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.12em',
                fontWeight: 700,
              }}>
                YOUR {isChamp ? 'CHAMPION' : 'RUNNER-UP'}
              </span>
            )}
            {rank === 1 && (
              <span style={{
                padding: '2px 8px', borderRadius: 999,
                background: 'rgba(56,224,123,0.16)', color: CR_T.green,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.12em',
                fontWeight: 700,
              }}>★ COMMUNITY #1</span>
            )}
          </div>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.05em',
            color: CR_T.fgQuiet, fontWeight: 600,
          }}>{group}</span>
        </div>
      </div>

      {/* Bar + % */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 8, borderRadius: 999, background: '#1a1a22', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.min(100, pct * 4.5)}%`, height: '100%',
            background: rank === 1
              ? 'linear-gradient(90deg, #7c3aed, #38e07b)'
              : (mine ? 'linear-gradient(90deg, #7c3aed, #b794f4)' : '#3a3a48'),
            borderRadius: 999,
          }} />
        </div>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700,
          color: rank === 1 ? CR_T.green : CR_T.fgSec,
          fontVariantNumeric: 'tabular-nums', minWidth: 56, textAlign: 'right',
        }}>{pct.toFixed(1)}%</span>
      </div>

      {/* Trailing */}
      <div style={{
        fontSize: 11, color: CR_T.fgQuiet, fontFamily: '"JetBrains Mono", monospace',
        textAlign: 'right',
      }}>picked as champion</div>
    </div>
  );
}

function CRColumnHeader() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '64px 1fr 360px 120px',
      alignItems: 'center', gap: 16,
      padding: '10px 32px',
      background: CR_T.bgNav,
      borderBottom: '1px solid ' + CR_T.border,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.15em',
      textTransform: 'uppercase', color: CR_T.fgQuiet, fontWeight: 600,
      flexShrink: 0,
    }}>
      <div>Rank</div>
      <div>Entrant</div>
      <div>% picked as champion</div>
      <div style={{ textAlign: 'right' }}></div>
    </div>
  );
}

// ── Loading skeleton row ──────────────────────────────────────────────────

function CRSkeletonRow({ rank }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '64px 1fr 360px 120px',
      alignItems: 'center', gap: 16,
      padding: '12px 32px',
      borderBottom: '1px solid ' + CR_T.ring,
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 22, fontWeight: 700,
        color: CR_T.fgQuiet, opacity: 0.4,
      }}>{String(rank).padStart(2, '0')}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: '#1a1a22' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: 140 - rank * 4, height: 11, borderRadius: 4, background: '#1f1f28' }} />
          <div style={{ width: 80, height: 9, borderRadius: 4, background: '#16161d' }} />
        </div>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: '#16161d' }} />
      <div />
    </div>
  );
}

// ── Artboards ──────────────────────────────────────────────────────────────

function CRLoading() {
  return (
    <CRFrame>
      <CRFilterBar />
      <CRColumnHeader />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {Array.from({ length: 12 }).map((_, i) => <CRSkeletonRow key={i} rank={i + 1} />)}
        <div style={{
          padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          color: CR_T.fgMuted, fontSize: 12,
        }}>
          <span style={{
            display: 'inline-block', width: 12, height: 12, borderRadius: 999,
            border: '2px solid ' + CR_T.border, borderTopColor: CR_T.purpleLight,
            animation: 'cr-spin 1s linear infinite',
          }} />
          Tallying votes from 482K players…
        </div>
      </div>
      <style>{'@keyframes cr-spin{to{transform:rotate(360deg)}}'}</style>
    </CRFrame>
  );
}

function CRPopulated() {
  // Order: viewer's champion (jw, rank 1), runner-up (ay) is 3rd by community.
  // Synthesize ranking from CR_NAMES order with crPick decay.
  const rows = CR_NAMES.slice(0, 22).map((entry, i) => ({
    rank: i + 1,
    entry,
    pct: crPick(i),
    mine: entry[0] === CR_VIEWER.champ || entry[0] === CR_VIEWER.runnerUp,
    isChamp: entry[0] === CR_VIEWER.champ,
  }));
  return (
    <CRFrame>
      <CRFilterBar activeTab="all" />
      <CRColumnHeader />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {rows.map(r => <CRRow key={r.entry[0]} {...r} />)}
        <div style={{
          padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: CR_T.fgQuiet, fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>↓ 42 more · scroll to load</div>
      </div>
    </CRFrame>
  );
}

function CRInsufficient() {
  return (
    <CRFrame>
      <CRFilterBar />
      <CRColumnHeader />
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 18, padding: 40,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(56,224,123,0.12))',
          border: '1px solid ' + CR_T.ring,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, color: CR_T.purpleLight, fontWeight: 800,
        }}>◔</div>
        <div style={{ textAlign: 'center', maxWidth: 460 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: CR_T.fgQuiet, fontWeight: 600, marginBottom: 8,
          }}>Not enough plays yet</div>
          <h2 style={{
            fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
            fontSize: 24, margin: '0 0 10px', color: CR_T.fg,
          }}>Only 14 players have completed this bracket</h2>
          <div style={{ fontSize: 13, color: CR_T.fgMuted, lineHeight: 1.55 }}>
            We need at least 100 completions before community ranking gets meaningful.
            Share the bracket with your friends — or check back tomorrow.
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 28, padding: '14px 22px',
          background: CR_T.bgCard, border: '1px solid ' + CR_T.ring, borderRadius: 10,
        }}>
          <CRMiniStat label="Plays so far" value="14" />
          <div style={{ width: 1, height: 28, background: CR_T.border }} />
          <CRMiniStat label="Until ranking" value="86" purple />
          <div style={{ width: 1, height: 28, background: CR_T.border }} />
          <CRMiniStat label="Live now" value="2" green />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '11px 18px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            background: CR_T.purple, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
          }}>↗ Share this bracket</button>
          <button style={{
            padding: '11px 18px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            background: 'transparent', color: CR_T.fgSec,
            border: '1px solid ' + CR_T.border, borderRadius: 6, cursor: 'pointer',
          }}>⏱ Notify me when ready</button>
        </div>
        <div style={{
          marginTop: 12, padding: '12px 16px', borderRadius: 8,
          background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)',
          maxWidth: 460, textAlign: 'center', fontSize: 12, color: CR_T.purpleLight,
        }}>
          Your champion <strong style={{ color: CR_T.fg }}>Jiwoo</strong> is leading 9 → 14 picks. Early signal only.
        </div>
      </div>
    </CRFrame>
  );
}

function CRMiniStat({ label, value, green, purple }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{
        fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 22,
        color: green ? CR_T.green : purple ? CR_T.purpleLight : CR_T.fg,
      }}>{value}</span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: CR_T.fgQuiet, fontWeight: 600,
      }}>{label}</span>
    </div>
  );
}

Object.assign(window, { CRLoading, CRPopulated, CRInsufficient });
