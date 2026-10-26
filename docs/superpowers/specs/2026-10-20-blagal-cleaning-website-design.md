# blagalcleaning.com: documento de diseño (Fase 1)

- **Fecha:** 2026-10-20
- **Estado:** aprobado. El dueño aprobó las Partes 1 a 5 en conversación y aceptó el documento el 2026-10-26, al pedir avanzar al diseño de páginas. Incluye las correcciones técnicas del 2026-10-26 (sección 17).
- **Proyecto:** sitio web de Blagal Cleaning en `blagalcleaning.com`
- **Aprobaciones:** Partes 1 a 5 aprobadas en conversación. Este documento las consolida.
- **Ubicación temporal:** este archivo vive en `Marlonia/Mar` porque el repositorio del sitio todavía no existe. Se mueve al repositorio nuevo cuando se cree.

---

## 1. Resumen

**Objetivo.** Un sitio donde property managers y equipos de construcción encuentren todos los servicios de limpieza de Blagal en un solo lugar y pidan una cotización sin fricción.

**Éxito de la Fase 1.** Un cliente puede pedir cotización para una o varias propiedades, o para un proyecto de construcción. La solicitud queda guardada con un número de referencia y llega al Gmail del negocio. Si algo falla, se puede recuperar.

**Públicos.**
- **Property management:** administradores de propiedades, apartamentos, HOAs y edificios comerciales.
- **Construction teams:** superintendentes de obra, construction managers y contratistas generales.

**Hechos del negocio.**
- Blagal hace todos los trabajos con su propio equipo. El sitio presenta una sola empresa.
- Hoy las solicitudes se manejan por correo, WhatsApp y papel, sin software de gestión.
- Cobertura: Salt Lake County y los condados que limitan con él: Davis, Utah, Tooele, Summit, Wasatch y Morgan.
- Correo del negocio: `blagalcleaning@gmail.com`.

**Servicios** (orden comercial, usado en todo el sitio):
1. Post-Construction Cleaning
2. Turnover / Move-out Cleaning
3. Window Cleaning
4. Pressure Washing
5. Gutter Cleaning
6. Common Area Cleaning (recurrente)
7. House Cleaning

**Dentro de la Fase 1:** sitio público bilingüe, formulario de cotización, panel privado de solicitudes, correos, alertas, respaldos, pruebas y lanzamiento.

**Fuera de la Fase 1:** ver la sección 12.

---

## 2. Enfoque elegido

**Astro + Cloudflare.** Se descartaron dos alternativas:

| Opción | Por qué no |
|---|---|
| Next.js, como los sitios anteriores | Es más pesado para un sitio de marketing y más complejo de publicar en Cloudflare. |
| Constructor visual (Framer, Webflow, Wix) | Cuesta $20–50 al mes, limita el formulario de varias propiedades y el código no queda en GitHub. |

**Razones de Astro + Cloudflare:**
- Páginas estáticas muy rápidas, lo que favorece el SEO local.
- Todo vive en la cuenta Cloudflare de Rootbiz.
- Costo mensual de ~$0.

---

## 3. Páginas y contenido (Parte 1)

### 3.1 Idiomas y rutas

- **Inglés** es el idioma principal, en `/`. **Español** es una versión completa en `/es/`.
- Ambas versiones usan las mismas rutas en inglés; por ejemplo `/services/window-cleaning/` y `/es/services/window-cleaning/`.
- El selector **EN / ES** lleva a la página equivalente.
- Navegación, contenido, formulario, errores y confirmaciones están completos en los dos idiomas.

### 3.2 Mensaje principal

> "Cleaning Services for Property Managers & Construction Teams in Utah"

El texto final se ajusta a los servicios y la cobertura que confirme el dueño.

### 3.3 Páginas (18 por idioma)

| Página | Ruta | Contenido y objetivo |
|---|---|---|
| Home | `/` | Qué hace Blagal, para quién y dónde. Servicios, evidencia de trabajos y dos accesos con el mismo peso: Property Management y Construction Teams. Botón principal: Request a Quote. |
| Services | `/services/` | Los servicios confirmados, indicando cuáles aplican a propiedades y cuáles a construcción. |
| 7 páginas de servicio | `/services/post-construction-cleaning/`, `/services/turnover-cleaning/`, `/services/window-cleaning/`, `/services/pressure-washing/`, `/services/gutter-cleaning/`, `/services/common-area-cleaning/`, `/services/house-cleaning/` | Qué incluye, exclusiones, tipos de propiedad o proyecto, modalidades, factores que afectan la cotización y preguntas frecuentes. |
| For Property Managers | `/property-managers/` | Atención de propiedades, servicios recurrentes, coordinación de varias ubicaciones, y condiciones reales de comunicación, facturación y seguimiento. |
| For Construction Teams | `/construction/` | Servicios para obras, etapas atendidas, coordinación con el responsable del proyecto, programación, revisión del trabajo y documentación disponible. |
| Service Areas | `/service-areas/` | Condados y ciudades atendidos, con cualquier condición de cobertura o desplazamiento. |
| Request a Quote | `/quote/` | Formulario (sección 4). |
| About | `/about/` | Quién está detrás de Blagal, su forma de trabajar y experiencia verificable. |
| Contact | `/contact/` | Teléfono, correo, horarios y WhatsApp si está habilitado. |
| Privacy | `/privacy/` | Qué datos se piden, para qué, cuánto se guardan y cómo pedir su borrado. |
| Thank You | `/thank-you/` | Confirmación de solicitud con número de referencia. No se indexa. |
| 404 | (automática) | Ayuda cuando una página no existe. |

