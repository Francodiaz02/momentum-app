export type StickerRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type CollectibleCategory = 'warrior' | 'beast' | 'mystic' | 'shadow' | 'titan';
export type { PackType } from './types';

export interface StickerDef {
  id: string;
  name: string;
  subtitle: string;
  rarity: StickerRarity;
  category: CollectibleCategory;
  imagePath: string | null;
  power: number;
}

export const ALL_STICKERS: StickerDef[] = [
  // LEGENDARY (7)
  { id:'ph01', name:'The Phantom',       subtitle:'Silent. Disciplined. Deadly.',     rarity:'legendary', category:'shadow',  imagePath:'/figuritas/ph01.png', power:99 },
  { id:'vk01', name:'Void King',         subtitle:'From darkness, dominion.',         rarity:'legendary', category:'shadow',  imagePath:null, power:99 },
  { id:'or01', name:'The Oracle',        subtitle:'He who sees all outcomes.',        rarity:'legendary', category:'mystic',  imagePath:null, power:98 },
  { id:'it01', name:'Iron Titan',        subtitle:'Forged in the deepest forge.',     rarity:'legendary', category:'titan',   imagePath:null, power:98 },
  { id:'ar01', name:'The Architect',     subtitle:'He designed the system.',          rarity:'legendary', category:'mystic',  imagePath:null, power:97 },
  { id:'sb01', name:'Shadow Sovereign',  subtitle:'Rules where light cannot reach.',  rarity:'legendary', category:'shadow',  imagePath:null, power:97 },
  { id:'ce01', name:'Crimson Emperor',   subtitle:'Blood-sworn to never fall.',       rarity:'legendary', category:'warrior', imagePath:null, power:97 },

  // EPIC (18)
  { id:'sw01', name:'Shadow Wolf',       subtitle:'Hunts what hides in the night.',   rarity:'epic', category:'beast',   imagePath:null, power:94 },
  { id:'cb01', name:'Crimson Beast',     subtitle:'Rage made physical.',              rarity:'epic', category:'beast',   imagePath:null, power:93 },
  { id:'sh01', name:'Silent Hunter',     subtitle:'Never misses. Never forgives.',    rarity:'epic', category:'shadow',  imagePath:null, power:93 },
  { id:'wp01', name:'War Prophet',       subtitle:'Sees the battle before it begins.',rarity:'epic', category:'warrior', imagePath:null, power:93 },
  { id:'sl01', name:'Storm Lord',        subtitle:'Commands the tempest.',            rarity:'epic', category:'titan',   imagePath:null, power:92 },
  { id:'nb01', name:'Night Baron',       subtitle:'Master of the hidden city.',       rarity:'epic', category:'shadow',  imagePath:null, power:92 },
  { id:'gs01', name:'Ghost Swordsman',   subtitle:'Cuts without being seen.',         rarity:'epic', category:'warrior', imagePath:null, power:92 },
  { id:'vm01', name:'Void Mage',         subtitle:'Bends reality to his will.',       rarity:'epic', category:'mystic',  imagePath:null, power:91 },
  { id:'fb01', name:'Frost Beast',       subtitle:'Cold as the void between stars.',  rarity:'epic', category:'beast',   imagePath:null, power:91 },
  { id:'ch01', name:'Chaos Herald',      subtitle:'Entropy given a voice.',           rarity:'epic', category:'mystic',  imagePath:null, power:91 },
  { id:'tk01', name:'Thunder Knight',    subtitle:'Where he walks, storms follow.',   rarity:'epic', category:'warrior', imagePath:null, power:90 },
  { id:'ab01', name:'Abyss Beast',       subtitle:'Rose from the deepest dark.',      rarity:'epic', category:'beast',   imagePath:null, power:90 },
  { id:'dl01', name:'Death Lancer',      subtitle:'One strike. One end.',             rarity:'epic', category:'warrior', imagePath:null, power:90 },
  { id:'mp01', name:'Mind Phantom',      subtitle:'Your thoughts are not your own.',  rarity:'epic', category:'shadow',  imagePath:null, power:89 },
  { id:'sc01', name:'Shadow Colossus',   subtitle:'Darkness given impossible size.',  rarity:'epic', category:'titan',   imagePath:null, power:89 },
  { id:'bb01', name:'Blood Baron',       subtitle:'Power demands sacrifice.',         rarity:'epic', category:'warrior', imagePath:null, power:89 },
  { id:'dp01', name:'Dark Prophet',      subtitle:'Speaks only in truths none want.', rarity:'epic', category:'mystic',  imagePath:null, power:88 },
  { id:'km01', name:'Khaos Monk',        subtitle:'Stillness before destruction.',    rarity:'epic', category:'mystic',  imagePath:null, power:88 },
  { id:'nf01', name:'Nightmare Forge',   subtitle:'Crafts weapons from fear.',        rarity:'epic', category:'titan',   imagePath:null, power:88 },

  // RARE (18)
  { id:'sr01', name:'Stone Reaper',      subtitle:'Patient as stone. Fatal as steel.',rarity:'rare', category:'warrior', imagePath:null, power:85 },
  { id:'sm01', name:'Shadow Monk',       subtitle:'Discipline through solitude.',     rarity:'rare', category:'shadow',  imagePath:null, power:84 },
  { id:'fw01', name:'Fire Wraith',       subtitle:'Burns without consuming itself.',  rarity:'rare', category:'mystic',  imagePath:null, power:84 },
  { id:'wh01', name:'War Hawk',          subtitle:'Speed is his only strategy.',      rarity:'rare', category:'warrior', imagePath:null, power:83 },
  { id:'dw01', name:'Dusk Wanderer',     subtitle:'Found on every edge of every map.',rarity:'rare', category:'shadow',  imagePath:null, power:83 },
  { id:'nc01', name:'Night Crawler',     subtitle:'Never sleeps. Always watching.',   rarity:'rare', category:'beast',   imagePath:null, power:83 },
  { id:'ig01', name:'Iron Ghost',        subtitle:'Armored soul. Empty shell.',       rarity:'rare', category:'shadow',  imagePath:null, power:82 },
  { id:'sd01', name:'Storm Drake',       subtitle:'Ancient terror reborn.',           rarity:'rare', category:'beast',   imagePath:null, power:82 },
  { id:'wm01', name:'War Machine',       subtitle:'Built to end conflicts.',          rarity:'rare', category:'titan',   imagePath:null, power:82 },
  { id:'dp02', name:'Dark Pilgrim',      subtitle:'Walks toward what others flee.',   rarity:'rare', category:'shadow',  imagePath:null, power:81 },
  { id:'ss01', name:'Storm Sentinel',    subtitle:'Guards the threshold.',            rarity:'rare', category:'warrior', imagePath:null, power:81 },
  { id:'vb01', name:'Void Breaker',      subtitle:'Punches through dimensions.',      rarity:'rare', category:'titan',   imagePath:null, power:81 },
  { id:'mb01', name:'Moon Beast',        subtitle:'Hunts only under the full moon.',  rarity:'rare', category:'beast',   imagePath:null, power:80 },
  { id:'cw01', name:'Cold Warden',       subtitle:'Keeps order in frozen silence.',   rarity:'rare', category:'warrior', imagePath:null, power:80 },
  { id:'fm01', name:'Flame Marshal',     subtitle:'Commands fire as a living army.',  rarity:'rare', category:'warrior', imagePath:null, power:80 },
  { id:'sd02', name:'Sand Devil',        subtitle:'Storms across desolate plains.',   rarity:'rare', category:'beast',   imagePath:null, power:79 },
  { id:'nk01', name:'Night King',        subtitle:'Rules what daylight abandons.',    rarity:'rare', category:'shadow',  imagePath:null, power:79 },
  { id:'ew01', name:'Echo Warden',       subtitle:'Memory of ancient battles.',       rarity:'rare', category:'mystic',  imagePath:null, power:79 },

  // COMMON (17)
  { id:'ir01', name:'Iron Runner',       subtitle:'Fast, relentless, unbreakable.',   rarity:'common', category:'warrior', imagePath:null, power:75 },
  { id:'dg01', name:'Dark Guard',        subtitle:'First line. Last resort.',         rarity:'common', category:'warrior', imagePath:null, power:74 },
  { id:'sw02', name:'Stone Wolf',        subtitle:'Feral instinct, solid core.',      rarity:'common', category:'beast',   imagePath:null, power:74 },
  { id:'nm01', name:'Night Marshal',     subtitle:'Order in the darkest hour.',       rarity:'common', category:'shadow',  imagePath:null, power:73 },
  { id:'fw02', name:'Frost Warden',      subtitle:'Cold protects. Cold endures.',     rarity:'common', category:'warrior', imagePath:null, power:73 },
  { id:'dc01', name:'Dust Crawler',      subtitle:'Survives where others perish.',    rarity:'common', category:'beast',   imagePath:null, power:72 },
  { id:'bg01', name:'Battle Ghost',      subtitle:'Fought in wars no one recorded.',  rarity:'common', category:'warrior', imagePath:null, power:72 },
  { id:'sw03', name:'Swamp Wraith',      subtitle:'Rises when least expected.',       rarity:'common', category:'mystic',  imagePath:null, power:72 },
  { id:'rf01', name:'Ruin Forger',       subtitle:'Builds from what others destroy.',  rarity:'common', category:'titan',   imagePath:null, power:71 },
  { id:'sm02', name:'Storm Monk',        subtitle:'Trains through any condition.',    rarity:'common', category:'warrior', imagePath:null, power:71 },
  { id:'dr01', name:'Dusk Rider',        subtitle:'Always moving. Never settling.',   rarity:'common', category:'shadow',  imagePath:null, power:71 },
  { id:'wb01', name:'Wild Beast',        subtitle:'Untamed. Unpredictable. Free.',    rarity:'common', category:'beast',   imagePath:null, power:70 },
  { id:'cr01', name:'Crypt Runner',      subtitle:'Faster in darkness than in light.',rarity:'common', category:'shadow',  imagePath:null, power:70 },
  { id:'sf01', name:'Stone Fang',        subtitle:'Patience is its only weapon.',     rarity:'common', category:'beast',   imagePath:null, power:70 },
  { id:'vm02', name:'Void Monk',         subtitle:'Emptied the self. Filled with power.',rarity:'common', category:'mystic', imagePath:null, power:69 },
  { id:'bh01', name:'Black Hunter',      subtitle:'Tracks without tracks.',           rarity:'common', category:'shadow',  imagePath:null, power:69 },
  { id:'dm01', name:'Dust Marshal',      subtitle:'Commands the forgotten.',          rarity:'common', category:'warrior', imagePath:null, power:68 },
];

export const RARITY_CONFIG = {
  common:    { label: 'Común',      color: '#8899aa', bg: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)', border: '#2a3a5a', glow: 'none',                           weight: 50 },
  rare:      { label: 'Rara',       color: '#38bdf8', bg: 'linear-gradient(160deg, #0d1b2a 0%, #1b2838 50%, #2a3f5f 100%)', border: '#4a6a9a', glow: '0 0 12px rgba(56,189,248,0.3)', weight: 30 },
  epic:      { label: 'Épica',      color: '#c084fc', bg: 'linear-gradient(160deg, #1a0a2e 0%, #2d1b69 50%, #4a2080 100%)', border: '#7c3aed', glow: '0 0 16px rgba(192,132,252,0.4)', weight: 15 },
  legendary: { label: 'Legendaria', color: '#f59e0b', bg: 'linear-gradient(160deg, #1a0f00 0%, #3d2000 50%, #5c3200 100%)', border: '#d97706', glow: '0 0 24px rgba(245,158,11,0.5)', weight: 5 },
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
