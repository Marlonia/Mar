'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-carnival-yellow via-carnival-red to-carnival-green shadow-2xl animate-slide-down">
      <nav className="container-max flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl animate-float">🎭</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-2xl font-bold text-white drop-shadow-lg">
              Carnaval BA
            </span>
            <p className="text-xs text-white/80 font-accent">Academia de Danza</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { href: '/', label: 'Inicio' },
            { href: '/clases', label: 'Clases' },
            { href: '/galeria', label: 'Galería' },
            { href: '/blog', label: 'Blog' },
            { href: '/tienda', label: 'Tienda' },
            { href: '/contacto', label: 'Contacto' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-white font-accent font-bold transition-all duration-300 hover:text-white hover:scale-105 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/inscripcion"
          className="hidden sm:inline-block px-6 py-3 bg-white text-carnival-red font-accent font-bold rounded-full hover:bg-carnival-lightBg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl animate-pulse"
        >
          ✨ Inscribirse
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 relative w-8 h-8"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-carnival-gold/95 to-carnival-red/95 border-t-4 border-carnival-green animate-slide-down">
          <div className="container-max py-4 flex flex-col gap-2">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/clases', label: 'Clases' },
              { href: '/galeria', label: 'Galería' },
              { href: '/blog', label: 'Blog' },
              { href: '/tienda', label: 'Tienda' },
              { href: '/contacto', label: 'Contacto' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-accent font-bold py-3 px-4 text-white hover:bg-white/20 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inscripcion"
              className="btn-primary text-sm block text-center mt-2 bg-white text-carnival-red"
              onClick={() => setIsOpen(false)}
            >
              Inscribirse
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
