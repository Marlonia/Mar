'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/clases', label: t('nav.classes') },
    { href: '/galeria', label: t('nav.gallery') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/tienda', label: t('nav.store') },
    { href: '/contacto', label: t('nav.contact') },
  ] as const;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark py-2 shadow-2xl' : 'bg-transparent py-4'
        }`}
      >
        <nav className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-carnival-yellow via-carnival-red to-carnival-green rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-180">
                <span className="text-2xl">🎭</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-carnival-yellow via-carnival-red to-carnival-green rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Carnaval <span className="gradient-text">BA</span>
              </span>
              <p className="text-[10px] text-white/60 font-accent uppercase tracking-widest">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 glass-effect rounded-full px-2 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-white/80 hover:text-white font-accent text-sm font-bold rounded-full transition-all duration-300 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Language + CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* CTA Desktop */}
            <Link
              href="/inscripcion"
              className="hidden sm:inline-flex group relative px-6 py-3 bg-carnival-yellow text-carnival-darkBg font-accent font-bold text-sm rounded-full overflow-hidden transition-all duration-500 hover:scale-105 items-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('cta')}
                <span className="text-base transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-carnival-red to-carnival-green transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="absolute inset-0 flex items-center justify-center text-white font-accent font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                {t('ctaHover')}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 glass-effect rounded-full"
              aria-label="Menu"
            >
              <span
                className={`w-5 h-[2px] bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1' : ''
                }`}
              ></span>
              <span
                className={`w-5 h-[2px] bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-5 h-[2px] bg-white transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-screen Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 mesh-gradient-1"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-8">
          <nav className="space-y-6 text-center">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block font-massive text-5xl text-white hover:gradient-text transition-all duration-500 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/inscripcion"
            onClick={() => setIsOpen(false)}
            className="mt-12 px-10 py-5 bg-carnival-yellow text-carnival-darkBg font-accent font-bold text-lg rounded-full hover:scale-105 transition-all duration-500 shadow-2xl"
          >
            {t('ctaMobile')}
          </Link>

          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white/50 font-accent text-xs uppercase tracking-widest">
              {t('footerText')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
