// Create Bracket — Composer
//
// One paste box. Auto-detects per line: URL → parses YT/image, plain text → text-only entry.
// Below: batch-upload strip. Single page (no steps). Queue lives directly under composer.
// Right rail: switches between bracket info (default), preview, and edit-source.

const T = window.CB_TOKENS;
const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const COMPOSER_ENTRIES_INCOMPLETE = [
{ id: 'a', title: 'AESPA — Whiplash', src: { kind: 'yt', meta: '00:42 · 3:15', hue: 280 } },
{ id: 'b', title: 'NEWJEANS — Supernatural', src: { kind: 'yt', meta: '01:08 · 3:42', hue: 200 } },
{ id: 'c', title: 'IVE — HEYA', src: { kind: 'yt', meta: '00:00 · 3:01', hue: 340 } },
{ id: 'd', title: 'LE SSERAFIM — Easy', src: { kind: 'img', meta: 'imgur · 1080×1080', hue: 30 } },
{ id: 'e', title: 'ITZY — UNTOUCHABLE', src: { kind: 'upload', meta: 'itzy-untouch.png · 2.1MB', hue: 160 } },
{ id: 'f', title: 'BABYMONSTER — SHEESH', src: null },
{ id: 'g', title: 'RIIZE — Get A Guitar', src: { kind: 'yt', meta: '00:18 · 2:52', hue: 220 } },
{ id: 'h', title: '', src: { kind: 'img', meta: 'broken-mirror.example.com', hue: 0 } },
{ id: 'i', title: 'TWICE — STRATEGY', src: { kind: 'yt', meta: '00:24 · 3:00', hue: 310 } },
{ id: 'j', title: 'TXT — Over the Moon', src: { kind: 'yt', meta: '00:42 · 3:18', hue: 250 } }];


const COMPOSER_ENTRIES_COMPLETE = COMPOSER_ENTRIES_INCOMPLETE.map((e) => ({
  ...e,
  title: e.title || 'KISS OF LIFE — Sticky',
  src: e.src || { kind: 'yt', meta: '00:30 · 3:08', hue: 10 }
}));

// ─── Header ───
function ComposerHeader({ title, subtitle, incomplete, demoState, onDemoToggle }) {
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', background: T.bgNav, borderBottom: '1px solid ' + T.border, flexShrink: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{
          background: 'transparent', border: '1px solid ' + T.border, color: T.fgMuted,
          borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit'
        }}>← Exit</button>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.fg }}>{title}</div>
          <div style={{ fontFamily: MONO, fontSize: 10, color: T.fgQuiet, letterSpacing: '0.06em', marginTop: 2 }}>
            {subtitle}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {incomplete > 0 &&
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
          borderRadius: 999, fontSize: 11, fontWeight: 700,
          background: 'rgba(255,184,77,0.14)', color: '#ffb84d', fontFamily: MONO
        }}>● {incomplete} incomplete</span>
        }
        <span style={{ fontFamily: MONO, fontSize: 11, color: T.fgQuiet }}>auto-saved</span>
        <DemoStateToggle value={demoState} onChange={onDemoToggle} />
      </div>
    </div>);

}

function DemoStateToggle({ value, onChange }) {
  const opts = [['incomplete', 'Incomplete'], ['complete', 'Complete']];
  return (
    <div title="Demo override" style={{
      display: 'flex', alignItems: 'center', gap: 6, padding: '3px 4px 3px 10px',
      background: '#0a0a0e', border: '1px dashed ' + T.border, borderRadius: 999
    }}>
      <span style={{
        fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: T.fgQuiet, fontWeight: 700
      }}>Demo</span>
      <div style={{ display: 'flex', padding: 2, background: '#0e0e12', borderRadius: 999 }}>
        {opts.map(([k, l]) =>
        <button key={k} onClick={() => onChange(k)} style={{
          background: value === k ? T.purple : 'transparent',
          color: value === k ? '#fff' : T.fgMuted,
          border: 'none', padding: '4px 12px', borderRadius: 999,
          fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
        }}>{l}</button>
        )}
      </div>
    </div>);

}

