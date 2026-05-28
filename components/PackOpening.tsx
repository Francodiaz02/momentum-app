'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_STICKERS, RARITY_CONFIG, StickerDef, CollectibleCategory } from '@/lib/stickers';
import type { PackType } from '@/lib/types';

// Inline rarity styles (same as AlbumView, no shared export needed)
const RARITY_STYLE = {
  common:    { bg: 'linear-gradient(160deg, #0e0e14, #141420)', border: '#2a2a3a', glow: 'none',                             text: '#666',    badge: '#333',   badgeText: '#888' },
  rare:      { bg: 'linear-gradient(160deg, #060e1a, #0a1828)', border: '#1a4a7a', glow: '0 0 12px rgba(56,189,248,0.3)',    text: '#38bdf8', badge: '#0a2a4a',badgeText: '#38bdf8' },
  epic:      { bg: 'linear-gradient(160deg, #0e0618, #180828)', border: '#5a1a9a', glow: '0 0 18px rgba(168,85,247,0.4)',    text: '#a855f7', badge: '#2a0a4a',badgeText: '#a855f7' },
  legendary: { bg: 'linear-gradient(160deg, #160800, #2a1000)', border: '#c07000', glow: '0 0 24px rgba(245,158,11,0.5)',    text: '#f59e0b', badge: '#3a1a00',badgeText: '#f59e0b' },
};

const CAT_ICON: Record<CollectibleCategory, string> = {
  warrior: '⚔️',
  beast:   '🐺',
  mystic:  '🔮',
  shadow:  '👤',
  titan:   '🗿',
};

interface Props {
  pack: string[] | null;
  packType?: PackType;
  onClaim: () => void;
  onClose: () => void;
  ownedStickers: { stickerId: string; count: number }[];
}