- **Menú:** Services · For Property Managers · For Construction Teams · Service Areas · About · Contact.
- **Botón destacado:** Request a Quote.
- **Páginas locales:** al inicio hay una sola página general de cobertura. Las páginas de condado o ciudad se agregan solo si aportan información específica. **No se crean las 49 combinaciones de servicio y condado.**

### 3.4 Contenido que el dueño debe confirmar antes de publicar

- Nombres, alcance y exclusiones de los servicios.
- Cobertura geográfica y disponibilidad.
- Servicios y etapas de construcción que se ofrecen.
- Seguro, licencias y documentación disponible.
- Experiencia, teléfono, correo y WhatsApp.
- Compromisos de respuesta, facturación, reportes y atención recurrente.
- Fotos propias y testimonios con autorización.
- Si "House Cleaning" se refiere a casas en alquiler. En ese caso conviene llamarlo "Single-Family Rental Cleaning", lo que cambiaría también el nombre del servicio 7 y su ruta.

**Reglas de contenido:**
- Cada dato pendiente se marca en el contenido con `[[CONFIRM: ...]]`.
- Las fotos pendientes usan un marco "foto pendiente" y nunca se presentan como trabajos de Blagal.
- Las imágenes de muestra solo se usan durante el diseño.
- Ninguna promesa de rapidez, disponibilidad o resultado se publica si no está confirmada.

**Comprobación automática** (sección 9.1): mientras el sitio esté privado, solo informa de marcadores pendientes. Desde el lanzamiento, **bloquea la publicación** si queda alguno.

---

## 4. Formulario de cotización (Parte 2)

### 4.1 Recorrido

**Tipo de solicitud → Propiedades o Proyecto → Contacto → Revisión y envío.**

### 4.2 Paso 1: Tipo de solicitud

- Dos tarjetas: **Property Cleaning** y **Construction Cleaning**.
- Si el cliente llega desde `/property-managers/` o `/construction/` (por ejemplo `/quote/?type=construction`), la tarjeta viene marcada, visible y **editable**.

### 4.3 Paso 2A: Propiedades (una o varias)

Por cada propiedad:

| Campo | Obligatorio |
|---|---|
| Ciudad o código postal | Sí (para evaluar cobertura) |
| Dirección | No |
| Tipo: apartamentos, HOA/condo, comercial/oficinas, casa/townhome, otro | No |
| Tamaño: unidades o sq ft | No |
| Servicios, incluida la opción **"Not sure / need guidance"** | Sí (al menos uno) |
| Frecuencia **por servicio**: una vez, semanal, quincenal, mensual, trimestral, según necesidad, **"Not sure"** | No |
| Notas | No |

- Botones **"Add another property"** y **"Copy services from previous property"**.
- Máximo 20 propiedades por solicitud.

### 4.4 Paso 2B: Proyecto de construcción

| Campo | Obligatorio |
|---|---|
| Ciudad o código postal de la obra | Sí |
| Dirección de la obra | No |
| Nombre del proyecto | No |
| Tipo: residencial, multifamiliar, comercial, remodelación/TI | No |
| Tamaño aproximado: sq ft, unidades, pisos | No |
| **Etapas de limpieza** (solo las confirmadas): Rough cleaning, Final cleaning, Touch-up cleaning, **"Not sure"** | Sí: al menos una etapa, un servicio adicional o "Not sure" |
| **Servicios adicionales** (solo los confirmados): Window Cleaning, Pressure Washing (limpieza exterior), otros | No |
| **Fecha**, preguntada una sola vez, con un campo para aclarar fechas por etapa | No |
| Requisitos de acceso o seguridad (badge, PPE) | No |
| Notas | No |

**Textos obligatorios:**
- Blagal **solo hace limpieza**. Se evita "punch" en el sentido de reparar pendientes de obra.
- La fecha pedida **no es una reserva confirmada**.

### 4.5 Paso 3: Contacto

| Campo | Obligatorio |
|---|---|
| Nombre | Sí |
| Correo | Sí |
| Medio preferido: email, llamada, texto, WhatsApp | Sí (email por defecto) |
| Teléfono | **Solo si el medio preferido es llamada, texto o WhatsApp** |
| Empresa | No |
| Cargo, lista cerrada según el camino:<br>• **Propiedades:** Property Manager, Building Superintendent, HOA Board Member, Property Owner, Other<br>• **Construcción:** Site Superintendent, Construction / Project Manager, General Contractor, Other | No |

### 4.6 Paso 4: Revisión y envío

- Resumen editable de todo lo ingresado.
- Aceptación de la política de privacidad.
- **Turnstile en modo administrado**, ubicado en este paso.
- Botón de envío.

### 4.7 Validación

- Un solo esquema **Zod** compartido entre el navegador y el servidor.
- Los errores aparecen junto a cada campo, en el idioma del cliente.
- Lo escrito nunca se borra por un error.

### 4.8 Procesamiento del envío

1. Al abrir el formulario se genera un `submission_id` (UUID), que sirve de clave anti-duplicados.
2. El servidor verifica **Turnstile**:
   - Los tokens duran 5 minutos y son de un solo uso.
   - Si el token caduca o se usó en un intento fallido, el navegador lo renueva antes de reenviar.
