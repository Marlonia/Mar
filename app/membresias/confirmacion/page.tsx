import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Membresía activa | Carnaval de Barranquilla en Utah',
};

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;

  return (
    <section className="py-24">
      <div className="container-max max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-display font-bold text-carnival-darkBg mb-4">
          ¡Tu membresía está activa!
        </h1>
        {plan && (
          <p className="text-xl text-carnival-red font-accent font-bold mb-4">{plan}</p>
        )}
        <p className="text-gray-600 mb-2">
          Recibirás un recibo de Square por email con cada cobro mensual.
        </p>
        <p className="text-gray-600 mb-8">
          Para cancelar o actualizar tu tarjeta, escríbenos a{' '}
          <a href="mailto:info@carnavalba.com" className="font-bold">
            info@carnavalba.com
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/clases" className="btn-primary">
            Ver horarios de clases
          </Link>
          <Link href="/" className="btn-outline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
