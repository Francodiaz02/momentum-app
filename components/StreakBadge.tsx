'use client';

import { motion } from 'framer-motion';

interface Props {
  streak: number;
  totalDays: number;
  level: number;
  xp: number;
}

const XP_PER_LEVEL = 50;

export default function StreakBadge({ streak, totalDays, level, xp }: Props) {
  const xpInLevel = xp % XP_PER_LEVEL;
  const xpProgress = (xpInLevel / XP_PER_LEVEL) * 100;
  const hasStreak = streak > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top row: streak + days */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Streak */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            flex: 1,
            background: hasStreak
              ? 'linear-gradient(135deg, #1c1000, #2e1c00)'
              : '#0f0f14',
            border: `1px solid ${hasStreak ? '#6b4010' : '#1a1a24'}`,
            borderRadius: '16px',
            padding: '14px 16px',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {hasStreak && (
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: '60px', height: '60px',
              background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
          )}
          <div style={{ fontSize: '26px', fontWeight: '900', color: hasStreak ? '#f59e0b' : '#333', lineHeight: 1 }}>
            {hasStreak ? `${streak}` : '0'}
            <span style={{ fontSize: '16px', marginLeft: '4px' }}>{hasStreak ? '🔥' : ''}</span>
          </div>
          <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Day streak
          </div>
        </motion.div>

        {/* Days done */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            flex: 1,
            background: '#0f0f18',
            border: '1px solid #1a1a2e',
            borderRadius: '16px',
            padding: '14px 16px',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {totalDays > 0 && (
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: '60px', height: '60px',
              background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
          )}
          <div style={{ fontSize: '26px', fontWeight: '900', color: totalDays > 0 ? '#818cf8' : '#333', lineHeight: 1 }}>
            {totalDays}
          </div>
          <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Days done
          </div>
        </motion.div>
      </div>

      {/* Level bar */}
      <div style={{
        background: '#0f0f18',
        border: '1px solid #1a1a2e',
        borderRadius: '14px',
        padding: '12px 16px',
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              borderRadius: '8px', padding: '3px 9px',
              fontSize: '12px', fontWeight: '800', color: '#fff',
            }}>
              LVL {level}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>
              {getLevelTitle(level)}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#444' }}>
            {xpInLevel}<span style={{ color: '#333' }}>/{XP_PER_LEVEL} XP</span>
          </span>
        </div>

        <div style={{ background: '#111', borderRadius: '6px', height: '7px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            style={{
              height: '100%', borderRadius: '6px',
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
              boxShadow: '0 0 8px rgba(139,92,246,0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function getLevelTitle(level: number): string {
  if (level <= 2) return 'Beginner';
  if (level <= 5) return 'Building';
  if (level <= 10) return 'Consistent';
  if (level <= 20) return 'Dedicated';
  if (level <= 35) return 'Elite';
  return 'Legend';
}
