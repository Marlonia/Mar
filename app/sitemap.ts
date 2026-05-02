import { MetadataRoute } from 'next';

const SITE_URL = 'https://carnavalbarranquillautah.com';

const routes = [
  { es: '/', en: '/en', priority: 1.0, freq: 'weekly' as const },
  { es: '/clases', en: '/en/classes', priority: 0.9, freq: 'weekly' as const },
  { es: '/inscripcion', en: '/en/register', priority: 0.95, freq: 'monthly' as const },
  { es: '/galeria', en: '/en/gallery', priority: 0.7, freq: 'weekly' as const },
  { es: '/blog', en: '/en/blog', priority: 0.8, freq: 'daily' as const },
  { es: '/tienda', en: '/en/store', priority: 0.7, freq: 'weekly' as const },
  { es: '/contacto', en: '/en/contact', priority: 0.6, freq: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // Versión española
    entries.push({
      url: `${SITE_URL}${route.es}`,
      lastModified,
      changeFrequency: route.freq,
      priority: route.priority,
      alternates: {
        languages: {
          es: `${SITE_URL}${route.es}`,
          en: `${SITE_URL}${route.en}`,
          'x-default': `${SITE_URL}${route.es}`,
        },
      },
    });
    // Versión inglés
    entries.push({
      url: `${SITE_URL}${route.en}`,
      lastModified,
      changeFrequency: route.freq,
      priority: route.priority * 0.9, // Ligeramente menor para inglés
      alternates: {
        languages: {
          es: `${SITE_URL}${route.es}`,
          en: `${SITE_URL}${route.en}`,
          'x-default': `${SITE_URL}${route.es}`,
        },
      },
    });
  });

  return entries;
}
