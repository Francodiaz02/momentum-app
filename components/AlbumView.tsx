'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_STICKERS, RARITY_CONFIG, CollectibleCategory, StickerDef } from '@/lib/stickers';

interface OwnedSticker { stickerId: string; count: number; }
interface Props { ownedStickers: OwnedSticker[]; }

/* ─── Chapter definitions ─── */
const CHAPTERS: {
  id: CollectibleCategory; name: string; subtitle: string; icon: string;
  bg: string; accent: string; accentDim: string; border: string;
}[] = [
  {
    id: 'shadow',
    name: 'SHADOW REALM',
    subtitle: 'Silence is the deadliest weapon',
    icon: '👤',
    bg: 'linear-gradient(160deg, #020608 0%, #06041a 60%, #041018 100%)',
    accent: '#38bdf8',
    accentDim: 'rgba(56,189,248,0.12)',
    border: '#08182a',
  },
  {
    id: 'warrior',
    name: 'WAR BROTHERHOOD',
    subtitle: 'Forged in blood and fire',
    icon: '⚔️',
    bg: 'linear-gradient(160deg, #0e0204 0%, #1a0606 60%, #1e0a04 100%)',
    accent: '#f87171',
    accentDim: 'rgba(248,113,113,0.12)',
    border: '#2a0a08',
  },
  {
    id: 'beast',
    name: 'MYTHIC BEASTS',
    subtitle: 'Ancient. Untamed. Eternal.',
    icon: '🐺',
    bg: 'linear-gradient(160deg, #020c04 0%, #061408 60%, #040e02 100%)',
    accent: '#4ade80',
    accentDim: 'rgba(74,222,128,0.12)',
    border: '#081a0a',
  },
  {
    id: 'mystic',
    name: 'MYSTIC ORDER',
    subtitle: 'Knowledge beyond reality',
    icon: '🔮',
    bg: 'linear-gradient(160deg, #060210 0%, #0c061a 60%, #080416 100%)',
    accent: '#a855f7',
    accentDim: 'rgba(168,85,247,0.12)',
    border: '#14082a',
  },
  {
    id: 'titan',
    name: 'TITAN FORGE',
    subtitle: 'Size beyond comprehension',
    icon: '🗿',
    bg: 'linear-gradient(160deg, #0a0806 0%, #141008 60%, #0e0c06 100%)',
    accent: '#f59e0b',
    accentDim: 'rgba(245,158,11,0.12)',
    border: '#1a1206',
  },
];

/* ─── Rarity visuals ─── */
const RS = {
  common:    { border: '#252534', glow: 'none',                              text: '#666', badgeText: '#888', badge: '#1e1e2e' },
  rare:      { border: '#1a4a7a', glow: '0 0 8px rgba(56,189,248,0.35)',     text: '#38bdf8', badgeText: '#38bdf8', badge: '#0a2040' },
  epic:      { border: '#5a1a9a', glow: '0 0 12px rgba(168,85,247,0.4)',     text: '#a855f7', badgeText: '#a855f7', badge: '#200840' },
  legendary: { border: '#c07000', glow: '0 0 18px rgba(245,158,11,0.6)',     text: '#f59e0b', badgeText: '#f59e0b', badge: '#2e1400' },
};

const CAT_ICON: Record<CollectibleCategory, string> = {
  warrior: '⚔️', beast: '🐺', mystic: '🔮', shadow: '👤', titan: '🗿',
};

