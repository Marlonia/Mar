import { NextResponse } from 'next/server';

import { isSquareConfigured, listMembershipPlans } from '@/lib/square';

// Cachear el catálogo 5 minutos: los precios cambian en el Dashboard de Square,
// no en cada request
export const revalidate = 300;

export async function GET() {
  if (!isSquareConfigured()) {
    return NextResponse.json(
      { error: 'Los pagos en línea no están disponibles por el momento.' },
      { status: 503 }
    );
  }

  try {
    const plans = await listMembershipPlans();
    const monthlyPlans = plans.filter((plan) => plan.cadencia === 'MONTHLY');
    return NextResponse.json({ plans: monthlyPlans });
  } catch (error) {
    console.error('[api/plans] Error consultando el catálogo de Square:', error);
    return NextResponse.json(
      { error: 'No pudimos cargar los planes. Intenta de nuevo en unos minutos.' },
      { status: 502 }
    );
  }
}
