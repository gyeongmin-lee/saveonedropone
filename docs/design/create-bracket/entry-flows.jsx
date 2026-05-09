// Entry-flow explorations — 4 flows × 2-3 variants on a design canvas.
// Each artboard mocks a slice of the composer queue with the variant's UI
// in its actual context. Visuals locked to Streamer Native (CB_TOKENS).

const T = window.CB_TOKENS;
const FONT = 'Inter, system-ui, sans-serif';
const MONO = '"JetBrains Mono", monospace';

// Sample entry rows used across artboards
const SAMPLE = {
  aespa:    { id: 'a', title: 'AESPA — Whiplash',          src: { kind: 'yt',  meta: '00:42 · 3:15', ch: 'aespa Official', hue: 280 } },
  newjeans: { id: 'b', title: 'NEWJEANS — Supernatural',   src: { kind: 'yt',  meta: '01:08 · 3:42', ch: 'M COUNTDOWN',    hue: 200 } },
  ive:      { id: 'c', title: 'IVE — HEYA',                src: { kind: 'yt',  meta: '00:00 · 3:01', ch: 'starshipTV',     hue: 340 } },
  sserafim: { id: 'd', title: 'LE SSERAFIM — Easy',        src: { kind: 'img', meta: 'imgur · 1080×1080',                  hue:  30 } },
};

// ─── Atoms ─────────────────────────────────────────────────────────────

function ArtboardShell({ children, label, sub, padding = 22 }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: T.bg, color: T.fg,
      fontFamily: FONT, padding, position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{
          fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: T.purpleLight, fontWeight: 700
        }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: T.fgMuted, marginTop: 4, lineHeight: 1.4 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

function Thumb({ src, size = 56, badgeOverride }) {
  const bg = src ? window.cbPlaceholder(src.hue, 55) : '#0a0a0e';
  return (
    <div style={{
      width: size, height: size, borderRadius: 6, flexShrink: 0,
      position: 'relative', overflow: 'hidden', background: bg,
      border: src ? 'none' : '1px dashed #3a2228'
    }}>
      {src && src.kind === 'yt' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: Math.round(size * 0.4), height: Math.round(size * 0.4), borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: Math.round(size * 0.18)
          }}>▶</div>
        </div>
      )}
      <div style={{
        position: 'absolute', bottom: 3, right: 3, background: 'rgba(0,0,0,0.7)', color: '#fff',
        fontFamily: MONO, fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 3, letterSpacing: '0.04em'
      }}>{badgeOverride || (src ? (src.kind === 'yt' ? 'YT' : src.kind === 'upload' ? 'UP' : 'IMG') : '?')}</div>
    </div>
  );
}

function QueueRow({ entry, idx = 1, highlight, overlayChip, dimmed, style }) {
  return (
    <div style={{
      display: 'flex', gap: 12, padding: 10, alignItems: 'center',
      background: T.bgCard, borderRadius: 8,
      border: '1px solid ' + (highlight ? T.purple : T.border),
      boxShadow: highlight ? '0 0 0 3px rgba(124,58,237,0.18)' : 'none',
      opacity: dimmed ? 0.45 : 1, position: 'relative', minWidth: 0,
      ...style
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 5, flexShrink: 0,
        background: '#0a0a0e', color: T.fgQuiet,
        fontFamily: MONO, fontSize: 11, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>#{idx}</div>
      <Thumb src={entry.src} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 600, lineHeight: 1.3, color: T.fg,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>{entry.title}</div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: T.fgQuiet, marginTop: 3 }}>
          {entry.src.meta}
        </div>
      </div>
      {overlayChip}
      <button style={{
        background: 'transparent', border: 'none', color: T.fgQuiet,
        cursor: 'pointer', fontSize: 16, padding: 6, borderRadius: 4
      }}>⋯</button>
    </div>
  );
}

