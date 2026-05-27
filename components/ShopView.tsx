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
  const W = 160;
  const H = 220;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flex: 1 }}>
      {/* Envelope shape */}
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        animate={{ boxShadow: [pack.envGlow, pack.envGlow.replace('0.2', '0.35').replace('0.12', '0.22'), pack.envGlow] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={canAfford ? onBuy : undefined}
        style={{
          width: `${W}px`, height: `${H}px`,
          position: 'relative',
          cursor: canAfford ? 'pointer' : 'default',
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1.5px solid ${pack.envBorder}`,
          background: pack.envBody,
        }}
      >
        {/* Top flap (envelope fold) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '52px',
          background: pack.envTop,
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          zIndex: 2,
        }} />

        {/* Flap fold line */}
        <div style={{
          position: 'absolute', top: '51px', left: 0, right: 0,
          height: '1px', background: pack.envBorder, zIndex: 3,
          opacity: 0.6,
        }} />

        {/* Shine overlay */}
        <motion.div
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
          style={{
            position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
            background: `linear-gradient(105deg, transparent 30%, ${pack.envShine} 50%, transparent 70%)`,
          }}
        />

        {/* Content area */}
        <div style={{
          position: 'absolute', top: '62px', left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '8px 12px', zIndex: 1,
        }}>
          {/* Main symbol */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '32px', color: pack.symbolColor, marginBottom: '6px', fontWeight: '900' }}
          >
            {pack.symbol}
          </motion.div>

          {/* Pack name */}
          <div style={{
            fontSize: '11px', fontWeight: '900', color: pack.accentColor,
            letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center',
            marginBottom: '4px',
          }}>
            {pack.name}
          </div>

          {/* Stars */}
          <div style={{ fontSize: '9px', color: pack.accentColor, opacity: 0.7, marginBottom: '10px' }}>
            {'★'.repeat(pack.stars)}
          </div>

          {/* Odds mini pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
            {pack.odds.map(o => (
              <div key={o.label} style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '9px', padding: '2px 6px',
                background: 'rgba(0,0,0,0.3)', borderRadius: '4px',
              }}>
                <span style={{ color: '#666' }}>{o.label}</span>
                <span style={{ color: o.color, fontWeight: '700' }}>{o.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom crease lines (envelope detail) */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '36px', zIndex: 1, pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: 0, height: 0,
            borderLeft: `${W/2}px solid transparent`,
            borderRight: '0px solid transparent',
            borderBottom: `36px solid ${pack.envFold}`,
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 0, height: 0,
            borderRight: `${W/2}px solid transparent`,
            borderLeft: '0px solid transparent',
            borderBottom: `36px solid ${pack.envFold}`,
          }} />
        </div>

        {/* Disabled overlay */}
        {!canAfford && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
            zIndex: 10, borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: '11px', color: '#555', fontWeight: '700', textAlign: 'center' }}>
              🔒<br />{pack.cost} 🪙
            </div>
          </div>
        )}
      </motion.div>

      {/* Price + buy button */}
      <motion.button
        whileTap={canAfford ? { scale: 0.94 } : {}}
        onClick={canAfford ? onBuy : undefined}
        style={{
          width: `${W}px`,
          background: canAfford ? pack.btnBg : '#111',
          border: `1px solid ${canAfford ? pack.btnBorder : '#222'}`,
          borderRadius: '10px', padding: '10px 0',
          cursor: canAfford ? 'pointer' : 'not-allowed',
          fontSize: '12px', fontWeight: '800',
          color: canAfford ? pack.accentColor : '#444',
          textAlign: 'center',
        }}
      >
        {canAfford ? `${pack.cost} 🪙` : `Faltan ${pack.cost - 0} 🪙`}
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
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px' }}>
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
