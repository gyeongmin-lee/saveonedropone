// Right-rail chat panel — the streamer-native differentiator.
function ChatPanel() {
  const messages = [
    { user: 'k_drmr', color: '#38e07b', msg: 'Jiwoo no contest', vote: 'A' },
    { user: 'velvetstan', color: '#b794f4', msg: 'SEORA SUPREMACY 💜', vote: 'B' },
    { user: 'pinkbeam', color: '#ff79b8', msg: 'this round is ROUGH', vote: null },
    { user: 'minty', color: '#5cdcff', msg: 'A all the way', vote: 'A' },
    { user: 'haoslive', color: '#ffb84d', msg: 'gotta save Seora here', vote: 'B' },
    { user: 'softdrop', color: '#ff5f5f', msg: 'jiwoo for sure', vote: 'A' },
    { user: 'rambii', color: '#7cf2c4', msg: "either way it's a banger", vote: null },
  ];

  return (
    <div style={{ borderLeft: '1px solid #1f1f28', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid #1f1f28',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#38e07b', fontSize: 8 }}>●</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Stream Chat</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6b6b7d' }}>1,240</span>
        </div>
        <button style={{ background: 'transparent', border: 'none', color: '#6b6b7d', cursor: 'pointer', fontSize: 16 }}>⚙</button>
      </div>

      <VoteTally a={62} b={38} />

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px' }}>
        {messages.map((m, i) => <ChatMessage key={i} {...m} />)}
      </div>

      <div style={{ padding: 12, borderTop: '1px solid #1f1f28' }}>
        <input type="text" placeholder="Send a message" style={{
          width: '100%', padding: '8px 10px', background: '#0a0a0e',
          color: '#e8e6f0', border: '1px solid #1f1f28', borderRadius: 6,
          fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
        }} />
      </div>
    </div>
  );
}

function VoteTally({ a, b }) {
  return (
    <div style={{ padding: '14px 16px', borderBottom: '1px solid #1f1f28' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: '#6b6b7d', marginBottom: 8, fontWeight: 600,
      }}>Live chat vote</div>
      <div style={{ display: 'flex', height: 32, borderRadius: 6, overflow: 'hidden' }}>
        <div style={{
          width: `${a}%`, background: '#38e07b', color: '#0a0a0e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
        }}>A · {a}%</div>
        <div style={{
          width: `${b}%`, background: '#7c3aed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
        }}>B · {b}%</div>
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#6b6b7d', marginTop: 6 }}>
        Vote with !A or !B in chat
      </div>
    </div>
  );
}

function ChatMessage({ user, color, msg, vote }) {
  return (
    <div style={{ padding: '4px 0', fontSize: 13, lineHeight: 1.45 }}>
      <span style={{ color, fontWeight: 700 }}>{user}</span>
      {vote && <span style={{
        display: 'inline-block', margin: '0 6px', padding: '1px 5px',
        fontSize: 9, fontWeight: 700, borderRadius: 3,
        background: vote === 'A' ? '#38e07b' : '#7c3aed',
        color: vote === 'A' ? '#0a0a0e' : '#fff',
      }}>VOTE {vote}</span>}
      <span style={{ color: '#9b9aab' }}>: {msg}</span>
    </div>
  );
}

window.ChatPanel = ChatPanel;
window.VoteTally = VoteTally;
window.ChatMessage = ChatMessage;
