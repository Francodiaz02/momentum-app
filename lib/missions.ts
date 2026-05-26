import { Mission } from './types';

const englishMissions: Omit<Mission, 'id' | 'completed'>[] = [
  {
    category: 'english',
    title: 'Series Time',
    subtitleEs: 'Mirá 20 min de una serie en inglés con subtítulos en inglés',
    description: 'Watch 20 min of a series in English with English subtitles. Focus on how they speak, not just what they say.',
    duration: '20 min',
    minDuration: '10 min',
    icon: '🎬',
    difficulty: 'easy',
  },
  {
    category: 'english',
    title: 'Shadowing',
    subtitleEs: 'Repetí frases de un clip copiando el ritmo y entonación exactos',
    description: 'Pick a short clip (2-3 min). Play it, pause, repeat each sentence copying the rhythm, speed and intonation exactly.',
    duration: '15 min',
    minDuration: '5 min',
    icon: '🎙️',
    difficulty: 'medium',
  },
  {
    category: 'english',
    title: 'Talk to AI',
    subtitleEs: 'Charlá con una IA en inglés 10 minutos. Sin traducir, solo hablá.',
    description: 'Open ChatGPT or any AI. Have a real casual conversation for at least 10 minutes. Just chat, don\'t translate.',
    duration: '10 min',
    minDuration: '5 min',
    icon: '🤖',
    difficulty: 'medium',
  },
  {
    category: 'english',
    title: 'My Day in English',
    subtitleEs: 'Describí en voz alta todo lo que hiciste hoy, en inglés',
    description: 'Describe everything you did today out loud in English. Don\'t stop to think — just keep talking.',
    duration: '10 min',
    minDuration: '3 min',
    icon: '📅',
    difficulty: 'easy',
  },
  {
    category: 'english',
    title: 'Rapid Fire Q&A',
    subtitleEs: 'Respondé preguntas al instante en inglés, sin pausar ni pensar',
    description: 'Answer these questions instantly without pausing: What would you do with $1M? Describe your dream home. What\'s your favorite memory?',
    duration: '10 min',
    minDuration: '5 min',
    icon: '⚡',
    difficulty: 'hard',
  },
  {
    category: 'english',
    title: 'Podcast Listen',
    subtitleEs: 'Escuchá un podcast 20 min y resumí la idea principal en 3 frases',
    description: 'Listen to any English podcast for 20 min. Then summarize the main idea in 3 sentences out loud.',
    duration: '25 min',
    minDuration: '10 min',
    icon: '🎧',
    difficulty: 'easy',
  },
  {
    category: 'english',
    title: 'Describe Everything',
    subtitleEs: 'Describí 10 objetos a tu alrededor en frases completas en inglés',
    description: 'Look around you and describe 10 objects in full sentences. Then describe the whole room as if talking to someone who can\'t see it.',
    duration: '10 min',
    minDuration: '5 min',
    icon: '👁️',
    difficulty: 'easy',
  },
  {
    category: 'english',
    title: 'Roleplay Scenario',
    subtitleEs: 'Actuá una conversación cotidiana en inglés: restaurante, hotel, etc.',
    description: 'Imagine you\'re ordering food, checking into a hotel, or meeting someone new. Act out the full conversation out loud.',
    duration: '15 min',
    minDuration: '5 min',
    icon: '🎭',
    difficulty: 'medium',
  },
  {
    category: 'english',
    title: 'YouTube Deep Dive',
    subtitleEs: 'Mirá un video que te guste en inglés, sin subtítulos',
    description: 'Watch a YouTube video on any topic you actually enjoy — in English, no subtitles. Understand as much as possible.',
    duration: '20 min',
    minDuration: '10 min',
    icon: '▶️',
    difficulty: 'medium',
  },
  {
    category: 'english',
    title: 'Think Out Loud',
    subtitleEs: 'Pensá en voz alta sobre una decisión que estás tomando, en inglés',
    description: 'Think through a decision you\'re making out loud in English. What are the pros and cons? What would you choose?',
    duration: '10 min',
    minDuration: '3 min',
    icon: '💭',
    difficulty: 'medium',
  },
  {
    category: 'english',
    title: 'Dialogue Repeat',
    subtitleEs: 'Repetí línea por línea un diálogo de una película en inglés',
    description: 'Find a movie scene with a lot of dialogue. Watch 1 minute, then replay it line by line and repeat each line out loud.',
    duration: '15 min',
    minDuration: '5 min',
    icon: '🎞️',
    difficulty: 'hard',
  },
  {
    category: 'english',
    title: 'Voice Memo Story',
    subtitleEs: 'Grabate contando algo en inglés. Escuchate. Notá qué salió natural.',
    description: 'Record yourself telling a 3-minute story in English about anything. Play it back. Notice what felt natural.',
    duration: '10 min',
    minDuration: '5 min',
    icon: '🎤',
    difficulty: 'medium',
  },
];

