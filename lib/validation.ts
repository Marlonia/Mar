import { z } from 'zod';

export const MAX_FAMILY_MEMBERS = 5;

export const subscriptionRequestSchema = z.object({
  // Token de un solo uso del Web Payments SDK (la tarjeta nunca llega al servidor)
  cardToken: z.string().min(1).max(200),
  verificationToken: z.string().max(500).optional(),
  planVariationId: z.string().min(1).max(100),
  // Generado una vez al montar el formulario: un doble envío reutiliza la misma
  // clave y Square no crea suscripciones duplicadas
  idempotencyKey: z.string().uuid(),
  nombre: z.string().trim().min(1).max(100),
  apellido: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  telefono: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+\-() .]*$/)
    .optional()
    .or(z.literal('')),
  miembrosFamilia: z.array(z.string().trim().min(1).max(120)).max(MAX_FAMILY_MEMBERS).optional(),
  aceptaCobroRecurrente: z.literal(true),
  // Honeypot anti-bots: un humano nunca llena este campo
  website: z.literal('').optional(),
});

export type SubscriptionRequest = z.infer<typeof subscriptionRequestSchema>;
