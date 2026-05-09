// Bracket cards — used in trending grid + quick-play tiles.
function BracketCard({ bracket, idx = 0 }) {
  const { placeholderBg } = window.KPOP_DATA;
  const live = (idx * 7) % 35 + 5;
  return (
    <div style={card({ overflow: 'hidden', cursor: 'pointer' })}>
      <div style={{
        aspectRatio: '16/10', background: placeholderBg((idx * 53) % 360, 55), position: 'relative',
      }}>
        <Pill style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)', color: '#fff' }}>{bracket.tag}</Pill>
        <Pill style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(56,224,123,0.2)', color: '#38e07b' }}>● {live} live</Pill>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{bracket.title}</div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6b6b7d',
          display: 'flex', justifyContent: 'space-between', fontVariantNumeric: 'tabular-nums',
        }}>
          <span>{bracket.rounds}</span>
          <span>{bracket.plays} plays</span>
        </div>
      </div>
    </div>
  );
}

function QuickPlayTile({ item }) {
  return (
    <div style={card({ padding: 14, cursor: 'pointer' })}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 600,
        color: '#38e07b', fontVariantNumeric: 'tabular-nums',
      }}>● {item.live} watching</div>
    </div>
  );
}

function Pill({ children, style }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 600,
      padding: '3px 7px', borderRadius: 4, ...style,
    }}>{children}</div>
  );
}

function card(extra = {}) {
  return {
    background: '#18181f', borderRadius: 10,
    boxShadow: '0 0 0 1px rgba(255,255,255,0.06)', ...extra,
  };
}

window.BracketCard = BracketCard;
window.QuickPlayTile = QuickPlayTile;
window.Pill = Pill;
window.kitCard = card;
