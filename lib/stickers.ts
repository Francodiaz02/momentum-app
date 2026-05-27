export type StickerRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type { PackType } from './types';
export type StickerCategory = 'mindset' | 'fitness' | 'english' | 'discipline' | 'energy';

export interface StickerDef {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  rarity: StickerRarity;
  category: StickerCategory;
}

export const ALL_STICKERS: StickerDef[] = [
  // MINDSET (12)
  { id: 'ms_01', name: 'Growth Mode', subtitle: 'Always evolving', icon: '🧠', rarity: 'common', category: 'mindset' },
  { id: 'ms_02', name: 'Clear Mind', subtitle: 'Zero noise', icon: '🔮', rarity: 'common', category: 'mindset' },
  { id: 'ms_03', name: 'Vision', subtitle: 'See the long game', icon: '👁️', rarity: 'common', category: 'mindset' },
  { id: 'ms_04', name: 'Deep Focus', subtitle: 'In the zone', icon: '🎯', rarity: 'rare', category: 'mindset' },
  { id: 'ms_05', name: 'Flow State', subtitle: 'Effortless execution', icon: '🌊', rarity: 'rare', category: 'mindset' },
  { id: 'ms_06', name: 'Mental Edge', subtitle: 'Sharper than yesterday', icon: '⚡', rarity: 'rare', category: 'mindset' },
  { id: 'ms_07', name: 'Locked In', subtitle: 'Nothing can stop you', icon: '🔒', rarity: 'epic', category: 'mindset' },
  { id: 'ms_08', name: 'Winner Mindset', subtitle: 'Champions think different', icon: '🏆', rarity: 'epic', category: 'mindset' },
  { id: 'ms_09', name: 'Unstoppable', subtitle: 'Momentum is everything', icon: '🚀', rarity: 'epic', category: 'mindset' },
  { id: 'ms_10', name: 'No Excuses', subtitle: 'Just execute', icon: '💥', rarity: 'legendary', category: 'mindset' },
  { id: 'ms_11', name: 'Zen Mode', subtitle: 'Peace through discipline', icon: '☯️', rarity: 'rare', category: 'mindset' },
  { id: 'ms_12', name: 'Rising', subtitle: 'Every day higher', icon: '📈', rarity: 'common', category: 'mindset' },

  // FITNESS (14)
  { id: 'ft_01', name: 'First Stride', subtitle: 'The hardest step', icon: '👟', rarity: 'common', category: 'fitness' },
  { id: 'ft_02', name: 'Running Mode', subtitle: "Legs don't lie", icon: '🏃', rarity: 'common', category: 'fitness' },
  { id: 'ft_03', name: 'Cardio King', subtitle: 'Heart of a champion', icon: '❤️', rarity: 'common', category: 'fitness' },
  { id: 'ft_04', name: 'Push It', subtitle: 'One more rep', icon: '💪', rarity: 'common', category: 'fitness' },
  { id: 'ft_05', name: 'Morning Run', subtitle: 'Before the world wakes', icon: '🌅', rarity: 'rare', category: 'fitness' },
  { id: 'ft_06', name: 'Road Runner', subtitle: 'Miles logged', icon: '🛣️', rarity: 'rare', category: 'fitness' },
  { id: 'ft_07', name: 'Core Power', subtitle: 'Strength from within', icon: '🔥', rarity: 'rare', category: 'fitness' },
  { id: 'ft_08', name: 'Sweat Session', subtitle: 'Proof of work', icon: '💦', rarity: 'common', category: 'fitness' },
  { id: 'ft_09', name: 'No Days Off', subtitle: 'Consistency is the key', icon: '🗓️', rarity: 'rare', category: 'fitness' },
  { id: 'ft_10', name: 'Iron Will', subtitle: 'Mind over matter', icon: '⚙️', rarity: 'epic', category: 'fitness' },
  { id: 'ft_11', name: 'Beast Mode', subtitle: 'Unleashed', icon: '🦁', rarity: 'epic', category: 'fitness' },
  { id: 'ft_12', name: 'Endurance', subtitle: 'Built to last', icon: '🏅', rarity: 'epic', category: 'fitness' },
  { id: 'ft_13', name: 'Speed Up', subtitle: 'Faster than before', icon: '⚡', rarity: 'rare', category: 'fitness' },
  { id: 'ft_14', name: 'Athlete', subtitle: 'Born to move', icon: '🌟', rarity: 'legendary', category: 'fitness' },

  // ENGLISH (12)
  { id: 'en_01', name: 'Word Power', subtitle: 'Language is freedom', icon: '📚', rarity: 'common', category: 'english' },
  { id: 'en_02', name: 'Listen Mode', subtitle: 'Absorbing everything', icon: '🎧', rarity: 'common', category: 'english' },
  { id: 'en_03', name: 'Speak Up', subtitle: 'Voice activated', icon: '🗣️', rarity: 'common', category: 'english' },
  { id: 'en_04', name: 'English Unlocked', subtitle: 'New world opened', icon: '🔑', rarity: 'rare', category: 'english' },
  { id: 'en_05', name: 'Shadow Master', subtitle: 'Copy the best', icon: '🎭', rarity: 'rare', category: 'english' },
  { id: 'en_06', name: 'Chat Mode', subtitle: 'Conversations flow', icon: '💬', rarity: 'common', category: 'english' },
  { id: 'en_07', name: 'Music Mind', subtitle: 'Learning through rhythm', icon: '🎵', rarity: 'rare', category: 'english' },
  { id: 'en_08', name: 'Brain Upgrade', subtitle: 'New neural paths', icon: '🧬', rarity: 'epic', category: 'english' },
  { id: 'en_09', name: 'Native Flow', subtitle: 'Thinking in English', icon: '🌍', rarity: 'epic', category: 'english' },
  { id: 'en_10', name: 'Voice Mode', subtitle: 'Speaking without thinking', icon: '🎤', rarity: 'rare', category: 'english' },
  { id: 'en_11', name: 'Story Time', subtitle: 'Every scene teaches you', icon: '🎬', rarity: 'common', category: 'english' },
  { id: 'en_12', name: 'Fluent', subtitle: 'It just flows', icon: '💫', rarity: 'legendary', category: 'english' },

  // DISCIPLINE (12)
  { id: 'dc_01', name: 'Daily Grind', subtitle: 'Showing up always', icon: '⚒️', rarity: 'common', category: 'discipline' },
  { id: 'dc_02', name: 'Habit Stack', subtitle: 'Systems over goals', icon: '📋', rarity: 'common', category: 'discipline' },
  { id: 'dc_03', name: 'Process First', subtitle: 'Trust the system', icon: '⚙️', rarity: 'common', category: 'discipline' },
  { id: 'dc_04', name: 'Long Game', subtitle: 'Playing for years', icon: '♟️', rarity: 'rare', category: 'discipline' },
  { id: 'dc_05', name: 'Built Different', subtitle: 'Standards are higher', icon: '🔱', rarity: 'rare', category: 'discipline' },
  { id: 'dc_06', name: 'Consistency', subtitle: 'The compound effect', icon: '🔄', rarity: 'rare', category: 'discipline' },
  { id: 'dc_07', name: 'Structure', subtitle: 'Freedom through order', icon: '🏗️', rarity: 'common', category: 'discipline' },
  { id: 'dc_08', name: 'Routine', subtitle: 'Autopilot activated', icon: '⏰', rarity: 'common', category: 'discipline' },
  { id: 'dc_09', name: 'Resilience', subtitle: 'Bend, never break', icon: '🌴', rarity: 'epic', category: 'discipline' },
  { id: 'dc_10', name: 'Champion', subtitle: 'Made not born', icon: '👑', rarity: 'epic', category: 'discipline' },
  { id: 'dc_11', name: 'Momentum', subtitle: 'Objects in motion...', icon: '🌀', rarity: 'legendary', category: 'discipline' },
  { id: 'dc_12', name: 'Persistence', subtitle: 'Keep going', icon: '🏔️', rarity: 'rare', category: 'discipline' },

  // ENERGY (10)
  { id: 'en2_01', name: 'Spark', subtitle: 'The ignition point', icon: '✨', rarity: 'common', category: 'energy' },
  { id: 'en2_02', name: 'Charged', subtitle: 'Full battery', icon: '🔋', rarity: 'common', category: 'energy' },
  { id: 'en2_03', name: 'Activate', subtitle: 'Switched on', icon: '🔆', rarity: 'common', category: 'energy' },
  { id: 'en2_04', name: 'Ignite', subtitle: 'The fire inside', icon: '🔥', rarity: 'rare', category: 'energy' },
  { id: 'en2_05', name: 'Power Up', subtitle: 'Next level loading', icon: '⚡', rarity: 'rare', category: 'energy' },
  { id: 'en2_06', name: 'Alive', subtitle: 'Feel every moment', icon: '💚', rarity: 'common', category: 'energy' },
  { id: 'en2_07', name: 'Vibe', subtitle: 'Energy is contagious', icon: '🎆', rarity: 'rare', category: 'energy' },
  { id: 'en2_08', name: 'Full Send', subtitle: 'No holding back', icon: '🚀', rarity: 'epic', category: 'energy' },
  { id: 'en2_09', name: 'Overdrive', subtitle: 'Beyond limits', icon: '🌋', rarity: 'epic', category: 'energy' },
  { id: 'en2_10', name: 'Legendary Energy', subtitle: 'Once in a lifetime', icon: '🌟', rarity: 'legendary', category: 'energy' },
];

