import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-carnival-yellow opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-carnival-red opacity-10 rounded-full filter blur-3xl"></div>

      {/* Big text decoration */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 pointer-events-none">
        <h2 className="font-massive text-[20rem] text-white/[0.03] whitespace-nowrap">CARNAVAL</h2>
      </div>

      <div className="container-max relative z-10 py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-white/10">
          <div>
            <h2 className="font-massive text-5xl md:text-7xl text-white leading-none mb-6">
              Vamos a <span className="gradient-text">danzar</span><br />
              juntos.
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Únete a la única academia auténtica del Carnaval de Barranquilla en Utah.
            </p>
          </div>
          <div className="flex items-center lg:justify-end">
            <Link
              href="/inscripcion"
              className="group inline-flex items-center gap-4 px-8 py-5 bg-carnival-yellow text-carnival-darkBg font-accent font-bold text-lg rounded-full hover:scale-105 transition-all duration-500 shadow-2xl"
            >
              Inscribirse Ahora
              <span className="w-10 h-10 rounded-full bg-carnival-darkBg text-carnival-yellow flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-carnival-yellow via-carnival-red to-carnival-green rounded-full flex items-center justify-center">
                <span className="text-xl">🎭</span>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Carnaval <span className="gradient-text">BA</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Promoviendo la cultura colombiana del Carnaval de Barranquilla en Utah desde 2022.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-accent font-bold text-white text-sm uppercase tracking-widest mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              {['Inicio', 'Clases', 'Galería', 'Blog'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === 'Inicio' ? '' : item.toLowerCase().replace('í', 'i')}`}
                    className="text-white/60 hover:text-carnival-yellow transition link-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-accent font-bold text-white text-sm uppercase tracking-widest mb-4">
              Servicios
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/clases" className="text-white/60 hover:text-carnival-yellow transition link-underline">Clases</Link></li>
              <li><Link href="/tienda" className="text-white/60 hover:text-carnival-yellow transition link-underline">Tienda</Link></li>
              <li><Link href="/inscripcion" className="text-white/60 hover:text-carnival-yellow transition link-underline">Inscripción</Link></li>
              <li><Link href="/contacto" className="text-white/60 hover:text-carnival-yellow transition link-underline">Eventos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent font-bold text-white text-sm uppercase tracking-widest mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>West Valley City, Utah</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a href="mailto:info@carnavalba.com" className="hover:text-carnival-yellow transition">info@carnavalba.com</a>
              </li>
            </ul>

            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/carnavalbaq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:bg-carnival-yellow hover:text-carnival-darkBg transition-all duration-500 hover:scale-110"
              >
                📷
              </a>
              <a
                href="https://facebook.com/carnavaldebarranquillautah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:bg-carnival-yellow hover:text-carnival-darkBg transition-all duration-500 hover:scale-110"
              >
                👍
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/40 pt-8 border-t border-white/10">
          <p>&copy; {currentYear} Carnaval de Barranquilla en Utah. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-carnival-yellow transition">Privacidad</Link>
            <Link href="#" className="hover:text-carnival-yellow transition">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
