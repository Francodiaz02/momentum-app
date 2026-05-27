'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_BADGES, BadgeDef } from '@/lib/badges';

interface Props {
  unlockedIds: string[];
}

type Tab = 'english' | 'fitness' | 'extra';

const TABS: { id: Tab; label: string }[] = [
  { id: 'english', label: 'Inglés' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'extra', label: 'Logros' },
];

export default function RelicsView({ unlockedIds }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('english');

  const filtered = ALL_BADGES.filter(b => b.category === activeTab);
  const unlockedCount = unlockedIds.length;

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0e00, #100a20)',
        border: '1px solid #3a2a00',
        borderRadius: '16px', padding: '18px',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#fff', marginBottom: '4px' }}>
              Reliquias
            </div>
            <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
              Logros reales. No se consiguen en sobres.
            </div>
          </div>
          <div style={{
            background: '#f59e0b22', border: '1px solid #7a5000',
            borderRadius: '10px', padding: '6px 12px',
            fontSize: '14px', fontWeight: '900', color: '#f59e0b',
          }}>
            {unlockedCount}<span style={{ color: '#7a5000', fontSize: '12px' }}>/{ALL_BADGES.length}</span>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '7px',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              border: activeTab === tab.id ? 'none' : '1px solid #1a1a28',
              borderRadius: '10px', cursor: 'pointer',
              color: activeTab === tab.id ? '#000' : '#555',
              fontSize: '12px', fontWeight: '700',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Relics list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          {filtered.map((badge, i) => {
            const isUnlocked = unlockedIds.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  background: isUnlocked
                    ? 'linear-gradient(135deg, #1a1000, #120a00)'
                    : '#0d0d14',
                  border: `1px solid ${isUnlocked ? '#7a5000' : '#1a1a24'}`,
                  borderRadius: '14px', padding: '14px',
                  marginBottom: '8px',
                  boxShadow: isUnlocked ? '0 0 16px rgba(245,158,11,0.15)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {isUnlocked && (
                  <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'radial-gradient(ellipse at left, rgba(245,158,11,0.06) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <div style={{
                  width: '44px', height: '44px', flexShrink: 0,
                  background: isUnlocked ? '#2a1800' : '#111',
                  border: `1.5px solid ${isUnlocked ? '#f59e0b' : '#222'}`,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                  boxShadow: isUnlocked ? '0 0 12px rgba(245,158,11,0.3)' : 'none',
                }}>
                  {isUnlocked ? badge.icon : '?'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '13px', fontWeight: '800',
                    color: isUnlocked ? '#fcd34d' : '#444',
                    marginBottom: '2px',
                  }}>
                    {badge.name}
                  </div>
                  <div style={{ fontSize: '11px', color: isUnlocked ? '#888' : '#333' }}>
                    {badge.description}
                  </div>
                </div>
                {isUnlocked && (
                  <div style={{
                    background: '#f59e0b22', border: '1px solid #7a5000',
                    borderRadius: '6px', padding: '3px 8px',
                    fontSize: '10px', fontWeight: '800', color: '#f59e0b',
                    flexShrink: 0,
                  }}>
                    ✓
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Footer note */}
      <div style={{
        textAlign: 'center', padding: '20px 0 8px',
        fontSize: '11px', color: '#2a2a3a', lineHeight: '1.5',
      }}>
        Las reliquias se desbloquean por mérito, no por suerte.
      </div>
    </div>
  );
}
