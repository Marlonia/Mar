import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Academia de Danza Colombiana en West Valley City Utah',
  description:
    'Contáctanos para más información sobre clases de danza colombiana, eventos privados y presentaciones. Ubicados en West Valley City, Utah.',
  keywords: [
    'contacto academia danza utah',
    'teléfono carnaval barranquilla utah',
    'dirección academia west valley',
    'eventos privados danza colombiana',
  ],
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contáctanos | Carnaval BA Utah',
    description: 'Estamos en West Valley City, Utah. Escríbenos.',
    url: '/contacto',
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto - Carnaval de Barranquilla en Utah',
    mainEntity: {
      '@type': 'Organization',
      name: 'Carnaval de Barranquilla en Utah',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@carnavalba.com',
        areaServed: 'US',
        availableLanguage: ['Spanish', 'English'],
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'West Valley City',
        addressRegion: 'UT',
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