// Mini matchup half (used in preview popover/drawer/modal)
function MatchupHalf({ entry, full, big }) {
  const stripeBg = window.cbPlaceholder(entry.src.hue, 48);
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: full ? '4/5' : '1/1',
      borderRadius: 10, overflow: 'hidden', background: stripeBg,
      border: '1px solid ' + T.border
    }}>
      {/* faux scene */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(14,14,18,0.92) 100%)' }} />
      {entry.src.kind === 'yt' && (
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            background: 'rgba(0,0,0,0.65)', color: '#fff', fontFamily: MONO, fontSize: 10,
            fontWeight: 700, padding: '3px 7px', borderRadius: 4, letterSpacing: '0.04em'
          }}>▶ {entry.src.meta.split(' · ')[0]}</span>
        </div>
      )}
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 12 }}>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
          SEED #{entry.id === 'a' ? 1 : 4}
        </div>
        <div style={{ fontSize: big ? 22 : 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, marginTop: 4, textWrap: 'pretty' }}>
          {entry.title}
        </div>
        {full && (
          <button style={{
            marginTop: 12, padding: '8px 14px', background: T.purple, color: '#fff',
            border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer'
          }}>Save {entry.title.split(' — ')[0]} →</button>
        )}
      </div>
    </div>
  );
}

// Annotated callout (red dashed pointer + label)
function Callout({ x, y, w = 180, dir = 'down', children }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, pointerEvents: 'none',
      fontFamily: MONO, fontSize: 10, color: '#ff7a7a', letterSpacing: '0.06em',
      lineHeight: 1.4, textTransform: 'uppercase', fontWeight: 700
    }}>
      <div style={{ borderLeft: '1px dashed #ff7a7a', borderTop: '1px dashed #ff7a7a',
        height: 18, width: 22, marginBottom: 4,
        ...(dir === 'up' ? { borderTop: 'none', borderBottom: '1px dashed #ff7a7a', transform: 'translateY(-2px)' } : {})
      }} />
      {children}
    </div>
  );
}

// ─── FLOW 1: Preview in matchup ─────────────────────────────────────────

function PreviewVariantA() {
  // Hover popover anchored to the row's preview button
  return (
    <ArtboardShell label="A · Hover popover" sub="Hover the row's preview eye → mini card pops out beside it. Cheapest peek; no nav.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
        <div style={{ position: 'relative' }}>
          <QueueRow
            entry={SAMPLE.newjeans} idx={2} highlight
            overlayChip={
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px',
                borderRadius: 999, fontSize: 10, fontWeight: 700, fontFamily: MONO,
                background: 'rgba(124,58,237,0.18)', color: T.purpleLight
              }}>👁 Preview</span>
            }
          />
          {/* popover */}
          <div style={{
            position: 'absolute', top: -8, left: '52%', width: 240,
            background: '#101015', border: '1px solid ' + T.border, borderRadius: 10,
            padding: 12, boxShadow: '0 24px 60px rgba(0,0,0,0.55)', zIndex: 5
          }}>
            <div style={{
              fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: T.fgQuiet,
              fontWeight: 700, marginBottom: 8
            }}>HOW IT'LL LOOK · ROUND 1</div>
            <MatchupHalf entry={SAMPLE.newjeans} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: T.fgQuiet, fontFamily: MONO }}>
              <span>Plays from 01:08</span>
              <span>3:42 total</span>
            </div>
          </div>
        </div>
        <QueueRow entry={SAMPLE.ive} idx={3} dimmed />
        <QueueRow entry={SAMPLE.sserafim} idx={4} dimmed />
      </div>
      <Callout x={250} y={108} w={220}>Floats above the row · click anywhere else to close</Callout>
    </ArtboardShell>
  );
}

