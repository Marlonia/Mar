import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Idiomas soportados
  locales: ['es', 'en'],

  // Idioma por defecto
  defaultLocale: 'es',

  // Detectar idioma del navegador automáticamente
  localeDetection: true,

  // Solo agregar prefijo cuando NO es el idioma por defecto
  // Español: /clases (sin prefijo)
  // Inglés: /en/classes
  localePrefix: 'as-needed',

  // Mapeo de URLs por idioma (para SEO friendly)
  pathnames: {
    '/': '/',
    '/clases': {
      es: '/clases',
      en: '/classes',
    },
    '/galeria': {
      es: '/galeria',
      en: '/gallery',
    },
    '/blog': '/blog',
    '/tienda': {
      es: '/tienda',
      en: '/store',
    },
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
    '/inscripcion': {
      es: '/inscripcion',
      en: '/register',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