3. Se revisa el **campo trampa** (honeypot) y el **límite por IP**, que tiene dos capas:
   - **Ráfagas:** el Rate Limiting binding de Workers permite 3 envíos cada 60 segundos. El binding solo admite periodos de 10 o 60 segundos y su conteo es aproximado.
   - **Por hora:** un contador en D1 permite 10 envíos por hora. Es generoso para no bloquear oficinas que comparten conexión.
4. Se validan los datos con Zod.
5. **Guardado atómico:** en un solo lote de D1 se guardan la solicitud y sus **dos avisos pendientes** (aviso al negocio y confirmación al cliente). O se guarda todo o no se guarda nada.
6. Si el `submission_id` ya existe, se devuelve **la misma referencia** sin crear nada nuevo.
7. Se asigna una **referencia** corta, por ejemplo `BLG-7K3Q2`: 5 caracteres en mayúsculas y números, sin caracteres ambiguos como 0/O o 1/I.
8. Se intenta enviar los dos avisos de inmediato, en segundo plano.
9. El cliente ve la página **Thank You** con su referencia.

### 4.9 Regla de éxito

| Situación | Comportamiento |
|---|---|
| Se guarda y los correos se envían | Confirmar recepción con la referencia. |
| Se guarda, pero falla algún correo | Confirmar recepción. El correo queda pendiente de reintento automático. |
| No se puede guardar | Conservar los datos, permitir reintentar y mostrar llamada o WhatsApp. **No confirmar recepción.** |

### 4.10 Correos

- **Remitente:** `quotes@blagalcleaning.com`, enviado por Resend con el dominio verificado.
- **Aviso al negocio:**
  - Se envía a `blagalcleaning@gmail.com`.
  - Al responder, la respuesta le llega al cliente (`Reply-To` = correo del cliente).
  - Asunto de ejemplo: `New quote · Construction · ACME Builders · Lehi · BLG-7K3Q2`.
- **Confirmación al cliente:**
  - Va en su idioma.
  - Al responder, la respuesta llega al Gmail del negocio, por ejemplo para enviar fotos o planos.
  - El texto dice "recibimos tu solicitud" e incluye la referencia y el resumen.
  - **No promete** precio, disponibilidad ni contratación.
- El contenido de cada correo se arma solo con datos guardados, así que cada reintento manda exactamente lo mismo. Esto es necesario porque Resend rechaza una clave reutilizada con contenido distinto.

### 4.11 Estados de los avisos y reintentos

Cada aviso tiene estado propio, independiente del otro:

`pending` → `sending` → `accepted` → `delivered` | `bounced` | `complained`; o bien `needs_attention`.

- **`sending`** tiene un plazo de 2 minutos. Si vence sin resultado (el proceso se interrumpió), el aviso vuelve a intentarse.
- **Clave anti-duplicados de Resend** = id del aviso. Si Resend aceptó un correo pero la respuesta no llegó (tiempo de espera de 10 segundos), el reintento con la misma clave no genera otro correo.
- **Reintentos** después de cada fallo: a los 1, 5, 15, 30, 60, 120, 240 y 480 minutos.
  - Son **1 envío inmediato + 8 reintentos (9 intentos)** en unas 16 horas, siempre **dentro de las 24 horas** que Resend guarda las claves.
  - Una tarea programada cada 5 minutos procesa los avisos vencidos, así que cada reintento ocurre en ese momento o un poco después.
- Después del último intento, el aviso pasa a **`needs_attention`** y se envía una alerta (sección 10.2). **Nunca se reenvía solo** después de 24 horas.
- **Webhooks de Resend** en `/api/webhooks/resend`:
  - Se verifica la firma de cada llamada.
  - Actualizan los estados `accepted`, `delivered`, `bounced` y `complained`.
  - `delivery_delayed` no cambia el estado: se guarda como marca "entrega demorada" que se ve en el panel.
  - `email.failed` pasa el aviso a `needs_attention` y envía una alerta.
- "Aceptado para envío" y "entregado al servidor del destinatario" son estados distintos. **Ninguno garantiza que el correo llegue a la bandeja principal.**

### 4.12 Fuera de la versión 1

- Subida de fotos o planos. La confirmación invita a enviarlos respondiendo el correo o por WhatsApp.
- Avisos automáticos por WhatsApp.

---

## 5. Panel privado `/admin`

El panel está **en español**, el idioma del dueño.

**Lista de solicitudes** con:
- referencia y fecha
- cliente y tipo de solicitud
- detalles completos
- estado de cada aviso
- marca de prueba

Filtros: tipo, estado de avisos y pruebas.

**Acciones** (las únicas rutas que modifican datos):
- **Reintentar aviso:** solo para avisos en `needs_attention`. Si pasaron menos de 24 horas desde el primer intento, reutiliza la misma clave, así que no puede duplicar un correo ya aceptado. Si pasaron más de 24 horas, usa una clave nueva y el panel advierte que se revise antes si el aviso tiene un id de Resend. Cada reintento queda registrado.
- **Marcar como prueba:** excluye la solicitud de los conteos.

**Protección** (todas las capas son obligatorias):
1. **Cloudflare Access** protege `blagalcleaning.com/admin*` y `blagalcleaning.com/api/admin*`. Política: permitir **solo** el correo exacto `blagalcleaning@gmail.com`; inicio de sesión con código por correo.
2. **El Worker verifica en cada solicitud** el token de Access (`Cf-Access-Jwt-Assertion`):
   - la firma, con las claves públicas del equipo
   - la audiencia (AUD)
   - el vencimiento
   - que el correo sea `blagalcleaning@gmail.com`
