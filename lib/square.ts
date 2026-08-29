import 'server-only';

import { SquareClient, SquareEnvironment } from 'square';

const environment =
  process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production'
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment,
});

export const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID ?? '';

export function isSquareConfigured(): boolean {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);
}

export interface MembershipPlan {
  id: string;
  nombre: string;
  montoCentavos: number;
  moneda: string;
  cadencia: string;
}

// Los planes viven en el Catalog de Square (Dashboard → Pagos → Suscripciones).
// Cambiar un precio o nombre se hace allá, sin tocar código ni hacer deploy.
export async function listMembershipPlans(): Promise<MembershipPlan[]> {
  const page = await squareClient.catalog.list({ types: 'SUBSCRIPTION_PLAN_VARIATION' });

  const plans: MembershipPlan[] = [];
  for await (const object of page) {
    if (object.type !== 'SUBSCRIPTION_PLAN_VARIATION') continue;
    const data = object.subscriptionPlanVariationData;
    const phase = data?.phases?.[0];
    const money = phase?.pricing?.priceMoney ?? phase?.recurringPriceMoney;
    if (!data || !phase || !money?.amount) continue;

    plans.push({
      id: object.id,
      nombre: data.name,
      montoCentavos: Number(money.amount),
      moneda: money.currency ?? 'USD',
      cadencia: phase.cadence,
    });
  }
  return plans;
}

export async function findOrCreateCustomer(input: {
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  nota?: string;
  idempotencyKey: string;
}): Promise<string> {
  const search = await squareClient.customers.search({
    query: { filter: { emailAddress: { exact: input.email } } },
    limit: BigInt(1),
  });

  const existing = search.customers?.[0];
  if (existing?.id) {
    if (input.nota) {
      await squareClient.customers.update({
        customerId: existing.id,
        note: input.nota,
      });
    }
    return existing.id;
  }

  const created = await squareClient.customers.create({
    idempotencyKey: input.idempotencyKey,
    givenName: input.nombre,
    familyName: input.apellido,
    emailAddress: input.email,
    phoneNumber: input.telefono || undefined,
    note: input.nota || undefined,
  });

  const customerId = created.customer?.id;
  if (!customerId) {
    throw new Error('Square no devolvió un ID de cliente');
  }
  return customerId;
}
