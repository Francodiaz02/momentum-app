'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, RotateCcw } from 'lucide-react';
import { Mission } from '@/lib/types';

interface Props {
  mission: Mission;
  minMode: boolean;
  onComplete: (id: string, minMode: boolean) => void;
  onUndo: (id: string) => void;
  index: number;
}

const COLORS = {
  english: {
    bg: '#10102a', border: '#26267a', accent: '#6366f1',
    text: '#a5b4fc', glow: 'rgba(99,102,241,0.18)',
    doneBg: '#0a0a1a', doneBorder: '#18184a',
  },
  fitness: {
    bg: '#0c1c0c', border: '#1c481c', accent: '#22c55e',
    text: '#86efac', glow: 'rgba(34,197,94,0.14)',
    doneBg: '#080f08', doneBorder: '#122412',
  },
};

export default function MissionCard({ mission, minMode, onComplete, onUndo, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const isDone = mission.completed || mission.minModeCompleted;
  const c = COLORS[mission.category];
  const diffMap = { easy: 1, medium: 2, hard: 3 };

  const handleDone = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      onComplete(mission.id, minMode);
      setAnimating(false);
    }, 280);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      style={{
        background: isDone ? c.doneBg : c.bg,
        border: `1px solid ${isDone ? c.doneBorder : c.border}`,
        borderRadius: '18px',
        padding: '16px',
        marginBottom: '10px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Completion sweep */}
      <AnimatePresence>
        {animating && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '110%' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(90deg, transparent 0%, ${c.glow} 50%, transparent 100%)`,
              pointerEvents: 'none', zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px', position: 'relative', zIndex: 2 }}>

        {/* Icon */}
        <motion.div
          animate={animating ? { scale: [1, 1.25, 1], rotate: [0, 8, 0] } : {}}
          transition={{ duration: 0.3 }}
          style={{
            width: '44px', height: '44px', flexShrink: 0,
            background: isDone ? '#0e1e0e' : `${c.accent}16`,
            border: `1px solid ${isDone ? '#1a3a1a' : 'transparent'}`,
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
            transition: 'all 0.25s',
          }}
        >
          {isDone
            ? <Check size={19} color="#4ade80" strokeWidth={2.5} />
            : mission.icon}
        </motion.div>

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Category + difficulty row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{
              fontSize: '10px', fontWeight: '700',
              color: isDone ? '#2a5a2a' : c.text,
              textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              {mission.category === 'english' ? '🇬🇧 English' : '💪 Fitness'}
            </span>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: n <= diffMap[mission.difficulty]
                    ? (isDone ? '#2a5a2a' : c.accent)
                    : '#1e1e1e',
                }} />
              ))}
            </div>
          </div>

          {/* Title EN */}
          <h3 style={{
            margin: 0, fontSize: '15px', fontWeight: '700',
            color: isDone ? '#3a3a3a' : '#eee',
            letterSpacing: '-0.02em', lineHeight: '1.2',
            textDecoration: isDone ? 'line-through' : 'none',
            textDecorationColor: '#2a4a2a',
          }}>
            {mission.title}
          </h3>

          {/* Subtitle ES — Spanish support hint */}
          {!isDone && (
            <p style={{
              margin: '3px 0 0', fontSize: '12px',
              color: '#3a3a5a',
              lineHeight: '1.3',
              fontStyle: 'italic',
            }}>
              {mission.subtitleEs}
            </p>
          )}

          {/* Duration + tags row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '7px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: isDone ? '#333' : '#555' }}>
              ⏱ {minMode && mission.minDuration ? mission.minDuration : mission.duration}
            </span>

            {minMode && mission.minDuration && !isDone && (
              <span style={{
                fontSize: '10px', padding: '1px 6px',
                background: '#1a1000', border: '1px solid #6a3800',
                borderRadius: '20px', color: '#ca8a04',
              }}>
                ⚡ Versión mínima
              </span>
            )}

            {isDone && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  fontSize: '10px', padding: '1px 6px',
                  background: '#081808', border: '1px solid #1a3a1a',
                  borderRadius: '20px', color: '#4ade80',
                }}
              >
                {mission.minModeCompleted ? '⚡ Mínimo ✓' : '✓ Listo'}
              </motion.span>
            )}
          </div>

          {/* Expanded description */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{
                  margin: '10px 0 0', fontSize: '13px',
                  color: '#666', lineHeight: '1.55',
                }}>
                  {mission.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setExpanded(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#333', padding: '3px',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <ChevronDown size={14} />
          </motion.button>

          {!isDone && (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.86 }}
              onClick={handleDone}
              style={{
                background: `linear-gradient(135deg, ${c.accent}ee, ${c.accent}aa)`,
                border: 'none', borderRadius: '9px',
                padding: '6px 12px', cursor: 'pointer',
                color: '#fff', fontSize: '12px', fontWeight: '800',
                boxShadow: `0 2px 14px ${c.glow}`,
                letterSpacing: '0.02em',
              }}
            >
              Done
            </motion.button>
          )}

          {isDone && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => onUndo(mission.id)}
              title="Deshacer"
              style={{
                background: 'none',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '5px 8px',
                cursor: 'pointer',
                color: '#444',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '11px',
              }}
            >
              <RotateCcw size={11} />
              Undo
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
