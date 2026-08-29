import { NextResponse } from 'next/server';
import { WebhooksHelper } from 'square';

interface SquareWebhookEvent {
  event_id?: string;
  type?: string;
  data?: { id?: string; object?: Record<string, unknown> };
}

// Best-effort: Square reintenta entregas, así que evitamos procesar dos veces
// el mismo evento dentro de la vida de esta instancia
const seenEventIds = new Set<string>();

export async function POST(request: Request) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!signatureKey || !siteUrl) {
    return NextResponse.json({ error: 'Webhook no configurado' }, { status: 503 });
  }

  // La firma se calcula sobre el cuerpo crudo + la URL registrada en Square
  const rawBody = await request.text();
  const signature = request.headers.get('x-square-hmacsha256-signature') ?? '';

  const isValid = await WebhooksHelper.verifySignature({
    requestBody: rawBody,
    signatureHeader: signature,
    signatureKey,
    notificationUrl: `${siteUrl.replace(/\/$/, '')}/api/webhooks/square`,
  });
  if (!isValid) {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
  }

  let event: SquareWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 });
  }

  if (event.event_id) {
    if (seenEventIds.has(event.event_id)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    seenEventIds.add(event.event_id);
    if (seenEventIds.size > 5_000) {
      seenEventIds.clear();
    }
  }

  switch (event.type) {
    case 'invoice.scheduled_charge_failed':
      // El cobro mensual falló: Square reintenta solo (dunning), pero el dueño
      // debe enterarse para hacer seguimiento humano al miembro
      console.error('[webhook/square] COBRO FALLIDO — revisar en Square Dashboard:', event.data?.id);
      break;
    case 'invoice.payment_made':
      console.log('[webhook/square] Cobro mensual exitoso:', event.data?.id);
      break;
    case 'subscription.created':
    case 'subscription.updated':
      console.log(`[webhook/square] ${event.type}:`, event.data?.id);
      break;
    case 'invoice.canceled':
      console.log('[webhook/square] Factura cancelada:', event.data?.id);
      break;
    default:
      console.log('[webhook/square] Evento recibido:', event.type);
  }

  return NextResponse.json({ ok: true });
}
