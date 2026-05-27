'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { getBadgeById } from '@/lib/badges';

interface Props {
  badgeId: string | null;
  onClose: () => void;
}

const CAT_COLORS = {
  english: '#6366f1',
  fitness: '#22c55e',
  extra: '#f59e0b',
};

export default function BadgeUnlockModal({ badgeId, onClose }: Props) {
  const badge = badgeId ? getBadgeById(badgeId) : null;
  const color = badge ? CAT_COLORS[badge.category] : '#6366f1';

  return (
    <AnimatePresence>
      {badge && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 300 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '280px',
              background: '#0e0e1a',
              border: `1px solid ${color}66`,
              borderRadius: '24px',
              padding: '36px 24px 28px',
              zIndex: 301,
              textAlign: 'center',
              boxShadow: `0 0 60px ${color}33, 0 20px 60px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Glow ring */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
                width: '80px', height: '80px', borderRadius: '50%',
                background: `radial-gradient(circle, ${color}44 0%, transparent 70%)`,
              }}
            />

            {/* Badge icon */}
            <motion.div
              initial={{ rotate: -15, scale: 0.7 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              style={{ fontSize: '56px', lineHeight: 1, marginBottom: '16px', display: 'block' }}
            >
              {badge.icon}
            </motion.div>

            {/* "BADGE UNLOCKED" label */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.15em', color: color, textTransform: 'uppercase', marginBottom: '8px' }}
            >
              ✦ Insignia desbloqueada ✦
            </motion.div>

            {/* Badge name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '22px', fontWeight: '900', color: '#fff', marginBottom: '6px', letterSpacing: '-0.02em' }}
            >
              {badge.name}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: '13px', color: '#666', marginBottom: '24px', lineHeight: '1.5' }}
            >
              {badge.description}
            </motion.div>

            {/* Close button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
                border: 'none', borderRadius: '14px',
                padding: '12px 32px', cursor: 'pointer',
                color: '#fff', fontSize: '14px', fontWeight: '800',
                boxShadow: `0 4px 20px ${color}44`,
              }}
            >
              ¡Genial! 🎉
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
