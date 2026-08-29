'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function InscripcionForm() {
  const searchParams = useSearchParams();
  const selectedClass = searchParams.get('class');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    edad: '',
    nivelExperiencia: 'principiante',
    clasePreferida: selectedClass || '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Datos de inscripción:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        edad: '',
        nivelExperiencia: 'principiante',
        clasePreferida: '',
        mensaje: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error en inscripción:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-max max-w-2xl mx-auto">
      {submitted && (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded">
          <h3 className="text-xl font-bold text-green-700 mb-2">¡Inscripción Exitosa! 🎉</h3>
          <p className="text-green-600 mb-3">
            Gracias por tu inscripción. Nos pondremos en contacto contigo pronto para confirmar tu registro.
          </p>
          <p className="text-green-600">
            ¿Listo para asegurar tu cupo?{' '}
            <Link href="/membresias" className="font-bold underline">
              Activa tu membresía mensual aquí
            </Link>
            .
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-carnival-gold">
        {/* Datos Personales */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-carnival-darkBg mb-6 flex items-center gap-2">
            👤 Datos Personales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                Apellido *
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50"
                placeholder="Tu apellido"
              />
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-carnival-darkBg mb-6 flex items-center gap-2">
            📧 Información de Contacto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                Teléfono *
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50"
                placeholder="(801) 555-XXXX"
              />
            </div>
          </div>
        </div>

        {/* Información de la Clase */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-carnival-darkBg mb-6 flex items-center gap-2">
            🎓 Información de la Clase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                Edad *
              </label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
                min="5"
                max="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50"
                placeholder="Tu edad"
              />
            </div>

            <div>
              <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                Nivel de Experiencia *
              </label>
              <select
                name="nivelExperiencia"
                value={formData.nivelExperiencia}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50 bg-white"
              >
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
              Clase Preferida (Opcional)
            </label>
            <select
              name="clasePreferida"
              value={formData.clasePreferida}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50 bg-white"
            >
              <option value="">-- Selecciona una clase --</option>
              <option value="cumbia-principiante-lun">Cumbia - Principiante (Lunes)</option>
              <option value="cumbia-principiante-mie">Cumbia - Principiante (Miércoles)</option>
              <option value="mapale-intermedio-mar">Mapalé - Intermedio (Martes)</option>
              <option value="garabato-intermedio-jue">Garabato - Intermedio (Jueves)</option>
              <option value="avanzado-sabado">Fusión - Avanzado (Sábado)</option>
              <option value="ninos-cumbia">Cumbia Kids (Viernes)</option>
              <option value="ninos-sabado">Danzas Variadas Kids (Sábado)</option>
              <option value="adultos-sabado">Adultos Principiantes (Sábado)</option>
            </select>
          </div>
        </div>

        {/* Mensaje Adicional */}
        <div className="mb-8">
          <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
            Cuéntanos Sobre Ti (Opcional)
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold focus:ring-2 focus:ring-carnival-gold/50"
            placeholder="¿Qué te motiva a aprender a danzar? ¿Algún objetivo especial?"
          />
        </div>

        {/* Términos */}
        <div className="mb-8 p-4 bg-carnival-lightBg rounded-lg">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 rounded border-gray-300 accent-carnival-gold"
            />
            <span className="text-sm text-gray-600">
              Acepto los términos y condiciones. He leído la política de privacidad.
            </span>
          </label>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Enviando...' : 'Inscribirse Ahora'}
          </button>
          <Link
            href="/clases"
            className="flex-1 btn-outline text-lg text-center"
          >
            Ver Clases
          </Link>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            emoji: '✅',
            title: 'Rápido',
            desc: 'Inscripción en menos de 5 minutos',
          },
          {
            emoji: '📧',
            title: 'Confirmación',
            desc: 'Recibirás email de confirmación inmediato',
          },
          {
            emoji: '📞',
            title: 'Soporte',
            desc: 'Nos contactaremos en 24 horas',
          },
        ].map((info) => (
          <div key={info.title} className="text-center">
            <div className="text-4xl mb-2">{info.emoji}</div>
            <h3 className="font-display font-bold mb-1">{info.title}</h3>
            <p className="text-sm text-gray-600">{info.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