export const RARITY_CONFIG = {
  common:    { label: 'Común',      color: '#888',    bg: '#111118', border: '#222230', glow: 'none',                          weight: 50 },
  rare:      { label: 'Rara',       color: '#38bdf8', bg: '#061828', border: '#0e4a6e', glow: '0 0 12px rgba(56,189,248,0.3)', weight: 30 },
  epic:      { label: 'Épica',      color: '#a855f7', bg: '#120822', border: '#4a1a7a', glow: '0 0 16px rgba(168,85,247,0.4)', weight: 15 },
  legendary: { label: 'Legendaria', color: '#f59e0b', bg: '#1a0e00', border: '#8a5a00', glow: '0 0 24px rgba(245,158,11,0.5)', weight: 5 },
};

import type { PackType } from './types';

const PACK_WEIGHTS: Record<PackType, Record<StickerRarity, number>> = {
  free:         { common: 50, rare: 30, epic: 15, legendary: 5 },
  intermediate: { common: 35, rare: 40, epic: 20, legendary: 5 },
  premium:      { common: 20, rare: 30, epic: 35, legendary: 15 },
};

export function generatePackStickers(seed: number, packType: PackType = 'free'): string[] {
  const weights = PACK_WEIGHTS[packType];
  const total = weights.common + weights.rare + weights.epic + weights.legendary;
  const result: string[] = [];

  for (let i = 0; i < 5; i++) {
    const rand = Math.abs((seed * 1664525 + 1013904223 * (i + 1) + i * 31337) & 0x7fffffff) % total;
    let rarity: StickerRarity;
    if (rand < weights.common) rarity = 'common';
    else if (rand < weights.common + weights.rare) rarity = 'rare';
    else if (rand < weights.common + weights.rare + weights.epic) rarity = 'epic';
    else rarity = 'legendary';

    const pool = ALL_STICKERS.filter(s => s.rarity === rarity);
    const picked = pool[Math.abs((seed * (i + 7) * 31337 + i * 1234567) & 0x7fffffff) % pool.length];
    result.push(picked.id);
  }
  return result;
}