// ─── Source thumb ───
function ComposerThumb({ src, size = 56 }) {
  if (!src) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 6, flexShrink: 0,
        background: '#0a0a0e', border: '1px dashed #2a2a3a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#3a3a52', fontSize: 20
      }}>+</div>);

  }
  return (
    <div style={{
      width: size, height: size, borderRadius: 6, flexShrink: 0,
      position: 'relative', overflow: 'hidden', background: window.cbPlaceholder(src.hue, 55)
    }}>
      {src.kind === 'yt' &&
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
          width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9
        }}>▶</div>
        </div>
      }
      <div style={{
        position: 'absolute', bottom: 3, right: 3, background: 'rgba(0,0,0,0.7)', color: '#fff',
        fontFamily: MONO, fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 3, letterSpacing: '0.04em'
      }}>{src.kind === 'yt' ? 'YT' : src.kind === 'upload' ? 'UP' : 'IMG'}</div>
    </div>);

}

// ─── Title cell · variant B (hover pencil) + grey "Add title" placeholder ───
function TitleCell({ entry, isEditing, onStartEdit, onCommit }) {
  const [draft, setDraft] = React.useState(entry.title || '');
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (isEditing) {
      setDraft(entry.title || '');
      requestAnimationFrame(() => {inputRef.current && inputRef.current.select();});
    }
  }, [isEditing, entry.title]);

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onCommit(draft)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {e.preventDefault();onCommit(draft);}
          if (e.key === 'Escape') {e.preventDefault();onCommit(entry.title || '');}
        }}
        placeholder="Add title"
        style={{
          background: '#0a0a0e', color: T.fg, fontSize: 13, fontWeight: 600,
          border: '1px solid ' + T.purple, borderRadius: 4,
          padding: '3px 7px', width: '100%', outline: 'none',
          fontFamily: 'inherit', boxShadow: '0 0 0 3px rgba(124,58,237,0.18)'
        }} />);


  }

  const empty = !entry.title;
  return (
    <div className="cb-title-row" style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
      <div
        onClick={onStartEdit}
        title="Click to edit title"
        style={{
          fontSize: 13, fontWeight: 600, lineHeight: 1.3,
          color: empty ? T.fgQuiet : T.fg, fontStyle: empty ? 'italic' : 'normal',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          cursor: 'text', flex: 1, minWidth: 0
        }}>
        {empty ? 'Add title' : entry.title}</div>
      <button
        className="cb-pencil"
        onClick={onStartEdit}
        title="Edit title"
        style={{
          background: T.bgHover, border: 'none', color: T.fgMuted,
          width: 20, height: 20, borderRadius: 4, fontSize: 10,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, flexShrink: 0, opacity: 0, transition: 'opacity .12s'
        }}>
        ✎</button>
    </div>);

}

