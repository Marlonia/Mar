export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Proteger todas las rutas /admin EXCEPTO:
     * - /admin/login (donde se hace el login)
     */
    '/admin/((?!login).*)',
  ],
};
