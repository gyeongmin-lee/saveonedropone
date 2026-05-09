// Live Mode states — overlay panels and altered matchup chrome.
// Renders the existing StreamerMatchup with a Live Mode panel slotted into
// its toolbar plus the right-rail ChatPanel in the appropriate state. Each
// state is a self-contained 1180×760 frame for the design canvas.
//
// States (per brief):
//   1. regular      — no Live Mode, single column, no %chat badges
//   2. cta          — "Go Live" CTA in toolbar (entry point)
//   3. oauth        — popup OAuth in flight, dimmed page
//   4. connecting   — connected button, ChatPanel "Connecting…"
//   5. connected    — full live state, %chat badges, vote tally, chat feed
//   6. no_votes     — connected but 0 chat votes yet (after match advance)
//   7. disconnected — connection dropped mid-match, banner + reconnect

const LM_T = {
  bg: '#0e0e12', bgNav: '#0a0a0e', bgCard: '#18181f',
  bgInput: '#0a0a0e', bgHover: '#1f1f28',
  fg: '#e8e6f0', fgSec: '#c4c2d2', fgMuted: '#9b9aab', fgQuiet: '#6b6b7d',
  purple: '#7c3aed', purpleLight: '#b794f4', green: '#38e07b',
  red: '#ff5f5f', amber: '#ffb84d',
  border: '#1f1f28', ring: 'rgba(255,255,255,0.06)',
};

const LM_CHAT = [
  { user: 'k_drmr',     color: '#38e07b', msg: '!a jiwoo no contest', vote: 'A' },
  { user: 'velvetstan', color: '#b794f4', msg: '!B SEORA SUPREMACY', vote: 'B' },
  { user: 'pinkbeam',   color: '#ff79b8', msg: 'this round is rough', vote: null },
  { user: 'minty',      color: '#5cdcff', msg: '!a all the way', vote: 'A' },
  { user: 'haoslive',   color: '#ffb84d', msg: '!b gotta save Seora here', vote: 'B' },
  { user: 'softdrop',   color: '#ff5f5f', msg: '!a jiwoo for sure', vote: 'A' },
  { user: 'rambii',     color: '#7cf2c4', msg: 'either way it\'s a banger', vote: null },
  { user: 'bopstan',    color: '#b794f4', msg: '!B', vote: 'B' },
  { user: 'cymbol',     color: '#5cdcff', msg: '!a easy', vote: 'A' },
];

// ── shared chrome bits (reduced from the full prototype to make a clean frame) ──

function LMTopNav() {
  const gradText = {
    background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text',
    WebkitTextFillColor: 'transparent', color: 'transparent',
  };
  return (
    <div style={{
      height: 56, background: LM_T.bgNav, borderBottom: '1px solid ' + LM_T.border,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#0a0a0e',
          }}>S</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: LM_T.fg }}>
            Save<span style={gradText}>1</span>Drop<span style={gradText}>1</span>
          </div>
        </div>
        {/* Nav links — no Live */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[['Browse', true], ['Create', false]].map(([label, active]) => (
            <button key={label} style={{
              padding: '6px 12px', fontSize: 14, background: 'transparent',
              color: active ? '#fff' : LM_T.fgMuted, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: active ? 600 : 500, borderRadius: 6,
            }}>{label}</button>
          ))}
        </div>
      </div>
      {/* Avatar only — no Create bracket CTA */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'linear-gradient(135deg, #b794f4, #38e07b)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700, color: '#0a0a0e',
      }}>SK</div>
    </div>
  );
}

function LMMatchInfoBar({ liveActive }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 24px', borderBottom: '1px solid ' + LM_T.border,
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: LM_T.fg }}>K-Pop Girl Group Members 2026</div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: LM_T.fgQuiet }}>
          Round of 32 · Match 7 of 16
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: i < 6 ? LM_T.green : i === 6 ? LM_T.purple : LM_T.border,
          }} />
        ))}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: LM_T.fgQuiet }}>03:42</div>
    </div>
  );
}

