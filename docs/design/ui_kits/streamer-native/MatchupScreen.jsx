// Matchup — the core 1v1 game loop with live chat panel.
function MatchupScreen() {
  const { C, placeholderBg } = window.KPOP_DATA;
  const left = C.jw, right = C.sr;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <MatchInfoBar title="K-Pop Girl Group Members 2026" round="Round of 32 · Match 7 of 16" timer="03:42" progress={6} />
        <div style={{
          flex: 1, display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 0, padding: 24,
        }}>
          <ContestantCard side="left" contestant={left} pct={62} seed={3} winRate={67} />
          <VSDivider />
          <ContestantCard side="right" contestant={right} pct={38} seed={11} winRate={54} />
        </div>
        <MatchupToolbar />
      </div>
      <ChatPanel />
    </div>
  );
}

function MatchInfoBar({ title, round, timer, progress }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 24px', borderBottom: '1px solid #1f1f28',
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6b6b7d' }}>{round}</div>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: i < progress ? '#38e07b' : i === progress ? '#7c3aed' : '#1f1f28',
          }} />
        ))}
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6b6b7d' }}>{timer}</div>
    </div>
  );
}

function ContestantCard({ side, contestant, pct, seed, winRate }) {
  const { placeholderBg } = window.KPOP_DATA;
  const isLeft = side === 'left';
  return (
    <div style={{ gridColumn: isLeft ? 1 : 3, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flex: 1, borderRadius: 12, background: placeholderBg(contestant.hue, 55),
        position: 'relative', overflow: 'hidden', minHeight: 420,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(14,14,18,0.92) 100%)' }} />
        <div style={{
          position: 'absolute', top: 16, [isLeft ? 'left' : 'right']: 16,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700,
          color: isLeft ? '#38e07b' : '#b794f4', fontFamily: '"JetBrains Mono", monospace',
        }}>{pct}% chat</div>
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: isLeft ? '#38e07b' : '#b794f4', marginBottom: 8, fontWeight: 700,
          }}>{contestant.group}</div>
          <div style={{
            fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
            fontSize: 56, marginBottom: 8, lineHeight: 1,
          }}>{contestant.name}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={pillStyle()}>Seed #{seed}</span>
            <span style={pillStyle()}>Win {winRate}%</span>
          </div>
        </div>
      </div>
      <button style={{
        marginTop: 12, padding: '14px 0', fontSize: 14, fontWeight: 700,
        border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
        background: isLeft ? '#38e07b' : '#7c3aed',
        color: isLeft ? '#0a0a0e' : '#fff',
      }}>Save {contestant.name} →</button>
    </div>
  );
}

function pillStyle() {
  return {
    background: '#1f1f28', padding: '4px 10px', borderRadius: 999,
    fontSize: 11, fontWeight: 600, fontFamily: '"JetBrains Mono", monospace',
  };
}

function VSDivider() {
  return (
    <div style={{
      gridColumn: 2, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
        fontSize: 36, color: '#6b6b7d',
        background: '#18181f', padding: '12px 16px', borderRadius: 999,
        border: '1px solid #1f1f28',
      }}>VS</div>
    </div>
  );
}

function MatchupToolbar() {
  const tBtn = {
    padding: '6px 12px', fontSize: 12, background: 'transparent',
    color: '#9b9aab', border: '1px solid #1f1f28', borderRadius: 6,
    cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
  };
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 24px', borderTop: '1px solid #1f1f28',
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={tBtn}>← Undo</button>
        <button style={tBtn}>↻ Restart</button>
        <button style={tBtn}>⤴ Skip</button>
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6b6b7d' }}>
        Press A / D · or click either side
      </div>
    </div>
  );
}

window.MatchupScreen = MatchupScreen;
window.ContestantCard = ContestantCard;
window.VSDivider = VSDivider;
window.MatchInfoBar = MatchInfoBar;
window.MatchupToolbar = MatchupToolbar;
