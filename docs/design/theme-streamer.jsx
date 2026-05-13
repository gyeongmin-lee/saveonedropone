// Theme 4: Streamer Native / Modern Dark
// Dark UI with rounded cards. Purple+green dual accent. Familiar to streamers.
// Differentiator: chat overlay, OBS source URL, vote ratio live, follower hooks.

function StreamerTheme({ screen, onScreenChange, t }) {
  const categoryId = t && t.categoryId || 'kpop';
  const bracketId = t && t.bracketId || 'kpop-girl-2026';
  const navigate = (next) => {
    if (next.categoryId && onScreenChange) onScreenChange('category', next);else
    if (next.bracketId && onScreenChange) onScreenChange('result', next);else
    if (next.screen && onScreenChange) onScreenChange(next.screen, next);
  };
  window.__navigate = navigate;
  return (
    <div className="theme-streamer" style={{
      width: '100%', minHeight: '100%', background: '#0e0e12',
      color: '#e8e6f0', fontFamily: '"Inter", system-ui, sans-serif'
    }}>
      <style>{`
        .theme-streamer .mono { font-family: "JetBrains Mono", monospace; font-variant-numeric: tabular-nums; }
        .theme-streamer .purple { color: #b794f4; }
        .theme-streamer .green { color: #38e07b; }
        .theme-streamer .purple-bg { background: #7c3aed; color: #fff; }
        .theme-streamer .card { background: #18181f; border-radius: 10px; }
        .theme-streamer .ring { box-shadow: 0 0 0 1px rgba(255,255,255,0.06); }
        .theme-streamer .display { font-family: "Inter", system-ui, sans-serif; font-weight: 800; letter-spacing: -0.02em; }
      `}</style>

      {/* Top nav */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: '#0a0a0e', borderBottom: '1px solid #1f1f28'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800, color: '#0a0a0e'
            }}>S</div>
            <div className="display" style={{ fontSize: 18 }}>
              Save<span style={{
                background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', color: 'transparent'
              }}>1</span>Drop<span style={{
                background: 'linear-gradient(135deg, #7c3aed, #38e07b)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', color: 'transparent'
              }}>1</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['Browse', 'Create'].map((x, i) =>
            <button key={x} style={{
              padding: '6px 12px', fontSize: 14, background: 'transparent',
              color: i === 0 ? '#fff' : '#9b9aab', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: i === 0 ? 600 : 500, borderRadius: 6
            }}>{x}</button>
            )}
          </div>
        </div>

        <div style={{
          flex: 1, maxWidth: 380, margin: '0 24px', position: 'relative'
        }}>
          <input type="text" placeholder="Search brackets, streamers, categories..." style={{
            width: '100%', padding: '8px 12px 8px 34px', background: '#18181f',
            color: '#e8e6f0', border: '1px solid #1f1f28', borderRadius: 6,
            fontSize: 13, fontFamily: 'inherit', outline: 'none'
          }} />
          <div style={{ position: 'absolute', left: 11, top: 9, color: '#6b6b7d', fontSize: 14 }}>⌕</div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[['home', 'Home'], ['matchup', 'Matchup'], ['result', 'Result']].map(([s, label]) =>
          <button key={s} onClick={() => onScreenChange(s)} style={{
            padding: '6px 12px', fontSize: 12, background: screen === s ? '#7c3aed' : 'transparent',
            color: screen === s ? '#fff' : '#9b9aab',
            border: '1px solid ' + (screen === s ? '#7c3aed' : '#1f1f28'),
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, borderRadius: 6
          }}>{label}</button>
          )}
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #b794f4, #38e07b)',
            marginLeft: 8
          }}></div>
        </div>
      </div>

      {screen === 'home' && <StreamerHome t={t} />}
      {screen === 'category' && <StreamerCategory categoryId={categoryId} />}
      {screen === 'matchup' && <StreamerMatchup liveState={t?.liveState || 'regular'} />}
      {screen === 'result' && <StreamerResult bracketId={bracketId} />}
    </div>);

}

// Shared left sidebar: Home + 10 categories + Live Streamers
function StreamerSidebar({ active }) {
  const { CATEGORIES, ACTIVE_STREAMERS, placeholderBg } = window.KPOP_DATA;
  const nav = window.__navigate || (() => {});

  const Row = ({ icon, label, isActive, onClick }) =>
  <div onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
    borderRadius: 6, cursor: 'pointer',
    background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
    color: isActive ? '#b794f4' : '#c4c2d2',
    fontSize: 14, fontWeight: isActive ? 600 : 500
  }}>
      <span style={{ fontSize: 16, width: 18, textAlign: 'center', filter: 'grayscale(0.3)' }}>{icon}</span>
      {label}
    </div>;


  return (
    <div style={{ borderRight: '1px solid #1f1f28', padding: '20px 16px' }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b7d', marginBottom: 12 }}>
        Browse
      </div>
      <Row icon="◉" label="Home" isActive={active === 'home'} onClick={() => nav({ screen: 'home' })} />
      <div style={{ height: 8 }} />
      {CATEGORIES.map((c) =>
      <Row key={c.id} icon={c.icon} label={c.label} isActive={active === c.id}
      onClick={() => nav({ categoryId: c.id })} />
      )}

      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b7d', margin: '20px 0 12px' }}>
        Live Streamers
      </div>
      {ACTIVE_STREAMERS.map((s, i) =>
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', cursor: 'pointer', borderRadius: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: placeholderBg(i * 87 % 360, 60), border: '2px solid #38e07b', flexShrink: 0 }}></div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
            <div className="mono" style={{ fontSize: 10, color: '#9b9aab' }}>● {s.viewers}</div>
          </div>
        </div>
      )}
    </div>);

}

