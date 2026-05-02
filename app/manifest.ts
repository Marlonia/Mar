import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Carnaval de Barranquilla en Utah',
    short_name: 'Carnaval BA',
    description:
      'Academia de danza colombiana en Utah. Aprende Cumbia, Mapalé, Garabato y más.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F1419',
    theme_color: '#FFC600',
    orientation: 'portrait-primary',
    categories: ['education', 'lifestyle', 'entertainment'],
    lang: 'es',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
