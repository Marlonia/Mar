'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CHOREOGRAPHERS, type Choreographer } from '@/lib/site-content';

const accentClasses = {
  yellow: {
    text: 'text-carnival-yellow',
    bg: 'bg-carnival-yellow',
    border: 'border-carnival-yellow',
    gradient: 'from-carnival-yellow/20 via-amber-500/10 to-transparent',
    badge: 'bg-carnival-yellow/20 text-carnival-yellow border-carnival-yellow/40',
    initialsBg: 'from-carnival-yellow via-amber-500 to-orange-600',
  },
  red: {
    text: 'text-carnival-red',
    bg: 'bg-carnival-red',
    border: 'border-carnival-red',
    gradient: 'from-carnival-red/20 via-pink-600/10 to-transparent',
    badge: 'bg-carnival-red/20 text-carnival-red border-carnival-red/40',
    initialsBg: 'from-carnival-red via-pink-600 to-rose-700',
  },
  green: {
    text: 'text-carnival-green',
    bg: 'bg-carnival-green',
    border: 'border-carnival-green',
    gradient: 'from-carnival-green/20 via-emerald-600/10 to-transparent',
    badge: 'bg-carnival-green/20 text-carnival-green border-carnival-green/40',
    initialsBg: 'from-carnival-green via-emerald-600 to-teal-700',
  },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function ChoreographerCard({ choreographer, index }: { choreographer: Choreographer; index: number }) {
  const [imageError, setImageError] = useState(false);
  const colors = accentClasses[choreographer.accentColor];
  const showImage = choreographer.image && !imageError;
  const initials = getInitials(choreographer.name);

  return (
    <div
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="glass-dark rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover-lift">
        {/* Imagen / Avatar */}
        <div className="relative h-80 overflow-hidden">
          {showImage ? (
            <Image
              src={choreographer.image!}
              alt={choreographer.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${colors.initialsBg} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
              <span className="font-massive text-9xl text-white/90 drop-shadow-2xl relative z-10">
                {initials}
              </span>
            </div>
          )}

          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-carnival-darkBg via-carnival-darkBg/60 to-transparent"></div>

          {/* Years badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className={`${colors.badge} backdrop-blur-md border px-4 py-2 rounded-full`}>
              <span className="font-accent font-bold text-xs uppercase tracking-widest">
                {choreographer.yearsExperience}+ años
              </span>
            </div>
          </div>

          {/* Origen */}
          <div className="absolute top-4 left-4 z-10">
            <div className="glass-effect px-3 py-1.5 rounded-full">
              <span className="text-white text-xs font-accent">📍 {choreographer.origin}</span>
            </div>
          </div>

          {/* Nombre overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h3 className="font-massive text-4xl md:text-5xl text-white leading-none drop-shadow-2xl group-hover:translate-x-2 transition-transform duration-500">
              {choreographer.name}
            </h3>
            <p className={`mt-2 font-accent font-bold text-sm uppercase tracking-widest ${colors.text}`}>
              {choreographer.role}
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8 space-y-6">
          {/* Bio */}
          <p className="text-white/80 leading-relaxed font-accent">{choreographer.bio}</p>

          {/* Especialidades */}
          <div>
            <p className="text-xs font-accent font-bold uppercase tracking-widest text-white/50 mb-3">
              Especialidades
            </p>
            <div className="flex flex-wrap gap-2">
              {choreographer.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className={`${colors.badge} border px-3 py-1.5 rounded-full text-xs font-accent font-bold`}
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Logros */}
          {choreographer.achievements && choreographer.achievements.length > 0 && (
            <div>
              <p className="text-xs font-accent font-bold uppercase tracking-widest text-white/50 mb-3">
                Logros
              </p>
              <ul className="space-y-2">
                {choreographer.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2 text-sm text-white/70">
                    <span className={colors.text}>★</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Redes sociales */}
          {choreographer.socials && (
            <div className="flex gap-3 pt-2 border-t border-white/10">
              {choreographer.socials.instagram && (
                <a
                  href={choreographer.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:${colors.bg} hover:scale-110 transition-all duration-300`}
                  aria-label="Instagram"
                >
                  <span>📷</span>
                </a>
              )}
              {choreographer.socials.facebook && (
                <a
                  href={choreographer.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:${colors.bg} hover:scale-110 transition-all duration-300`}
                  aria-label="Facebook"
                >
                  <span>👍</span>
                </a>
              )}
              {choreographer.socials.tiktok && (
                <a
                  href={choreographer.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:${colors.bg} hover:scale-110 transition-all duration-300`}
                  aria-label="TikTok"
                >
                  <span>🎵</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChoreographersSection() {
  return (
    <section className="relative py-24 bg-carnival-darkBg overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-carnival-yellow rounded-full filter blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-carnival-red rounded-full filter blur-[150px] opacity-20"></div>
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-16 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-carnival-yellow"></div>
            <span className="font-accent font-bold text-carnival-yellow tracking-widest text-sm uppercase">
              Conoce al equipo
            </span>
          </div>
          <h2 className="font-massive text-5xl md:text-7xl text-white leading-none">
            Nuestros<br />
            <span className="gradient-text-animated">coreógrafos</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 mt-6 max-w-2xl">
            Más de 27 años de experiencia combinada enseñando las danzas auténticas del Carnaval de Barranquilla.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CHOREOGRAPHERS.map((choreographer, i) => (
            <ChoreographerCard key={choreographer.id} choreographer={choreographer} index={i} />
          ))}
        </div>

        {/* CTA para futuros coreógrafos */}
        <div className="mt-16 text-center animate-slide-up">
          <div className="inline-block glass-effect rounded-3xl px-8 py-6">
            <p className="text-white/80 font-accent">
              ✨ <span className="text-carnival-yellow font-bold">¿Eres coreógrafo/a profesional?</span>
            </p>
            <p className="text-white/60 text-sm mt-2">
              Estamos siempre buscando talento. Contáctanos para unirte al equipo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
