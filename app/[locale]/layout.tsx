import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SessionProvider from '@/components/providers/SessionProvider';
import { routing } from '@/i18n/routing';
import { SITE_URL, getOrganizationJsonLd } from '@/lib/seo';

// Generación estática para cada idioma
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  const isSpanish = locale === 'es';

  const title = isSpanish
    ? 'Carnaval de Barranquilla en Utah | Academia de Danza Colombiana'
    : 'Carnival of Barranquilla in Utah | Colombian Dance Academy';

  const description = isSpanish
    ? 'Aprende Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urbano y Marimondas con la única academia auténtica del Carnaval de Barranquilla en Utah. Clases para todos los niveles en West Valley City. ¡Inscríbete hoy!'
    : 'Learn Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urban and Marimondas with the only authentic Carnival of Barranquilla academy in Utah. Classes for all levels in West Valley City. Register today!';

  const keywords = isSpanish
    ? [
        'carnaval de barranquilla utah',
        'academia de danza colombiana utah',
        'clases de cumbia utah',
        'clases de mapalé utah',
        'clases de champeta utah',
        'clases de salsa utah',
        'clases de bullerengue',
        'clases de son de negro',
        'danza urbana latina utah',
        'danza colombiana west valley',
        'cumbia salt lake city',
        'salsa salt lake city',
        'marimonda utah',
        'Mayra Rincon',
        'Marilyn Gallardo',
      ]
    : [
        'carnival of barranquilla utah',
        'colombian dance academy utah',
        'cumbia classes utah',
        'mapale classes utah',
        'champeta classes utah',
        'salsa classes utah',
        'bullerengue classes',
        'son de negro dance',
        'latin urban dance utah',
        'colombian dance west valley',
        'cumbia salt lake city',
        'salsa salt lake city',
        'marimonda utah',
        'Colombian folk dance Utah',
        'caribbean dance Utah',
      ];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: isSpanish
        ? '%s | Carnaval de Barranquilla Utah'
        : '%s | Carnival of Barranquilla Utah',
    },
    description,
    keywords,
    authors: [{ name: 'Mayra Rincón y Marilyn Gallardo' }],
    creator: 'Carnaval de Barranquilla en Utah',
    publisher: 'Carnaval de Barranquilla en Utah',
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: {
        'es-CO': '/',
        'en-US': '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: isSpanish ? 'es_CO' : 'en_US',
      alternateLocale: isSpanish ? ['en_US'] : ['es_CO'],
      url: locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
      siteName: 'Carnaval de Barranquilla en Utah',
      title,
      description,
      images: [
        { url: '/og-image.jpg', width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
      creator: '@carnavalbaq',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.webmanifest',
    category: 'Education',
    classification: 'Dance Academy',
    other: {
      'geo.region': 'US-UT',
      'geo.placename': 'West Valley City',
      'geo.position': '40.6916;-112.0011',
      ICBM: '40.6916, -112.0011',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = getOrganizationJsonLd(locale as 'es' | 'en');

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-carnival-darkBg text-white">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SessionProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
