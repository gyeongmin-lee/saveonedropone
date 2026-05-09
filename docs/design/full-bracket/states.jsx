// Full Bracket Modal — true fullscreen modal opened from the result page
// Final Eight "View all 128 →". Centered/mirrored layout: final at the
// middle column, R128 → R64 → R32 → R16 → Q → S fanning out symmetrically
// to the left, mirrored to the right.
//
// States
//   1. loading              — chrome in, skeleton bracket scaffolding
//   2. default              — fit-to-screen view, all 7 rounds visible
//   3. zoomed               — zoom 200%, panned to the viewer's run, drag hint
//   4. round_focus          — "Q" round chip locked, non-focus rounds dimmed
//   5. save_pending         — toast: "Saving rounds Q–F as PNG…"
//   6. save_success         — toast: "Saved K-Pop-2026-bracket.png · 1080×1350"
//   7. save_failure         — toast: "Couldn't save image. Storage blocked."
//   8. offline              — top banner: connection lost, last-known snapshot
//                             timestamp, bracket beneath is faded but readable.

const FB_T = {
  bg: '#0e0e12', bgNav: '#0a0a0e', bgCard: '#18181f', bgInput: '#0a0a0e',
  fg: '#e8e6f0', fgSec: '#c4c2d2', fgMuted: '#9b9aab', fgQuiet: '#6b6b7d',
  purple: '#7c3aed', purpleLight: '#b794f4', green: '#38e07b',
  red: '#ff5f5f', amber: '#ffb84d',
  border: '#1f1f28', ring: 'rgba(255,255,255,0.06)',
};

// Round model — left side R128(32 matches) → S(1 match), final = 1, mirrored on right.
// Match counts per round side, from outer (R128) → inner (S):
const FB_SIDE = [
  { id: 'r128', label: 'R128', matches: 32 },
  { id: 'r64',  label: 'R64',  matches: 16 },
  { id: 'r32',  label: 'R32',  matches: 8 },
  { id: 'r16',  label: 'R16',  matches: 4 },
  { id: 'q',    label: 'Q',    matches: 2 },
  { id: 's',    label: 'S',    matches: 1 },
];
const FB_ROUND_CHIPS = ['R128', 'R64', 'R32', 'R16', 'Q', 'S', 'F'];

// Hue per match — pseudo-random but stable.
const fbHue = (side, ri, mi) => ((ri * 53 + mi * 31 + (side === 'L' ? 0 : 17)) % 360);

// Champion path matches (for highlighting / centering on viewer's run)
const FB_PATH_HUE = 340; // jiwoo

// ── Modal frame ────────────────────────────────────────────────────────────

function FBFrame({ children, dim = 0 }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: FB_T.bg, color: FB_T.fg, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <FBHeader />
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        opacity: 1 - dim, transition: 'opacity 200ms',
      }}>
        {children}
      </div>
    </div>
  );
}

function FBHeader() {
  return (
    <div style={{
      padding: '14px 20px', borderBottom: '1px solid ' + FB_T.border,
      background: FB_T.bgNav, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexShrink: 0, height: 56,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{
          width: 30, height: 30, background: FB_T.bgCard, border: '1px solid ' + FB_T.ring,
          borderRadius: 6, color: FB_T.fgSec, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
        }}>←</button>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: FB_T.fgQuiet, fontWeight: 600,
          }}>Full bracket · 128 entrants</div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', marginTop: 1 }}>
            K-Pop Girl Group Members 2026
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <FBHeaderBtn>↗ Share</FBHeaderBtn>
        <FBHeaderBtn primary>↓ Save image</FBHeaderBtn>
        <button style={{
          width: 30, height: 30, background: 'transparent', border: 'none',
          color: FB_T.fgQuiet, fontSize: 18, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 4,
        }}>×</button>
      </div>
    </div>
  );
}

