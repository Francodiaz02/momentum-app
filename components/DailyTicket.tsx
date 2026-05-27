'use client';
import { motion } from 'framer-motion';

interface Props {
  claimed: boolean;
  packsAvailable: number;
  onClaim: () => void;
  onOpenPack: () => void;
}

export default function DailyTicket({ claimed, packsAvailable, onClaim, onOpenPack }: Props) {
  // State 3: all opened today
  if (claimed && packsAvailable === 0) {
    return (
      <div style={{
        background: '#0d0d18', border: '1px solid #1a1a24',
        borderRadius: '18px', padding: '14px 20px',
        marginBottom: '18px', textAlign: 'center',
        opacity: 0.35,
      }}>
        <span style={{ fontSize: '12px', color: '#555', fontWeight: '600' }}>Volvé mañana por tu sobre gratis ✓</span>
      </div>
    );
  }

  // State 2: claimed but has packs available
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
        <span style={{ fontSize: '28px' }}>📦</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d', marginBottom: '2px' }}>
            Sobres disponibles: {packsAvailable}
          </div>
          <div style={{ fontSize: '12px', color: '#7a5a20' }}>Tocá para abrir</div>
        </div>
        <div style={{
          background: '#f59e0b22', border: '1px solid #7a5000',
          borderRadius: '8px', padding: '4px 10px',
          fontSize: '11px', fontWeight: '800', color: '#f59e0b',
        }}>
          ABRIR →
        </div>
      </motion.button>
    );
  }

  // State 1: free pack available
  return (
    <motion.button
      onClick={() => { onClaim(); onOpenPack(); }}
      animate={{ boxShadow: ['0 0 0px rgba(245,158,11,0)', '0 0 24px rgba(245,158,11,0.3)', '0 0 0px rgba(245,158,11,0)'] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        width: '100%', marginBottom: '18px',
        background: 'linear-gradient(135deg, #1a1000, #221500)',
        border: '1px solid #8a6000',
        borderRadius: '18px', padding: '18px 20px',
        cursor: 'pointer',
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
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.1), transparent)',
          pointerEvents: 'none',
        }}
      />

      <span style={{ fontSize: '32px', flexShrink: 0 }}>🎁</span>

      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d', marginBottom: '2px' }}>
          SOBRE GRATIS
        </div>
        <div style={{ fontSize: '12px', color: '#7a5a20' }}>Tu recompensa diaria</div>
      </div>

      <div style={{
        background: '#f59e0b22', border: '1px solid #7a5000',
        borderRadius: '8px', padding: '4px 10px',
        fontSize: '11px', fontWeight: '800', color: '#f59e0b',
        flexShrink: 0,
      }}>
        ABRIR →
      </div>
    </motion.button>
  );
}
