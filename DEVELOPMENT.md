# Guía de Desarrollo

## Primeros Pasos

### Requisitos Previos
- Node.js 18+ o superior
- npm o yarn
- Git

### Instalación
```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd Mar

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
app/
├── page.tsx              # Página principal (/)
├── layout.tsx            # Layout global
├── globals.css           # Estilos globales
├── clases/               # Página de clases (/clases)
│   └── page.tsx
├── inscripcion/          # Formulario de inscripción (/inscripcion)
│   └── page.tsx
├── galeria/              # Galería de fotos/videos (/galeria)
│   └── page.tsx
├── blog/                 # Blog y noticias (/blog)
│   └── page.tsx
├── tienda/               # Tienda online (/tienda)
│   └── page.tsx
├── contacto/             # Página de contacto (/contacto)
│   └── page.tsx
└── not-found.tsx         # Página 404

components/
├── Header.tsx            # Navegación principal
├── Footer.tsx            # Pie de página
└── ClassCard.tsx         # Card reutilizable para clases

lib/
├── (Para agregar)        # Funciones de utilidad
└── (Para agregar)        # Servicios (Firebase, Stripe, etc.)

public/
└── (Para imágenes/iconos)

```

## Flujo de Desarrollo

### 1. Crear una Nueva Página
```bash
# 1. Crear el directorio
mkdir -p app/nueva-pagina

# 2. Crear page.tsx con estructura base
cat > app/nueva-pagina/page.tsx << 'EOF'
export default function NuevaPagina() {
  return (
    <>
      <section className="py-16">
        <div className="container-max">
          <h1 className="text-4xl font-display font-bold">Nueva Página</h1>
        </div>
      </section>
    </>
  );
}
EOF
```

### 2. Crear un Componente Reutilizable
```bash
# Crear archivo en components/
cat > components/NuevoComponente.tsx << 'EOF'
export default function NuevoComponente() {
  return (
    <div className="...">
      {/* contenido */}
    </div>
  );
}
EOF
```

### 3. Agregar Estilos Personalizados
- Usar clases de Tailwind CSS
- Si necesitas estilos personalizados, agregarlos en `app/globals.css`
- Respetar la paleta de colores del Carnaval

## Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar linter (ESLint)
npm run type-check   # Verificar tipos TypeScript
```

## Paleta de Colores

Utiliza las siguientes variables de color definidas en `tailwind.config.ts`:

```typescript
colors: {
  carnival: {
    gold: '#FFD700',      // Primario: Alegría
    red: '#DC143C',       // Secundario: Pasión
    blue: '#1E90FF',      // Terciario: Confianza
    green: '#228B22',     // Acento: Naturaleza
    pink: '#FF69B4',      // Acento: Energía
    darkBg: '#1A1A1A',    // Fondo oscuro
    lightBg: '#F5F5F5',   // Fondo claro
  }
}
```

Uso en JSX:
```jsx
<div className="bg-carnival-gold text-carnival-darkBg">
  Contenido
</div>
```

## Tipografía

```css
font-display  /* Playfair Display - Títulos */
font-body     /* Inter - Texto normal */
font-accent   /* Montserrat - Acentos */
```

Uso en JSX:
```jsx
<h1 className="font-display font-bold">Título</h1>
<p className="font-body">Párrafo normal</p>
<span className="font-accent font-bold">Énfasis</span>
```

## Componentes Predefinidos

### Botones

```jsx
// Botón primario (dorado)
<button className="btn-primary">Texto</button>

// Botón secundario (rojo)
<button className="btn-secondary">Texto</button>

// Botón outline
<button className="btn-outline">Texto</button>
```

### Contenedor

```jsx
<div className="container-max">
  {/* Contenido centrado con ancho máximo */}
</div>
```

### Efecto Cristal

```jsx
<div className="glass-effect">
  {/* Fondo semi-transparente con blur */}
</div>
```

## Integración de APIs Futuras

### Firebase (Firestore)
```typescript
// lib/firebase.ts (a crear)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // ... tu configuración
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Stripe
```typescript
// lib/stripe.ts (a crear)
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
```

## Buenas Prácticas

1. **Nombres de Archivos**: usar kebab-case para archivos/directorios
2. **Componentes**: usar PascalCase, preferir componentes funcionales
3. **Variables**: usar camelCase
4. **Clases CSS**: usar Tailwind, minimal CSS custom
5. **Comentarios**: Solo si el "por qué" no es obvio
6. **Componentes Cliente**: agregar `'use client'` al inicio

## Testing (Próximo)

```bash
# Instalar dependencias de testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Ejecutar tests
npm run test
```

## Performance

- Next.js Image Optimization: usa `<Image>` en lugar de `<img>`
- Code Splitting: automático con Next.js App Router
- Lazy Loading: `import dynamic from 'next/dynamic'`

## Troubleshooting

### Puerto 3000 en Uso
```bash
npm run dev -- -p 3001
```

### Limpiar Cache
```bash
rm -rf .next
npm run dev
```

### Actualizar Dependencias
```bash
npm update
```

## Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Soporte

Para preguntas o problemas, abre un issue en el repositorio.
