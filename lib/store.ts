import { AppState, DayRecord, PackType } from './types';
import { generateDailyMissions, getTodayDateStr, calculateXP, calculateLevel } from './missions';
import { checkNewBadges } from './badges';
import { generatePackStickers } from './stickers';

const STORAGE_KEY = 'habitapp_v3';

function getDefaultState(): AppState {
  const today = getTodayDateStr();
  return {
    currentStreak: 0, longestStreak: 0, totalDaysCompleted: 0,
    totalXP: 0, level: 1, history: [],
    lastOpenedDate: today,
    todayMissions: generateDailyMissions(today),
    todayCompleted: false, minModeActive: false,
    consecutiveMissedFitness: 0, consecutiveCompletedEnglish: 0,
    totalRuns: 0, totalPushups: 0, totalAbs: 0,
    totalEnglishSessions: 0, totalSpeakingSessions: 0,
    totalMoviesWatched: 0, totalChatSessions: 0, totalShadowSessions: 0,
    totalFruitsEaten: 0,
    badgesUnlocked: [], newlyUnlockedBadge: null,
    coins: 30,
    ticketClaimedDate: '',
    ownedStickers: [],
    pendingPack: null,
    packsAvailable: 0,
  };
}

function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return getDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const state: AppState = JSON.parse(raw);

    // Backfill new fields
    if (state.consecutiveMissedFitness === undefined) state.consecutiveMissedFitness = 0;
    if (state.consecutiveCompletedEnglish === undefined) state.consecutiveCompletedEnglish = 0;
    if (state.totalRuns === undefined) state.totalRuns = 0;
    if (state.totalPushups === undefined) state.totalPushups = 0;
    if (state.totalAbs === undefined) state.totalAbs = 0;
    if (state.totalEnglishSessions === undefined) state.totalEnglishSessions = 0;
    if (state.totalSpeakingSessions === undefined) state.totalSpeakingSessions = 0;
    if (state.totalMoviesWatched === undefined) state.totalMoviesWatched = 0;
    if (state.totalChatSessions === undefined) state.totalChatSessions = 0;
    if (state.totalShadowSessions === undefined) state.totalShadowSessions = 0;
    if (state.totalFruitsEaten === undefined) state.totalFruitsEaten = 0;
    if (state.badgesUnlocked === undefined) state.badgesUnlocked = [];
    if (state.newlyUnlockedBadge === undefined) state.newlyUnlockedBadge = null;
    if (state.ticketClaimedDate === undefined) state.ticketClaimedDate = '';
    if (state.ownedStickers === undefined) state.ownedStickers = [];
    if (state.pendingPack === undefined) state.pendingPack = null;
    if (state.packsAvailable === undefined) state.packsAvailable = 0;
    if (state.coins === undefined) state.coins = 0;

    const today = getTodayDateStr();
    if (state.lastOpenedDate !== today) {
      if (state.lastOpenedDate && state.todayMissions.length > 0) {
        const prevRecord: DayRecord = {
          date: state.lastOpenedDate, missions: state.todayMissions,
          completed: state.todayCompleted, minModeOnly: state.minModeActive,
          xpEarned: calculateXP(state.todayMissions, state.minModeActive),
        };
        if (!state.history.find(h => h.date === state.lastOpenedDate)) {
          state.history.push(prevRecord);
        }
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = localDateStr(yesterday);

      if (state.todayCompleted) {
        state.currentStreak += 1;
        if (state.currentStreak > state.longestStreak) state.longestStreak = state.currentStreak;
        state.totalDaysCompleted += 1;
        const prevLevel = state.level;
        state.totalXP += calculateXP(state.todayMissions, state.minModeActive);
        const newLevel = calculateLevel(state.totalXP);
        if (newLevel > prevLevel) {
          state.coins = (state.coins ?? 0) + 30 * (newLevel - prevLevel);
        }
        state.level = newLevel;
      } else {
        const hadYesterday = state.history.find(h => h.date === yesterdayStr && h.completed);
        if (!hadYesterday && state.currentStreak > 0) state.currentStreak = Math.max(0, state.currentStreak - 1);
      }

      state.todayMissions = generateDailyMissions(today);
      state.todayCompleted = false;
      state.minModeActive = false;
      state.lastOpenedDate = today;
      state.newlyUnlockedBadge = null;
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
  const mission = state.todayMissions.find(m => m.id === missionId);
  if (!mission) return state;

  const newMissions = state.todayMissions.map(m =>
    m.id === missionId
      ? (minMode ? { ...m, minModeCompleted: true, completed: false } : { ...m, completed: true, minModeCompleted: false })
      : m
  );
  const allDone = newMissions.every(m => m.completed || m.minModeCompleted);

  // Update specific counters
  let { totalRuns, totalPushups, totalAbs, totalEnglishSessions,
        totalSpeakingSessions, totalMoviesWatched, totalChatSessions,
        totalShadowSessions, totalFruitsEaten } = state;

  if (mission.category === 'english') {
    totalEnglishSessions += 1;
    if (mission.subtype === 'speaking') totalSpeakingSessions += 1;
    if (mission.subtype === 'movie') totalMoviesWatched += 1;
    if (mission.subtype === 'chat') totalChatSessions += 1;
    if (mission.subtype === 'shadow') totalShadowSessions += 1;
  }
  if (mission.subtype === 'run') totalRuns += 1;
  if (mission.subtype === 'pushups') totalPushups += 25; // avg of 20-30
  if (mission.subtype === 'abs') totalAbs += 40; // avg of 30-50
  if (mission.category === 'fruit') totalFruitsEaten += 1;

  // Coins per mission
  let coinsEarned = 8;
  if (mission.category === 'fruit') coinsEarned = 16; // x2 for fruit
  const completionBonus = allDone ? 20 : 0;
  const newCoins = state.coins + coinsEarned + completionBonus;

  const updatedState: AppState = {
    ...state,
    todayMissions: newMissions,
    todayCompleted: allDone,
    coins: newCoins,
    totalRuns, totalPushups, totalAbs, totalEnglishSessions,
    totalSpeakingSessions, totalMoviesWatched, totalChatSessions,
    totalShadowSessions, totalFruitsEaten,
  };

  // Check for newly unlocked badges
  const newBadges = checkNewBadges(updatedState);
  if (newBadges.length > 0) {
    updatedState.badgesUnlocked = [...updatedState.badgesUnlocked, ...newBadges];
    updatedState.newlyUnlockedBadge = newBadges[0];
  }

  saveState(updatedState);
  return updatedState;
}

export function uncompleteMission(state: AppState, missionId: string): AppState {
  const newMissions = state.todayMissions.map(m =>
    m.id === missionId ? { ...m, completed: false, minModeCompleted: false } : m
  );
  const newState: AppState = { ...state, todayMissions: newMissions, todayCompleted: false };
  saveState(newState);
  return newState;
}

export function toggleMinMode(state: AppState): AppState {
  const newState = { ...state, minModeActive: !state.minModeActive };
  saveState(newState);
  return newState;
}

export function claimTicketAndGetPack(state: AppState): AppState {
  const newState = {
    ...state,
    ticketClaimedDate: getTodayDateStr(),
    packsAvailable: state.packsAvailable + 1,
  };
  saveState(newState);
  return newState;
}

export function openPack(state: AppState, packType: PackType = 'free'): AppState {
  if (state.packsAvailable <= 0) return state;
  const seed = Date.now();
  const packStickers = generatePackStickers(seed, packType);
  const newState = {
    ...state,
    packsAvailable: state.packsAvailable - 1,
    pendingPack: packStickers,
  };
  saveState(newState);
  return newState;
}

export function buyAndOpenPack(state: AppState, packType: 'intermediate' | 'premium'): AppState {
  const costs: Record<string, number> = { intermediate: 100, premium: 250 };
  const cost = costs[packType];
  if (state.coins < cost) return state;
  const seed = Date.now();
  const packStickers = generatePackStickers(seed, packType);
  const newState = { ...state, coins: state.coins - cost, pendingPack: packStickers };
  saveState(newState);
  return newState;
}

export function claimPack(state: AppState): AppState {
  if (!state.pendingPack) return state;
  const newOwned = [...state.ownedStickers];
  for (const stickerId of state.pendingPack) {
    const existing = newOwned.find(o => o.stickerId === stickerId);
    if (existing) {
      existing.count += 1;
    } else {
      newOwned.push({ stickerId, count: 1, firstObtainedAt: getTodayDateStr() });
    }
  }
  const newState = { ...state, ownedStickers: newOwned, pendingPack: null };
  saveState(newState);
  return newState;
}

export function resetDailyTicket(state: AppState): AppState {
  const newState = { ...state, ticketClaimedDate: '', packsAvailable: 0 };
  saveState(newState);
  return newState;
}

export function clearUnlockedBadge(state: AppState): AppState {
  const newState = { ...state, newlyUnlockedBadge: null };
  saveState(newState);
  return newState;
}

export function getCalendarData(state: AppState): Map<string, 'completed' | 'partial' | 'missed'> {
  const map = new Map<string, 'completed' | 'partial' | 'missed'>();
  state.history.forEach(record => {
    map.set(record.date, record.completed ? (record.minModeOnly ? 'partial' : 'completed') : 'missed');
  });
  if (state.todayCompleted) {
    map.set(getTodayDateStr(), state.minModeActive ? 'partial' : 'completed');
  }
  return map;
}
