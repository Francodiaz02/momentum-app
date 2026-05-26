'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, Plus } from 'lucide-react';

type Platform = 'ios' | 'android' | null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallBanner() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>(null);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // User already dismissed
    if (localStorage.getItem('pwa-banner-dismissed')) return;

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/.test(ua);

    if (isIOS) {
      setPlatform('ios');
      // Delay so it doesn't feel intrusive on first load
      const t = setTimeout(() => setShow(true), 4000);
      return () => clearTimeout(t);
    }

    if (isAndroid || (!isIOS && !isAndroid)) {
      // Chrome desktop/Android: listen for native install prompt
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferred(e as BeforeInstallPromptEvent);
        setPlatform('android');
        setShow(true);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('pwa-banner-dismissed', '1');
  };

  const install = async () => {
    if (!deferred) return;
    const evt = deferred;
    setDeferred(null); // prevent double-trigger
    await evt.prompt();
    const { outcome } = await evt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
      localStorage.setItem('pwa-banner-dismissed', '1');
    } else {
      setDeferred(evt); // restore if user cancelled
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            position: 'fixed', bottom: '16px', left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)', maxWidth: '440px',
            background: '#111118',
            border: '1px solid #2a2a4a',
            borderRadius: '18px',
            padding: '16px',
            zIndex: 500,
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
          }}
        >
          <button
            onClick={dismiss}
            style={{
              position: 'absolute', top: '12px', right: '12px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#444', padding: '4px',
            }}
          >
            <X size={15} />
          </button>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            {/* App icon */}
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #1a1a3e, #0a2a1a)',
              border: '1px solid #2a2a4a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', flexShrink: 0,
            }}>
              ◈
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#fff', marginBottom: '3px' }}>
                Instalá Momentum
              </div>

              {platform === 'ios' ? (
                <>
                  <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.45', marginBottom: '12px' }}>
                    Agregala a tu pantalla de inicio para abrirla como app.
                  </div>
                  <div style={{
                    background: '#0a0a18', borderRadius: '12px', padding: '10px 12px',
                    display: 'flex', flexDirection: 'column', gap: '8px',
                  }}>
                    {[
                      { icon: <Share size={14} />, text: 'Tocá el botón Compartir en Safari' },
                      { icon: <Plus size={14} />, text: 'Elegí "Añadir a pantalla de inicio"' },
                    ].map(({ icon, text }, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '24px', height: '24px',
                          background: '#1a1a3e', borderRadius: '7px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#6366f1', flexShrink: 0,
                        }}>
                          {icon}
                        </span>
                        <span style={{ fontSize: '12px', color: '#888' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                    Instalala para abrirla como app nativa, sin navegador.
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={install}
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                      border: 'none', borderRadius: '10px',
                      padding: '9px 20px', cursor: 'pointer',
                      color: '#fff', fontSize: '13px', fontWeight: '700',
                      boxShadow: '0 2px 16px rgba(99,102,241,0.3)',
                    }}
                  >
                    Instalar app
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
