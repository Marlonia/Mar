import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | Carnaval BA Utah',
  description: 'Panel de administración',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-carnival-darkBg">{children}</div>;
}
