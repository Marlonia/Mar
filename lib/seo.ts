export const SITE_URL = 'https://carnavalbarranquillautah.com';

export function getOrganizationJsonLd(locale: 'es' | 'en' = 'es') {
  const isSpanish = locale === 'es';

  const description = isSpanish
    ? 'Academia de danza dedicada a preservar y promover las tradiciones del Carnaval de Barranquilla en Utah. Enseñamos Cumbia, Mapalé, Garabato y otras danzas folklóricas colombianas.'
    : 'Dance academy dedicated to preserving and promoting the traditions of the Carnival of Barranquilla in Utah. We teach Cumbia, Mapalé, Garabato, and other Colombian folk dances.';

  const courses = isSpanish
    ? [
        {
          name: 'Cumbia',
          description:
            'Aprende los pasos básicos de la Cumbia, la danza más tradicional del Carnaval de Barranquilla.',
        },
        {
          name: 'Mapalé',
          description: 'Ritmo afro-colombiano libre y energético. Para estudiantes con experiencia previa.',
        },
        {
          name: 'Garabato',
          description: 'Aprende la danza folklórica del Garabato con coreografía fluida.',
        },
        {
          name: 'Champeta',
          description: 'Ritmo afro-caribeño nacido en Cartagena con movimientos sensuales y energéticos.',
        },
        {
          name: 'Salsa',
          description: 'El ritmo más popular de Latinoamérica con pasos elegantes y energía contagiosa.',
        },
        {
          name: 'Son de Negro',
          description: 'Danza ancestral afro-colombiana con tambores, máscaras y profunda raíz cultural.',
        },
        {
          name: 'Bullerengue',
          description: 'Ritmo de tambor y voz femenina, esencia auténtica del Caribe colombiano.',
        },
        {
          name: 'Danza Urbana',
          description: 'Reggaetón, dancehall y estilos modernos. La fusión del Caribe con lo contemporáneo.',
        },
        {
          name: 'Marimondas',
          description: 'La danza del personaje icónico del Carnaval de Barranquilla.',
        },
        {
          name: 'Danza para Niños 5-12 años',
          description:
            'Clases divertidas y dinámicas para niños donde aprenden a través del movimiento y la música.',
        },
      ]
    : [
        {
          name: 'Cumbia',
          description: 'Learn the basic steps of Cumbia, the most traditional dance of the Carnival of Barranquilla.',
        },
        {
          name: 'Mapalé',
          description: 'Free and energetic Afro-Colombian rhythm. For students with previous experience.',
        },
        {
          name: 'Garabato',
          description: 'Learn the folkloric dance of Garabato with fluid choreography.',
        },
        {
          name: 'Champeta',
          description: 'Afro-Caribbean rhythm born in Cartagena with sensual and energetic movements.',
        },
        {
          name: 'Salsa',
          description: 'The most popular rhythm in Latin America with elegant steps and contagious energy.',
        },
        {
          name: 'Son de Negro',
          description: 'Ancestral Afro-Colombian dance with drums, masks, and deep cultural roots.',
        },
        {
          name: 'Bullerengue',
          description: 'Drum and female voice rhythm, authentic essence of the Colombian Caribbean.',
        },
        {
          name: 'Urban Dance',
          description: 'Reggaeton, dancehall, and modern styles. The fusion of the Caribbean with the contemporary.',
        },
        {
          name: 'Marimondas',
          description: 'The dance of the iconic character of the Carnival of Barranquilla.',
        },
        {
          name: 'Children Dance Classes 5-12 years',
          description: 'Fun and dynamic classes for children where they learn through movement and music.',
        },
      ];

  const orgName = 'Carnaval de Barranquilla en Utah';
  const inLanguage = locale === 'es' ? 'es-CO' : 'en-US';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'DanceSchool', 'EducationalOrganization'],
        '@id': `${SITE_URL}/#organization`,
        name: orgName,
        alternateName: ['Carnaval BA Utah', 'Academia Carnaval Barranquilla', 'Carnival BA Utah'],
        description,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          width: '512',
          height: '512',
        },
        image: `${SITE_URL}/og-image.jpg`,
        telephone: '+1-801-555-0000',
        email: 'info@carnavalba.com',
        priceRange: '$$',
        founder: [
          {
            '@type': 'Person',
            name: 'Mayra Rincón',
            jobTitle: isSpanish ? 'Directora & Co-Fundadora' : 'Director & Co-Founder',
          },
          {
            '@type': 'Person',
            name: 'Marilyn Gallardo',
            jobTitle: isSpanish ? 'Directora & Co-Fundadora' : 'Director & Co-Founder',
          },
        ],
        foundingDate: '2022',
        foundingLocation: 'West Valley City, Utah',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'West Valley City',
          addressRegion: 'UT',
          postalCode: '84119',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 40.6916,
          longitude: -112.0011,
        },
        areaServed: [
          { '@type': 'City', name: 'West Valley City' },
          { '@type': 'City', name: 'Salt Lake City' },
          { '@type': 'City', name: 'West Jordan' },
          { '@type': 'State', name: 'Utah' },
        ],
        sameAs: [
          'https://www.instagram.com/carnavalbaq',
          'https://www.facebook.com/carnavaldebarranquillautah',
        ],
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday'], opens: '19:00', closes: '20:30' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Thursday'], opens: '20:00', closes: '21:30' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '17:00', closes: '18:00' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isSpanish ? 'Clases de Danza Colombiana' : 'Colombian Dance Classes',
          itemListElement: courses.map((course) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Course',
              name: course.name,
              description: course.description,
              provider: { '@id': `${SITE_URL}/#organization` },
            },
          })),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '47',
          bestRating: '5',
          worstRating: '1',
        },
        knowsAbout: [
          'Cumbia',
          'Mapalé',
          'Garabato',
          'Champeta',
          'Salsa',
          'Son de Negro',
          'Bullerengue',
          isSpanish ? 'Danza Urbana' : 'Urban Dance',
          'Marimondas',
          isSpanish ? 'Carnaval de Barranquilla' : 'Carnival of Barranquilla',
          isSpanish ? 'Danza Folklórica Colombiana' : 'Colombian Folk Dance',
          isSpanish ? 'Cultura Caribeña Colombiana' : 'Colombian Caribbean Culture',
          'Reggaetón',
          'Dancehall',
        ],
        memberOf: {
          '@type': 'Organization',
          name: isSpanish ? 'Comunidad Hispana de Utah' : 'Hispanic Community of Utah',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: orgName,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage,
      },
    ],
  };
}
