import { Suspense } from 'react';
import type { Metadata } from 'next';
import InscripcionForm from '@/components/InscripcionForm';

export const metadata: Metadata = {
  title: 'Inscripción - Únete a Carnaval de Barranquilla en Utah',
  description:
    'Inscríbete en nuestras clases de danza colombiana. Cumbia, Mapalé, Garabato. Clases para todas las edades en West Valley City, Utah.',
  alternates: { canonical: '/inscripcion' },
  openGraph: {
    title: 'Inscríbete - Carnaval de Barranquilla Utah',
    description: 'Únete a la única academia auténtica del Carnaval de Barranquilla en Utah.',
    url: '/inscripcion',
  },
};

export default function InscripcionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-gold to-carnival-red text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold mb-4">Inscríbete Hoy</h1>
          <p className="text-xl text-white/90">
            Completa el formulario y únete a nuestra comunidad de danza
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <Suspense fallback={<div className="container-max text-center py-8">Cargando formulario...</div>}>
          <InscripcionForm />
        </Suspense>
      </section>
    </>
  );
}
