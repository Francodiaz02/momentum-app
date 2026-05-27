'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  claimed: boolean;
  onClaim: () => void;
  packsAvailable: number;
  onOpenPack: () => void;
}

export default function DailyTicket({ claimed, onClaim, packsAvailable, onOpenPack }: Props) {
  const [opening, setOpening] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showPackBtn, setShowPackBtn] = useState(false);

  const handleOpen = () => {
    if (claimed || opening) return;
    setOpening(true);
    setTimeout(() => {
      setShowMessage(true);
      onClaim();
      setOpening(false);
      setTimeout(() => setShowPackBtn(true), 1500);
    }, 700);
  };

  // Already claimed today and no pending packs
  if (claimed && !showMessage && packsAvailable === 0) {
    return (
      <div style={{
        background: '#0d0d18', border: '1px solid #1a1a24',
        borderRadius: '18px', padding: '16px 20px',
        marginBottom: '18px', textAlign: 'center',
        opacity: 0.4,
      }}>
        <span style={{ fontSize: '13px', color: '#555', fontWeight: '600' }}>Todo abierto hoy ✓</span>
      </div>
    );
  }

  // After opening animation: show motivational message + pack button
  if (showMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'linear-gradient(135deg, #0a0820, #120a28)',
          border: '1px solid #3a2a5a',
          borderRadius: '18px', padding: '18px 20px',
          marginBottom: '18px',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ fontSize: '20px', marginBottom: '8px' }}>⚡</div>
        <p style={{
          margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: '#c084fc',
          lineHeight: '1.45', letterSpacing: '-0.01em',
        }}>
          &ldquo;Estás vivo flaco, levantate<br />y viví el mejor día de tu vida&rdquo;
        </p>
        <AnimatePresence>
          {showPackBtn && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onOpenPack}
              style={{
                background: 'linear-gradient(135deg, #1a0e00, #2a1800)',
                border: '1px solid #7a5000',
                borderRadius: '12px', padding: '10px 20px',
                cursor: 'pointer', color: '#f59e0b',
                fontSize: '14px', fontWeight: '800',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}
            >
              🎁 Abrir sobre gratis →
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Claimed but has packs available (accumulated)
  if (claimed && packsAvailable > 0) {
    return (
      <motion.button
        onClick={onOpenPack}
        animate={{ boxShadow: ['0 0 0px rgba(245,158,11,0)', '0 0 20px rgba(245,158,11,0.25)', '0 0 0px rgba(245,158,11,0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: '100%', marginBottom: '18px',
          background: 'linear-gradient(135deg, #1a1000, #221500)',
          border: '1px solid #7a5000',
          borderRadius: '18px', padding: '16px 20px',
          cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: '14px',
        }}
      >
        <span style={{ fontSize: '28px' }}>🎁</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d', marginBottom: '2px' }}>
            {packsAvailable} sobre{packsAvailable > 1 ? 's' : ''} sin abrir
          </div>
          <div style={{ fontSize: '12px', color: '#7a5a20' }}>Tocá para abrir</div>
        </div>
        <div style={{
          background: '#f59e0b22', border: '1px solid #7a5000',
          borderRadius: '8px', padding: '4px 10px',
          fontSize: '11px', fontWeight: '800', color: '#f59e0b',
        }}>
          ABRIR
        </div>
      </motion.button>
    );
  }

  // Not claimed yet
  return (
    <motion.button
      onClick={handleOpen}
      animate={opening ? {} : { boxShadow: ['0 0 0px rgba(245,158,11,0)', '0 0 20px rgba(245,158,11,0.25)', '0 0 0px rgba(245,158,11,0)'] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        width: '100%', marginBottom: '18px',
        background: 'linear-gradient(135deg, #1a1000, #221500)',
        border: '1px solid #7a5000',
        borderRadius: '18px', padding: '18px 20px',
        cursor: 'pointer', textAlign: 'center',
        display: 'flex', alignItems: 'center', gap: '14px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Shimmer */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0, width: '40%',
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.08), transparent)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={opening ? { rotate: [0, 15, -15, 0], scale: [1, 1.3, 0.9, 1.2] } : {}}
        transition={{ duration: 0.7 }}
        style={{ fontSize: '32px', flexShrink: 0 }}
      >
        🎁
      </motion.div>

      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d', marginBottom: '2px' }}>
          Ticket diario — Tocá para abrir
        </div>
        <div style={{ fontSize: '12px', color: '#7a5a20' }}>
          Conseguí un sobre de figuritas gratis
        </div>
      </div>

      <div style={{
        background: '#f59e0b22', border: '1px solid #7a5000',
        borderRadius: '8px', padding: '4px 10px',
        fontSize: '11px', fontWeight: '800', color: '#f59e0b',
        flexShrink: 0,
      }}>
        ABRIR
      </div>
    </motion.button>
  );
}
