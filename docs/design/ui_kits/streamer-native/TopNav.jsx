// Top navigation — logo, primary nav links, search, screen toggle, avatar.
function TopNav({ screen, onScreenChange }) {
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', background: '#0a0a0e', borderBottom: '1px solid #1f1f28',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Logo />
        <div style={{ display: 'flex', gap: 4 }}>
          {['Browse', 'Following', 'Streamers', 'Create'].map((x, i) => (
            <button key={x} style={{
              padding: '6px 12px', fontSize: 14, background: 'transparent',
              color: i === 0 ? '#fff' : '#9b9aab', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: i === 0 ? 600 : 500, borderRadius: 6,
            }}>{x}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: 380, margin: '0 24px', position: 'relative' }}>
        <input type="text" placeholder="Search brackets, streamers, categories..." style={{
          width: '100%', padding: '8px 12px 8px 34px', background: '#18181f',
          color: '#e8e6f0', border: '1px solid #1f1f28', borderRadius: 6,
          fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
        }} />
        <div style={{ position: 'absolute', left: 11, top: 9, color: '#6b6b7d', fontSize: 14 }}>⌕</div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {['home', 'matchup', 'result'].map(s => (
          <button key={s} onClick={() => onScreenChange(s)} style={{
            padding: '6px 12px', fontSize: 12,
            background: screen === s ? '#7c3aed' : 'transparent',
            color: screen === s ? '#fff' : '#9b9aab',
            border: '1px solid ' + (screen === s ? '#7c3aed' : '#1f1f28'),
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, borderRadius: 6,
            textTransform: 'capitalize',
          }}>{s}</button>
        ))}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #b794f4, #38e07b)', marginLeft: 8,
        }} />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 800, color: '#0a0a0e',
      }}>S</div>
      <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 18 }}>SaveDrop</div>
    </div>
  );
}

window.TopNav = TopNav;
window.Logo = Logo;
