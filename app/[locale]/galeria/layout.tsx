import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galería - Fotos y Videos del Carnaval de Barranquilla en Utah',
  description:
    'Revive los momentos más coloridos de nuestras actuaciones. Fotos y videos del Hispanic Day Parade NY, festivales y eventos de la academia de danza colombiana en Utah.',
  keywords: [
    'fotos carnaval barranquilla utah',
    'videos danza colombiana',
    'galería academia danza',
    'hispanic day parade new york',
    'eventos danza colombiana utah',
  ],
  alternates: { canonical: '/galeria' },
  openGraph: {
    title: 'Galería de Fotos y Videos | Carnaval BA Utah',
    description: 'Mira las actuaciones y eventos de nuestra academia de danza.',
    url: '/galeria',
    type: 'website',
  },
};

export default function GaleriaLayout({ children }: { children: React.ReactNode }) {
  const imageGalleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Galería del Carnaval de Barranquilla en Utah',
    description: 'Fotos y videos de nuestras actuaciones, clases y eventos.',
    publisher: {
      '@type': 'Organization',
      name: 'Carnaval de Barranquilla en Utah',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryJsonLd) }}
      />
      {children}
    </>
  );
}
