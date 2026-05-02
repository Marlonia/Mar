import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clases de Danza Colombiana en Utah | Cumbia, Mapalé, Champeta, Salsa y más',
  description:
    'Clases de danza colombiana para todos los niveles en Utah. Aprende Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urbano y Marimondas con instructoras profesionales. Lunes a sábado en West Valley City.',
  keywords: [
    'clases de cumbia utah',
    'clases de mapalé utah',
    'clases de garabato',
    'clases de champeta',
    'clases de salsa utah',
    'clases de bullerengue',
    'clases de son de negro',
    'clases urbano latino',
    'clases marimondas',
    'horario danza colombiana',
    'academia danza salt lake city',
    'clases para principiantes danza',
    'clases para niños danza colombiana',
  ],
  alternates: {
    canonical: '/clases',
  },
  openGraph: {
    title: 'Clases de Danza Colombiana en Utah - 9 Estilos Diferentes',
    description: 'Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urbano y Marimondas. ¡Inscríbete hoy!',
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
      {
        '@type': 'Course',
        position: 4,
        name: 'Champeta',
        description: 'Ritmo afro-caribeño nacido en Cartagena con movimientos sensuales y energéticos.',
        provider: { '@type': 'EducationalOrganization', name: 'Carnaval de Barranquilla en Utah' },
      },
      {
        '@type': 'Course',
        position: 5,
        name: 'Salsa',
        description: 'El ritmo más popular de Latinoamérica con pasos elegantes y energía contagiosa.',
        provider: { '@type': 'EducationalOrganization', name: 'Carnaval de Barranquilla en Utah' },
      },
      {
        '@type': 'Course',
        position: 6,
        name: 'Son de Negro',
        description: 'Danza ancestral afro-colombiana con tambores, máscaras y profunda raíz cultural.',
        provider: { '@type': 'EducationalOrganization', name: 'Carnaval de Barranquilla en Utah' },
      },
      {
        '@type': 'Course',
        position: 7,
        name: 'Bullerengue',
        description: 'Ritmo de tambor y voz femenina, esencia auténtica del Caribe colombiano.',
        provider: { '@type': 'EducationalOrganization', name: 'Carnaval de Barranquilla en Utah' },
      },
      {
        '@type': 'Course',
        position: 8,
        name: 'Danza Urbana',
        description: 'Reggaetón, dancehall y estilos modernos. La fusión del Caribe con lo contemporáneo.',
        provider: { '@type': 'EducationalOrganization', name: 'Carnaval de Barranquilla en Utah' },
      },
      {
        '@type': 'Course',
        position: 9,
        name: 'Marimondas',
        description: 'La danza del personaje icónico del Carnaval de Barranquilla.',
        provider: { '@type': 'EducationalOrganization', name: 'Carnaval de Barranquilla en Utah' },
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