// ─── Compact ⋯ menu (variant A) ───
function KebabMenu({ onClose, onPreview, onReplace, onEditTitle }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const off = (e) => {if (ref.current && !ref.current.contains(e.target)) onClose();};
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [onClose]);
  const Item = ({ icon, label, danger, onClick }) =>
  <button
    onClick={(e) => {e.stopPropagation();onClose();onClick && onClick();}}
    style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
      padding: '7px 10px', background: 'transparent', border: 'none',
      color: danger ? '#ff7a7a' : T.fg, fontSize: 12, fontWeight: 500,
      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderRadius: 4
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = T.bgHover}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
    
      <span style={{ width: 16, color: danger ? '#ff7a7a' : T.fgMuted, textAlign: 'center', fontSize: 12 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
    </button>;

  return (
    <div ref={ref} style={{
      position: 'absolute', top: 32, right: 4, width: 200, zIndex: 30,
      background: '#101015', border: '1px solid ' + T.border, borderRadius: 8,
      padding: 4, boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
    }}>
      <Item icon="👁" label="Preview in matchup" onClick={onPreview} />
      <Item icon="✎" label="Edit title" onClick={onEditTitle} />
      <Item icon="↺" label="Replace source" onClick={onReplace} />
      <Item icon="⎘" label="Duplicate" />
      <Item icon="↑" label="Move to top" />
      <div style={{ height: 1, background: T.border, margin: '4px 0' }} />
      <Item icon="🗑" label="Delete entry" danger />
    </div>);

}

function ComposerRow({ entry, idx, seedMode, panelEntryId, editingId, openPanel, openMenuId, setOpenMenuId, onStartEdit, onCommitEdit }) {
  const missingSource = !entry.src;
  const incomplete = !entry.title || missingSource;
  const isActive = panelEntryId === entry.id;
  const menuOpen = openMenuId === entry.id;

  return (
    <div
      onClick={() => openPanel('preview', entry.id)}
      style={{
        display: 'flex', gap: 12, padding: 10, alignItems: 'center', position: 'relative',
        background: isActive ? '#1a1530' : T.bgCard, borderRadius: 8,
        border: '1px solid ' + (isActive ? T.purple : incomplete ? 'rgba(255,184,77,0.32)' : T.border),
        boxShadow: isActive ? '0 0 0 3px rgba(124,58,237,0.18)' : 'none',
        minWidth: 0, cursor: 'pointer'
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 28, height: 28, borderRadius: 5, flexShrink: 0,
          background: seedMode === 'preset' ? 'rgba(124,58,237,0.18)' : '#0a0a0e',
          color: seedMode === 'preset' ? T.purpleLight : T.fgQuiet,
          fontFamily: MONO, fontSize: 11, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: seedMode === 'preset' ? 'grab' : 'default'
        }}>{seedMode === 'preset' ? `#${idx}` : '⋮⋮'}</div>

      <div
        title="Click to replace source"
        className="v2-thumb-slot"
        onClick={(e) => { e.stopPropagation(); openPanel('edit-source', entry.id); }}
        style={{ position: 'relative', cursor: 'pointer' }}>
        
        <ComposerThumb src={entry.src} />
        <div className="v2-swap-badge" style={{
          position: 'absolute', bottom: 3, left: 3, background: 'rgba(0,0,0,0.7)', color: '#fff',
          fontFamily: MONO, fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 3,
          letterSpacing: '0.04em', opacity: 0.55, transition: 'opacity .12s'
        }}>EDIT</div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div onClick={(e) => e.stopPropagation()}>
          <TitleCell
            entry={entry}
            isEditing={editingId === entry.id}
            onStartEdit={() => onStartEdit(entry.id)}
            onCommit={(v) => onCommitEdit(entry.id, v)} />
        </div>
        
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: MONO, fontSize: 10, color: T.fgQuiet, marginTop: 3,
            display: 'flex', gap: 8, alignItems: 'center'
          }}>
          {entry.src ?
          <span>{entry.src.meta}</span> :

          <span
            onClick={() => openPanel('edit-source', entry.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 700,
              background: 'rgba(255,184,77,0.14)', color: '#ffb84d',
              fontFamily: MONO, letterSpacing: '0.04em', cursor: 'pointer'
            }}>
            ● Add source</span>
          }
        </div>
      </div>

      <button
        onClick={(e) => {e.stopPropagation();setOpenMenuId(menuOpen ? null : entry.id);}}
        style={{
          background: menuOpen ? T.bgHover : 'transparent', border: 'none', color: T.fgQuiet,
          cursor: 'pointer', fontSize: 16, padding: 6, borderRadius: 4
        }}>
        ⋯</button>
      {menuOpen &&
      <KebabMenu
        onClose={() => setOpenMenuId(null)}
        onPreview={() => openPanel('preview', entry.id)}
        onReplace={() => openPanel('edit-source', entry.id)}
        onEditTitle={() => onStartEdit(entry.id)} />

      }
    </div>);

}

