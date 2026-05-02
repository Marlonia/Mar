import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const authMiddleware = withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas de admin: solo aplica auth (no i18n)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
      return NextResponse.next();
    }
    // @ts-expect-error - withAuth tipo no perfectamente alineado con NextRequest
    return authMiddleware(req);
  }

  // Rutas API: dejar pasar sin i18n
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Resto: aplicar i18n
  return intlMiddleware(req);
}

export const config = {
  // Aplicar middleware a TODAS las rutas excepto archivos estáticos
  matcher: [
    // Excluir: _next, archivos estáticos, robots.txt, sitemap.xml, manifest, favicon
    '/((?!_next|_vercel|.*\\..*|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
