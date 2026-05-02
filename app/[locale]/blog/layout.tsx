import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Cultura del Carnaval de Barranquilla',
  description:
    'Descubre la historia, las danzas y las tradiciones del Carnaval de Barranquilla. Artículos sobre Cumbia, Mapalé, Garabato y la cultura colombiana en Utah.',
  keywords: [
    'historia carnaval barranquilla',
    'cultura colombiana utah',
    'tradiciones colombianas',
    'origen cumbia',
    'historia mapalé',
    'patrimonio cultural unesco carnaval',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Carnaval de Barranquilla en Utah',
    description: 'Historias, guías y noticias sobre la danza colombiana.',
    url: '/blog',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog del Carnaval de Barranquilla en Utah',
    description:
      'Artículos sobre la cultura, danzas y tradiciones del Carnaval de Barranquilla.',
    publisher: {
      '@type': 'Organization',
      name: 'Carnaval de Barranquilla en Utah',
      logo: {
        '@type': 'ImageObject',
        url: 'https://carnavalbarranquillautah.com/logo.png',
      },
    },
    inLanguage: 'es-CO',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {children}
    </>
  );
}