// ─── Helpers in the right rail ───
function SegRow({ value, onChange, options }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${options.length}, 1fr)`,
      gap: 0, padding: 3, background: '#0a0a0e',
      border: '1px solid ' + T.border, borderRadius: 7
    }}>
      {options.map(([k, l]) =>
      <button key={k} onClick={() => onChange(k)} style={{
        background: value === k ? T.bgHover : 'transparent',
        color: value === k ? T.fg : T.fgMuted,
        border: 'none', padding: '7px 0', borderRadius: 5,
        fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
      }}>{l}</button>
      )}
    </div>);

}
function SectionTag({ children }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em',
      textTransform: 'uppercase', color: T.fgQuiet, fontWeight: 700
    }}>{children}</div>);

}
function Divider() {return <div style={{ height: 1, background: T.border, margin: '4px 0' }} />;}

function BracketPanel({ total, target }) {
  const pct = Math.min(100, Math.round(total / target * 100));
  const byes = Math.max(0, target - total);
  return (
    <div style={{ background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 8, padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Round of {target}</div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px',
          borderRadius: 999, fontSize: 11, fontWeight: 700,
          background: 'rgba(74,222,128,0.14)', color: T.green, fontFamily: MONO
        }}>{total} / {target}</span>
      </div>
      <div style={{ height: 6, background: T.bgHover, borderRadius: 3, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ width: pct + '%', height: '100%', background: T.green }} />
      </div>
      <div style={{ fontSize: 11, color: T.fgQuiet, lineHeight: 1.5 }}>
        {byes > 0 ?
        `${byes} byes will be assigned to top seeds in round 1. Add ${byes} more to fill the bracket — no byes needed.` :
        'Bracket is full — every seed plays round 1.'}
      </div>
    </div>);

}

function BlockedPublish({ entries }) {
  return (
    <button disabled style={{
      width: '100%', padding: '12px 0',
      background: T.bgHover, color: T.fgQuiet, border: 'none', borderRadius: 6,
      fontSize: 13, fontWeight: 700, cursor: 'not-allowed', fontFamily: 'inherit'
    }}>Finish {entries.length} {entries.length === 1 ? 'entry' : 'entries'} to publish</button>);

}
function ReadyPublish({ total, onPublish }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.fgMuted, marginBottom: 10, lineHeight: 1.5 }}>
        {total} entries · we'll auto-shape this into a Round of 16 (4 byes go to top seeds).
      </div>
      <button onClick={onPublish} style={{
        width: '100%', padding: '12px 0', background: T.purple, color: '#fff',
        border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700,
        cursor: 'pointer', fontFamily: 'inherit'
      }}>▶ Publish bracket</button>
      <button style={{
        width: '100%', marginTop: 6, padding: '8px 0', background: 'transparent',
        color: T.fgMuted, border: '1px solid ' + T.border, borderRadius: 6,
        fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
      }}>Save as private</button>
    </div>);

}

// ─── Right-rail mode 1: Bracket info (default) ───
function BracketInfoPanel({ entries, onPublish }) {
  const [seedMode, setSeed] = React.useState('random');
  const incomplete = entries.filter((e) => !e.title || !e.src);
  const blocked = incomplete.length > 0;
  const { Field, TextInput, Pill } = window;
  return (
    <>
      <SectionTag>Bracket info</SectionTag>
      <Field label="Title"><TextInput value="K-Pop Girl Group Members 2026" /></Field>
      <Field label="Category">
        <select defaultValue="kpop" style={{
          width: '100%', padding: '7px 10px', background: '#0a0a0e',
          color: T.fg, border: '1px solid ' + T.border, borderRadius: 6,
          fontSize: 13, fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b6b7d' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center'
        }}>
          <option value="kpop">K-Pop</option>
          <option value="games">Video Games</option>
          <option value="anime">Anime</option>
          <option value="sports">Sports</option>
          <option value="movies">Movies</option>
          <option value="music">Music</option>
          <option value="food">Food</option>
          <option value="fashion">Fashion</option>
          <option value="other">Other</option>
        </select>
      </Field>
      <Field label="Tags">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Pill tone="purple">k-pop</Pill>
          <Pill>girl groups</Pill>
          <Pill>2026</Pill>
          <button style={{
            background: 'transparent', border: '1px dashed ' + T.border, color: T.fgQuiet,
            borderRadius: 999, padding: '3px 10px', fontSize: 11, fontFamily: MONO,
            cursor: 'pointer', fontWeight: 600
          }}>+ tag</button>
        </div>
      </Field>
      <Field label="Visibility">
        <SegRow value="public" onChange={() => {}} options={[['public', '🌐 Public'], ['private', '🔒 Private']]} />
      </Field>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionTag>Seeding</SectionTag>
        <SegRow value={seedMode} onChange={setSeed} options={[['random', 'Randomized'], ['preset', 'Preset']]} />
        <div style={{ fontSize: 11, color: T.fgQuiet, lineHeight: 1.5 }}>
          {seedMode === 'random' ?
          <>Bracket is randomized — fairest for community plays. <strong style={{ color: T.fg }}>Default.</strong></> :
          <>You're setting the seed order. <strong style={{ color: T.fg }}>Drag rows in the queue</strong> — top of the list = seed #1.</>}
        </div>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionTag>Bracket size · auto</SectionTag>
        <BracketPanel total={entries.length} target={16} />
      </div>
      <Divider />
      {blocked ? <BlockedPublish entries={incomplete} /> : <ReadyPublish total={entries.length} onPublish={onPublish} />}
    </>);

}

// ─── Shared back-button header for the swap-in panels ───
function PanelBackHeader({ label, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: '1px solid ' + T.border,
          color: T.fgMuted, borderRadius: 6, padding: '5px 10px',
          fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
        }}>
        ← Back</button>
      <div style={{
        fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: T.fgQuiet, fontWeight: 700
      }}>{label}</div>
    </div>);

}

// ─── Right-rail mode 2: Preview entry alone (variant B) ───
function PreviewPanel({ entry, idx, onBack, onEdit }) {
  if (!entry || !entry.src) {
    return (
      <>
        <PanelBackHeader label="Matchup preview" onBack={onBack} />
        <div style={{ fontSize: 12, color: T.fgMuted, lineHeight: 1.5 }}>
          Add a source to preview this entry as a matchup card.
        </div>
      </>);
  }

  const stripeBg = window.cbPlaceholder(entry.src.hue, 50);
  const startTime = entry.src.meta && entry.src.meta.split(' · ')[0];
  const displayName = entry.title || 'Untitled entry';

  return (
    <>
      <PanelBackHeader label={`Matchup preview · #${idx}`} onBack={onBack} />

      {/* Card — mirrors MatchupScreen contestant card */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '1/1',
        borderRadius: 12, overflow: 'hidden', background: stripeBg
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(14,14,18,0.95) 100%)' }} />
        {entry.src.kind === 'yt' &&
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <span style={{
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
            color: '#fff', fontFamily: MONO, fontSize: 11,
            fontWeight: 700, padding: '4px 9px', borderRadius: 6, letterSpacing: '0.04em'
          }}>▶ {startTime}</span>
        </div>
        }
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 20 }}>
          <div style={{
            fontSize: 28, fontWeight: 800, color: '#fff',
            letterSpacing: '-0.02em', lineHeight: 1.05, textWrap: 'pretty'
          }}>{displayName}</div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid ' + T.border, paddingTop: 10, fontSize: 11, color: T.fgMuted, lineHeight: 1.7 }}>
        <div><span style={{ color: T.fgQuiet, fontFamily: MONO }}>Source</span> · {entry.src.kind === 'yt' ? 'YouTube' : entry.src.kind === 'img' ? 'Image URL' : 'Upload'}</div>
        <div><span style={{ color: T.fgQuiet, fontFamily: MONO }}>Meta</span> · {entry.src.meta}</div>
      </div>

      <button
        onClick={onEdit}
        style={{
          marginTop: 'auto', width: '100%', padding: '9px 0',
          background: 'transparent', color: T.fgMuted,
          border: '1px solid ' + T.border, borderRadius: 6,
          fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer'
        }}>Edit this entry</button>
    </>);
}

