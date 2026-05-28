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
  { id: 'all', label: 'Todo' },
  { id: 'goalkeeper', label: 'Porteros' },
  { id: 'defender', label: 'Defensas' },
  { id: 'midfielder', label: 'Mediocampistas' },
  { id: 'forward', label: 'Delanteros' },
];

function FifaCard({ sticker, isOwned, count }: { sticker: StickerDef; isOwned: boolean; count: number }) {
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
    <div style={{
      background: isOwned ? cfg.bg : 'linear-gradient(160deg, #0a0a0f 0%, #0f0f18 100%)',
      border: `1.5px solid ${isOwned ? cfg.border : '#1a1a24'}`,
      borderRadius: '10px',
      aspectRatio: '2/3',
      display: 'flex',
      flexDirection: 'column',
      padding: '6px 5px 5px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isOwned ? cfg.glow : 'none',
      opacity: isOwned ? 1 : 0.22,
    }}>
      {/* Legendary glow animation */}
      {isOwned && isLegendary && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0,
            boxShadow: '0 0 20px rgba(245,158,11,0.6)',
            borderRadius: '10px',
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Epic glow */}
      {isOwned && isEpic && (
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0,
            boxShadow: '0 0 14px rgba(192,132,252,0.5)',
            borderRadius: '10px',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Rating + flag row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
        <span style={{
          fontSize: '13px', fontWeight: '900', lineHeight: 1,
          color: isOwned ? cfg.color : '#333',
        }}>
          {isOwned ? sticker.rating : '??'}
        </span>
        <span style={{ fontSize: '12px', lineHeight: 1 }}>{isOwned ? sticker.flag : ''}</span>
      </div>

      {/* Position */}
      <div style={{
        fontSize: '8px', fontWeight: '800', color: isOwned ? cfg.color : '#333',
        letterSpacing: '0.05em', marginBottom: '4px', opacity: 0.8,
      }}>
        {isOwned ? sticker.position : '—'}
      </div>

      {/* Avatar circle */}
      <div style={{
        width: '44px', height: '44px',
        borderRadius: '50%',
        background: isOwned ? avatarBg : '#111',
        border: `1.5px solid ${isOwned ? cfg.border : '#1a1a24'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 4px',
        flexShrink: 0,
        position: 'relative',
      }}>
        {isOwned && isLegendary && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              boxShadow: '0 0 12px rgba(245,158,11,0.7)',
              pointerEvents: 'none',
            }}
          />
        )}
        <span style={{
          fontSize: '13px', fontWeight: '900',
          color: isOwned ? cfg.color : '#333',
          letterSpacing: '-0.02em',
        }}>
          {isOwned ? sticker.initials : '?'}
        </span>
      </div>

      {/* Name */}
      <div style={{
        fontSize: '9px', fontWeight: '900',
        color: isOwned ? cfg.color : '#333',
        textAlign: 'center',
        letterSpacing: '0.03em',
        lineHeight: 1.1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
      }}>
        {isOwned ? sticker.name : '???'}
      </div>

      {/* Full name */}
      {isOwned && (
        <div style={{
          fontSize: '7px', color: '#aaa', textAlign: 'center',
          marginTop: '1px', lineHeight: 1.1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          width: '100%',
        }}>
          {sticker.fullName}
        </div>
      )}

      {/* Country + position tag */}
      {isOwned && (
        <div style={{
          fontSize: '6px', color: '#777', textAlign: 'center',
          marginTop: '2px', lineHeight: 1,
        }}>
          {sticker.country} • {sticker.position}
        </div>
      )}

      {/* Duplicate count badge */}
      {count > 1 && (
        <div style={{
          position: 'absolute', top: '4px', right: '4px',
          background: '#333', borderRadius: '5px',
          padding: '1px 4px', fontSize: '7px', fontWeight: '800', color: '#aaa',
        }}>
          ×{count}
        </div>
      )}
    </div>
  );
}

function FifaCardLarge({ sticker, ownedCount }: { sticker: StickerDef; ownedCount: number }) {
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
    <div style={{
      background: cfg.bg,
      border: `2px solid ${cfg.border}`,
      borderRadius: '16px',
      width: '200px',
      maxWidth: '80vw',
      padding: '16px 14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: cfg.glow,
    }}>
      {isLegendary && (
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0,
            boxShadow: '0 0 30px rgba(245,158,11,0.6)',
            borderRadius: '16px',
            pointerEvents: 'none',
          }}
        />
      )}
      {isEpic && (
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0,
            boxShadow: '0 0 20px rgba(192,132,252,0.5)',
            borderRadius: '16px',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Rating + flag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
        <span style={{ fontSize: '28px', fontWeight: '900', color: cfg.color }}>{sticker.rating}</span>
        <span style={{ fontSize: '24px' }}>{sticker.flag}</span>
      </div>

      {/* Position */}
      <div style={{ fontSize: '12px', fontWeight: '800', color: cfg.color, opacity: 0.8, alignSelf: 'flex-start', marginBottom: '10px' }}>
        {sticker.position}
      </div>

      {/* Avatar */}
      <div style={{
        width: '80px', height: '80px',
        borderRadius: '50%',
        background: avatarBg,
        border: `2px solid ${cfg.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '12px',
        position: 'relative',
      }}>
        {isLegendary && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              boxShadow: '0 0 20px rgba(245,158,11,0.8)',
              pointerEvents: 'none',
            }}
          />
        )}
        <span style={{ fontSize: '24px', fontWeight: '900', color: cfg.color }}>{sticker.initials}</span>
      </div>

      {/* Name */}
      <div style={{ fontSize: '18px', fontWeight: '900', color: cfg.color, letterSpacing: '0.04em', textAlign: 'center' }}>
        {sticker.name}
      </div>
      <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px', textAlign: 'center' }}>{sticker.fullName}</div>
      <div style={{ fontSize: '10px', color: '#666', marginTop: '4px', textAlign: 'center' }}>
        {sticker.country} • {sticker.position}
      </div>

      {/* Rarity badge */}
      <div style={{
        marginTop: '10px',
        background: cfg.color + '22',
        border: `1px solid ${cfg.color}55`,
        borderRadius: '8px', padding: '3px 12px',
        fontSize: '10px', fontWeight: '800',
        color: cfg.color,
      }}>
        {cfg.label.toUpperCase()} • {sticker.era}
      </div>

      <div style={{ fontSize: '11px', color: '#444', marginTop: '8px' }}>
        En colección: {ownedCount}×
      </div>
    </div>
  );
}

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
        borderRadius: '16px', padding: '14px 16px', marginBottom: '14px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#fff' }}>
            Mi Álbum
          </span>
          <span style={{ fontSize: '13px', color: '#a855f7', fontWeight: '700' }}>
            {ownedCount}<span style={{ color: '#444' }}>/60 jugadores</span>
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
        <div style={{ fontSize: '11px', color: '#444', marginTop: '5px' }}>
          {60 - ownedCount} jugadores por descubrir
        </div>
      </div>

      {/* Category tabs — horizontal scroll */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '12px',
        overflowX: 'auto',
        paddingBottom: '4px',
        whiteSpace: 'nowrap',
      }}>
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
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        marginBottom: '16px',
      }}>
        {filtered.map((sticker, i) => {
          const count = ownedMap.get(sticker.id) ?? 0;
          const isOwned = count > 0;

          return (
            <motion.div
              key={sticker.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.2 }}
              onClick={() => isOwned && setSelected(sticker)}
              style={{ cursor: isOwned ? 'pointer' : 'default' }}
            >
              <FifaCard sticker={sticker} isOwned={isOwned} count={count} />
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
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 400,
              padding: '24px',
              paddingTop: 'env(safe-area-inset-top, 24px)',
              paddingBottom: 'env(safe-area-inset-bottom, 24px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={e => e.stopPropagation()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
              <FifaCardLarge sticker={selected} ownedCount={ownedMap.get(selected.id) ?? 0} />
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'none',
                  border: '1px solid #333', borderRadius: '10px',
                  padding: '10px 28px', color: '#666',
                  cursor: 'pointer', fontSize: '13px',
                  minHeight: '44px',
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
