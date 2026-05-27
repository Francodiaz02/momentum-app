import { AppState } from './types';

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'english' | 'fitness' | 'extra';
  check: (state: AppState) => boolean;
}

export const ALL_BADGES: BadgeDef[] = [
  // ENGLISH
  { id: 'eng_first', name: 'First Words', description: 'Completá tu primera misión de inglés', icon: '🗣️', category: 'english', check: s => s.totalEnglishSessions >= 1 },
  { id: 'eng_sessions_5', name: 'Getting Fluent', description: '5 sesiones de inglés', icon: '📚', category: 'english', check: s => s.totalEnglishSessions >= 5 },
  { id: 'eng_sessions_20', name: 'English Addict', description: '20 sesiones de inglés', icon: '🎓', category: 'english', check: s => s.totalEnglishSessions >= 20 },
  { id: 'eng_sessions_50', name: 'Immersion Mode', description: '50 sesiones de inglés', icon: '🌍', category: 'english', check: s => s.totalEnglishSessions >= 50 },
  { id: 'eng_speaking_3', name: 'Mouth Moving', description: '3 sesiones de speaking', icon: '🎤', category: 'english', check: s => s.totalSpeakingSessions >= 3 },
  { id: 'eng_speaking_10', name: 'Fluent Mind', description: '10 sesiones de speaking', icon: '💬', category: 'english', check: s => s.totalSpeakingSessions >= 10 },
  { id: 'eng_movies_3', name: 'Binge Learner', description: '3 sesiones de series/películas', icon: '🎬', category: 'english', check: s => s.totalMoviesWatched >= 3 },
  { id: 'eng_chat_3', name: 'AI Buddy', description: '3 conversaciones con IA en inglés', icon: '🤖', category: 'english', check: s => s.totalChatSessions >= 3 },
  { id: 'eng_chat_10', name: 'AI Conversation', description: '10 conversaciones con IA', icon: '💡', category: 'english', check: s => s.totalChatSessions >= 10 },
  { id: 'eng_shadow_3', name: 'Shadow Starter', description: '3 sesiones de shadowing', icon: '🎭', category: 'english', check: s => s.totalShadowSessions >= 3 },
  { id: 'eng_shadow_10', name: 'Shadow Master', description: '10 sesiones de shadowing', icon: '🔊', category: 'english', check: s => s.totalShadowSessions >= 10 },

  // FITNESS
  { id: 'fit_first', name: 'Off the Couch', description: 'Completá tu primera misión de fitness', icon: '👟', category: 'fitness', check: s => s.totalRuns >= 1 || s.totalPushups >= 1 },
  { id: 'fit_first_run', name: 'First Stride', description: 'Tu primera corrida', icon: '🏃', category: 'fitness', check: s => s.totalRuns >= 1 },
  { id: 'fit_runs_5', name: 'Running Habit', description: '5 corridas completadas', icon: '🌅', category: 'fitness', check: s => s.totalRuns >= 5 },
  { id: 'fit_runs_10', name: 'Road Warrior', description: '10 corridas', icon: '⚡', category: 'fitness', check: s => s.totalRuns >= 10 },
  { id: 'fit_runs_20', name: 'Distance Maker', description: '20 corridas', icon: '🏅', category: 'fitness', check: s => s.totalRuns >= 20 },
  { id: 'fit_runs_30', name: 'Marathon Mind', description: '30 corridas', icon: '🦅', category: 'fitness', check: s => s.totalRuns >= 30 },
  { id: 'fit_pushups_30', name: 'First Reps', description: '30 flexiones acumuladas', icon: '💪', category: 'fitness', check: s => s.totalPushups >= 30 },
  { id: 'fit_pushups_150', name: 'Upper Body', description: '150 flexiones', icon: '🔥', category: 'fitness', check: s => s.totalPushups >= 150 },
  { id: 'fit_pushups_500', name: 'Beast Mode', description: '500 flexiones', icon: '🦾', category: 'fitness', check: s => s.totalPushups >= 500 },
  { id: 'fit_abs_50', name: 'Core Starter', description: '50 abdominales acumulados', icon: '⚡', category: 'fitness', check: s => s.totalAbs >= 50 },
  { id: 'fit_abs_200', name: 'Core Builder', description: '200 abdominales', icon: '🎯', category: 'fitness', check: s => s.totalAbs >= 200 },
  { id: 'fit_abs_500', name: 'Steel Core', description: '500 abdominales', icon: '🏆', category: 'fitness', check: s => s.totalAbs >= 500 },

  // EXTRA
  { id: 'extra_fruit_first', name: 'Bonus Claimed', description: 'Primera misión bonus de fruta', icon: '🍎', category: 'extra', check: s => s.totalFruitsEaten >= 1 },
  { id: 'extra_fruit_5', name: 'Fruit Lover', description: '5 frutas bonus comidas', icon: '🍊', category: 'extra', check: s => s.totalFruitsEaten >= 5 },
  { id: 'extra_fruit_20', name: 'Vitamin King', description: '20 frutas bonus', icon: '🍉', category: 'extra', check: s => s.totalFruitsEaten >= 20 },
  { id: 'extra_day_first', name: 'Day One', description: 'Completá tu primer día', icon: '🌟', category: 'extra', check: s => s.totalDaysCompleted >= 1 },
  { id: 'extra_days_7', name: 'One Week', description: '7 días completados', icon: '📅', category: 'extra', check: s => s.totalDaysCompleted >= 7 },
  { id: 'extra_days_21', name: 'Habit Builder', description: '21 días — zona de hábito', icon: '🧠', category: 'extra', check: s => s.totalDaysCompleted >= 21 },
  { id: 'extra_days_50', name: 'Momentum Master', description: '50 días de Momentum', icon: '👑', category: 'extra', check: s => s.totalDaysCompleted >= 50 },
  { id: 'extra_streak_7', name: 'Week Streak', description: 'Racha de 7 días', icon: '🔥', category: 'extra', check: s => s.longestStreak >= 7 },
  { id: 'extra_streak_30', name: 'Month on Fire', description: 'Racha de 30 días', icon: '🌋', category: 'extra', check: s => s.longestStreak >= 30 },
];

export function checkNewBadges(state: AppState): string[] {
  return ALL_BADGES
    .filter(b => !state.badgesUnlocked.includes(b.id) && b.check(state))
    .map(b => b.id);
}

export function getBadgeById(id: string): BadgeDef | undefined {
  return ALL_BADGES.find(b => b.id === id);
}
