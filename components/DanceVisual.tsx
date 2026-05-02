'use client';

import Image from 'next/image';
import { useState } from 'react';

interface DanceVisualProps {
  emoji: string;
  image?: string;
  alt?: string;
  className?: string;
  emojiSize?: string;
}

/**
 * Componente que muestra una imagen si existe, sino muestra el emoji.
 * Si la imagen falla al cargar, automáticamente muestra el emoji como fallback.
 */
export default function DanceVisual({
  emoji,
  image,
  alt = '',
  className = '',
  emojiSize = 'text-8xl',
}: DanceVisualProps) {
  const [imageError, setImageError] = useState(false);

  if (image && !imageError) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return <div className={`${emojiSize} ${className}`}>{emoji}</div>;
}