// ─── Right-rail mode 3: Edit / replace source (variant C) ───
function SourceTabs({ active, onChange }) {
  const tabs = [['yt', '▶ YouTube'], ['img', '🖼 Image URL'], ['upload', '⬆ Upload']];
  return (
    <div style={{ display: 'flex', gap: 4, padding: 3, background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 7 }}>
      {tabs.map(([k, l]) =>
      <button key={k} onClick={() => onChange(k)} style={{
        flex: 1, background: active === k ? T.bgHover : 'transparent',
        color: active === k ? T.fg : T.fgMuted, border: 'none', padding: '7px 0',
        borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
      }}>{l}</button>
      )}
    </div>);

}

function YTEditor({ entry }) {
  const startTime = entry && entry.src && entry.src.meta && entry.src.meta.split(' · ')[0] || '00:00';
  const dur = entry && entry.src && entry.src.meta && entry.src.meta.split(' · ')[1] || '3:15';
  const hue = entry && entry.src && entry.src.hue || 280;
  const iconBtn = {
    width: 28, height: 28, background: T.bgHover, border: 'none', color: T.fg,
    borderRadius: 5, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: T.fgQuiet, fontWeight: 700, textTransform: 'uppercase' }}>YouTube URL</span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
          background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 6, height: 34
        }}>
          <span style={{ color: T.fgQuiet, fontFamily: MONO, fontSize: 11 }}>https://</span>
          <span style={{ color: T.fg, fontFamily: MONO, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>youtube.com/watch?v=zbkizy-Y3qE</span>
        </div>
      </div>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        borderRadius: 6, overflow: 'hidden', background: window.cbPlaceholder(hue, 30)
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16
        }}>▶</div>
        <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10 }}>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '22%', background: '#ff3344', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: MONO, fontSize: 9, color: '#fff' }}>
            <span>{startTime}</span><span>{dur}</span>
          </div>
        </div>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center',
        padding: 10, background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 6
      }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: T.fgQuiet, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
            Starts at
          </div>
          <div style={{ fontSize: 11, color: T.fgMuted, lineHeight: 1.4 }}>
            Set the moment your matchup card begins.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={iconBtn}>−</button>
          <div style={{
            background: '#101015', border: '1px solid ' + T.border, borderRadius: 5,
            padding: '6px 10px', fontFamily: MONO, fontSize: 14, fontWeight: 700, color: T.fg,
            minWidth: 64, textAlign: 'center', letterSpacing: '0.05em'
          }}>{startTime}</div>
          <button style={iconBtn}>+</button>
        </div>
      </div>
    </>);

}

