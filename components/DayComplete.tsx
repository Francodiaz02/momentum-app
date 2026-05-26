'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';

interface Props {
  minMode: boolean;
  streak: number;
  xpEarned: number;
  justCompleted?: boolean;
}

export default function DayComplete({ minMode, streak, xpEarned, justCompleted }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (justCompleted && !minMode) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4500);
      return () => clearTimeout(t);
    }
  }, [justCompleted, minMode]);

  const messages = minMode
    ? [
        "You showed up even when it was hard. That's the real win.",
        "Consistency beats perfection. Every single time.",
        "Some days you sprint. Today you walked. Both count.",
      ]
    : [
        "Every mission done. You're building something real.",
        "Full send. This is what momentum looks like.",
        "Another day in the books. The compound effect is working.",
      ];

  const msg = messages[streak % messages.length];

  return (
    <>
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          background: minMode
            ? 'linear-gradient(135deg, #1a0f00, #2a1800)'
            : 'linear-gradient(135deg, #0a2a0a, #0d3a18)',
          border: `1px solid ${minMode ? '#8b5e3c' : '#2d6a3d'}`,
          borderRadius: '20px',
          padding: '28px 24px',
          textAlign: 'center',
          margin: '0 0 20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: minMode
            ? 'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 60%)'
            : 'radial-gradient(circle at 50% 0%, rgba(34,197,94,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <motion.div
          animate={justCompleted ? { rotate: [0, -15, 15, -8, 8, 0], scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: '44px', marginBottom: '10px' }}
        >
          {minMode ? '⚡' : '🏆'}
        </motion.div>

        <h2 style={{
          margin: '0 0 6px', fontSize: '22px', fontWeight: '900',
          color: minMode ? '#f59e0b' : '#4ade80',
          letterSpacing: '-0.02em',
        }}>
          {minMode ? 'Day Kept Alive' : 'Day Conquered'}
        </h2>

        <p style={{
          margin: '0 0 20px', fontSize: '14px', color: '#666',
          lineHeight: '1.5', maxWidth: '260px',
          marginLeft: 'auto', marginRight: 'auto',
        }}>
          {msg}
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px', padding: '10px 18px',
          }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#f59e0b' }}>🔥 {streak}</div>
            <div style={{ fontSize: '10px', color: '#555', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Streak</div>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px', padding: '10px 18px',
          }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#6366f1' }}>+{xpEarned} XP</div>
            <div style={{ fontSize: '10px', color: '#555', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Earned</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
