'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_STICKERS, RARITY_CONFIG, StickerDef } from '@/lib/stickers';
import type { PackType } from '@/lib/types';

interface Props {
  pack: string[] | null;
  packType?: PackType;
  onClaim: () => void;
  onClose: () => void;
  ownedStickers: { stickerId: string; count: number }[];
}

function FifaCardReveal({ sticker, index, isNew }: { sticker: StickerDef; index: number; isNew: boolean }) {
  const cfg = RARITY_CONFIG[sticker.rarity];
  const isLegendary = sticker.rarity === 'legendary';
  const isEpic = sticker.rarity === 'epic';

  const avatarBg = {
    common: '#1e2a3a',
    rare: '#0d1f35',
    epic: '#2a0d4a',
    legendary: '#3d2000',
  }[sticker.rarity];

  return (
    <motion.div
      initial={{ rotateY: 90, scale: 0.6, opacity: 0 }}
      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.05 }}
      style={{
        minWidth: '80px',
        width: '80px',
        aspectRatio: '2/3',
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: '12px',
        padding: '8px 6px 6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: cfg.glow,
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* NEW / duplicate badge */}
      {isNew ? (
        <div style={{
          position: 'absolute', top: '-5px', right: '-5px',
          background: '#22c55e', borderRadius: '6px',
          padding: '1px 5px', fontSize: '7px', fontWeight: '900', color: '#000',
          zIndex: 10,
        }}>NEW</div>
      ) : (
        <div style={{
          position: 'absolute', top: '-5px', right: '-5px',
          background: '#444', borderRadius: '6px',
          padding: '1px 5px', fontSize: '7px', fontWeight: '900', color: '#ccc',
          zIndex: 10,
        }}>×DUP</div>
      )}

      {/* Legendary shimmer */}
      {isLegendary && (
        <motion.div
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, transparent 30%, rgba(245,158,11,0.25) 50%, transparent 70%)',
            pointerEvents: 'none', zIndex: 1,
          }}
        />
      )}

      {/* Rating + flag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '2px', zIndex: 2 }}>
        <span style={{ fontSize: '11px', fontWeight: '900', color: cfg.color }}>{sticker.rating}</span>
        <span style={{ fontSize: '10px' }}>{sticker.flag}</span>
      </div>

      {/* Position */}
      <div style={{ fontSize: '7px', fontWeight: '800', color: cfg.color, opacity: 0.8, alignSelf: 'flex-start', marginBottom: '4px', zIndex: 2 }}>
        {sticker.position}
      </div>

      {/* Avatar */}
      <div style={{
        width: '36px', height: '36px',
        borderRadius: '50%',
        background: avatarBg,
        border: `1.5px solid ${cfg.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '4px',
        position: 'relative', zIndex: 2,
        flexShrink: 0,
      }}>
        {isLegendary && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              boxShadow: '0 0 10px rgba(245,158,11,0.8)',
              pointerEvents: 'none',
            }}
          />
        )}
        <span style={{ fontSize: '11px', fontWeight: '900', color: cfg.color }}>{sticker.initials}</span>
      </div>

      {/* Name */}
      <div style={{
        fontSize: '8px', fontWeight: '900', color: cfg.color,
        textAlign: 'center', lineHeight: 1.1, zIndex: 2,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%',
      }}>
        {sticker.name}
      </div>

      {/* Country */}
      <div style={{
        fontSize: '6px', color: '#777', textAlign: 'center',
        marginTop: '2px', zIndex: 2,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%',
      }}>
        {sticker.country}
      </div>

      {/* Rarity */}
      <div style={{
        marginTop: '3px',
        background: cfg.color + '22',
        border: `1px solid ${cfg.color}44`,
        borderRadius: '4px', padding: '1px 5px',
        fontSize: '6px', fontWeight: '800', color: cfg.color,
        zIndex: 2,
      }}>
        {cfg.label.toUpperCase()}
      </div>

      {/* Epic/legendary glow */}
      {(isLegendary || isEpic) && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '12px',
            boxShadow: cfg.glow,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
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
  const hasLegendary = stickers.some(s => s.rarity === 'legendary');

  const packVisuals = {
    free:         { bg: 'linear-gradient(160deg, #1a0e00, #2a1800)', border: '#8a5a00', glow: 'rgba(245,158,11,0.25)', color: '#f59e0b', label: 'SILVER', labelColor: '#f59e0b' },
    intermediate: { bg: 'linear-gradient(160deg, #001a2a, #00253a)', border: '#0e5a8a', glow: 'rgba(56,189,248,0.25)', color: '#38bdf8', label: 'SILVER', labelColor: '#38bdf8' },
    premium:      { bg: 'linear-gradient(160deg, #100822, #180c30)', border: '#7a5a00', glow: 'rgba(245,158,11,0.4)',  color: '#f59e0b', label: 'GOLD',   labelColor: '#f59e0b' },
  };
  const v = packVisuals[packType];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0,
          background: hasLegendary && done
            ? 'rgba(0,0,0,0.92)'
            : 'rgba(0,0,0,0.88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 500,
          paddingTop: 'env(safe-area-inset-top, 20px)',
          paddingBottom: 'env(safe-area-inset-bottom, 20px)',
          overflowY: 'auto',
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
            padding: '24px 16px 20px',
            textAlign: 'center',
            margin: '20px 16px',
          }}
        >
          <div style={{ fontSize: '11px', color: '#444', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
            SOBRE DE JUGADORES
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff', marginBottom: '20px' }}>
            {!opened ? '¡Nuevo sobre!' : done ? 'Jugadores obtenidos' : 'Revelando...'}
          </div>

          {!opened ? (
            /* Closed pack — real image */
            <motion.div
              animate={{ y: [0, -8, 0], filter: [`drop-shadow(0 0 8px ${v.glow})`, `drop-shadow(0 0 20px ${v.glow})`, `drop-shadow(0 0 8px ${v.glow})`] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', position: 'relative' }}
            >
              {/* Shine sweep on image */}
              <div style={{ position: 'relative', width: '180px' }}>
                <img
                  src={packType === 'premium' ? '/packs/gold.png' : '/packs/silver.png'}
                  alt={packType === 'premium' ? 'Gold Pack' : 'Silver Pack'}
                  style={{ width: '100%', display: 'block', borderRadius: '10px' }}
                />
                <motion.div
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                  style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '10px', overflow: 'hidden',
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                  }}
                />
              </div>
            </motion.div>
          ) : (
            /* Revealed stickers */
            <div style={{
              display: 'flex', gap: '8px', marginBottom: '20px',
              overflowX: 'auto', paddingBottom: '6px',
              justifyContent: revealedCount < 5 ? 'flex-start' : 'center',
            }}>
              {stickers.slice(0, revealedCount).map((sticker, i) => {
                const owned = ownedStickers.find(o => o.stickerId === sticker.id);
                const isNew = !owned;
                return (
                  <FifaCardReveal
                    key={sticker.id + i}
                    sticker={sticker}
                    index={i}
                    isNew={isNew}
                  />
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
                padding: '0', cursor: 'pointer',
                fontSize: '15px', fontWeight: '800', color: '#fff',
                boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                minHeight: '52px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ⚽ Abrir sobre ✦
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
                padding: '0', cursor: 'pointer',
                fontSize: '15px', fontWeight: '800', color: '#4ade80',
                minHeight: '52px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                marginTop: '12px', minHeight: '36px',
                display: 'block', width: '100%',
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