function CardReveal({ sticker, index, isNew }: { sticker: StickerDef; index: number; isNew: boolean }) {
  const rs = RARITY_STYLE[sticker.rarity];
  const cfg = RARITY_CONFIG[sticker.rarity];
  const isLegendary = sticker.rarity === 'legendary';
  const isEpic = sticker.rarity === 'epic';

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      {/* Legendary flash particles */}
      {isLegendary && (
        <>
          {[...Array(6)].map((_, pi) => (
            <motion.div
              key={pi}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (pi % 2 === 0 ? 1 : -1) * (20 + pi * 8)],
                y: [0, -20 - pi * 6],
              }}
              transition={{ duration: 0.8, delay: index * 0.4 + 0.2 + pi * 0.05 }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#f59e0b',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            />
          ))}
        </>
      )}

      <motion.div
        initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.4 }}
        style={{
          width: '80px', height: '120px',
          borderRadius: '12px', overflow: 'hidden',
          position: 'relative',
          border: `1.5px solid ${rs.border}`,
          boxShadow: rs.glow,
          flexShrink: 0,
        }}
      >
        {/* Legendary golden flash overlay */}
        {isLegendary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.6, delay: index * 0.4 + 0.1 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle, rgba(245,158,11,0.8) 0%, transparent 70%)',
              pointerEvents: 'none', zIndex: 10,
              borderRadius: '12px',
            }}
          />
        )}

        {/* NEW / DUP badge */}
        {isNew ? (
          <div style={{
            position: 'absolute', top: '-5px', right: '-5px',
            background: '#22c55e', borderRadius: '6px',
            padding: '1px 5px', fontSize: '7px', fontWeight: '900', color: '#000', zIndex: 15,
          }}>NEW</div>
        ) : (
          <div style={{
            position: 'absolute', top: '-5px', right: '-5px',
            background: '#444', borderRadius: '6px',
            padding: '1px 5px', fontSize: '7px', fontWeight: '900', color: '#ccc', zIndex: 15,
          }}>×DUP</div>
        )}

        {sticker.imagePath ? (
          /* Image card */
          <>
            <img
              src={sticker.imagePath}
              alt={sticker.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
              padding: '12px 6px 5px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{ fontSize: '8px', fontWeight: '900', color: rs.text, textAlign: 'center' }}>{sticker.name}</div>
              <div style={{ fontSize: '6px', fontWeight: '800', color: rs.badgeText, letterSpacing: '0.08em', marginTop: '2px' }}>
                {cfg.label.toUpperCase()}
              </div>
            </div>
            {/* Legendary shimmer */}
            {isLegendary && (
              <motion.div
                animate={{ x: ['-150%', '150%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(105deg, transparent 30%, rgba(245,158,11,0.25) 50%, transparent 70%)',
                  pointerEvents: 'none', zIndex: 5,
                }}
              />
            )}
          </>
        ) : (
          /* Placeholder card */
          <div style={{
            width: '100%', height: '100%',
            background: rs.bg,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 5px',
          }}>
            <div style={{ fontSize: '7px', fontWeight: '800', color: rs.badgeText, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {cfg.label}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{CAT_ICON[sticker.category]}</div>
              <div style={{ fontSize: '8px', fontWeight: '900', color: rs.text, lineHeight: '1.2', textAlign: 'center' }}>
                {sticker.name}
              </div>
            </div>
            <div style={{ fontSize: '10px', fontWeight: '900', color: rs.text }}>{sticker.power}</div>

            {/* Epic/legendary glow pulse */}
            {(isLegendary || isEpic) && (
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{
                  position: 'absolute', inset: 0, borderRadius: '11px',
                  boxShadow: rs.glow, pointerEvents: 'none',
                }}
              />
            )}

            {/* Legendary shimmer */}
            {isLegendary && (
              <motion.div
                animate={{ x: ['-150%', '150%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(105deg, transparent 30%, rgba(245,158,11,0.2) 50%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
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
    free:         { bg: 'linear-gradient(160deg, #1a0e00, #2a1800)', border: '#8a5a00', glow: 'rgba(245,158,11,0.25)', color: '#f59e0b' },
    intermediate: { bg: 'linear-gradient(160deg, #001a2a, #00253a)', border: '#0e5a8a', glow: 'rgba(56,189,248,0.25)',  color: '#38bdf8' },
    premium:      { bg: 'linear-gradient(160deg, #100822, #180c30)', border: '#7a5a00', glow: 'rgba(245,158,11,0.4)',   color: '#f59e0b' },
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
          background: hasLegendary && done ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.88)',
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
            SOBRE DE COLECCIONABLES
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff', marginBottom: '20px' }}>
            {!opened ? '¡Nuevo sobre!' : done ? 'Coleccionables obtenidos' : 'Revelando...'}
          </div>

          {!opened ? (
            <motion.div
              animate={{ y: [0, -8, 0], filter: [`drop-shadow(0 0 8px ${v.glow})`, `drop-shadow(0 0 20px ${v.glow})`, `drop-shadow(0 0 8px ${v.glow})`] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', position: 'relative' }}
            >
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
            <div style={{
              display: 'flex', gap: '8px', marginBottom: '20px',
              overflowX: 'auto', paddingBottom: '6px',
              justifyContent: revealedCount < 5 ? 'flex-start' : 'center',
            }}>
              {stickers.slice(0, revealedCount).map((sticker, i) => {
                const owned = ownedStickers.find(o => o.stickerId === sticker.id);
                const isNew = !owned;
                return (
                  <CardReveal
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
                background: 'linear-gradient(135deg, #1a0a2e, #2d1b69)',
                border: '1px solid #5a1a9a',
                borderRadius: '14px',
                padding: '0', cursor: 'pointer',
                fontSize: '15px', fontWeight: '800', color: '#c084fc',
                boxShadow: '0 4px 20px rgba(168,85,247,0.3)',
                minHeight: '52px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              🔮 Abrir sobre ✦
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