function PreviewVariantB() {
  // Side drawer
  return (
    <ArtboardShell label="B · Side drawer" sub="Slides over the right rail. Persistent — click a row to swap previews. Good for QA passes.">
      <div style={{ display: 'flex', gap: 14, height: 'calc(100% - 60px)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
          <QueueRow entry={SAMPLE.newjeans} idx={2} highlight />
          <QueueRow entry={SAMPLE.ive} idx={3} dimmed />
          <QueueRow entry={SAMPLE.sserafim} idx={4} dimmed />
        </div>
        {/* drawer */}
        <div style={{
          width: 280, background: '#101015', border: '1px solid ' + T.border,
          borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 12,
          boxShadow: '-12px 0 40px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: T.fgQuiet, fontWeight: 700 }}>
              MATCHUP PREVIEW
            </div>
            <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, cursor: 'pointer', fontSize: 14 }}>×</button>
          </div>
          <MatchupHalf entry={SAMPLE.newjeans} full />
          <div style={{ borderTop: '1px solid ' + T.border, paddingTop: 10, fontSize: 11, color: T.fgMuted, lineHeight: 1.5 }}>
            <div><span style={{ color: T.fgQuiet, fontFamily: MONO }}>Source</span> · YouTube · M COUNTDOWN</div>
            <div><span style={{ color: T.fgQuiet, fontFamily: MONO }}>Plays</span> · 01:08 → end (3:42)</div>
            <div><span style={{ color: T.fgQuiet, fontFamily: MONO }}>Seed</span> · #2</div>
          </div>
          <button style={{
            marginTop: 'auto', padding: '8px 0', background: 'transparent', color: T.fgMuted,
            border: '1px solid ' + T.border, borderRadius: 6, fontSize: 12, fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer'
          }}>Edit this entry</button>
        </div>
      </div>
      <Callout x={300} y={92} w={170}>Stays open · click rows to swap</Callout>
    </ArtboardShell>
  );
}

function PreviewVariantC() {
  // Full-screen modal (full matchup feel)
  const e = SAMPLE.newjeans;
  return (
    <ArtboardShell label="C · Full modal" sub="True-to-life. Renders the actual matchup screen at scale. The 'is this card right?' check.">
      {/* dimmed queue behind */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: 0.25, filter: 'blur(2px)' }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} />
        <QueueRow entry={SAMPLE.newjeans} idx={2} />
        <QueueRow entry={SAMPLE.ive} idx={3} />
      </div>
      {/* modal overlay */}
      <div style={{
        position: 'absolute', inset: 16, top: 60, background: 'rgba(10,10,14,0.85)',
        backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 10
      }}>
        <div style={{
          width: 'min(560px, 92%)', background: '#101015', border: '1px solid ' + T.border,
          borderRadius: 12, padding: 22, position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', color: T.fgQuiet, fontWeight: 700 }}>
                PREVIEW IN MATCHUP
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.fg, marginTop: 4 }}>
                Round 1 · seed #2
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, cursor: 'pointer', fontSize: 18 }}>×</button>
          </div>
          {/* the actual matchup half, full size */}
          <div style={{ maxWidth: 320, margin: '0 auto' }}>
            <MatchupHalf entry={e} full big />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 14, padding: '10px 12px', background: '#0a0a0e',
            border: '1px solid ' + T.border, borderRadius: 8
          }}>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: T.fgMuted, fontFamily: MONO }}>
              <span>Plays 01:08 → end</span>
              <span>3:42 total</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{
                padding: '6px 12px', background: 'transparent', color: T.fgMuted,
                border: '1px solid ' + T.border, borderRadius: 6, fontSize: 12,
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
              }}>Edit</button>
              <button style={{
                padding: '6px 12px', background: T.purple, color: '#fff',
                border: 'none', borderRadius: 6, fontSize: 12,
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
              }}>← / → next</button>
            </div>
          </div>
        </div>
      </div>
    </ArtboardShell>
  );
}

// ─── FLOW 2: Edit / replace source ──────────────────────────────────────

