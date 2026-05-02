'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'historia-carnaval-barranquilla',
    title: 'Historia del Carnaval de Barranquilla',
    excerpt: 'Descubre los orígenes y evolución del Carnaval más grande de Colombia...',
    content:
      'El Carnaval de Barranquilla es una celebración que mezcla influencias indígenas, africanas y españolas. Con más de 120 años de historia, es considerado uno de los carnavales más importantes de América Latina.',
    author: 'Mayra Rincon',
    date: '2024-04-15',
    category: 'Historia',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&h=400&fit=crop',
    readTime: '5 min',
  },
  {
    id: 'danzas-tradicionales-cumbia',
    title: 'Guía Completa: La Cumbia',
    excerpt: 'Todo lo que necesitas saber sobre la danza más emblemática del Carnaval...',
    content:
      'La Cumbia es la danza más antigua y tradicional del Carnaval de Barranquilla. Tiene movimientos suaves y envolventes que representan la unión de culturas...',
    author: 'Marilyn Gallardo',
    date: '2024-03-28',
    category: 'Danzas',
    image: 'https://images.unsplash.com/photo-1508700115892-37b23ff4c8f1?w=600&h=400&fit=crop',
    readTime: '6 min',
  },
  {
    id: 'beneficios-salud-danza',
    title: 'Beneficios para la Salud de la Danza',
    excerpt: 'Cómo bailar mejora tu salud física y mental...',
    content:
      'La danza es una excelente forma de ejercicio que mejora la coordinación, flexibilidad y fortaleza. Además, tiene beneficios emocionales y sociales.',
    author: 'Equipo Editorial',
    date: '2024-03-15',
    category: 'Salud',
    image: 'https://images.unsplash.com/photo-1504942238118-f5e630b1dedd?w=600&h=400&fit=crop',
    readTime: '4 min',
  },
  {
    id: 'preparacion-carnaval-2024',
    title: 'Preparación para el Carnaval 2024',
    excerpt: 'Noticias sobre nuestros planes para el próximo Carnaval...',
    content:
      'Este año tenemos planes especiales para celebrar el Carnaval. Nuestros estudiantes participarán en varios eventos a lo largo del año.',
    author: 'Mayra Rincon',
    date: '2024-03-01',
    category: 'Eventos',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    readTime: '5 min',
  },
  {
    id: 'entrevista-estudiantes',
    title: 'Historias de Nuestros Estudiantes',
    excerpt: 'Conoce a los talentos detrás de nuestras actuaciones...',
    content:
      'Hemos seleccionado algunas historias inspiradoras de estudiantes que han transformado sus vidas a través de la danza.',
    author: 'Equipo Editorial',
    date: '2024-02-20',
    category: 'Comunidad',
    image: 'https://images.unsplash.com/photo-1540535731244-46e9fcb09ef1?w=600&h=400&fit=crop',
    readTime: '7 min',
  },
  {
    id: 'marimonda-simbolo-cultural',
    title: 'Marimonda: Símbolo Cultural del Carnaval',
    excerpt: 'La máscara icónica que representa la alegría del Carnaval...',
    content:
      'La Marimonda es uno de los símbolos más reconocibles del Carnaval de Barranquilla. Su máscara característica representa la jota burlona...',
    author: 'Marilyn Gallardo',
    date: '2024-02-10',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop',
    readTime: '5 min',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Todos', ...new Set(BLOG_POSTS.map((post) => post.category))];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-pink to-carnival-gold text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold mb-4">Blog</h1>
          <p className="text-xl text-white/90">
            Historias, guías y noticias sobre el Carnaval de Barranquilla
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-carnival-lightBg py-8">
        <div className="container-max">
          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-pink focus:ring-2 focus:ring-carnival-pink/50"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-accent font-bold mb-4">Categorías:</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-accent font-bold transition ${
                    selectedCategory === category
                      ? 'bg-carnival-pink text-white'
                      : 'bg-white text-carnival-darkBg hover:bg-carnival-pink hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container-max">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No se encontraron artículos que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">
                Mostrando {filteredPosts.length} de {BLOG_POSTS.length} artículos
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-carnival-gold to-carnival-red">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-carnival-pink text-white px-3 py-1 rounded-full text-xs font-accent font-bold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-carnival-darkBg mb-3 hover:text-carnival-red transition cursor-pointer">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b">
                        <span>👤 {post.author}</span>
                        <span>📅 {new Date(post.date).toLocaleDateString('es-ES')}</span>
                        <span>⏱️ {post.readTime}</span>
                      </div>

                      {/* Read More */}
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-carnival-pink font-accent font-bold hover:text-carnival-red transition"
                      >
                        Leer Más
                        <span>→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-carnival-blue to-carnival-pink text-white py-16">
        <div className="container-max max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Recibe Noticias</h2>
          <p className="text-white/90 mb-6">
            Suscríbete a nuestro newsletter para recibir historias, guías y actualizaciones de eventos
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-lg text-carnival-darkBg focus:outline-none"
            />
            <button className="bg-carnival-gold text-carnival-darkBg px-6 py-3 rounded-lg font-accent font-bold hover:bg-primary-600 transition">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
