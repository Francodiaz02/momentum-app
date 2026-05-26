import { AppState, Mission, DayRecord } from './types';
import { generateDailyMissions, getTodayDateStr, calculateXP, calculateLevel } from './missions';

const STORAGE_KEY = 'habitapp_v2';

function getDefaultState(): AppState {
  const today = getTodayDateStr();
  return {
    currentStreak: 0,
    longestStreak: 0,
    totalDaysCompleted: 0,
    totalXP: 0,
    level: 1,
    history: [],
    lastOpenedDate: today,
    todayMissions: generateDailyMissions(today),
    todayCompleted: false,
    minModeActive: false,
    consecutiveMissedFitness: 0,
    consecutiveCompletedEnglish: 0,
  };
}

function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return getDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();

    const state: AppState = JSON.parse(raw);

    // Backfill fields added in new version
    if (state.consecutiveMissedFitness === undefined) state.consecutiveMissedFitness = 0;
    if (state.consecutiveCompletedEnglish === undefined) state.consecutiveCompletedEnglish = 0;

    const today = getTodayDateStr();

    if (state.lastOpenedDate !== today) {
      // Archive previous day
      if (state.lastOpenedDate && state.todayMissions.length > 0) {
        const prevRecord: DayRecord = {
          date: state.lastOpenedDate,
          missions: state.todayMissions,
          completed: state.todayCompleted,
          minModeOnly: state.minModeActive,
          xpEarned: calculateXP(state.todayMissions, state.minModeActive),
        };
        const exists = state.history.find(h => h.date === state.lastOpenedDate);
        if (!exists) state.history.push(prevRecord);
      }

      // Update adaptive counters
      const fitnessDone = state.todayMissions.some(
        m => m.category === 'fitness' && (m.completed || m.minModeCompleted)
      );
      const englishDone = state.todayMissions.filter(
        m => m.category === 'english' && (m.completed || m.minModeCompleted)
      ).length;

      state.consecutiveMissedFitness = fitnessDone ? 0 : state.consecutiveMissedFitness + 1;
      state.consecutiveCompletedEnglish = englishDone >= 2
        ? state.consecutiveCompletedEnglish + 1
        : 0;

      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = localDateStr(yesterday);

      if (state.todayCompleted) {
        state.currentStreak += 1;
        if (state.currentStreak > state.longestStreak) {
          state.longestStreak = state.currentStreak;
        }
        state.totalDaysCompleted += 1;
        state.totalXP += calculateXP(state.todayMissions, state.minModeActive);
        state.level = calculateLevel(state.totalXP);
      } else {
        const hadYesterday = state.history.find(h => h.date === yesterdayStr && h.completed);
        if (!hadYesterday && state.currentStreak > 0) {
          state.currentStreak = Math.max(0, state.currentStreak - 1);
        }
      }

      // Generate missions — force home fitness if user keeps skipping outdoor
      const forceHome = state.consecutiveMissedFitness >= 3;
      state.todayMissions = generateDailyMissions(today, forceHome);
      state.todayCompleted = false;
      state.minModeActive = false;
      state.lastOpenedDate = today;

      // CRITICAL: persist the rolled-over state immediately so refreshing
      // the page before any interaction doesn't re-run the rollover logic
      saveState(state);
    }

    return state;
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function completeMission(state: AppState, missionId: string, minMode: boolean): AppState {
  const newMissions = state.todayMissions.map(m => {
    if (m.id === missionId) {
      return minMode ? { ...m, minModeCompleted: true, completed: false } : { ...m, completed: true, minModeCompleted: false };
    }
    return m;
  });

  const allDone = newMissions.every(m => m.completed || m.minModeCompleted);
  const newState: AppState = { ...state, todayMissions: newMissions, todayCompleted: allDone };
  saveState(newState);
  return newState;
}

export function uncompleteMission(state: AppState, missionId: string): AppState {
  const newMissions = state.todayMissions.map(m => {
    if (m.id === missionId) {
      return { ...m, completed: false, minModeCompleted: false };
    }
    return m;
  });

  const newState: AppState = { ...state, todayMissions: newMissions, todayCompleted: false };
  saveState(newState);
  return newState;
}

export function toggleMinMode(state: AppState): AppState {
  const newState = { ...state, minModeActive: !state.minModeActive };
  saveState(newState);
  return newState;
}

export function getCalendarData(state: AppState): Map<string, 'completed' | 'partial' | 'missed'> {
  const map = new Map<string, 'completed' | 'partial' | 'missed'>();

  state.history.forEach(record => {
    if (record.completed) {
      map.set(record.date, record.minModeOnly ? 'partial' : 'completed');
    } else {
      map.set(record.date, 'missed');
    }
  });

  if (state.todayCompleted) {
    map.set(getTodayDateStr(), state.minModeActive ? 'partial' : 'completed');
  }

  return map;
}