function SourceTabs({ active = 'yt' }) {
  const tabs = [['yt', '▶ YouTube'], ['img', '🖼 Image URL'], ['upload', '⬆ Upload']];
  return (
    <div style={{ display: 'flex', gap: 4, padding: 3, background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 7 }}>
      {tabs.map(([k, l]) => (
        <button key={k} style={{
          flex: 1, background: active === k ? T.bgHover : 'transparent',
          color: active === k ? T.fg : T.fgMuted, border: 'none', padding: '7px 0',
          borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
        }}>{l}</button>
      ))}
    </div>
  );
}

function YTEditorBody({ compact }) {
  return (
    <>
      <SourceTabs active="yt" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: T.fgQuiet, fontWeight: 700, textTransform: 'uppercase' }}>YouTube URL</span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
          background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 6, height: 34
        }}>
          <span style={{ color: T.fgQuiet, fontFamily: MONO, fontSize: 11 }}>https://</span>
          <span style={{ color: T.fg, fontFamily: MONO, fontSize: 12 }}>youtube.com/watch?v=zbkizy-Y3qE</span>
        </div>
      </div>
      {/* embedded player */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        borderRadius: 6, overflow: 'hidden',
        background: window.cbPlaceholder(280, 30)
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16
        }}>▶</div>
        {/* faux progress */}
        <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10 }}>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '22%', background: '#ff3344', borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: '22%', top: -3, width: 9, height: 9, borderRadius: '50%', background: '#ff3344', transform: 'translateX(-50%)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: MONO, fontSize: 9, color: '#fff' }}>
            <span>00:42</span><span>3:15</span>
          </div>
        </div>
      </div>
      {/* numeric start time */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 10,
        padding: 10, background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 6
      }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: T.fgQuiet, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
            Starts at
          </div>
          <div style={{ fontSize: 11, color: T.fgMuted, lineHeight: 1.4 }}>
            Set the moment your matchup card begins.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={iconBtn}>−</button>
          <div style={{
            background: '#101015', border: '1px solid ' + T.border, borderRadius: 5,
            padding: '6px 10px', fontFamily: MONO, fontSize: 14, fontWeight: 700, color: T.fg,
            minWidth: 64, textAlign: 'center', letterSpacing: '0.05em'
          }}>00:42</div>
          <button style={iconBtn}>+</button>
        </div>
      </div>
      {!compact && (
        <div style={{ fontSize: 11, color: T.fgQuiet, lineHeight: 1.5, fontFamily: MONO }}>
          Tip · scrub the player above, then hit <span style={{ color: T.purpleLight }}>Use current time</span>.
        </div>
      )}
    </>
  );
}

const iconBtn = {
  width: 28, height: 28, background: T.bgHover, border: 'none', color: T.fg,
  borderRadius: 5, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
};

function FooterButtons({ onSave = 'Save changes' }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
      <button style={{
        padding: '8px 14px', background: 'transparent', color: T.fgMuted,
        border: '1px solid ' + T.border, borderRadius: 6, fontSize: 12,
        fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
      }}>Cancel</button>
      <button style={{
        padding: '8px 14px', background: T.purple, color: '#fff',
        border: 'none', borderRadius: 6, fontSize: 12,
        fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
      }}>{onSave}</button>
    </div>
  );
}

