'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el email
    console.log('Mensaje de contacto:', formData);
    setSubmitted(true);
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-green to-carnival-red text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold mb-4">Contacto</h1>
          <p className="text-xl text-white/90">
            Ponte en contacto con nosotros. Te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-carnival-red mb-4">
                  Información de Contacto
                </h3>
              </div>

              {[
                {
                  icon: '📍',
                  title: 'Ubicación',
                  details: ['West Valley City, Utah', 'USA'],
                },
                {
                  icon: '📞',
                  title: 'Teléfono',
                  details: ['(801) 555-XXXX'],
                },
                {
                  icon: '📧',
                  title: 'Email',
                  details: ['info@carnavalba.com', 'eventos@carnavalba.com'],
                },
                {
                  icon: '🕐',
                  title: 'Horario',
                  details: ['Lunes - Viernes: 10:00 AM - 6:00 PM', 'Sábados: 10:00 AM - 2:00 PM'],
                },
              ].map((info) => (
                <div key={info.title}>
                  <h4 className="font-accent font-bold text-lg mb-2 flex items-center gap-2">
                    {info.icon} {info.title}
                  </h4>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}

              {/* Social Links */}
              <div>
                <h4 className="font-accent font-bold text-lg mb-4 flex items-center gap-2">
                  🌐 Síguenos
                </h4>
                <div className="flex gap-4">
                  {[
                    {
                      name: 'Instagram',
                      url: 'https://instagram.com/carnavalbaq',
                      emoji: '📸',
                    },
                    {
                      name: 'Facebook',
                      url: 'https://facebook.com/carnavaldebarranquillautah',
                      emoji: '👍',
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-carnival-lightBg rounded-lg hover:bg-carnival-gold hover:text-carnival-darkBg transition"
                      title={social.name}
                    >
                      <span className="text-xl">{social.emoji}</span>
                      <span className="hidden sm:inline text-sm font-accent font-bold">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted && (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded">
                  <h3 className="text-xl font-bold text-green-700 mb-2">¡Mensaje Enviado! ✅</h3>
                  <p className="text-green-600">
                    Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-carnival-green">
                <div className="space-y-6">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-green focus:ring-2 focus:ring-carnival-green/50"
                      placeholder="Tu nombre"
                    />
                  </div>

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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-green focus:ring-2 focus:ring-carnival-green/50"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                      Asunto *
                    </label>
                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-green focus:ring-2 focus:ring-carnival-green/50 bg-white"
                    >
                      <option value="">-- Selecciona un asunto --</option>
                      <option value="inscripcion">Pregunta sobre Inscripción</option>
                      <option value="clases">Información de Clases</option>
                      <option value="eventos">Sobre Eventos y Performances</option>
                      <option value="general">Consulta General</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-accent font-bold mb-2 text-carnival-darkBg">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-green focus:ring-2 focus:ring-carnival-green/50"
                      placeholder="Tu mensaje..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-carnival-green text-white font-accent font-bold rounded-lg hover:bg-green-700 transition"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-carnival-lightBg">
        <div className="container-max">
          <h2 className="text-3xl font-display font-bold text-carnival-darkBg mb-8 text-center">
            Encuéntranos
          </h2>
          <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9876543210!2d-111.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752d5e5e5e5e5e5!2sWest%20Valley%20City%2C%20UT!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-max max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-carnival-darkBg mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Cuál es la mejor forma de contactarlos?',
                a: 'Puedes contactarnos por email, teléfono o visitando nuestras redes sociales. Respondemos mensajes en 24 horas.',
              },
              {
                q: '¿Ofrecen clases privadas?',
                a: 'Sí, disponemos de clases privadas y semi-privadas. Contáctanos para solicitar información de precios y disponibilidad.',
              },
              {
                q: '¿Hacen presentaciones en eventos?',
                a: 'Sí, realizamos presentaciones para eventos especiales y corporativos. Envía tus detalles por email.',
              },
              {
                q: '¿Tienen ubicación física?',
                a: 'Nuestras clases se imparten en diferentes ubicaciones en West Valley City. Contáctanos para información detallada.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="font-accent font-bold text-carnival-red mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