3. **Se desactivan** la dirección `workers.dev` y las direcciones de vista previa del Worker.
4. Las páginas del panel llevan `noindex` y no aparecen en el sitemap.

---

## 6. Identidad visual (Parte 3)

**Personalidad:** organización, cuidado y capacidad para coordinar propiedades y obras.

### 6.1 Colores

| Token | Valor | Uso |
|---|---|---|
| Marino | `#0F2A3D` | Títulos, encabezados, marca |
| Azul | `#1D6AA5` | Enlaces, detalles, foco sobre fondos claros |
| Ámbar | `#F2A900` | Cotización y pequeños acentos de marca |
| Blanco | `#FFFFFF` | Fondo principal |
| Blanco frío | `#F6FAFC` | Secciones alternas |
| Gris texto | `#56636F` | Textos secundarios |
| Línea | `#D6E4EE` | Bordes y divisores |
| Azul claro | `#9CC8E8` | Foco y detalles sobre marino |

### 6.2 Reglas

- **Una sola acción principal: Request a Quote.** El botón ámbar (texto marino) puede repetirse si lleva a cotizar. Ninguna otra acción usa ámbar.
- **Ámbar reservado para cotización y pequeños acentos de marca**, como la línea del favicon o detalles sobre marino. **Nunca** como texto, ícono o línea fina sobre fondos claros (2.0:1).
- **Acciones secundarias:** botón con borde marino. Sobre fondo marino, el borde es blanco.
- **Foco con teclado:**
  - Azul `#1D6AA5` sobre fondos claros (5.7:1). Azul claro `#9CC8E8` sobre marino (8.3:1).
  - Nunca azul sobre marino (2.6:1).
  - El foco va **separado** del botón (`outline-offset`); pegado al ámbar daría solo 2.9:1.
  - Medidas: contorno de 3 px con 3 px de separación.
- **Bordes de controles:** campos, casillas y tarjetas seleccionables usan gris `#56636F` (6.2:1) o marino. El token Línea `#D6E4EE` (1.3:1) queda **solo para divisores decorativos**, porque no cumple el contraste de 3:1 que exige WCAG 1.4.11 para identificar controles.

**Contrastes verificados:**

| Combinación | Contraste |
|---|---|
| Marino sobre blanco | 14.8:1 |
| Marino sobre blanco frío | 14.1:1 |
| Azul sobre blanco | 5.7:1 |
| Azul sobre blanco frío | 5.5:1 |
| Marino sobre ámbar | 7.4:1 |
| Gris sobre blanco frío | 5.9:1 |

### 6.3 Tipografía

- **Archivo** para títulos, en ancho normal o apenas expandido (alrededor de 104%, con el eje `wdth` de la versión variable).
- **Logo provisional:** Archivo 800, ancho ~108%, en mayúsculas. Es una excepción a la regla de mayúsculas.
- **Public Sans** para textos.
- Mayúsculas y minúsculas normales. Las mayúsculas completas solo en etiquetas cortas.
- Las fuentes se alojan en el propio sitio, sin depender de Google Fonts.

### 6.4 Logo provisional

- La palabra **BLAGAL CLEANING**, escrita siempre con la misma tipografía.
- **Favicon:** una "B" blanca en un cuadrado marino con una línea ámbar.
- El símbolo definitivo se integra después.

### 6.5 Formas, fotografía y tono

- **Formas:** bloques ordenados, líneas limpias y esquinas ligeramente redondeadas (8 px).
- **Fotografía:** trabajos, edificios, equipos y detalles reales, tanto de propiedades como de obras.
  - **Foto principal del Home:** un edificio multifamiliar recién terminado con el equipo trabajando. Alternativa: una composición de dos fotos.
- **Tono:** directo y concreto. Explica qué hacemos, qué incluye el servicio y cómo coordinamos.

### 6.6 Home

**Escritorio:**
- Titular, texto y botones (Request a Quote + View Services) juntos a la izquierda, con la foto principal a la derecha.
- Debajo, "Who we work with" con dos tarjetas del mismo peso. Cada una tiene foto y un enlace visible con flecha.
- Después, los servicios en orden comercial y una franja marina con los 7 condados.

**Móvil:**
- Titular, botón, foto y luego las dos tarjetas con miniatura y enlace visible.
- Las tarjetas se pueden tocar completas.
- El selector EN / ES está visible.

Referencia visual: `Blagal-Cleaning-Identidad-Final.pdf` (versión revisada con los 6 ajustes).

---

## 7. Arquitectura técnica

### 7.1 Componentes

| Pieza | Tecnología |
|---|---|
| Sitio | **Astro 6** con `@astrojs/cloudflare`. Las páginas se generan estáticas y el Worker atiende solo las rutas dinámicas. |
| Estilos | **Tailwind CSS v4** con los tokens de la sección 6 |
| Interacción del formulario | **Alpine.js**: pasos, agregar y copiar propiedades, teléfono condicional |
| Validación | **Zod**, el mismo esquema en el navegador y en el servidor |
| Formulario → servidor | **Astro Actions** |
| Idiomas | Rutas i18n de Astro, más diccionarios EN/ES |
| SEO | `@astrojs/sitemap`, `hreflang` EN/ES + `x-default`, `canonical`, datos estructurados con `schema-dts` (`LocalBusiness`, `Service`, `areaServed` con los 7 condados) |
| Íconos | Lucide |
| Imágenes | Optimización de Astro: formatos modernos, tamaños exactos, carga diferida debajo del pliegue |

