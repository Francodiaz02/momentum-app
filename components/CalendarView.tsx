'use client';

import { motion } from 'framer-motion';

interface Props {
  calendarData: Map<string, 'completed' | 'partial' | 'missed'>;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarView({ calendarData }: Props) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const dayStatus = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return calendarData.get(dateStr);
  };

  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid #1d2433',
      borderRadius: '16px',
      padding: '20px',
    }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: '#fff' }}>
        {monthNames[month]} {year}
      </h3>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '6px', marginBottom: '8px',
      }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{
            textAlign: 'center', fontSize: '11px', color: '#444',
            fontWeight: '600', paddingBottom: '4px',
          }}>{d}</div>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '6px',
      }}>
        {/* Empty cells */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const status = dayStatus(day);
          const isToday = day === today;
          const isFuture = day > today;

          let bg = '#111';
          let color = '#444';
          if (status === 'completed') { bg = '#1a4a1a'; color = '#4ade80'; }
          if (status === 'partial') { bg = '#2a1a0a'; color = '#f59e0b'; }
          if (status === 'missed') { bg = '#1a0a0a'; color = '#555'; }
          if (isToday) { bg = '#1a1a3e'; color = '#6366f1'; }
          if (isFuture) { color = '#222'; }

          return (
            <motion.div
              key={day}
              whileHover={!isFuture ? { scale: 1.1 } : {}}
              style={{
                aspectRatio: '1',
                background: bg,
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: isToday ? '800' : '500',
                color,
                border: isToday ? '2px solid #6366f1' : '2px solid transparent',
                cursor: 'default',
              }}
            >
              {status === 'completed' ? '✓' : status === 'partial' ? '⚡' : day}
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
        {[
          { color: '#4ade80', bg: '#1a4a1a', label: 'Full' },
          { color: '#f59e0b', bg: '#2a1a0a', label: 'Min Mode' },
          { color: '#555', bg: '#1a0a0a', label: 'Missed' },
        ].map(({ color, bg, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: bg, borderRadius: '3px' }} />
            <span style={{ fontSize: '11px', color: '#555' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