/* ─── Compact collectible card ─── */
function Card({ sticker, owned, count }: { sticker: StickerDef; owned: boolean; count: number }) {
  const rs = RS[sticker.rarity];
  const isLeg = sticker.rarity === 'legendary';

  return (
    <div style={{
      width: '100%', aspectRatio: '2/3',
      borderRadius: '9px', overflow: 'hidden', position: 'relative',
      border: `1.5px solid ${owned ? rs.border : '#181824'}`,
      boxShadow: owned ? rs.glow : 'none',
    }}>
      {sticker.imagePath ? (
        <>
          <img
            src={sticker.imagePath} alt={owned ? sticker.name : '???'}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: owned ? 'none' : 'grayscale(1) brightness(0.12)',
            }}
          />
          {owned && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.82))',
              padding: '8px 4px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{ fontSize: '7px', fontWeight: '900', color: rs.text, textAlign: 'center', lineHeight: '1.2' }}>
                {sticker.name}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: owned ? RARITY_CONFIG[sticker.rarity].bg : 'linear-gradient(160deg, #07070f, #0d0d1a)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '7px 5px',
        }}>
          <div style={{ fontSize: '6px', fontWeight: '800', color: owned ? rs.badgeText : '#1e1e2e', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {RARITY_CONFIG[sticker.rarity].label}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: owned ? '20px' : '14px', filter: owned ? 'none' : 'grayscale(1) brightness(0.25)', marginBottom: '3px' }}>
              {CAT_ICON[sticker.category]}
            </div>
            <div style={{ fontSize: '8px', fontWeight: '800', color: owned ? rs.text : '#252535', lineHeight: '1.2', textAlign: 'center' }}>
              {owned ? sticker.name : '???'}
            </div>
          </div>
          <div style={{ fontSize: '9px', fontWeight: '900', color: owned ? rs.text : '#1a1a2a' }}>
            {owned ? sticker.power : '??'}
          </div>
        </div>
      )}

      {/* Lock overlay */}
      {!owned && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '14px', opacity: 0.3 }}>🔒</span>
        </div>
      )}

      {/* Dup badge */}
      {owned && count > 1 && (
        <div style={{
          position: 'absolute', top: '3px', right: '3px',
          background: rs.badge, borderRadius: '5px',
          padding: '1px 4px', fontSize: '6px', fontWeight: '800', color: rs.badgeText,
        }}>×{count}</div>
      )}

      {/* Legendary glow pulse */}
      {owned && isLeg && (
        <motion.div
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '8px',
            boxShadow: 'inset 0 0 10px rgba(245,158,11,0.35)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

/* ─── Detail modal card ─── */
function DetailCard({ sticker, count }: { sticker: StickerDef; count: number }) {
  const rs = RS[sticker.rarity];
  const cfg = RARITY_CONFIG[sticker.rarity];
  const isLeg = sticker.rarity === 'legendary';

  if (sticker.imagePath) {
    return (
      <div style={{ width: '190px', borderRadius: '16px', overflow: 'hidden', border: `2px solid ${rs.border}`, boxShadow: rs.glow, position: 'relative' }}>
        {isLeg
          ? <motion.div animate={{ boxShadow: ['0 0 10px rgba(245,158,11,0.4)', '0 0 30px rgba(245,158,11,0.8)', '0 0 10px rgba(245,158,11,0.4)'] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <img src={sticker.imagePath} alt={sticker.name} style={{ width: '100%', display: 'block' }} />
            </motion.div>
          : <img src={sticker.imagePath} alt={sticker.name} style={{ width: '100%', display: 'block' }} />
        }
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.92))', padding: '20px 12px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '900', color: rs.text }}>{sticker.name}</div>
          <div style={{ fontSize: '10px', color: '#888', fontStyle: 'italic', marginTop: '2px', textAlign: 'center' }}>{sticker.subtitle}</div>
          <div style={{ fontSize: '8px', fontWeight: '800', color: rs.badgeText, marginTop: '6px', letterSpacing: '0.1em' }}>
            {cfg.label.toUpperCase()} · POW {sticker.power}
          </div>
          {count > 1 && <div style={{ fontSize: '9px', color: '#555', marginTop: '4px' }}>×{count} en colección</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '190px', background: cfg.bg, border: `2px solid ${rs.border}`, borderRadius: '16px', padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: rs.glow }}>
      {isLeg && (
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, boxShadow: '0 0 30px rgba(245,158,11,0.6)', borderRadius: '16px', pointerEvents: 'none' }}
        />
      )}
      <div style={{ fontSize: '8px', fontWeight: '800', color: rs.badgeText, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
        {cfg.label} · {CAT_ICON[sticker.category]}
      </div>
      <div style={{ fontSize: '46px', marginBottom: '12px' }}>{CAT_ICON[sticker.category]}</div>
      <div style={{ fontSize: '20px', fontWeight: '900', color: rs.text, textAlign: 'center' }}>{sticker.name}</div>
      <div style={{ fontSize: '11px', color: '#777', fontStyle: 'italic', marginTop: '4px', textAlign: 'center' }}>{sticker.subtitle}</div>
      <div style={{ marginTop: '14px', background: rs.badge, border: `1px solid ${rs.border}`, borderRadius: '8px', padding: '4px 16px', fontSize: '13px', fontWeight: '900', color: rs.text }}>
        POW {sticker.power}
      </div>
      {count > 1 && <div style={{ fontSize: '10px', color: '#444', marginTop: '10px' }}>×{count} en colección</div>}
    </div>
  );
}

