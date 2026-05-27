import { Mission } from './types';

// ─── English missions (exactly 8) ────────────────────────────────────────
const englishMissions: Omit<Mission, 'id' | 'completed'>[] = [
  {
    category: 'english', subtype: 'chat',
    title: 'Chat with AI',
    subtitleEs: 'Charlá 10-15 min con ChatGPT en inglés. Escribí, no traduzcas.',
    description: 'Open ChatGPT. Have a real written conversation in English for 10-15 minutes about anything. Don\'t translate — just write.',
    duration: '15 min', minDuration: '7 min', icon: '🤖', difficulty: 'easy',
  },
  {
    category: 'english', subtype: 'speaking',
    title: 'AI Voice Call',
    subtitleEs: 'Conversación por voz con ChatGPT. Hablá como si fuera real.',
    description: 'Use ChatGPT voice mode. Have a full spoken conversation in English. Pretend it\'s a real person — don\'t stop to think.',
    duration: '10 min', minDuration: '5 min', icon: '🎙️', difficulty: 'medium',
  },
  {
    category: 'english', subtype: 'movie',
    title: 'Series Time',
    subtitleEs: 'Mirá 20 min de una serie o peli en inglés con subtítulos en inglés.',
    description: 'Watch 20 minutes of any series or movie in English with English subtitles. Focus on how people speak, not just the plot.',
    duration: '20 min', minDuration: '10 min', icon: '🎬', difficulty: 'easy',
  },
  {
    category: 'english', subtype: 'music',
    title: 'Music Immersion',
    subtitleEs: 'Escuchá 2 canciones en inglés. Volvé a escucharlas prestando atención a la letra.',
    description: 'Listen to 2 songs in English. Then play them again — this time follow the lyrics. Try to catch every word.',
    duration: '10 min', minDuration: '5 min', icon: '🎵', difficulty: 'easy',
  },
  {
    category: 'english', subtype: 'reading',
    title: 'Marketing Read',
    subtitleEs: 'Leé 15 min de contenido de marketing en inglés. Blog, newsletter, artículo.',
    description: 'Read any marketing content in English for 15 minutes — a blog post, newsletter, or article. Marketing vocabulary is super useful.',
    duration: '15 min', minDuration: '7 min', icon: '📱', difficulty: 'easy',
  },
  {
    category: 'english', subtype: 'speaking',
    title: 'Describe It',
    subtitleEs: 'Elegí un tema y describilo 2-5 min en inglés sin traducir en tu cabeza.',
    description: 'Pick anything — your room, your day, a movie. Describe it out loud in English for 2-5 minutes. Don\'t translate. Just talk.',
    duration: '5 min', minDuration: '2 min', icon: '💭', difficulty: 'medium',
  },
  {
    category: 'english', subtype: 'shadow',
    title: 'Shadowing',
    subtitleEs: 'Repetí frases de un video copiando exactamente el ritmo y pronunciación.',
    description: 'Find a short video clip. Play it, pause after each sentence, then repeat exactly — same rhythm, speed, and pronunciation. This is the fastest way to sound native.',
    duration: '15 min', minDuration: '5 min', icon: '🔊', difficulty: 'medium',
  },
  {
    category: 'english', subtype: 'speaking',
    title: 'Summarize It',
    subtitleEs: 'Mirá o escuchá algo corto y resumilo en inglés en voz alta.',
    description: 'Watch or listen to something short (video, podcast clip, news). Then summarize what you heard in English out loud. Focus on getting the ideas across.',
    duration: '15 min', minDuration: '7 min', icon: '📝', difficulty: 'medium',
  },
];

// ─── Fixed fitness missions ───────────────────────────────────────────────
const runMission: Omit<Mission, 'id' | 'completed'> = {
  category: 'fitness', subtype: 'run',
  title: 'Run 45',
  subtitleEs: 'Salí a correr 45 minutos. Ritmo sostenible, sin parar.',
  description: 'Go outside and run for 45 minutes at a comfortable, sustainable pace. You should be able to breathe — not sprint. Just go.',
  duration: '45 min', minDuration: '20 min', icon: '🏃', difficulty: 'medium',
};