const outdoorFitness: Omit<Mission, 'id' | 'completed'>[] = [
  {
    category: 'fitness',
    title: 'Run & Walk',
    subtitleEs: 'Salí afuera. Alternás 2 min corriendo + 1 min caminando.',
    description: 'Go outside. Alternate 2 min running + 1 min walking for 20 minutes. Don\'t push hard — just move.',
    duration: '20 min',
    minDuration: '10 min',
    icon: '🏃',
    difficulty: 'medium',
  },
  {
    category: 'fitness',
    title: 'Power Walk',
    subtitleEs: 'Caminata rápida 30 min afuera. Ritmo incómodo pero sostenible.',
    description: 'Walk outside at a fast pace for 30 minutes. Swing your arms. Keep your pace just uncomfortable enough.',
    duration: '30 min',
    minDuration: '15 min',
    icon: '🚶',
    difficulty: 'easy',
  },
  {
    category: 'fitness',
    title: 'Outdoor Jog',
    subtitleEs: 'Trote suave 25 min afuera. A ritmo de conversación.',
    description: 'Easy continuous jog for 20-25 minutes. Conversational pace — you should be able to talk while running.',
    duration: '25 min',
    minDuration: '10 min',
    icon: '🌳',
    difficulty: 'medium',
  },
];

const homeFitness: Omit<Mission, 'id' | 'completed'>[] = [
  {
    category: 'fitness',
    title: 'Mini HIIT',
    subtitleEs: '3 rondas: jumping jacks → sentadillas → flexiones → descanso.',
    description: '3 rounds: 15 jumping jacks → 10 squats → 8 push-ups → 10 sec rest. Rest 1 min between rounds.',
    duration: '15 min',
    minDuration: '1 ronda',
    icon: '⚡',
    difficulty: 'hard',
  },
  {
    category: 'fitness',
    title: 'Mobility Flow',
    subtitleEs: 'Movilidad completa: caderas, hombros, columna, piernas.',
    description: 'Hip circles, shoulder rolls, spinal twists, deep squats, and leg swings. Move every joint through full range.',
    duration: '15 min',
    minDuration: '7 min',
    icon: '🌀',
    difficulty: 'easy',
  },
  {
    category: 'fitness',
    title: 'Push & Squat',
    subtitleEs: '5 series de flexiones + sentadillas. Foco en la técnica.',
    description: '5 sets: max push-ups, rest 45 sec, 15 squats, rest 45 sec. Focus on form over reps.',
    duration: '20 min',
    minDuration: '2 series',
    icon: '💪',
    difficulty: 'medium',
  },
  {
    category: 'fitness',
    title: 'Jump Circuit',
    subtitleEs: '4 rondas: jumping jacks → rodillas al pecho → talones al glúteo.',
    description: '4 rounds: 20 jumping jacks → 10 high knees → 10 butt kicks → 30 sec rest. Keep energy high.',
    duration: '15 min',
    minDuration: '2 rondas',
    icon: '🔥',
    difficulty: 'hard',
  },
  {
    category: 'fitness',
    title: 'Core Activation',
    subtitleEs: '3 rondas: plancha → abdominales → elevación de piernas.',
    description: '3 rounds: 30 sec plank → 15 crunches → 10 leg raises → 10 bicycle crunches → rest 1 min.',
    duration: '15 min',
    minDuration: '1 ronda',
    icon: '🎯',
    difficulty: 'medium',
  },
  {
    category: 'fitness',
    title: 'Stretch & Breathe',
    subtitleEs: 'Elongación completa. 30 seg por postura. Respirá profundo.',
    description: 'Full body static stretching. Hold each stretch 30 sec. Breathe deeply. This counts as your movement.',
    duration: '15 min',
    minDuration: '10 min',
    icon: '🧘',
    difficulty: 'easy',
  },
];

let missionCounter = 0;

function createMission(base: Omit<Mission, 'id' | 'completed'>): Mission {
  return {
    ...base,
    id: `mission-${++missionCounter}-${Date.now()}`,
    completed: false,
    minModeCompleted: false,
  };
}

function getDayOfWeek(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getDay();
}

function isOutdoorDay(dateStr: string): boolean {
  const day = getDayOfWeek(dateStr);
  return day === 1 || day === 3 || day === 5; // Mon, Wed, Fri
}

function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Returns 2 different English mission indexes for the day
function pickTwoEnglish(hash: number): [number, number] {
  const n = englishMissions.length;
  const i1 = hash % n;
  // Use a second independent hash to avoid clustering
  const h2 = Math.abs((hash * 1664525 + 1013904223) & 0x7fffffff);
  let i2 = h2 % n;
  if (i2 === i1) i2 = (i1 + 1) % n;
  return [i1, i2];
}

export function generateDailyMissions(
  dateStr: string,
  forceHomeOnly = false,
): Mission[] {
  const hash = hashDate(dateStr);
  const [i1, i2] = pickTwoEnglish(hash);

  const english1 = createMission(englishMissions[i1]);
  const english2 = createMission(englishMissions[i2]);

  let fitness: Mission;
  if (!forceHomeOnly && isOutdoorDay(dateStr)) {
    fitness = createMission(outdoorFitness[hash % outdoorFitness.length]);
  } else {
    const h2 = Math.abs((hash >> 4) ^ (hash << 2));
    fitness = createMission(homeFitness[Math.abs(h2) % homeFitness.length]);
  }

  return [english1, english2, fitness];
}

export function getTodayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function calculateXP(missions: Mission[], minMode: boolean): number {
  const done = missions.filter(m => m.completed || m.minModeCompleted).length;
  const perfect = missions.every(m => m.completed || m.minModeCompleted) ? 5 : 0;
  const fullBonus = missions.every(m => m.completed) ? 5 : 0;
  return Math.round((done * 10 + perfect + fullBonus) * (minMode ? 0.6 : 1));
}

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 50) + 1;
}