function SourceVariantA() {
  // Inline popover from the thumb
  return (
    <ArtboardShell label="A · Inline popover" sub="Click the thumb. Anchored, compact. Best for fast tweaks (start time, swap URL).">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
        <div style={{ position: 'relative' }}>
          <QueueRow entry={SAMPLE.newjeans} idx={2} highlight />
          {/* popover anchored to thumb (~52px from left edge of row) */}
          <div style={{
            position: 'absolute', top: 64, left: 44, width: 320,
            background: '#101015', border: '1px solid ' + T.border, borderRadius: 10,
            padding: 14, display: 'flex', flexDirection: 'column', gap: 10,
            boxShadow: '0 24px 60px rgba(0,0,0,0.55)', zIndex: 5
          }}>
            {/* arrow */}
            <div style={{
              position: 'absolute', top: -6, left: 24, width: 10, height: 10,
              background: '#101015', borderTop: '1px solid ' + T.border, borderLeft: '1px solid ' + T.border,
              transform: 'rotate(45deg)'
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: T.fgQuiet, fontWeight: 700 }}>
                EDIT SOURCE
              </div>
              <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, cursor: 'pointer', fontSize: 14 }}>×</button>
            </div>
            <YTEditorBody compact />
            <FooterButtons onSave="Save" />
          </div>
        </div>
        <QueueRow entry={SAMPLE.ive} idx={3} dimmed style={{ marginTop: 280 }} />
      </div>
    </ArtboardShell>
  );
}

function SourceVariantB() {
  // Modal — bigger, dedicated tabs
  return (
    <ArtboardShell label="B · Modal dialog" sub="Heaviest. Use when changing source kind (YT → image), or when scrubbing matters.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: 0.25, filter: 'blur(2px)' }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} />
        <QueueRow entry={SAMPLE.newjeans} idx={2} />
        <QueueRow entry={SAMPLE.ive} idx={3} />
      </div>
      <div style={{
        position: 'absolute', inset: 16, top: 60, background: 'rgba(10,10,14,0.85)',
        backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 10
      }}>
        <div style={{
          width: 'min(540px, 94%)', background: '#101015', border: '1px solid ' + T.border,
          borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 12
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', color: T.fgQuiet, fontWeight: 700 }}>
                EDIT SOURCE
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.fg, marginTop: 4 }}>
                NEWJEANS — Supernatural
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, cursor: 'pointer', fontSize: 18 }}>×</button>
          </div>
          <YTEditorBody />
          <FooterButtons />
        </div>
      </div>
    </ArtboardShell>
  );
}

function SourceVariantC() {
  // Right-side drawer
  return (
    <ArtboardShell label="C · Side drawer" sub="Persistent. Edit several entries in a row without losing the queue context.">
      <div style={{ display: 'flex', gap: 14, height: 'calc(100% - 60px)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
          <QueueRow entry={SAMPLE.newjeans} idx={2} highlight />
          <QueueRow entry={SAMPLE.ive} idx={3} dimmed />
          <QueueRow entry={SAMPLE.sserafim} idx={4} dimmed />
        </div>
        <div style={{
          width: 320, background: '#101015', border: '1px solid ' + T.border, borderRadius: 10,
          padding: 14, display: 'flex', flexDirection: 'column', gap: 10,
          boxShadow: '-12px 0 40px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: T.fgQuiet, fontWeight: 700 }}>
              EDIT · #2
            </div>
            <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, cursor: 'pointer', fontSize: 14 }}>×</button>
          </div>
          <YTEditorBody compact />
          <FooterButtons onSave="Save" />
        </div>
      </div>
    </ArtboardShell>
  );
}

// ─── FLOW 3: Title edit on completed row ────────────────────────────────

function TitleVariantA() {
  // Click-to-edit inline (matches the missing-title input visually)
  return (
    <ArtboardShell label="A · Click to edit inline" sub="Click the title text → it becomes the same input used for missing titles. Lowest friction.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
        <div style={{
          display: 'flex', gap: 12, padding: 10, alignItems: 'center',
          background: T.bgCard, borderRadius: 8, border: '1px solid ' + T.purple,
          boxShadow: '0 0 0 3px rgba(124,58,237,0.18)', minWidth: 0
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 5, background: '#0a0a0e', color: T.fgQuiet,
            fontFamily: MONO, fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>#2</div>
          <Thumb src={SAMPLE.newjeans.src} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              background: '#0a0a0e', color: T.fg, fontSize: 13, fontWeight: 600,
              border: '1px solid ' + T.purple, borderRadius: 4,
              padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 2
            }}>
              <span>NEWJEANS — Supernatural</span>
              <span style={{ width: 1, height: 14, background: T.purpleLight, marginLeft: 1, animation: 'none' }} />
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, color: T.fgQuiet, marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
              <span>{SAMPLE.newjeans.src.meta}</span>
              <span style={{ color: T.purpleLight }}>↵ save · esc cancel</span>
            </div>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, fontSize: 16, padding: 6 }}>⋯</button>
        </div>
        <QueueRow entry={SAMPLE.ive} idx={3} dimmed />
        <QueueRow entry={SAMPLE.sserafim} idx={4} dimmed />
      </div>
      <Callout x={130} y={120} w={200}>Same input, same border, no modal</Callout>
    </ArtboardShell>
  );
}

