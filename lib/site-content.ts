/**
 * Configuración centralizada de imágenes del sitio.
 * Cuando agregues fotos, simplemente actualiza el campo `image` con la URL de la foto.
 *
 * Las URLs pueden ser:
 * - Locales: '/images/danzas/cumbia.jpg' (foto en /public/images/)
 * - Remotas: 'https://res.cloudinary.com/.../cumbia.jpg' (Cloudinary)
 */

export interface DanceVisual {
  id: string;
  name: string;
  emoji: string;
  image?: string; // URL de la foto (opcional, si no hay se muestra el emoji)
  description: string;
  badge: string;
  bg: string;
}

// Las 3 danzas principales (Hero del sitio)
export const MAIN_DANCES: DanceVisual[] = [
  {
    id: 'cumbia',
    name: 'CUMBIA',
    emoji: '💃',
    image: '/images/danzas/cumbia.jpg', // Sube tu foto aquí
    description:
      'La danza más antigua del Carnaval. Movimientos suaves, cautivadores y llenos de historia africana, indígena y española.',
    badge: 'Más Tradicional',
    bg: 'from-carnival-yellow via-amber-500 to-orange-600',
  },
  {
    id: 'mapale',
    name: 'MAPALÉ',
    emoji: '🎶',
    image: '/images/danzas/mapale.jpg',
    description: 'Ritmo afro-colombiano libre y energético. Pura expresión.',
    badge: 'Energético',
    bg: 'from-carnival-red via-pink-600 to-rose-700',
  },
  {
    id: 'garabato',
    name: 'GARABATO',
    emoji: '🎄',
    image: '/images/danzas/garabato.jpg',
    description:
      'Danza folklórica con coreografía fluida y elegante. Representa la lucha simbólica entre la vida y la muerte.',
    badge: 'Folklórico',
    bg: 'from-carnival-green via-emerald-600 to-teal-700',
  },
];

// Las 6 danzas adicionales
export const SECONDARY_DANCES: DanceVisual[] = [
  {
    id: 'champeta',
    name: 'CHAMPETA',
    emoji: '🎵',
    image: '/images/danzas/champeta.jpg',
    description: 'Ritmo afro-caribeño nacido en Cartagena. Movimientos sensuales y energéticos.',
    badge: 'Afro-Caribeño',
    bg: 'from-orange-500 via-red-600 to-pink-700',
  },
  {
    id: 'salsa',
    name: 'SALSA',
    emoji: '💋',
    image: '/images/danzas/salsa.jpg',
    description: 'El ritmo más popular de Latinoamérica. Pasos elegantes con energía contagiosa.',
    badge: 'Latino',
    bg: 'from-rose-500 via-fuchsia-600 to-purple-700',
  },
  {
    id: 'son-de-negro',
    name: 'SON DE NEGRO',
    emoji: '🥁',
    image: '/images/danzas/son-de-negro.jpg',
    description: 'Danza ancestral afro-colombiana. Tambores, máscaras y profunda raíz cultural.',
    badge: 'Tradicional',
    bg: 'from-amber-700 via-orange-800 to-red-900',
  },
  {
    id: 'bullerengue',
    name: 'BULLERENGUE',
    emoji: '🌊',
    image: '/images/danzas/bullerengue.jpg',
    description: 'Ritmo de tambor y voz femenina. La esencia del Caribe colombiano.',
    badge: 'Folklórico',
    bg: 'from-cyan-600 via-blue-700 to-indigo-800',
  },
  {
    id: 'urbano',
    name: 'URBANO',
    emoji: '🎤',
    image: '/images/danzas/urbano.jpg',
    description: 'Reggaetón, dancehall y estilos modernos. La fusión del Caribe con lo contemporáneo.',
    badge: 'Moderno',
    bg: 'from-violet-600 via-purple-700 to-pink-800',
  },
  {
    id: 'marimondas',
    name: 'MARIMONDAS',
    emoji: '🎭',
    image: '/images/danzas/marimondas.jpg',
    description: 'La danza del personaje icónico del Carnaval. Alegría, libertad y rebeldía pura.',
    badge: 'Icónico',
    bg: 'from-carnival-yellow via-amber-500 to-carnival-red',
  },
];

// Card de Marimonda (sección About)
export const MARIMONDA_CARD = {
  emoji: '🎭',
  image: '/images/marimonda-hero.jpg',
  title: 'MARIMONDA',
  description:
    'Símbolo eterno del Carnaval. Su máscara icónica representa la libertad, la alegría y la rebeldía contra lo serio.',
};

