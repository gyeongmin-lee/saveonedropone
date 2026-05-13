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

// Featured / curated brackets — now cross-category. `category` keys map to CATEGORIES below.
const FEATURED_BRACKETS = [
  { id: 'kpop-girl-2026',  title: 'K-Pop Girl Group Members 2026', rounds: 'Round of 64', plays: '482K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'aespa',     trending: 99, createdAt: '2026-05-04' },
  { id: 'kpop-boy-2026',   title: 'K-Pop Boy Group Members 2026',  rounds: 'Round of 64', plays: '391K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'BTS',       trending: 96, createdAt: '2026-05-02' },
  { id: 'anime-shounen',   title: 'Greatest Shōnen Protagonists',  rounds: 'Round of 32', plays: '318K', tag: 'ANIME',    category: 'anime',                        trending: 94, createdAt: '2026-05-08' },
  { id: 'gaming-fighters', title: 'Fighting Game Roster 2026',     rounds: 'Round of 32', plays: '276K', tag: 'GAMING',   category: 'gaming',                       trending: 93, createdAt: '2026-04-30' },
  { id: 'visuals',         title: 'Ultimate Visual Showdown',      rounds: 'Round of 32', plays: '267K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'BLACKPINK', trending: 91, createdAt: '2026-05-01' },
  { id: 'movies-a24',      title: 'A24 Movies — Definitive Rank',  rounds: 'Round of 16', plays: '231K', tag: 'MOVIES',   category: 'movies',                       trending: 89, createdAt: '2026-05-06' },
  { id: 'mvs',             title: 'Music Videos of the Decade',    rounds: 'Round of 64', plays: '210K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'NewJeans',  trending: 87, createdAt: '2026-04-28' },
  { id: 'sports-nba-goat', title: 'NBA GOAT Bracket',              rounds: 'Round of 32', plays: '198K', tag: 'SPORTS',   category: 'sports',                       trending: 85, createdAt: '2026-04-22' },
  { id: 'rookies-2026',    title: '4th Gen Rookies — Best Debut',  rounds: 'Round of 32', plays: '128K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'IVE',       trending: 84, createdAt: '2026-05-09' },
  { id: 'tv-sitcoms',      title: 'Sitcoms of All Time',           rounds: 'Round of 16', plays: '116K', tag: 'TV',       category: 'tv',                           trending: 80, createdAt: '2026-05-03' },
  { id: 'choreo',          title: 'Choreography Hall of Fame',     rounds: 'Round of 32', plays:  '94K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'TWICE',     trending: 77, createdAt: '2026-04-19' },
  { id: 'music-rock',      title: 'Rock Albums of the 2000s',      rounds: 'Round of 32', plays:  '88K', tag: 'MUSIC',    category: 'music',                        trending: 74, createdAt: '2026-05-07' },
  { id: 'bsides',          title: 'Best B-Sides of the Year',      rounds: 'Round of 16', plays:  '76K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'LE SSERAFIM', trending: 71, createdAt: '2026-05-05' },
  { id: 'food-pizza',      title: 'Pizza Toppings — Final Form',   rounds: 'Round of 16', plays:  '64K', tag: 'FOOD',     category: 'food',                         trending: 68, createdAt: '2026-05-10' },
  { id: 'ships',           title: 'Iconic Group Visuals',          rounds: 'Round of 16', plays:  '58K', tag: 'K-POP',    category: 'kpop',   kpopTag: '(G)I-DLE',  trending: 64, createdAt: '2026-04-25' },
  { id: 'tech-langs',      title: 'Programming Language Wars',     rounds: 'Round of 16', plays:  '52K', tag: 'TECH',     category: 'tech',                         trending: 61, createdAt: '2026-05-11' },
  { id: 'books-fantasy',   title: 'Modern Fantasy Novels',         rounds: 'Round of 16', plays:  '47K', tag: 'BOOKS',    category: 'books',                        trending: 58, createdAt: '2026-05-06' },
  { id: 'kpop-stages',     title: 'Stage Outfits 2026',            rounds: 'Round of 16', plays:  '44K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'ITZY',      trending: 55, createdAt: '2026-05-11' },
  { id: 'kpop-rap',        title: 'Best Rap Verses',               rounds: 'Round of 16', plays:  '41K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'Stray Kids', trending: 53, createdAt: '2026-05-09' },
  { id: 'kpop-vocals',     title: 'Vocal Lines Bracket',           rounds: 'Round of 16', plays:  '38K', tag: 'K-POP',    category: 'kpop',   kpopTag: 'aespa',     trending: 49, createdAt: '2026-05-08' },
];

const CATEGORIES = [
  { id: 'kpop',   label: 'K-pop',   icon: '🎤' },
  { id: 'anime',  label: 'Anime',   icon: '📺' },
  { id: 'gaming', label: 'Gaming',  icon: '🎮' },
  { id: 'movies', label: 'Movies',  icon: '🎬' },
  { id: 'sports', label: 'Sports',  icon: '🏈' },
  { id: 'music',  label: 'Music',   icon: '🎵' },
  { id: 'tv',     label: 'TV',      icon: '📡' },
  { id: 'tech',   label: 'Tech',    icon: '💻' },
  { id: 'books',  label: 'Books',   icon: '📚' },
  { id: 'food',   label: 'Food',    icon: '🍔' },
];

const KPOP_TAGS = ['aespa', 'BLACKPINK', 'NewJeans', 'IVE', 'TWICE', 'ITZY', 'LE SSERAFIM', '(G)I-DLE', 'BTS', 'Stray Kids'];

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
  CATEGORIES,
  KPOP_TAGS,
  placeholderBg,
  initials,
};
