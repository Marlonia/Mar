'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formatPrice, isFamilyPlan, type PlanInfo } from '@/components/MembershipPlans';
import { MAX_FAMILY_MEMBERS } from '@/lib/validation';

// Tipado mínimo del Web Payments SDK (se carga por <Script>, no por npm)
interface SquareTokenResult {
  status: string;
  token?: string;
  errors?: { message?: string }[];
}

interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<SquareTokenResult>;
  destroy: () => Promise<void>;
}

interface SquarePayments {
  card: () => Promise<SquareCard>;
  verifyBuyer: (
    token: string,
    details: {
      intent: 'STORE';
      billingContact: { givenName?: string; familyName?: string; email?: string };
    }
  ) => Promise<{ token: string } | null>;
}

declare global {
  interface Window {
    Square?: {
      payments: (applicationId: string, locationId: string) => Promise<SquarePayments>;
    };
  }
}

const formSchema = z.object({
  nombre: z.string().trim().min(1, 'Ingresa tu nombre').max(100),
  apellido: z.string().trim().min(1, 'Ingresa tu apellido').max(100),
  email: z.string().trim().email('Ingresa un email válido').max(200),
  telefono: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+\-() .]*$/, 'Ingresa solo números y símbolos de teléfono')
    .optional()
    .or(z.literal('')),
  miembrosFamilia: z.array(z.string().trim().max(120)).optional(),
  aceptaCobroRecurrente: z.boolean().refine((v) => v, {
    message: 'Debes aceptar el cobro mensual recurrente para continuar',
  }),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SDK_URLS = {
  sandbox: 'https://sandbox.web.squarecdn.com/v1/square.js',
  production: 'https://web.squarecdn.com/v1/square.js',
};

