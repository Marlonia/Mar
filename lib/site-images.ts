/**
 * 📸 Sistema central de configuración de imágenes
 *
 * Todas las imágenes del sitio están definidas aquí. Si quieres cambiar
 * una imagen, solo edita esta configuración y sube el archivo correspondiente
 * a la carpeta /public/images/<categoria>/.
 *
 * Si una imagen no existe, automáticamente se usa el `fallback` (emoji).
 */

export interface SiteImage {
  /** Ruta a la imagen (relativa a /public) */
  src: string;
  /** Texto alternativo para accesibilidad y SEO */
  alt: string;
  /** Emoji a mostrar si la imagen no existe */
  fallback: string;
}

// ============================================
// HERO - Imágenes flotantes del background
// ============================================
export const HERO_FLOATING_IMAGES: (SiteImage & { position: string; delay?: string })[] = [
  {
    src: '/images/hero/floating-1.png',
    alt: 'Marimonda flotante',
    fallback: '🎭',
    position: 'top-1/4 left-10',
  },
  {
    src: '/images/hero/floating-2.png',
    alt: 'Confeti carnaval',
    fallback: '🎉',
    position: 'top-1/3 right-20',
  },
  {
    src: '/images/hero/floating-3.png',
    alt: 'Bailarina',
    fallback: '💃',
    position: 'bottom-1/4 left-1/4',
    delay: '1s',
  },
  {
    src: '/images/hero/floating-4.png',
    alt: 'Música del carnaval',
    fallback: '🎶',
    position: 'top-2/3 right-1/3',
    delay: '2s',
  },
];

// ============================================
// ABOUT - Card de Marimonda
// ============================================
export const ABOUT_IMAGE: SiteImage = {
  src: '/images/about/marimonda-card.jpg',
  alt: 'Marimonda - Personaje icónico del Carnaval de Barranquilla',
  fallback: '🎭',
};

// ============================================
// DANCES - Imágenes de cada danza
// ============================================
export const DANCE_IMAGES: Record<string, SiteImage> = {
  cumbia: {
    src: '/images/dances/cumbia.jpg',
    alt: 'Cumbia - Danza tradicional del Carnaval',
    fallback: '💃',
  },
  mapale: {
    src: '/images/dances/mapale.jpg',
    alt: 'Mapalé - Ritmo afro-colombiano',
    fallback: '🎶',
  },
  garabato: {
    src: '/images/dances/garabato.jpg',
    alt: 'Garabato - Danza folklórica',
    fallback: '🎄',
  },
  champeta: {
    src: '/images/dances/champeta.jpg',
    alt: 'Champeta - Ritmo afro-caribeño',
    fallback: '🎵',
  },
  salsa: {
    src: '/images/dances/salsa.jpg',
    alt: 'Salsa - El ritmo más popular de Latinoamérica',
    fallback: '💋',
  },
  'son-de-negro': {
    src: '/images/dances/son-de-negro.jpg',
    alt: 'Son de Negro - Danza ancestral afro-colombiana',
    fallback: '🥁',
  },
  bullerengue: {
    src: '/images/dances/bullerengue.jpg',
    alt: 'Bullerengue - Esencia del Caribe colombiano',
    fallback: '🌊',
  },
  urbano: {
    src: '/images/dances/urbano.jpg',
    alt: 'Danza Urbana - Reggaetón y dancehall',
    fallback: '🎤',
  },
  marimondas: {
    src: '/images/dances/marimondas.jpg',
    alt: 'Marimondas - Personaje icónico del Carnaval',
    fallback: '🎭',
  },
};

// ============================================
// Helpers
// ============================================

/**
 * Verifica si una imagen "existe" en el filesystem.
 * En Next.js esto se hace en build-time. Aquí simplemente
 * devolvemos true y dejamos que el componente <SmartImage />
 * maneje el error de carga (fallback al emoji).
 */
export function getImage(category: 'dance', key: string): SiteImage | null {
  if (category === 'dance') {
    return DANCE_IMAGES[key] ?? null;
  }
  return null;
}
