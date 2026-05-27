'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Settings } from 'lucide-react';
import { AppState } from '@/lib/types';
import { loadState, completeMission, uncompleteMission, toggleMinMode, getCalendarData, claimTicket, clearUnlockedBadge } from '@/lib/store';
import { calculateXP, getTodayDateStr, calculateLevel } from '@/lib/missions';
import MissionCard from '@/components/MissionCard';
import StreakBadge from '@/components/StreakBadge';
import DayComplete from '@/components/DayComplete';
import CalendarView from '@/components/CalendarView';
import SettingsModal from '@/components/SettingsModal';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import BadgesView from '@/components/BadgesView';
import BadgeUnlockModal from '@/components/BadgeUnlockModal';
import DailyTicket from '@/components/DailyTicket';

type Tab = 'today' | 'calendar' | 'badges' | 'stats';

export default function Home() {
  const [state, setState] = useState<AppState | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [levelUpMsg, setLevelUpMsg] = useState<string | null>(null);
  const prevLevelRef = useRef<number>(1);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    prevLevelRef.current = loaded.level;
  }, []);

  const handleComplete = (missionId: string, minMode: boolean) => {
    if (!state) return;
    const newState = completeMission(state, missionId, minMode);

    // Check level up
    const prospectiveXP = newState.totalXP + calculateXP(newState.todayMissions, minMode);
    const prospectiveLevel = calculateLevel(prospectiveXP);
    if (prospectiveLevel > prevLevelRef.current) {
      prevLevelRef.current = prospectiveLevel;
      setLevelUpMsg(`¡Nivel ${prospectiveLevel} desbloqueado!`);
      setTimeout(() => setLevelUpMsg(null), 3000);
    }

    if (newState.todayCompleted && !state.todayCompleted) {
      setJustCompleted(true);
    }

    setState(newState);
  };

  const handleUndo = (missionId: string) => {
    if (!state) return;
    const newState = uncompleteMission(state, missionId);
    setJustCompleted(false);
    setState(newState);
  };

  const handleToggleMinMode = () => {
    if (!state) return;
    setState(toggleMinMode(state));
  };

  const handleReset = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('habitapp_v3');
    const fresh = loadState();
    setState(fresh);
    setJustCompleted(false);
    prevLevelRef.current = 1;
  };

  const handleClaimTicket = () => {
    if (!state) return;
    setState(claimTicket(state));
  };

  const handleClearBadge = () => {
    if (!state) return;
    setState(clearUnlockedBadge(state));
  };

  if (!state) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0f',
      }}>
        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ color: '#6366f1', fontSize: '20px' }}
        >
          ◈
        </motion.div>
      </div>
    );
  }

  const calendarData = getCalendarData(state);
  const todayXP = calculateXP(state.todayMissions, state.minModeActive);
  const completedCount = state.todayMissions.filter(m => m.completed || m.minModeCompleted).length;
  const totalMissions = state.todayMissions.length;
  const progressPct = (completedCount / totalMissions) * 100;
  const ticketClaimed = state.ticketClaimedDate === getTodayDateStr();
  const hasFruitToday = state.todayMissions.some(m => m.category === 'fruit');

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 6) return 'Up late';
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'badges', label: 'Badges' },
    { id: 'stats', label: 'Stats' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', maxWidth: '480px', margin: '0 auto', paddingBottom: '60px' }}>

      {/* Badge unlock modal */}
      <BadgeUnlockModal badgeId={state.newlyUnlockedBadge} onClose={handleClearBadge} />

      {/* Level-up toast */}
      <AnimatePresence>
        {levelUpMsg && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #1a1030, #2a1060)',
              border: '1px solid #6336a8',
              borderRadius: '40px', padding: '10px 20px',
              display: 'flex', alignItems: 'center', gap: '8px',
              zIndex: 200, whiteSpace: 'nowrap',
              boxShadow: '0 4px 30px rgba(139,92,246,0.3)',
            }}
          >
            <span style={{ fontSize: '18px' }}>🎖️</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#c084fc' }}>{levelUpMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ padding: '28px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: '12px', color: '#444', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {greeting()}
          </p>
          <h1 style={{
            margin: '2px 0 0', fontSize: '28px', fontWeight: '900',
            letterSpacing: '-0.04em', lineHeight: 1,
            background: 'linear-gradient(135deg, #fff 0%, #aaa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Momentum
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Min Mode */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleToggleMinMode}
            style={{
              background: state.minModeActive ? '#1c1200' : '#0f0f14',
              border: `1px solid ${state.minModeActive ? '#7a5010' : '#1a1a24'}`,
              borderRadius: '12px', padding: '9px 13px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
              color: state.minModeActive ? '#f59e0b' : '#444',
              fontSize: '12px', fontWeight: '700',
              transition: 'all 0.2s',
            }}
          >
            <Zap size={13} />
            Min
          </motion.button>

          {/* Settings */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setSettingsOpen(true)}
            style={{
              background: '#0f0f14', border: '1px solid #1a1a24',
              borderRadius: '12px', padding: '9px 11px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              color: '#444',
            }}
          >
            <Settings size={15} />
          </motion.button>
        </div>
      </div>

      {/* Thin accent line */}
      <div style={{ margin: '16px 20px 0', height: '1px', background: 'linear-gradient(90deg, transparent, #1a1a3e, #1a3a1a, transparent)' }} />

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '14px 20px 0', gap: '4px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: '7px 4px',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              border: 'none', borderRadius: '10px',
              cursor: 'pointer',
              color: activeTab === tab.id ? '#000' : '#444',
              fontSize: '12px', fontWeight: '700',
              transition: 'all 0.18s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 0' }}>
        <AnimatePresence mode="wait">

          {/* TODAY */}
          {activeTab === 'today' && (
            <motion.div
              key="today"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <StreakBadge streak={state.currentStreak} totalDays={state.totalDaysCompleted} level={state.level} xp={state.totalXP} />

              {/* Daily Ticket */}
              <DailyTicket claimed={ticketClaimed} onClaim={handleClaimTicket} />

              {/* Progress bar */}
              <div style={{ margin: '16px 0 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#555', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Today&apos;s missions
                  {hasFruitToday && <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700' }}>⭐ Bonus</span>}
                </span>
                <span style={{ fontSize: '12px', color: progressPct === 100 ? '#4ade80' : '#444', fontWeight: '700' }}>
                  {completedCount}/{totalMissions}
                </span>
              </div>
              <div style={{ background: '#0f0f14', borderRadius: '6px', height: '6px', overflow: 'hidden', marginBottom: '16px' }}>
                <motion.div
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    height: '100%', borderRadius: '6px',
                    background: progressPct === 100
                      ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                      : 'linear-gradient(90deg, #6366f1, #a855f7)',
                    boxShadow: progressPct === 100 ? '0 0 8px rgba(74,222,128,0.4)' : '0 0 8px rgba(139,92,246,0.3)',
                  }}
                />
              </div>

              {/* Min mode banner */}
              <AnimatePresence>
                {state.minModeActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 14 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    style={{
                      background: '#150e00', border: '1px solid #7a5010',
                      borderRadius: '12px', padding: '11px 14px',
                      display: 'flex', gap: '10px', alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>⚡</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#f59e0b' }}>Min Mode Active</div>
                      <div style={{ fontSize: '11px', color: '#7a5a20' }}>Shorter sessions. The goal is just to show up.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Day complete */}
              <AnimatePresence>
                {state.todayCompleted && (
                  <DayComplete
                    minMode={state.minModeActive}
                    streak={state.currentStreak + 1}
                    xpEarned={todayXP}
                    justCompleted={justCompleted}
                  />
                )}
              </AnimatePresence>

              {/* Active missions */}
              {!state.todayCompleted && (
                <>
                  {state.todayMissions.map((mission, i) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      minMode={state.minModeActive}
                      onComplete={handleComplete}
                      onUndo={handleUndo}
                      index={i}
                    />
                  ))}
                </>
              )}

              {/* Completed missions reference */}
              {state.todayCompleted && (
                <div style={{ marginTop: '4px' }}>
                  {state.todayMissions.map((mission, i) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      minMode={state.minModeActive}
                      onComplete={handleComplete}
                      onUndo={handleUndo}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {/* Motivational footer */}
              {!state.todayCompleted && completedCount === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    textAlign: 'center', color: '#2a2a3a', fontSize: '13px',
                    marginTop: '20px', lineHeight: '1.5',
                  }}
                >
                  {state.currentStreak === 0
                    ? 'Day 1 starts here. Just do the first mission.'
                    : `${state.currentStreak}-day streak on the line. Don't let it drop.`}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* CALENDAR */}
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <SectionLabel>History</SectionLabel>
              <CalendarView calendarData={calendarData} />

              {state.history.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <SectionLabel>Recent Days</SectionLabel>
                  {[...state.history].reverse().slice(0, 10).map(record => (
                    <div key={record.date} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '11px 0', borderBottom: '1px solid #0f0f14',
                    }}>
                      <div style={{
                        width: '34px', height: '34px',
                        background: record.completed ? '#0c200c' : '#160808',
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '15px', border: `1px solid ${record.completed ? '#1a4a1a' : '#2a0a0a'}`,
                      }}>
                        {record.completed ? (record.minModeOnly ? '⚡' : '✓') : '○'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#ccc' }}>
                          {new Date(record.date + 'T12:00:00').toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </div>
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '1px' }}>
                          {record.completed ? `+${record.xpEarned} XP earned` : 'Not completed'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {state.history.length === 0 && (
                <p style={{ textAlign: 'center', color: '#2a2a3a', fontSize: '13px', marginTop: '32px' }}>
                  Complete your first day to see history here.
                </p>
              )}
            </motion.div>
          )}

          {/* BADGES */}
          {activeTab === 'badges' && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <SectionLabel>Insignias</SectionLabel>
              <BadgesView unlockedIds={state.badgesUnlocked} />
            </motion.div>
          )}

          {/* STATS */}
          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <SectionLabel>Your Progress</SectionLabel>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {[
                  { label: 'Current Streak', value: `${state.currentStreak}`, icon: '🔥', color: '#f59e0b' },
                  { label: 'Best Streak', value: `${state.longestStreak}`, icon: '⭐', color: '#fbbf24' },
                  { label: 'Total XP', value: `${state.totalXP}`, icon: '⚡', color: '#818cf8' },
                  { label: 'Level', value: `${state.level}`, icon: '🎖️', color: '#c084fc' },
                  { label: 'Days Done', value: `${state.totalDaysCompleted}`, icon: '✓', color: '#4ade80' },
                  {
                    label: 'Completion Rate',
                    value: state.history.length > 0
                      ? `${Math.round(state.history.filter(h => h.completed).length / state.history.length * 100)}%`
                      : '—',
                    icon: '📊',
                    color: '#38bdf8',
                  },
                ].map(({ label, value, icon, color }) => (
                  <div key={label} style={{
                    background: '#0d0d18', border: '1px solid #161628',
                    borderRadius: '14px', padding: '14px',
                  }}>
                    <div style={{ fontSize: '22px', fontWeight: '900', color, lineHeight: 1 }}>
                      {icon} {value}
                    </div>
                    <div style={{ fontSize: '10px', color: '#444', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed counters */}
              <div style={{ background: '#0d0d18', border: '1px solid #161628', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '700', marginBottom: '16px' }}>Activity Counters</div>
                {[
                  { label: '🏃 Runs', value: state.totalRuns },
                  { label: '💪 Push-ups (total)', value: state.totalPushups },
                  { label: '⚡ Abs (total)', value: state.totalAbs },
                  { label: '🇬🇧 English sessions', value: state.totalEnglishSessions },
                  { label: '🎤 Speaking sessions', value: state.totalSpeakingSessions },
                  { label: '🎬 Series/movies', value: state.totalMoviesWatched },
                  { label: '🤖 AI chats', value: state.totalChatSessions },
                  { label: '🔊 Shadowing sessions', value: state.totalShadowSessions },
                  { label: '🍎 Fruits eaten (bonus)', value: state.totalFruitsEaten },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #111' }}>
                    <span style={{ fontSize: '13px', color: '#888' }}>{label}</span>
                    <span style={{ fontSize: '13px', color: '#fff', fontWeight: '700' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Focus areas */}
              <div style={{ background: '#0d0d18', border: '1px solid #161628', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '700', marginBottom: '16px' }}>Focus Areas</div>
                {[
                  {
                    label: '🇬🇧 English',
                    color: '#6366f1',
                    count: state.history.flatMap(h => h.missions.filter(m => m.category === 'english' && (m.completed || m.minModeCompleted))).length,
                    total: state.history.length,
                  },
                  {
                    label: '💪 Fitness',
                    color: '#22c55e',
                    count: state.history.flatMap(h => h.missions.filter(m => m.category === 'fitness' && (m.completed || m.minModeCompleted))).length,
                    total: state.history.length,
                  },
                ].map(({ label, color, count, total }) => {
                  const pct = total > 0 ? Math.min(100, Math.round(count / total * 100)) : 0;
                  return (
                    <div key={label} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: '#888' }}>{label}</span>
                        <span style={{ fontSize: '12px', color: '#444' }}>{count} missions</span>
                      </div>
                      <div style={{ background: '#111', borderRadius: '4px', height: '5px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          style={{ height: '100%', borderRadius: '4px', background: color, boxShadow: `0 0 6px ${color}66` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Motivational card */}
              <div style={{
                background: 'linear-gradient(135deg, #0d0d20, #160a28)',
                border: '1px solid #221440',
                borderRadius: '16px', padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>
                  {getMotivationalIcon(state.totalDaysCompleted)}
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                  {getMotivationalMessage(state.totalDaysCompleted)}
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* PWA install banner */}
      <PWAInstallBanner />

      {/* Settings modal */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onReset={handleReset}
        streak={state.currentStreak}
        totalDays={state.totalDaysCompleted}
        totalXP={state.totalXP}
      />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      margin: '0 0 12px', fontSize: '11px',
      color: '#333', fontWeight: '700',
      textTransform: 'uppercase', letterSpacing: '0.1em',
    }}>
      {children}
    </h2>
  );
}

function getMotivationalIcon(days: number): string {
  if (days === 0) return '🌱';
  if (days < 7) return '🚀';
  if (days < 21) return '⚡';
  if (days < 60) return '🔥';
  return '👑';
}

function getMotivationalMessage(days: number): string {
  if (days === 0) return "Your journey starts today. Every expert was once a beginner.";
  if (days < 7) return "Early days are the hardest. You're laying the foundation right now.";
  if (days < 21) return "21 days builds a habit. You're in the zone where it starts to click.";
  if (days < 60) return "You've shown real consistency. This is who you're becoming.";
  return "Two months in. This isn't a habit anymore — it's your identity.";
}
