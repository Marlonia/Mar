import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-carnival-darkBg text-white">
      {/* Main Footer */}
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-carnival-gold">
              Carnaval BA
            </h3>
            <p className="text-gray-300 text-sm">
              Academia de danza dedicada a promover la cultura y tradiciones del Carnaval de Barranquilla en Utah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent font-bold mb-4 text-carnival-gold">Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-carnival-gold transition">Inicio</Link></li>
              <li><Link href="/clases" className="hover:text-carnival-gold transition">Clases</Link></li>
              <li><Link href="/galeria" className="hover:text-carnival-gold transition">Galería</Link></li>
              <li><Link href="/blog" className="hover:text-carnival-gold transition">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-accent font-bold mb-4 text-carnival-gold">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/clases" className="hover:text-carnival-gold transition">Clases Regulares</Link></li>
              <li><Link href="/tienda" className="hover:text-carnival-gold transition">Tienda</Link></li>
              <li><Link href="/contacto" className="hover:text-carnival-gold transition">Eventos</Link></li>
              <li><Link href="/inscripcion" className="hover:text-carnival-gold transition">Inscripción</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent font-bold mb-4 text-carnival-gold">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📍 West Valley City, Utah</li>
              <li>📧 <a href="mailto:info@carnavalba.com" className="hover:text-carnival-gold transition">info@carnavalba.com</a></li>
              <li>📱 (801) 555-XXXX</li>
            </ul>
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/carnavalbaq" target="_blank" rel="noopener noreferrer"
                className="hover:text-carnival-gold transition text-xl">
                📱
              </a>
              <a href="https://facebook.com/carnavaldebarranquillautah" target="_blank" rel="noopener noreferrer"
                className="hover:text-carnival-gold transition text-xl">
                👍
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} Carnaval de Barranquilla en Utah. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-carnival-gold transition">Privacidad</Link>
              <Link href="#" className="hover:text-carnival-gold transition">Términos</Link>
              <Link href="#" className="hover:text-carnival-gold transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