function ImgEditor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: T.fgQuiet, fontWeight: 700, textTransform: 'uppercase' }}>Image URL</span>
      <div style={{
        display: 'flex', alignItems: 'center', padding: '0 10px',
        background: '#0a0a0e', border: '1px solid ' + T.border, borderRadius: 6, height: 34
      }}>
        <span style={{ color: T.fg, fontFamily: MONO, fontSize: 12 }}>https://i.imgur.com/le-easy.jpg</span>
      </div>
      <div style={{ fontSize: 11, color: T.fgQuiet, marginTop: 4 }}>JPG · PNG · WebP. Square crops look best.</div>
    </div>);

}

function UploadEditor() {
  return (
    <div style={{
      padding: 18, background: '#0a0a0e', border: '1px dashed ' + T.border, borderRadius: 8,
      textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8
    }}>
      <div style={{ fontSize: 22 }}>⬆</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.fg }}>Drop a file or click to browse</div>
      <div style={{ fontSize: 11, color: T.fgQuiet }}>JPG · PNG · WebP · up to 5MB</div>
    </div>);

}

function EditSourcePanel({ entry, idx, onBack }) {
  const initial = entry && entry.src && entry.src.kind || 'yt';
  const [tab, setTab] = React.useState(initial);
  React.useEffect(() => {setTab(initial);}, [entry && entry.id]);
  return (
    <>
      <PanelBackHeader label={`Edit source · #${idx}`} onBack={onBack} />
      <div style={{ fontSize: 13, fontWeight: 700, color: T.fg, marginTop: -2 }}>
        {entry && entry.title || 'Untitled entry'}
      </div>
      <SourceTabs active={tab} onChange={setTab} />
      {tab === 'yt' && <YTEditor entry={entry} />}
      {tab === 'img' && <ImgEditor />}
      {tab === 'upload' && <UploadEditor />}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 'auto', paddingTop: 12 }}>
        <button onClick={onBack} style={{
          padding: '8px 14px', background: 'transparent', color: T.fgMuted,
          border: '1px solid ' + T.border, borderRadius: 6, fontSize: 12,
          fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
        }}>Cancel</button>
        <button onClick={onBack} style={{
          padding: '8px 14px', background: T.purple, color: '#fff',
          border: 'none', borderRadius: 6, fontSize: 12,
          fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
        }}>Save changes</button>
      </div>
    </>);

}

