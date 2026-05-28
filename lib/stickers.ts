export type StickerRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type { PackType } from './types';
export type StickerCategory = 'goalkeeper' | 'defender' | 'midfielder' | 'forward';

export interface StickerDef {
  id: string;
  name: string;
  fullName: string;
  country: string;
  flag: string;
  position: string;
  rating: number;
  era: string;
  rarity: StickerRarity;
  category: StickerCategory;
  initials: string;
  cardColor: string;
}

export const ALL_STICKERS: StickerDef[] = [
  // LEGENDARY (7) — rating 97-99
  { id:'p01', name:'MESSI', fullName:'Lionel Messi', country:'Argentina', flag:'🇦🇷', position:'CAM', rating:99, era:'2010s', rarity:'legendary', category:'midfielder', initials:'LM', cardColor:'#1a4a6e' },
  { id:'p02', name:'RONALDO', fullName:'Cristiano Ronaldo', country:'Portugal', flag:'🇵🇹', position:'ST', rating:99, era:'2010s', rarity:'legendary', category:'forward', initials:'CR', cardColor:'#6e1a1a' },
  { id:'p03', name:'PELÉ', fullName:'Pelé', country:'Brasil', flag:'🇧🇷', position:'ST', rating:99, era:'1960s', rarity:'legendary', category:'forward', initials:'PE', cardColor:'#4a6e1a' },
  { id:'p04', name:'MARADONA', fullName:'Diego Maradona', country:'Argentina', flag:'🇦🇷', position:'CAM', rating:99, era:'1980s', rarity:'legendary', category:'midfielder', initials:'DM', cardColor:'#1a1a6e' },
  { id:'p05', name:'ZIDANE', fullName:'Zinedine Zidane', country:'Francia', flag:'🇫🇷', position:'CAM', rating:98, era:'2000s', rarity:'legendary', category:'midfielder', initials:'ZZ', cardColor:'#3a1a6e' },
  { id:'p06', name:'CRUYFF', fullName:'Johan Cruyff', country:'Países Bajos', flag:'🇳🇱', position:'CF', rating:98, era:'1970s', rarity:'legendary', category:'forward', initials:'JC', cardColor:'#6e4a1a' },
  { id:'p07', name:'R9', fullName:'Ronaldo Nazário', country:'Brasil', flag:'🇧🇷', position:'ST', rating:98, era:'2000s', rarity:'legendary', category:'forward', initials:'R9', cardColor:'#4a6e1a' },

  // EPIC (19) — rating 92-97 (includes Mbappé)
  { id:'p08', name:'BECKENBAUER', fullName:'Franz Beckenbauer', country:'Alemania', flag:'🇩🇪', position:'CB', rating:97, era:'1970s', rarity:'epic', category:'defender', initials:'FB', cardColor:'#1a3a5a' },
  { id:'p09', name:'DI STÉFANO', fullName:'Alfredo Di Stéfano', country:'Argentina', flag:'🇦🇷', position:'CF', rating:97, era:'1950s', rarity:'epic', category:'forward', initials:'AD', cardColor:'#5a3a1a' },
  { id:'p10', name:'PLATINI', fullName:'Michel Platini', country:'Francia', flag:'🇫🇷', position:'CAM', rating:96, era:'1980s', rarity:'epic', category:'midfielder', initials:'MP', cardColor:'#3a1a5a' },
  { id:'p11', name:'RONALDINHO', fullName:'Ronaldinho', country:'Brasil', flag:'🇧🇷', position:'CAM', rating:96, era:'2000s', rarity:'epic', category:'midfielder', initials:'R10', cardColor:'#3a5a1a' },
  { id:'p12', name:'HENRY', fullName:'Thierry Henry', country:'Francia', flag:'🇫🇷', position:'ST', rating:95, era:'2000s', rarity:'epic', category:'forward', initials:'TH', cardColor:'#5a1a1a' },
  { id:'p13', name:'XAVI', fullName:'Xavi Hernández', country:'España', flag:'🇪🇸', position:'CM', rating:95, era:'2010s', rarity:'epic', category:'midfielder', initials:'XV', cardColor:'#5a1a1a' },
  { id:'p14', name:'INIESTA', fullName:'Andrés Iniesta', country:'España', flag:'🇪🇸', position:'CAM', rating:95, era:'2010s', rarity:'epic', category:'midfielder', initials:'AI', cardColor:'#5a1a1a' },
  { id:'p15', name:'BUFFON', fullName:'Gianluigi Buffon', country:'Italia', flag:'🇮🇹', position:'GK', rating:94, era:'2000s', rarity:'epic', category:'goalkeeper', initials:'GB', cardColor:'#1a1a5a' },
  { id:'p16', name:'MALDINI', fullName:'Paolo Maldini', country:'Italia', flag:'🇮🇹', position:'CB', rating:94, era:'1990s', rarity:'epic', category:'defender', initials:'PM', cardColor:'#5a1a1a' },
  { id:'p17', name:'VAN BASTEN', fullName:'Marco van Basten', country:'Países Bajos', flag:'🇳🇱', position:'ST', rating:94, era:'1980s', rarity:'epic', category:'forward', initials:'MB', cardColor:'#5a4a1a' },
  { id:'p18', name:'YASHIN', fullName:'Lev Yashin', country:'URSS', flag:'🇷🇺', position:'GK', rating:93, era:'1960s', rarity:'epic', category:'goalkeeper', initials:'LY', cardColor:'#1a1a1a' },
  { id:'p19', name:'ROBERTO CARLOS', fullName:'Roberto Carlos', country:'Brasil', flag:'🇧🇷', position:'LB', rating:93, era:'2000s', rarity:'epic', category:'defender', initials:'RC', cardColor:'#3a5a1a' },
  { id:'p20', name:'CAFU', fullName:'Cafu', country:'Brasil', flag:'🇧🇷', position:'RB', rating:93, era:'2000s', rarity:'epic', category:'defender', initials:'CF', cardColor:'#3a5a1a' },
  { id:'p21', name:'MODRIC', fullName:'Luka Modrić', country:'Croacia', flag:'🇭🇷', position:'CM', rating:93, era:'2010s', rarity:'epic', category:'midfielder', initials:'LM', cardColor:'#5a1a3a' },
  { id:'p22', name:'NEYMAR', fullName:'Neymar Jr', country:'Brasil', flag:'🇧🇷', position:'LW', rating:92, era:'2010s', rarity:'epic', category:'forward', initials:'NJ', cardColor:'#3a4a1a' },
  { id:'p23', name:'LEWANDOWSKI', fullName:'Robert Lewandowski', country:'Polonia', flag:'🇵🇱', position:'ST', rating:92, era:'2010s', rarity:'epic', category:'forward', initials:'RL', cardColor:'#5a3a1a' },
  { id:'p24', name:'SALAH', fullName:'Mohamed Salah', country:'Egipto', flag:'🇪🇬', position:'RW', rating:92, era:'2010s', rarity:'epic', category:'forward', initials:'MS', cardColor:'#5a2a1a' },
  { id:'p25', name:'DE BRUYNE', fullName:'Kevin De Bruyne', country:'Bélgica', flag:'🇧🇪', position:'CM', rating:92, era:'2010s', rarity:'epic', category:'midfielder', initials:'KD', cardColor:'#1a2a5a' },
  { id:'p43', name:'MBAPPÉ', fullName:'Kylian Mbappé', country:'Francia', flag:'🇫🇷', position:'ST', rating:95, era:'2020s', rarity:'epic', category:'forward', initials:'KM', cardColor:'#1a1a5a' },

  // RARE (17) — rating 85-91
  { id:'p26', name:'EUSÉBIO', fullName:'Eusébio', country:'Portugal', flag:'🇵🇹', position:'ST', rating:91, era:'1960s', rarity:'rare', category:'forward', initials:'EU', cardColor:'#4a1a1a' },
  { id:'p27', name:'ROMÁRIO', fullName:'Romário', country:'Brasil', flag:'🇧🇷', position:'ST', rating:91, era:'1990s', rarity:'rare', category:'forward', initials:'RO', cardColor:'#3a5a1a' },
  { id:'p28', name:'GEORGE BEST', fullName:'George Best', country:'Irlanda del Norte', flag:'🇬🇧', position:'RW', rating:90, era:'1960s', rarity:'rare', category:'forward', initials:'GB', cardColor:'#5a3a1a' },
  { id:'p29', name:'IBRAHIMOVIĆ', fullName:'Zlatan Ibrahimović', country:'Suecia', flag:'🇸🇪', position:'ST', rating:90, era:'2010s', rarity:'rare', category:'forward', initials:'ZI', cardColor:'#3a1a5a' },
  { id:'p30', name:'KANTÉ', fullName:"N'Golo Kanté", country:'Francia', flag:'🇫🇷', position:'CM', rating:90, era:'2010s', rarity:'rare', category:'midfielder', initials:'NK', cardColor:'#1a3a5a' },
  { id:'p31', name:'KAKÁ', fullName:'Kaká', country:'Brasil', flag:'🇧🇷', position:'CAM', rating:90, era:'2000s', rarity:'rare', category:'midfielder', initials:'KK', cardColor:'#3a5a1a' },
  { id:'p32', name:'DROGBA', fullName:'Didier Drogba', country:'Costa de Marfil', flag:'🇨🇮', position:'ST', rating:89, era:'2000s', rarity:'rare', category:'forward', initials:'DD', cardColor:'#5a3a1a' },
  { id:'p33', name:'ROONEY', fullName:'Wayne Rooney', country:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'CF', rating:88, era:'2000s', rarity:'rare', category:'forward', initials:'WR', cardColor:'#5a1a1a' },
  { id:'p34', name:'RAÚL', fullName:'Raúl González', country:'España', flag:'🇪🇸', position:'CF', rating:88, era:'2000s', rarity:'rare', category:'forward', initials:'RG', cardColor:'#5a1a1a' },
  { id:'p35', name:'RIVALDO', fullName:'Rivaldo', country:'Brasil', flag:'🇧🇷', position:'CAM', rating:88, era:'2000s', rarity:'rare', category:'midfielder', initials:'RV', cardColor:'#3a5a1a' },
  { id:'p36', name:'BECKHAM', fullName:'David Beckham', country:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'RM', rating:87, era:'2000s', rarity:'rare', category:'midfielder', initials:'DB', cardColor:'#5a1a1a' },
  { id:'p37', name:'AGÜERO', fullName:'Sergio Agüero', country:'Argentina', flag:'🇦🇷', position:'ST', rating:87, era:'2010s', rarity:'rare', category:'forward', initials:'SA', cardColor:'#1a3a6e' },
  { id:'p38', name:'HAZARD', fullName:'Eden Hazard', country:'Bélgica', flag:'🇧🇪', position:'LW', rating:87, era:'2010s', rarity:'rare', category:'forward', initials:'EH', cardColor:'#1a2a5a' },
  { id:'p39', name:'VIEIRA', fullName:'Patrick Vieira', country:'Francia', flag:'🇫🇷', position:'CM', rating:86, era:'2000s', rarity:'rare', category:'midfielder', initials:'PV', cardColor:'#1a1a5a' },
  { id:'p40', name:'DEL PIERO', fullName:'Alessandro Del Piero', country:'Italia', flag:'🇮🇹', position:'CF', rating:86, era:'2000s', rarity:'rare', category:'forward', initials:'DP', cardColor:'#1a1a5a' },
  { id:'p41', name:'SHEVCHENKO', fullName:'Andriy Shevchenko', country:'Ucrania', flag:'🇺🇦', position:'ST', rating:86, era:'2000s', rarity:'rare', category:'forward', initials:'AS', cardColor:'#4a4a1a' },
  { id:'p42', name:'HAALAND', fullName:'Erling Haaland', country:'Noruega', flag:'🇳🇴', position:'ST', rating:85, era:'2020s', rarity:'rare', category:'forward', initials:'EH', cardColor:'#1a4a6e' },

  // COMMON (17) — rating 75-85
  { id:'p44', name:'NEUER', fullName:'Manuel Neuer', country:'Alemania', flag:'🇩🇪', position:'GK', rating:85, era:'2010s', rarity:'common', category:'goalkeeper', initials:'MN', cardColor:'#1a1a3a' },
  { id:'p45', name:'CASILLAS', fullName:'Iker Casillas', country:'España', flag:'🇪🇸', position:'GK', rating:84, era:'2010s', rarity:'common', category:'goalkeeper', initials:'IC', cardColor:'#5a1a1a' },
  { id:'p46', name:'OWEN', fullName:'Michael Owen', country:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'ST', rating:83, era:'2000s', rarity:'common', category:'forward', initials:'MO', cardColor:'#5a1a1a' },
  { id:'p47', name:"ETO'O", fullName:"Samuel Eto'o", country:'Camerún', flag:'🇨🇲', position:'ST', rating:83, era:'2000s', rarity:'common', category:'forward', initials:'SE', cardColor:'#2a4a1a' },
  { id:'p48', name:'TORRES', fullName:'Fernando Torres', country:'España', flag:'🇪🇸', position:'ST', rating:83, era:'2000s', rarity:'common', category:'forward', initials:'FT', cardColor:'#5a1a1a' },
  { id:'p49', name:'GERRARD', fullName:'Steven Gerrard', country:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'CM', rating:83, era:'2000s', rarity:'common', category:'midfielder', initials:'SG', cardColor:'#5a1a1a' },
  { id:'p50', name:'LAMPARD', fullName:'Frank Lampard', country:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'CM', rating:82, era:'2000s', rarity:'common', category:'midfielder', initials:'FL', cardColor:'#1a1a5a' },
  { id:'p51', name:'XABI ALONSO', fullName:'Xabi Alonso', country:'España', flag:'🇪🇸', position:'CM', rating:82, era:'2000s', rarity:'common', category:'midfielder', initials:'XA', cardColor:'#5a1a1a' },
  { id:'p52', name:'PUYOL', fullName:'Carles Puyol', country:'España', flag:'🇪🇸', position:'CB', rating:82, era:'2000s', rarity:'common', category:'defender', initials:'CP', cardColor:'#5a1a1a' },
  { id:'p53', name:'SEEDORF', fullName:'Clarence Seedorf', country:'Países Bajos', flag:'🇳🇱', position:'CM', rating:82, era:'2000s', rarity:'common', category:'midfielder', initials:'CS', cardColor:'#5a1a1a' },
  { id:'p54', name:'ADRIANO', fullName:'Adriano Leite', country:'Brasil', flag:'🇧🇷', position:'ST', rating:81, era:'2000s', rarity:'common', category:'forward', initials:'AD', cardColor:'#3a4a1a' },
  { id:'p55', name:'TOTTI', fullName:'Francesco Totti', country:'Italia', flag:'🇮🇹', position:'CF', rating:81, era:'2000s', rarity:'common', category:'forward', initials:'FT', cardColor:'#5a1a1a' },
  { id:'p56', name:'PIQUÉ', fullName:'Gerard Piqué', country:'España', flag:'🇪🇸', position:'CB', rating:80, era:'2010s', rarity:'common', category:'defender', initials:'GP', cardColor:'#5a1a1a' },
  { id:'p57', name:'PIRLO', fullName:'Andrea Pirlo', country:'Italia', flag:'🇮🇹', position:'CM', rating:80, era:'2010s', rarity:'common', category:'midfielder', initials:'AP', cardColor:'#1a1a5a' },
  { id:'p58', name:'CANNAVARO', fullName:'Fabio Cannavaro', country:'Italia', flag:'🇮🇹', position:'CB', rating:79, era:'2000s', rarity:'common', category:'defender', initials:'FC', cardColor:'#1a1a5a' },
  { id:'p59', name:'VAN DIJK', fullName:'Virgil van Dijk', country:'Países Bajos', flag:'🇳🇱', position:'CB', rating:78, era:'2010s', rarity:'common', category:'defender', initials:'VD', cardColor:'#5a1a1a' },
  { id:'p60', name:'SCHMEICHEL', fullName:'Peter Schmeichel', country:'Dinamarca', flag:'🇩🇰', position:'GK', rating:77, era:'1990s', rarity:'common', category:'goalkeeper', initials:'PS', cardColor:'#5a1a1a' },
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
