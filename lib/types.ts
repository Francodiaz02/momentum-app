export type MissionCategory = 'english' | 'fitness' | 'fruit';
export type PackType = 'free' | 'intermediate' | 'premium';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type MissionSubtype = 'run' | 'pushups' | 'abs' | 'speaking' | 'movie' | 'chat' | 'shadow' | 'music' | 'reading' | 'fruit';

export interface Mission {
  id: string;
  category: MissionCategory;
  subtype?: MissionSubtype;
  title: string;
  subtitleEs: string;
  description: string;
  duration: string;
  minDuration?: string;
  icon: string;
  difficulty: DifficultyLevel;
  completed: boolean;
  minModeCompleted?: boolean;
  xpMultiplier?: number; // fruit missions = 2
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'english' | 'fitness' | 'extra';
}

export interface DayRecord {
  date: string;
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
  consecutiveMissedFitness: number;
  consecutiveCompletedEnglish: number;
  // Stats counters
  totalRuns: number;
  totalPushups: number;
  totalAbs: number;
  totalEnglishSessions: number;
  totalSpeakingSessions: number;
  totalMoviesWatched: number;
  totalChatSessions: number;
  totalShadowSessions: number;
  totalFruitsEaten: number;
  // Badges
  badgesUnlocked: string[];
  newlyUnlockedBadge: string | null;
  // Economy
  coins: number;
  // Daily ticket
  ticketClaimedDate: string;
  // Sticker album
  ownedStickers: { stickerId: string; count: number; firstObtainedAt: string }[];
  pendingPack: string[] | null;
  packsAvailable: number;
}