function TitleVariantB() {
  // Hover reveals pencil
  return (
    <ArtboardShell label="B · Hover reveals pencil" sub="Discoverable but unobtrusive. Pencil opens the inline editor; one extra click vs. variant A.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
        <div style={{
          display: 'flex', gap: 12, padding: 10, alignItems: 'center',
          background: T.bgCard, borderRadius: 8, border: '1px solid ' + T.border, minWidth: 0
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 5, background: '#0a0a0e', color: T.fgQuiet,
            fontFamily: MONO, fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>#2</div>
          <Thumb src={SAMPLE.newjeans.src} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: T.fg, whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
              }}>NEWJEANS — Supernatural</div>
              <button style={{
                background: T.bgHover, border: 'none', color: T.fgMuted, width: 22, height: 22,
                borderRadius: 4, fontSize: 11, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', padding: 0
              }}>✎</button>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, color: T.fgQuiet, marginTop: 3 }}>
              {SAMPLE.newjeans.src.meta}
            </div>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, fontSize: 16, padding: 6 }}>⋯</button>
        </div>
        <QueueRow entry={SAMPLE.ive} idx={3} dimmed />
        <QueueRow entry={SAMPLE.sserafim} idx={4} dimmed />
      </div>
      <Callout x={300} y={120} w={170}>Appears on row hover only</Callout>
    </ArtboardShell>
  );
}

function TitleVariantC() {
  // Lives in the source-edit modal/popover (one place edits everything)
  return (
    <ArtboardShell label="C · Inside the edit panel" sub="No new affordance. Title is just one field inside the source-edit drawer. Single mental model.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
        <div style={{ position: 'relative' }}>
          <QueueRow entry={SAMPLE.newjeans} idx={2} highlight />
          <div style={{
            position: 'absolute', top: 64, left: 44, width: 320,
            background: '#101015', border: '1px solid ' + T.border, borderRadius: 10,
            padding: 14, display: 'flex', flexDirection: 'column', gap: 10,
            boxShadow: '0 24px 60px rgba(0,0,0,0.55)', zIndex: 5
          }}>
            <div style={{ position: 'absolute', top: -6, left: 24, width: 10, height: 10,
              background: '#101015', borderTop: '1px solid ' + T.border, borderLeft: '1px solid ' + T.border,
              transform: 'rotate(45deg)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: T.fgQuiet, fontWeight: 700 }}>EDIT ENTRY</div>
              <button style={{ background: 'transparent', border: 'none', color: T.fgQuiet, fontSize: 14, cursor: 'pointer' }}>×</button>
            </div>
            {/* title field, called out */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: T.purpleLight, fontWeight: 700, textTransform: 'uppercase' }}>Title</span>
              <div style={{
                display: 'flex', alignItems: 'center', padding: '0 10px',
                background: '#0a0a0e', border: '1px solid ' + T.purple, borderRadius: 6, height: 34
              }}>
                <span style={{ color: T.fg, fontSize: 13, fontWeight: 600 }}>NEWJEANS — Supernatural</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: T.fgQuiet, fontWeight: 700, textTransform: 'uppercase' }}>Source</span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
                background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 6
              }}>
                <Thumb src={SAMPLE.newjeans.src} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: T.fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>youtube.com/…zbkizy-Y3qE</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: T.fgQuiet }}>YT · 01:08 · 3:42</div>
                </div>
                <button style={{
                  background: 'transparent', border: '1px solid ' + T.border, color: T.fgMuted,
                  padding: '4px 10px', borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                }}>Replace</button>
              </div>
            </div>
            <FooterButtons onSave="Save" />
          </div>
        </div>
        <QueueRow entry={SAMPLE.ive} idx={3} dimmed style={{ marginTop: 240 }} />
      </div>
    </ArtboardShell>
  );
}