/* ─── Main AlbumView ─── */
const PAGE_VARIANTS = {
  enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function AlbumView({ ownedStickers }: Props) {
  const [page, setPage]       = useState(0);
  const [dir,  setDir]        = useState(0);
  const [selected, setSelected] = useState<StickerDef | null>(null);

  const ownedMap   = new Map(ownedStickers.map(o => [o.stickerId, o.count]));
  const totalOwned = ownedStickers.filter(o => o.count > 0).length;

  const chapter  = CHAPTERS[page];
  const chapList = ALL_STICKERS.filter(s => s.category === chapter.id);
  const chapOwn  = chapList.filter(s => (ownedMap.get(s.id) ?? 0) > 0).length;

  const goTo = (i: number) => { setDir(i > page ? 1 : -1); setPage(i); };
  const prev = () => { if (page > 0) goTo(page - 1); };
  const next = () => { if (page < CHAPTERS.length - 1) goTo(page + 1); };

  const onDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -55 && page < CHAPTERS.length - 1) next();
    else if (info.offset.x > 55 && page > 0) prev();
  };

  return (
    <div>
      {/* ── Global progress strip ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '10px', color: '#333', fontWeight: '700', letterSpacing: '0.1em', flexShrink: 0 }}>
          ÁLBUM
        </span>
        <div style={{ flex: 1, background: '#0e0e18', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${(totalOwned / 60) * 100}%` }}
            transition={{ duration: 0.8 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #a855f7, #6366f1)', borderRadius: '4px', boxShadow: '0 0 6px rgba(168,85,247,0.4)' }}
          />
        </div>
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#a855f7', flexShrink: 0 }}>
          {totalOwned}<span style={{ color: '#333' }}>/60</span>
        </span>
      </div>

      {/* ── Page viewer ── */}
      <div style={{ overflow: 'hidden', borderRadius: '20px', position: 'relative' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={PAGE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.38 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            style={{
              background: chapter.bg,
              border: `1px solid ${chapter.border}`,
              borderRadius: '20px',
              padding: '16px 14px 18px',
              userSelect: 'none',
              touchAction: 'pan-y',
            }}
          >
            {/* Chapter header */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '9px', color: chapter.accent, fontWeight: '700', letterSpacing: '0.14em', marginBottom: '3px', opacity: 0.85 }}>
                    {chapter.icon}&nbsp; CAPÍTULO {page + 1} / {CHAPTERS.length}
                  </div>
                  <div style={{ fontSize: '19px', fontWeight: '900', color: '#f0f0f8', letterSpacing: '-0.025em', lineHeight: '1' }}>
                    {chapter.name}
                  </div>
                  <div style={{ fontSize: '10px', color: '#444', marginTop: '3px', fontStyle: 'italic' }}>
                    {chapter.subtitle}
                  </div>
                </div>

                {/* Chapter count badge */}
                <div style={{
                  flexShrink: 0, paddingLeft: '12px',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                }}>
                  <div style={{ fontSize: '22px', fontWeight: '900', color: chapter.accent, lineHeight: '1' }}>
                    {chapOwn}
                    <span style={{ fontSize: '13px', color: '#2a2a3a', fontWeight: '700' }}>/{chapList.length}</span>
                  </div>
                  <div style={{ fontSize: '8px', color: '#333', marginTop: '2px', letterSpacing: '0.08em' }}>COLECTADOS</div>
                </div>
              </div>

              {/* Chapter progress bar */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '3px', height: '3px', overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${chapList.length > 0 ? (chapOwn / chapList.length) * 100 : 0}%` }}
                  transition={{ duration: 0.9 }}
                  style={{
                    height: '100%', borderRadius: '3px',
                    background: chapter.accent,
                    boxShadow: `0 0 6px ${chapter.accentDim}`,
                  }}
                />
              </div>
            </div>

            {/* Cards grid — 4 columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
            }}>
              {chapList.map((sticker, i) => {
                const count = ownedMap.get(sticker.id) ?? 0;
                const owned = count > 0;
                return (
                  <motion.div
                    key={sticker.id}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.025, duration: 0.22 }}
                    onClick={() => owned && setSelected(sticker)}
                    style={{ cursor: owned ? 'pointer' : 'default' }}
                  >
                    <Card sticker={sticker} owned={owned} count={count} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: '14px', padding: '0 2px',
      }}>
        {/* Prev */}
        <motion.button
          whileTap={page > 0 ? { scale: 0.9 } : {}}
          onClick={prev}
          style={{
            minWidth: '44px', minHeight: '44px',
            background: page > 0 ? '#0e0e18' : 'transparent',
            border: `1px solid ${page > 0 ? '#252535' : '#111'}`,
            borderRadius: '12px', cursor: page > 0 ? 'pointer' : 'default',
            color: page > 0 ? '#888' : '#1a1a24',
            fontSize: '17px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ←
        </motion.button>

        {/* Chapter dots */}
        <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
          {CHAPTERS.map((ch, i) => (
            <motion.button
              key={ch.id}
              onClick={() => goTo(i)}
              animate={{ width: i === page ? 20 : 6, background: i === page ? chapter.accent : '#1e1e2e' }}
              transition={{ duration: 0.25 }}
              style={{
                height: '6px', borderRadius: '3px',
                border: 'none', padding: 0, cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          whileTap={page < CHAPTERS.length - 1 ? { scale: 0.9 } : {}}
          onClick={next}
          style={{
            minWidth: '44px', minHeight: '44px',
            background: page < CHAPTERS.length - 1 ? '#0e0e18' : 'transparent',
            border: `1px solid ${page < CHAPTERS.length - 1 ? '#252535' : '#111'}`,
            borderRadius: '12px', cursor: page < CHAPTERS.length - 1 ? 'pointer' : 'default',
            color: page < CHAPTERS.length - 1 ? '#888' : '#1a1a24',
            fontSize: '17px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          →
        </motion.button>
      </div>

      {/* ── Hint swipe ── */}
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '10px', color: '#252530' }}>
        deslizá para cambiar capítulo
      </div>

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 400, padding: '24px',
              paddingTop: 'env(safe-area-inset-top, 24px)',
              paddingBottom: 'env(safe-area-inset-bottom, 24px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.82, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={e => e.stopPropagation()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
              <DetailCard sticker={selected} count={ownedMap.get(selected.id) ?? 0} />
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'none', border: '1px solid #282828', borderRadius: '10px',
                  padding: '10px 28px', color: '#555', cursor: 'pointer',
                  fontSize: '13px', minHeight: '44px',
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
