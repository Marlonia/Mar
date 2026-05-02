'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomeContent() {
  const t = useTranslations('Home');
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor Glow */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,198,0,0.15) 0%, transparent 70%)',
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* ============= HERO SECTION ============= */}
      <section
        ref={heroRef}
        className="relative min-h-screen mesh-gradient-1 overflow-hidden flex items-center"
      >
        {/* Animated Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 -left-40 w-[500px] h-[500px] bg-carnival-yellow opacity-30 mix-blend-screen filter blur-3xl animate-morph"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <div
            className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-carnival-red opacity-30 mix-blend-screen filter blur-3xl animate-morph"
            style={{ animationDelay: '2s', transform: `translateY(${scrollY * 0.2}px)` }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-carnival-green opacity-30 mix-blend-screen filter blur-3xl animate-morph"
            style={{ animationDelay: '4s', transform: `translateY(${scrollY * 0.4}px)` }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,198,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,198,0,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="absolute top-1/4 left-10 text-6xl animate-float opacity-30 hidden lg:block">🎭</div>
        <div className="absolute top-1/3 right-20 text-5xl animate-float-reverse opacity-30 hidden lg:block">🎉</div>
        <div className="absolute bottom-1/4 left-1/4 text-4xl animate-float opacity-30 hidden lg:block" style={{ animationDelay: '1s' }}>💃</div>
        <div className="absolute top-2/3 right-1/3 text-5xl animate-float-reverse opacity-30 hidden lg:block" style={{ animationDelay: '2s' }}>🎶</div>

        <div className="relative z-10 container-max py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 animate-slide-down">
              <div className="h-[2px] w-12 bg-gradient-to-r from-carnival-yellow to-carnival-red"></div>
              <span className="font-accent font-bold text-carnival-yellow tracking-widest text-sm uppercase">
                {t('tagline')}
              </span>
            </div>

            <div className="space-y-2 animate-slide-up">
              <h1 className="font-massive text-7xl md:text-9xl lg:text-[12rem] text-white leading-none">
                <span className="block gradient-text-animated">{t('title.line1')}</span>
                <span className="block text-stroke">{t('title.line2')}</span>
                <span className="block text-white">{t('title.line3')}</span>
              </h1>
            </div>

            <div className="mt-12 max-w-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <Link
                href="/inscripcion"
                className="group relative px-10 py-5 bg-carnival-yellow text-carnival-darkBg font-accent font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('ctaPrimary')}
                  <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-carnival-red to-carnival-green transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white font-accent font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  {t('ctaPrimaryHover')}
                </span>
              </Link>

              <Link
                href="/clases"
                className="group px-10 py-5 glass-effect rounded-full text-white font-accent font-bold text-lg hover:bg-white/10 transition-all duration-500"
              >
                <span className="flex items-center gap-3">
                  {t('ctaSecondary')}
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm transition-transform duration-500 group-hover:rotate-45">↗</span>
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl animate-slide-up" style={{ animationDelay: '0.7s' }}>
              {[
                { num: '200+', key: 'students' },
                { num: '50+', key: 'events' },
                { num: '15+', key: 'years' },
              ].map((stat) => (
                <div key={stat.key} className="border-l-2 border-carnival-yellow pl-4">
                  <div className="font-massive text-4xl md:text-5xl gradient-text">{stat.num}</div>
                  <div className="text-xs md:text-sm text-white/70 font-accent uppercase tracking-wider mt-1">
                    {t(`stats.${stat.key}` as 'stats.students')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 font-accent text-xs uppercase tracking-widest">{t('scroll')}</span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-carnival-yellow to-transparent overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-1/3 bg-white animate-pulse-soft"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= MARQUEE TICKER ============= */}
      <section className="bg-carnival-yellow py-6 overflow-hidden border-y-4 border-carnival-darkBg">
        <div className="marquee-container">
          <div className="marquee-content flex items-center gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10">
                <span className="font-massive text-4xl text-carnival-darkBg">CUMBIA</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-red">MAPALÉ</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-darkBg">GARABATO</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-green">CHAMPETA</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-red">SALSA</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-darkBg">SON DE NEGRO</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-green">BULLERENGUE</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-red">URBANO</span>
                <span className="text-2xl">★</span>
                <span className="font-massive text-4xl text-carnival-darkBg">MARIMONDAS</span>
                <span className="text-2xl">★</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= ABOUT SECTION ============= */}
      <section className="relative py-32 bg-carnival-darkBg overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border-4 border-carnival-yellow rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 border-4 border-carnival-red rounded-full animate-spin-medium"></div>
        </div>

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 animate-slide-left">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12 bg-carnival-yellow"></div>
                <span className="font-accent font-bold text-carnival-yellow tracking-widest text-sm uppercase">
                  {t('About.tagline')}
                </span>
              </div>

              <h2 className="font-massive text-6xl md:text-8xl text-white leading-none">
                {t('About.title.part1')} <span className="gradient-text">{t('About.title.highlight1')}</span>
                <br />
                {t('About.title.part2')} <span className="text-stroke">{t('About.title.highlight2')}</span>
                <br />
                {t('About.title.part3')}
              </h2>

              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                {t.rich('About.description', {
                  directors: (chunks) => (
                    <span>
                      <span className="text-carnival-yellow font-bold">{chunks}</span>
                    </span>
                  ),
                })}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="glass-effect px-6 py-3 rounded-full">
                  <span className="text-white font-accent text-sm">{t('About.tags.authentic')}</span>
                </div>
                <div className="glass-effect px-6 py-3 rounded-full">
                  <span className="text-white font-accent text-sm">{t('About.tags.unesco')}</span>
                </div>
                <div className="glass-effect px-6 py-3 rounded-full">
                  <span className="text-white font-accent text-sm">{t('About.tags.rated')}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 animate-slide-right">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full bg-carnival-red rounded-3xl rotate-3 opacity-80"></div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-carnival-green rounded-3xl -rotate-3 opacity-80"></div>

                <div className="relative bg-gradient-to-br from-carnival-yellow via-carnival-red to-carnival-green rounded-3xl p-12 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
                  <div className="relative z-10 text-center space-y-6">
                    <div className="inline-block">
                      <div className="text-9xl animate-float">🎭</div>
                    </div>
                    <h3 className="font-massive text-5xl text-white drop-shadow-2xl">
                      {t('About.marimondaName')}
                    </h3>
                    <div className="h-1 w-20 bg-white mx-auto rounded-full"></div>
                    <p className="text-white text-lg leading-relaxed font-accent">
                      {t('About.marimondaDescription')}
                    </p>
                    <div className="flex justify-center gap-2 pt-4">
                      <span className="w-3 h-3 bg-white rounded-full animate-pulse-soft"></span>
                      <span className="w-3 h-3 bg-white/70 rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-3 h-3 bg-white/40 rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= DANCES SECTION ============= */}
      <section className="relative py-32 bg-gradient-to-b from-carnival-darkBg to-black overflow-hidden">
        <div className="container-max">
          <div className="max-w-4xl mb-20 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-carnival-red"></div>
              <span className="font-accent font-bold text-carnival-red tracking-widest text-sm uppercase">
                {t('Dances.tagline')}
              </span>
            </div>
            <h2 className="font-massive text-6xl md:text-8xl text-white leading-none">
              {t('Dances.title.line1')}
              <br />
              <span className="gradient-text-animated">{t('Dances.title.line2')}</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mt-6 max-w-2xl">{t('Dances.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* CUMBIA */}
            <div className="md:col-span-7 group cursor-pointer animate-slide-left">
              <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-carnival-yellow via-amber-500 to-orange-600 shadow-2xl hover-lift">
                <div className="absolute inset-0 mesh-gradient-2 opacity-50"></div>
                <div className="absolute top-0 right-0 text-[20rem] opacity-20 leading-none -mr-12 -mt-12">💃</div>
                <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-2 bg-carnival-darkBg text-carnival-yellow font-accent text-xs uppercase tracking-widest rounded-full">
                      {t('Dances.badges.traditional')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-massive text-8xl md:text-9xl text-white drop-shadow-2xl group-hover:translate-x-4 transition-transform duration-500">
                      CUMBIA
                    </h3>
                    <p className="text-white text-lg mt-4 max-w-md font-accent">{t('Dances.main.cumbia')}</p>
                    <div className="mt-6 flex items-center gap-4 text-white">
                      <span className="font-accent text-sm">{t('Dances.actions.learn')}</span>
                      <div className="w-12 h-[2px] bg-white group-hover:w-24 transition-all duration-500"></div>
                      <span className="text-2xl group-hover:translate-x-2 transition-transform duration-500">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAPALÉ */}
            <div className="md:col-span-5 group cursor-pointer animate-slide-right">
              <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-carnival-red via-pink-600 to-rose-700 shadow-2xl hover-lift">
                <div className="absolute top-0 right-0 text-[15rem] opacity-20 leading-none -mr-8 -mt-8">🎶</div>
                <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-2 bg-carnival-darkBg text-carnival-red font-accent text-xs uppercase tracking-widest rounded-full">
                      {t('Dances.badges.energetic')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-massive text-7xl md:text-8xl text-white drop-shadow-2xl group-hover:translate-x-4 transition-transform duration-500">
                      MAPALÉ
                    </h3>
                    <p className="text-white text-base mt-4 font-accent">{t('Dances.main.mapale')}</p>
                    <div className="mt-6 flex items-center gap-4 text-white">
                      <span className="font-accent text-sm">{t('Dances.actions.start')}</span>
                      <div className="w-12 h-[2px] bg-white group-hover:w-24 transition-all duration-500"></div>
                      <span className="text-2xl group-hover:translate-x-2 transition-transform duration-500">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GARABATO */}
            <div className="md:col-span-12 group cursor-pointer animate-slide-up">
              <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-carnival-green via-emerald-600 to-teal-700 shadow-2xl hover-lift">
                <div className="absolute -top-20 right-1/4 text-[20rem] opacity-15 leading-none">🎄</div>
                <div className="absolute bottom-0 left-1/4 text-[15rem] opacity-15 leading-none -mb-12">🎭</div>
                <div className="relative z-10 p-12 h-full flex items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
                    <div>
                      <span className="inline-block px-4 py-2 bg-carnival-darkBg text-carnival-green font-accent text-xs uppercase tracking-widest rounded-full mb-6">
                        {t('Dances.badges.folkloric')}
                      </span>
                      <h3 className="font-massive text-7xl md:text-9xl text-white drop-shadow-2xl group-hover:translate-x-4 transition-transform duration-500">
                        GARABATO
                      </h3>
                    </div>
                    <div>
                      <p className="text-white text-lg leading-relaxed font-accent">{t('Dances.main.garabato')}</p>
                      <div className="mt-6 flex items-center gap-4 text-white">
                        <span className="font-accent text-sm">{t('Dances.actions.knowMore')}</span>
                        <div className="w-12 h-[2px] bg-white group-hover:w-24 transition-all duration-500"></div>
                        <span className="text-2xl group-hover:translate-x-2 transition-transform duration-500">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === Más Danzas === */}
          <div className="mt-24">
            <div className="flex items-center gap-3 mb-10 animate-slide-up">
              <div className="h-[2px] w-12 bg-carnival-yellow"></div>
              <span className="font-accent font-bold text-carnival-yellow tracking-widest text-sm uppercase">
                {t('Dances.moreTagline')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'CHAMPETA',
                  emoji: '🎵',
                  desc: t('Dances.more.champeta'),
                  badge: t('Dances.badges.afroCaribbean'),
                  bg: 'from-orange-500 via-red-600 to-pink-700',
                },
                {
                  name: 'SALSA',
                  emoji: '💋',
                  desc: t('Dances.more.salsa'),
                  badge: t('Dances.badges.latino'),
                  bg: 'from-rose-500 via-fuchsia-600 to-purple-700',
                },
                {
                  name: 'SON DE NEGRO',
                  emoji: '🥁',
                  desc: t('Dances.more.sonDeNegro'),
                  badge: t('Dances.badges.ancestral'),
                  bg: 'from-amber-700 via-orange-800 to-red-900',
                },
                {
                  name: 'BULLERENGUE',
                  emoji: '🌊',
                  desc: t('Dances.more.bullerengue'),
                  badge: t('Dances.badges.folkloric'),
                  bg: 'from-cyan-600 via-blue-700 to-indigo-800',
                },
                {
                  name: 'URBANO',
                  emoji: '🎤',
                  desc: t('Dances.more.urbano'),
                  badge: t('Dances.badges.modern'),
                  bg: 'from-violet-600 via-purple-700 to-pink-800',
                },
                {
                  name: 'MARIMONDAS',
                  emoji: '🎭',
                  desc: t('Dances.more.marimondas'),
                  badge: t('Dances.badges.iconic'),
                  bg: 'from-carnival-yellow via-amber-500 to-carnival-red',
                },
              ].map((dance, i) => (
                <div
                  key={dance.name}
                  className="group cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className={`relative h-[320px] rounded-3xl overflow-hidden bg-gradient-to-br ${dance.bg} shadow-2xl hover-lift`}>
                    <div className="absolute -top-6 -right-6 text-[12rem] opacity-15 leading-none rotate-12 group-hover:rotate-0 transition-transform duration-700">
                      {dance.emoji}
                    </div>
                    <div className="absolute inset-0 mesh-gradient-2 opacity-20"></div>
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-carnival-darkBg/80 backdrop-blur-sm text-white font-accent text-[10px] uppercase tracking-widest rounded-full">
                          {dance.badge}
                        </span>
                        <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{dance.emoji}</span>
                      </div>

                      <div>
                        <h3 className="font-massive text-4xl md:text-5xl text-white drop-shadow-2xl leading-none group-hover:translate-x-2 transition-transform duration-500">
                          {dance.name}
                        </h3>
                        <p className="text-white/90 text-sm mt-3 font-accent leading-relaxed">{dance.desc}</p>
                        <div className="mt-4 flex items-center gap-3 text-white">
                          <span className="font-accent text-xs uppercase tracking-widest">{t('Dances.actions.seeMore')}</span>
                          <div className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-500"></div>
                          <span className="text-lg group-hover:translate-x-1 transition-transform duration-500">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= CLASSES SECTION ============= */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-carnival-yellow rounded-full filter blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-carnival-red rounded-full filter blur-[150px] opacity-20"></div>
        </div>

        <div className="container-max relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 animate-slide-up">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-carnival-green"></div>
                <span className="font-accent font-bold text-carnival-green tracking-widest text-sm uppercase">
                  {t('Classes.tagline')}
                </span>
              </div>
              <h2 className="font-massive text-6xl md:text-8xl text-white leading-none">
                {t('Classes.title.line1')}
                <br />
                <span className="gradient-text-animated">{t('Classes.title.highlight')}</span>
              </h2>
            </div>
            <Link
              href="/clases"
              className="hidden md:inline-flex items-center gap-3 text-white font-accent font-bold link-underline"
            >
              {t('Classes.viewAll')}
              <span className="text-2xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { level: t('Classes.items.beginner'), time: t('Classes.schedule.monWed'), instructor: t('Classes.instructors.mayra'), icon: '🌱', color: 'from-carnival-yellow to-amber-500', accent: 'text-carnival-yellow' },
              { level: t('Classes.items.intermediate'), time: t('Classes.schedule.tueThu'), instructor: t('Classes.instructors.marilyn'), icon: '🔥', color: 'from-carnival-red to-pink-600', accent: 'text-carnival-red' },
              { level: t('Classes.items.advanced'), time: t('Classes.schedule.saturday'), instructor: t('Classes.instructors.team'), icon: '⭐', color: 'from-carnival-green to-emerald-600', accent: 'text-carnival-green' },
              { level: t('Classes.items.kids'), time: t('Classes.schedule.fridayKids'), instructor: t('Classes.instructors.kids'), icon: '🎈', color: 'from-purple-500 to-pink-500', accent: 'text-pink-400' },
            ].map((cls, i) => (
              <div key={cls.level} className="group relative animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-full glass-dark rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/30 border border-white/10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10 space-y-4">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{cls.icon}</div>
                    <div>
                      <div className={`text-xs font-accent uppercase tracking-widest ${cls.accent} group-hover:text-white transition-colors duration-500`}>
                        {t('Classes.level')}
                      </div>
                      <h4 className="font-display text-2xl font-bold text-white mt-1">{cls.level}</h4>
                    </div>
                    <div className="space-y-2 text-white/70 group-hover:text-white text-sm font-accent transition-colors duration-500">
                      <div className="flex items-center gap-2"><span>⏰</span><span>{cls.time}</span></div>
                      <div className="flex items-center gap-2"><span>👨‍🏫</span><span>{cls.instructor}</span></div>
                    </div>
                    <div className="pt-4 border-t border-white/10 group-hover:border-white/30 transition-colors duration-500">
                      <Link href="/inscripcion" className="flex items-center justify-between text-white font-accent font-bold text-sm">
                        {t('Classes.register')}
                        <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white flex items-center justify-center group-hover:text-carnival-darkBg transition-all duration-500 group-hover:rotate-45">
                          ↗
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link href="/clases" className="btn-primary">{t('Classes.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* ============= FEATURES ============= */}
      <section className="relative py-32 bg-gradient-to-b from-black to-carnival-darkBg overflow-hidden">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-carnival-yellow"></div>
              <span className="font-accent font-bold text-carnival-yellow tracking-widest text-sm uppercase">
                {t('Features.tagline')}
              </span>
              <div className="h-[2px] w-12 bg-carnival-yellow"></div>
            </div>
            <h2 className="font-massive text-5xl md:text-7xl text-white leading-none">
              {t('Features.title.line1')}
              <br />
              {t('Features.title.line2')} <span className="gradient-text">{t('Features.title.highlight')}</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(['0', '1', '2'] as const).map((idx, i) => (
              <div
                key={idx}
                className="group relative p-8 glass-effect rounded-3xl hover-lift animate-slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="font-massive text-7xl gradient-text mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  0{i + 1}
                </div>
                <h4 className="font-display text-2xl font-bold text-white mb-3">
                  {t(`Features.items.${idx}.title`)}
                </h4>
                <p className="text-white/70 leading-relaxed">{t(`Features.items.${idx}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CTA FINAL ============= */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-1"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-carnival-yellow rounded-full mix-blend-screen filter blur-3xl animate-float opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-carnival-red rounded-full mix-blend-screen filter blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-carnival-green rounded-full mix-blend-screen filter blur-3xl animate-float opacity-40" style={{ animationDelay: '4s' }}></div>

        <div className="container-max relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-zoom-in">
            <div className="inline-block">
              <span className="px-6 py-3 glass-yellow rounded-full text-carnival-yellow font-accent text-sm uppercase tracking-widest">
                {t('FinalCTA.badge')}
              </span>
            </div>

            <h2 className="font-massive text-7xl md:text-9xl text-white leading-none">
              {t('FinalCTA.title.line1')}
              <br />
              <span className="gradient-text-animated">{t('FinalCTA.title.highlight')}</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t('FinalCTA.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/inscripcion"
                className="group relative px-12 py-6 bg-white text-carnival-darkBg font-accent font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('FinalCTA.primary')}
                  <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2">→</span>
                </span>
              </Link>

              <Link
                href="/contacto"
                className="px-12 py-6 border-2 border-white/30 text-white font-accent font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-500"
              >
                {t('FinalCTA.secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
