'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container-max flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-carnival-gold rounded-full flex items-center justify-center">
            <span className="text-carnival-darkBg font-bold text-lg">♪</span>
          </div>
          <span className="font-display text-xl font-bold text-carnival-darkBg hidden sm:inline">
            Carnaval BA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-carnival-red transition">
            Inicio
          </Link>
          <Link href="/clases" className="text-sm font-medium hover:text-carnival-red transition">
            Clases
          </Link>
          <Link href="/galeria" className="text-sm font-medium hover:text-carnival-red transition">
            Galería
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-carnival-red transition">
            Blog
          </Link>
          <Link href="/tienda" className="text-sm font-medium hover:text-carnival-red transition">
            Tienda
          </Link>
          <Link href="/contacto" className="text-sm font-medium hover:text-carnival-red transition">
            Contacto
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/inscripcion" className="btn-primary text-sm hidden sm:inline-block">
          Inscribirse
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <div className="w-6 h-0.5 bg-carnival-darkBg transition"></div>
          <div className="w-6 h-0.5 bg-carnival-darkBg transition"></div>
          <div className="w-6 h-0.5 bg-carnival-darkBg transition"></div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-carnival-lightBg border-t border-gray-200">
          <div className="container-max py-4 flex flex-col gap-3">
            <Link href="/" className="text-sm font-medium py-2">Inicio</Link>
            <Link href="/clases" className="text-sm font-medium py-2">Clases</Link>
            <Link href="/galeria" className="text-sm font-medium py-2">Galería</Link>
            <Link href="/blog" className="text-sm font-medium py-2">Blog</Link>
            <Link href="/tienda" className="text-sm font-medium py-2">Tienda</Link>
            <Link href="/contacto" className="text-sm font-medium py-2">Contacto</Link>
            <Link href="/inscripcion" className="btn-primary text-sm block text-center">
              Inscribirse
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
