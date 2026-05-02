import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import InscripcionForm from '@/components/InscripcionForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  return {
    title: isSpanish
      ? 'Inscripción - Únete a Carnaval de Barranquilla en Utah'
      : 'Registration - Join Carnival of Barranquilla in Utah',
    description: isSpanish
      ? 'Inscríbete en nuestras clases de danza colombiana. Clases para todas las edades en West Valley City, Utah.'
      : 'Register for our Colombian dance classes. Classes for all ages in West Valley City, Utah.',
    alternates: {
      canonical: locale === 'es' ? '/inscripcion' : '/en/register',
    },
  };
}

export default async function InscripcionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'RegisterPage' });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-yellow to-carnival-red text-white pt-32 pb-16">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold mb-4">{t('hero.title')}</h1>
          <p className="text-xl text-white/90">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-carnival-darkBg">
        <Suspense
          fallback={<div className="container-max text-center py-8 text-white">{t('loading')}</div>}
        >
          <InscripcionForm />
        </Suspense>
      </section>
    </>
  );
}
