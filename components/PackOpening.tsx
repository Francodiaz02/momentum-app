'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_STICKERS, RARITY_CONFIG } from '@/lib/stickers';
import type { PackType } from '@/lib/types';

interface Props {
  pack: string[] | null;
  packType?: PackType;
  onClaim: () => void;
  onClose: () => void;
  ownedStickers: { stickerId: string; count: number }[];
}

export default function PackOpening({ pack, packType = 'free', onClaim, onClose, ownedStickers }: Props) {
  const [opened, setOpened] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!pack) {
      setOpened(false);
      setRevealedCount(0);
      setDone(false);
    }
  }, [pack]);

  const handleOpen = () => {
    setOpened(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setRevealedCount(count);
      if (count >= 5) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
      }
    }, 600);
  };

  if (!pack) return null;

  const stickers = pack.map(id => ALL_STICKERS.find(s => s.id === id)!).filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 500,
          padding: '20px',
        }}
        onClick={e => { if (e.target === e.currentTarget && done) { onClaim(); onClose(); } }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            width: '100%', maxWidth: '380px',
            background: '#0d0d18',
            border: '1px solid #2a2a40',
            borderRadius: '24px',
            padding: '28px 20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: '#444', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
            SOBRE DE FIGURITAS
          </div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff', marginBottom: '24px' }}>
            {!opened ? '¡Nuevo sobre!' : done ? 'Figuritas obtenidas' : 'Revelando...'}
          </div>

          {!opened ? (
            /* Closed pack */
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ marginBottom: '28px' }}
            >
              {(() => {
                const packVisuals = {
                  free:         { bg: 'linear-gradient(160deg, #1a0e00, #2a1800)', border: '#8a5a00', glow: 'rgba(245,158,11,0.25)', color: '#f59e0b', icon: '🎁', label: 'SOBRE GRATIS' },
                  intermediate: { bg: 'linear-gradient(160deg, #001a2a, #00253a)', border: '#0e5a8a', glow: 'rgba(56,189,248,0.25)', color: '#38bdf8', icon: '📦', label: 'SOBRE INTER.' },
                  premium:      { bg: 'linear-gradient(160deg, #100822, #180c30)', border: '#7a5a00', glow: 'rgba(245,158,11,0.4)',  color: '#f59e0b', icon: '✨', label: 'SOBRE PREMIUM' },
                };
                const v = packVisuals[packType];
                return (
                  <div style={{
                    width: '140px', height: '190px', margin: '0 auto',
                    background: v.bg,
                    border: `2px solid ${v.border}`,
                    borderRadius: '16px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '12px',
                    boxShadow: `0 0 30px ${v.glow}`,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ fontSize: '40px' }}
                    >
                      {v.icon}
                    </motion.div>
                    <div style={{ fontSize: '10px', color: v.color, fontWeight: '800', letterSpacing: '0.1em', textAlign: 'center', padding: '0 8px' }}>{v.label}</div>
                    <div style={{ fontSize: '10px', color: '#555' }}>5 figuritas</div>
                    {packType === 'premium' && (
                      <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#f59e0b', borderRadius: '4px', padding: '1px 5px', fontSize: '7px', fontWeight: '900', color: '#000' }}>★★★★</div>
                    )}
                    {/* Shimmer */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute', inset: 0, width: '50%',
                        background: `linear-gradient(90deg, transparent, ${v.glow.replace('0.25', '0.12').replace('0.4', '0.15')}, transparent)`,
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            /* Revealed stickers */
            <div style={{
              display: 'flex', gap: '8px', marginBottom: '24px',
              overflowX: 'auto', paddingBottom: '4px',
              justifyContent: revealedCount < 5 ? 'flex-start' : 'center',
            }}>
              {stickers.slice(0, revealedCount).map((sticker, i) => {
                const cfg = RARITY_CONFIG[sticker.rarity];
                const owned = ownedStickers.find(o => o.stickerId === sticker.id);
                const isNew = !owned;
                return (
                  <motion.div
                    key={sticker.id + i}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      minWidth: '68px', width: '68px',
                      background: cfg.bg,
                      border: `1.5px solid ${cfg.border}`,
                      borderRadius: '12px',
                      padding: '10px 6px',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: '5px',
                      boxShadow: cfg.glow,
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    {isNew && (
                      <div style={{
                        position: 'absolute', top: '-6px', right: '-6px',
                        background: '#22c55e', borderRadius: '6px',
                        padding: '1px 5px', fontSize: '8px', fontWeight: '900', color: '#000',
                      }}>
                        NEW
                      </div>
                    )}
                    {!isNew && (
                      <div style={{
                        position: 'absolute', top: '-6px', right: '-6px',
                        background: '#444', borderRadius: '6px',
                        padding: '1px 5px', fontSize: '8px', fontWeight: '900', color: '#ccc',
                      }}>
                        ×{(owned?.count ?? 0) + 1}
                      </div>
                    )}
                    <div style={{ fontSize: '28px', lineHeight: 1 }}>{sticker.icon}</div>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: '1.2' }}>
                      {sticker.name}
                    </div>
                    <div style={{ fontSize: '8px', color: '#666', textAlign: 'center', lineHeight: '1.2' }}>
                      {sticker.subtitle}
                    </div>
                    <div style={{
                      background: cfg.color + '22',
                      border: `1px solid ${cfg.color}44`,
                      borderRadius: '4px', padding: '1px 5px',
                      fontSize: '8px', fontWeight: '800', color: cfg.color,
                      marginTop: '2px',
                    }}>
                      {cfg.label.toUpperCase()}
                    </div>
                    {(sticker.rarity === 'epic' || sticker.rarity === 'legendary') && (
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          position: 'absolute', inset: 0, borderRadius: '12px',
                          boxShadow: cfg.glow,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {!opened && (
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handleOpen}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #92400e, #b45309)',
                border: 'none', borderRadius: '14px',
                padding: '14px', cursor: 'pointer',
                fontSize: '15px', fontWeight: '800', color: '#fff',
                boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
              }}
            >
              ✦ Abrir sobre ✦
            </motion.button>
          )}

          {done && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => { onClaim(); onClose(); }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #14532d, #166534)',
                border: 'none', borderRadius: '14px',
                padding: '14px', cursor: 'pointer',
                fontSize: '15px', fontWeight: '800', color: '#4ade80',
              }}
            >
              Guardar en álbum ✓
            </motion.button>
          )}

          {done && (
            <button
              onClick={() => { onClaim(); onClose(); }}
              style={{
                background: 'none', border: 'none',
                color: '#444', fontSize: '12px', cursor: 'pointer',
                marginTop: '12px',
              }}
            >
              cerrar
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