// ─── FLOW 4: "..." menu ──────────────────────────────────────────────

function MenuItem({ icon, label, kbd, danger, group }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
      padding: '7px 10px', background: 'transparent', border: 'none',
      color: danger ? '#ff7a7a' : T.fg, fontSize: 12, fontWeight: 500,
      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderRadius: 4
    }}>
      <span style={{ width: 16, color: danger ? '#ff7a7a' : T.fgMuted, textAlign: 'center', fontSize: 12 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {kbd && <span style={{ fontFamily: MONO, fontSize: 10, color: T.fgQuiet, letterSpacing: '0.04em' }}>{kbd}</span>}
    </button>
  );
}

function MenuDivider({ label }) {
  return label ? (
    <div style={{
      fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
      color: T.fgQuiet, fontWeight: 700, padding: '8px 10px 4px'
    }}>{label}</div>
  ) : (
    <div style={{ height: 1, background: T.border, margin: '4px 0' }} />
  );
}

function KebabVariantA() {
  // Compact, flat — most likely actions only
  return (
    <ArtboardShell label="A · Compact menu" sub="Six actions, no grouping. Covers 90% of tasks; everything else lives elsewhere.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
        <div style={{ position: 'relative' }}>
          <QueueRow entry={SAMPLE.newjeans} idx={2} highlight />
          <div style={{
            position: 'absolute', top: 60, right: 8, width: 220,
            background: '#101015', border: '1px solid ' + T.border, borderRadius: 8,
            padding: 4, boxShadow: '0 16px 40px rgba(0,0,0,0.5)', zIndex: 5
          }}>
            <MenuItem icon="👁" label="Preview in matchup" />
            <MenuItem icon="✎" label="Edit title" />
            <MenuItem icon="↺" label="Replace source" />
            <MenuItem icon="⎘" label="Duplicate" kbd="⌘D" />
            <MenuItem icon="↑" label="Move to top" />
            <MenuDivider />
            <MenuItem icon="🗑" label="Delete entry" danger />
          </div>
        </div>
        <QueueRow entry={SAMPLE.ive} idx={3} dimmed style={{ marginTop: 220 }} />
      </div>
    </ArtboardShell>
  );
}

function KebabVariantB() {
  // Grouped — full surface with seeding + sharing buckets
  return (
    <ArtboardShell label="B · Grouped menu" sub="Power-user kit. Edit → Seeding → Source → Destructive. Use when the queue gets long.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <QueueRow entry={SAMPLE.aespa} idx={1} dimmed />
        <div style={{ position: 'relative' }}>
          <QueueRow entry={SAMPLE.newjeans} idx={2} highlight />
          <div style={{
            position: 'absolute', top: 60, right: 8, width: 240,
            background: '#101015', border: '1px solid ' + T.border, borderRadius: 8,
            padding: 4, boxShadow: '0 16px 40px rgba(0,0,0,0.5)', zIndex: 5
          }}>
            <MenuDivider label="EDIT" />
            <MenuItem icon="👁" label="Preview in matchup" />
            <MenuItem icon="✎" label="Edit title" />
            <MenuItem icon="↺" label="Replace source" />
            <MenuItem icon="⎘" label="Duplicate" kbd="⌘D" />
            <MenuDivider label="SEEDING" />
            <MenuItem icon="★" label="Set as #1 seed" />
            <MenuItem icon="📌" label="Pin · randomizer skips" />
            <MenuItem icon="↑" label="Move to top" />
            <MenuItem icon="↓" label="Move to bottom" />
            <MenuDivider label="SOURCE" />
            <MenuItem icon="↗" label="Open original" />
            <MenuItem icon="🔗" label="Copy URL" />
            <MenuDivider />
            <MenuItem icon="🗑" label="Delete entry" danger />
          </div>
        </div>
        <QueueRow entry={SAMPLE.ive} idx={3} dimmed style={{ marginTop: 380 }} />
      </div>
    </ArtboardShell>
  );
}

