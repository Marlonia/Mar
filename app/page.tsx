import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-carnival-gold via-carnival-red to-carnival-blue flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-carnival-gold rounded-full mix-blend-multiply filter blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-carnival-red rounded-full mix-blend-multiply filter blur-3xl animate-bounce-slow animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-carnival-blue rounded-full mix-blend-multiply filter blur-3xl animate-bounce-slow animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container-max text-center py-20">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
              ¡Bienvenido al Carnaval!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Aprende las danzas tradicionales del Carnaval de Barranquilla, el festival más grande de Colombia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inscripcion" className="btn-primary text-lg">
                🎉 Inscribirse Ahora
              </Link>
              <Link href="/clases" className="btn-outline text-lg">
                Explorar Clases
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 text-white">
            <div className="glass-effect rounded-lg p-4">
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm">Estudiantes</div>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Años Experiencia</div>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm">Eventos</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-6">
                Sobre Nosotros
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Carnaval de Barranquilla en Utah es una academia de danza dedicada a preservar y promover las tradiciones culturales del Carnaval de Barranquilla, el mayor festival anual de Colombia.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Fundada en 2022 por Mayra Rincon y Marilyn Gallardo, nuestro objetivo es llevar la alegría, energía y pasión del Carnaval a la comunidad de Utah.
              </p>
              <Link href="/contacto" className="btn-primary inline-block">
                Conocer Más
              </Link>
            </div>
            <div className="bg-carnival-lightBg rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-display font-bold mb-4">Marimonda</h3>
              <p className="text-gray-600">
                El personaje más emblemático del Carnaval. Con su máscara característica y traje colorido, representa la alegría y diversión de la celebración.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dance Styles Section */}
      <section className="py-20 bg-carnival-lightBg">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            Danzas que Enseñamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Cumbia', emoji: '💃', desc: 'La danza más tradicional del Carnaval' },
              { name: 'Mapalé', emoji: '🎶', desc: 'Ritmo afro-colombiano con movimientos libres' },
              { name: 'Garabato', emoji: '🎄', desc: 'Danza folklórica con coreografía fluida' },
            ].map((dance) => (
              <div key={dance.name} className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{dance.emoji}</div>
                <h3 className="text-2xl font-display font-bold mb-2 text-carnival-red">{dance.name}</h3>
                <p className="text-gray-600">{dance.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <h2 className="text-4xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            Clases Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { level: 'Principiante', time: 'Lunes & Miércoles', instructor: 'Mayra' },
              { level: 'Intermedio', time: 'Martes & Jueves', instructor: 'Marilyn' },
              { level: 'Avanzado', time: 'Sábados', instructor: 'Profesores' },
              { level: 'Niños (5-12)', time: 'Viernes 5pm', instructor: 'Equipo' },
            ].map((cls) => (
              <div key={cls.level} className="bg-carnival-lightBg rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-display font-bold text-carnival-red mb-2">{cls.level}</h3>
                <p className="text-sm text-gray-600 mb-1">⏰ {cls.time}</p>
                <p className="text-sm text-gray-600 mb-4">👨‍🏫 {cls.instructor}</p>
                <Link href="/inscripcion" className="btn-secondary text-sm block text-center py-2">
                  Inscribirse
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/clases" className="btn-primary text-lg">
              Ver Todos los Horarios
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-carnival-red to-carnival-blue text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            ¿Listo para Danzar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y siente la alegría del Carnaval de Barranquilla
          </p>
          <Link href="/inscripcion" className="btn-primary text-lg">
            Inscribirse Ahora
          </Link>
        </div>
      </section>
    </>
  );
}
