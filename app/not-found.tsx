import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-carnival-gold via-carnival-red to-carnival-blue flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-9xl font-display font-bold mb-4">404</h1>
        <h2 className="text-4xl font-display font-bold mb-6">¡Página No Encontrada!</h2>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Parece que te perdiste en el camino del Carnaval. La página que buscas no existe.
        </p>
        <div className="space-y-4">
          <p className="text-lg">🎭 ¡Pero no te preocupes, aquí está el camino correcto!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary text-lg">
              Volver al Inicio
            </Link>
            <Link href="/clases" className="btn-outline text-lg">
              Ver Clases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