### 7.2 Rutas dinámicas y tareas del Worker

| Ruta o tarea | Función |
|---|---|
| Acción `quote.submit` | Procesa el envío (sección 4.8) |
| `GET /api/admin/quotes`, `GET /api/admin/quotes/:id` | Datos del panel (protegidos) |
| `POST /api/admin/notices/:id/retry`, `POST /api/admin/quotes/:id/test` | Acciones del panel (protegidas) |
| `POST /api/webhooks/resend` | Estados de entrega (firma verificada) |
| `GET /api/health` | Comprueba D1 y responde 200 o 503 |
| Tarea cada 5 minutos | Reintentos (4.11) y revisión de alertas (10.2) |
| Tarea semanal (domingo 03:00, hora de Utah) | Respaldo a R2 (sección 11.2) |

Las tareas programadas se agregan con un punto de entrada personalizado del Worker, que el adaptador de Astro admite.

### 7.3 Módulos

Cada módulo tiene una sola responsabilidad y se prueba por separado:

| Módulo | Responsabilidad |
|---|---|
| `content/` | Textos EN/ES y datos de servicios y condados |
| `quote/schema` | Esquema Zod compartido |
| `quote/service` | Guardado atómico, anti-duplicados y referencia |
| `notify/` | Armado de correos, cliente de Resend y estados de los avisos |
| `notify/webhook` | Verificación de firma y actualización de estados |
| `admin/auth` | Verificación del token de Access |
| `admin/api` | Consultas y acciones del panel |
| `alerts/` | Alertas por correo con límite de frecuencia |
| `backup/` | Exportación semanal a R2 |

### 7.4 Datos (D1)

**`quote_requests`**

| Columna | Descripción |
|---|---|
| `id` | UUID |
| `reference` | Única |
| `submission_id` | Único |
| `created_at` | Fecha de recepción |
| `request_type` | `property` o `construction` |
| `locale` | `en` o `es` |
| Datos de contacto | `name`, `email`, `phone`, `company`, `role`, `preferred_contact` |
| `details_json` | Propiedades o proyecto |
| `is_test` | Marca de prueba |

**`notices`**

| Columna | Descripción |
|---|---|
| `id` | También es la clave anti-duplicados |
| `quote_id` | Solicitud a la que pertenece |
| `kind` | `business` o `confirmation` |
| `status` | Estado (sección 4.11) |
| `attempts` | Número de intentos |
| `next_attempt_at` | Próximo reintento |
| `lease_until` | Plazo del estado `sending` |
| `provider_message_id` | Id del correo en Resend |
| `last_error` | Último error |
| `updated_at` | Última actualización |

**`alert_state`** guarda la fecha del último envío de cada tipo de alerta, para limitar la frecuencia.

**Regla de cambios en la base de datos:** solo se agregan tablas o columnas. Borrar o renombrar se hace en una entrega posterior, cuando ninguna versión desplegada lo usa. Así, cualquier versión anterior funciona con la estructura actual (sección 11.1).

**`rate_counters`** guarda el contador por hora del límite de envíos.
- La IP **nunca se guarda tal cual**: se guarda un HMAC-SHA256 calculado con un secreto que rota cada día. Un hash simple no basta, porque con fuerza bruta se puede recuperar la IP.
- Cada contador se borra después de 1 hora.
- Se menciona en la página Privacy.

### 7.5 Configuración

| Tipo | Elementos |
|---|---|
| Bindings | `DB` (D1), `BACKUPS` (R2), `RATE_LIMITER`, `ALERT_EMAIL` (`send_email`) |
| Variables | `TURNSTILE_SITE_KEY`, `ACCESS_TEAM_DOMAIN`, `ACCESS_AUD`, `ADMIN_EMAIL`, `PUBLIC_LAUNCHED` |
| Secretos | `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`, `TURNSTILE_SECRET_KEY`, `RATE_LIMIT_SECRET` (base del HMAC diario de la IP) |

Los secretos se guardan cifrados en Cloudflare y en GitHub, y **nunca** en el repositorio. Para desarrollo local se usa `.dev.vars`, que está excluido de git.

### 7.6 Seguridad del sitio

- HTTPS obligatorio con HSTS.
- Encabezados: `Content-Security-Policy` (que permita Turnstile y Cloudflare Web Analytics), `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`.
- Sin cookies propias. Solo las de Turnstile y Access en `/admin`. Las estadísticas no usan cookies.

---

## 8. Dominio, cuentas y publicación (Parte 4)

### 8.1 Dominio

- `blagalcleaning.com` ya está **registrado en Cloudflare** y en la **cuenta Rootbiz**. No hay que cambiar nameservers, transferir desde GoDaddy ni mover entre cuentas.
- **Antes de construir:** inventario de los registros DNS existentes, para no romper nada.
- Se activa **DNSSEC**.
- `blagalcleaning.com` es la dirección principal. `www` redirige con 301.

### 8.2 Correo del dominio

- **Resend:** se verifica el dominio. Los registros SPF y DKIM los indica Resend al agregar el dominio.
- **Cloudflare Email Routing** (gratis):
  - Reenvía `quotes@blagalcleaning.com` a `blagalcleaning@gmail.com`.
  - Habilita el `send_email` binding para alertas a esa dirección verificada, **independiente de Resend**. Las alertas salen desde `alerts@blagalcleaning.com`.
- La página de contacto muestra `blagalcleaning@gmail.com`.