const pushusMission: Omit<Mission, 'id' | 'completed'> = {
  category: 'fitness', subtype: 'pushups',
  title: 'Push-ups',
  subtitleEs: 'Hacé 20-30 flexiones. Técnica antes que velocidad.',
  description: 'Do 20-30 push-ups. If you can\'t do them all at once, split into sets. Focus on form — chest to floor, full extension.',
  duration: '10 min', minDuration: '5 min', icon: '💪', difficulty: 'medium',
};

const absMission: Omit<Mission, 'id' | 'completed'> = {
  category: 'fitness', subtype: 'abs',
  title: 'Abs',
  subtitleEs: 'Hacé 30-50 abdominales. Lentos y controlados.',
  description: 'Do 30-50 crunches or sit-ups. Slow and controlled — feel it in the core. Split into sets if needed.',
  duration: '10 min', minDuration: '5 min', icon: '⚡', difficulty: 'medium',
};

// ─── Fruit bonus mission ──────────────────────────────────────────────────
const fruitMission: Omit<Mission, 'id' | 'completed'> = {
  category: 'fruit', subtype: 'fruit',
  title: 'Bonus: Eat a Fruit',
  subtitleEs: '🍎 Comé una fruta hoy. Misión extra — doble XP.',
  description: 'Eat any fruit today. Apple, banana, orange — whatever you have. This is a bonus mission that gives double XP.',
  duration: '2 min', icon: '🍎', difficulty: 'easy',
  xpMultiplier: 2,
};

// ─── Helpers ──────────────────────────────────────────────────────────────
let missionCounter = 0;

function createMission(base: Omit<Mission, 'id' | 'completed'>): Mission {
  return { ...base, id: `m-${++missionCounter}-${Date.now()}`, completed: false, minModeCompleted: false };
}

function getDayOfWeek(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getDay(); // 0=Sun
}

function hashDate(dateStr: string): number {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) { h = ((h << 5) - h) + dateStr.charCodeAt(i); h = h & h; }
  return Math.abs(h);
}

function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Pick 2 different English missions for the day (hash-based, deterministic)
function pickTwoEnglish(hash: number): [number, number] {
  const n = englishMissions.length;
  const i1 = hash % n;
  const h2 = Math.abs((hash * 1664525 + 1013904223) & 0x7fffffff);
  let i2 = h2 % n;
  if (i2 === i1) i2 = (i1 + 1) % n;
  return [i1, i2];
}

// Fruit appears 3 non-consecutive days per week (Mon-Sat, never Sunday)
const FRUIT_PATTERNS = [[1,3,5],[1,3,6],[1,4,6],[2,4,6]];

function isFruitDay(dateStr: string): boolean {
  const dow = getDayOfWeek(dateStr);
  if (dow === 0) return false; // never Sunday
  const d = new Date(dateStr + 'T12:00:00');
  // Find Monday of this week
  const monday = new Date(d);
  monday.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
  const weekHash = hashDate(localDateStr(monday));
  const pattern = FRUIT_PATTERNS[weekHash % FRUIT_PATTERNS.length];
  return pattern.includes(dow);
}

export function generateDailyMissions(dateStr: string): Mission[] {
  const hash = hashDate(dateStr);
  const [i1, i2] = pickTwoEnglish(hash);
  const missions: Mission[] = [
    createMission(englishMissions[i1]),
    createMission(englishMissions[i2]),
  ];

  // Fixed fitness schedule
  // Run days: Mon(1), Wed(3), Fri(5), Sat(6)
  // Strength days: Tue(2), Thu(4), Sun(0)
  const dow = getDayOfWeek(dateStr);
  if ([2, 4, 0].includes(dow)) {
    // Strength: pushups + abs
    missions.push(createMission(pushusMission));
    missions.push(createMission(absMission));
  } else {
    // Run
    missions.push(createMission(runMission));
  }

  // Bonus fruit mission
  if (isFruitDay(dateStr)) {
    missions.push(createMission(fruitMission));
  }

  return missions;
}

export function getTodayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function calculateXP(missions: Mission[], minMode: boolean): number {
  let xp = 0;
  for (const m of missions) {
    if (m.completed || m.minModeCompleted) {
      const base = 10 * (m.xpMultiplier ?? 1);
      xp += m.completed ? base : base * 0.6;
    }
  }
  const allDone = missions.every(m => m.completed || m.minModeCompleted);
  if (allDone) xp += 5;
  if (minMode) xp = Math.round(xp * 0.6);
  return Math.round(xp);
}

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 50) + 1;
}
