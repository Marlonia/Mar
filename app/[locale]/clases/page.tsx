'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ClassCard from '@/components/ClassCard';
import ChoreographersSection from '@/components/ChoreographersSection';

const CLASES_DATA = [
  {
    id: 'cumbia-principiante-lun',
    level: 'Principiante',
    danceStyle: 'Cumbia',
    time: 'Lunes 7:00 PM - 8:30 PM',
    instructor: 'Mayra Rincon',
    duration: 90,
    maxStudents: 20,
    enrolled: 18,
    description: 'Aprende los pasos básicos de la Cumbia, la danza más tradicional del Carnaval.',
    ageGroup: '14+ años',
  },
  {
    id: 'cumbia-principiante-mie',
    level: 'Principiante',
    danceStyle: 'Cumbia',
    time: 'Miércoles 7:00 PM - 8:30 PM',
    instructor: 'Mayra Rincon',
    duration: 90,
    maxStudents: 20,
    enrolled: 15,
    description: 'Aprende los pasos básicos de la Cumbia, la danza más tradicional del Carnaval.',
    ageGroup: '14+ años',
  },
  {
    id: 'mapale-intermedio-mar',
    level: 'Intermedio',
    danceStyle: 'Mapalé',
    time: 'Martes 8:00 PM - 9:30 PM',
    instructor: 'Marilyn Gallardo',
    duration: 90,
    maxStudents: 15,
    enrolled: 12,
    description: 'Ritmo afro-colombiano con movimientos libres y expresivos. Requiere experiencia previa.',
    ageGroup: '14+ años',
  },
  {
    id: 'garabato-intermedio-jue',
    level: 'Intermedio',
    danceStyle: 'Garabato',
    time: 'Jueves 7:30 PM - 9:00 PM',
    instructor: 'Marilyn Gallardo',
    duration: 90,
    maxStudents: 18,
    enrolled: 14,
    description: 'Danza folklórica tradicional con coreografía fluida y ritmo cautivador.',
    ageGroup: '14+ años',
  },
  {
    id: 'avanzado-sabado',
    level: 'Avanzado',
    danceStyle: 'Fusión (Todas)',
    time: 'Sábados 10:00 AM - 12:00 PM',
    instructor: 'Equipo de Profesores',
    duration: 120,
    maxStudents: 12,
    enrolled: 11,
    description: 'Clase intensiva que combina todas las danzas. Para estudiantes avanzados con experiencia.',
    ageGroup: '14+ años',
  },
  {
    id: 'ninos-cumbia',
    level: 'Niños',
    danceStyle: 'Cumbia Kids',
    time: 'Viernes 5:00 PM - 6:00 PM',
    instructor: 'Equipo de Instructores',
    duration: 60,
    maxStudents: 25,
    enrolled: 22,
    description: 'Clases divertidas y dinámicas para que los niños aprendan a través del movimiento y la música.',
    ageGroup: '5-12 años',
  },
  {
    id: 'ninos-sabado',
    level: 'Niños',
    danceStyle: 'Danzas Variadas',
    time: 'Sábados 2:00 PM - 3:30 PM',
    instructor: 'Equipo de Instructores',
    duration: 90,
    maxStudents: 30,
    enrolled: 28,
    description: 'Exploramos diferentes estilos de danza con énfasis en coordinación y ritmo.',
    ageGroup: '5-12 años',
  },
  {
    id: 'adultos-sabado',
    level: 'Todos',
    danceStyle: 'Adultos Principiantes',
    time: 'Sábados 3:45 PM - 5:15 PM',
    instructor: 'Mayra Rincon',
    duration: 90,
    maxStudents: 20,
    enrolled: 16,
    description: 'Para adultos que desean aprender a danzar sin experiencia previa. ¡Nunca es tarde para empezar!',
    ageGroup: '16+ años',
  },
  {
    id: 'champeta-intermedio',
    level: 'Intermedio',
    danceStyle: 'Champeta',
    time: 'Miércoles 8:30 PM - 9:30 PM',
    instructor: 'Marilyn Gallardo',
    duration: 60,
    maxStudents: 18,
    enrolled: 13,
    description: 'Ritmo afro-caribeño nacido en Cartagena. Movimientos sensuales y energéticos llenos de sabor.',
    ageGroup: '16+ años',
  },
  {
    id: 'salsa-principiante',
    level: 'Principiante',
    danceStyle: 'Salsa',
    time: 'Jueves 6:30 PM - 7:30 PM',
    instructor: 'Mayra Rincon',
    duration: 60,
    maxStudents: 20,
    enrolled: 17,
    description: 'Aprende los pasos básicos de la Salsa, el ritmo más popular de Latinoamérica.',
    ageGroup: '14+ años',
  },
  {
    id: 'son-de-negro',
    level: 'Intermedio',
    danceStyle: 'Son de Negro',
    time: 'Viernes 7:00 PM - 8:30 PM',
    instructor: 'Marilyn Gallardo',
    duration: 90,
    maxStudents: 15,
    enrolled: 9,
    description: 'Danza ancestral afro-colombiana con tambores, máscaras y profunda raíz cultural.',
    ageGroup: '14+ años',
  },
  {
    id: 'bullerengue',
    level: 'Todos',
    danceStyle: 'Bullerengue',
    time: 'Sábados 12:30 PM - 2:00 PM',
    instructor: 'Mayra Rincon',
    duration: 90,
    maxStudents: 18,
    enrolled: 11,
    description: 'Ritmo de tambor y voz femenina. La esencia del Caribe colombiano hecho danza.',
    ageGroup: '14+ años',
  },
  {
    id: 'urbano',
    level: 'Todos',
    danceStyle: 'Urbano',
    time: 'Viernes 8:30 PM - 9:30 PM',
    instructor: 'Equipo de Profesores',
    duration: 60,
    maxStudents: 25,
    enrolled: 22,
    description: 'Reggaetón, dancehall y estilos modernos. Fusión del Caribe con lo contemporáneo.',
    ageGroup: '14+ años',
  },
  {
    id: 'marimondas',
    level: 'Todos',
    danceStyle: 'Marimondas',
    time: 'Domingos 4:00 PM - 5:30 PM',
    instructor: 'Equipo de Profesores',
    duration: 90,
    maxStudents: 20,
    enrolled: 14,
    description: 'La danza del personaje icónico del Carnaval. Alegría, libertad y rebeldía pura.',
    ageGroup: '12+ años',
  },
];

