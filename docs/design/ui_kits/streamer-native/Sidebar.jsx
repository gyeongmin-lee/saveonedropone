// Left sidebar — categories + live streamers list.
function Sidebar() {
  const { ACTIVE_STREAMERS, placeholderBg } = window.KPOP_DATA;
  const cats = [
    ['🎤', 'K-Pop', true], ['🎮', 'Video Games'], ['📺', 'Anime'], ['🏈', 'Sports'],
    ['🎬', 'Movies'], ['🎵', 'Music'], ['🍔', 'Food'], ['👕', 'Fashion'],
  ];
  return (
    <div style={{ borderRight: '1px solid #1f1f28', padding: '20px 16px' }}>
      <SectionLabel>Browse</SectionLabel>
      {cats.map(([icon, name, active], i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
          borderRadius: 6, cursor: 'pointer',
          background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
          color: active ? '#b794f4' : '#c4c2d2',
          fontSize: 14, fontWeight: active ? 600 : 500,
        }}>
          <span style={{ fontSize: 16, filter: 'grayscale(0.3)' }}>{icon}</span>
          {name}
        </div>
      ))}

      <div style={{ marginTop: 20 }}><SectionLabel>Live Streamers</SectionLabel></div>
      {ACTIVE_STREAMERS.map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
          cursor: 'pointer', borderRadius: 6,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: placeholderBg((i * 87) % 360, 60),
            border: '2px solid #38e07b', flexShrink: 0,
          }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#9b9aab', fontVariantNumeric: 'tabular-nums' }}>● {s.viewers}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: '#6b6b7d', marginBottom: 12, fontWeight: 600,
    }}>{children}</div>
  );
}

window.Sidebar = Sidebar;
window.SectionLabel = SectionLabel;
