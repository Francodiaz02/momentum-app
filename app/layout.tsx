import type { Metadata, Viewport } from 'next';
import './globals.css';
import PWARegister from '@/components/PWARegister';

export const metadata: Metadata = {
  title: 'Momentum',
  description: 'Misiones diarias de inglés y actividad física',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Momentum',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
