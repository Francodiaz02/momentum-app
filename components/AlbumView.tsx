'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_STICKERS, RARITY_CONFIG, CollectibleCategory, StickerDef } from '@/lib/stickers';

interface OwnedSticker {
  stickerId: string;
  count: number;
}

interface Props {
  ownedStickers: OwnedSticker[];
}

type Tab = 'all' | CollectibleCategory;

const TABS: { id: Tab; label: string }[] = [
  { id: 'all',     label: 'Todos' },
  { id: 'warrior', label: 'Guerreros' },
  { id: 'beast',   label: 'Bestias' },
  { id: 'mystic',  label: 'Místicos' },
  { id: 'shadow',  label: 'Sombras' },
  { id: 'titan',   label: 'Titanes' },
];

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

function CollectibleCard({ sticker, owned, count }: { sticker: StickerDef; owned: boolean; count: number }) {
  const rs = RARITY_STYLE[sticker.rarity];
  const isLegendary = sticker.rarity === 'legendary';

  if (sticker.imagePath) {
    // Image-based card
    return (
      <div style={{
        width: '100%',
        aspectRatio: '2/3',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        border: owned ? `1.5px solid ${rs.border}` : '1.5px solid #1a1a24',
        boxShadow: owned ? rs.glow : 'none',
      }}>
        {owned && isLegendary ? (
          <motion.div
            animate={{ boxShadow: ['0 0 10px rgba(245,158,11,0.4)', '0 0 24px rgba(245,158,11,0.7)', '0 0 10px rgba(245,158,11,0.4)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <img
              src={sticker.imagePath}
              alt={sticker.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        ) : (
          <img
            src={sticker.imagePath}
            alt={owned ? sticker.name : '???'}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: owned ? 'none' : 'grayscale(1) brightness(0.2)',
              transition: 'filter 0.3s',
            }}
          />
        )}

        {owned && count > 1 && (
          <div style={{
            position: 'absolute', top: '4px', right: '4px',
            background: rs.badge, borderRadius: '8px',
            padding: '1px 5px', fontSize: '8px', fontWeight: '800', color: rs.badgeText,
          }}>×{count}</div>
        )}

        {!owned && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-end',
            padding: '8px',
            background: 'rgba(0,0,0,0.3)',
          }}>
            <span style={{ fontSize: '16px', marginBottom: '4px' }}>🔒</span>
            <div style={{ fontSize: '9px', fontWeight: '800', color: rs.text, letterSpacing: '0.1em' }}>
              {RARITY_CONFIG[sticker.rarity].label.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Placeholder card (no image)
  return (
    <div style={{
      width: '100%',
      aspectRatio: '2/3',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      background: rs.bg,
      border: `1px solid ${owned ? rs.border : '#1a1a24'}`,
      boxShadow: owned ? rs.glow : 'none',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 8px',
    }}>
      {/* Top: rarity badge */}
      <div style={{
        fontSize: '8px', fontWeight: '800',
        color: owned ? rs.badgeText : '#333',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {RARITY_CONFIG[sticker.rarity].label}
      </div>

      {/* Center: category icon + name */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: owned ? '28px' : '20px',
          filter: owned ? 'none' : 'grayscale(1) brightness(0.3)',
          marginBottom: '6px',
        }}>
          {CAT_ICON[sticker.category]}
        </div>
        <div style={{
          fontSize: '10px', fontWeight: '800',
          color: owned ? rs.text : '#333',
          lineHeight: '1.2', textAlign: 'center',
        }}>
          {owned ? sticker.name : '???'}
        </div>
        {owned && (
          <div style={{ fontSize: '8px', color: '#555', marginTop: '2px', fontStyle: 'italic' }}>
            {sticker.subtitle}
          </div>
        )}
      </div>

      {/* Bottom: power */}
      <div style={{ fontSize: '11px', fontWeight: '900', color: owned ? rs.text : '#222' }}>
        {owned ? sticker.power : '??'}
      </div>

      {/* Lock if not owned */}
      {!owned && (
        <div style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '10px' }}>🔒</div>
      )}

      {/* Duplicate count */}
      {owned && count > 1 && (
        <div style={{
          position: 'absolute', top: '4px', right: '4px',
          background: rs.badge, borderRadius: '8px',
          padding: '1px 5px', fontSize: '8px', fontWeight: '800', color: rs.badgeText,
        }}>×{count}</div>
      )}

      {/* Legendary glow pulse */}
      {owned && isLegendary && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0,
            boxShadow: '0 0 20px rgba(245,158,11,0.6)',
            borderRadius: '12px',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

function CollectibleCardLarge({ sticker, count }: { sticker: StickerDef; count: number }) {
  const rs = RARITY_STYLE[sticker.rarity];
  const cfg = RARITY_CONFIG[sticker.rarity];
  const isLegendary = sticker.rarity === 'legendary';

  if (sticker.imagePath) {
    return (
      <div style={{
        width: '200px', maxWidth: '80vw',
        borderRadius: '16px', overflow: 'hidden',
        border: `2px solid ${rs.border}`,
        boxShadow: rs.glow,
        position: 'relative',
      }}>
        {isLegendary ? (
          <motion.div
            animate={{ boxShadow: ['0 0 10px rgba(245,158,11,0.4)', '0 0 30px rgba(245,158,11,0.8)', '0 0 10px rgba(245,158,11,0.4)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ width: '100%' }}
          >
            <img src={sticker.imagePath} alt={sticker.name} style={{ width: '100%', display: 'block' }} />
          </motion.div>
        ) : (
          <img src={sticker.imagePath} alt={sticker.name} style={{ width: '100%', display: 'block' }} />
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
          padding: '20px 12px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ fontSize: '16px', fontWeight: '900', color: rs.text }}>{sticker.name}</div>
          <div style={{ fontSize: '10px', color: '#999', fontStyle: 'italic', marginTop: '2px' }}>{sticker.subtitle}</div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: rs.badgeText, marginTop: '6px', letterSpacing: '0.1em' }}>
            {cfg.label.toUpperCase()} • POW {sticker.power}
          </div>
          {count > 1 && (
            <div style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>En colección: {count}×</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '200px', maxWidth: '80vw',
      background: rs.bg,
      border: `2px solid ${rs.border}`,
      borderRadius: '16px',
      padding: '20px 16px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      boxShadow: rs.glow,
    }}>
      {isLegendary && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, boxShadow: '0 0 30px rgba(245,158,11,0.6)', borderRadius: '16px', pointerEvents: 'none' }}
        />
      )}
      <div style={{ fontSize: '9px', fontWeight: '800', color: rs.badgeText, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
        {cfg.label} • {CAT_ICON[sticker.category]} {sticker.category.toUpperCase()}
      </div>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>{CAT_ICON[sticker.category]}</div>
      <div style={{ fontSize: '20px', fontWeight: '900', color: rs.text, textAlign: 'center' }}>{sticker.name}</div>
      <div style={{ fontSize: '11px', color: '#777', fontStyle: 'italic', marginTop: '4px', textAlign: 'center' }}>{sticker.subtitle}</div>
      <div style={{
        marginTop: '16px',
        background: rs.badge,
        border: `1px solid ${rs.border}`,
        borderRadius: '8px', padding: '4px 16px',
        fontSize: '13px', fontWeight: '900', color: rs.text,
      }}>
        POW {sticker.power}
      </div>
      {count > 1 && (
        <div style={{ fontSize: '11px', color: '#444', marginTop: '10px' }}>En colección: {count}×</div>
      )}
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
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#fff', letterSpacing: '0.1em' }}>
            ÁLBUM
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
        <div style={{ fontSize: '11px', color: '#444', marginTop: '5px' }}>
          {60 - ownedCount} coleccionables por descubrir
        </div>
      </div>

      {/* Category tabs */}
      <div style={{
        display: 'flex', gap: '6px', marginBottom: '12px',
        overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap',
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

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
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
              <CollectibleCard sticker={sticker} owned={isOwned} count={count} />
            </motion.div>
          );
        })}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.88)',
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
              <CollectibleCardLarge sticker={selected} count={ownedMap.get(selected.id) ?? 0} />
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