function StreamerHome({ t }) {
  const { FEATURED_BRACKETS, CATEGORIES, placeholderBg } = window.KPOP_DATA;
  const nav = window.__navigate || (() => {});
  const popularCount = t && t.popularCount || 8;
  const cols = popularCount >= 8 ? 4 : popularCount >= 6 ? 3 : 2;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 56px)' }}>
      <StreamerSidebar active="home" />

      {/* Main content */}
      <div style={{ padding: '24px 32px 80px', overflow: 'hidden' }}>
        {/* Popular Brackets — cross-category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 className="display" style={{ fontSize: 22, margin: 0 }}>Popular Brackets</h2>
          <button onClick={() => nav({ categoryId: 'kpop' })} style={{
            background: 'transparent', border: 'none', color: '#b794f4',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
          }}>See all →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14, marginBottom: 40 }}>
          {FEATURED_BRACKETS.slice(0, popularCount).map((b, i) =>
          <StreamerBracketCard key={b.id} bracket={b} idx={i} />
          )}
        </div>

        {/* CategoryNav 5×2 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 className="display" style={{ fontSize: 22, margin: 0 }}>Browse by category</h2>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b7d', fontWeight: 600 }}>
            {CATEGORIES.length} categories
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {CATEGORIES.map((c, i) =>
          <div key={c.id} onClick={() => nav({ categoryId: c.id })} className="card ring" style={{
            overflow: 'hidden', cursor: 'pointer'
          }}>
              <div style={{
              aspectRatio: '16/9', background: placeholderBg((i * 47 + 200) % 360, 50),
              position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))' }}></div>
                <div style={{ position: 'relative', fontSize: 36, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}>{c.icon}</div>
              </div>
              <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</div>
                <div className="mono" style={{ fontSize: 11, color: '#6b6b7d' }}>→</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}

// Card variant used in Popular Brackets, Category page, and Result rail.
function StreamerBracketCard({ bracket, idx = 0 }) {
  const { C, placeholderBg } = window.KPOP_DATA;
  const nav = window.__navigate || (() => {});
  const ids = Object.keys(C);
  const a = C[ids[idx * 2 % ids.length]];
  const b2 = C[ids[(idx * 2 + 1) % ids.length]];
  return (
    <div onClick={() => nav({ bracketId: bracket.id })} className="card ring" style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      <div style={{ aspectRatio: '16/10', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ position: 'relative', background: placeholderBg(a.hue, 55) }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)' }}></div>
          <div style={{ position: 'absolute', bottom: 6, left: 8, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
        </div>
        <div style={{ position: 'relative', background: placeholderBg(b2.hue, 55), borderLeft: '2px solid #0e0e12' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)' }}></div>
          <div style={{ position: 'absolute', bottom: 6, left: 8, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b2.name}</div>
        </div>
        <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 6, maxWidth: 'calc(100% - 80px)' }}>
          <div className="mono" style={{ fontSize: 10, background: { kpop: '#7c3aed', anime: '#e11d6f', gaming: '#1d8cf0', movies: '#d4862a', sports: '#22a06b', music: '#b94aff', tv: '#0e8aa8', tech: '#475569', books: '#a16207', food: '#d4503a' }[bracket.category] || '#7c3aed', color: '#fff', padding: '3px 7px', borderRadius: 4, fontWeight: 700, flexShrink: 0 }}>{bracket.tag}</div>
          {bracket.kpopTag &&
          <div className="mono" style={{ fontSize: 10, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '3px 7px', borderRadius: 4, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bracket.kpopTag}</div>
          }
        </div>
        <div className="mono" style={{ position: 'absolute', top: 8, right: 8, fontSize: 10, background: 'rgba(56,224,123,0.2)', color: '#38e07b', padding: '3px 7px', borderRadius: 4, fontWeight: 600 }}>● {(idx * 7 + 5) % 40 + 5} live</div>
      </div>
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{bracket.title}</div>
          <div className="mono" style={{ fontSize: 11, color: '#6b6b7d', display: 'flex', justifyContent: 'space-between' }}>
            <span>{bracket.rounds}</span>
            <span>{bracket.plays} plays</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
          <button className="purple-bg" style={{ flex: 1, padding: '7px 0', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit' }}>▶ Start</button>
          <button style={{ padding: '7px 10px', fontSize: 12, fontWeight: 600, background: '#1f1f28', color: '#e8e6f0', border: 'none', borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit' }}>📊</button>
          <button style={{ padding: '7px 10px', fontSize: 12, fontWeight: 600, background: '#1f1f28', color: '#e8e6f0', border: 'none', borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit' }}>↗</button>
        </div>
      </div>
    </div>);

}

function StreamerCategory({ categoryId }) {
  const { FEATURED_BRACKETS, CATEGORIES, KPOP_TAGS } = window.KPOP_DATA;
  const nav = window.__navigate || (() => {});
  const cat = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const tags = cat.id === 'kpop' ? ['All', ...KPOP_TAGS] : [];

  const [activeTag, setActiveTag] = React.useState('All');
  const [tab, setTab] = React.useState('popular');
  React.useEffect(() => {setActiveTag('All');setTab('popular');}, [categoryId]);

  let list = FEATURED_BRACKETS.filter((b) => b.category === cat.id);
  if (cat.id === 'kpop' && activeTag !== 'All') list = list.filter((b) => b.kpopTag === activeTag);
  if (tab === 'popular') list = [...list].sort((a, b) => b.trending - a.trending);else
  list = [...list].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 56px)' }}>
      <StreamerSidebar active={cat.id} />
      <div style={{ padding: '24px 32px 80px', overflow: 'hidden' }}>
        <div style={{ marginBottom: 18 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6b7d', marginBottom: 6, fontWeight: 600 }}>
            <span onClick={() => nav({ screen: 'home' })} style={{ cursor: 'pointer' }}>Browse</span>
            <span style={{ margin: '0 8px', color: '#3a3a47' }}>/</span>
            <span className="purple">{cat.label}</span>
          </div>
          <h1 className="display" style={{ fontSize: 32, margin: 0 }}>
            <span style={{ marginRight: 12 }}>{cat.icon}</span>{cat.label}
          </h1>
        </div>

        {tags.length > 0 &&
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: 18, paddingBottom: 4 }}>
            {tags.map((tg) => {
            const active = tg === activeTag;
            return (
              <button key={tg} onClick={() => setActiveTag(tg)} style={{
                padding: '6px 14px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                background: active ? '#7c3aed' : '#18181f', color: active ? '#fff' : '#c4c2d2',
                border: '1px solid ' + (active ? '#7c3aed' : '#1f1f28'),
                borderRadius: 999, cursor: 'pointer', flexShrink: 0
              }}>{tg}</button>);

          })}
          </div>
        }

        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #1f1f28', marginBottom: 22 }}>
          {[['popular', 'Popular'], ['new', 'New']].map(([id, label]) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} style={{
                padding: '12px 18px', fontSize: 14, fontWeight: 600,
                background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                color: active ? '#fff' : '#9b9aab',
                borderBottom: '2px solid ' + (active ? '#7c3aed' : 'transparent'),
                marginBottom: -1
              }}>{label}</button>);

          })}
          <div style={{ flex: 1 }} />
          <div className="mono" style={{ fontSize: 11, color: '#6b6b7d', paddingBottom: 12 }}>
            {list.length} bracket{list.length === 1 ? '' : 's'}
          </div>
        </div>

        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b7d', marginBottom: 14, fontWeight: 600 }}>
          {tab === 'popular' ?
          cat.id === 'kpop' && activeTag !== 'All' ? `Popular in ${activeTag}` : `Popular in ${cat.label}` :
          `New in ${cat.label}`}
        </div>

        {list.length > 0 ?
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {list.map((b, i) => <StreamerBracketCard key={b.id} bracket={b} idx={i} />)}
          </div> :

        <div className="card ring" style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{cat.icon}</div>
            <div className="display" style={{ fontSize: 18, marginBottom: 6 }}>Nothing here yet</div>
            <div style={{ color: '#9b9aab', fontSize: 13 }}>
              {activeTag !== 'All' ? `No brackets tagged "${activeTag}" in ${cat.label}.` : `Be the first to publish a ${cat.label} bracket.`}
            </div>
          </div>
        }
      </div>
    </div>);

}

function StreamerMatchup({ liveState = 'regular' }) {
  const { C, placeholderBg } = window.KPOP_DATA;
  const left = C.jw,right = C.sr;

  const isLive = liveState !== 'regular';
  const showBadges = liveState === 'connected';
  const votesA = liveState === 'connected' ? 62 : 0;
  const votesB = liveState === 'connected' ? 38 : 0;
  const totalVotes = votesA + votesB;
  const pctA = votesA,pctB = votesB;
  const dotColor = liveState === 'connected' || liveState === 'no_votes' ? '#38e07b' :
  liveState === 'connecting' ? '#ffb84d' : '#ff5f5f';

  // Mock chat messages
  const chat = [
  { user: 'k_drmr', color: '#38e07b', msg: 'Jiwoo no contest', vote: 'A' },
  { user: 'velvetstan', color: '#b794f4', msg: 'SEORA SUPREMACY 💜', vote: 'B' },
  { user: 'pinkbeam', color: '#ff79b8', msg: 'this round is ROUGH', vote: null },
  { user: 'minty', color: '#5cdcff', msg: 'A all the way', vote: 'A' },
  { user: 'haoslive', color: '#ffb84d', msg: 'gotta save Seora here', vote: 'B' },
  { user: 'softdrop', color: '#ff5f5f', msg: 'jiwoo for sure', vote: 'A' },
  { user: 'rambii', color: '#7cf2c4', msg: "either way it's a banger", vote: null }];

  const visibleChat = liveState === 'no_votes' ? chat.filter((m) => !m.vote).slice(0, 3) :
  liveState === 'disconnected' ? chat.slice(0, 4) :
  liveState === 'connecting' ? [] :
  chat;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isLive ? '1fr 320px' : '1fr', minHeight: 'calc(100vh - 56px)' }}>
      {/* Main matchup area */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Match info bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 24px', borderBottom: '1px solid #1f1f28'
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>K-Pop Girl Group Members 2026</div>
            <div className="mono" style={{ fontSize: 11, color: '#6b6b7d' }}>Round of 32 · Match 7 of 16</div>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {Array.from({ length: 16 }).map((_, i) =>
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < 6 ? '#38e07b' : i === 6 ? '#7c3aed' : '#1f1f28'
            }}></div>
            )}
          </div>
          <div className="mono" style={{ fontSize: 11, color: '#6b6b7d' }}>03:42</div>
        </div>

        {/* Two contestants */}
        <div style={{
          flex: 1, display: 'grid', gridTemplateColumns: '1fr 24px 1fr', gap: 0, padding: 24,
          position: 'relative'
        }}>
          {[['left', left], ['right', right]].map(([side, c], i) =>
          <div key={side} style={{
            gridColumn: i === 0 ? 1 : 3, cursor: 'pointer',
            display: 'flex', flexDirection: 'column'
          }}>
              <div className="ring contestant-card" style={{
              flex: 1, borderRadius: 12, background: placeholderBg(c.hue, 55),
              position: 'relative', overflow: 'hidden', minHeight: 420
            }}>
                <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(14,14,18,0.92) 100%)'
              }}></div>
                {/* Vote percent badge — only when connected with votes */}
                {showBadges &&
              <div style={{
                position: 'absolute', top: 16, [i === 0 ? 'left' : 'right']: 16,
                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                padding: '8px 14px', borderRadius: 999,
                fontSize: 13, fontWeight: 700
              }}>
                    <span className={i === 0 ? 'green' : 'purple'}>{i === 0 ? '62%' : '38%'} chat</span>
                  </div>
              }
                {/* Name plate */}
                <div style={{
                position: 'absolute', bottom: 24, left: 24, right: 24
              }}>

                  <div className="display" style={{ fontSize: 56, marginBottom: 8, lineHeight: 1 }}>
                    {c.name}
                  </div>

                </div>
              </div>
              <button className="purple-bg" style={{
              marginTop: 12, padding: '14px 0', fontSize: 14, fontWeight: 700,
              border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
              background: i === 0 ? '#38e07b' : '#7c3aed',
              color: i === 0 ? '#0a0a0e' : '#fff'
            }}>Save {c.name} →</button>
            </div>
          )}
          {/* VS removed */}
        </div>

        {/* Bottom toolbar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 24px', borderTop: '1px solid #1f1f28'
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={toolbarBtn()}>← Undo</button>
            <button style={toolbarBtn()}>↻ Restart</button>
            <button style={toolbarBtn()}>⤴ Skip</button>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {isLive &&
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#38e07b', letterSpacing: '0.1em'
            }}>✓ Saved locally</span>
            }
            {!isLive ?
            <button style={{
              padding: '7px 14px', fontSize: 12, fontWeight: 700,
              background: 'transparent', color: '#b794f4',
              border: '1px solid #7c3aed', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#b794f4' }} />
                Go Live
              </button> :

            <button style={{
              padding: '7px 14px', fontSize: 12, fontWeight: 700,
              background: 'rgba(124,58,237,0.18)', color: '#b794f4',
              border: '1px solid #7c3aed', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
                <span style={{
                width: 8, height: 8, borderRadius: 999, background: dotColor,
                boxShadow: liveState === 'connected' ? `0 0 0 3px ${dotColor}33` : 'none'
              }} />
                {liveState === 'connecting' ? 'Connecting' : liveState === 'disconnected' ? 'Disconnected' : 'Live'}
                {' · twitch.tv/sookykim'}
                <span style={{ color: '#6b6b7d', fontSize: 10, marginLeft: 4 }}>▾</span>
              </button>
            }
          </div>
        </div>
      </div>

      {/* Chat panel — only when live */}
      {isLive &&
      <div style={{ borderLeft: '1px solid #1f1f28', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
          padding: '14px 16px', borderBottom: '1px solid #1f1f28',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 8, color: dotColor }}>●</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Twitch chat</span>
              {(liveState === 'connected' || liveState === 'no_votes') &&
            <span className="mono" style={{ fontSize: 11, color: '#6b6b7d' }}>1,240</span>
            }
            </div>
            <button style={{ background: 'transparent', border: 'none', color: '#6b6b7d', cursor: 'pointer', fontSize: 16 }}>⚙</button>
          </div>

          {/* Vote tally */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #1f1f28' }}>
            <div className="mono" style={{
            fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#6b6b7d', marginBottom: 8, fontWeight: 600,
            display: 'flex', justifyContent: 'space-between'
          }}>
              <span>Live chat vote</span>
              {totalVotes > 0 && <span style={{ color: '#e8e6f0' }}>{totalVotes}</span>}
            </div>
            {totalVotes === 0 ?
          <div style={{
            height: 32, borderRadius: 6, background: '#0a0a0e',
            border: '1px dashed #1f1f28', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#6b6b7d', fontFamily: 'JetBrains Mono, monospace'
          }}>
                {liveState === 'connecting' ? 'Waiting for connection…' :
            liveState === 'disconnected' ? 'Vote count paused' :
            'Waiting for first !A or !B'}
              </div> :

          <div style={{ display: 'flex', height: 32, borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
              width: pctA + '%', background: '#38e07b', color: '#0a0a0e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700
            }}>A · {pctA}%</div>
                <div style={{
              width: pctB + '%', background: '#7c3aed', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700
            }}>B · {pctB}%</div>
              </div>
          }
            <div className="mono" style={{ fontSize: 10, color: '#6b6b7d', marginTop: 6 }}>
              {liveState === 'connected' || liveState === 'no_votes' ?
            'Viewers vote with !A or !B in chat. Resets on next match.' :
            liveState === 'connecting' ? '—' :
            liveState === 'disconnected' ? 'Last tally · attempting to reconnect' : '—'}
            </div>
          </div>

          {/* Disconnect banner */}
          {liveState === 'disconnected' &&
        <div style={{
          padding: '10px 16px', background: 'rgba(255,95,95,0.1)',
          borderBottom: '1px solid rgba(255,95,95,0.25)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8
        }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ff5f5f', marginBottom: 2 }}>Connection dropped</div>
                <div style={{ fontSize: 11, color: '#c4c2d2', lineHeight: 1.4 }}>Match state is safe. Votes will resume once we reconnect.</div>
              </div>
              <button style={{
            padding: '5px 10px', fontSize: 11, fontWeight: 700, background: '#ff5f5f',
            color: '#0a0a0e', border: 'none', borderRadius: 5, cursor: 'pointer',
            fontFamily: 'inherit', whiteSpace: 'nowrap'
          }}>Reconnect</button>
            </div>
        }

          {/* Messages */}
          <div style={{
          flex: 1, overflow: 'auto',
          padding: liveState === 'connecting' ? 0 : '8px 16px',
          opacity: liveState === 'disconnected' ? 0.4 : 1,
          position: 'relative'
        }}>
            {liveState === 'connecting' ?
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, textAlign: 'center', padding: 24
          }}>
                <div style={{
              width: 28, height: 28, borderRadius: 999,
              border: '2px solid #1f1f28', borderTopColor: '#b794f4',
              animation: 'sm-spin 0.9s linear infinite'
            }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e8e6f0' }}>Connecting to Twitch chat</div>
                <div style={{ fontSize: 11, color: '#6b6b7d', lineHeight: 1.5 }}>Joining channel · listening for !A / !B</div>
                <style>{`@keyframes sm-spin { to { transform: rotate(360deg) } }`}</style>
              </div> :

          <React.Fragment>
                {visibleChat.map((m, i) =>
            <div key={i} style={{ padding: '4px 0', fontSize: 13, lineHeight: 1.45 }}>
                    <span style={{ color: m.color, fontWeight: 700 }}>{m.user}</span>
                    {m.vote && <span style={{
                display: 'inline-block', margin: '0 6px', padding: '1px 5px',
                fontSize: 9, fontWeight: 700, borderRadius: 3,
                background: m.vote === 'A' ? '#38e07b' : '#7c3aed',
                color: m.vote === 'A' ? '#0a0a0e' : '#fff'
              }}>VOTE {m.vote}</span>}
                    <span style={{ color: '#9b9aab' }}>: {m.msg}</span>
                  </div>
            )}
                {liveState === 'no_votes' &&
            <div style={{
              marginTop: 10, padding: '10px 12px',
              background: 'rgba(124,58,237,0.08)', borderRadius: 6,
              fontSize: 11, color: '#b794f4',
              fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.5
            }}>↻ New match · counter reset to 0. Chat connection still open.</div>
            }
              </React.Fragment>
          }
          </div>

          {/* Read-only footer */}
          <div style={{
          padding: '10px 16px', borderTop: '1px solid #1f1f28', background: '#0a0a0e',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: '#6b6b7d', letterSpacing: '0.08em',
          display: 'flex', justifyContent: 'space-between'
        }}>
            <span>READ-ONLY · chat in twitch.tv/sookykim</span>
            <span>↗</span>
          </div>
        </div>
      }
    </div>);


  function toolbarBtn() {
    return {
      padding: '6px 12px', fontSize: 12, background: 'transparent',
      color: '#9b9aab', border: '1px solid #1f1f28', borderRadius: 6,
      cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500
    };
  }
}

