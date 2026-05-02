import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: 'Carnaval de Barranquilla en Utah | Academia de Danza Colombiana',
  description:
    'Aprende Cumbia, Mapalé y Garabato con la única academia auténtica del Carnaval de Barranquilla en Utah. Clases para todos los niveles en West Valley City. ¡Inscríbete hoy!',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Carnaval de Barranquilla en Utah | Academia de Danza',
    description:
      'La única academia auténtica de danza del Carnaval de Barranquilla en Utah. Cumbia, Mapalé, Garabato y más.',
    url: '/',
    type: 'website',
  },
};

export default function Home() {
  return <HomeContent />;
}
