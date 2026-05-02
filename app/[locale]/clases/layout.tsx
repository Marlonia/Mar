import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';

  return {
    title: isSpanish
      ? 'Clases de Danza Colombiana en Utah | Cumbia, Mapalé, Champeta, Salsa y más'
      : 'Colombian Dance Classes in Utah | Cumbia, Mapalé, Champeta, Salsa and more',
    description: isSpanish
      ? 'Clases de danza colombiana para todos los niveles en Utah. Aprende Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urbano y Marimondas con instructoras profesionales.'
      : 'Colombian dance classes for all levels in Utah. Learn Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urban and Marimondas with professional instructors.',
    alternates: {
      canonical: locale === 'es' ? '/clases' : '/en/classes',
      languages: {
        'es-CO': '/clases',
        'en-US': '/en/classes',
      },
    },
    openGraph: {
      title: isSpanish ? 'Clases de Danza Colombiana en Utah' : 'Colombian Dance Classes in Utah',
      description: isSpanish
        ? '9 estilos de danza. Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urbano y Marimondas.'
        : '9 dance styles. Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urban and Marimondas.',
    },
  };
}

export default async function ClasesLayout({ children }: { children: React.ReactNode }) {
  const courseListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      'Cumbia',
      'Mapalé',
      'Garabato',
      'Champeta',
      'Salsa',
      'Son de Negro',
      'Bullerengue',
      'Danza Urbana',
      'Marimondas',
    ].map((name, i) => ({
      '@type': 'Course',
      position: i + 1,
      name,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Carnaval de Barranquilla en Utah',
      },
    })),
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