function LMContestants({ showChatBadge, badgeA, badgeB }) {
  const left = { name: 'Jiwoo', group: 'AESPA', hue: 280 };
  const right = { name: 'Seora', group: 'IVE', hue: 340 };
  return (
    <div style={{
      flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 20,
    }}>
      {[left, right].map((c, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            flex: 1, borderRadius: 10, position: 'relative', overflow: 'hidden',
            background: window.cbPlaceholder(c.hue, 55), minHeight: 380,
            boxShadow: '0 0 0 1px ' + LM_T.ring,
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(14,14,18,0.92) 100%)',
            }} />
            {showChatBadge && (
              <div style={{
                position: 'absolute', top: 12, [i === 0 ? 'left' : 'right']: 12,
                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                color: i === 0 ? LM_T.green : LM_T.purpleLight,
              }}>{(i === 0 ? badgeA : badgeB)}% chat</div>
            )}
            <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700,
                color: i === 0 ? LM_T.green : LM_T.purpleLight, marginBottom: 6,
              }}>{c.group}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 44, fontWeight: 800, lineHeight: 1, color: LM_T.fg, letterSpacing: '-0.02em' }}>
                {c.name}
              </div>
            </div>
          </div>
          <button style={{
            marginTop: 10, padding: '12px 0', fontSize: 13, fontWeight: 700,
            border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
            background: i === 0 ? LM_T.green : LM_T.purple,
            color: i === 0 ? '#0a0a0e' : '#fff',
          }}>Save {c.name} →</button>
        </div>
      ))}
    </div>
  );
}

function LMToolbar({ liveButton, status }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 24px', borderTop: '1px solid ' + LM_T.border,
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <ToolBtn>← Undo</ToolBtn>
        <ToolBtn>↻ Restart</ToolBtn>
        <ToolBtn>⤴ Skip</ToolBtn>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {status && (
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: LM_T.green, letterSpacing: '0.1em' }}>
            ✓ Saved locally
          </span>
        )}
        {liveButton}
      </div>
    </div>
  );
}

function ToolBtn({ children, primary, danger, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 14px', fontSize: 12, fontWeight: 600,
      background: primary ? LM_T.purple : 'transparent',
      color: primary ? '#fff' : danger ? LM_T.red : LM_T.fgMuted,
      border: '1px solid ' + (primary ? 'transparent' : danger ? '#3a2228' : LM_T.border),
      borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>{children}</button>
  );
}

function GoLiveBtn() {
  return (
    <button style={{
      padding: '7px 14px', fontSize: 12, fontWeight: 700,
      background: 'transparent', color: LM_T.purpleLight,
      border: '1px solid ' + LM_T.purple, borderRadius: 6, cursor: 'pointer',
      fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: LM_T.purpleLight }} /> Go Live
    </button>
  );
}

function LiveActiveBtn({ state }) {
  const dot = state === 'connected' ? LM_T.green : state === 'connecting' ? LM_T.amber : LM_T.red;
  const label = state === 'connected' ? 'Live' : state === 'connecting' ? 'Connecting' : 'Disconnected';
  return (
    <button style={{
      padding: '7px 14px', fontSize: 12, fontWeight: 700,
      background: 'rgba(124,58,237,0.18)', color: LM_T.purpleLight,
      border: '1px solid ' + LM_T.purple, borderRadius: 6, cursor: 'pointer',
      fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: 999, background: dot,
        boxShadow: state === 'connected' ? `0 0 0 3px ${LM_T.green}33` : 'none',
      }} />
      {label} · twitch.tv/sookykim
      <span style={{ color: LM_T.fgQuiet, fontSize: 10, marginLeft: 4 }}>▾</span>
    </button>
  );
}

// ── Right-rail ChatPanel — read-only (no compose input) ──