### 8.3 Repositorio y publicación

- **Repositorio privado nuevo:** `Marlonia/blagal-cleaning`.
- **Solo GitHub Actions publica**, y solo cuando pasan **todas** las revisiones de la sección 9.1. El trabajo de publicación depende de esas revisiones.
- El **token de publicación** de Cloudflare vive **solo** en los secretos de GitHub. **No se conecta Workers Builds** ni se publica desde una computadora.
- Es distinto del **token de aprovisionamiento** opcional de la sección 13. Ese token tiene permisos mínimos y vencimiento, vive en el entorno de Claude y se revoca al terminar la configuración. Nunca sirve para publicar.
- GitHub gratis no ofrece ramas protegidas en repositorios privados. Por eso puede quedar en `main` un cambio con revisiones fallidas, pero **no se publica**; la siguiente corrección que pase las revisiones sí se publica. Si más adelante se contrata GitHub Pro, se agregan ramas protegidas con revisiones obligatorias.

### 8.4 Antes y después del lanzamiento

- **Antes:** todo el sitio queda detrás de Cloudflare Access, solo para el dueño. `PUBLIC_LAUNCHED=false`.
- **Al lanzar:** se quita Access de las páginas públicas. `/admin` y `/api/admin` siguen protegidos. `PUBLIC_LAUNCHED=true`.

### 8.5 Estadísticas y Google

- **Cloudflare Web Analytics**, sin cookies.
- **Google Search Console:** verificación por DNS y envío del sitemap.
- **Google Business Profile:** negocio que atiende una zona (los 7 condados), sin mostrar dirección si no hay local. Lo crea y verifica el dueño.

### 8.6 Costos mensuales

| Servicio | Plan | Costo |
|---|---|---|
| Cloudflare Workers, D1, R2, Turnstile, Access, Web Analytics, Email Routing | Gratis | $0 |
| Resend | Gratis (100 correos al día, 3,000 al mes) | $0 |
| GitHub | Gratis, repositorio privado | $0 |
| Monitor externo (UptimeRobot) | Gratis | $0 |
| **Total** | | **$0**, más la renovación del dominio |

### 8.7 `blagalwindowcleaning.com`

Sigue igual. Se decide qué hacer con él después del lanzamiento.

---

## 9. Calidad y pruebas (Parte 5)

### 9.1 Revisiones automáticas (GitHub Actions, obligatorias para publicar)

| Revisión | Detalle |
|---|---|
| Formato y código | Prettier, ESLint, `astro check` (tipos) |
| Compilación | Compilación de producción completa |
| Enlaces internos | lychee sobre el sitio compilado |
| Contenido pendiente | Marcadores `[[CONFIRM:` y marcos de foto pendiente. Informa mientras `PUBLIC_LAUNCHED=false`; **bloquea** desde el lanzamiento. |
| Reglas del formulario | Obligatorios, teléfono condicional, "Not sure", máximo de propiedades, mensajes EN/ES |
| Guardado | Contra una D1 local: solicitud y 2 avisos juntos; doble envío → misma referencia; fallo de guardado → nada guardado y sin confirmación |
| Avisos y reintentos | Ver la tabla siguiente |
| Panel y sus datos | Página y rutas `/api/admin/*` sin sesión, con sesión vencida, con correo no autorizado y con audiencia incorrecta → bloqueadas. Las pruebas usan tokens firmados de prueba. |
| Webhook de Resend | Firma inválida → rechazado; firma válida → estado actualizado |
| Recorrido completo | Playwright en celular y computadora: los dos caminos, 2 propiedades con "copiar servicios", frecuencias por servicio, solo teclado, selector EN / ES hacia la página equivalente, Turnstile renovado al caducar |
| Accesibilidad | axe-core en cada tipo de página y en cada estado: cada paso del formulario, errores visibles, menú móvil abierto. Cero errores graves. |
| Velocidad y SEO | Lighthouse CI en Home, una página de servicio y Quote. 3 ejecuciones, **cuenta la mediana**, misma configuración. Metas: **velocidad móvil ≥ 90, accesibilidad ≥ 95, SEO ≥ 95**. |
| Indexación | Páginas públicas indexables; `hreflang` EN/ES + `x-default` hacia sus equivalentes; `canonical` correcto; el sitemap trae solo páginas públicas; `/admin` y Thank You fuera del sitemap y con `noindex` |

Turnstile y Resend se simulan en todas las pruebas automáticas. **Nunca se envían correos reales.**

**Pruebas de avisos y reintentos.** Resultado esperado en todos los casos: **una sola solicitud, avisos con estados independientes y reintentos limitados que continúan tras una interrupción.**

| Caso | Resultado |
|---|---|
| Se envía un aviso y falla el otro | El enviado queda `accepted`; el otro queda `pending` con reintento programado |
| El proceso se interrumpe después de guardar | Los avisos quedan `pending` o `sending` vencido, y la tarea programada los envía |
| Resend acepta, pero la respuesta tarda demasiado | El reintento usa la misma clave y no hay correo duplicado |
| El cliente reintenta porque perdió la conexión | Mismo `submission_id` → misma referencia y ningún aviso nuevo |
| Se agotan los 9 intentos (1 inmediato + 8 reintentos) | El aviso queda `needs_attention`, se envía una alerta y no hay más reintentos |
| Resend envía `email.failed` | El aviso queda `needs_attention` y se envía una alerta |

### 9.2 Revisión manual antes del lanzamiento (sitio privado)

