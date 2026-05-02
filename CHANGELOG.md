# 📜 Historial de Cambios - Carnaval BA Utah Website

Este documento registra **todos los cambios positivos** del sitio.
Se actualiza automáticamente cada vez que mejoramos algo.

---

## 📤 Cómo cargar imágenes para reemplazar emojis

### 🎯 Forma rápida (recomendada): Súbelas en el chat
Adjunta las imágenes directamente en nuestra conversación. Yo:
1. Las descargo
2. Las renombro con los nombres correctos
3. Las subo a la carpeta correspondiente
4. Hago commit + push automáticamente

### 📁 Carpeta destino para las siluetas del Hero
Las imágenes flotantes del background del homepage van en:

```
public/images/hero/
├── floating-1.png   → Esquina superior izquierda (reemplaza 🎭)
├── floating-2.png   → Esquina superior derecha (reemplaza 🎉)
├── floating-3.png   → Centro inferior izquierda (reemplaza 💃)
└── floating-4.png   → Centro derecha (reemplaza 🎶)
```

### 📐 Especificaciones técnicas

| Detalle | Recomendación |
|---------|---------------|
| **Formato** | PNG con fondo transparente |
| **Tamaño** | 400x400 px o más |
| **Peso** | < 200 KB (comprime en https://tinypng.com) |
| **Estilo** | Siluetas negras o coloridas del Carnaval |

### 🎨 Sugerencias de imágenes

- Silueta de Marimonda con su máscara
- Silueta de bailarina en pose
- Tambores tradicionales
- Notas musicales con motivo carnavalesco
- Máscaras del Carnaval

### 💡 Si no subes alguna imagen
**El sitio NO se rompe.** Automáticamente usa el emoji por defecto (🎭, 🎉, 💃, 🎶).

### 📁 Otras carpetas para imágenes futuras

- `/public/images/about/` → Card de Marimonda
- `/public/images/dances/` → Imágenes de cada danza (Cumbia, Mapalé, etc.)
- `/public/images/coreografos/` → Fotos del equipo
- `/public/images/galeria/` → Eventos pasados
- `/public/images/blog/` → Artículos

> 📚 Ver `public/images/README.md` para la guía completa.

---

## 🚀 Historial de Mejoras

### 2026-05-02 - 📸 Sistema inteligente de imágenes
- ✅ Estructura organizada de carpetas en `/public/images/`
- ✅ Componente `<SmartImage />` con fallback automático a emojis
- ✅ Configuración central en `lib/site-images.ts`
- ✅ READMEs en cada carpeta con instrucciones claras
- ✅ Hero del homepage usa imágenes flotantes con fallback a emojis
- ✅ Card de Marimonda usa imagen real con fallback

### 2026-05-02 - 🌐 Sitio Bilingüe (Español + Inglés)
- ✅ Soporte completo con **next-intl**
- ✅ Auto-detección del idioma del navegador
- ✅ URLs SEO friendly: `/clases` (ES) y `/en/classes` (EN)
- ✅ Selector elegante con bandera 🇨🇴/🇺🇸 en el header
- ✅ Traducciones completas: header, footer, homepage, equipo, clases
- ✅ Sitemap.xml con `hreflang` alternates
- ✅ JSON-LD Schema en ambos idiomas

### 2026-05-02 - 👥 Reorganización del equipo
- ✅ **Mayra Rincón** y **Marilyn Gallardo** ahora son **DIRECTORAS**
- ✅ **Karely Chaus** y **Adriana Fornaris** agregadas como **COREÓGRAFAS**
- ✅ Sección dividida: "Nuestras Directoras" + "Nuestras Coreógrafas"
- ✅ Cards con badges diferenciados (⭐ Directora / 🎬 Coreógrafa)

### 2026-05-02 - 🎭 9 Danzas en el sitio
- ✅ Cumbia, Mapalé, Garabato (las principales)
- ✅ Champeta, Salsa, Son de Negro, Bullerengue, Urbano, Marimondas (nuevas)
- ✅ Marquee ticker actualizado con todas
- ✅ 7 nuevas clases agregadas a horarios
- ✅ SEO actualizado con keywords de todas las danzas

### 2026-05-02 - 🚀 SEO Profesional Implementado
- ✅ Metadata completa con Open Graph y Twitter Cards
- ✅ JSON-LD Schema (LocalBusiness + DanceSchool)
- ✅ Sitemap.xml dinámico
- ✅ Robots.txt configurado
- ✅ Manifest.json para PWA
- ✅ Coordenadas GPS de West Valley City Utah
- ✅ Open Graph para WhatsApp/Facebook
- ✅ Schema en ambos idiomas (ES + EN)

### 2026-05-02 - 🎨 Diseño PRO completo
- ✅ Hero épico con tipografía masiva (Bebas Neue)
- ✅ Texto con gradiente animado
- ✅ Cursor personalizado con glow
- ✅ Mesh gradients (estilo Linear/Stripe)
- ✅ Layout asimétrico tipo Apple/Bento
- ✅ Glassmorphism y noise texture
- ✅ 30+ animaciones CSS personalizadas
- ✅ Marquee ticker estilo magazine
- ✅ Header sticky con glass effect

### 2026-05-02 - 🇨🇴 Paleta de colores oficial
- ✅ Amarillo Barranquilla (#FFC600)
- ✅ Rojo Barranquilla (#E31E24)
- ✅ Verde vibrante (#228B22) - reemplazó al azul

### 2026-05-02 - 🎉 Inicio del proyecto
- ✅ Next.js 15 con App Router
- ✅ TypeScript + Tailwind CSS
- ✅ Páginas: Home, Clases, Galería, Blog, Tienda, Contacto, Inscripción
- ✅ Componentes: Header, Footer, ClassCard, GalleryGrid
- ✅ Deploy en Vercel

---

## 🔮 Próximas mejoras pendientes

### En desarrollo
- [ ] 📤 Subir imágenes reales reemplazando los emojis
- [ ] 🔐 Panel de Admin (Etapa 2)
- [ ] 📸 Integración con Cloudinary para gestión de fotos
- [ ] 🔥 Firebase para autenticación de admins

### Futuro
- [ ] 🌐 Dominio personalizado
- [ ] 📊 Google Search Console + Analytics
- [ ] 💳 Stripe para pagos en la tienda
- [ ] 📧 Sistema de emails (SendGrid/Resend)

---

> 📝 Este changelog se mantiene actualizado con cada cambio importante.
> Última actualización: **2026-05-02**