// ─── Canvas root ────────────────────────────────────────────────────────

function EntryFlowsCanvas() {
  const W = 560, H = 540;
  const Hwide = 600;
  return (
    <DesignCanvas>
      <DCSection id="preview" title="Preview entry in matchup"
        subtitle="See what an added entry will look like as a matchup card. Three weights of preview surface.">
        <DCArtboard id="prev-a" label="A · Hover popover"   width={W} height={H}><PreviewVariantA /></DCArtboard>
        <DCArtboard id="prev-b" label="B · Side drawer"     width={W} height={Hwide}><PreviewVariantB /></DCArtboard>
        <DCArtboard id="prev-c" label="C · Full modal"      width={W} height={Hwide}><PreviewVariantC /></DCArtboard>
        <DCPostIt top={120} left={-200} rotate={-3} width={170}>
          Each shows the entry alone — no opponent. The composer doesn't know the bracket order yet.
        </DCPostIt>
      </DCSection>

      <DCSection id="source" title="Edit or replace the source"
        subtitle="Same control surface for YouTube · Image URL · Upload. YT path shows a player + numeric MM:SS start time, no scrub bar — by request.">
        <DCArtboard id="src-a" label="A · Inline popover"  width={W} height={620}><SourceVariantA /></DCArtboard>
        <DCArtboard id="src-b" label="B · Modal dialog"    width={W} height={620}><SourceVariantB /></DCArtboard>
        <DCArtboard id="src-c" label="C · Side drawer"     width={W} height={620}><SourceVariantC /></DCArtboard>
        <DCPostIt top={120} left={-200} rotate={2} width={170}>
          All three reuse the same YT/Image/Upload tab body — only the chrome changes.
        </DCPostIt>
      </DCSection>

      <DCSection id="title" title="Edit a title on a completed row"
        subtitle="Today only missing titles get an input — these add an edit affordance to completed rows.">
        <DCArtboard id="ttl-a" label="A · Click to edit"          width={W} height={H}><TitleVariantA /></DCArtboard>
        <DCArtboard id="ttl-b" label="B · Hover pencil"           width={W} height={H}><TitleVariantB /></DCArtboard>
        <DCArtboard id="ttl-c" label="C · Inside the edit panel"  width={W} height={H}><TitleVariantC /></DCArtboard>
        <DCPostIt top={140} left={-200} rotate={-2} width={170}>
          A is most consistent with the existing missing-title input. C bundles title+source into one place.
        </DCPostIt>
      </DCSection>

      <DCSection id="kebab" title='What goes in the row "⋯" menu?'
        subtitle="Two density levels. Compact for the common path, grouped for the power-user once queues get long.">
        <DCArtboard id="kbb-a" label="A · Compact (6 items)" width={W} height={H}><KebabVariantA /></DCArtboard>
        <DCArtboard id="kbb-b" label="B · Grouped (full kit)" width={W} height={620}><KebabVariantB /></DCArtboard>
        <DCPostIt top={140} left={-200} rotate={3} width={170}>
          Conventions used: ★ = top seed, 📌 = pin (randomizer skips), ↗ = open source in new tab.
        </DCPostIt>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EntryFlowsCanvas />);