function FBHeaderBtn({ children, primary }) {
  return (
    <button style={{
      padding: '7px 12px', fontSize: 12, fontWeight: 600,
      background: primary ? FB_T.purple : 'transparent',
      color: primary ? '#fff' : FB_T.fgSec,
      border: primary ? 'none' : '1px solid ' + FB_T.border,
      borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
    }}>{children}</button>
  );
}

// ── Round chips (top filter band) ──────────────────────────────────────────

function FBRoundChips({ active = 'all' }) {
  return (
    <div style={{
      position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: 4, padding: 4, background: 'rgba(10,10,14,0.78)',
      backdropFilter: 'blur(14px)', border: '1px solid ' + FB_T.ring,
      borderRadius: 999, zIndex: 4,
    }}>
      <FBChip label="All rounds" active={active === 'all'} />
      {FB_ROUND_CHIPS.map(r => <FBChip key={r} label={r} active={active === r} />)}
    </div>
  );
}

function FBChip({ label, active }) {
  return (
    <div style={{
      padding: '6px 12px', fontSize: 11, fontWeight: 700,
      fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.06em',
      borderRadius: 999,
      background: active ? FB_T.purple : 'transparent',
      color: active ? '#fff' : FB_T.fgMuted, cursor: 'pointer',
    }}>{label}</div>
  );
}

// ── Zoom controls (bottom-right) ───────────────────────────────────────────

function FBZoomControls({ pct = 100, onSave, hideOnDrag }) {
  if (hideOnDrag) return null;
  return (
    <div style={{
      position: 'absolute', right: 18, bottom: 18, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 4,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: 6,
        background: 'rgba(10,10,14,0.78)', backdropFilter: 'blur(14px)',
        border: '1px solid ' + FB_T.ring, borderRadius: 999,
      }}>
        <FBIconBtn>−</FBIconBtn>
        <div style={{
          width: 110, height: 4, background: FB_T.border, borderRadius: 999, position: 'relative',
        }}>
          <div style={{
            width: `${Math.min(100, pct / 4)}%`, height: '100%',
            background: FB_T.purpleLight, borderRadius: 999,
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: `${Math.min(100, pct / 4)}%`,
            transform: 'translate(-50%,-50%)',
            width: 12, height: 12, borderRadius: 999,
            background: '#fff', boxShadow: `0 0 0 2px ${FB_T.bgNav}`,
          }} />
        </div>
        <FBIconBtn>+</FBIconBtn>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
          color: FB_T.fgSec, padding: '0 6px', minWidth: 36, textAlign: 'center',
        }}>{pct}%</span>
        <button style={{
          padding: '4px 10px', fontSize: 10, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '0.08em',
          background: FB_T.bgCard, color: FB_T.fgSec, border: '1px solid ' + FB_T.ring,
          borderRadius: 999, cursor: 'pointer',
        }}>FIT</button>
      </div>
    </div>
  );
}

