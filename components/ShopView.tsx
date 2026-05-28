'use client';
import { motion } from 'framer-motion';

interface Props {
  coins: number;
  onBuy: (packType: 'intermediate' | 'premium') => void;
}

const packs = [
  {
    type: 'intermediate' as const,
    name: 'INTERMEDIO',
    desc: 'Mejores chances de raras',
    cost: 100,
    odds: [
      { label: 'Común',      pct: '35%', color: '#888' },
      { label: 'Rara',       pct: '40%', color: '#38bdf8' },
      { label: 'Épica',      pct: '20%', color: '#a855f7' },
      { label: 'Legendaria', pct: '5%',  color: '#f59e0b' },
    ],
    // envelope colors
    envTop:    '#0e3a5a',
    envBody:   'linear-gradient(160deg, #071828 0%, #0a2236 60%, #0e3252 100%)',
    envFold:   '#0a2a42',
    envBorder: '#1a5a8a',
    envShine:  'rgba(56,189,248,0.15)',
    envGlow:   '0 0 30px rgba(56,189,248,0.12)',
    accentColor: '#38bdf8',
    btnBg:     'linear-gradient(135deg, #0e3a5a, #0e5a8a)',
    btnBorder: '#1a7abf',
    symbol:    '◈',
    symbolColor: '#38bdf8',
    stars: 3,
  },
  {
    type: 'premium' as const,
    name: 'PREMIUM',
    desc: 'Épicas y legendarias garantizadas',
    cost: 250,
    odds: [
      { label: 'Común',      pct: '20%', color: '#888' },
      { label: 'Rara',       pct: '30%', color: '#38bdf8' },
      { label: 'Épica',      pct: '35%', color: '#a855f7' },
      { label: 'Legendaria', pct: '15%', color: '#f59e0b' },
    ],
    envTop:    '#4a2a00',
    envBody:   'linear-gradient(160deg, #1a0a00 0%, #261400 60%, #3a1e00 100%)',
    envFold:   '#3a2000',
    envBorder: '#8a5a00',
    envShine:  'rgba(245,158,11,0.2)',
    envGlow:   '0 0 40px rgba(245,158,11,0.2)',
    accentColor: '#f59e0b',
    btnBg:     'linear-gradient(135deg, #3a2000, #5a3400)',
    btnBorder: '#8a5a00',
    symbol:    '✦',
    symbolColor: '#f59e0b',
    stars: 5,
  },
];

function EnvelopeCard({ pack, canAfford, onBuy }: {
  pack: typeof packs[0];
  canAfford: boolean;
  onBuy: () => void;
}) {
  const imgSrc = pack.type === 'intermediate' ? '/packs/silver.png' : '/packs/gold.png';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: 'calc(50% - 8px)', maxWidth: '170px' }}>
      {/* Pack image */}
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        animate={{ filter: canAfford
          ? [`drop-shadow(0 0 6px ${pack.accentColor}44)`, `drop-shadow(0 0 16px ${pack.accentColor}88)`, `drop-shadow(0 0 6px ${pack.accentColor}44)`]
          : ['none'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={canAfford ? onBuy : undefined}
        style={{
          width: '100%',
          cursor: canAfford ? 'pointer' : 'default',
          position: 'relative',
        }}
      >
        {/* Shine sweep */}
        <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
          <img
            src={imgSrc}
            alt={pack.type === 'intermediate' ? 'Silver Pack' : 'Gold Pack'}
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '8px',
              filter: canAfford ? 'none' : 'grayscale(0.6) brightness(0.5)',
            }}
          />
          {/* Shine animation */}
          <motion.div
            animate={{ x: ['-150%', '150%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)`,
            }}
          />
          {!canAfford && (
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '8px',
              background: 'rgba(0,0,0,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: '12px', color: '#666', fontWeight: '700', textAlign: 'center' }}>
                🔒<br />{pack.cost} 🪙
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Odds */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
        {pack.odds.map(o => (
          <div key={o.label} style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '9px', padding: '2px 6px',
            background: 'rgba(255,255,255,0.04)', borderRadius: '4px',
          }}>
            <span style={{ color: '#666' }}>{o.label}</span>
            <span style={{ color: o.color, fontWeight: '700' }}>{o.pct}</span>
          </div>
        ))}
      </div>

      {/* Price + buy button */}
      <motion.button
        whileTap={canAfford ? { scale: 0.94 } : {}}
        onClick={canAfford ? onBuy : undefined}
        style={{
          width: '100%',
          background: canAfford ? pack.btnBg : '#111',
          border: `1px solid ${canAfford ? pack.btnBorder : '#222'}`,
          borderRadius: '10px', padding: '0',
          cursor: canAfford ? 'pointer' : 'not-allowed',
          fontSize: '12px', fontWeight: '800',
          color: canAfford ? pack.accentColor : '#444',
          textAlign: 'center',
          minHeight: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {canAfford ? `${pack.cost} 🪙` : `Faltan ${pack.cost} 🪙`}
      </motion.button>
    </div>
  );
}

export default function ShopView({ coins, onBuy }: Props) {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em' }}>
          TIENDA
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>
          Gastá tus monedas en sobres mejores
        </p>
      </div>

      {/* Pack cards side by side */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
        {packs.map(pack => (
          <EnvelopeCard
            key={pack.type}
            pack={pack}
            canAfford={coins >= pack.cost}
            onBuy={() => onBuy(pack.type)}
          />
        ))}
      </div>

      {/* How to earn */}
      <div style={{
        background: '#0d0d18', border: '1px solid #1a1a28',
        borderRadius: '16px', padding: '18px',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#aaa', marginBottom: '10px' }}>
          🪙 Cómo ganar monedas
        </div>
        {[
          { text: 'Por misión completada', coins: '+8' },
          { text: 'Al completar el día', coins: '+20' },
          { text: 'Misión fruta (×2)', coins: '+16' },
          { text: 'Al subir de nivel', coins: '+50' },
        ].map(row => (
          <div key={row.text} style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '12px', padding: '5px 0',
            borderBottom: '1px solid #111',
          }}>
            <span style={{ color: '#666' }}>{row.text}</span>
            <span style={{ color: '#f59e0b', fontWeight: '700' }}>{row.coins} 🪙</span>
          </div>
        ))}
      </div>
    </div>
  );
}
