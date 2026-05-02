import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Admin users desde variables de entorno
// ADMIN_USERS formato: "email1:hashedpass1:nombre1,email2:hashedpass2:nombre2"
function getAdminUsers(): { email: string; passwordHash: string; name: string }[] {
  const adminUsers = process.env.ADMIN_USERS || '';
  if (!adminUsers) return [];

  return adminUsers.split(',').map((user) => {
    const parts = user.split(':');
    return {
      email: (parts[0] || '').trim(),
      passwordHash: (parts[1] || '').trim(),
      name: (parts[2] || parts[0] || '').trim(),
    };
  });
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminUsers = getAdminUsers();
        const user = adminUsers.find((u) => u.email === credentials.email);

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.email,
          email: user.email,
          name: user.name,
          role: 'admin',
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
