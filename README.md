# Carnaval de Barranquilla en Utah - Página Web

Página web profesional y moderna para la academia de danza "Carnaval de Barranquilla en Utah", dedicada a preservar y promover las tradiciones del Carnaval de Barranquilla colombiano.

## 🎉 Características

- **Página Principal** - Hero section con información destacada
- **Gestión de Clases** - Horarios, niveles, instructores
- **Sistema de Inscripción** - Formulario interactivo para nuevos estudiantes
- **Galería Multimedia** - Fotos y videos de actuaciones
- **Blog** - Noticias y artículos sobre el Carnaval
- **Tienda Online** - Venta de trajes, accesorios y entradas
- **Panel de Administración** - Gestión completa del contenido
- **Responsive Design** - Optimizado para móviles y desktop

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15+ (React 19)
- **Styling**: Tailwind CSS
- **Base de Datos**: Firebase Firestore
- **Autenticación**: NextAuth.js
- **Pagos**: Stripe
- **Email**: SendGrid / Resend
- **Hosting**: Vercel

## 📦 Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd Mar

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

## 🚀 Estructura del Proyecto

```
/home/user/Mar/
├── app/                 # App Router de Next.js
│   ├── page.tsx         # Página principal
│   ├── layout.tsx       # Layout global
│   ├── globals.css      # Estilos globales
│   ├── clases/          # Página de clases
│   ├── galeria/         # Galería multimedia
│   ├── blog/            # Blog y noticias
│   ├── tienda/          # Tienda online
│   ├── inscripcion/     # Inscripción
│   ├── contacto/        # Contacto
│   └── admin/           # Panel de administración
├── components/          # Componentes reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                 # Utilidades y servicios
│   ├── firebase.ts
│   ├── stripe.ts
│   └── api.ts
├── public/              # Archivos estáticos
├── package.json
├── tailwind.config.ts   # Configuración Tailwind
├── next.config.js       # Configuración Next.js
└── tsconfig.json        # Configuración TypeScript
```

## 🎨 Paleta de Colores

- **Primario**: Dorado (#FFD700) - Alegría y energía
- **Secundario**: Rojo (#DC143C) - Pasión y movimiento
- **Terciario**: Azul (#1E90FF) - Confianza y profesionalismo
- **Acentos**: Verde (#228B22), Rosa (#FF69B4)

## 📝 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar linter
npm run type-check   # Verificar tipos TypeScript
```

## 🔧 Configuración Requerida

1. **Firebase**: Crear proyecto y obtener credenciales
2. **Stripe**: Configurar cuenta y llaves API
3. **Email**: Configurar SendGrid o Resend
4. **NextAuth**: Generar NEXTAUTH_SECRET

## 📱 Funcionalidades Planeadas

- [x] Estructura inicial del proyecto
- [x] Header y Footer
- [x] Página principal
- [ ] Página de clases
- [ ] Sistema de inscripción
- [ ] Galería multimedia
- [ ] Blog y noticias
- [ ] Tienda online
- [ ] Panel de administración
- [ ] Integración de pagos
- [ ] Email de confirmación
- [ ] Analytics

## 🌐 Despliegue

El proyecto está configurado para ser desplegado en **Vercel**:

```bash
npm run build
vercel deploy
```

## 📄 Licencia

GNU General Public License v3.0

## 👥 Autores

- Mayra Rincon
- Marilyn Gallardo

## 📧 Contacto

- **Email**: info@carnavalba.com
- **Instagram**: [@carnavalbaq](https://instagram.com/carnavalbaq)
- **Facebook**: [Carnaval de Barranquilla en Utah](https://facebook.com/carnavaldebarranquillautah)
- **Ubicación**: West Valley City, Utah

---

**Última actualización**: Mayo 2026
