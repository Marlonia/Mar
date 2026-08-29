import type { Metadata } from 'next';

import MembershipPlans from '@/components/MembershipPlans';

export const metadata: Metadata = {
  title: 'Membresías | Carnaval de Barranquilla en Utah',
  description:
    'Activa tu membresía mensual de la academia de danza: pago seguro con tarjeta y cobro automático cada mes.',
};

// Precios de referencia para la Fase 0 (los reales viven en el plan de Square y
// se muestran en su checkout). En la fase integrada los precios se leen del
// catálogo de Square vía /api/plans y estos valores no se usan.
const FALLBACK_PLANS = [
  {
    key: 'individual',
    nombre: 'Membresía Individual',
    precio: '$59.99',
    icono: '💃',
    beneficios: ['Acceso a todas las clases de tu nivel', 'Membresía individual'],
    link: process.env.NEXT_PUBLIC_SQUARE_LINK_INDIVIDUAL,
  },
  {
    key: 'familiar',
    nombre: 'Membresía Familiar',
    precio: '$139',
    icono: '👨‍👩‍👧‍👦',
    beneficios: ['Acceso a todas las clases', 'Hasta 5 miembros del grupo familiar'],
    link: process.env.NEXT_PUBLIC_SQUARE_LINK_FAMILIAR,
  },
];

export default function MembresiasPage() {
  const integratedCheckout = Boolean(
    process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID
  );
  const hasPaymentLinks = FALLBACK_PLANS.some((plan) => plan.link);

  return (
    <>
      {/* Hero */}
      <section className="gradient-carnival py-20 text-center">
        <div className="container-max">
          <h1 className="text-white font-display font-bold mb-4 drop-shadow-lg">
            Membresías 🎭
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto">
            Únete a la academia con un solo pago mensual automático. Sin filas, sin
            efectivo, sin olvidos: tu cupo siempre asegurado.
          </p>
        </div>
      </section>

      {/* Planes */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            Elige tu plan
          </h2>

          {integratedCheckout ? (
            <MembershipPlans />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {FALLBACK_PLANS.map((plan) => (
                <div
                  key={plan.key}
                  className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-carnival-gold flex flex-col animate-slide-up"
                >
                  <div className="text-4xl mb-4">{plan.icono}</div>
                  <h3 className="text-2xl font-display font-bold text-carnival-darkBg mb-2">
                    {plan.nombre}
                  </h3>
                  <p className="text-4xl font-bold text-carnival-red mb-1">
                    {plan.precio}
                    <span className="text-base font-normal text-gray-500"> /mes</span>
                  </p>
                  <ul className="text-gray-600 my-6 space-y-2 flex-1">
                    {plan.beneficios.map((beneficio) => (
                      <li key={beneficio}>✅ {beneficio}</li>
                    ))}
                    <li>✅ Cobro automático mensual — cancela cuando quieras</li>
                  </ul>
                  {plan.link ? (
                    <a
                      href={plan.link}
                      className="btn-primary w-full text-center"
                      rel="noopener"
                    >
                      Suscribirme
                    </a>
                  ) : (
                    <a
                      href="mailto:info@carnavalba.com?subject=Quiero%20mi%20membres%C3%ADa"
                      className="btn-outline w-full text-center"
                    >
                      Escríbenos para inscribirte
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {!integratedCheckout && hasPaymentLinks && (
            <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
              🔒 El pago se realiza en la página segura de Square. Recibirás tu recibo por
              email cada mes.
            </p>
          )}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 bg-carnival-lightBg">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '📝',
                title: '1. Elige tu plan',
                desc: 'Individual o familiar (hasta 5 personas del mismo grupo familiar).',
              },
              {
                icon: '💳',
                title: '2. Registra tu tarjeta',
                desc: 'Pago 100% seguro procesado por Square. Tu tarjeta nunca se guarda en nuestro sitio.',
              },
              {
                icon: '🎉',
                title: '3. ¡A bailar!',
                desc: 'El primer cobro es tu primera mensualidad y luego se renueva automáticamente cada mes.',
              },
            ].map((step) => (
              <div key={step.title} className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Política y FAQ */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: '¿Cuándo se hace el cobro?',
                a: 'El primer cobro se hace al momento de suscribirte y es tu primera mensualidad. Después, Square cobra automáticamente tu tarjeta cada mes en la misma fecha.',
              },
              {
                q: '¿Cómo cancelo o cambio mi tarjeta?',
                a: 'Escríbenos a info@carnavalba.com o llámanos y lo gestionamos de inmediato. Puedes cancelar cuando quieras antes de tu próximo cobro; no hay reembolsos parciales del mes en curso.',
              },
              {
                q: '¿Qué incluye el plan familiar?',
                a: 'Hasta 5 personas del mismo grupo familiar pueden tomar clases con una sola mensualidad. Al suscribirte nos indicas los nombres de los miembros.',
              },
              {
                q: '¿Qué pasa si falla el cobro?',
                a: 'Square reintenta el cobro automáticamente y te avisa por email para que actualices tu tarjeta. Si tienes problemas, contáctanos y lo resolvemos.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-carnival-lightBg p-6 rounded-lg">
                <h4 className="font-accent font-bold text-carnival-red mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
