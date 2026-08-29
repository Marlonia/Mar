# Configuración de membresías con Square

El sitio ya tiene todo el código para cobrar membresías mensuales automáticamente.
Para activarlo hay que hacer unos pasos manuales en Square y en el hosting (Vercel).

## Cómo funciona

- **Fase 0 (sin credenciales):** la página `/membresias` muestra los planes y los
  botones llevan al checkout hospedado de Square (enlaces `NEXT_PUBLIC_SQUARE_LINK_*`).
  Con solo esto ya se elimina el cobro manual.
- **Fase 1 (con credenciales):** la misma página muestra el checkout integrado: los
  precios se leen del catálogo de Square y la tarjeta se ingresa sin salir del sitio.
- En ambas fases, **Square es el registro único**: clientes, tarjetas, suscripciones y
  recibos viven en el Square Dashboard. La tarjeta nunca toca nuestro servidor.

## Paso 1 — Crear los planes en Square (sin código)

1. Entra al [Square Dashboard](https://squareup.com/dashboard) → **Pagos → Suscripciones → Planes**.
2. Crea un plan "Membresía Academia" con **dos variaciones**, cadencia mensual y sin cuota de inscripción:
   - **Individual**: $59.99/mes
   - **Familiar (hasta 5)**: valor inicial sugerido $139/mes (se puede cambiar después aquí mismo, sin tocar la web)
3. Para la Fase 0: en cada variación usa **"Compartir enlace de pago"** y copia las URLs.

> ⚠️ Cambiar el precio de una variación aplica a suscriptores **nuevos**. Para los ya
> suscritos hay que ajustarlos desde el Dashboard (override de precio o moverlos de plan).

## Paso 2 — Credenciales de developer (para la Fase 1)

1. Entra a [developer.squareup.com](https://developer.squareup.com) con la cuenta de Square y crea una aplicación (ej. "Academia Web").
2. Copia primero las credenciales de **Sandbox** (para probar) y al final las de **Production**:
   - Application ID
   - Access Token
3. El **Location ID** está en Dashboard → Cuenta → Ubicaciones.
4. En **Webhooks** de la aplicación, registra la URL `https://TU-DOMINIO/api/webhooks/square`,
   suscribe los eventos `subscription.created`, `subscription.updated`, `invoice.payment_made`,
   `invoice.scheduled_charge_failed`, `invoice.canceled`, `card.updated`, y copia la **Signature Key**.

## Paso 3 — Variables de entorno

Copia `.env.example` a `.env.local` (local) o configúralas en Vercel (Preview = sandbox,
Production = producción):

| Variable | Dónde se consigue |
|---|---|
| `SQUARE_ACCESS_TOKEN` | Developer portal (secreta, solo servidor) |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | Webhooks del developer portal (una por entorno) |
| `SQUARE_LOCATION_ID` | Dashboard → Ubicaciones |
| `NEXT_PUBLIC_SQUARE_APPLICATION_ID` | Developer portal |
| `NEXT_PUBLIC_SQUARE_LOCATION_ID` | Igual que `SQUARE_LOCATION_ID` |
| `NEXT_PUBLIC_SQUARE_ENVIRONMENT` | `sandbox` o `production` |
| `NEXT_PUBLIC_SQUARE_LINK_INDIVIDUAL` / `_FAMILIAR` | Enlaces de pago del Paso 1 (Fase 0) |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (para el webhook) |

## Paso 4 — Probar en sandbox antes de cobrar de verdad

1. Con credenciales de sandbox, crea los planes en el **Sandbox Dashboard** (se abre desde el developer portal).
2. En `/membresias`, suscríbete con la tarjeta de prueba `4111 1111 1111 1111` (CVV y ZIP cualquiera, fecha futura).
3. Verifica en el Sandbox Dashboard: cliente creado (con los nombres del grupo familiar en la nota), tarjeta guardada, suscripción activa y factura del primer cobro.
4. Prueba el webhook con "Send test event" del developer portal.
5. Al pasar a producción: cambia las variables, crea los planes reales, registra el webhook de producción y haz **una suscripción real con tarjeta propia** como prueba final (luego cancélala desde el Dashboard).

## Operación del día a día

- **Cancelar o cambiar tarjeta de un miembro:** Dashboard → Clientes / Suscripciones (1 minuto). El canal para los miembros es escribir a info@carnavalba.com.
- **Cobro fallido:** Square reintenta automáticamente y avisa al miembro por email; el webhook lo deja registrado en los logs del servidor. Hacer seguimiento humano si persiste.
- **Migrar a los miembros actuales que pagan manual:**
  1. Enviarles el enlace `/membresias` con fecha límite (cada quien registra su tarjeta).
  2. A los rezagados: crearles la suscripción desde Dashboard → Suscripciones → "Añadir suscriptor" (con tarjeta en archivo autorizada por el cliente).
  3. Alinear la fecha de inicio con su próximo cobro para no cobrar dos veces el mismo mes.

## Pendientes de decisión del negocio

- Precio final del plan Familiar ($129–150; hoy sugerido $139).
- Confirmar con el contador si aplica sales tax en Utah (si aplica, se configura en el plan de Square, no en el código).
- Días de gracia antes de perder acceso a clases cuando falla un cobro.