export default function MembershipCheckoutForm({
  plan,
  onBack,
}: {
  plan: PlanInfo;
  onBack: () => void;
}) {
  const router = useRouter();
  const [sdkReady, setSdkReady] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const paymentsRef = useRef<SquarePayments | null>(null);
  const cardRef = useRef<SquareCard | null>(null);
  // Una sola clave por sesión de formulario: un doble clic no duplica la suscripción
  const idempotencyKeyRef = useRef<string>(crypto.randomUUID());

  const environment =
    process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
  const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? '';
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? '';

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { miembrosFamilia: [], aceptaCobroRecurrente: false, website: '' },
  });

  useEffect(() => {
    if (!sdkReady || !window.Square || !applicationId || !locationId) return;
    let cancelled = false;

    (async () => {
      try {
        const payments = await window.Square!.payments(applicationId, locationId);
        const card = await payments.card();
        if (cancelled) {
          await card.destroy();
          return;
        }
        await card.attach('#square-card-container');
        paymentsRef.current = payments;
        cardRef.current = card;
        setCardReady(true);
      } catch (err) {
        console.error('Error inicializando el formulario de tarjeta:', err);
        setSubmitError('No pudimos cargar el formulario de tarjeta. Recarga la página.');
      }
    })();

    return () => {
      cancelled = true;
      cardRef.current?.destroy().catch(() => undefined);
      cardRef.current = null;
    };
  }, [sdkReady, applicationId, locationId]);

  const onSubmit = async (values: FormValues) => {
    if (!cardRef.current || !paymentsRef.current) return;
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const tokenResult = await cardRef.current.tokenize();
      if (tokenResult.status !== 'OK' || !tokenResult.token) {
        setSubmitError(
          tokenResult.errors?.[0]?.message ?? 'Verifica los datos de tu tarjeta.'
        );
        return;
      }

      const verification = await paymentsRef.current.verifyBuyer(tokenResult.token, {
        intent: 'STORE',
        billingContact: {
          givenName: values.nombre,
          familyName: values.apellido,
          email: values.email,
        },
      });

      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardToken: tokenResult.token,
          verificationToken: verification?.token,
          planVariationId: plan.id,
          idempotencyKey: idempotencyKeyRef.current,
          nombre: values.nombre,
          apellido: values.apellido,
          email: values.email,
          telefono: values.telefono || undefined,
          miembrosFamilia: values.miembrosFamilia?.filter(Boolean),
          aceptaCobroRecurrente: values.aceptaCobroRecurrente,
          website: values.website ?? '',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setSubmitError(data.error ?? 'No pudimos completar la suscripción.');
        return;
      }

      router.push(`/membresias/confirmacion?plan=${encodeURIComponent(plan.nombre)}`);
    } catch (err) {
      console.error('Error en el checkout:', err);
      setSubmitError('Ocurrió un error inesperado. Intenta de nuevo o contáctanos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const familyPlan = isFamilyPlan(plan);
  const price = formatPrice(plan.montoCentavos, plan.moneda);

  return (
    <div className="max-w-2xl mx-auto">
      <Script src={SDK_URLS[environment]} onLoad={() => setSdkReady(true)} />

      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-carnival-red font-accent font-bold hover:underline"
      >
        ← Volver a los planes
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-carnival-gold"
      >
        <h2 className="text-2xl font-display font-bold text-carnival-darkBg mb-2">
          {plan.nombre}
        </h2>
        <p className="text-gray-600 mb-8">
          <span className="text-3xl font-bold text-carnival-red">{price}</span> al mes,
          cobrado automáticamente a tu tarjeta hasta que canceles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
              Nombre *
            </label>
            <input
              type="text"
              {...register('nombre')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold"
            />
            {errors.nombre && (
              <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
              Apellido *
            </label>
            <input
              type="text"
              {...register('apellido')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold"
            />
            {errors.apellido && (
              <p className="text-red-600 text-sm mt-1">{errors.apellido.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
              Email *
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
              Teléfono
            </label>
            <input
              type="tel"
              {...register('telefono')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold"
            />
            {errors.telefono && (
              <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>
            )}
          </div>
        </div>

        {familyPlan && (
          <div className="mb-6">
            <h3 className="text-lg font-accent font-bold text-carnival-darkBg mb-2">
              👨‍👩‍👧‍👦 Miembros del grupo familiar (máximo {MAX_FAMILY_MEMBERS})
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Tú eres el miembro 1. Escribe el nombre completo de cada persona adicional que
              tomará clases.
            </p>
            <div className="space-y-3">
              {Array.from({ length: MAX_FAMILY_MEMBERS - 1 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Miembro ${i + 2} (opcional)`}
                  {...register(`miembrosFamilia.${i}` as const)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold"
                />
              ))}
            </div>
          </div>
        )}

        {/* Honeypot anti-bots: invisible para humanos */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...register('website')}
        />

        <div className="mb-6">
          <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
            💳 Datos de tarjeta *
          </label>
          <div
            id="square-card-container"
            className="border border-gray-300 rounded-lg p-3 min-h-[56px]"
          />
          {!cardReady && (
            <p className="text-sm text-gray-500 mt-2 animate-pulse">
              Cargando formulario seguro de tarjeta…
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            🔒 Tu tarjeta se procesa directamente con Square; nunca se guarda en nuestro
            sitio.
          </p>
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            {...register('aceptaCobroRecurrente')}
            className="mt-1 w-5 h-5 accent-carnival-red"
          />
          <span className="text-sm text-gray-600">
            Autorizo el cobro automático de <strong>{price} cada mes</strong> a esta tarjeta
            hasta que cancele mi membresía. Puedo cancelar cuando quiera antes del próximo
            cobro escribiendo a info@carnavalba.com.
          </span>
        </label>
        {errors.aceptaCobroRecurrente && (
          <p className="text-red-600 text-sm mb-4">{errors.aceptaCobroRecurrente.message}</p>
        )}

        {submitError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!cardReady || isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Procesando…' : `Activar membresía — ${price}/mes`}
        </button>
      </form>
    </div>
  );
}