// ─── Main composer ───
function Composer({ onPublish }) {
  const [demoState, setDemoState] = React.useState('incomplete');
  const baseEntries = demoState === 'complete' ? COMPOSER_ENTRIES_COMPLETE : COMPOSER_ENTRIES_INCOMPLETE;
  // local title overrides so inline edits show immediately
  const [titleOverrides, setTitleOverrides] = React.useState({});
  React.useEffect(() => {setTitleOverrides({});}, [demoState]);
  const entries = baseEntries.map((e) =>
  titleOverrides[e.id] !== undefined ? { ...e, title: titleOverrides[e.id] } : e
  );

  const [panel, setPanel] = React.useState({ mode: 'info', entryId: null });
  const [editingId, setEditingId] = React.useState(null);
  const [openMenuId, setOpenMenuId] = React.useState(null);

  const incomplete = entries.filter((e) => !e.title || !e.src).length;
  const { Btn } = window;

  const openPanel = (mode, entryId) => setPanel({ mode, entryId });
  const closePanel = () => setPanel({ mode: 'info', entryId: null });
  const startEdit = (id) => {setEditingId(id);setOpenMenuId(null);};
  const commitEdit = (id, value) => {
    setTitleOverrides((m) => ({ ...m, [id]: value.trim() }));
    setEditingId(null);
  };

  const panelEntry = panel.entryId ? entries.find((e) => e.id === panel.entryId) : null;
  const panelIdx = panel.entryId ? entries.findIndex((e) => e.id === panel.entryId) + 1 : 0;

  return (
    <div style={{
      width: '100%', height: '100vh', background: T.bg, color: T.fg,
      fontFamily: FONT, display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      <ComposerHeader
        title="K-Pop Girl Group Members 2026"
        subtitle={`smart paste · ${entries.length} entries`}
        incomplete={incomplete}
        demoState={demoState}
        onDemoToggle={setDemoState} />
      

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 380px', minHeight: 0 }}>
        <div className="cb-scroll" style={{ padding: '24px 28px 32px', overflow: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ marginBottom: 18 }}>
            <h1 style={{
              fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em',
              margin: '0 0 6px', lineHeight: 1.1, color: T.fg
            }}>
              Paste, drop, or just type.<br />We'll do the rest.
            </h1>
            <div style={{ fontSize: 13, color: T.fgMuted, maxWidth: 620, lineHeight: 1.5 }}>
              One per line. URLs auto-parse · plain text becomes a placeholder entry · drop images straight in. Mix anything — we sort it out.
            </div>
          </div>

          <div style={{
            background: T.bgInput, border: '2px solid ' + T.purple, borderRadius: 10,
            padding: 14, boxShadow: '0 0 0 4px rgba(124,58,237,0.18)'
          }}>
            <div style={{
              fontFamily: MONO, fontSize: 10, color: T.purpleLight, fontWeight: 700,
              letterSpacing: '0.15em', marginBottom: 8
            }}>● PASTE OR TYPE</div>
            <textarea
              defaultValue={`AESPA — Whiplash\nyoutube.com/watch?v=zbkizy-Y3qE\nIVE — HEYA\nhttps://i.imgur.com/le-easy.jpg`}
              style={{
                width: '100%', minHeight: 88, background: 'transparent', border: 'none', outline: 'none',
                color: T.fg, fontFamily: MONO, fontSize: 13, lineHeight: 1.6, resize: 'none'
              }} />
            
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderTop: '1px solid ' + T.border, paddingTop: 10, marginTop: 8
            }}>
              <div style={{ fontSize: 11, color: T.fgQuiet, fontFamily: MONO }}>
                URLs auto-parse · plain lines become titles
              </div>
              <Btn variant="primary" size="sm">↵ Add 4 entries</Btn>
            </div>
          </div>

          <div style={{
            marginTop: 10, padding: '10px 14px', background: '#0a0a0e',
            border: '1px dashed ' + T.border, borderRadius: 8,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16 }}>📁</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Or batch-upload images</div>
                <div style={{ fontSize: 11, color: T.fgQuiet, marginTop: 1 }}>JPG · PNG · WebP · up to 64 files</div>
              </div>
            </div>
            <Btn variant="ghost" size="sm">Choose files</Btn>
          </div>

          <div style={{ flexShrink: 0, height: 24 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <h2 style={{
              margin: 0, fontFamily: FONT, fontSize: 18, fontWeight: 700,
              letterSpacing: '-0.01em', color: T.fg
            }}>
              Queue <span style={{ color: T.fgQuiet, fontWeight: 600 }}>{entries.length}</span>
            </h2>
            <div style={{ display: 'flex', gap: 6 }}>
              <Btn variant="quiet" size="sm">Sort: as pasted</Btn>
              <Btn variant="quiet" size="sm">⇅ Shuffle seeds</Btn>
            </div>
          </div>
          <div style={{ paddingRight: 4 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {entries.map((e, i) =>
              <ComposerRow
                key={e.id}
                entry={e}
                idx={i + 1}
                seedMode="random"
                panelEntryId={panel.entryId}
                editingId={editingId}
                openPanel={openPanel}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                onStartEdit={startEdit}
                onCommitEdit={commitEdit} />

              )}
            </div>
          </div>
        </div>

        <div style={{
          borderLeft: '1px solid ' + T.border, background: '#101015',
          padding: 22, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto'
        }}>
          {panel.mode === 'info' && <BracketInfoPanel entries={entries} onPublish={onPublish} />}
          {panel.mode === 'preview' && <PreviewPanel entry={panelEntry} idx={panelIdx} onBack={closePanel} onEdit={() => openPanel('edit-source', panel.entryId)} />}
          {panel.mode === 'edit-source' && <EditSourcePanel entry={panelEntry} idx={panelIdx} onBack={closePanel} />}
        </div>
      </div>
    </div>);

}

window.Composer = Composer;