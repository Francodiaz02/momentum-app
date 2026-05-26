export type MissionCategory = 'english' | 'fitness';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Mission {
  id: string;
  category: MissionCategory;
  title: string;
  subtitleEs: string;      // Spanish support hint — lighter, smaller in UI
  description: string;
  duration: string;
  minDuration?: string;
  icon: string;
  difficulty: DifficultyLevel;
  completed: boolean;
  minModeCompleted?: boolean;
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  missions: Mission[];
  completed: boolean;
  minModeOnly: boolean;
  xpEarned: number;
}

export interface AppState {
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  totalXP: number;
  level: number;
  history: DayRecord[];
  lastOpenedDate: string;
  todayMissions: Mission[];
  todayCompleted: boolean;
  minModeActive: boolean;
  // Adaptive tracking
  consecutiveMissedFitness: number;
  consecutiveCompletedEnglish: number;
}