function FBIconBtn({ children }) {
  return (
    <button style={{
      width: 24, height: 24, borderRadius: 999, background: FB_T.bgCard,
      border: '1px solid ' + FB_T.ring, color: FB_T.fgSec,
      fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</button>
  );
}

// ── Bracket canvas ─────────────────────────────────────────────────────────
// Geometry: total available H = 100%. Each side has 6 round columns + center
// final. Outer rounds have many small rows; inner rounds have few tall rows.

function FBBracket({ scale = 1, panX = 0, panY = 0, focusRound = null, dim = false, viewerPath = false }) {
  // We render an oversized 1700 x 1600 canvas and let scale/pan place it.
  const W = 1900, H = 1500;
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background:
        'radial-gradient(circle at 50% 50%, #14141c 0%, #0a0a0e 80%)',
    }}>
      {/* faint dot grid to suggest infinite canvas */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -50%) translate(${panX}px, ${panY}px) scale(${scale})`,
        transformOrigin: 'center center',
        width: W, height: H,
        opacity: dim ? 0.55 : 1,
      }}>
        <FBBracketBody focusRound={focusRound} viewerPath={viewerPath} />
      </div>
    </div>
  );
}

function FBBracketBody({ focusRound, viewerPath }) {
  // We split the canvas into left half / center / right half.
  // Layout uses CSS grid for columns; rows inside each column are flex-spaced
  // so match heights stay aligned across rounds.
  const colWidth = 138;
  const gap = 14;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid',
      gridTemplateColumns:
        `repeat(${FB_SIDE.length}, ${colWidth}px) 220px repeat(${FB_SIDE.length}, ${colWidth}px)`,
      columnGap: gap, padding: '40px 60px', alignItems: 'stretch',
    }}>
      {/* LEFT SIDE — R128 outermost on far left, S innermost next to final */}
      {FB_SIDE.map((rd, idx) => (
        <FBColumn
          key={'L-' + rd.id} side="L" round={rd}
          focus={isFocused(rd.id, focusRound)} viewerPath={viewerPath}
          isOuter={idx === 0}
        />
      ))}

      {/* CENTER — final */}
      <FBFinalColumn focus={isFocused('f', focusRound)} viewerPath={viewerPath} />

      {/* RIGHT SIDE — S innermost, R128 outermost on far right */}
      {[...FB_SIDE].reverse().map((rd, idx) => (
        <FBColumn
          key={'R-' + rd.id} side="R" round={rd}
          focus={isFocused(rd.id, focusRound)} viewerPath={viewerPath}
          isOuter={idx === FB_SIDE.length - 1}
        />
      ))}
    </div>
  );
}

function isFocused(rdId, focus) {
  if (!focus || focus === 'all') return null; // no focus → no dim
  // Round chips chosen via FB_ROUND_CHIPS labels (uppercase). Map.
  const map = { R128: 'r128', R64: 'r64', R32: 'r32', R16: 'r16', Q: 'q', S: 's', F: 'f' };
  return map[focus] === rdId ? true : false;
}

function FBColumn({ side, round, focus, viewerPath, isOuter }) {
  const matches = round.matches;
  const matchH = matches >= 16 ? 16 : matches >= 8 ? 38 : matches >= 4 ? 76 : matches >= 2 ? 158 : 320;
  const dim = focus === false;
  const isViewerCol = viewerPath; // all left-side cols dim except the path
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
      gap: 4, opacity: dim ? 0.25 : 1, transition: 'opacity 160ms',
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: focus ? FB_T.purpleLight : FB_T.fgQuiet,
        fontWeight: 700, marginBottom: 6, textAlign: side === 'L' ? 'left' : 'right',
      }}>{round.label}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: matches >= 16 ? 2 : matches >= 8 ? 4 : matches >= 4 ? 8 : 14 }}>
        {Array.from({ length: matches }).map((_, mi) => (
          <FBMatch
            key={mi}
            side={side}
            round={round}
            mi={mi}
            h={matchH}
            tiny={matches >= 16}
            small={matches >= 8 && matches < 16}
            onPath={viewerPath && side === 'L' && mi === 0}
          />
        ))}
      </div>
    </div>
  );
}

function FBMatch({ side, round, mi, h, tiny, small, onPath }) {
  const hueA = fbHue(side, FB_SIDE.findIndex(r => r.id === round.id), mi * 2);
  const hueB = fbHue(side, FB_SIDE.findIndex(r => r.id === round.id), mi * 2 + 1);
  const winnerIsA = (hueA + mi) % 2 === 0;
  // Path highlight: viewer's path goes through Match 0 of every round on the L side (mock).
  const highlight = onPath;
  return (
    <div style={{
      height: h, display: 'flex', flexDirection: 'column', gap: 2,
      borderRadius: 4,
      padding: tiny ? '0' : (small ? 2 : 4),
      background: highlight ? 'rgba(124,58,237,0.16)' : 'transparent',
      border: highlight ? '1px solid rgba(124,58,237,0.5)' : 'none',
    }}>
      <FBSlot hue={hueA} won={winnerIsA} tiny={tiny} small={small} />
      <FBSlot hue={hueB} won={!winnerIsA} tiny={tiny} small={small} />
    </div>
  );
}

function FBSlot({ hue, won, tiny, small }) {
  const stripe = `repeating-linear-gradient(135deg, oklch(60% 0.14 ${hue}) 0 6px, oklch(48% 0.14 ${hue}) 6px 12px)`;
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', gap: 4,
      padding: tiny ? '0 2px' : (small ? '2px 4px' : '4px 6px'),
      borderRadius: 3,
      background: won ? '#1a1a22' : '#101016',
      border: '1px solid ' + (won ? FB_T.border : '#101016'),
      opacity: won ? 1 : 0.55,
      minHeight: 0,
    }}>
      <div style={{
        width: tiny ? 6 : (small ? 10 : 14), height: tiny ? 6 : (small ? 10 : 14),
        borderRadius: 2, background: stripe, flexShrink: 0,
      }} />
      {!tiny && (
        <div style={{
          flex: 1, height: small ? 2 : 4, borderRadius: 2,
          background: won ? `oklch(70% 0.14 ${hue})` : '#222230', minWidth: 0,
        }} />
      )}
      {won && !tiny && !small && (
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8, fontWeight: 800,
          color: FB_T.green, letterSpacing: '0.08em',
        }}>W</span>
      )}
    </div>
  );
}

function FBFinalColumn({ focus, viewerPath }) {
  const dim = focus === false;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      gap: 12, opacity: dim ? 0.25 : 1,
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: focus ? FB_T.purpleLight : FB_T.fgQuiet,
        fontWeight: 700, textAlign: 'center', marginBottom: 8,
      }}>Final</div>
      <div style={{
        padding: 14, borderRadius: 10,
        background: 'linear-gradient(180deg, rgba(124,58,237,0.18), rgba(56,224,123,0.10))',
        border: '1px solid rgba(124,58,237,0.5)',
        boxShadow: '0 0 0 4px rgba(124,58,237,0.08)',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: FB_T.green, fontWeight: 700, marginBottom: 8, textAlign: 'center',
        }}>★ CHAMPION</div>
        <div style={{
          height: 88, borderRadius: 6, marginBottom: 8,
          background: `repeating-linear-gradient(135deg, oklch(60% 0.14 ${FB_PATH_HUE}) 0 14px, oklch(48% 0.14 ${FB_PATH_HUE}) 14px 28px)`,
        }} />
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.01em', textAlign: 'center', color: FB_T.fg }}>Jiwoo</div>
        <div style={{ fontSize: 10, color: FB_T.fgQuiet, fontFamily: '"JetBrains Mono", monospace', textAlign: 'center', marginTop: 2 }}>
          NEONWAVE · 6-0
        </div>
      </div>
      <div style={{
        marginTop: 4, padding: 8, borderRadius: 6,
        background: '#101016', border: '1px solid ' + FB_T.border,
      }}>
        <div style={{ fontSize: 10, color: FB_T.fgQuiet, fontFamily: '"JetBrains Mono", monospace', textAlign: 'center', marginBottom: 4 }}>RUNNER-UP</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <div style={{
            width: 16, height: 16, borderRadius: 3,
            background: `repeating-linear-gradient(135deg, oklch(60% 0.14 320) 0 6px, oklch(48% 0.14 320) 6px 12px)`,
          }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: FB_T.fgSec }}>Ayeon</span>
        </div>
      </div>
    </div>
  );
}

// ── Toasts ─────────────────────────────────────────────────────────────────

function FBToast({ kind, children }) {
  const map = {
    pending: { bg: FB_T.bgCard, fg: FB_T.fg, accent: FB_T.purpleLight, icon: 'spinner' },
    success: { bg: FB_T.bgCard, fg: FB_T.fg, accent: FB_T.green, icon: '✓' },
    failure: { bg: FB_T.bgCard, fg: FB_T.fg, accent: FB_T.red, icon: '!' },
  };
  const t = map[kind];
  return (
    <div style={{
      position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px', borderRadius: 10,
      background: t.bg, border: '1px solid ' + FB_T.ring,
      boxShadow: '0 12px 36px rgba(0,0,0,0.5)', minWidth: 320, zIndex: 5,
    }}>
      {t.icon === 'spinner' ? (
        <span style={{
          width: 14, height: 14, borderRadius: 999,
          border: '2px solid ' + FB_T.border, borderTopColor: t.accent,
          animation: 'fb-spin 0.9s linear infinite',
        }} />
      ) : (
        <span style={{
          width: 22, height: 22, borderRadius: 999,
          background: kind === 'success' ? 'rgba(56,224,123,0.18)' : 'rgba(255,95,95,0.18)',
          color: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800,
        }}>{t.icon}</span>
      )}
      <div style={{ flex: 1, fontSize: 13, color: t.fg }}>{children}</div>
      {kind === 'failure' && (
        <button style={{
          padding: '6px 12px', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
          background: FB_T.purple, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
        }}>Try again</button>
      )}
      {kind !== 'failure' && (
        <button style={{
          background: 'transparent', border: 'none', color: FB_T.fgQuiet,
          fontSize: 18, cursor: 'pointer', padding: 0, fontFamily: 'inherit',
        }}>×</button>
      )}
      <style>{'@keyframes fb-spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  );
}

// ── Offline banner ─────────────────────────────────────────────────────────

function FBOfflineBanner() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 14,
      background: 'rgba(255,184,77,0.10)', borderBottom: '1px solid rgba(255,184,77,0.35)',
      color: FB_T.amber, fontSize: 12, zIndex: 6,
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: 999, background: FB_T.amber,
        boxShadow: `0 0 10px ${FB_T.amber}`,
      }} />
      <span style={{ fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10 }}>
        Connection lost
      </span>
      <span style={{ color: FB_T.fgSec }}>
        Showing the last snapshot from <strong style={{ color: FB_T.fg, fontFamily: '"JetBrains Mono", monospace' }}>2 min ago</strong> · live tally paused
      </span>
      <span style={{ flex: 1 }} />
      <button style={{
        padding: '6px 12px', fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
        background: 'rgba(255,184,77,0.18)', color: FB_T.amber,
        border: '1px solid rgba(255,184,77,0.4)', borderRadius: 6, cursor: 'pointer',
      }}>↻ Reconnect</button>
    </div>
  );
}

// ── Drag/zoom overlay hint ─────────────────────────────────────────────────

function FBDragHint() {
  return (
    <div style={{
      position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)',
      padding: '6px 12px', borderRadius: 999,
      background: 'rgba(10,10,14,0.78)', backdropFilter: 'blur(10px)',
      border: '1px solid ' + FB_T.ring,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: FB_T.fgMuted, fontWeight: 600, zIndex: 4,
    }}>✥ drag to pan · scroll to zoom · double-click to fit</div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────

function FBLoadingBracket() {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 18,
      background: 'radial-gradient(circle at 50% 50%, #14141c 0%, #0a0a0e 80%)',
    }}>
      {/* Faint scaffolding */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 18px', borderRadius: 999,
        background: FB_T.bgCard, border: '1px solid ' + FB_T.ring, zIndex: 1,
      }}>
        <span style={{
          width: 14, height: 14, borderRadius: 999,
          border: '2px solid ' + FB_T.border, borderTopColor: FB_T.purpleLight,
          animation: 'fb-spin 0.9s linear infinite',
        }} />
        <span style={{ fontSize: 13, color: FB_T.fg, fontWeight: 600 }}>Drawing 128 entrants…</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: FB_T.fgQuiet,
          marginLeft: 4,
        }}>3 of 7 rounds</span>
      </div>
      {/* Scaffold lines */}
      <svg width="900" height="380" style={{ position: 'absolute', opacity: 0.18, zIndex: 0 }}>
        {Array.from({ length: 32 }).map((_, i) => (
          <line key={i}
            x1={20} x2={140} y1={i * 12 + 6} y2={i * 12 + 6}
            stroke={FB_T.purpleLight} strokeWidth="1" />
        ))}
        {Array.from({ length: 32 }).map((_, i) => (
          <line key={'r' + i}
            x1={760} x2={880} y1={i * 12 + 6} y2={i * 12 + 6}
            stroke={FB_T.purpleLight} strokeWidth="1" />
        ))}
      </svg>
      <style>{'@keyframes fb-spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  );
}

// ── Save panel preview (the rectangle the export will capture) ────────────

function FBSaveCropOverlay() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
    }}>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 540, height: 680,
        border: '2px dashed ' + FB_T.purpleLight,
        borderRadius: 10,
        boxShadow: '0 0 0 9999px rgba(8,8,12,0.55)',
      }}>
        <div style={{
          position: 'absolute', top: -28, left: 0,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: FB_T.purpleLight, fontWeight: 700,
        }}>Capturing rounds Q–F · 1080×1350 PNG</div>
      </div>
    </div>
  );
}

// ── Artboards ──────────────────────────────────────────────────────────────

function FBLoading() {
  return (
    <FBFrame>
      <FBRoundChips active="all" />
      <FBLoadingBracket />
      <FBZoomControls pct={100} />
    </FBFrame>
  );
}

function FBDefault() {
  return (
    <FBFrame>
      <FBRoundChips active="all" />
      <FBBracket scale={0.62} panX={0} panY={0} viewerPath />
      <FBZoomControls pct={62} />
    </FBFrame>
  );
}

function FBZoomedDrag() {
  return (
    <FBFrame>
      <FBRoundChips active="all" />
      <FBBracket scale={1.4} panX={-260} panY={120} viewerPath />
      <FBDragHint />
      {/* hand cursor pin */}
      <div style={{
        position: 'absolute', left: '52%', top: '46%', zIndex: 5, pointerEvents: 'none',
        fontSize: 22, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
      }}>✥</div>
    </FBFrame>
  );
}

function FBRoundFocus() {
  return (
    <FBFrame>
      <FBRoundChips active="Q" />
      <FBBracket scale={0.85} panX={0} panY={0} focusRound="Q" viewerPath />
      <FBZoomControls pct={85} />
    </FBFrame>
  );
}

function FBSavePending() {
  return (
    <FBFrame>
      <FBRoundChips active="Q" />
      <FBBracket scale={0.85} panX={0} panY={0} focusRound="Q" />
      <FBSaveCropOverlay />
      <FBToast kind="pending">
        Saving rounds <strong style={{ color: FB_T.fg, fontFamily: '"JetBrains Mono", monospace' }}>Q–F</strong> as PNG…
      </FBToast>
    </FBFrame>
  );
}

function FBSaveSuccess() {
  return (
    <FBFrame>
      <FBRoundChips active="Q" />
      <FBBracket scale={0.85} panX={0} panY={0} focusRound="Q" />
      <FBToast kind="success">
        Saved <strong style={{ color: FB_T.fg, fontFamily: '"JetBrains Mono", monospace' }}>K-Pop-2026-bracket.png</strong>
        <span style={{ color: FB_T.fgQuiet, marginLeft: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 11 }}>1080×1350 · 240 KB</span>
      </FBToast>
    </FBFrame>
  );
}

function FBSaveFailure() {
  return (
    <FBFrame>
      <FBRoundChips active="Q" />
      <FBBracket scale={0.85} panX={0} panY={0} focusRound="Q" />
      <FBToast kind="failure">
        Couldn't save image. <span style={{ color: FB_T.fgQuiet }}>Browser blocked downloads in this tab.</span>
      </FBToast>
    </FBFrame>
  );
}

function FBOffline() {
  return (
    <FBFrame>
      <FBOfflineBanner />
      <FBRoundChips active="all" />
      <FBBracket scale={0.62} panX={0} panY={0} dim viewerPath />
      <FBZoomControls pct={62} />
    </FBFrame>
  );
}

Object.assign(window, {
  FBLoading, FBDefault, FBZoomedDrag, FBRoundFocus,
  FBSavePending, FBSaveSuccess, FBSaveFailure, FBOffline,
});
