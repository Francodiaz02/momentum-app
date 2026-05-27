'use client';
import { motion } from 'framer-motion';

interface Props {
  coins: number;
  onBuy: (packType: 'intermediate' | 'premium') => void;
}

export default function ShopView({ coins, onBuy }: Props) {
  const packs = [
    {
      type: 'intermediate' as const,
      icon: '📦',
      name: 'SOBRE INTERMEDIO',
      desc: 'Mejores probabilidades de raras',
      odds: 'Común 35% · Rara 40% · Épica 20% · Legendaria 5%',
      cost: 100,
      bg: '#06111a',
      border: '#0e3a5a',
      btnBg: 'linear-gradient(135deg, #0e2a3a, #0e3f5a)',
      btnBorder: '#0e5a8a',
      btnColor: '#38bdf8',
      glow: 'none',
      badge: null,
    },
    {
      type: 'premium' as const,
      icon: '✨',
      name: 'SOBRE PREMIUM',
      desc: 'Máxima rareza garantizada',
      odds: 'Común 20% · Rara 30% · Épica 35% · Legendaria 15%',
      cost: 250,
      bg: '#0e0816',
      border: '#7a5500',
      btnBg: 'linear-gradient(135deg, #1a1200, #2a1e00)',
      btnBorder: '#8a6500',
      btnColor: '#f59e0b',
      glow: '0 0 20px rgba(245,158,11,0.15)',
      badge: 'PREMIUM',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em' }}>
          TIENDA
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>
          Gastá tus monedas en sobres mejores
        </p>
      </div>

      {packs.map(pack => {
        const canAfford = coins >= pack.cost;
        return (
          <motion.div
            key={pack.type}
            style={{
              background: pack.bg,
              border: `1px solid ${pack.border}`,
              borderRadius: '18px',
              padding: '20px',
              marginBottom: '14px',
              position: 'relative',
              boxShadow: pack.glow,
            }}
          >
            {pack.badge && (
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                background: '#f59e0b', borderRadius: '6px',
                padding: '2px 8px', fontSize: '9px', fontWeight: '900', color: '#000',
                letterSpacing: '0.08em',
              }}>
                {pack.badge}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '32px', flexShrink: 0 }}>{pack.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '900', color: '#fff', marginBottom: '4px', letterSpacing: '0.04em' }}>
                  {pack.name}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{pack.desc}</div>
                <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.5' }}>{pack.odds}</div>
              </div>
            </div>

            <motion.button
              whileTap={canAfford ? { scale: 0.95 } : {}}
              onClick={() => canAfford && onBuy(pack.type)}
              style={{
                width: '100%',
                background: canAfford ? pack.btnBg : '#111',
                border: `1px solid ${canAfford ? pack.btnBorder : '#222'}`,
                borderRadius: '12px', padding: '12px',
                cursor: canAfford ? 'pointer' : 'not-allowed',
                fontSize: '13px', fontWeight: '800',
                color: canAfford ? pack.btnColor : '#444',
                transition: 'all 0.2s',
              }}
            >
              {canAfford
                ? `Comprar — ${pack.cost} 🪙`
                : `Necesitás ${pack.cost} 🪙`}
            </motion.button>
          </motion.div>
        );
      })}

      {/* How to earn coins */}
      <div style={{
        background: '#0d0d18', border: '1px solid #1a1a28',
        borderRadius: '16px', padding: '18px',
        marginTop: '8px',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>
          ¿Cómo ganar monedas?
        </div>
        {[
          '+8 🪙 por misión completada',
          '+20 🪙 al completar el día',
          '+16 🪙 misión fruta (×2)',
          '+50 🪙 al subir de nivel',
        ].map(line => (
          <div key={line} style={{ fontSize: '12px', color: '#666', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#333' }}>•</span> {line}
          </div>
        ))}
      </div>
    </div>
  );
}
