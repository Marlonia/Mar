import { NextResponse } from 'next/server';
import { SquareError } from 'square';

import { clientIpFrom, isRateLimited } from '@/lib/rate-limit';
import {
  findOrCreateCustomer,
  isSquareConfigured,
  listMembershipPlans,
  SQUARE_LOCATION_ID,
  squareClient,
} from '@/lib/square';
import { subscriptionRequestSchema } from '@/lib/validation';

export async function POST(request: Request) {
  if (!isSquareConfigured()) {
    return NextResponse.json(
      { error: 'Los pagos en línea no están disponibles por el momento.' },
      { status: 503 }
    );
  }

  if (isRateLimited(clientIpFrom(request.headers))) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera un minuto e intenta de nuevo.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const parsed = subscriptionRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Revisa los datos del formulario e intenta de nuevo.' },
      { status: 400 }
    );
  }
  const data = parsed.data;

  try {
    // Solo aceptamos planes que existan en el Catalog de Square (lista blanca)
    const plans = await listMembershipPlans();
    const plan = plans.find((p) => p.id === data.planVariationId);
    if (!plan) {
      return NextResponse.json({ error: 'El plan seleccionado no es válido.' }, { status: 400 });
    }

    const miembros = data.miembrosFamilia?.filter(Boolean) ?? [];
    const nota =
      miembros.length > 0
        ? `Plan: ${plan.nombre}. Grupo familiar: ${miembros.join(', ')}`
        : `Plan: ${plan.nombre}`;

    const customerId = await findOrCreateCustomer({
      email: data.email,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono || undefined,
      nota,
      idempotencyKey: `${data.idempotencyKey}-customer`.slice(0, 45),
    });

    const cardResult = await squareClient.cards.create({
      idempotencyKey: `${data.idempotencyKey}-card`.slice(0, 45),
      sourceId: data.cardToken,
      verificationToken: data.verificationToken,
      card: {
        customerId,
        cardholderName: `${data.nombre} ${data.apellido}`.slice(0, 96),
      },
    });

    const cardId = cardResult.card?.id;
    if (!cardId) {
      throw new Error('Square no devolvió un ID de tarjeta');
    }

    const subscriptionResult = await squareClient.subscriptions.create({
      idempotencyKey: `${data.idempotencyKey}-sub`.slice(0, 45),
      locationId: SQUARE_LOCATION_ID,
      planVariationId: plan.id,
      customerId,
      cardId,
    });

    const subscriptionId = subscriptionResult.subscription?.id;
    if (!subscriptionId) {
      throw new Error('Square no devolvió un ID de suscripción');
    }

    return NextResponse.json({ ok: true, subscriptionId, plan: plan.nombre });
  } catch (error) {
    if (error instanceof SquareError) {
      const firstError = error.errors?.[0];
      console.error('[api/subscriptions] Error de Square:', {
        status: error.statusCode,
        category: firstError?.category,
        code: firstError?.code,
      });
      if (firstError?.category === 'PAYMENT_METHOD_ERROR') {
        return NextResponse.json(
          { error: 'Tu tarjeta fue rechazada. Verifica los datos o usa otra tarjeta.' },
          { status: 402 }
        );
      }
    } else {
      console.error('[api/subscriptions] Error inesperado:', error);
    }
    return NextResponse.json(
      { error: 'No pudimos completar la suscripción. Intenta de nuevo o contáctanos.' },
      { status: 500 }
    );
  }
}
