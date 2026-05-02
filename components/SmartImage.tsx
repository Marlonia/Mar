'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { SiteImage } from '@/lib/site-images';

interface SmartImageProps {
  /** Configuración de la imagen */
  image: SiteImage;
  /** Tamaño del emoji fallback (clases Tailwind, ej: "text-9xl") */
  emojiSize?: string;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
  /** Tamaño para Next.js Image (sizes attribute) */
  sizes?: string;
  /** Si la imagen debe llenar el contenedor padre */
  fill?: boolean;
  /** Width explícito (si fill=false) */
  width?: number;
  /** Height explícito (si fill=false) */
  height?: number;
  /** Prioridad de carga (para imágenes above the fold) */
  priority?: boolean;
}

/**
 * Componente inteligente que muestra una imagen, y si no existe
 * o falla al cargar, automáticamente usa el emoji como fallback.
 *
 * Uso:
 * ```tsx
 * <SmartImage image={HERO_FLOATING_IMAGES[0]} emojiSize="text-6xl" />
 * ```
 */
export default function SmartImage({
  image,
  emojiSize = 'text-6xl',
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  fill = true,
  width,
  height,
  priority = false,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span
        className={`${emojiSize} ${className} flex items-center justify-center select-none`}
        role="img"
        aria-label={image.alt}
      >
        {image.fallback}
      </span>
    );
  }

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={width || 400}
      height={height || 400}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