1. Teclado, ampliación al 200% y al 400% (el contenido debe reacomodarse a 320 px), y una prueba breve con **VoiceOver** (iPhone) y **TalkBack** (Android).
2. Prueba en un iPhone y un Android reales.
3. El dueño confirma el contenido de la sección 3.4.
4. Entrada a `/admin` con `blagalcleaning@gmail.com`, y verificación de que **otro correo no puede entrar**.
5. **Ensayo de vuelta atrás** (11.1) y **ensayo de restauración** (11.3), con el tiempo medido y anotado en la guía de operación.

### 9.3 Día del lanzamiento

1. Quitar Access de las páginas públicas y poner `PUBLIC_LAUNCHED=true`. La publicación vuelve a pasar todas las revisiones, ahora con el bloqueo de contenido pendiente.
2. Verificar HTTPS, la redirección de `www`, los encabezados de seguridad, `robots.txt` y el sitemap publicado.
3. Confirmar que `/admin` y `/api/admin/*` siguen protegidos en el dominio público, y que `workers.dev` y las direcciones de vista previa no responden.
4. **Dos solicitudes controladas**, una de propiedades y otra de construcción, con cuentas de Gmail de prueba y **Turnstile real**. En cada una se comprueba:
   - el registro en D1
   - el aviso al negocio y la confirmación al solicitante
   - la respuesta en ambas direcciones (negocio → cliente y cliente → negocio)
   - en qué bandeja llegó cada correo

   Las dos quedan marcadas como prueba.
5. Activar Web Analytics, verificar Search Console y enviar el sitemap.
6. El dueño crea y verifica Google Business Profile con el enlace al sitio.

---

## 10. Seguimiento después del lanzamiento

### 10.1 Responsable

El **dueño** (`blagalcleaning@gmail.com`) recibe las alertas y sigue la guía de operación.

### 10.2 Alertas

Todas llegan a `blagalcleaning@gmail.com` por el `send_email` de Cloudflare, independiente de Resend. Cada tipo envía como máximo una alerta cada 15 minutos.

| Alerta | Cuándo |
|---|---|
| Fallo al guardar una solicitud | Inmediata |
| Error inesperado del sitio | Inmediata |
| Aviso en `pending` o `sending` por más de 30 minutos desde su creación | Revisión cada 5 minutos |
| Aviso en `needs_attention` o `bounced` | Revisión cada 5 minutos |
| Sitio caído o `/api/health` fallando | Monitor externo (UptimeRobot, gratis) cada 5 minutos, con aviso por correo |

### 10.3 Revisiones de las primeras 48 horas

**Horario:** +1 hora, +4 horas, noche del día 1, mañana del día 2, noche del día 2 y cierre a las 48 horas.

En cada revisión:
- avisos pendientes o con problemas en `/admin`
- errores en los registros del Worker en Cloudflare
- alertas recibidas

A las 24 horas se hace una solicitud de prueba más.

### 10.4 Guía de operación (`docs/runbook.md` en el repositorio del sitio)

Para cada alerta: qué significa, cómo confirmarla y qué hacer. También incluye:
- el procedimiento de vuelta atrás (11.1)
- la restauración de datos (11.3)
- cómo reintentar un aviso desde `/admin`
- cómo contactar a un cliente cuyo aviso falló, usando los datos guardados

---

## 11. Recuperación

### 11.1 Volver a una versión anterior

"Podemos volver a una versión anterior mediante un procedimiento probado."

- Cloudflare permite volver a una versión anterior del Worker desde el panel o con `wrangler rollback`. **Esto no revierte los datos de D1.**
- Gracias a la regla de cambios de la sección 7.4, la versión anterior funciona con la estructura actual de la base de datos.
- El tiempo de recuperación se **mide en el ensayo** y se anota en la guía. No se promete de antemano.

### 11.2 Respaldos

- **Time Travel de D1:** recupera hasta **7 días** atrás en el plan gratis (30 en el plan pago).
- **Respaldo semanal a R2:**
  - Cada domingo se exportan `quote_requests` y `notices` como JSON a un bucket R2 privado.
  - Se guardan 90 días con una regla de borrado automático.
  - Contiene datos personales, así que el bucket nunca es público.
- Cada solicitud también queda como copia en el Gmail del negocio, a través del aviso.

### 11.3 Restaurar datos

1. Elegir el momento de restauración.
2. **Preservar las solicitudes recientes:** exportar las filas de `quote_requests` y `notices` creadas después de ese momento. Restaurar quita del estado activo las solicitudes recibidas después.
3. Anotar el marcador actual de Time Travel, para poder deshacer la restauración.
4. Restaurar con `wrangler d1 time-travel restore`.
5. Reinsertar las filas preservadas sin duplicar (por `id`).
6. Verificar conteos y referencias.

**Ensayo antes del lanzamiento:** se hace en una base de datos de prueba (`blagal-quotes-drill`) con datos de prueba, y se documenta el resultado.

---

## 12. Fuera de alcance de la Fase 1

- Portal de clientes: cuentas, historial por propiedad, facturas.
- Reservas y pagos en línea.
- Subida de fotos o planos en el formulario.
- Avisos automáticos por WhatsApp.
- Páginas por condado o por combinación de servicio y condado.
- Correo con el dominio para el público (por ejemplo `info@`).
- Logo definitivo (se usa el provisional).
- Decisión sobre `blagalwindowcleaning.com`.

---

## 13. Quién hace qué

