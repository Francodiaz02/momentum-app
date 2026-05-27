'use client';
import { motion } from 'framer-motion';
import { ALL_BADGES } from '@/lib/badges';

interface Props {
  unlockedIds: string[];
}

const CATEGORY_LABELS = {
  english: { label: '🇬🇧 Inglés', color: '#6366f1', bg: '#10102a', border: '#26267a' },
  fitness: { label: '💪 Fitness', color: '#22c55e', bg: '#0c1c0c', border: '#1c481c' },
  extra:   { label: '⭐ Extra',   color: '#f59e0b', bg: '#1a1000', border: '#7a5000' },
};

export default function BadgesView({ unlockedIds }: Props) {
  const categories = ['english', 'fitness', 'extra'] as const;

  return (
    <div>
      {categories.map(cat => {
        const badges = ALL_BADGES.filter(b => b.category === cat);
        const { label, color, bg, border } = CATEGORY_LABELS[cat];
        const unlockedCount = badges.filter(b => unlockedIds.includes(b.id)).length;
        return (
          <div key={cat} style={{ marginBottom: '28px' }}>
            {/* Category header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
              </h3>
              <span style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>
                {unlockedCount}/{badges.length}
              </span>
            </div>

            {/* Badge grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {badges.map((badge, i) => {
                const unlocked = unlockedIds.includes(badge.id);
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      padding: '12px 6px',
                      background: unlocked ? bg : '#0a0a0f',
                      border: `1px solid ${unlocked ? border : '#141420'}`,
                      borderRadius: '14px',
                      cursor: 'default',
                      position: 'relative',
                      boxShadow: unlocked ? `0 0 14px ${color}22` : 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      fontSize: '24px', lineHeight: 1,
                      filter: unlocked ? 'none' : 'grayscale(1) brightness(0.3)',
                      marginBottom: '6px',
                    }}>
                      {badge.icon}
                    </div>

                    {/* Name */}
                    <div style={{
                      fontSize: '9px', fontWeight: '700', textAlign: 'center', lineHeight: '1.3',
                      color: unlocked ? '#ddd' : '#2a2a3a',
                      textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>
                      {badge.name}
                    </div>

                    {/* Lock icon overlay */}
                    {!unlocked && (
                      <div style={{
                        position: 'absolute', top: '6px', right: '6px',
                        fontSize: '8px', color: '#1e1e2e',
                      }}>
                        🔒
                      </div>
                    )}

                    {/* Glow for unlocked */}
                    {unlocked && (
                      <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{
                          position: 'absolute', inset: 0, borderRadius: '14px',
                          background: `radial-gradient(circle at center, ${color}18 0%, transparent 70%)`,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
