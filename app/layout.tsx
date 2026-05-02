import type { Viewport } from 'next';
import './globals.css';

// Layout RAÍZ ultra-simple. La metadata, header, footer e i18n se manejan en [locale]/layout.tsx
// Este layout es necesario porque Next.js requiere que app/layout.tsx exista.

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFC600' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1419' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
