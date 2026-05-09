// Create Bracket — Published confirmation panel.
// Lifted from the original Synthesis exploration (CBSynth4) — used as-is per finalization decision.
// Drops the milestone strip; adds a slim "← Back to edit" affordance via onEdit.

function Published({ onEdit }) {
  const T = window.CB_TOKENS;
  const { Btn, MonoLabel } = window;
  return (
    <div style={{
      width: '100%', height: '100vh', background: T.bg, color: T.fg,
      fontFamily: '"Inter", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Slim header — same chrome family as composer */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: T.bgNav, borderBottom: '1px solid ' + T.border,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onEdit} style={{
            background: 'transparent', border: '1px solid ' + T.border, color: T.fgMuted,
            borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
          }}>← Back to edit</button>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: T.fgQuiet,
            letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
          }}>published · 14:42 UTC · public</div>
        </div>
        <Btn variant="secondary" size="sm">Save draft</Btn>
      </div>

      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 32px 124px', overflow: 'auto', minHeight: 0,
      }}>
        <div style={{ maxWidth: 760, width: '100%', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 999,
          background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, color: '#0a0a0e', fontWeight: 800,
          margin: '0 auto 22px',
        }}>✓</div>
        <MonoLabel color={T.green} style={{ marginBottom: 8 }}>● Published</MonoLabel>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.05 }}>
          K-Pop Girl Group Members 2026
        </h1>
        <div style={{ fontSize: 14, color: T.fgMuted, marginBottom: 28 }}>
          Round of 16 · 12 entries · public
        </div>

        {/* Share URL row */}
        <div style={{
          display: 'flex', gap: 8, padding: 6, background: T.bgInput,
          border: '1px solid ' + T.border, borderRadius: 8, marginBottom: 14,
        }}>
          <div style={{
            flex: 1, padding: '10px 14px', textAlign: 'left',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: T.purpleLight,
          }}>save1drop1.tv/k-pop-girl-2026</div>
          <Btn variant="primary" size="md">📋 Copy</Btn>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Btn variant="primary" size="md">▶ Play</Btn>
          <Btn variant="secondary" size="md">𝕏 Share</Btn>
          <Btn variant="secondary" size="md">Reddit</Btn>
          <Btn variant="secondary" size="md">Discord</Btn>
        </div>
        </div>
      </div>
    </div>
  );
}

window.Published = Published;
