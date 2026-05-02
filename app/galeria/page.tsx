'use client';

import Image from 'next/image';
import { useState } from 'react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  event: string;
  date: string;
  src: string;
  thumbnail?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'new-york-parade-2024',
    type: 'video',
    title: 'Hispanic Day Parade - New York 2024',
    event: 'New York Parade',
    date: 'Octubre 2024',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'carnival-event-2024',
    type: 'image',
    title: 'Actuación en Famous Karamba',
    event: 'Festival de Arte',
    date: 'Febrero 2024',
    src: 'https://images.unsplash.com/photo-1540575467063-178e50202d7d?w=600&h=400&fit=crop',
  },
  {
    id: 'training-session-2024',
    type: 'image',
    title: 'Ensayo Intensivo',
    event: 'Entrenamientos',
    date: 'Enero 2024',
    src: 'https://images.unsplash.com/photo-1508700115892-37b23ff4c8f1?w=600&h=400&fit=crop',
  },
  {
    id: 'costumes-2024',
    type: 'image',
    title: 'Trajes Tradicionales de Marimonda',
    event: 'Vestuario',
    date: 'Diciembre 2023',
    src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop',
  },
  {
    id: 'performance-2023',
    type: 'video',
    title: 'Performance Festival de Artes 2023',
    event: 'Festival Local',
    date: 'Noviembre 2023',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'kids-class-2023',
    type: 'image',
    title: 'Clase para Niños',
    event: 'Clases Infantiles',
    date: 'Septiembre 2023',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
  },
  {
    id: 'group-photo-2023',
    type: 'image',
    title: 'Foto Grupal - Academia',
    event: 'Eventos Especiales',
    date: 'Agosto 2023',
    src: 'https://images.unsplash.com/photo-1540535731244-46e9fcb09ef1?w=600&h=400&fit=crop',
  },
  {
    id: 'rehearsal-2023',
    type: 'image',
    title: 'Ensayo General',
    event: 'Preparación',
    date: 'Julio 2023',
    src: 'https://images.unsplash.com/photo-1549834125-059bf1214e4f?w=600&h=400&fit=crop',
  },
];

export default function GaleriaPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filterEvent, setFilterEvent] = useState<string>('todos');

  const events = ['todos', ...new Set(GALLERY_ITEMS.map((item) => item.event))];

  const filteredItems =
    filterEvent === 'todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.event === filterEvent);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-green to-carnival-pink text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold mb-4">Galería</h1>
          <p className="text-xl text-white/90">
            Revive los momentos más coloridos de nuestras actuaciones y eventos
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-carnival-lightBg py-8">
        <div className="container-max">
          <h3 className="font-accent font-bold mb-4">Filtrar por Evento:</h3>
          <div className="flex flex-wrap gap-3">
            {events.map((event) => (
              <button
                key={event}
                onClick={() => setFilterEvent(event)}
                className={`px-4 py-2 rounded-lg font-accent font-bold transition ${
                  filterEvent === event
                    ? 'bg-carnival-green text-white'
                    : 'bg-white text-carnival-darkBg hover:bg-carnival-green hover:text-white'
                }`}
              >
                {event.charAt(0).toUpperCase() + event.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-max">
          <p className="text-gray-600 mb-8">
            Mostrando {filteredItems.length} de {GALLERY_ITEMS.length} elementos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition aspect-square"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition z-10"></div>

                {item.type === 'image' ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-carnival-darkBg to-black flex items-center justify-center">
                    <span className="text-6xl">▶️</span>
                  </div>
                )}

                <div className="absolute inset-0 flex items-end z-20">
                  <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition">
                    <p className="font-accent font-bold text-sm">{item.type === 'video' ? '🎬 Video' : '📷 Foto'}</p>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs text-gray-300">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-auto rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === 'image' ? (
              <div className="relative w-full h-96 md:h-[500px]">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedItem.src}
                  title={selectedItem.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="bg-white p-6">
              <h3 className="text-2xl font-display font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600 mb-2">{selectedItem.event}</p>
              <p className="text-sm text-gray-500">{selectedItem.date}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-carnival-gold transition z-60"
          >
            ✕
          </button>
        </div>
      )}

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-carnival-gold to-carnival-red text-white py-16">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Eventos' },
              { number: '500+', label: 'Fotos' },
              { number: '30+', label: 'Videos' },
              { number: '2022', label: 'Desde' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-display font-bold mb-2">{stat.number}</div>
                <p className="font-accent">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16">
        <div className="container-max max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">¿Quieres Más Actualizaciones?</h2>
          <p className="text-gray-600 mb-6">
            Suscríbete a nuestro newsletter para recibir fotos y videos exclusivos de nuestros eventos
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-carnival-gold"
            />
            <button className="btn-primary">Suscribirse</button>
          </div>
        </div>
      </section>
    </>
  );
}
