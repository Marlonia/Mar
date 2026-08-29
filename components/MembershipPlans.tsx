'use client';

import { useEffect, useState } from 'react';

import MembershipCheckoutForm from '@/components/MembershipCheckoutForm';

export interface PlanInfo {
  id: string;
  nombre: string;
  montoCentavos: number;
  moneda: string;
  cadencia: string;
}

export function formatPrice(montoCentavos: number, moneda: string): string {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: moneda || 'USD',
  }).format(montoCentavos / 100);
}

export function isFamilyPlan(plan: PlanInfo): boolean {
  return /famil/i.test(plan.nombre);
}

export default function MembershipPlans() {
  const [plans, setPlans] = useState<PlanInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/plans')
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error cargando los planes');
        return data.plans as PlanInfo[];
      })
      .then((loaded) => {
        if (!cancelled) setPlans(loaded);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (selectedPlan) {
    return (
      <MembershipCheckoutForm plan={selectedPlan} onBack={() => setSelectedPlan(null)} />
    );
  }

  if (error) {
    return (
      <div className="bg-carnival-lightBg p-8 rounded-lg text-center max-w-2xl mx-auto">
        <p className="text-gray-700 mb-2">{error}</p>
        <p className="text-gray-600">
          También puedes escribirnos a{' '}
          <a href="mailto:info@carnavalba.com" className="font-bold">
            info@carnavalba.com
          </a>{' '}
          para activar tu membresía.
        </p>
      </div>
    );
  }

  if (!plans) {
    return (
      <div className="text-center py-12 text-gray-500 animate-pulse">Cargando planes…</div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="bg-carnival-lightBg p-8 rounded-lg text-center max-w-2xl mx-auto">
        <p className="text-gray-700">
          Aún no hay planes publicados. Escríbenos a{' '}
          <a href="mailto:info@carnavalba.com" className="font-bold">
            info@carnavalba.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-carnival-gold flex flex-col animate-slide-up"
        >
          <div className="text-4xl mb-4">{isFamilyPlan(plan) ? '👨‍👩‍👧‍👦' : '💃'}</div>
          <h3 className="text-2xl font-display font-bold text-carnival-darkBg mb-2">
            {plan.nombre}
          </h3>
          <p className="text-4xl font-bold text-carnival-red mb-1">
            {formatPrice(plan.montoCentavos, plan.moneda)}
            <span className="text-base font-normal text-gray-500"> /mes</span>
          </p>
          <ul className="text-gray-600 my-6 space-y-2 flex-1">
            <li>✅ Acceso a todas las clases de tu nivel</li>
            {isFamilyPlan(plan) ? (
              <li>✅ Hasta 5 miembros del grupo familiar</li>
            ) : (
              <li>✅ Membresía individual</li>
            )}
            <li>✅ Cobro automático mensual — cancela cuando quieras</li>
          </ul>
          <button
            type="button"
            onClick={() => setSelectedPlan(plan)}
            className="btn-primary w-full"
          >
            Suscribirme
          </button>
        </div>
      ))}
    </div>
  );
}