function StreamerResult({ bracketId = 'kpop-girl-2026' }) {
  const { C, FEATURED_BRACKETS, CATEGORIES, placeholderBg } = window.KPOP_DATA;
  const champ = C.jw;
  const bracket = FEATURED_BRACKETS.find((b) => b.id === bracketId) || FEATURED_BRACKETS[0];
  const cat = CATEGORIES.find((c) => c.id === bracket.category) || CATEGORIES[0];
  const nav = window.__navigate || (() => {});
  const more = FEATURED_BRACKETS.
  filter((b) => b.category === cat.id && b.id !== bracket.id).
  sort((a, b) => b.trending - a.trending).
  slice(0, 4);

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Champion hero card */}
      <div className="card ring" style={{
        padding: 0, marginBottom: 24, overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '380px 1fr'
      }}>
        <div style={{
          background: placeholderBg(champ.hue, 55), aspectRatio: '4/5',
          position: 'relative', height: "475px"
        }}>
          <div style={{
            position: 'absolute', top: 16, left: 16,
            background: 'linear-gradient(135deg, #b794f4, #38e07b)',
            color: '#0a0a0e', padding: '6px 12px', borderRadius: 999,
            fontSize: 11, fontWeight: 800, letterSpacing: '0.05em'
          }}>★ CHAMPION</div>
        </div>
        <div style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: "475px" }}>
          <div className="mono purple" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>
            {bracket.title}
          </div>
          <h1 className="display" style={{ fontSize: 88, margin: '0 0 4px', lineHeight: 0.95 }}>
            {champ.name}
          </h1>
          <div style={{ fontSize: 16, color: '#9b9aab', marginBottom: 24 }}>
            {champ.group} · 6 rounds · undefeated
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="purple-bg" style={shareBtn(true)}>↓ Download bracket</button>
            <button style={shareBtn()}>🔗 Copy link</button>
            <button style={shareBtn()}>𝕏 Share</button>
            <button style={shareBtn()}>Reddit</button>
            <button style={shareBtn()}>Discord</button>
          </div>
        </div>
      </div>

      {/* More in [category] rail */}
      {more.length > 0 &&
      <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <h2 className="display" style={{ fontSize: 22, margin: 0 }}>More in {cat.label}</h2>
            <button onClick={() => nav({ categoryId: cat.id })} style={{
            background: 'transparent', border: 'none', color: '#b794f4',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
          }}>See all in {cat.label} →</button>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {more.map((b, i) =>
          <div key={b.id} style={{ flex: 1, minWidth: 0 }}>
                <window.StreamerBracketCard bracket={b} idx={i + 11} />
              </div>
          )}
          </div>
        </div>
      }

      {/* Two-column: bracket + community */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <div className="card ring" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6b7d', fontWeight: 600 }}>
              Final Eight · path to the championship
            </div>
            <button style={{
              background: 'transparent', border: 'none', color: '#b794f4',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
            }}>View all 64 →</button>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, alignItems: 'stretch', width: '100%' }}>
              <BracketCol round="Quarterfinal" pairs={[['mk', 'jw'], ['hj', 'sr'], ['tu', 'ny'], ['do', 'ay']]} depth={0} />
              <BracketCol round="Semifinal" pairs={[['jw', 'sr'], ['tu', 'ay']]} depth={1} />
              <BracketCol round="Final" pairs={[['ay', 'jw']]} big winner depth={2} />
            </div>
          </div>
        </div>

        <div className="card ring" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6b7d', fontWeight: 600 }}>
              Global rank · top 10
            </div>
            <button style={{
              background: 'transparent', border: 'none', color: '#b794f4',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
            }}>View all 64 →</button>
          </div>
          <div style={{ fontSize: 12, color: '#6b6b7d', marginBottom: 14 }}>
            Win rate across 482K plays · refreshes hourly
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
            { id: 'jw', win: 84.04, champ: 27.77 },
            { id: 'sr', win: 79.62, champ: 17.67 },
            { id: 'ay', win: 76.65, champ: 12.49 },
            { id: 'hj', win: 74.83, champ: 9.82 },
            { id: 'mk', win: 74.24, champ: 9.07 },
            { id: 'do', win: 71.90, champ: 7.10 },
            { id: 'ny', win: 70.67, champ: 6.86 },
            { id: 'tu', win: 70.02, champ: 6.60 },
            { id: 'so', win: 69.34, champ: 6.44 },
            { id: 'ji', win: 68.88, champ: 5.60 }].
            map((row, i) => {
              const c = C[row.id];
              const isYours = row.id === 'jw';
              return (
                <div key={row.id} style={{
                  display: 'grid', gridTemplateColumns: '24px 28px 1fr auto', gap: 10, alignItems: 'center',
                  padding: '8px 10px', borderRadius: 6,
                  background: isYours ? 'rgba(56,224,123,0.08)' : 'transparent',
                  border: '1px solid ' + (isYours ? 'rgba(56,224,123,0.3)' : 'transparent')
                }}>
                  <div className="mono" style={{
                    fontSize: 12, fontWeight: 700,
                    color: i < 3 ? '#b794f4' : '#6b6b7d',
                    textAlign: 'center'
                  }}>{i + 1}</div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 4,
                    background: placeholderBg(c.hue, 55)
                  }}></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {c.name}
                      {isYours && <span className="mono green" style={{ fontSize: 9, fontWeight: 700 }}>★ YOUR PICK</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <div style={{ flex: 1, height: 4, background: '#1f1f28', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                          width: row.champ / 28 * 100 + '%', height: '100%',
                          background: isYours ? '#38e07b' : '#7c3aed'
                        }}></div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={"mono " + (isYours ? 'green' : '')} style={{ fontSize: 13, fontWeight: 700 }}>
                      {row.champ.toFixed(2)}%
                    </div>
                    <div className="mono" style={{ fontSize: 9, color: '#6b6b7d' }}>
                      {row.win.toFixed(1)}% win
                    </div>
                  </div>
                </div>);

            })}
          </div>

          <button style={{
            marginTop: 14, width: '100%', padding: '11px 0', fontSize: 13, fontWeight: 600,
            background: 'transparent', color: '#b794f4', border: '1px solid #1f1f28',
            borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit'
          }}>↻ Play again with new bracket →</button>
        </div>
      </div>

      {/* Community comments */}
      <div className="card ring" style={{ padding: 24, marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <h2 className="display" style={{ fontSize: 22, margin: 0 }}>Community</h2>
          <div className="mono" style={{ fontSize: 11, color: '#6b6b7d' }}>3,418 comments · sorted by Top</div>
        </div>
        <div style={{ fontSize: 13, color: '#9b9aab', marginBottom: 18 }}>
          See how others ran their bracket. Tap any champion pill to load their picks side-by-side with yours.
        </div>

        {/* Compose box */}
        <div style={{
          display: 'flex', gap: 12, padding: 12, background: '#0e0e12',
          borderRadius: 8, border: '1px solid #1f1f28', marginBottom: 16
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #b794f4, #38e07b)'
          }}></div>
          <div style={{ flex: 1 }}>
            <input type="text" placeholder="Share your take on this bracket…" style={{
              width: '100%', padding: '10px 12px', background: '#18181f',
              color: '#e8e6f0', border: '1px solid #1f1f28', borderRadius: 6,
              fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <div className="mono" style={{ fontSize: 10, color: '#6b6b7d' }}>
                Your champion: <span className="green" style={{ fontWeight: 700 }}>★ Jiwoo</span> will attach to your comment
              </div>
              <button className="purple-bg" style={{
                padding: '7px 14px', fontSize: 12, fontWeight: 700,
                border: 'none', borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit'
              }}>Post</button>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {[['All', 3418, true], ['Picked Jiwoo', 2491], ['Picked Seora', 412], ['Picked Ayeon', 287], ['Hot takes', 124]].map(([label, count, active], i) =>
          <button key={i} style={{
            padding: '5px 11px', fontSize: 11, fontWeight: 600,
            background: active ? 'rgba(124,58,237,0.2)' : '#0e0e12',
            color: active ? '#b794f4' : '#9b9aab',
            border: '1px solid ' + (active ? '#7c3aed' : '#1f1f28'),
            borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
              {label}
              <span className="mono" style={{ fontSize: 10, opacity: 0.7 }}>{count.toLocaleString()}</span>
            </button>
          )}
        </div>

        {/* Comment list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
          { user: 'velvetstan', color: '#b794f4', pick: 'sr', time: '2m', up: 412, replies: 38, msg: "ROBBED. Seora carries that final easily, the semis pairing was the real championship match. respect to anyone who got her through though 💜", hot: true },
          { user: 'k_drmr', color: '#38e07b', pick: 'jw', time: '8m', up: 1240, replies: 87, msg: "Jiwoo run was clean. The Round of 8 vs Minju was the only sweat — 53/47 on the public split. Everything else was a wire-to-wire vibes win." },
          { user: 'haoslive', color: '#ffb84d', pick: 'ay', time: '14m', up: 96, replies: 22, msg: "Ayeon over Doyun in the Elite 8 was the upset of the tournament. Insane run, no notes. My final was Ayeon vs Jiwoo and honestly could've gone either way." },
          { user: 'softdrop', color: '#ff5f5f', pick: 'jw', time: '23m', up: 318, replies: 11, msg: "predictable bracket but a fun one. would love to see a sub-unit / vocalists-only edition next week 👀" },
          { user: 'minty', color: '#5cdcff', pick: 'jw', time: '41m', up: 204, replies: 9, msg: "y'all sleeping on Hyojin's R32 win. she had no business taking that match and she TOOK it." }].
          map((c, i) => {
            const pickC = C[c.pick];
            const isWinner = c.pick === 'jw';
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 12,
                padding: 14, background: '#0e0e12', borderRadius: 8,
                border: '1px solid ' + (c.hot ? '#7c3aed' : '#1f1f28')
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: placeholderBg(i * 73 % 360, 55)
                }}></div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ color: c.color, fontWeight: 700, fontSize: 13 }}>{c.user}</span>
                    <span className="mono" style={{ fontSize: 10, color: '#6b6b7d' }}>{c.time}</span>
                    {c.hot &&
                    <span className="mono" style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 3,
                      background: 'rgba(124,58,237,0.25)', color: '#b794f4', letterSpacing: '0.05em'
                    }}>🔥 HOT TAKE</span>
                    }
                    {/* Their champion pick — click to open their bracket */}
                    <button title="View their bracket" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '3px 8px 3px 4px', borderRadius: 999,
                      background: isWinner ? 'rgba(56,224,123,0.12)' : 'rgba(183,148,244,0.12)',
                      border: '1px solid ' + (isWinner ? 'rgba(56,224,123,0.4)' : 'rgba(183,148,244,0.4)'),
                      cursor: 'pointer', fontFamily: 'inherit'
                    }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: '50%',
                        background: placeholderBg(pickC.hue, 55)
                      }}></span>
                      <span className="mono" style={{ fontSize: 10, color: '#6b6b7d', fontWeight: 600 }}>★</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: isWinner ? '#38e07b' : '#b794f4'
                      }}>{pickC.name}</span>
                      <span style={{
                        fontSize: 11, marginLeft: 2, fontWeight: 700,
                        color: isWinner ? '#38e07b' : '#b794f4'
                      }}>→</span>
                    </button>
                  </div>
                  <div style={{ fontSize: 13, color: '#e8e6f0', lineHeight: 1.5, marginBottom: 10 }}>
                    {c.msg}
                  </div>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <button style={commentAction()}>▲ {c.up.toLocaleString()}</button>
                    <button style={commentAction()}>▼</button>
                    <button style={commentAction()}>💬 {c.replies} replies</button>
                    <button style={commentAction()}>↗ Share</button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div className="mono" style={{ fontSize: 10, color: '#6b6b7d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Bracket match
                  </div>
                  <div className={"display " + (isWinner ? 'green' : 'purple')} style={{ fontSize: 22, lineHeight: 1 }}>
                    {isWinner ? '94%' : c.pick === 'sr' ? '71%' : '58%'}
                  </div>
                </div>
              </div>);

          })}
        </div>

        <button style={{
          marginTop: 14, width: '100%', padding: '11px 0', fontSize: 13, fontWeight: 600,
          background: 'transparent', color: '#9b9aab', border: '1px solid #1f1f28',
          borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit'
        }}>Load 3,413 more comments</button>
      </div>
    </div>);


  function commentAction() {
    return {
      background: 'transparent', border: 'none', color: '#9b9aab',
      fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
      padding: 0
    };
  }

  function Stat({ label, value, green }) {
    return (
      <div>
        <div className={"display " + (green ? 'green' : '')} style={{ fontSize: 22 }}>{value}</div>
        <div style={{ fontSize: 11, color: '#6b6b7d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
      </div>);

  }

  function shareBtn(primary) {
    return {
      padding: '10px 14px', fontSize: 13, fontWeight: 600,
      background: primary ? '#7c3aed' : '#1f1f28',
      color: primary ? '#fff' : '#e8e6f0',
      border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit'
    };
  }

  function BracketCol({ round, pairs, big, winner, depth = 0 }) {
    // Define the actual winners by round
    const winnersByRound = {
      'Quarterfinal': ['jw', 'sr', 'tu', 'ay'],
      'Semifinal': ['jw', 'ay'],
      'Final': ['jw']
    };
    const winSet = new Set(winnersByRound[round] || []);

    // Tournament bracket vertical centering math.
    // Round 0 (R8): 4 pairs stacked, each pair = 2 rows.
    // Each subsequent round has half the pairs, doubled gap, shifted down by half a pair.
    // ROW height ~ 36px (item) + 4px (intra-pair gap) ≈ 40px
    // PAIR height ≈ 84px (two items + gap)
    const ROW = 36; // single contestant row height
    const INTRA = 4; // gap inside a pair
    const PAIR = ROW * 2 + INTRA; // 76
    const BASE_GAP = 12; // gap between pairs in round 0

    // pair-stride in round 0 = PAIR + BASE_GAP
    const stride0 = PAIR + BASE_GAP;
    // In round depth d, each pair sits at vertical center of stride0 * 2^d
    const strideN = stride0 * Math.pow(2, depth);
    const gapN = strideN - PAIR; // gap between pairs in this round
    // Top offset so first pair's center == first source-pair-group's center
    // round 0: offset 0 — pair center at PAIR/2
    // round d: span of 2^d source pairs starts at offset (strideN - stride0) / 2
    const topOffset = (strideN - stride0) / 2;

    return (
      <div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6b7d', marginBottom: 10, fontWeight: 600, height: 14 }}>
          {round}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: gapN, paddingTop: topOffset }}>
          {pairs.map((pair, i) =>
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: INTRA }}>
              {pair.map((id, j) => {
              const c = C[id];
              const won = winSet.has(id);
              const isFinalWinner = winner && id === 'jw';
              return (
                <div key={id} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0 10px', height: ROW, boxSizing: 'border-box',
                  background: isFinalWinner ? 'linear-gradient(90deg, rgba(124,58,237,0.3), rgba(56,224,123,0.2))' : '#0e0e12',
                  borderRadius: 6, border: '1px solid ' + (isFinalWinner ? '#7c3aed' : '#1f1f28'),
                  opacity: won ? 1 : 0.45
                }}>
                    <div style={{
                    width: 22, height: 22, borderRadius: 4,
                    background: placeholderBg(c.hue, 55), flexShrink: 0
                  }}></div>
                    <div style={{ fontSize: big ? 12 : 11, fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                    {won && <span className="green" style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700 }}>WIN</span>}
                  </div>);

            })}
            </div>
          )}
        </div>
      </div>);

  }
}

window.StreamerTheme = StreamerTheme;
window.StreamerBracketCard = StreamerBracketCard;
window.StreamerHome = StreamerHome;
window.StreamerCategory = StreamerCategory;