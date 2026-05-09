// Home screen — sidebar + hero card + trending grid + quick play.
function HomeScreen() {
  const { FEATURED_BRACKETS, TRENDING_NOW, placeholderBg } = window.KPOP_DATA;
  const { Sidebar, SectionLabel, BracketCard, QuickPlayTile, kitCard } = window;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 56px)' }}>
      <Sidebar />
      <div style={{ padding: '24px 32px 80px', overflow: 'hidden' }}>
        <HeroCard />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 22, margin: 0 }}>Trending K-Pop brackets</h2>
          <button style={{
            background: 'transparent', border: 'none', color: '#b794f4',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>See all →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
          {FEATURED_BRACKETS.slice(0, 8).map((b, i) => <BracketCard key={b.id} bracket={b} idx={i} />)}
        </div>

        <h2 style={{ fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 22, margin: '0 0 14px' }}>Quick play</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {TRENDING_NOW.map(t => <QuickPlayTile key={t.id} item={t} />)}
        </div>
      </div>
    </div>
  );
}

function HeroCard() {
  const { placeholderBg } = window.KPOP_DATA;
  const { kitCard } = window;
  return (
    <div style={kitCard({
      padding: 0, marginBottom: 32, overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 320px',
    })}>
      <div style={{ padding: 28 }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#b794f4', marginBottom: 12, fontWeight: 600,
        }}>⚡ Featured this week</div>
        <h1 style={{
          fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
          fontSize: 40, margin: '0 0 8px', lineHeight: 1.05,
        }}>K-Pop Girl Group Members 2026</h1>
        <div style={{ fontSize: 14, color: '#9b9aab', marginBottom: 20 }}>
          64 contenders · single elimination · ~28 min
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24, fontSize: 13 }}>
          <Stat value="482K" label="plays this week" />
          <Stat value="247" label="live streams" />
          <Stat value="+34%" label="vs last week" green />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btn('primary')}>▶ Start tournament</button>
          <button style={btn('secondary')}>📺 OBS source URL</button>
          <button style={btn('tertiary')}>♡</button>
        </div>
      </div>
      <div style={{ background: placeholderBg(280, 50), position: 'relative' }}>
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#fff',
          background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: 4, fontWeight: 600,
        }}>● LIVE 247</div>
      </div>
    </div>
  );
}

function Stat({ value, label, green }) {
  return (
    <div>
      <div style={{
        fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em',
        fontSize: 22, color: green ? '#38e07b' : '#e8e6f0',
      }}>{value}</div>
      <div style={{ color: '#6b6b7d', fontSize: 12 }}>{label}</div>
    </div>
  );
}

function btn(kind) {
  const base = {
    padding: '10px 20px', fontSize: 14, fontWeight: 600,
    border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
  };
  if (kind === 'primary') return { ...base, background: '#7c3aed', color: '#fff' };
  if (kind === 'secondary') return { ...base, padding: '10px 16px', background: '#1f1f28', color: '#e8e6f0' };
  return { ...base, padding: '10px 14px', background: 'transparent', color: '#9b9aab', border: '1px solid #1f1f28' };
}

window.HomeScreen = HomeScreen;
window.HeroCard = HeroCard;
window.kitBtn = btn;
