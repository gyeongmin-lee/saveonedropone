// Result — champion hero, share buttons, mini-bracket, community verdict.
function ResultScreen() {
  const { C, placeholderBg } = window.KPOP_DATA;
  const champ = C.jw;

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 1280, margin: '0 auto' }}>
      <ChampionHero champ={champ} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <BracketReplay />
        <CommunityVerdict />
      </div>
    </div>
  );
}

function ChampionHero({ champ }) {
  const { placeholderBg } = window.KPOP_DATA;
  return (
    <div style={{
      background: '#18181f', borderRadius: 10, boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
      padding: 0, marginBottom: 24, overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '380px 1fr',
    }}>
      <div style={{ background: placeholderBg(champ.hue, 55), aspectRatio: '4/5', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'linear-gradient(135deg, #b794f4, #38e07b)',
          color: '#0a0a0e', padding: '6px 12px', borderRadius: 999,
          fontSize: 11, fontWeight: 800, letterSpacing: '0.05em',
        }}>★ CHAMPION</div>
      </div>
      <div style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#b794f4', marginBottom: 12, fontWeight: 600,
        }}>Your tournament winner</div>
        <h1 style={{
          fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
          fontSize: 88, margin: '0 0 4px', lineHeight: 0.95,
        }}>{champ.name}</h1>
        <div style={{ fontSize: 16, color: '#9b9aab', marginBottom: 24 }}>
          {champ.group} · 6 rounds · undefeated
        </div>
        <div style={{ display: 'flex', gap: 32, marginBottom: 28 }}>
          <BigStat label="Time" value="5:24" />
          <BigStat label="Streak" value="6-0" />
          <BigStat label="Pace" value="Top 18%" green />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ShareBtn primary>↓ Download bracket</ShareBtn>
          <ShareBtn>🔗 Copy link</ShareBtn>
          <ShareBtn>𝕏 Share</ShareBtn>
          <ShareBtn>Reddit</ShareBtn>
          <ShareBtn>Discord</ShareBtn>
        </div>
      </div>
    </div>
  );
}

function BigStat({ value, label, green }) {
  return (
    <div>
      <div style={{
        fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
        fontSize: 22, color: green ? '#38e07b' : '#e8e6f0',
      }}>{value}</div>
      <div style={{ fontSize: 11, color: '#6b6b7d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
    </div>
  );
}

function ShareBtn({ children, primary }) {
  return (
    <button style={{
      padding: '10px 14px', fontSize: 13, fontWeight: 600,
      background: primary ? '#7c3aed' : '#1f1f28',
      color: primary ? '#fff' : '#e8e6f0',
      border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
    }}>{children}</button>
  );
}

function BracketReplay() {
  return (
    <div style={{ background: '#18181f', borderRadius: 10, boxShadow: '0 0 0 1px rgba(255,255,255,0.06)', padding: 24 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: '#6b6b7d', fontWeight: 600, marginBottom: 16,
      }}>Final Eight · path to the championship</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <BracketCol round="Round of 8" pairs={[['mk', 'jw'], ['hj', 'sr']]} />
        <BracketCol round="Semifinal" pairs={[['sr', 'jw']]} big />
        <BracketCol round="Final" pairs={[['ay', 'jw']]} big winner />
      </div>
    </div>
  );
}

function BracketCol({ round, pairs, big, winner }) {
  const { C, placeholderBg } = window.KPOP_DATA;
  return (
    <div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: '#6b6b7d', marginBottom: 10, fontWeight: 600,
      }}>{round}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {pairs.map((pair, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {pair.map((id, j) => {
              const c = C[id];
              const won = id === 'jw' || (round === 'Round of 8' && j === 1);
              return (
                <div key={id} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: big ? 10 : 8,
                  background: winner && j === 1 ? 'linear-gradient(90deg, rgba(124,58,237,0.3), rgba(56,224,123,0.2))' : '#0e0e12',
                  borderRadius: 6, border: '1px solid ' + (winner && j === 1 ? '#7c3aed' : '#1f1f28'),
                  opacity: won ? 1 : 0.45,
                }}>
                  <div style={{
                    width: big ? 32 : 24, height: big ? 32 : 24, borderRadius: 4,
                    background: placeholderBg(c.hue, 55), flexShrink: 0,
                  }} />
                  <div style={{ fontSize: big ? 13 : 12, fontWeight: 600 }}>{c.name}</div>
                  {won && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: '#38e07b' }}>WIN</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityVerdict() {
  return (
    <div style={{ background: '#18181f', borderRadius: 10, boxShadow: '0 0 0 1px rgba(255,255,255,0.06)', padding: 24 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: '#6b6b7d', marginBottom: 12, fontWeight: 600,
      }}>Community verdict</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 56, lineHeight: 1, color: '#38e07b' }}>73%</div>
        <div style={{ fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 18, color: '#9b9aab' }}>agree</div>
      </div>
      <div style={{ fontSize: 13, color: '#9b9aab', marginBottom: 20 }}>
        of 482K players picked Jiwoo as champion
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['🔥 Most popular', 'Jiwoo', '73%'],
          ['😱 Biggest upset', 'Ayeon ▲ Doyun', '12%'],
          ['⚡ Fastest run', 'avg 6m 41s', null],
        ].map(([k, v, p], i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', fontSize: 13,
            padding: '10px 12px', background: '#0e0e12', borderRadius: 6,
          }}>
            <span style={{ color: '#9b9aab' }}>{k}</span>
            <span style={{ fontWeight: 600 }}>
              {v} {p && <span style={{ marginLeft: 6, color: '#b794f4', fontFamily: '"JetBrains Mono", monospace' }}>{p}</span>}
            </span>
          </div>
        ))}
      </div>
      <button style={{
        marginTop: 16, width: '100%', padding: '12px 0', fontSize: 13, fontWeight: 600,
        background: 'transparent', color: '#b794f4', border: '1px solid #1f1f28',
        borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
      }}>↻ Play again with new bracket →</button>
    </div>
  );
}

window.ResultScreen = ResultScreen;
window.ChampionHero = ChampionHero;
window.BracketReplay = BracketReplay;
window.CommunityVerdict = CommunityVerdict;