export default function ClasesPage() {
  const [filterLevel, setFilterLevel] = useState<string>('todos');

  const filteredClases = filterLevel === 'todos'
    ? CLASES_DATA
    : CLASES_DATA.filter(cls =>
        cls.level.toLowerCase().includes(filterLevel.toLowerCase())
      );

  const t = useTranslations('ClassesPage');

  const levels = ['todos', 'Principiante', 'Intermedio', 'Avanzado', 'Niños', 'Adultos'];
  const levelLabels: Record<string, string> = {
    todos: t('levels.all'),
    Principiante: t('levels.beginner'),
    Intermedio: t('levels.intermediate'),
    Avanzado: t('levels.advanced'),
    Niños: t('levels.kids'),
    Adultos: t('levels.adults'),
  };

  const benefits = (['instructors', 'community', 'performance', 'health', 'education', 'music'] as const).map((key, i) => ({
    icon: ['👨‍🏫', '🎉', '🏆', '💪', '🎓', '🎵'][i],
    title: t(`whyJoin.items.${key}.title`),
    desc: t(`whyJoin.items.${key}.desc`),
  }));

  const faqs = (['experience', 'cost', 'trial', 'summer'] as const).map((key) => ({
    q: t(`faq.items.${key}.q`),
    a: t(`faq.items.${key}.a`),
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-red to-carnival-green text-white pt-32 pb-16">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold mb-4">{t('hero.title')}</h1>
          <p className="text-xl text-white/90">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Coreógrafos Section */}
      <ChoreographersSection />

      {/* Filters Section */}
      <section className="bg-carnival-darkBg py-8 border-y border-white/10">
        <div className="container-max">
          <h3 className="font-accent font-bold mb-4 text-white">{t('filterByLevel')}</h3>
          <div className="flex flex-wrap gap-3">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded-lg font-accent font-bold transition ${
                  filterLevel === level
                    ? 'bg-carnival-yellow text-carnival-darkBg'
                    : 'glass-effect text-white hover:bg-carnival-yellow hover:text-carnival-darkBg'
                }`}
              >
                {levelLabels[level]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 bg-carnival-darkBg">
        <div className="container-max">
          {filteredClases.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-white/60">{t('noClasses')}</p>
            </div>
          ) : (
            <>
              <p className="text-white/60 mb-8">
                {t('showing', { count: filteredClases.length, total: CLASES_DATA.length })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClases.map((clase) => (
                  <ClassCard key={clase.id} {...clase} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="bg-black py-16">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
            {t('whyJoin.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="glass-effect rounded-lg p-6 text-center hover-lift">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2 text-white">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-carnival-darkBg">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
            {t('faq.title')}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-effect p-6 rounded-lg">
                <h4 className="font-accent font-bold text-carnival-yellow mb-2">{faq.q}</h4>
                <p className="text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
