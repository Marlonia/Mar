import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda - Trajes, Máscaras y Accesorios del Carnaval',
  description:
    'Compra trajes de Marimonda, máscaras, accesorios y entradas a eventos. Productos auténticos del Carnaval de Barranquilla en Utah.',
  keywords: [
    'trajes marimonda',
    'máscaras carnaval barranquilla',
    'accesorios danza colombiana',
    'tienda online carnaval',
    'comprar traje cumbia',
  ],
  alternates: { canonical: '/tienda' },
  openGraph: {
    title: 'Tienda Online | Carnaval BA Utah',
    description: 'Trajes, máscaras y accesorios auténticos del Carnaval.',
    url: '/tienda',
    type: 'website',
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Tienda Carnaval de Barranquilla Utah',
    description: 'Trajes, máscaras y accesorios del Carnaval de Barranquilla.',
    paymentAccepted: ['Credit Card', 'Debit Card'],
    currenciesAccepted: 'USD',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />
      {children}
    </>
  );
}
