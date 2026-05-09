// Shared K-pop tournament data and helper utilities
// Each contestant has: id, name, group, color (representative), and a stripe pattern for placeholder

const KPOP_CONTESTANTS = [
  { id: 'jw',  name: 'Jiwoo',    group: 'NEONWAVE',     hue: 340, accent: '#ff5fa0' },
  { id: 'mk',  name: 'Minkyu',   group: 'PROJECT-7',    hue: 220, accent: '#5b8dff' },
  { id: 'sr',  name: 'Seora',    group: 'VELVET',       hue: 280, accent: '#a85cff' },
  { id: 'hj',  name: 'Haejin',   group: 'AURORA',       hue:  30, accent: '#ff9a3c' },
  { id: 'tu',  name: 'Taeun',    group: 'BLACKLINE',    hue:   0, accent: '#e63946' },
  { id: 'ny',  name: 'Nayoon',   group: 'CITRUS',       hue:  60, accent: '#f5c518' },
  { id: 'do',  name: 'Doyun',    group: 'NEONWAVE',     hue: 190, accent: '#22c5d6' },
  { id: 'ay',  name: 'Ayeon',    group: 'STARFALL',     hue: 320, accent: '#ff4f9c' },
  { id: 'ji',  name: 'Jihan',    group: 'PROJECT-7',    hue: 260, accent: '#7a5cff' },
  { id: 'so',  name: 'Sohyun',   group: 'VELVET',       hue: 350, accent: '#ff4d6d' },
  { id: 'rk',  name: 'Rikku',    group: 'AURORA',       hue: 160, accent: '#2ec4a3' },
  { id: 'eu',  name: 'Eunsae',   group: 'CITRUS',       hue:  45, accent: '#ffb01f' },
  { id: 'mn',  name: 'Minseo',   group: 'STARFALL',     hue: 210, accent: '#3d6cff' },
  { id: 'rv',  name: 'Riven',    group: 'BLACKLINE',    hue: 240, accent: '#5a48d6' },
  { id: 'ha',  name: 'Hana',     group: 'NEONWAVE',     hue:  10, accent: '#ff6a3c' },
  { id: 'yu',  name: 'Yuna',     group: 'PROJECT-7',    hue: 130, accent: '#3ec46a' },
];

// Featured / curated brackets shown on home screen
const FEATURED_BRACKETS = [
  { id: 'kpop-girl-2026', title: 'K-Pop Girl Group Members 2026',  rounds: 'Round of 64',  plays: '482K', tag: 'K-POP' },
  { id: 'kpop-boy-2026',  title: 'K-Pop Boy Group Members 2026',   rounds: 'Round of 64',  plays: '391K', tag: 'K-POP' },
  { id: 'rookies-2026',   title: '4th Gen Rookies — Best Debut',    rounds: 'Round of 32',  plays: '128K', tag: 'K-POP' },
  { id: 'visuals',        title: 'Ultimate Visual Showdown',        rounds: 'Round of 32',  plays: '267K', tag: 'VISUAL' },
  { id: 'bsides',         title: 'Best B-Sides of the Year',        rounds: 'Round of 16',  plays:  '94K', tag: 'TRACKS' },
  { id: 'choreo',         title: 'Choreography Hall of Fame',       rounds: 'Round of 32',  plays:  '76K', tag: 'DANCE' },
  { id: 'mvs',            title: 'Music Videos of the Decade',      rounds: 'Round of 64',  plays: '210K', tag: 'MV' },
  { id: 'ships',          title: 'Iconic Group Visuals',            rounds: 'Round of 16',  plays:  '58K', tag: 'GROUPS' },
];

const TRENDING_NOW = [
  { id: 't1', title: 'Stage Outfits 2026',         live: 1240 },
  { id: 't2', title: 'Best Rap Verses',            live:  892 },
  { id: 't3', title: 'Vocal Lines Bracket',        live:  651 },
  { id: 't4', title: 'Debut MV Tournament',        live:  430 },
  { id: 't5', title: 'Variety Show Moments',       live:  318 },
];

// Streamer mock data
const ACTIVE_STREAMERS = [
  { name: 'pinkbeam',    viewers: '12.4K', bracket: 'K-Pop Girl Group 2026' },
  { name: 'haoslive',    viewers:  '8.1K', bracket: 'Best B-Sides' },
  { name: 'softdrop',    viewers:  '4.7K', bracket: 'Visual Showdown' },
  { name: 'maximumboy',  viewers:  '3.2K', bracket: '4th Gen Rookies' },
];

// Bracket tree for result screen — winners flow upward
// 8 contestants → 4 quarter winners → 2 semi winners → 1 champion
const SAMPLE_RESULT = {
  champion: 'jw',
  rounds: [
    // Round of 8
    [
      { a: 'jw', b: 'mk', win: 'jw' },
      { a: 'sr', b: 'hj', win: 'sr' },
      { a: 'tu', b: 'ny', win: 'tu' },
      { a: 'do', b: 'ay', win: 'ay' },
    ],
    // Semifinals
    [
      { a: 'jw', b: 'sr', win: 'jw' },
      { a: 'tu', b: 'ay', win: 'jw' /* placeholder won't render */ },
    ],
    // Final
    [
      { a: 'jw', b: 'ay', win: 'jw' },
    ],
  ],
};

const C = Object.fromEntries(KPOP_CONTESTANTS.map(c => [c.id, c]));

// Bracket placeholder: returns a CSS background string. We use diagonal stripes
// in the contestant's hue so each card looks distinct without requiring photos.
function placeholderBg(hue, lightness = 65) {
  const a = `oklch(${lightness}% 0.14 ${hue})`;
  const b = `oklch(${lightness - 12}% 0.14 ${hue})`;
  return `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`;
}

// Initials avatar fallback
function initials(name) {
  return name.slice(0, 2).toUpperCase();
}

window.KPOP_DATA = {
  CONTESTANTS: KPOP_CONTESTANTS,
  C,
  FEATURED_BRACKETS,
  TRENDING_NOW,
  ACTIVE_STREAMERS,
  SAMPLE_RESULT,
  placeholderBg,
  initials,
};
