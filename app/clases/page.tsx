'use client';

import { useState } from 'react';
import ClassCard from '@/components/ClassCard';

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
];

export default function ClasesPage() {
  const [filterLevel, setFilterLevel] = useState<string>('todos');

  const filteredClases = filterLevel === 'todos'
    ? CLASES_DATA
    : CLASES_DATA.filter(cls =>
        cls.level.toLowerCase().includes(filterLevel.toLowerCase())
      );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-red to-carnival-green text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold mb-4">Nuestras Clases</h1>
          <p className="text-xl text-white/90">
            Encuentra la clase perfecta para ti y comienza tu viaje en el Carnaval
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-carnival-lightBg py-8">
        <div className="container-max">
          <h3 className="font-accent font-bold mb-4">Filtrar por Nivel:</h3>
          <div className="flex flex-wrap gap-3">
            {['todos', 'Principiante', 'Intermedio', 'Avanzado', 'Niños', 'Adultos'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded-lg font-accent font-bold transition ${
                  filterLevel === level
                    ? 'bg-carnival-gold text-carnival-darkBg'
                    : 'bg-white text-carnival-darkBg hover:bg-carnival-gold hover:text-carnival-darkBg'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16">
        <div className="container-max">
          {filteredClases.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No hay clases disponibles en este nivel.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">
                Mostrando {filteredClases.length} de {CLASES_DATA.length} clases
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
      <section className="bg-carnival-lightBg py-16">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            ¿Por Qué Unirse a Nosotros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👨‍🏫',
                title: 'Instructores Profesionales',
                desc: 'Maestros con años de experiencia en el Carnaval de Barranquilla',
              },
              {
                icon: '🎉',
                title: 'Comunidad Vibrante',
                desc: 'Conoce personas apasionadas por la cultura colombiana',
              },
              {
                icon: '🏆',
                title: 'Oportunidades de Performance',
                desc: 'Participa en eventos y presentaciones locales',
              },
              {
                icon: '💪',
                title: 'Beneficios para la Salud',
                desc: 'Mejora tu coordinación, flexibilidad y estado físico',
              },
              {
                icon: '🎓',
                title: 'Educación Cultural',
                desc: 'Aprende sobre la historia y tradiciones del Carnaval',
              },
              {
                icon: '🎵',
                title: 'Música Auténtica',
                desc: 'Baila con ritmos tradicionales colombianos',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: '¿Necesito experiencia previa?',
                a: 'No, tenemos clases para todos los niveles desde principiantes hasta avanzados.',
              },
              {
                q: '¿Cuál es el costo de las clases?',
                a: 'Consulta con nosotros por teléfono o email para conocer los precios y opciones de pago.',
              },
              {
                q: '¿Puedo tomar clases de prueba?',
                a: 'Sí, ofrecemos una clase de prueba gratuita para nuevos estudiantes.',
              },
              {
                q: '¿Hay clases durante el verano?',
                a: 'Sí, ofrecemos programas especiales durante el verano. Consulta el calendario.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-carnival-lightBg p-6 rounded-lg">
                <h4 className="font-accent font-bold text-carnival-red mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