| Responsable | Tareas |
|---|---|
| **Dueño** (con su propio inicio de sesión) | Confirmar el contenido de la sección 3.4; crear la cuenta de Resend; aprobar el acceso de GitHub Actions a Cloudflare; Google Business Profile; fotos reales; recibir alertas y hacer las revisiones de las 48 horas |
| **Claude** | Código, configuración, base de datos, pruebas, guía de operación, guías paso a paso de cada tarea del dueño, ensayos de vuelta atrás y restauración. Si se guarda un **token de aprovisionamiento** de Cloudflare en la configuración del entorno, también crea D1, R2, Turnstile, la aplicación de Access y los registros DNS. Ese token tiene permisos mínimos y vencimiento, y se revoca al terminar; no es el token de publicación (sección 8.3). |

---

## 14. Criterios de terminado (Versión 1)

1. Todas las revisiones automáticas pasan.
2. Las dos solicitudes controladas funcionan en el sitio público, y las confirmaciones y respuestas llegan en ambas direcciones.
3. El contenido está confirmado por el dueño.
4. El sitio está público en `blagalcleaning.com`.
5. El panel y sus datos están protegidos, verificado en el dominio público.
6. Los reintentos funcionan después de un fallo.
7. La vuelta atrás y la restauración están ensayadas y documentadas, con el tiempo medido.
8. El seguimiento posterior al lanzamiento tiene un responsable (el dueño) y las alertas están activas.

---

## 15. Decisiones por defecto (revisar)

Estas decisiones no se discutieron explícitamente. Se tomaron con criterio razonable y se pueden cambiar en la revisión:

| Decisión | Valor |
|---|---|
| Ubicación mínima | Ciudad **o** código postal obligatorio; dirección opcional |
| Rutas en español | Mismas rutas en inglés bajo `/es/` |
| Máximo de propiedades por solicitud | 20 |
| Formato de referencia | `BLG-` + 5 caracteres sin ambiguos |
| Límite por IP | 3 por minuto (binding, aproximado) + 10 por hora (contador en D1) |
| Reintentos | 1 envío inmediato + 8 reintentos en ~16 horas: 1, 5, 15, 30, 60, 120, 240 y 480 minutos |
| Registro del español | **Usted**, español neutro de EE. UU. |
| Idioma del panel `/admin` | Español |
| Glosario EN/ES | Propuesto en el prompt maestro (sección 1). El dueño puede cambiarlo. |
| Umbral de alerta de aviso pendiente | 30 minutos |
| Frecuencia máxima de alertas | 1 cada 15 minutos por tipo |
| Monitor externo | UptimeRobot gratis (alternativa: Uptime Kuma del homelab) |
| Retención del respaldo en R2 | 90 días |
| Retención de solicitudes en D1 | Hasta que el dueño las borre. Se indica en Privacy. |

---

## 16. Referencias

- [Astro: adaptador de Cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Cloudflare Workers: rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)
- [Cloudflare D1: Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/)
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/)
- [Cloudflare Access: políticas](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/common-policies/)
- [Cloudflare Email Service: send bindings](https://developers.cloudflare.com/email-service/configuration/send-bindings/)
- [Resend: límites de cuenta](https://resend.com/docs/knowledge-base/account-quotas-and-limits)
- [Resend: claves anti-duplicados](https://resend.com/docs/dashboard/emails/idempotency-keys)
- [Resend: eventos de webhooks](https://resend.com/docs/webhooks/event-types)
- [Resend: dominios](https://resend.com/docs/dashboard/domains/introduction)
- [GitHub: ramas protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Lighthouse CI: variabilidad](https://googlechrome.github.io/lighthouse-ci/docs/troubleshooting.html)
- [axe-core](https://www.deque.com/axe/core-documentation/api-documentation/)
- [W3C: contraste de elementos no textuales](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

---

## 17. Correcciones técnicas (2026-10-26)

Las encontró una revisión independiente del documento y del prompt maestro. Ninguna cambia una decisión de negocio aprobada.

| Sección | Corrección | Motivo |
|---|---|---|
| 4.8 y 7.4 | El límite por IP tiene dos capas: binding de 3 cada 60 s (aproximado) + contador por hora en D1 con HMAC diario de la IP. | El Rate Limiting binding solo admite periodos de 10 o 60 segundos y su conteo es aproximado. Un hash simple de la IP se puede revertir. |
| 4.11 y 9.1 | Se aclara que son 1 envío inmediato + 8 reintentos (9 intentos). `delivery_delayed` es una marca y no un estado. `email.failed` pasa a `needs_attention` con alerta. | Ambigüedad en el conteo y eventos de Resend sin tratar. |
| 6.2 | Los bordes de campos y controles usan gris `#56636F` o marino. El token Línea queda solo para divisores. Se fija el foco en 3 px con 3 px de separación. | `#D6E4EE` da 1.3:1 y WCAG 1.4.11 exige 3:1 para identificar controles. |
| 4.4 y 4.5 | "Limpieza exterior" pasa a ser Pressure Washing. Las listas de cargos quedan cerradas por camino. | Ambigüedad para diseñar el formulario. |
| 5 | El panel está en español. | El dueño habla español. |
| 8.3 y 13 | Se separan el token de publicación (solo en GitHub) y el token de aprovisionamiento (opcional, temporal, en el entorno de Claude). | Había una contradicción entre las dos secciones. |
| 3.4 | Se agrega la pregunta sobre el nombre de "House Cleaning". | Puede no describir bien el servicio para property managers. |
