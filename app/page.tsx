import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section - Epic */}
      <section className="relative min-h-screen bg-gradient-to-b from-carnival-yellow via-carnival-red to-carnival-blue flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 -left-20 w-96 h-96 bg-carnival-yellow rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-carnival-red rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-carnival-blue rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-max text-center py-20">
          <div className="space-y-8 animate-slide-up">
            {/* Main Heading */}
            <div>
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 drop-shadow-2xl animate-glow">
                ¡BIENVENIDO AL CARNAVAL!
              </h1>
              <div className="h-1 w-32 bg-white mx-auto rounded-full animate-pulse"></div>
            </div>

            {/* Subheading */}
            <p className="text-xl md:text-3xl text-white/95 max-w-3xl mx-auto drop-shadow-lg font-accent">
              Aprende las danzas tradicionales del Carnaval de Barranquilla, el festival más grande de Colombia
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Link
                href="/inscripcion"
                className="group relative px-8 py-4 bg-white text-carnival-red font-accent font-bold text-lg rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">🎉 Inscribirse Ahora</span>
                <span className="absolute inset-0 bg-carnival-darkBg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link
                href="/clases"
                className="group px-8 py-4 border-2 border-white text-white font-accent font-bold text-lg rounded-full hover:bg-white hover:text-carnival-red transform hover:scale-105 transition-all duration-300"
              >
                📚 Explorar Clases
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              {[
                { num: '200+', label: 'Estudiantes', icon: '👥', bgColor: 'from-carnival-yellow/80 to-amber-400/80', borderColor: 'border-carnival-gold' },
                { num: '50+', label: 'Eventos', icon: '🎉', bgColor: 'from-carnival-red/80 to-pink-500/80', borderColor: 'border-carnival-red' },
                { num: '15+', label: 'Años de Pasión', icon: '💪', bgColor: 'from-carnival-blue/80 to-blue-600/80', borderColor: 'border-carnival-blue' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`bg-gradient-to-br ${stat.bgColor} rounded-lg p-8 text-white backdrop-blur-xl border-2 ${stat.borderColor} transform hover:scale-105 transition-all duration-300 animate-slide-up shadow-xl`}
                  style={{animationDelay: `${i * 0.1}s`}}
                >
                  <div className="text-5xl mb-4 animate-bounce drop-shadow-lg">{stat.icon}</div>
                  <div className="text-5xl font-display font-bold mb-2 drop-shadow-lg">{stat.num}</div>
                  <div className="text-base font-accent drop-shadow-md">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="text-4xl animate-pulse">👇</div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-r from-carnival-yellow/20 via-white to-carnival-red/20 relative">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-carnival-yellow via-carnival-red to-carnival-blue"></div>
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-slide-left">
              <h2 className="text-5xl font-display font-bold text-carnival-darkBg">
                Sobre Nosotros
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-carnival-gold to-carnival-red rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Somos una academia de danza dedicada a <span className="font-bold text-carnival-red">preservar y promover</span> las tradiciones culturales del Carnaval de Barranquilla, el mayor festival anual de Colombia.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Fundada en 2022 por <span className="font-bold">Mayra Rincon y Marilyn Gallardo</span>, nuestro objetivo es llevar la alegría, energía y pasión del Carnaval a toda la comunidad de Utah.
              </p>
              <Link href="/contacto" className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-carnival-gold to-carnival-red text-white font-accent font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Conocer Más 🔥
              </Link>
            </div>

            {/* Right Card */}
            <div className="animate-slide-right">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-carnival-gold">
                <div className="absolute inset-0 bg-gradient-to-br from-carnival-gold via-carnival-red to-carnival-blue opacity-95"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-carnival-darkBg/20 to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-8 space-y-6">
                  <div className="text-8xl animate-float drop-shadow-2xl">🎭</div>
                  <h3 className="text-5xl font-display font-bold drop-shadow-2xl">Marimonda</h3>
                  <p className="text-lg font-accent drop-shadow-lg">
                    El ícono más emblemático del Carnaval. Con su máscara característica, representa la alegría y la libertad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dance Styles Section */}
      <section className="py-24 bg-gradient-to-b from-carnival-yellow/30 via-carnival-red/20 to-carnival-blue/20">
        <div className="container-max">
          <div className="text-center mb-16 animate-slide-down">
            <h2 className="text-5xl font-display font-bold text-carnival-darkBg mb-4">
              Danzas que Enseñamos
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-carnival-gold to-carnival-red rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Aprende los ritmos más auténticos del Carnaval colombiano</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'CUMBIA', emoji: '💃', desc: 'La danza más antigua y tradicional, con movimientos suaves y cautivadores', bgColor: 'bg-gradient-to-br from-carnival-yellow to-orange-400', borderColor: 'border-carnival-yellow' },
              { name: 'MAPALÉ', emoji: '🎶', desc: 'Ritmo afro-colombiano con movimientos libres y energéticos', bgColor: 'bg-gradient-to-br from-carnival-red to-pink-500', borderColor: 'border-carnival-red' },
              { name: 'GARABATO', emoji: '🎄', desc: 'Danza folklórica tradicional con coreografía fluida y elegante', bgColor: 'bg-gradient-to-br from-carnival-blue to-purple-600', borderColor: 'border-carnival-blue' },
            ].map((dance, i) => (
              <div
                key={dance.name}
                className={`group ${dance.bgColor} rounded-2xl p-8 text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up border-4 ${dance.borderColor} shadow-lg`}
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="text-8xl mb-6 animate-float group-hover:animate-bounce drop-shadow-lg">{dance.emoji}</div>
                <h3 className="text-4xl font-display font-bold mb-3 text-white drop-shadow-xl">{dance.name}</h3>
                <p className="text-white font-accent group-hover:text-white transition text-lg drop-shadow-lg">{dance.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-24 bg-gradient-to-b from-carnival-yellow/20 via-carnival-gold/10 to-carnival-red/20 relative">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-carnival-yellow via-carnival-red to-carnival-blue"></div>
        <div className="container-max relative z-10">
          <div className="text-center mb-16 animate-slide-down">
            <h2 className="text-5xl font-display font-bold text-carnival-darkBg mb-4">
              Clases Populares
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-carnival-gold to-carnival-red rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { level: 'Principiante', time: 'Lunes & Miércoles', instructor: 'Mayra', icon: '🌱', bgColor: 'bg-gradient-to-br from-carnival-yellow to-amber-300', borderColor: 'border-carnival-yellow' },
              { level: 'Intermedio', time: 'Martes & Jueves', instructor: 'Marilyn', icon: '🔥', bgColor: 'bg-gradient-to-br from-carnival-red to-pink-400', borderColor: 'border-carnival-red' },
              { level: 'Avanzado', time: 'Sábados', instructor: 'Profesores', icon: '⭐', bgColor: 'bg-gradient-to-br from-carnival-blue to-blue-600', borderColor: 'border-carnival-blue' },
              { level: 'Niños (5-12)', time: 'Viernes 5pm', instructor: 'Equipo', icon: '🎈', bgColor: 'bg-gradient-to-br from-pink-400 to-purple-500', borderColor: 'border-pink-500' },
            ].map((cls, i) => (
              <div
                key={cls.level}
                className={`${cls.bgColor} rounded-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-l-4 ${cls.borderColor} shadow-lg animate-slide-up text-white`}
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="text-5xl mb-3 animate-bounce">{cls.icon}</div>
                <h3 className="text-xl font-display font-bold mb-3 drop-shadow-lg">{cls.level}</h3>
                <div className="space-y-2 text-sm mb-6 font-accent drop-shadow-md">
                  <p>⏰ {cls.time}</p>
                  <p>👨‍🏫 {cls.instructor}</p>
                </div>
                <Link href="/inscripcion" className="w-full bg-white text-carnival-red font-accent font-bold py-2 rounded-lg text-center transform hover:scale-105 transition shadow-lg hover:shadow-2xl">
                  Inscribirse
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/clases" className="inline-block px-10 py-4 bg-gradient-to-r from-carnival-gold to-carnival-red text-white font-accent font-bold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-xl">
              Ver Todos los Horarios 📅
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-carnival-red via-carnival-blue to-carnival-gold text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-carnival-yellow rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-carnival-gold rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container-max text-center relative z-10 animate-slide-up">
          <h2 className="text-6xl md:text-7xl font-display font-bold mb-8 drop-shadow-2xl">
            ¿Listo para Danzar?
          </h2>
          <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto font-accent drop-shadow-lg leading-relaxed">
            Únete a nuestra comunidad y siente la alegría, energía y pasión del Carnaval de Barranquilla
          </p>
          <Link href="/inscripcion" className="inline-block px-14 py-6 bg-white text-carnival-red font-accent font-bold text-2xl rounded-full hover:bg-carnival-lightBg transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl border-4 border-carnival-yellow">
            🎉 ¡Inscribirse Ahora!
          </Link>
        </div>
      </section>
    </>
  );
}
