import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clases de Danza Colombiana en Utah | Cumbia, Mapalé, Garabato',
  description:
    'Clases de danza colombiana para todos los niveles en Utah. Aprende Cumbia, Mapalé y Garabato con instructoras profesionales certificadas. Lunes a sábado en West Valley City.',
  keywords: [
    'clases de cumbia utah',
    'clases de mapalé utah',
    'clases de garabato',
    'horario danza colombiana',
    'academia danza salt lake city',
    'clases para principiantes danza',
    'clases para niños danza colombiana',
  ],
  alternates: {
    canonical: '/clases',
  },
  openGraph: {
    title: 'Clases de Danza Colombiana en Utah',
    description: 'Horarios y niveles para todas las edades. ¡Inscríbete hoy!',
    url: '/clases',
    type: 'website',
  },
};

export default function ClasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Course',
        position: 1,
        name: 'Cumbia para Principiantes',
        description: 'Aprende los pasos básicos de la Cumbia, la danza más tradicional del Carnaval de Barranquilla.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Carnaval de Barranquilla en Utah',
          sameAs: 'https://carnavalbarranquillautah.com',
        },
        offers: {
          '@type': 'Offer',
          category: 'Class',
          availability: 'https://schema.org/InStock',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'In-person',
          location: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'West Valley City',
              addressRegion: 'UT',
            },
          },
        },
      },
      {
        '@type': 'Course',
        position: 2,
        name: 'Mapalé Intermedio',
        description: 'Ritmo afro-colombiano con movimientos libres y energéticos. Para estudiantes con experiencia previa.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Carnaval de Barranquilla en Utah',
        },
      },
      {
        '@type': 'Course',
        position: 3,
        name: 'Garabato Folklórico',
        description: 'Danza folklórica tradicional con coreografía fluida y elegante.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Carnaval de Barranquilla en Utah',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd) }}
      />
      {children}
    </>
  );
}