// Hero section - imágenes flotantes (background)
export const HERO_FLOATING_IMAGES: { emoji: string; image?: string; position: string }[] = [
  { emoji: '🎭', image: '/images/hero/marimonda.png', position: 'top-1/4 left-10' },
  { emoji: '🎉', image: '/images/hero/confetti.png', position: 'top-1/3 right-20' },
  { emoji: '💃', image: '/images/hero/dancer.png', position: 'bottom-1/4 left-1/4' },
  { emoji: '🎶', image: '/images/hero/notes.png', position: 'top-2/3 right-1/3' },
];

// ============= EQUIPO: DIRECTORAS Y COREÓGRAFAS =============

export type TeamMemberType = 'director' | 'choreographer';

export interface TeamMember {
  id: string;
  type: TeamMemberType;
  name: string;
  role: string;
  image?: string;
  bio: string;
  yearsExperience: number;
  specialties: string[];
  achievements?: string[];
  origin: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  accentColor: 'yellow' | 'red' | 'green';
}

// Mantener alias para retrocompatibilidad
export type Choreographer = TeamMember;

export const TEAM_MEMBERS: TeamMember[] = [
  // ===== DIRECTORAS =====
  {
    id: 'mayra-rincon',
    type: 'director',
    name: 'Mayra Rincón',
    role: 'Directora & Co-Fundadora',
    image: '/images/coreografos/mayra-rincon.jpg',
    bio: 'Co-fundadora de Carnaval BA Utah, Mayra lidera la visión cultural de la academia desde 2022. Nacida en Barranquilla, lleva la pasión del Carnaval a todos los rincones de Utah.',
    yearsExperience: 15,
    specialties: ['Liderazgo Cultural', 'Producción de Eventos'],
    achievements: [
      'Co-Fundadora desde 2022',
      'Hispanic Day Parade NY 2024',
      'Embajadora Cultural Colombia-Utah',
    ],
    origin: 'Barranquilla, Colombia',
    socials: {
      instagram: 'https://instagram.com/carnavalbaq',
    },
    accentColor: 'yellow',
  },
  {
    id: 'marilyn-gallardo',
    type: 'director',
    name: 'Marilyn Gallardo',
    role: 'Directora & Co-Fundadora',
    image: '/images/coreografos/marilyn-gallardo.jpg',
    bio: 'Co-fundadora apasionada por la cultura afro-colombiana. Marilyn ha construido junto a Mayra una comunidad de más de 200 estudiantes en Utah.',
    yearsExperience: 12,
    specialties: ['Dirección Artística', 'Vinculación Comunitaria'],
    achievements: [
      'Co-Fundadora desde 2022',
      'Hispanic Day Parade NY 2024',
      'Líder Comunitaria Hispana Utah',
    ],
    origin: 'Barranquilla, Colombia',
    socials: {
      facebook: 'https://facebook.com/carnavaldebarranquillautah',
    },
    accentColor: 'red',
  },

  // ===== COREÓGRAFAS =====
  {
    id: 'karely-chaus',
    type: 'choreographer',
    name: 'Karely Chaus',
    role: 'Coreógrafa Principal',
    image: '/images/coreografos/karely-chaus.jpg',
    bio: 'Coreógrafa de gran talento y energía. Karely se especializa en crear coreografías que combinan tradición y modernidad para nuestras presentaciones.',
    yearsExperience: 10,
    specialties: ['Cumbia', 'Mapalé', 'Garabato', 'Champeta'],
    achievements: [
      'Coreógrafa Principal de la academia',
      'Creadora de coreografías oficiales',
    ],
    origin: 'Colombia',
    accentColor: 'green',
  },
  {
    id: 'adriana-fornaris',
    type: 'choreographer',
    name: 'Adriana Fornaris',
    role: 'Coreógrafa',
    image: '/images/coreografos/adriana-fornaris.jpg',
    bio: 'Coreógrafa con visión innovadora. Adriana aporta su experiencia y creatividad para enseñar las danzas tradicionales con técnica refinada.',
    yearsExperience: 8,
    specialties: ['Salsa', 'Bullerengue', 'Son de Negro', 'Urbano'],
    achievements: [
      'Coreógrafa de la academia',
      'Especialista en danzas afro-caribeñas',
    ],
    origin: 'Colombia',
    accentColor: 'yellow',
  },
];

// Aliases para retrocompatibilidad
export const CHOREOGRAPHERS: TeamMember[] = TEAM_MEMBERS;
export const DIRECTORS = TEAM_MEMBERS.filter((m) => m.type === 'director');
export const CHOREOGRAPHERS_ONLY = TEAM_MEMBERS.filter((m) => m.type === 'choreographer');
