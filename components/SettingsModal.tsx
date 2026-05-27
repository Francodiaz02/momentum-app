'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Info, Zap } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  onResetDailyPack: () => void;
  streak: number;
  totalDays: number;
  totalXP: number;
}

export default function SettingsModal({ open, onClose, onReset, onResetDailyPack, streak, totalDays, totalXP }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              width: '100%', maxWidth: '480px',
              margin: '0 auto',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: '#0f0f1a',
              border: '1px solid #1d2433',
              borderBottom: 'none',
              borderRadius: '24px 24px 0 0',
              padding: '20px 20px 40px',
              zIndex: 101,
            }}
          >
            {/* Handle */}
            <div style={{
              width: '36px', height: '4px',
              background: '#333', borderRadius: '2px',
              margin: '0 auto 20px',
            }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#fff' }}>Settings</h2>
              <button
                onClick={onClose}
                style={{
                  background: '#1a1a2e', border: '1px solid #333',
                  borderRadius: '10px', width: '36px', height: '36px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#666',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Stats summary */}
            <div style={{
              background: '#0a0a0f', border: '1px solid #1a1a2e',
              borderRadius: '16px', padding: '16px', marginBottom: '20px',
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
              textAlign: 'center',
            }}>
              {[
                { value: streak, label: 'Streak', icon: '🔥' },
                { value: totalDays, label: 'Days', icon: '✓' },
                { value: totalXP, label: 'XP', icon: '⚡' },
              ].map(({ value, label, icon }) => (
                <div key={label}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{icon} {value}</div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* About section */}
            <div style={{
              background: '#0a0a0f', border: '1px solid #1a1a2e',
              borderRadius: '16px', padding: '16px', marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '36px', height: '36px', background: '#1a1a3e',
                  borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Info size={16} color="#6366f1" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                    How Momentum works
                  </div>
                  <div style={{ fontSize: '13px', color: '#999', lineHeight: '1.5' }}>
                    Every day you get 2 missions — one English, one Fitness. Complete both to win the day.
                    Use Min Mode on tough days to keep your streak alive with shorter versions.
                    Miss a day? You only lose 1 streak point, not everything.
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: '#0a0a0f', border: '1px solid #1a1a2e',
              borderRadius: '16px', padding: '16px', marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '36px', height: '36px', background: '#1a2e1a',
                  borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Zap size={16} color="#22c55e" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                    Min Mode
                  </div>
                  <div style={{ fontSize: '13px', color: '#999', lineHeight: '1.5' }}>
                    Low energy? Activate Min Mode from the header. Missions become shorter — the goal is just to show up.
                    Completed in Min Mode counts as ⚡ on your calendar.
                  </div>
                </div>
              </div>
            </div>

            {/* Reset daily pack button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { onResetDailyPack(); onClose(); }}
              style={{
                width: '100%', padding: '13px',
                background: '#0a1200', border: '1px solid #2a4a00',
                borderRadius: '14px', cursor: 'pointer', marginBottom: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', color: '#84cc16', fontSize: '13px', fontWeight: '700',
              }}
            >
              🎁 Resetear sobre diario
            </motion.button>

            {/* Reset all button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (confirm('Reset all progress? This cannot be undone.')) {
                  onReset();
                  onClose();
                }
              }}
              style={{
                width: '100%', padding: '14px',
                background: '#1a0a0a', border: '1px solid #3a1a1a',
                borderRadius: '14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', color: '#ef4444', fontSize: '14px', fontWeight: '600',
              }}
            >
              <RotateCcw size={15} />
              Reset all progress
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
