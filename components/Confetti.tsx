'use client';

import { useEffect, useRef } from 'react';

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#6366f1', '#a855f7', '#22c55e', '#f59e0b', '#ec4899', '#3b82f6'];
    const particles: {
      x: number; y: number; vx: number; vy: number;
      color: string; size: number; rotation: number; rotSpeed: number; alpha: number;
    }[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        alpha: 1,
      });
    }

    let frame: number;
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rotation += p.rotSpeed;
        if (tick > 80) p.alpha = Math.max(0, p.alpha - 0.015);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      const allGone = particles.every(p => p.alpha <= 0 || p.y > canvas.height + 20);
      if (!allGone) {
        frame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 9999,
      }}
    />
  );
}