function LMChatPanel({ state, votesA = 0, votesB = 0 }) {
  const totalVotes = votesA + votesB;
  const pctA = totalVotes ? Math.round((votesA / totalVotes) * 100) : 0;
  const pctB = totalVotes ? 100 - pctA : 0;
  return (
    <div style={{
      borderLeft: '1px solid ' + LM_T.border, display: 'flex', flexDirection: 'column',
      background: '#0d0d12',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid ' + LM_T.border,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 8,
            color: state === 'connected' || state === 'no_votes' ? LM_T.green :
                   state === 'connecting' ? LM_T.amber : LM_T.red,
          }}>●</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: LM_T.fg }}>Twitch chat</span>
          {(state === 'connected' || state === 'no_votes') && (
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: LM_T.fgQuiet }}>
              1,240
            </span>
          )}
        </div>
        <button style={{
          background: 'transparent', border: 'none', color: LM_T.fgQuiet,
          cursor: 'pointer', fontSize: 14,
        }}>⚙</button>
      </div>

      {/* Vote tally */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid ' + LM_T.border }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: LM_T.fgQuiet, marginBottom: 8, fontWeight: 600,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Live chat vote</span>
          {totalVotes > 0 && <span style={{ color: LM_T.fg }}>{totalVotes}</span>}
        </div>

        {totalVotes === 0 ? (
          <div style={{
            height: 32, borderRadius: 6, background: '#0a0a0e',
            border: '1px dashed ' + LM_T.border, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: LM_T.fgQuiet, fontFamily: 'JetBrains Mono, monospace',
          }}>
            {state === 'connecting' ? 'Waiting for connection…' :
             state === 'disconnected' ? 'Vote count paused' :
             'Waiting for first !A or !B'}
          </div>
        ) : (
          <div style={{ display: 'flex', height: 32, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{
              width: pctA + '%', background: LM_T.green, color: '#0a0a0e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, transition: 'width .25s', minWidth: pctA > 0 ? 36 : 0,
            }}>{pctA > 8 ? `A · ${pctA}%` : pctA > 0 ? `${pctA}%` : ''}</div>
            <div style={{
              width: pctB + '%', background: LM_T.purple, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, transition: 'width .25s', minWidth: pctB > 0 ? 36 : 0,
            }}>{pctB > 8 ? `B · ${pctB}%` : pctB > 0 ? `${pctB}%` : ''}</div>
          </div>
        )}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: LM_T.fgQuiet, marginTop: 6,
        }}>
          {state === 'connected' || state === 'no_votes' ? 'Viewers vote with !A or !B in chat. Resets on next match.' :
           state === 'connecting' ? '—' :
           state === 'disconnected' ? 'Last tally · attempting to reconnect' : '—'}
        </div>
      </div>

      {/* Disconnect banner */}
      {state === 'disconnected' && (
        <div style={{
          padding: '10px 16px', background: 'rgba(255,95,95,0.1)',
          borderBottom: '1px solid rgba(255,95,95,0.25)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: LM_T.red, marginBottom: 2 }}>
              Connection dropped
            </div>
            <div style={{ fontSize: 11, color: LM_T.fgMuted, lineHeight: 1.4 }}>
              Match state is safe. Votes will resume once we reconnect.
            </div>
          </div>
          <button style={{
            padding: '5px 10px', fontSize: 11, fontWeight: 700, background: LM_T.red,
            color: '#0a0a0e', border: 'none', borderRadius: 5, cursor: 'pointer',
            fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>Reconnect</button>
        </div>
      )}

      {/* Messages area */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {state === 'connecting' ? (
          <LMChatEmpty title="Connecting to Twitch chat" subtitle="Joining channel · listening for !A / !B" spin />
        ) : state === 'disconnected' ? (
          <div style={{ opacity: 0.4, padding: '8px 16px' }}>
            {LM_CHAT.slice(0, 4).map((m, i) => <ChatLine key={i} m={m} />)}
          </div>
        ) : (
          <div style={{ padding: '8px 16px' }}>
            {(state === 'no_votes' ? LM_CHAT.filter((m) => !m.vote).slice(0, 3) : LM_CHAT).map((m, i) => (
              <ChatLine key={i} m={m} />
            ))}
            {state === 'no_votes' && (
              <div style={{
                marginTop: 10, padding: '10px 12px', background: 'rgba(124,58,237,0.08)',
                borderRadius: 6, fontSize: 11, color: LM_T.purpleLight, fontFamily: 'JetBrains Mono, monospace',
                lineHeight: 1.5,
              }}>
                ↻ New match · counter reset to 0. Chat connection still open.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Read-only footer (replaces the compose input from the prototype) */}
      <div style={{
        padding: '10px 16px', borderTop: '1px solid ' + LM_T.border,
        background: LM_T.bgNav,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color: LM_T.fgQuiet, letterSpacing: '0.08em',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>READ-ONLY · chat in twitch.tv/sookykim</span>
        <span>↗</span>
      </div>
    </div>
  );
}

function ChatLine({ m }) {
  return (
    <div style={{ padding: '4px 0', fontSize: 13, lineHeight: 1.45 }}>
      <span style={{ color: m.color, fontWeight: 700 }}>{m.user}</span>
      {m.vote && <span style={{
        display: 'inline-block', margin: '0 6px', padding: '1px 5px',
        fontSize: 9, fontWeight: 700, borderRadius: 3,
        background: m.vote === 'A' ? LM_T.green : LM_T.purple,
        color: m.vote === 'A' ? '#0a0a0e' : '#fff',
      }}>VOTE {m.vote}</span>}
      <span style={{ color: LM_T.fgMuted }}>: {m.msg}</span>
    </div>
  );
}

function LMChatEmpty({ title, subtitle, spin }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 8, padding: 24, textAlign: 'center',
    }}>
      {spin && (
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          border: '2px solid ' + LM_T.border, borderTopColor: LM_T.purpleLight,
          animation: 'lm-spin 0.9s linear infinite',
        }} />
      )}
      <div style={{ fontSize: 13, fontWeight: 600, color: LM_T.fg }}>{title}</div>
      <div style={{ fontSize: 11, color: LM_T.fgQuiet, lineHeight: 1.5, maxWidth: 220 }}>
        {subtitle}
      </div>
      <style>{`@keyframes lm-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

// ── Top-level frame factory ──

function LMFrame({ liveActive, badgeA, badgeB, chatState, liveBtn, overlay, savedStatus = true }) {
  return (
    <div style={{
      width: 1180, height: 760, background: LM_T.bg, color: LM_T.fg,
      fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      <LMTopNav />
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: liveActive ? '1fr 320px' : '1fr',
        minHeight: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <LMMatchInfoBar liveActive={liveActive} />
          <LMContestants showChatBadge={liveActive && (badgeA + badgeB > 0)} badgeA={badgeA} badgeB={badgeB} />
          <LMToolbar liveButton={liveBtn} status={savedStatus} />
        </div>
        {liveActive && <LMChatPanel state={chatState} votesA={badgeA} votesB={badgeB} />}
      </div>
      {overlay}
    </div>
  );
}

// ── Per-state exports ──

function LMRegular() {
  return <LMFrame liveActive={false} liveBtn={<GoLiveBtn />} />;
}

function LMOauth() {
  return (
    <LMFrame
      liveActive={false}
      liveBtn={<GoLiveBtn />}
      overlay={
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Mock browser popup */}
          <div style={{
            width: 420, background: LM_T.bgCard, borderRadius: 10,
            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ' + LM_T.ring,
            overflow: 'hidden',
          }}>
            <div style={{
              height: 32, background: LM_T.bgNav, display: 'flex',
              alignItems: 'center', gap: 6, padding: '0 12px',
              borderBottom: '1px solid ' + LM_T.border,
            }}>
              {['#ff5f5f', '#ffb84d', '#38e07b'].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c }} />
              ))}
              <div style={{
                marginLeft: 14, fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, color: LM_T.fgQuiet, letterSpacing: '0.05em',
              }}>id.twitch.tv/oauth2/authorize</div>
            </div>
            <div style={{ padding: 28, textAlign: 'center' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 8, margin: '0 auto 14px',
                background: '#9146FF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, color: '#fff', fontWeight: 800,
              }}>tv</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: LM_T.fg }}>
                Authorize Save One Drop One
              </div>
              <div style={{ fontSize: 12, color: LM_T.fgMuted, lineHeight: 1.5, marginBottom: 20 }}>
                Read your channel's chat messages and post the bracket bot's vote tally.
                Required scopes: <span style={{ fontFamily: 'JetBrains Mono, monospace', color: LM_T.fg }}>channel:bot</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  flex: 1, padding: '10px 0', background: 'transparent',
                  color: LM_T.fgMuted, border: '1px solid ' + LM_T.border,
                  borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}>Cancel</button>
                <button style={{
                  flex: 1, padding: '10px 0', background: '#9146FF',
                  color: '#fff', border: 'none', borderRadius: 6, fontSize: 13,
                  fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}>Authorize</button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

function LMConnecting() {
  return <LMFrame liveActive={true} chatState="connecting" badgeA={0} badgeB={0} liveBtn={<LiveActiveBtn state="connecting" />} />;
}

function LMConnectedNoVotes() {
  return <LMFrame liveActive={true} chatState="no_votes" badgeA={0} badgeB={0} liveBtn={<LiveActiveBtn state="connected" />} />;
}

function LMConnected() {
  return <LMFrame liveActive={true} chatState="connected" badgeA={62} badgeB={38} liveBtn={<LiveActiveBtn state="connected" />} />;
}

function LMDisconnected() {
  return <LMFrame liveActive={true} chatState="disconnected" badgeA={62} badgeB={38} liveBtn={<LiveActiveBtn state="disconnected" />} />;
}

Object.assign(window, {
  LMRegular, LMOauth, LMConnecting, LMConnectedNoVotes, LMConnected, LMDisconnected,
});
