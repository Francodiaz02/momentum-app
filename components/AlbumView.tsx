'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_STICKERS, RARITY_CONFIG, StickerCategory, StickerDef } from '@/lib/stickers';

interface OwnedSticker {
  stickerId: string;
  count: number;
}

interface Props {
  ownedStickers: OwnedSticker[];
}

type Tab = 'all' | StickerCategory;

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'mindset', label: 'Mindset' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'english', label: 'Inglés' },
  { id: 'discipline', label: 'Disciplina' },
  { id: 'energy', label: 'Energía' },
];

export default function AlbumView({ ownedStickers }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selected, setSelected] = useState<StickerDef | null>(null);

  const ownedMap = new Map(ownedStickers.map(o => [o.stickerId, o.count]));
  const ownedCount = ownedStickers.filter(o => o.count > 0).length;

  const filtered = activeTab === 'all'
    ? ALL_STICKERS
    : ALL_STICKERS.filter(s => s.category === activeTab);

  return (
    <div>
      {/* Header progress */}
      <div style={{
        background: '#0d0d18', border: '1px solid #161628',
        borderRadius: '16px', padding: '16px 18px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#fff' }}>
            Mi Álbum
          </span>
          <span style={{ fontSize: '13px', color: '#a855f7', fontWeight: '700' }}>
            {ownedCount}<span style={{ color: '#444' }}>/60</span>
          </span>
        </div>
        <div style={{ background: '#111', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${(ownedCount / 60) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              height: '100%', borderRadius: '6px',
              background: 'linear-gradient(90deg, #a855f7, #6366f1)',
              boxShadow: '0 0 8px rgba(168,85,247,0.4)',
            }}
          />
        </div>
        <div style={{ fontSize: '11px', color: '#444', marginTop: '6px' }}>
          {60 - ownedCount} figuritas por descubrir
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flexShrink: 0,
              padding: '6px 12px',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              border: activeTab === tab.id ? 'none' : '1px solid #1a1a28',
              borderRadius: '20px', cursor: 'pointer',
              color: activeTab === tab.id ? '#000' : '#555',
              fontSize: '11px', fontWeight: '700',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sticker grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px', marginBottom: '16px',
      }}>
        {filtered.map((sticker, i) => {
          const count = ownedMap.get(sticker.id) ?? 0;
          const isOwned = count > 0;
          const cfg = RARITY_CONFIG[sticker.rarity];
          const num = ALL_STICKERS.findIndex(s => s.id === sticker.id) + 1;

          return (
            <motion.div
              key={sticker.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              onClick={() => isOwned && setSelected(sticker)}
              style={{
                background: isOwned ? cfg.bg : '#0d0d14',
                border: `1.5px solid ${isOwned ? cfg.border : '#1a1a24'}`,
                borderRadius: '12px',
                padding: '12px 8px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '5px',
                cursor: isOwned ? 'pointer' : 'default',
                boxShadow: isOwned ? cfg.glow : 'none',
                filter: isOwned ? 'none' : 'grayscale(1)',
                opacity: isOwned ? 1 : 0.3,
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: '6px', left: '7px',
                fontSize: '8px', color: '#444', fontWeight: '700',
              }}>
                #{String(num).padStart(2, '0')}
              </div>
              {count > 1 && (
                <div style={{
                  position: 'absolute', top: '4px', right: '6px',
                  background: '#333', borderRadius: '6px',
                  padding: '1px 5px', fontSize: '8px', fontWeight: '800', color: '#aaa',
                }}>
                  ×{count}
                </div>
              )}
              <div style={{ fontSize: '28px', lineHeight: 1, marginTop: '8px' }}>
                {isOwned ? sticker.icon : '❓'}
              </div>
              <div style={{ fontSize: '9px', fontWeight: '700', color: isOwned ? '#ddd' : '#666', textAlign: 'center', lineHeight: '1.25' }}>
                {sticker.name}
              </div>
              <div style={{
                background: cfg.color + (isOwned ? '22' : '11'),
                borderRadius: '4px', padding: '1px 5px',
                fontSize: '7px', fontWeight: '800',
                color: isOwned ? cfg.color : '#333',
              }}>
                {cfg.label.toUpperCase()}
              </div>
              {isOwned && (sticker.rarity === 'epic' || sticker.rarity === 'legendary') && (
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '12px',
                    boxShadow: cfg.glow, pointerEvents: 'none',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Detail popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 400, padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: RARITY_CONFIG[selected.rarity].bg,
                border: `2px solid ${RARITY_CONFIG[selected.rarity].border}`,
                borderRadius: '20px', padding: '32px 24px',
                textAlign: 'center', maxWidth: '260px', width: '100%',
                boxShadow: RARITY_CONFIG[selected.rarity].glow,
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>{selected.icon}</div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff', marginBottom: '4px' }}>{selected.name}</div>
              <div style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>{selected.subtitle}</div>
              <div style={{
                display: 'inline-block',
                background: RARITY_CONFIG[selected.rarity].color + '22',
                border: `1px solid ${RARITY_CONFIG[selected.rarity].color}55`,
                borderRadius: '8px', padding: '4px 14px',
                fontSize: '11px', fontWeight: '800',
                color: RARITY_CONFIG[selected.rarity].color,
                marginBottom: '16px',
              }}>
                {RARITY_CONFIG[selected.rarity].label.toUpperCase()}
              </div>
              <div style={{ fontSize: '12px', color: '#555' }}>
                {selected.category.charAt(0).toUpperCase() + selected.category.slice(1)}
              </div>
              <div style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>
                En colección: {ownedMap.get(selected.id) ?? 0}×
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  marginTop: '20px', background: 'none',
                  border: '1px solid #333', borderRadius: '10px',
                  padding: '8px 20px', color: '#666',
                  cursor: 'pointer', fontSize: '13px',
                }}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
