# ANEXO B. Informe de investigación: código abierto, plugins de Claude y mejoras para conseguir leads en blagalcleaning.com

> **Contexto posterior al informe (2026-10-26):** después de esta investigación, el dueño decidió invertir menos de $500 al mes en publicidad (Google Ads de búsqueda, Google Local Services Ads, Meta y anuncios en ChatGPT) y atender también a hogares como público secundario. Donde este informe dice "si algún día hay anuncios" o descarta píxeles publicitarios, rige la Parte 6 del documento de diseño, que se está definiendo.


**Fecha:** 2026-10-26.

**Base:**
- El documento de diseño aprobado: `el documento de diseño (Anexo A)`. Su §17 ya fija Astro 7.
- 6 investigaciones verificadas.
- 3 investigaciones de huecos: cumplimiento legal del embudo, entrega del lead al Gmail y medición de la calidad del lead.

Las versiones se comprobaron en el registro de npm y en el código publicado de cada paquete. El contexto de la tarea dice Astro 6, pero está desactualizado: el documento (§7.1 y §17) y npm coinciden en Astro 7.4.2.

**Límites de la verificación:**
- **Búsquedas web agotadas.** Las cifras de popularidad son aproximadas (n/v = no verificado). Los precios de terceros que no se pudieron comprobar hoy van marcados.
- **Fuentes primarias bloqueadas en los 3 huecos.** El proxy bloqueó le.utah.gov, ecfr.gov, ftc.gov, fcc.gov, law.cornell.edu, developers.cloudflare.com, support.google.com y docs.github.com. Solo se verificó contra dos cosas:
  - el registro de npm, incluido el código de `resend` 6.34.1, `wrangler` 4.152.0, `@cloudflare/workers-types` 5.20261026.1 y el SDK `cloudflare` 7.3.0;
  - los documentos del repo.

  Lo demás sale de conocimiento previo (hasta junio de 2026) y va marcado n/v.
- **Lo legal (§4.4) no es asesoría legal.**

**Estado:** todavía no se instaló nada. ChatGPT no participó en esta ronda (ver §2.6).

---

## 1. Resumen en 5 líneas

1. **Stack.** El stack aprobado (Astro 7, Cloudflare Workers/D1/R2, Resend, Turnstile, Alpine, Tailwind 4) basta para captar leads B2B con $0 al mes. Se confirma Astro 7.4.2 con `@astrojs/cloudflare` 14.4.2. Astro 6.4.8 tiene un aviso crítico de ejecución remota de código (CVSS 9.8) que nunca se parcheará en la serie 6.
2. **Diseño con Claude.** Se usa `frontend-design` (Anthropic), más el plugin Design y las skills de marketing que ya están activas, más Playwright para que Claude vea lo que diseña. Todo se ancla a un `DESIGN.md` con la marca. Se descartan las skills estéticas comunitarias "más ranqueadas" y los MCP remotos.
3. **Kit de código abierto.** No usa frameworks de componentes. Lleva tokens propios en Tailwind 4, unos 15 componentes propios basados en patrones de HyperUI y Penguin UI, Alpine en su build CSP, Lucide y fuentes autoalojadas. El JS pesa unos 31 KB gzip en `/quote/` y casi nada en el resto del sitio.
4. **Leads.** Hay 11 mejoras de $0 para tener más leads y de mejor calidad: origen del lead, puntuación HOT, respuesta rápida, barra móvil, prueba de seguro (COI), embudo medido, reporte semanal y Google Business Profile, entre otras. Se suman dos piezas:
   - un embudo medido de punta a punta: estados hasta Ganado o Perdido, valor ganado, alta manual de llamadas y WhatsApp en menos de 30 s, y reporte semanal por origen y segmento;
   - un mínimo legal de $0: `/privacy/` propia, casilla opcional y separada para SMS o WhatsApp, registro de bajas y reseñas sin filtrar.

   Todo requiere aprobación del dueño.
5. **Seguridad y fiabilidad.** CSP estricta en 3 capas, JWT de Access, firma de webhooks y defensa de la cadena de suministro (npm 12, Dependabot, Betterleaks). A eso se suman SPF, DKIM y DMARC alineados, con un plan para pasar DMARC de `p=none` a `quarantine`, y detección de fallos silenciosos: supresiones de Resend, latido externo y control sintético diario. En un repo privado gratis no hay CodeQL, secret scanning ni ramas protegidas. Por eso la condición para publicar es el `needs:` del workflow.

---

## 2. Plugins y skills de Claude para diseñar mejor

Nada de esto va dentro del sitio: solo cambia cómo trabaja Claude.

**Dónde se activa cada cosa (hallazgo verificado).** En las sesiones de Claude Code en la nube, como esta, los plugins declarados en `.claude/settings.json` del repo **no se instalan**.

Sí se cargan:
- las skills activadas en la cuenta claude.ai;
- `.claude/skills/` y `.claude/agents/`;
- los hooks y permisos de `.claude/settings.json`;
- `.mcp.json` (con un solo repo);
- `CLAUDE.md` y `AGENTS.md`.

Por eso conviene activar en la cuenta los plugins oficiales, o copiar las skills al repo del sitio en una versión fija.

### 2.1 Instalar ya (fase de diseño), en este orden

| # | Qué | Autor / licencia | Para qué | Cómo | Cuidado |
|---|---|---|---|---|---|
| 1 | **frontend-design** | Anthropic, Apache-2.0; ~1,13 M instalaciones | Dirección visual para evitar el aspecto de "web hecha por IA" | Copiar `SKILL.md` + `LICENSE.txt` a `.claude/skills/frontend-design/` del repo del sitio (queda fija y sin actualizaciones automáticas), o activarla en la cuenta. **Hoy no está activa en esta sesión.** | La skill obedece el brief, pero tiende a proponer estilos arriesgados. Hay que anclarla con el punto 2. |
| 2 | **`DESIGN.md` + `CLAUDE.md` propios** | Propio | Tokens de §6, reglas del ámbar, Archivo/Public Sans, registro usted, glosario B2B (turnover, final clean, common areas) | Archivos en el repo (1–2 h) | Es lo que más mejora la coherencia entre sesiones. |
| 3 | **Plugin Design** (ya activo) | Anthropic, v1.2.0 | `accessibility-review`, `design-critique`, `ux-copy`, `design-system` | Ya está activo | Audita WCAG **2.1** y clasifica mal el 2.5.5 (es AAA, no AA). Hay que pedir WCAG 2.2 AA de forma explícita, sobre todo el 3.3.7 (entrada redundante), clave en el formulario multi-paso. **No autorizar** sus 9 conectores (Slack, Figma, Notion…): no hacen falta y hoy fallan con 403. |
| 4 | **Skills de marketing** (ya activas) | Catálogo de la cuenta | `form-cro` (formulario), `site-architecture`, `seo-audit`. `programmatic-seo` solo para la fase 2 de páginas locales. `analytics-tracking` adaptada. | Ya están activas | Están incompletas (faltan sus `references/`), no cambian desde abril de 2026 y están pensadas para SaaS y GA4. Hay que traducir "signup" a "Request a Quote" y limitarse a Cloudflare Web Analytics. |
| 5 | **Playwright, para que Claude "vea"** | Microsoft, Apache-2.0 | Capturas a 375/768/1440 px, teclado y estados del formulario | Preferido: `@playwright/cli` 0.1.22 con sus skills (Microsoft lo recomienda para agentes porque gasta menos tokens). Alternativa: `.mcp.json` con `@playwright/mcp@0.0.83 --isolated --headless --no-webmcp`. Más un subagente propio `.claude/agents/design-review.md`, inspirado en OneRedOak pero escrito desde cero porque ese repo no tiene licencia. | En esta nube el proxy bloquea `cdn.playwright.dev` y `playwright.download.prss.microsoft.com` (403): **el dueño debe permitirlos** en la red del entorno. `--allowed-origins` no es una barrera de seguridad: usarlo solo contra localhost o la vista previa propia. |

### 2.2 Al empezar a programar y antes del lanzamiento

| # | Qué | Para qué | Cómo | Cuidado |
|---|---|---|---|---|
| 6 | **security-guidance** (Anthropic, ~242k instalaciones) | Tres capas: revisión de patrones después de cada edición, revisión con modelo al final de cada turno y revisión en cada commit o push | Activar en la cuenta, o en local con `claude plugin install security-guidance@claude-plugins-official`. Reglas propias en `.claude/security-patterns.json` (`x-html`, `set:html`, `innerHTML`, `eval`). Modelo de amenazas en `.claude/claude-security-guidance.md` (JWT de Access, Turnstile en el servidor, firma de webhooks, idempotencia en D1). | **Corrección:** no bloquea nada y no es solo local. En el primer uso instala el Agent SDK con pip (necesita red y Python 3.10+). Las revisiones de turno y de commit usan Opus y **consumen la cuota de uso**. Se apagan con `ENABLE_STOP_REVIEW=0` y `ENABLE_COMMIT_REVIEW=0`. |
| 7 | **/security-review** (integrado) | Revisar los cambios de la rama | Ya existe | Sin costo aparte de la suscripción. |
| 8 | **Documentación actual de Astro** | Evitar APIs de las versiones 5 y 6 | `AGENTS.md` que genera `create-astro` 5.3.1, sin red. Astro Docs MCP `https://mcp.docs.astro.build/mcp`: no verificado y hoy bloqueado por el proxy. | Responde sobre Astro 7, que es lo aprobado. |
| 9 | **claude-security** (Anthropic) | Auditoría del Worker antes del lanzamiento | `claude-security@claude-plugins-official` | Solo usa la librería estándar de Python. Cuenta contra el uso y requiere plan de pago. Reemplaza a Trail of Bits. |

### 2.3 Opcionales, con condiciones

- **Impeccable 4.7.0** (Paul Bakaus, Apache-2.0, ~28–37k★ n/v). Solo como auditor y pulidor (`/audit`, `/polish`, `impeccable detect`), nunca como segunda guía estética. Detalles:
  - Instalar con `--no-hooks`, porque por defecto instala hooks.
  - Ejecuta un binario nativo (`@impeccable/cli-*`) que también publica un segundo mantenedor.
  - No lee `.astro`: hay que escanear `dist/`.
- **web-design-guidelines** (Vercel). Copiarla con sus reglas guardadas en un archivo local, porque por defecto las descarga en vivo. El CLI `skills` 1.7.4 envía telemetría: usar `DISABLE_TELEMETRY=1`.
- **Cloudflare skills** (`cloudflare@claude-plugins-official`, ~17,6k instalaciones, sin sello "verified"). Usar solo las skills y desactivar en `/mcp` cualquier servidor con permiso de escritura sobre la cuenta, porque todo despliegue debe pasar por GitHub Actions.
- **coreyhaines31/marketingskills** (~49k★ n/v, licencia n/v). Copiar solo `copywriting`, `page-cro` y `schema-markup`, que completan las referencias rotas de las skills del catálogo.
- **chrome-devtools-mcp 1.12.0** (Google). Para diagnosticar LCP y CLS, siempre con `--no-usage-statistics --no-performance-crux`: trae telemetría activada por defecto (verificado).
- **claude-seo** (n/v). Después del lanzamiento, en el ámbito del usuario y sin extensiones con API keys.
- **claude-code-action** con `CLAUDE_CODE_OAUTH_TOKEN`. Usa la suscripción y no la API, pero gasta minutos de Actions.

### 2.4 No instalar

| Qué | Por qué |
|---|---|
| ui-ux-pro-max (~89–111k★, la "más ranqueada") | Genera lo que ya está decidido (paleta, tipografías, estilo). Hay 8 o más forks con el mismo nombre (riesgo de suplantación). Su CLI `ui-ux-pro-max-cli` 2.15.0 no declara repositorio. Ejecuta scripts Python. |
| taste-skill (~60k★) | Sería una tercera guía estética y contradiría a frontend-design. |
| Website Design (UXKIN) | Sus skills están duplicadas y su valor real es un MCP remoto que envía contexto a un tercero. **El prompt maestro de ChatGPT lo sugiere: hay que corregirlo.** |
| Superdesign | Pensado para React/Next.js, con un lienzo externo cuya política de datos no está verificada. |
| Pi Security | MCP remoto con 21 herramientas (5 de escritura y 2 sin documentar) sobre el repo privado. |
| Backend Design | Hook en cada acción, sin código fuente público para auditarlo. |
| Trail of Bits skills | Licencia n/v y catálogo enfocado en blockchain y malware. claude-security cubre esa necesidad. |
| Revisión en GitHub con API key de Anthropic | Se factura por uso y rompe el presupuesto de $0. |

### 2.5 Riesgos de privacidad y política propuesta

**Riesgos:**
- **MCP remotos:** reciben lo que el modelo decida enviar, sea código privado o datos de leads si están en el contexto. Algunos tienen permisos de escritura.
- **Hooks:** ejecutan código en cada acción de Claude, con sus mismos permisos.
- **Skills de terceros:** son cadena de suministro. Según Snyk, el 13,4% de 3.984 skills de ClawHub y skills.sh tenían problemas críticos.
- **Actualización automática:** `claude-plugins-official` se actualiza solo por defecto. Copiar las skills al repo fija su texto.

**Política (≈1 h):**
- Plugins oficiales en la cuenta o copiados al repo.
- Terceros copiados a `.claude/skills/` en un commit fijo y revisados por PR.
- `.mcp.json` con versiones fijas.
- `permissions.deny` para `Read(.env*)` y `Read(.dev.vars)`.
- Ningún MCP remoto en sesiones con datos reales de leads.
- Una sola skill estética principal: frontend-design genera e Impeccable solo audita.

### 2.6 Trabajar con ChatGPT

No existe ningún plugin que haga trabajar juntos a Claude y ChatGPT. El prompt maestro (`el prompt maestro`) prevé dos modos:
- **Manual (gratis):** el dueño pega el prompt en ChatGPT y trae la respuesta para que Claude la verifique. **Es el recomendado.**
- **Por API:** se paga por uso, requiere `OPENAI_API_KEY` y permitir `api.openai.com`. Rompe el presupuesto de $0 y envía el contenido del proyecto a otro tercero.

**Reglas para cualquier IA (ChatGPT o Claude):**
- **Reseñas y testimonios.** Nunca redactarlos, "mejorarlos" ni inventarlos. 16 CFR 465.2 prohíbe también los generados con IA (ver §4.4).
- **Respuestas a clientes.** Si algún día una IA contesta a clientes por chat, SMS o correo, la Utah AI Policy Act obliga a decir claramente que es IA cuando el cliente lo pregunte. Es la SB 149 de 2024, enmendada en 2025 por la SB 226 y la SB 332; según conocimiento previo rige hasta jul-2027 (n/v).

Antes de usar el prompt hay que actualizarlo:
- cambiar `@cloudflare/vitest-pool-workers` por `@cloudflare/vitest-plugin`;
- añadir ESLint 10 + `eslint-plugin-jsx-a11y-x`;
- quitar la recomendación de UXKIN;
- cambiar el monitor UptimeRobot (y su alternativa Uptime Kuma) por la propuesta de §3.8;
- añadir la medición de §4.3, el mínimo legal de §4.4 y la entrega de correo de §5.3;
- añadir el resto de correcciones de este informe.

---

## 3. Stack de código abierto recomendado por área

**Columnas.** "Versión" es la verificada en npm el 2026-10-26. "Cuándo" puede ser:
- **Ya:** al crear el repo, para maquetar.
- **Al programar.**
- **Post:** después del lanzamiento.
- **Opcional.**

### 3.1 Base Astro

| Paquete | Para qué | Versión | Licencia | Popularidad aprox. | Cuándo |
|---|---|---|---|---|---|
| `astro` | Framework: páginas estáticas + Worker para las rutas dinámicas | 7.4.2 (21-oct-2026) | MIT | Muy alta (~50k★ n/v) | Ya |
| `@astrojs/cloudflare` | Adaptador para Workers, bindings y handler `scheduled` | 14.4.2 (21-oct-2026) | MIT | Oficial | Ya |
| `wrangler` | Desarrollo local en workerd, D1, despliegue, `types --check` | 4.152.0 (22-oct-2026) | MIT OR Apache-2.0 | Oficial | Ya |
| `tailwindcss` + `@tailwindcss/vite` | Estilos y tokens en `@theme` | 4.3.3 | MIT | Estándar de facto | Ya |
| `@fontsource-variable/archivo` y `@fontsource-variable/public-sans` | Fuentes autoalojadas con `fontProviders.local()` | 5.3.0 | OFL-1.1 | Fontsource ~6k★ | Ya |
| i18n nativo (`astro:i18n`) | EN en `/`, ES en `/es/`, helpers para hreflang | Incluido | MIT | Núcleo | Ya |
| `@astrojs/sitemap` | Sitemap con alternativas de idioma y `filter` | 3.7.4 | MIT | Oficial | Al programar |
| `typescript` | Tipos. **Fijar `~6.0.3`**: la 7.0.2 rompe `@astrojs/check` y typescript-eslint | 6.0.3 | Apache-2.0 | — | Al programar |
| `astro-seo` | Componente `<SEO>` (alternativa: un `BaseHead.astro` propio) | 1.2.0 | MIT | ~1,3k★ n/v, 1 mantenedor | Opcional |

**Ajustes verificados en el código:**
- **Imágenes:** `adapter: cloudflare({ imageService: 'compile' })`. Por defecto usa Cloudflare Images en tiempo de ejecución (cuota de 5.000 transformaciones al mes, n/v).
- **Sesiones:** `session: false`. Si no, el adaptador crea un KV llamado `SESSION` que nadie pidió.
- **Cron Triggers:**
  - En `wrangler.jsonc`: `main: "./src/worker.ts"`.
  - En ese archivo: `import { handle } from '@astrojs/cloudflare/handler'; export default { fetch: handle, async scheduled(c, env, ctx) {…} }`.
  - La opción `workerEntryPoint` de la versión 12 ya no existe.
  - Se prueba con `wrangler dev --test-scheduled`.
- **Rutas dinámicas:** `export const prerender = false`. Los bindings se leen con `import { env } from 'cloudflare:workers'`.
- **Fuentes:** `fontProviders.local()`, apuntando a los woff2 del paquete. Los proveedores `npm()` y `fontsource()` descargan desde jsDelivr al compilar, y jsDelivr está bloqueado en este entorno.
  - **Archivo debe usar el archivo "standard" (wght + wdth, 90 KB)**, porque el diseño aprobado usa el eje wdth (titulares al ~104% y logo al ~108%).
  - Public Sans: wght, 27 KB.
  - Los nombres de familia son "Archivo Variable" y "Public Sans Variable".
- **hreflang:** hecho a mano en el layout, con `getAbsoluteLocaleUrlList` emparejado con los locales, más `x-default`. El sitemap usa `i18n` y `filter` (para excluir Thank You).
- **Versiones:** Node 24 LTS (≥24.16) en CI y en local. Fijar `astro ~7.4`, `@astrojs/cloudflare ^14` (la 15 está en beta) y `wrangler 4.152.x`. Zod siempre desde `astro/zod`.
- **Plantillas:** ninguna sirve como base.
  - AstroWind (MIT): referencia de secciones.
  - accessible-astro-starter 6.0.2 (MIT, Astro 7): referencia de accesibilidad.
  - ScrewFast: solo como patrón de diccionarios tipados. Su i18n es propio, en EN/FR, y depende de Preline.

### 3.2 Diseño e interfaz

| Paquete | Para qué | Versión | Licencia | Popularidad aprox. | Cuándo |
|---|---|---|---|---|---|
| Tokens propios + ~15 componentes `.astro` | CTA, tarjeta de servicio, header y menú móvil, FAQ, stepper y campos, badge de condado, testimonio, footer | — | Propio | — | Ya |
| HyperUI (copiar y pegar) | Marcado de secciones de marketing | Sin npm | MIT (n/v hoy) | ~12k★ n/v | Ya (referencia) |
| Penguin UI (copiar y pegar) | Marcado interactivo con Tailwind 4 + Alpine | Sin npm | MIT con atribución (n/v) | Pequeño | Ya (referencia). **Nunca ejecutar `npm i penguinui`: es otra librería, de Vue.** |
| `@alpinejs/csp` | Alpine sin `'unsafe-eval'` | 3.17.5 | MIT | Alpine ~30k★ | Al programar (decidir ya) |
| `@alpinejs/mask`, `collapse`; `focus` y `persist` opcionales | Teléfono y código postal, acordeón y pasos, foco, borrador en sessionStorage | 3.17.5 | MIT | Oficiales | Al programar |
| `@alpinejs/ui` | Combobox y diálogos accesibles sin estilos | 3.17.5 | MIT | Oficial, documentación escasa | Considerar (probar con el build CSP) |
| `@lucide/astro` | Íconos SVG sin JS (añade `aria-hidden` automáticamente) | 1.61.0 | ISC | ~25k★ | Ya |
| `@tailwindcss/forms` | Base para los controles del formulario | 0.5.11 | MIT | Oficial | Opcional |

**Reglas:**
- **Ámbar:**
  - Declararlo **fuera de `@theme`**, como variable en `:root`, porque `@theme` genera clases utilitarias para todo el sitio.
  - Usarlo solo en `CtaQuote` y en una lista corta de acentos de marca (favicon, detalles sobre marino). Un grep en CI falla si aparece fuera de esa lista.
  - Contraste: texto marino sobre ámbar da 7,37:1. Texto blanco sobre ámbar da 2,01:1 y está prohibido.
- **Alpine CSP:**
  - Toda la lógica va en `Alpine.data()`.
  - Admite ternarios, asignaciones y literales.
  - **No admite** funciones flecha, template literals, `??`, `?.`, spread ni globales (`window`, `umami`).
  - `x-html` está prohibido.
  - `:style` solo con objetos, nunca con strings.
  - **No usar `@astrojs/alpinejs`**: inyecta el Alpine estándar en todas las páginas. Importar `@alpinejs/csp` a mano, solo en `/quote/`.
- **HTML nativo primero:** `<dialog>`, `popover` (menú móvil sin JS) y `<details name>`.
- **Transiciones:** `@view-transition` en CSS bajo `prefers-reduced-motion`. **Sin `<ClientRouter/>`**, que es incompatible con la CSP de Astro.
- **Fragmentos copiados:** quitar los `style="…"` (la CSP los bloquea), cambiar la paleta, revisar con axe y anotar la atribución en `THIRD_PARTY_NOTICES`.
- **Presupuesto de JS en `/quote/`:** unos 31 KB gzip (Alpine CSP 23,8 + mask 1,1 + `zod/mini` 6,1). Se suman 9 KB si se usa `focus`.

### 3.3 Formularios y leads

| Paquete | Para qué | Versión | Licencia | Popularidad aprox. | Cuándo |
|---|---|---|---|---|---|
| Zod vía `astro/zod` | Esquema por paso con `z.discriminatedUnion('request_type')`, compartido con la Action | Astro trae zod ^4.6.6 (zod 4.6.7) | MIT | ~40k★ | Al programar |
| Astro Actions | `quote.submit` | Incluido | MIT | Núcleo | Al programar |
| `libphonenumber-js` | Normalizar a E.164 **solo en el Worker**. Usar `isPossiblePhoneNumber`, no `isValid` con los metadatos max, que envejecen. También sirve para detectar duplicados entre el alta manual y el formulario. | 1.13.15 | MIT | Millones de descargas por semana (n/v) | Al programar |
| Turnstile | Anti-bots, `siteverify` en el servidor | Servicio | Gratis | — | Al programar |
| `resend` | Envíos con `idempotencyKey` y `webhooks.verify` | 6.34.1 | MIT | Muy usado | Al programar |
| `jose` | JWT de Access en `/api/admin/*` | 6.2.13 | MIT | Muy alta (n/v) | Al programar |
| Atribución propia (~50 líneas) | Contacto de la sesión: UTM, gclid/gbraid/wbraid, referrer y página de entrada (reglas abajo) | — | Propio | — | Si se aprueba §4 |
| `form-attribution` | Alternativa de librería (solo primer contacto, autohospedada) | 2.5.1 | Apache-2.0 | Pequeño | Opcional |
| Casilla de SMS/WhatsApp (patrón propio) | Prueba del consentimiento para responder por texto o WhatsApp. Se muestra con `x-show` cuando el medio preferido es texto o WhatsApp, es un booleano opcional en Zod y la Action guarda el id, la versión y el idioma del texto (textos en §4.4). | — | Propio | — | Al programar (el texto, ya) |
| `postal-mime` | Alta de leads reenviando un correo a una dirección difícil de adivinar (Email Worker) | 4.1.4 (22-oct-2026) | MIT-0 | 1 mantenedor | Post |

**Notas:**
- **Zod en el cliente:** `z.config({ jitless: true })` evita reportes de violación de la CSP. Conviene evaluar `zod/mini` (6 KB frente a 26 KB gzip).
- **Teléfono:** se formatea con `@alpinejs/mask` en el cliente, porque `libphonenumber-js` pesa 36 KB gzip en el navegador. El formato guardado se valida con `z.e164()`.
- **Varias propiedades:**
  - El `FormData` de Astro no admite arreglos de objetos, así que la Action se llama desde JS con un objeto.
  - Sin JS harían falta ranuras fijas o JSON oculto, más `prerender = false` en `/quote/`, porque Astro ignora las Actions en páginas prerenderizadas. Ver la pregunta abierta.
- **Borrador:** con `persist`, solo en sessionStorage, y se borra al enviar.
- **Reglas de atribución:**
  - Landing, referrer y UTM se guardan solo en la primera página de la sesión, sin sobrescribirlos al navegar. Si no, el referrer pasa a ser el propio sitio.
  - sessionStorage es por pestaña y solo ve la sesión del envío. Por eso no hay que abrir el formulario en otra pestaña (`target=_blank` con `noopener` no copia los datos). Un "primer contacto" entre visitas exigiría localStorage, que habría que declarar en Privacy.
  - Zod acepta solo las claves `utm_source`, `utm_medium`, `utm_campaign` y `utm_content`, con un máximo de ~100 caracteres, y las trata como datos no confiables.
  - Derivación del origen: `utm_campaign=gbp` da gbp; un referrer de google.* sin UTM da google_search; otro dominio da other_website; sin datos, direct.
- **GPC:** guardar siempre los UTM y el referrer. Si llega `Sec-GPC: 1` o `navigator.globalPrivacyControl === true`, marcar el lead con `no_ad_sharing=true`, descartar el gclid y excluirlo de cualquier subida futura de conversiones a Google Ads. GPC solo pide no vender ni compartir datos para publicidad; no obliga a descartar la atribución propia.
- **Campo Notas:**
  - Ayuda visible: "No incluya datos de pago ni números de identificación".
  - Zod rechaza patrones de tarjeta y de SSN.
  - No se piden códigos de lockbox, alarma o puertas, habituales en turnovers: se piden por teléfono al confirmar el trabajo.
- **`postal-mime`:**
  - Aceptar solo el remitente `blagalcleaning@gmail.com` y crear el lead como borrador para que el dueño lo confirme en el panel.
  - Fijar la versión exacta y esperar unas semanas sin cambios antes de adoptarlo: publicó 2 versiones mayores en 2 meses y 5 versiones en 13 horas.
  - No se verificó si Email Routing entrega `Authentication-Results` al Worker.

### 3.4 Medición

| Pieza | Para qué | Versión | Licencia | Cuándo |
|---|---|---|---|---|
| Cloudflare Web Analytics (fragmento manual) | Visitas y Core Web Vitals sin cookies. Probablemente no muestra UTM ni eventos propios (n/v), así que la atribución vive en la fila del lead | Servicio | Gratis | Lanzamiento (ya está en el documento) |
| Endpoint propio → D1 o Workers Analytics Engine | Eventos del embudo: inicio, pasos, envío y cambio de idioma | — | Propio, $0 | Si se aprueba §4 |
| Contador de clics en `tel:`, `wa.me` y `sms:` (`sendBeacon` → `/api/click`, tabla `contact_clicks`) | Intención de llamar o escribir, por ubicación (barra móvil, cabecera, contacto, error del formulario, pie) y por origen. Sin IP ni identificadores | — | Propio, $0 | Al programar |
| Tablas `leads` + `lead_events`, ficha y alta manual en `/admin` | Resultado y valor por origen y segmento, incluidos llamadas, WhatsApp y recomendaciones (§4.3) | — | Propio, $0 | Ya (diseño) |
| GBP > Rendimiento, lectura manual mensual (tabla opcional `gbp_monthly`) | Toques en "Llamar", clics al sitio y vistas del perfil | Servicio | Gratis | Post |
| Umami Cloud Hobby | Panel de eventos ya hecho (plan gratis n/v hoy; código MIT, ~30k★) | v3.x | SaaS | Opcional, requiere aprobación |

**Notas:**
- **`/api/click`:**
  - Limitarlo solo con el Rate Limiting binding, **sin** el contador por hora en D1 de §4.8, que duplicaría las filas escritas.
  - Si el binding no existe en Free (riesgo 3), usar la regla WAF.
  - `kind` y `placement` en lista cerrada, para que un bot no cree filas nuevas.
  - Un clic no es una llamada, y en computadora un clic en `tel:` casi no indica nada.
- **D1 Free:** de memoria permite ~100k filas escritas y 5M leídas al día (n/v). Hay margen de sobra: el latido del cron de 5 minutos suma ~288 escrituras al día.
- **Workers Analytics Engine:** alternativa para los clics (disponibilidad en Free n/v). Es de baja prioridad, porque D1 es más simple para el reporte.

Se descartan Plausible CE (necesita servidor), PostHog (excesivo y con riesgo de capturar datos personales), la Business Profile Performance API, el seguimiento de llamadas de pago (§6) y, por ahora, Zaraz (solo tiene sentido con anuncios pagados).

### 3.5 SEO local

| Paquete | Para qué | Versión | Licencia | Popularidad aprox. | Cuándo |
|---|---|---|---|---|---|
| `schema-dts` + `JsonLd.astro` propio (~10 líneas, escapando `<`) | `@graph` con LocalBusiness, `Service` (con `serviceType` y `areaServed`: los 7 condados como `AdministrativeArea`), BreadcrumbList y WebPage con `inLanguage` | 2.1.0 (2-oct-2026) | Apache-2.0 | Google, ~1k★ | Al programar |
| `robots.txt` a mano en `/public` | — | — | — | — | Al programar |

**Correcciones:**
- `HouseCleaning` **no existe** en Schema.org y `ProfessionalService` está **deprecado**.
- No marcar `Review` ni `AggregateRating` propios: Google no los muestra desde 2019 y tampoco admite puntuaciones copiadas de otros sitios.
- Las FAQ valen como contenido. Sus resultados enriquecidos están limitados desde agosto de 2023 a sitios de gobierno y salud.
- Nombre, dirección y teléfono deben coincidir exactamente con Google Business Profile.

**Google Business Profile:**
- **Enlace con UTM:** `https://blagalcleaning.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`, con `utm_content` = `website`, `appointment` o `post-AAAAMM`. No se verificó si el perfil ofrece enlace de citas a un negocio que atiende una zona.
  - Solo cambia la URL, no el NAP.
  - El canonical sin query evita que esas URL se indexen como duplicadas.
  - El referrer de Google suele llegar solo como origen y la app de Maps a menudo no lo envía. Sin UTM no se distingue el perfil de la búsqueda orgánica.
- **Calificación en el sitio:** si se muestra, debe ser la real de Google, con este formato: "X,X de 5 en Google · N reseñas · al DD/MM/AAAA", con enlace y actualizada a mano. Las reglas legales están en §4.4.

### 3.6 Seguridad (detalle en §5)

| Paquete | Para qué | Versión | Licencia | Cuándo |
|---|---|---|---|---|
| `security.csp` de Astro + `public/_headers` + middleware | CSP con hashes y cabeceras | Incluido | MIT | Ya (configuración) |
| Dependabot (alertas, actualizaciones con cooldown) | Dependencias npm y Actions | Servicio | Gratis | Al programar |
| npm ≥12.2.1 | `allowScripts` + `strict-allow-scripts` + `min-release-age` | 12.2.1 | Artistic-2.0 | Al programar |
| Betterleaks | Detectar secretos (reemplaza a gitleaks, sin versiones desde febrero de 2026) | v1.9.0 | MIT | Al programar |
| `eslint-plugin-security` / `eslint-plugin-no-unsanitized` | Análisis estático ligero | 4.2.0 / 4.1.5 | Apache-2.0 / MPL-2.0 | Al programar |
| zizmor / actionlint | Auditar los workflows | 1.31.1 / 1.7.12 | MIT | Al programar |
| OSV-Scanner (`upload-sarif: false`) | Segundo escáner de dependencias, semanal | v2.7.0 | Apache-2.0 | Post |
| OWASP ZAP baseline (Docker) + MDN Observatory | Análisis pasivo semanal de producción | 2.17.0 | Apache-2.0 | Post |
| Semgrep CE / Socket Firewall `sfw` | Análisis estático no bloqueante / bloquear malware al instalar | 1.182.1 / 2.0.6 | LGPL-2.1 / MIT | Opcional |

### 3.7 Calidad y CI

| Paquete | Para qué | Versión | Licencia | Popularidad aprox. | Cuándo |
|---|---|---|---|---|---|
| `@playwright/test` | E2E contra `wrangler dev` (workerd local) | 1.64.1 | Apache-2.0 | ~75k★ n/v | Al programar |
| `@axe-core/playwright` | Accesibilidad por página y estado (etiquetas `wcag2a/2aa/21aa/22aa`) | 4.14.0 | MPL-2.0 | ~6–7k★ | Al programar |
| `@lhci/cli` | Lighthouse con 3 ejecuciones | 0.15.1 (jun-2025, **estancado**, trae LH 12.6.1) | Apache-2.0 | ~6k★ | Al programar |
| `@unlighthouse/cli` | Alternativa mantenida (LH 13.5) | 0.19.1 | MIT | n/v | Evaluar |
| lychee + `lycheeverse/lychee-action` | Enlaces internos (bloqueante) y externos (semanal) | 0.24.2 / v2.9.0 (n/v) | Apache-2.0 OR MIT | ~2–3k★ | Al programar |
| `@cloudflare/vitest-plugin` + `vitest` | Pruebas del Worker: D1, cron (`createScheduledController`), JWT, webhooks | 1.4.7 / 5.0.5 | MIT | Vitest ~15k★ | Al programar |
| `eslint` + `eslint-plugin-astro` + `typescript-eslint` + `eslint-plugin-jsx-a11y-x` | Lint con flat config y accesibilidad en `.astro` | 10.13.0 / 3.2.1 / 8.72.0 / 0.2.0 | MIT | ~26k★ | Al programar |
| `prettier` + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` | Formato y orden de clases | 3.9.10 / 1.1.2 / 0.8.1 | MIT | ~50k★ | Al programar |
| `@astrojs/check` | Tipos en `.astro` | 0.9.12 | MIT | Oficial | Al programar |
| `html-validate` | Validar el HTML del build | 11.17.0 | MIT | Media | Al programar |
| `pa11y-ci` | Segunda opinión de accesibilidad, semanal | 5.0.0 | LGPL-3.0 | ~4k★ | Post |

**Workflow único:**
- **Orden:** `checks` → `build` (un solo artefacto) → `browser` + `lighthouse` → `deploy`.
- **Condición de `deploy`:** `needs:` de todos los demás jobs, solo en push a `main` y sin `always()`.
- **Concurrencia y permisos:** `concurrency` cancela las ejecuciones de CI viejas, pero nunca un deploy en curso. `permissions: contents: read`. Acciones fijadas por SHA.
- **Artefactos:** `retention-days: 3–7`. El plan Free tiene 500 MB.
- **Avisos de fallo:** GitHub avisa a quien hizo el push, no necesariamente al dueño. Hay que añadir un paso `if: failure()` que abra un issue.

**Ajustes:**
- **Playwright:** `install --with-deps --only-shell chromium`. Claves de prueba de Turnstile: `1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`. Una prueba debe fallar si el build de producción contiene `1x0000`.
- **LHCI:** `assert.aggregationMethod: 'median'`, que es la mediana real de cada puntuación. `'median-run'` elige una sola ejecución "representativa". Usar `upload.target: filesystem`, nunca `temporary-public-storage`.
- **lychee:** `--offline --root-dir <ruta absoluta>/dist --include-fragments --index-files index.html`. Sin esas opciones no revisa anclas ni que exista cada página.
- **html-validate:** `@click` de Alpine no da error con el preset recomendado. Hay que prever `no-implicit-button-type`, `unique-landmark` y `no-inline-style`.
- **ESLint:** instalar solo `jsx-a11y-x`. Si están los dos, eslint-plugin-astro prefiere el original, que no soporta ESLint 10.
- **wrangler y vitest-plugin:** alinear sus versiones (el plugin fija la 4.152.0 exacta) y agruparlos en Dependabot.
- **Minutos de CI:** unos 12–17 por push, con una cuota de ~2.000 al mes (n/v en 2026).

### 3.8 Correo, entrega y monitoreo (detalle en §5.3)

| Pieza | Para qué | Versión | Licencia | Cuándo |
|---|---|---|---|---|
| Cloudflare Email Routing | Crea y bloquea el MX y el SPF del raíz. Reenvía quotes@ y alerts@ al Gmail y sirve de destino verificado para `send_email`. Su estado se consulta por API (`ready`, `misconfigured`…) | Servicio; CLI wrangler 4.152.0 | Gratis | Ya |
| Resend, dominio con `customReturnPath: 'send'` explícito y región `us-east-1` | Envía el aviso y la confirmación con DKIM y SPF alineados sin tocar el SPF del raíz. Configuración: `receiving` desactivado (pediría un MX en el raíz que choca con Email Routing), seguimiento de aperturas y clics apagado y `tls: 'opportunistic'` | SDK 6.34.1 (16-oct-2026) | MIT | Ya |
| Cloudflare DMARC Management | Informes DMARC (rua) y fuentes aprobadas, sin buzón propio | Servicio | Gratis (n/v) | Ya |
| Binding `send_email` restringido | Alertas desde alerts@ solo al Gmail del dueño | workers-types 5.20261026.1 | — | Al programar |
| Better Stack Uptime Free (o Healthchecks.io, BSD-3) | Monitor externo de `/api/health` y `/quote/`, y heartbeat del cron. Límites de 2026 n/v; de memoria, 10 monitores y 10 heartbeats con chequeos cada 3 minutos | Servicio | — | Antes del lanzamiento público |
| Control sintético diario: GitHub Actions + `@playwright/test` | Comprobar en producción, sin enviar nada, que `/quote/` arranca, carga Turnstile y no tiene errores de CSP ni de JS | 1.64.1 | Apache-2.0 | Al programar |
| `mailauth` | CLI de diagnóstico de SPF, DKIM, DMARC y ARC sobre un `.eml`. No va en el Worker | 8.0.4 (22-oct-2026) | MIT | Opcional |
| `mimetext` | Respaldo para armar el MIME si la sobrecarga builder falla con Email Routing. Importar `mimetext/browser`, porque la raíz usa `node:os` y `Buffer` | 3.0.28 (28-ene-2026), 1 mantenedor | MIT | Opcional |
| `@cloudflare/playwright` (Browser Run, antes Browser Rendering) | Sintético dentro del Worker, sin GitHub. Usa Playwright 1.58.2 y no admite Playwright Test salvo las aserciones. Turnstile podría tratarlo como bot y sus límites en Free no están verificados | 1.3.6 (20-ago-2026) | Apache-2.0 | Considerar (post) |
| Google Postmaster Tools | Reputación del dominio en Gmail; con poco volumen suele no mostrar datos | Servicio | Gratis | Post |

**Ajustes:**
- **Binding en `wrangler.jsonc`:** `send_email: [{ name: "ALERT_EMAIL", destination_address: "blagalcleaning@gmail.com", allowed_sender_addresses: ["alerts@blagalcleaning.com"] }]`.
  - Hay que declararlo en **cada** entorno, porque no se hereda.
  - El Gmail debe estar verificado antes como destino de Email Routing.
- **Envío sin MIME:**
  - `env.ALERT_EMAIL.send({ from, to, subject, text, html, replyTo, headers })` existe desde workers-types 5.20260705.1 y devuelve `{ messageId }`.
  - Falta probar en workerd y en la cuenta Free que funcione con Email Routing sin activar Email Sending.
  - Sin verificar: que el DKIM vaya alineado, que siga siendo gratis tras Email Service, la cuota diaria y si pasa por una lista de supresión (el SDK menciona supresiones de cuenta "legacy").
  - Respaldo: si `send()` falla, la alerta sale por Resend desde alerts@. Si fallan los dos, aparece un aviso en `/admin`.
- **Resend Free:** 100 correos al día y 3.000 al mes. De memoria, también 1 dominio y 1 día de registros (n/v), así que los eventos se guardan en D1.
- **Webhooks de Resend:** se verifican con standardwebhooks (JS puro, funciona en Workers). Sus rutas quedan fuera de Access y de Turnstile.
- **UptimeRobot Free:** de memoria, desde 2025 es solo para uso personal o no comercial (n/v). No usarlo hasta leer sus términos.
- **Bot Fight Mode:** dejarlo apagado. De memoria no se puede excluir con reglas WAF en Free (n/v), y desafiaría a los webhooks de Resend, a los monitores y a los runners de GitHub.
- **Dominio:** renovación automática y tarjeta al día en Cloudflare Registrar. Si vence, caen el sitio y el correo.

---

## 4. Mejoras que no están en el documento de diseño

**Ya resuelto en el documento (no se repite aquí):**
- Astro 7.
- Límite por IP en dos capas, honeypot y HMAC de la IP.
- Workers Builds desconectado; workers.dev y vistas previas desactivados.
- Access + JWT.
- Ámbar con texto marino.
- No crear las 49 páginas servicio × condado.

### 4.1 Para conseguir más clientes y leads de mayor calidad

Todas cuestan $0 en servicios y **requieren la aprobación del dueño**. Están ordenadas por impacto y esfuerzo.

| # | Mejora | Beneficio | Costo / esfuerzo | ¿Cambia el diseño aprobado? |
|---|---|---|---|---|
| 1 | **Origen del lead.** Pregunta "¿Cómo nos conoció?" con fichas de un toque: Google Maps/perfil, Búsqueda de Google, recomendación, GC o PM conocido, cliente anterior, cartel en obra o vehículo, asociación, redes, otro y "Prefer not to say". Va en la página **Thank You**, después del envío, con el `submission_id` como credencial de un solo uso, así que no añade fricción al formulario. Es obligatoria en el alta manual (§4.3). Además: contacto de la sesión con UTM y gclid/gbraid/wbraid en campos ocultos (§3.3), y UTM en el enlace de Google Business Profile (§3.5), firmas, tarjetas y QR. Canal (cómo contactó) y origen (cómo nos encontró) se guardan por separado. | Saber qué canal trae contratos, incluidos el boca a boca y las llamadas que ninguna analítica ve. Deja lista la importación de conversiones si algún día hay anuncios. | Muy bajo: un campo Zod, columnas en D1 y ~50 líneas | Sí: Thank You (o §4.5 si se prefiere en el paso 3), §4.8 (campos ocultos), §7.4 y página Privacy |
| 2 | **Puntuación y prioridad.** `lead_score` calculado en el Worker, con asunto `[HOT]`/`[WARM]`/`[HOME]` en el aviso y orden por puntuación en `/admin`. Señales: B2B, recurrente o varias propiedades, plazo menor de 30 días, COI requerido y cargo con poder de decisión. El correo corporativo cuenta poco, porque muchos GC pequeños y juntas de HOA usan Gmail. Desde el día 1 se guardan `score_version` y `score_inputs_json`, y los pesos v1 se documentan en §7.4 (hoy no están ni en el documento ni en el prompt). La recalibración se explica en §4.3. | Atender primero a los GC y property managers con más valor | Bajo: una función pura con pruebas | Sí: §4.10 (asunto), §5 (panel) y §7.4 |
| 3 | **Dos campos opcionales de calificación:** "Fecha deseada de inicio" en el camino Propiedades (hoy solo Construcción tiene fecha) y "¿Requiere COI / additional insured?" en los dos caminos | Priorizar urgencias y detectar contratos comerciales | Bajo | Sí: §4.3 y §4.4. Solo si el dueño puede emitir COI |
| 4 | **Respuesta rápida.** Enlace a una página de reservas gratuita de Google Calendar ("agendar visita o walkthrough") y teléfono directo en la confirmación. Filtro de Gmail con estrella para `[HOT]` y aviso push de la app de Gmail (pasos en §5.3). El estado "Contactado" en la ficha del lead guarda `first_response_at` para medir el tiempo de respuesta (§4.3). Alerta "lead sin contactar después de N horas hábiles", con umbral y horario por confirmar. | Contactar en minutos multiplica la tasa de contacto (estudios citados por proveedores y HBR 2011; direccionales y antiguos) | Bajo | Sí: §4.10 (texto), §5 (acción nueva), §7.4 y §10.2 |
| 5 | **Barra fija en móvil:** Call (`tel:+1…`), Request a Quote (ámbar con texto marino) y WhatsApp (`wa.me/…?text=` en EN o ES) o SMS. Cada botón se mide. `viewport-fit=cover` + `safe-area-inset-bottom`, sin tapar el formulario ni Turnstile. El texto prellenado de `wa.me` lleva una marca de origen ("Hola Blagal (web)" o "(web-gbp)"), armada con JS desde sessionStorage sobre un href base sin marca. El `body` de `sms:` funciona distinto en iOS y Android (`sms:+1…?&body=` suele ser lo más compatible): hay que probarlo o dejar la marca solo en WhatsApp. Las respuestas se escriben a mano (P2P, §4.4). | Superintendentes en obra y property managers con prisa | Bajo: componente sin JS (la marca es una mejora progresiva) | Sí: §6.6 (móvil). WhatsApp solo si alguien lo atiende (§3.4) |
| 6 | **Bloque de confianza B2B:** seguro con límites reales y "COI bajo solicitud / additional insured" (nunca publicar el COI). W-9 y referencias bajo solicitud. 3–6 reseñas reales de Google como "Reseñas destacadas", copiadas a mano en una Content Collection EN/ES, sin marcado de estrellas, con la calificación y el total reales de Google y su fecha, y "Ver todas en Google" (reglas en §4.4). Antes y después con un componente propio accesible (`<input type="range">` + `clip-path`, `aria-label` EN/ES) o con dos fotos lado a lado. Logos y testimonios de clientes con autorización escrita. | Responde a la objeción principal de property managers y GC: seguro, fiabilidad y pruebas | Bajo en código. Depende de los documentos y fotos del dueño. | Parcial: §3.4 ya pide confirmar estos datos; las secciones en Home y en las páginas de servicio son nuevas |
| 7 | **Precalificación para contratistas:** sección en `/construction/` (o página propia) con seguro, COI, W-9, programa de seguridad, etapas, capacidad de cuadrillas y referencias de GC. Además, inscribirse en la lista de contratistas de limpieza precalificados de DFCM Utah (ciclo de 18 meses). | Abre contratos de GC grandes y contratos públicos | Medio: contenido y documentación del dueño | Como sección: mínimo. Como página nueva: sí (§3.3, 19 páginas por idioma) |
| 8 | **Embudo medido:** eventos de inicio, cada paso, envío, clic en llamar o WhatsApp (§3.4) y cambio de idioma, enviados a un endpoint propio del Worker y guardados en D1 o Analytics Engine. No usa terceros ni cookies, los bloqueadores de anuncios no lo detienen y no cambia la CSP. Alternativa: Umami Cloud Hobby. | Saber en qué paso se pierden leads | Bajo-medio | Sí: §8.5 (hoy solo Web Analytics), §7.2 (ruta nueva) y Privacy |
| 9 | **Reporte semanal al Gmail** (Cron + `send_email`): leads por fuente y segmento, cotizados, ganados y valor, tiempo de respuesta, abandono por paso y leads sin contactar (detalle en §4.3) | El dueño ve qué funciona sin entrar a paneles | Bajo-medio | Sí: tarea nueva en §7.2 |
| 10 | **Pedir reseñas desde `/admin`** al marcar un trabajo como terminado: correo EN/ES con el enlace directo para reseñar en Google Business Profile, más tarjetas QR para las cuadrillas. El botón está disponible para **todo** trabajo cerrado que no esté en la lista de supresión, sin campo previo de satisfacción, con un recordatorio como máximo y solo por correo. Se trata como correo comercial (CAN-SPAM, §4.4). Sin incentivos ni filtrado. | La cantidad y recencia de reseñas son factores locales clave | Bajo-medio: requiere una tabla de trabajos | Sí: amplía §5 y §7.4. Probablemente Fase 2 |
| 11 | **Google Business Profile y directorios:** categoría principal correcta y secundarias (verificar los nombres en el perfil), hasta 20 zonas, sin palabras clave en el nombre, fotos y posts semanales, y respuesta a todas las reseñas en EN/ES. Enlace del perfil con UTM (§3.5) y registro mensual de "Llamadas" y "Clics al sitio" del Rendimiento (§4.3). Nombre, dirección y teléfono idénticos en Bing Places, Apple Business Connect, Yelp, BBB y Nextdoor. Asociaciones: IREM Utah, CAI Utah, Utah Apartment Association, AGC y ABC de Utah (pueden cobrar cuota). | Lo que más pesa en el SEO local, además de dar leads directos | Bajo en el sitio (`sameAs` en el JSON-LD). Es tiempo del dueño. | Solo §8.5 (UTM y revisión mensual) |

### 4.2 Cambios técnicos que modifican el texto del documento

Ninguno cambia una decisión de negocio, pero todos requieren aprobación.

| Cambio | Motivo | ¿Afecta lo aprobado? |
|---|---|---|
| La confirmación al cliente **sin el texto libre** del visitante (notas), con un límite por destinatario (por ejemplo, 3 en 24 h). En el asunto del aviso, quitar CR/LF y limitar la longitud. | Hoy la confirmación incluye "el resumen" y se envía al correo que escribe el visitante. Alguien podría usar el formulario para mandar spam desde `blagalcleaning.com`. | Sí: §4.10 |
| Lighthouse con `aggregationMethod: 'median'`. Si el ruido de los runners bloquea publicaciones, pasar la velocidad a aviso y mantener accesibilidad y SEO como bloqueantes. | `median-run` no es la mediana de cada puntuación. La velocidad en runners compartidos fluctúa. | Sí: §9.1 (si se relaja la velocidad) |
| Comportamiento sin JavaScript en `/quote/` (ver §7) | Las Actions sin JS exigen `prerender = false`, y las listas de propiedades no viajan por `FormData` | Decisión nueva |
| Paso 4: textos A y B de §4.4, con su versión guardada en `consent_events`. Enlace "Privacy" destacado en el pie. | Prueba del consentimiento y requisito de CalOPPA | Sí: §4.6, §7.4 y pie |
| Plazos de conservación en lugar de "hasta que el dueño las borre" (§15): solicitudes no convertidas 24 o 36 meses; IP y user agent purgados a los N meses; `consent_events` y `suppression` 5 años o más. Borrado por Cron y declarado en Privacy. | Política verificable y menos datos expuestos. 64.1200(d)(6) pide respetar el "no llamar" 5 años, y la prescripción federal es de 4 años (28 USC 1658, n/v). | Sí: §15 y Privacy |
| `leads`, `lead_events`, `consent_events` y `suppression` en el respaldo semanal y en el paso de preservación de la restauración | Los leads manuales y las bajas no tienen copia en Gmail: una restauración con Time Travel los perdería sin dejar rastro | Sí: §11.2 y §11.3 |
| Referencia BLG-XXXXX única en `leads.reference`, copiada en `quote_requests` | Los leads manuales también reciben referencia, y hoy solo es única dentro de `quote_requests` | Sí: §4.8 y §7.4 |
| §5 deja de decir "las únicas rutas que modifican datos": se agregan las rutas de §4.3 y el botón de bajas | Panel de leads | Sí: §5 y §7.2 |
| Pasan a `needs_attention` con alerta inmediata: los eventos `email.suppressed`, `suppression.added` (origen bounce, complaint o manual) y `domain.updated`; un `bounced` o `complained` del Gmail del dueño; y los errores `daily_quota_exceeded`, `monthly_quota_exceeded`, `invalid_api_key`, `restricted_api_key`, `rate_limit_exceeded` y `security_error`. Además, comprobación diaria con `resend.suppressions.get('blagalcleaning@gmail.com')` y un botón en `/admin` para quitar la supresión (`resend.suppressions.remove`). | Si Resend suprime el Gmail del dueño, todos los avisos se pierden en silencio | Sí: §4.11 y §10.2 |
| Monitor externo: UptimeRobot queda pendiente de sus términos; se prefiere Better Stack Free con heartbeat o Healthchecks.io. `/api/health` incluye el latido del cron. Nuevos: endpoint `/api/ops/synthetic`, secreto `SYNTHETIC_TOKEN`, variable `ZERO_LEADS_DAYS`, tablas `ops_state` y `ops_counters`, y las alertas de §5.3. | Un interruptor dentro del Worker no ve la caída del propio Worker ni la de `send_email` | Sí: §7.2, §7.5, §8.6 y §10.2 |
| Binding `send_email` restringido con `destination_address` y `allowed_sender_addresses`, y respaldo por Resend si `send()` falla | Defensa en profundidad, y alertas aunque `send_email` deje de ser gratis | Sí: §7.5 y §8.2. El camino principal sigue siendo independiente de Resend |
| Las horas locales del respaldo (domingo 03:00) y del reporte (lunes 07:00) se calculan con `Intl` (America/Denver) dentro del cron de 5 minutos | Los Cron Triggers van en UTC, y el horario de verano desplaza la hora | Sí: §7.2 |
| Texto en Thank You y en la confirmación: "Si no ve nuestro correo, revise Spam o No deseado y agregue quotes@blagalcleaning.com a sus contactos" | Con un dominio nuevo, Outlook y M365 pueden mandarlo a No deseado | Sí: §4.9 y §4.10 (texto) |
| **Agregar a §9.1:** html-validate, Vitest en workerd, Betterleaks, `npm audit` y zizmor; un workflow semanal no bloqueante (lychee externo, pa11y, ZAP, Lighthouse a producción); pruebas de cabeceras de seguridad y de JSON-LD; pruebas de la casilla de SMS (aparece solo con texto o WhatsApp, viene sin marcar, no es obligatoria y guarda su versión); pruebas de transiciones de estado, motivo obligatorio, valor al ganar, alta manual con canal y origen, lead creado en el mismo lote, cifras del reporte con datos de prueba y reporte no duplicado. **Agregar a §9.2:** recorrido manual del formulario con teclado y lector de pantalla, y cronometrar el alta manual. | Cubren lo que hoy no verifica ninguna revisión. Un formulario inaccesible también es riesgo legal (ADA). | Aditivo a §9.1 y §9.2 |
| Página `/styleguide` privada (noindex, detrás de Access) con tokens y componentes EN/ES en todos sus estados | El dueño aprueba el diseño viéndolo, y sirve de objetivo fijo para las pruebas | Aditivo |
| Mantener el eje `wdth` de Archivo (90 KB) o quitarlo (35 KB) | El diseño lo usa en titulares y logo. **Recomendado: mantenerlo.** | Solo si se quita (§6.3) |
| Actualizar el prompt maestro (lista en §2.6) | Hoy cita herramientas deprecadas y no tiene la medición, lo legal ni la entrega de correo | No (documento de traspaso) |

### 4.3 Medición de la calidad del lead de punta a punta

Amplía las mejoras #1, #2, #8 y #9. Hoy el documento cuenta solicitudes del formulario sin estado comercial ni valor, y los leads por llamada, WhatsApp, SMS, recomendación o GBP no entran en D1. **Requiere aprobación.**

**Estados (lista cerrada, en español en el panel):**

`new` (Nuevo) → `contacted` (Contactado) → `site_visit` (Visita/walkthrough) → `quoted` (Cotizado) → uno de estos cierres:
- `won` (Ganado);
- `lost` (Perdido);
- `inactive` (Sin respuesta/en pausa);
- `disqualified` (No calificado: spam, duplicado, busca empleo o es proveedor, fuera de zona, servicio no ofrecido).

Reglas:
- **Saltos:** se puede saltar hacia adelante. Las fechas que faltan se rellenan con la hora del cambio.
- **Reapertura:** los cerrados se reabren con una nota, y el historial queda en `lead_events`.
- **Tasa de cierre** = ganados / (ganados + perdidos + inactivos). Los no calificados no cuentan, pero se reportan por origen como señal de calidad.
- **Motivo de cierre:** obligatorio para `lost`, `inactive` y `disqualified`. Lista cerrada: `price`, `chose_competitor`, `no_response`, `timing`, `project_cancelled`, `budget_not_approved`, `out_of_area`, `service_not_offered`, `requirements_not_met` (seguro, COI, badge), `too_small`, `spam`, `duplicate`, `job_or_vendor` y `other` (con nota).
- **Montos:** `quoted` pide monto único, mensual o ambos, y `won` lo prellena. `contract_months` es opcional; si falta, el reporte asume 12.
- **Valor primer año** = único + mensual × min(meses, 12). Es una convención propuesta, no un estándar.

**Ficha del lead en 1–2 clics:**
- El aviso al negocio (§4.10) y el reporte llevan un enlace "Abrir ficha" a `/admin/leads/BLG-XXXXX`.
- La ficha muestra solo los botones del siguiente paso, grandes y pensados para el celular:
  - "Cotizado" abre el campo de monto;
  - "Perdido" muestra los motivos como fichas de un toque;
  - el próximo seguimiento ofrece +2 días, +1 semana y +1 mes.
- Los GET solo leen y cada cambio es un POST (seguridad en §5.1).

**Alta manual (`/admin/leads/new`, menos de 30 s, a cronometrar con el dueño en §9.2):**

Botón fijo "+ Nuevo lead", que se puede guardar en la pantalla de inicio del teléfono. Orden de los campos:
1. **Canal** (obligatorio): Llamada, WhatsApp, SMS, Correo, En persona, Otro.
2. **¿Cómo nos encontró?** (obligatorio): Google Maps/perfil, Búsqueda en Google, Recomendación (y "¿quién?"), Cliente anterior, Sitio web, Vehículo/letrero, Redes, Otro, No sabe. "No sabe" cuenta como dato faltante.
3. **Segmento:** Property manager, HOA, Edificio comercial, Contratista general, Superintendente o gerente de obra, Casa, Otro.
4. **Nombre o empresa**, y teléfono o correo.
5. **Opcionales:** servicio, condado y nota (se puede pegar el chat de WhatsApp).
6. **"Ya hablé con él"**, activado por defecto: el lead queda en `contacted` con `response_measurable=0`. Si se apaga, el lead entra en "sin contactar".

Al guardar, se genera la referencia BLG-XXXXX y se avisa si el teléfono (en E.164) o el correo ya existen (`duplicate_of`). No lleva Turnstile, porque ya está detrás de Access, y usa el mismo Zod que el resto del panel.

**Esquema D1 (solo se agregan tablas, como exige §7.4):**
- **`leads`:**
  - Identificación: `id` (UUID), `reference` UNIQUE, `quote_request_id` UNIQUE NULL, `entry_mode` (`form` o `manual`).
  - Origen: `channel` (web_form, phone, whatsapp, sms, email, in_person, other) y `origin` (gbp, google_search, referral, repeat_client, other_website, direct, social, vehicle_sign, other, unknown). Además `origin_detail`, `how_heard_self`, los 4 UTM, `referrer_host`, `landing_path` y `no_ad_sharing`.
  - Cliente: `segment`, `request_type`, `primary_service` y `county`.
  - Contacto, solo en altas manuales: `contact_name`, `company`, `phone` (E.164) y `email`.
  - Estado y fechas: `status`, `status_changed_at`, `created_at`, `first_response_at`, `response_measurable`, `site_visit_at`, `quoted_at` y `closed_at`.
  - Montos en centavos enteros: `quote_one_time_cents`, `quote_monthly_cents`, `won_one_time_cents`, `won_monthly_cents`. Además `contract_months`.
  - Cierre: `close_reason`, `close_note` y `next_follow_up_at`.
  - Control: `lead_score`, `score_version`, `score_inputs_json`, `duplicate_of`, `is_test` (excluido de todos los conteos) y `updated_at`.
  - Índices: (status, next_follow_up_at), (created_at), (origin, created_at) y (segment, created_at).
- **`lead_events`** (solo se agregan filas): `lead_id`, `at`, `actor` (correo del JWT), `kind` (created, status, values, field, note, reopen), `from_value`, `to_value` y `note`.
- **`contact_clicks`:** clave primaria (day, kind, placement, origin) y `count`, que se suma con UPSERT.
- **`report_runs`:** `week_start` como clave primaria, `status`, `sent_at` y `error`.
- **`gbp_monthly`** (opcional): `month`, `views`, `calls`, `website_clicks` y `entered_at`.
- **`consent_events`** y **`suppression`:** ver §4.4.

Reglas del esquema:
- **Listas cerradas en Zod** (módulo `leads/lists`), no con CHECK de SQLite, que no se puede alterar sin reconstruir la tabla.
- **Lote atómico de §4.8:** `quote_requests` + `leads` + 2 avisos (+ `consent_events`).
- **Segmento deducido del cargo y del tipo de propiedad** (por ejemplo, Site Superintendent → `construction_manager`). El dueño puede corregirlo.

**Reporte semanal (lunes 07:00, America/Denver):**
- **Envío:**
  - Sale de la tarea de 5 minutos. Si en Denver es lunes a las 07:00 o más tarde y la semana no está en `report_runs`, se inserta con `ON CONFLICT DO NOTHING` y estado `sending`, se envía y se marca. Es el mismo patrón de lease que los avisos.
  - No suma Cron Triggers (de memoria, ~5 por cuenta en Free, n/v) y evita el problema del horario de verano.
  - Usa el binding `ALERT_EMAIL` con la sobrecarga builder (§3.8), sin gastar cuota de Resend.
  - Debe pesar menos de ~100 KB para que Gmail no lo recorte (~102 KB, n/v).
- **Semana:** solicitudes por canal; contactadas; mediana de primera respuesta y % en menos de 1 hora hábil (solo canales asíncronos); cotizadas, ganadas (único, mensual y valor primer año) y perdidas con su motivo.
- **Requieren acción** (cada una con su enlace): leads sin contactar, seguimientos vencidos, cotizaciones abiertas hace más de 7 días y datos incompletos (ganados sin valor, leads sin segmento u origen).
- **Últimos 90 días por cohorte, por origen y por segmento:** solicitudes, cotizadas, ganadas, tasa de cierre y valor primer año. Con menos de 5 cerrados se muestra "—" en lugar de un porcentaje.
- **Además:**
  - % de no calificados por origen, motivos de pérdida y pipeline abierto;
  - ciclo de venta y clics de contacto, con la nota "un clic no es una llamada";
  - calibración del `lead_score`, desde 30 cerrados;
  - el primer lunes del mes, el recordatorio de anotar las cifras de GBP.
- **Ejemplo de asunto (cifras inventadas):** `Blagal · Semana 19–25 oct · 9 solicitudes · 2 ganadas ($4,850 + $1,200/mes)`.

**Recalibrar el `lead_score` con 30–50 cerrados:**
1. **Desde el día 1:** guardar `score_version` y `score_inputs_json`, solo con los datos que se conocen al llegar el lead.
2. **Comprobación por terciles:** con 30 o más cerrados (sin no calificados ni pruebas, e idealmente con 10 o más ganados), comparar los terciles de puntuación con la tasa de cierre y el valor medio ganado. Si el tercil alto no gana más que el bajo, los pesos no sirven.
3. **Tasa por atributo:** para cada atributo conocido al llegar (segmento, tipo, servicio, recurrente, número de propiedades, condado, cargo, canal, origen, tamaño, fecha cercana, empresa indicada), calcular una tasa suavizada con un prior beta centrado en la tasa global p0, por ejemplo (ganados + 5·p0)/(n + 5). Luego, lift = tasa / p0.
4. **De lift a puntos:** 1,5 o más = +2; 1,15–1,5 = +1; 0,87–1,15 = 0; 0,67–0,87 = −1; menos de 0,67 = −2. Prioridad = probabilidad estimada × valor esperado del segmento.
5. **Sin regresión logística multivariable todavía.** La regla de ~10 eventos por variable (Peduzzi 1996) solo permite 1 o 2 variables con 10–15 ganados, y Riley 2020 (BMJ) pide aún más datos. Con estos tamaños, incluso los terciles son orientativos.
6. **Versiones:** publicar los nuevos pesos como v2, repuntuar solo los leads abiertos, comparar v1 y v2 en los siguientes 30 cerrados y repetir cada trimestre o cada 25 cerrados más. Se hace con SQL o con el CSV en una hoja de cálculo, sin librerías.

**Llamadas y Google Business Profile:**
- **Rendimiento del perfil** (de memoria, n/v): interacciones (llamadas, reservas, cómo llegar, clics al sitio), vistas por plataforma y dispositivo, y términos de búsqueda por mes.
  - "Llamadas" cuenta los toques en el botón, no las llamadas completadas, y no da detalle por llamada.
  - El historial de llamadas y el chat del perfil probablemente se retiraron hacia el 31-jul-2024. El dueño debe comprobarlo en su panel.
- **Indicador de tendencia:** leads con `origin=gbp` y `channel=phone` ÷ toques en "Llamar". Los toques incluyen clientes actuales, proveedores, gente que busca empleo y spam, así que el cociente será bajo por naturaleza. Solo sirve para comparar mes a mes.
- **Un solo número** publicado en el sitio, en GBP y en los directorios. La atribución de llamadas a $0 sale de tres piezas: la métrica de GBP, el contador de clics (§3.4) y la pregunta "¿Cómo nos encontró?".

**Cambios al documento:**
- **§5:**
  - La lista "Solicitudes" pasa a "Leads", con columnas referencia, fecha, cliente, segmento, origen, canal, estado, valor y días sin cambios. Filtros por estado, origen, segmento, canal y prueba. Por defecto, primero lo que requiere acción.
  - Nuevas: ficha del lead, alta manual, exportación CSV y vista de calibración.
  - Rutas `POST /api/admin/leads`, `POST /api/admin/leads/:id/status`, `POST /api/admin/leads/:id/values`, `POST /api/admin/gbp-monthly` y `GET /api/admin/leads.csv`.
  - "Marcar como prueba" también marca `leads.is_test`.
- **§7.4:** las tablas nuevas.
- **§4.8:** campos ocultos y el lote ampliado.
- **§4.10:** enlace "Abrir ficha" en el aviso al negocio.
- **§7.2:** rutas nuevas y reporte en la tarea de 5 minutos.
- **§7.3:** módulos `leads/`, `report/` y `track/`.
- **§7.6:** la página Privacy menciona sessionStorage y el conteo agregado de clics.
- **§8.5:** UTM en GBP y revisión mensual del Rendimiento.
- **§9.1:** pruebas (ver §4.2).
- **§10.2:** alerta "lead sin contactar".

### 4.4 Cumplimiento legal del embudo (EE. UU. y Utah)

**Base y límites:**
- Esta sección sale de conocimiento previo; las fuentes primarias estaban bloqueadas (n/v). **No es asesoría legal.**
- Como la TCPA fija daños por ley, conviene que un abogado de Utah revise `/privacy/` y los textos del paso 4. Costo: unos cientos de dólares por hora (n/v).
- Opciones de bajo costo:
  - Utah SBDC y SCORE (asesoría gratis, no legal);
  - clínicas de las facultades de Derecho de la University of Utah y de BYU;
  - servicio de referidos del Utah State Bar.

  Ninguna verificada hoy.

**Qué aplica a Blagal:**

| Norma | ¿Aplica? | Qué implica |
|---|---|---|
| Utah Consumer Privacy Act (13-61) | No. Exige ingresos de $25 M o más y además 100.000 consumidores (o el 50% de los ingresos por venta de datos y 25.000 consumidores), y excluye a quien actúa en contexto comercial | No prometer sus derechos. Enmiendas de 2025–2026 n/v |
| CCPA/CPRA (California) | No: umbral de ingresos de más de ~$26,6 M o 100.000 consumidores (n/v) | GPC es opcional (§3.3). AB 566 obliga a los navegadores desde 2027 (n/v) |
| CalOPPA (B&P 22575–22579) | Sí, pero solo protege a clientes residenciales de California, no a los leads B2B | Política con contenidos mínimos y enlace destacado. 30 días para corregir tras el aviso; hasta $2.500 por infracción vía la UCL |
| Delaware DOPPA; Nevada NRS 603A | Exige una política similar / solo si el negocio se dirige a Nevada (n/v) | La misma página lo cubre |
| Otras leyes estatales integrales (CO, CT, VA, OR, TX, NE…) | No: umbrales de 25.000–100.000 residentes. Texas y Nebraska solo prohíben vender datos sensibles sin consentimiento | "No vendemos datos" |
| FTC Act §5; Utah 13-11 (transacciones de consumo) | Sí | Todo lo que diga la política debe ser cierto |
| Utah 13-37 y 13-39 | No: no se venden datos, y 13-39 no aplica a limpieza | — |
| TCPA y reglas de la FCC; Utah 13-25a y 13-26 (n/v) | Sí | Ver "Mensajes y llamadas" |
| CAN-SPAM | Sí, también en B2B | Ver "Correo" |
| 16 CFR 465 y 255; Consumer Review Fairness Act | Sí | Ver "Reseñas y testimonios" |
| Utah 13-44 (filtraciones) | Los datos del lead no lo activan | Ver "Datos sensibles" |
| CIPA (Cal. Penal 631 y 638.51) | Hay demandas masivas por píxeles, session replay y chats de terceros. La SB 690 que los eximiría sigue pendiente (n/v) | Ninguno de esos en el sitio. Declarar Turnstile y Web Analytics |
| COPPA | No: el sitio no se dirige a menores de 13 | Una línea en la política |
| Utah AI Policy Act | Solo si una IA contesta a clientes | Ver §2.6 |
| Grabación de llamadas | Utah exige el consentimiento de una parte (77-23a-4, n/v); California, el de todas (Penal 632) | No grabar sin avisar |

**`/privacy/` propia (EN y ES):**
- **Base de $0:** plantillas Creative Commons de GitHub, `basecamp/policies` (CC BY 4.0) y `Automattic/legalmattic` (CC BY-SA 4.0), recortadas a lo que hace Blagal y citando la licencia. Su existencia y licencia no se verificaron.
  - No incrustar ni enlazar políticas alojadas por terceros (Termly, iubenda): como mucho, usarlas como lista de comprobación.
- **Contenido** (CalOPPA 22575(b)):
  1. Fecha de vigencia y de última actualización.
  2. Quiénes somos: nombre legal, email, teléfono y dirección postal.
  3. Datos que se piden en el formulario.
  4. Datos técnicos: IP (Cloudflare la procesa y se guarda como HMAC diario), navegador, referrer, página de entrada, UTM y gclid si se guardan, señales de Turnstile, estadísticas sin cookies, eventos del formulario y conteo agregado de clics.
  5. Usos: responder y cotizar, prestar el servicio, hacer seguimiento, pedir una reseña (con baja), medir qué genera solicitudes, prevenir abuso y cumplir la ley.
  6. Proveedores por categoría:
     - Cloudflare (alojamiento, D1, Turnstile, Web Analytics, Email Routing). Mencionar la adenda de privacidad de Turnstile si sus términos lo exigen (n/v).
     - Resend.
     - Google (Gmail; Google Ads solo si algún día se suben conversiones).
     - Meta/WhatsApp, si el cliente elige ese canal.
     - Autoridades, cuando la ley lo exija.

     Incluir "No vendemos sus datos" y "No compartimos su número móvil ni su consentimiento para mensajes de texto con terceros para fines de marketing". Esa frase la exige un futuro registro 10DLC.
  7. Que no hay píxeles publicitarios ni rastreo entre sitios (22575(b)(6)).
  8. DNT y GPC: "No rastreamos a los visitantes a lo largo del tiempo ni en sitios de terceros con fines publicitarios, por lo que la señal Do Not Track no cambia nuestras prácticas". Explicar también qué se hace con GPC (§3.3).
  9. Cookies: ninguna propia. Solo las de Turnstile y, para el personal, las de Access en `/admin`. sessionStorage guarda el borrador y la atribución en el dispositivo.
  10. Mensajes y llamadas: cómo se da el consentimiento, frecuencia, tarifas, STOP o BAJA, horario y que no es condición de compra.
  11. Conservación con plazos concretos (§4.2), y que los respaldos duran 90 días.
  12. Cómo revisar, corregir o borrar datos: por email, con un plazo (por ejemplo, 30 días). Sin prometer derechos de CCPA, GDPR ni UCPA.
  13. Seguridad, sin promesas absolutas, y aviso de filtración según la ley.
  14. Que el sitio no se dirige a menores de 13 años.
  15. Que las reseñas se citan con nombre de pila e inicial y se retiran a petición.
  16. Que los enlaces externos se rigen por sus propias políticas.
  17. Cómo se avisan los cambios importantes (22575(b)(3)).
- **Enlace:** en el pie de todas las páginas, con la palabra "Privacy" y destacado: en mayúsculas, en letra más grande o en un color que contraste. Un enlace gris pequeño no basta. En ES: "Privacidad (Privacy)".

**Textos del paso 4 (§4.6).** Con cada solicitud se guardan el id, la versión y el idioma de cada texto, porque EN y ES son versiones distintas.

**A) Privacidad, obligatoria.** Casilla sin marcar, o aviso junto al botón (la ley de EE. UU. no exige casilla). Nunca incluye SMS ni marketing.
- EN: "I have read the Privacy Policy and agree that Blagal Cleaning may use the information in this form to respond to my request and prepare my quote."
- ES: "Leí la Política de privacidad y acepto que Blagal Cleaning use la información de este formulario para responder a mi solicitud y preparar mi cotización."
- Alternativa sin casilla: "Al enviar, acepta que usemos sus datos para responder a su solicitud según nuestra Política de privacidad."

**B) SMS/WhatsApp, opcional.**
- **Cuándo aparece:** solo si el medio preferido es texto o WhatsApp. Va junto al teléfono, viene sin marcar y nunca es obligatoria para enviar.
- **Por qué:** para responder a mano no hace falta legalmente, porque elegir ese medio ya es una invitación. Pero es la mejor prueba y prepara la automatización.
- **Si una sola casilla cubre los dos canales:** nombrar SMS, WhatsApp y Blagal Cleaning. La política de WhatsApp aplica también a la Business App.
- EN: "Text me about this request. I agree that Blagal Cleaning may send me text messages by [SMS/WhatsApp] at the phone number above about my quote, scheduling and service updates. Agreeing is not required to buy any service. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our Privacy Policy."
- ES: "Envíenme mensajes sobre esta solicitud. Acepto que Blagal Cleaning me envíe mensajes de texto por [SMS/WhatsApp] al teléfono indicado arriba sobre mi cotización, la programación y avisos del servicio. No es necesario aceptar para contratar ningún servicio. La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responda STOP o BAJA para dejar de recibirlos, o AYUDA para pedir ayuda. Consulte nuestra Política de privacidad."
- **Si queda sin marcar,** mostrar: "Le contactaremos por llamada o correo."
- **Si algún día hay recordatorios automáticos,** añadir "including automated reminders / incluidos recordatorios automáticos" y subir la versión del texto.

**C) Marketing por SMS: no en la v1.** Si se añade, irá en una casilla aparte y sin marcar, con:
- aviso de que se usa tecnología automatizada;
- "Consent is not a condition of any purchase" (64.1200(f)(9));
- frecuencia, tarifas y STOP/HELP.

**D) Qué se guarda en `consent_events`:**
- consentimiento (sí o no), canal y teléfono;
- id, versión e idioma del texto;
- fecha y hora UTC, URL, IP en HMAC y user agent.

Las bajas se guardan con fecha y canal.

**Mensajes y llamadas (TCPA y FCC):**
- **Textos = llamadas.** Los textos cuentan como llamadas, y en dic-2023 la FCC aplicó el registro nacional "no llamar" (DNC) a los textos. Tratar SMS y, por prudencia, WhatsApp como llamadas.
- **Respuestas P2P.** Las respuestas escritas a mano desde el teléfono o la WhatsApp Business App no necesitan registro 10DLC. Tras *Facebook v. Duguid* (2021), un teléfono normal no es un sistema de marcación automática (ATDS).
  - Las apps de envío masivo o las campañas programadas reabren el riesgo.
  - La Business App prohíbe los mensajes automáticos o masivos.
- **Relación comercial (EBR).** Dura 3 meses tras una consulta y 18 tras una compra (64.1200(f)(5)). Después, no hacer seguimiento comercial a números inscritos en el DNC sin permiso escrito.
- **Horario.** De 8 a.m. a 9 p.m., hora del destinatario. Es obligatorio para las llamadas de venta y buena práctica siempre. Utah 13-25a podría prohibir domingos y festivos, y 13-26 exige un registro con exenciones (n/v).
- **Revocación** (regla de la FCC, vigente desde el 11-abr-2025):
  - Vale cualquier medio razonable: STOP, QUIT, END, REVOKE, OPT OUT, CANCEL, UNSUBSCRIBE, y también ALTO, BAJA, PARAR y CANCELAR.
  - Plazo para cumplir: 10 días hábiles.
  - Un solo texto de confirmación, dentro de los 5 minutos.
  - La parte "revoke-all" se aplazó al menos hasta abr-2026, quizá hasta 2027 (n/v). Conviene diseñar como si una baja lo cubriera todo.
- **Lista interna.** Lista y política escrita de "no llamar" (64.1200(d)), respetadas durante 5 años (64.1200(d)(6)).
- **Daños y jurisprudencia.**
  - $500 por infracción y hasta $1.500 si es deliberada.
  - La regla "one-to-one" fue anulada (*IMC v. FCC*, 11th Cir., 24-ene-2025).
  - Tras *McLaughlin v. McKesson* (20-jun-2025), los tribunales ya no están obligados a seguir a la FCC, y algunos discrepan sobre si un SMS es "llamada" para el DNC. El riesgo es menos predecible, pero el diseño no cambia.
- **Leyes de otros estados.** Las "mini-TCPA" se activan por el código de área: Florida (FTSA), Oklahoma, Maryland y Texas (SB 140, desde el 1-sep-2025). Un cliente de Utah con número de otro estado puede quedar cubierto por ellas.
- **A2P 10DLC.** Solo hace falta si se envían SMS desde una app o API, incluida una confirmación automática del formulario.
  - Desde el 1-feb-2025 los operadores bloquean el tráfico no registrado.
  - Existe la marca Sole Proprietor, que no exige EIN.
  - Para poco volumen, la alternativa más barata es un número toll-free verificado.
  - No cuesta $0: el registro va de unos pocos dólares a ~$45, la revisión de campaña cuesta ~$15, más $1,50–$10 al mes y el costo por mensaje (n/v).
  - Queda para después del lanzamiento.

**Correo (CAN-SPAM, 15 USC 7701 y ss.; 16 CFR 316):**
- **Correos transaccionales:**
  - La confirmación "recibimos su solicitud", sin promociones, es transaccional, pero igual exige encabezados veraces.
  - Si se le añade publicidad, el asunto y el inicio deben ser transaccionales.
  - Las respuestas uno a uno desde Gmail para cotizar son transaccionales. La cotización que pide el cliente es zona gris.
- **El correo de reseña se trata como comercial.** Eso exige:
  - remitente identificado y asunto no engañoso;
  - identificarlo como solicitud ("Le pedimos una reseña"), salvo que haya consentimiento afirmativo previo (7704(a)(5)(A)(i));
  - una baja que funcione al menos 30 días (7704(a)(3)) y se cumpla en 10 días hábiles (7704(a)(4));
  - no cobrar ni pedir más datos para darse de baja (316.5);
  - una dirección postal válida.
- **Dirección válida** (316.2(p)):
  - Sirven la dirección actual del remitente, un apartado de USPS o un buzón CMRA registrado con el PS Form 1583. Los dos últimos tienen costo, y el Form 1583 pide verificar la identidad (n/v).
  - La dirección de un agente registrado no vale, salvo que ese servicio opere como CMRA.
  - La opción de $0 es poner el domicilio real solo en el pie de los correos comerciales. No obliga a cambiar el perfil de zona de servicio en GBP.
- **Alcance y multas.** No exime el B2B. No da acción a particulares: solo a la FTC, los fiscales estatales y los proveedores de Internet. Multa de hasta $53.088 por correo (cifra de 2025; la de 2026 n/v).
- **Firma de Gmail y plantilla de Resend.** Fijas, con nombre legal, dirección y "Si no desea más correos de Blagal Cleaning, responda BAJA". La baja por respuesta se considera válida (n/v).
- **`List-Unsubscribe` de un clic** (RFC 8058): solo es obligatorio para envíos masivos, pero es gratis.

**Reseñas y testimonios** (16 CFR 465, vigente desde el 21-oct-2024; Guías de Endosos de 2023, 16 CFR 255; Consumer Review Fairness Act; política de Google):
- **Prohibido:**
  - reseñas falsas o escritas o "mejoradas" con IA (465.2);
  - reutilizar reseñas de otro servicio (465.3);
  - incentivos condicionados a una opinión (465.4). Google prohíbe cualquier incentivo, aunque sea neutral;
  - reseñas del dueño, de familiares o de empleados sin revelar la relación, o pedírselas sin indicarles que la revelen (465.5);
  - presentar como independiente un sitio de reseñas propio (465.6);
  - amenazas legales injustificadas o cláusulas anti-reseña en contratos o cotizaciones (465.7(a) y CRFA);
  - seguidores o "likes" falsos (465.8);
  - el "review gating" (pedir reseñas solo a los clientes contentos) o cualquier filtro por satisfacción en `/admin` (política de Google, guía de la FTC de 2022 y 255.2(e));
  - promedios calculados con reseñas elegidas, y editar el sentido de una reseña;
  - fotos de stock presentadas como clientes;
  - `AggregateRating` propio;
  - pedir reseñas por SMS automático.
- **Base legal:** el 465.7(b), que prohíbe ocultar las negativas dando a entender que se muestran todas, rige las reseñas enviadas al propio sitio. Para reseñas de Google copiadas a mano, la base es la FTC Act §5 y el 255.0–255.2.
- **Permitido:**
  - pedir reseña a **todos** los clientes con servicio terminado, con un criterio neutro, por correo, con un recordatorio como máximo y excluyendo la lista de supresión;
  - mostrar 3–6 reseñas reales como "Reseñas destacadas", nunca como "todas" ni como "lo que dicen nuestros clientes" sin matiz. Van junto al servicio al que se refieren, con prueba de cualquier resultado concreto que citen y con "Ver todas en Google";
  - usar nombre de pila e inicial, o pedir permiso (Utah 45-3, n/v);
  - testimonios y logos B2B con autorización escrita;
  - responder en público y con profesionalidad a las reseñas negativas;
  - encuestas internas, siempre que no condicionen la invitación a Google;
  - ocultar en el sitio propio solo contenido ilegal u ofensivo, con el mismo criterio para todas.
- **Formulario de autorización de testimonios:** "Autorizo publicar mi comentario con mi nombre de pila, inicial, cargo y empresa; puedo retirarlo escribiendo a …".
- **Caso de referencia:** Fashion Nova (FTC, ene-2022, $4,2 M) retenía en su web las reseñas de 1 a 3 estrellas.

**Datos sensibles y filtraciones (Utah 13-44):**
- "Personal information" es el nombre junto con un SSN, una cuenta o tarjeta con su código, o una licencia o ID. Nombre, email, teléfono y dirección guardados en D1 no activan el aviso de 13-44-202.
- Si se activara: 500 o más residentes afectados obligan a avisar al Fiscal General y al Utah Cyber Center; 1.000 o más, también a las agencias de crédito (n/v).
- Riesgo indirecto: que alguien escriba esos datos en Notas (la mitigación está en §3.3).
- California incluye "usuario o email + contraseña", pero el sitio no guarda contraseñas porque Access gestiona `/admin`.

**Consentimientos y bajas en D1:**
- **Tablas:** `consent_events` (punto D) y `suppression`, una lista única con STOP/BAJA, "no llamar" y bajas de correo. La consultan `/admin` y los correos de reseña.
- **Botón en `/admin`** para anotar las bajas recibidas por WhatsApp, Gmail o teléfono.
- **Regla operativa:** consultar `/admin` antes de escribir desde Gmail o desde el teléfono, porque esos seguimientos se saltan la lista.
- **Política interna de "no llamar" de 1 página en el runbook:**
  - horario de 8 a.m. a 9 p.m.;
  - sin marketing en domingos ni festivos, por prudencia;
  - identificarse siempre;
  - cumplir las bajas en 10 días hábiles;
  - respetar los plazos de la relación comercial (EBR).

---

## 5. Seguridad

### 5.1 Qué cubre el stack

| Riesgo (OWASP Top 10 2025) | Control |
|---|---|
| XSS (A05) | `security.csp` de Astro con hashes: va como `<meta>` en las páginas estáticas y como **cabecera** en las dinámicas. Por eso el middleware usa `headers.append` y **nunca `set`**, que borraría los hashes. `@alpinejs/csp`, sin `x-html` / `set:html` / `innerHTML` (reglas de lint y de security-guidance). Escapar todo en `/admin` y en los correos. Desactivar Rocket Loader. |
| Clickjacking y cabeceras | `public/_headers` en `/*`: HSTS (`includeSubDomains`, sin `preload` hasta confirmar los subdominios), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY` y una segunda CSP con `frame-ancestors 'none'; object-src 'none'; base-uri 'self'` (el `<meta>` no admite `frame-ancestors`). Las mismas cabeceras en el middleware para `/api/*` y `/_actions/*`, porque `_headers` no se aplica a las respuestas del Worker. |
| CSP permitida | `script-src`: `'self'`, `https://challenges.cloudflare.com`, `https://static.cloudflareinsights.com`. `frame-src`: `https://challenges.cloudflare.com`. `connect-src`: `'self'` (incluye `/api/click`), `https://cloudflareinsights.com`. Fragmento **manual** del beacon de analítica. Sin `strictDynamic`. |
| Bots y spam (formulario) | `siteverify` comprobando `success`, `hostname` (desde una variable, para que funcione en la vista previa) y `action`, con `idempotency_key`. Honeypot y límites en 2 capas (ya en el documento). Zod `strictObject` con `.max()` en cada campo y un máximo de 20 propiedades. `security.actionBodySizeLimit` en ~128 KB (por defecto es 1 MB). |
| CSRF | `checkOrigin` (activado por defecto) solo cubre peticiones de formulario. Las peticiones JSON dependen de CORS y de Turnstile. Las acciones del panel (`/api/admin/*`, incluidas las de §4.3) son siempre POST y verifican el encabezado Origin. Un GET nunca modifica datos, porque los escáneres de enlaces del correo abren los GET. Revisar que la cookie `CF_Authorization` sea SameSite Lax o Strict (configurable en Access, n/v). |
| Acceso a `/admin` (A01) | Access en `/admin*` y `/api/admin*`, y JWT verificado con `jose` en cada ruta: `RS256`, `issuer`, `audience`, `exp`, correo exacto y JWKS cacheado a nivel de módulo. **Mantener las acciones del panel como rutas `/api/admin/*`** (como dice el documento), porque las Astro Actions viven en `/_actions/*`, fuera de Access. Rutas del panel con `prerender = false`. Sesión de Access más larga para el dueño (máximo n/v; de memoria, 1 mes). En iOS, el navegador interno de Gmail puede no compartir cookies: abrir los enlaces en Safari o Chrome (n/v). Alternativa: Google como proveedor de identidad en Access, con un cliente OAuth que se configura una sola vez (n/v). |
| Webhooks falsos (A08) | `resend.webhooks.verify({ payload: await request.text(), headers: { id: h.get('svix-id'), timestamp: h.get('svix-timestamp'), signature: h.get('svix-signature') }, webhookSecret })`. **Pasar el objeto `Headers` de la petición tal cual hace fallar la verificación.** Deduplicar por `svix-id` con UNIQUE en D1. |
| Inyección SQL | `prepare().bind()` siempre |
| Secretos | `astro:env` con `access: 'secret'` + `wrangler secret` + secretos de GitHub. Nunca con prefijo `PUBLIC_`. Betterleaks en CI. |
| Cadena de suministro (A03) | `npm ci` con lockfile. npm 12 con `allowScripts` y `strict-allow-scripts=true` (aprobar solo workerd, esbuild y sharp). `min-release-age=3` (con `min-release-age-exclude` para parches urgentes). Dependabot con cooldown y grupos. `npm audit --audit-level=high` y `npm audit signatures` (la provenance no prueba que el paquete esté limpio). |
| Pipeline | Sin `pull_request_target`. Token de Cloudflare mínimo: Workers Scripts:Edit + D1:Edit, y Workers Routes:Edit de la zona si se usan rutas. Fijar `CLOUDFLARE_ACCOUNT_ID`. Los workflows que lanza Dependabot no reciben secretos, así que no pueden desplegar. |
| DNS y correo | DNSSEC, SPF y DKIM (ya en el documento). **Añadir DMARC** con DMARC Management y el plan de §5.3 (de `p=none` a `quarantine`), y CAA. Always Use HTTPS, HSTS en el panel y TLS ≥1.2. 2FA en Cloudflare, GitHub, Resend y Google. |
| Registro y alertas (A09) | `send_email` (ya en el documento). Propuesta: endpoint `/api/csp-report` + `Content-Security-Policy-Report-Only` para ver roturas de la CSP. Añadir `/.well-known/security.txt`. Latido externo y detección de fallos silenciosos (§5.3). |
| Datos personales | HMAC de la IP y R2 privado (ya en el documento). Plazos de conservación concretos (§4.2) y minimización (§3.3). Programa escrito de ciberseguridad (opcional, después del lanzamiento): la defensa afirmativa de Utah (78B-4-701 a 706) solo vale si el programa existía antes de la filtración y sigue un marco reconocido (NIST CSF, CIS Controls, ISO 27001). Como los datos del lead no son "personal information" según 13-44-102, su valor es sobre todo operativo. |

### 5.2 Repositorio privado: qué es gratis y qué no

| Gratis | No gratis / no disponible en GitHub Free privado |
|---|---|
| Dependabot (alertas, actualizaciones de seguridad y de versión; se activa a mano) | CodeQL / code scanning (Code Security, ~$30 por committer al mes y requiere organización Team) |
| GitHub Actions (~2.000 min al mes, n/v; 500 MB de artefactos) | Secret scanning y push protection (Secret Protection, ~$19 por committer al mes) |
| `npm audit` / `npm audit signatures`, npm 12 `allowScripts` | `dependency-review-action` |
| Betterleaks o TruffleHog, OSV-Scanner (sin subir SARIF), Semgrep CE, plugins de seguridad de ESLint, zizmor, actionlint | Protección de ramas y rulesets (Pro, ~$4 al mes, o Team) |
| ZAP baseline (Docker), MDN Observatory | Environments y sus secretos (Pro o Team); revisores obligatorios (Enterprise) |
| `/security-review` y la capa de patrones de security-guidance (sus revisiones con modelo gastan cuota) | Subida de SARIF / alertas de code scanning |
| Cloudflare: Turnstile, Access (gratis hasta 50 usuarios según terceros, n/v), 1 regla WAF de rate limiting (periodo de 10 s) | Rate Limiting binding en Workers Free: **no confirmado oficialmente** |
| Cloudflare: Email Routing, `send_email` a un destino verificado (gratuidad tras Email Service n/v), DMARC Management (n/v) | Email Sending (de memoria, Workers Paid con cobro por mensaje, n/v); Standalone Health Checks (Pro, ~$20–25 al mes, n/v); SMS automáticos (10DLC o toll-free, con costos) |

**Consecuencia:** la condición para publicar vive en `needs:` dentro del workflow. Un cambio puede quedar en `main` con revisiones fallidas, pero no se publica. Esto ya está aceptado en §8.3.

### 5.3 Entrega del lead al Gmail y fallos silenciosos

Hay tres emisores:
- **Resend:** aviso al negocio y confirmación al cliente, desde quotes@.
- **`send_email`:** alertas, desde alerts@.
- **Reenvío de Email Routing:** quotes@ y alerts@ hacia el Gmail del dueño.

**Registros DNS de blagalcleaning.com.** Los valores son de memoria: confirmarlos con `wrangler email routing dns get` y en el panel de Resend antes de publicarlos.

| Registro | Valor | Quién lo gestiona |
|---|---|---|
| MX del raíz | `route1/2/3.mx.cloudflare.net` (prioridades del panel) | Email Routing (lo crea y bloquea) |
| TXT del raíz (SPF, único) | `v=spf1 include:_spf.mx.cloudflare.net ~all` | Email Routing (lo crea y bloquea). **Sin** `include:amazonses.com`. Un emisor futuro (QuickBooks, Jobber…) se añade aquí, vigilando el límite de 10 búsquedas DNS |
| TXT `cf2024-1._domainkey` | DKIM de Cloudflare (selector n/v) | Email Routing. El SDK confirma que bloquea MX y SPF, no el DKIM |
| MX `send` | `10 feedback-smtp.us-east-1.amazonses.com` | Resend |
| TXT `send` | `v=spf1 include:amazonses.com ~all` | Resend |
| TXT `resend._domainkey` | `p=<clave de Resend>` | Resend |
| TXT `_dmarc` | `v=DMARC1; p=none; rua=mailto:<prefijo>@<dominio de Cloudflare>` | Se crea a mano con `p=none`. Al activar DMARC Management, Cloudflare asegura el rua (prefijo hex de 32 caracteres; dominio n/v). No editar el rua después. Alineación relajada, sin `pct` ni `ruf` |

**Alineación esperada:**
- **Resend** pasa DMARC por dos vías: DKIM con `d=blagalcleaning.com` y SPF relajado de `send.`.
- **`send_email`** probablemente pasa por DKIM `cf2024-1` (n/v; se comprueba en la prueba previa).
- **El correo reenviado** conserva el From del cliente y no cuenta en los informes de blagalcleaning.com.

**Plan DMARC:**
1. **Semana 0 (antes del lanzamiento):** `p=none` con rua, más la prueba de bandeja.
2. **Semanas 1–3:** revisar DMARC Management cada semana (`approved_sources` y `status`). Solo deben aparecer Amazon SES (Resend) y Cloudflare, con un 98–100% de aprobados. Cualquier otra fuente es suplantación o un emisor olvidado que hay que autorizar.
3. **`p=quarantine`** cuando se cumplan dos condiciones: 14 días seguidos sin fallos legítimos, y una alerta de alerts@ con `dmarc=pass` en "Mostrar original". Si las alertas no alinean, quarantine las mandaría a spam.
4. **`p=reject`:** opcional después de 30 días estables. Protege a los clientes del phishing que imite a Blagal.

Urge salir de `p=none`: mientras siga así, el filtro "Nunca enviar a Spam" también deja pasar correos falsos con From quotes@.

**Reenvío (Email Routing):**
- **SRS y ARC.** Cloudflare reescribe el remitente del sobre con SRS (por eso el SPF del raíz incluye `_spf.mx.cloudflare.net`) y añade cabeceras ARC (n/v).
- **Catch-all en Drop,** con reglas explícitas solo para quotes@ y alerts@. alerts@ recibe también las respuestas y los rebotes de las alertas.
- **Sin bucles:** Gmail nunca reenvía ni responde automáticamente hacia el dominio.
- **Rechazos raros:** remitentes con `p=reject` y DKIM roto, como algunas listas de correo.
- **Reply-To:** el aviso al dueño lleva el correo del cliente (ya en §4.10). Para la confirmación, quotes@ o el Gmail directo es una pregunta abierta.

**Pasos para el dueño.** Los filtros se crean en Gmail desde una computadora; la app del celular no los crea.
1. Abrir las opciones de búsqueda y escribir en "De": `quotes@blagalcleaning.com OR alerts@blagalcleaning.com`. Pulsar "Crear filtro".
2. Marcar "No enviar nunca a Spam", "Marcar siempre como importante", "Categorizar como: Principal" y "Aplicar la etiqueta: Blagal".
   - Opcional: un segundo filtro solo para alerts@, con la etiqueta "Blagal/Alertas" y estrella.
   - Añadir el filtro de `[HOT]` de §4.1 #4.
3. Guardar quotes@ y alerts@ en Contactos.
4. En la app del celular, poner las notificaciones en "Todos", o confirmar que los correos importantes avisan.
5. Comprobar un correo: abrirlo, ir a los tres puntos y pulsar "Mostrar original". Debe decir:
   - SPF PASS;
   - DKIM PASS con `blagalcleaning.com` (si dice amazonses.com o resend, no está alineado);
   - DMARC PASS.

   Hacerlo con un aviso, una confirmación y una alerta, y guardar capturas en el runbook.

Los nombres de las opciones en español pueden variar. Sin verificar: si Gmail ignora el filtro cuando falla DMARC. El filtro tampoco quita los avisos de phishing de Gmail.

**Prueba de bandeja antes del lanzamiento ($0):**
- **Cuentas:**
  - el Gmail del dueño y un Gmail de prueba nuevo;
  - una cuenta Outlook.com gratis;
  - para Microsoft 365, 1 o 2 clientes o conocidos que acepten ayudar. El sandbox de desarrollador quedó restringido en 2024 (n/v) y la prueba de M365 pide tarjeta.
- **Matriz:**
  - Resend → aviso al Gmail del dueño, primero sin filtro y luego con filtro;
  - Resend → confirmaciones EN y ES a Gmail, Outlook.com y M365;
  - `send_email` → alerta de prueba, con un botón "Enviar alerta de prueba" en `/admin`;
  - Outlook.com → quotes@ (reenvío) y respuesta a una confirmación.
- **Qué anotar:** carpeta o pestaña, autenticación y demora. En Outlook: "Ver origen del mensaje" y buscar `Authentication-Results` con spf, dkim y dmarc=pass, y `compauth=pass`.
- **Cuándo repetir:** a las 24 horas y el día del lanzamiento (§9.3).
- **Criterio de aprobación:** 100% de autenticación aprobada, avisos en Principal con el filtro y confirmaciones fuera de Spam en Gmail y Outlook.com.
- **Contexto:** los requisitos de Gmail (feb-2024, con más rechazos desde nov-2025) y de Outlook.com (5-may-2025, error 550 5.7.515) solo son obligatorios por encima de 5.000 correos al día. Aquí sirven de guía (n/v).
- **Diagnóstico:** `npx mailauth report mensaje.eml`, Google Admin Toolbox Messageheader, learndmarc.com y mail-tester.com (gratis con límites; n/v).

**Detección de fallos silenciosos (todo a $0):**

1. **Monitor externo** cada 3–5 minutos sobre `/api/health` (palabra "ok") y `/quote/` (estado 200). `/api/health` da 503 si D1 falla o si el latido del cron de 5 minutos tiene más de 15 minutos.

2. **Latido externo (interruptor de hombre muerto):** después de cada ciclo correcto, el cron hace ping a un heartbeat de Better Stack o Healthchecks.io, y ese servicio avisa al Gmail por su propio canal. Es lo único que detecta la caída del Worker, del cron o de los dos canales de alerta a la vez.

3. **Control sintético diario en GitHub Actions:**
   - **Configuración:** cron `23 13 * * *` UTC (07:23 MDT / 06:23 MST) más `workflow_dispatch`; timeout de 10 minutos; `permissions: contents: read, issues: write`; acciones fijadas por SHA; caché de `~/.cache/ms-playwright`.
   - **Recorrido de `/quote/` y `/es/quote/`:**
     - `addInitScript` registra los eventos `securitypolicyviolation` en `window.__csp`.
     - `pageerror` y `console` registran errores, ignorando los que vienen de `challenges.cloudflare.com`.
     - `response` registra las respuestas 4xx y 5xx del propio origen.
     - `page.route('**/_actions/**', r => r.abort())` impide crear leads.
     - Llega al paso 4 con `data-testid`: Property Cleaning, Salt Lake City, un servicio y el contacto "Synthetic Check".
     - Comprueba `[data-quote-ready="1"]` (marca que pone `x-init` y demuestra que el JS arrancó).
     - Comprueba que aparece el iframe de Turnstile con `expect.poll(() => page.frames().some(f => f.url().startsWith('https://challenges.cloudflare.com/')))`.
     - Comprueba que existe el campo `cf-turnstile-response` y que la lista de errores y `__csp` están vacías.
     - Nunca pulsa Enviar.
   - **Resultado:** POST firmado (`Bearer SYNTHETIC_TOKEN`) a `/api/ops/synthetic`. Si falla, el Worker alerta por `send_email` con límite de frecuencia, y el job abre o comenta un issue deduplicado con la etiqueta `synthetic` y la traza guardada 7 días.
   - **Antes del lanzamiento,** con Access activo: no se ejecuta, o usa cabeceras de un service token de Access solo para el propio origen.
   - **Costo y límites:** unos 60–90 minutos al mes. El schedule puede retrasarse. La desactivación tras 60 días sin actividad aplica a repos públicos (n/v en 2026). El correo de fallo va a quien editó el cron por última vez.

4. **Interruptor del sintético:** el cron del Worker alerta si no llega un ok del sintético en 26 horas. Cubre la prueba rota, el workflow desactivado, los minutos agotados y una caída de GitHub.

5. **Cero solicitudes:**
   - Una vez al día se ejecuta `SELECT MAX(created_at) FROM quote_requests WHERE is_test = 0`.
   - Si pasaron más de `ZERO_LEADS_DAYS` (7 al inicio; luego ~1,5 × el hueco p95 observado), alerta como máximo cada 72 horas, con el estado del último sintético, para distinguir "sin demanda" de "formulario roto".
   - Solo funciona con `PUBLIC_LAUNCHED=true`.
   - Contadores diarios en `ops_counters` (fallos de siteverify, errores de validación, envíos), con alerta si hay 5 o más fallos de Turnstile y 0 envíos en un día.

6. **Supresiones y cuotas de Resend:** eventos y comprobación diaria descritos en §4.2.

7. **Detector de desajustes de DNS** en el cron semanal: consultas DoH a `https://cloudflare-dns.com/dns-query` (`application/dns-json`, sin token) de los MX y TXT del raíz, `send.`, `resend._domainkey` y `_dmarc`, comparadas con los valores esperados. Opcional, con un token de solo lectura: el estado de Email Routing (`ready` frente a `misconfigured`) y el de DMARC Management.

8. **Resumen semanal de los lunes desde alerts@** (§4.3). Sirve de latido del canal de alertas: si un lunes no llega, algo falla.

9. **Canario de correo** (opcional, después del lanzamiento):
   - un correo diario por Resend a `canary@`, o a `quotes+canary@` si el subaddressing está activo, que un Email Worker registra;
   - detecta una clave revocada, un dominio desverificado o un DKIM roto;
   - gasta ~30 de los 3.000 correos al mes y cuenta en el límite de 100 al día;
   - sin verificar: si el Email Worker recibe `Authentication-Results`.

Estado en D1: `ops_state` (`last_cron_at`, `synthetic_ok_at`, `last_zero_alert_at`) y `ops_counters` (día, métrica, conteo).

---

## 6. Descartados importantes y por qué

| Descartado | Motivo |
|---|---|
| Astro 6.x / `@astrojs/cloudflare` 13.x | 6.4.8 tiene 6 avisos de seguridad, entre ellos uno crítico (GHSA-26w7-cxv4-gfx2), y la serie 6 no recibe versiones desde junio de 2026 |
| `@astrojs/alpinejs` y Alpine estándar | Inyecta `alpinejs` en todas las páginas y obliga a usar `'unsafe-eval'` |
| `<ClientRouter />` | Incompatible con la CSP de Astro |
| `@astrojs/tailwind`, `@astrolib/seo`, `astro-i18next`, `astro-robots-txt`, `astro-font` | Solo funcionan hasta Astro 5 o Tailwind 3, están abandonados o sobran |
| `astro-seo-schema` | Su peer `schema-dts ^1` choca con la 2.1.0 (ERESOLVE) |
| `@astrojs/partytown` | No hay scripts de terceros que mover y complica la CSP |
| Proveedores de fuentes `npm()` / `fontsource()` por defecto | Descargan de jsDelivr al compilar (`@latest`), lo que rompe la reproducibilidad. jsDelivr está bloqueado en este entorno. |
| Servicio de imágenes por defecto (`cloudflare-binding`) | Depende de la cuota de Cloudflare Images; `compile` cuesta $0 |
| Flowbite, Preline (y ScrewFast como base), Starwind, Pines, Tailwind Plus | JS propio que duplica a Alpine. Licencia "Fair Use" en Preline. Pines usa marcado de Tailwind v3. Tailwind Plus es de pago. |
| daisyUI, Basecoat | Segundo vocabulario de clases. Basecoat, como mucho, para `/admin`. |
| Astroship | Licencia GPL-3.0 |
| AstroWind o accessible-astro como dependencia o base | Solo sirven de referencia: CSS global y scripts `is:inline` que la CSP bloquea |
| `img-comparison-slider` | No tiene ARIA; se reemplaza por un componente propio con `<input type="range">` |
| `glhd/alpine-wizard`, `intl-tel-input`, `libphonenumber-js` en el navegador | Abandonado (2022), innecesario, o 36 KB gzip en el cliente |
| Widgets de reseñas / Google Places API | JS de terceros que rompe la CSP y suma riesgo CIPA. Los términos de Google Maps Platform limitan el cacheo, y la API devuelve pocas reseñas y pide tarjeta y factura. No dan estrellas en Google. Si además filtran por 4–5 estrellas dando a entender que son todas, repiten el patrón de Fashion Nova. |
| Review gating, incentivos por reseñas, reseñas del dueño, familiares o empleados sin revelar la relación | Política de Google, guía de la FTC de 2022, 255.2(e) y 465.4–465.5 |
| Píxeles (Meta, TikTok), session replay y chats de terceros | Demandas masivas bajo CIPA. Obligarían a rehacer la política, la CSP y la sección de terceros |
| Generadores de políticas incrustados o alojados por terceros (Termly, iubenda) | Texto genérico con derechos de CCPA o GDPR que no aplican, más un script de terceros. Como mucho, sirven de lista de comprobación |
| Dirección de agente registrado en el pie de los correos | 316.2(p) no la contempla, salvo que el servicio opere como CMRA con el Form 1583 |
| SMS automáticos o de marketing en la v1 | Exigen consentimiento escrito previo y registro 10DLC o toll-free, con costos |
| Google Voice gratis como segunda línea; seguimiento de llamadas de pago (CallRail, ~$45 al mes n/v) | Google Voice gratis es para uso personal, puede recuperar números sin actividad (~3 meses) y añade otro teléfono que atender (la versión para Workspace es de pago). El seguimiento de pago rompe los $0. |
| Business Profile Performance API | Exige solicitar acceso (cuota 0 por defecto), un proyecto de Google Cloud y OAuth con token de actualización. Para una sola ubicación basta anotar los datos a mano cada mes |
| `simple-statistics` | SQL en D1 y JS simple bastan para terciles y tasas |
| Cloudflare Email Sending (por ahora) | No hace falta, porque Resend cubre los envíos. Requiere un "entitlement", usa el return path `cf-bounce.<dominio>` y su precio no está verificado (de memoria, Workers Paid con cobro por mensaje). La etiqueta "open beta" de wrangler no sirve para descartarlo: cubre todo `wrangler email`, incluido Email Routing. Queda como respaldo futuro. |
| `include:amazonses.com` en el SPF del raíz; `receiving` en Resend; catch-all reenviado a Gmail | El primero es innecesario, porque el MAIL FROM de Resend vive en `send.`. El segundo choca con el MX de Email Routing. El tercero daña la reputación de reenvío |
| UptimeRobot Free (hasta leer sus términos), Uptime Kuma, Cloudflare Health Checks, Upptime | UptimeRobot: posible restricción no comercial (n/v). Uptime Kuma: necesita un servidor 24/7 (en npm solo hay una 2.0.0-dev.0 de 2023). Health Checks: es de pago (Pro) y no ve las caídas de su propio proveedor. Upptime: un schedule cada 5 minutos agotaría los 2.000 minutos |
| Bot Fight Mode | Desafiaría a los webhooks de Resend, a los monitores y a los runners de GitHub, y de memoria no se puede excluir en Free |
| Pasarelas de correo a SMS | AT&T la cerró en junio de 2025 y Verizon la cierra en 2027 (n/v) |
| `ntfy` público con datos personales | Sus topics públicos no están protegidos |
| PostHog, Plausible CE; Zaraz (por ahora) | Excesivo o con servidor de pago; Zaraz solo si hay anuncios |
| `@cloudflare/vitest-pool-workers` | Deprecado; renombrado a `@cloudflare/vitest-plugin` |
| ESLint 9 + `eslint-plugin-jsx-a11y` | ESLint 9 llegó a su fin de vida el 2026-08-06 y jsx-a11y no soporta ESLint 10 |
| TypeScript 7 | Rompe `@astrojs/check` y typescript-eslint |
| `svix` | Redundante con `resend.webhooks.verify` |
| gitleaks | Sin versiones desde 2026-02-21; Betterleaks es de los mismos autores |
| GitHub Code Security / Secret Protection, `dependency-review-action` | De pago en repos privados |
| Workers Builds, `@cloudflare/pages-plugin-turnstile`, LHCI `temporary-public-storage` | Publican sin pasar las revisiones, es solo para Pages (2024), o hacen público el informe |
| Afirmaciones refutadas | Todas estas son falsas o incorrectas: "security-guidance bloquea y funciona en local sin red"; "`enabledPlugins` del repo instala plugins en la nube"; "`HouseCleaning` existe"; "`median-run` es la mediana de cada puntuación"; "`send_email` necesita MIME (mimetext)" (falso desde workers-types 5.20260705.1); "Email Routing bloquea el DKIM" (no demostrado: el SDK solo habla de MX y SPF); "CalOPPA protege a los leads B2B"; "465.7(b) rige las reseñas de Google copiadas a mano"; "GPC obliga a descartar los UTM propios"; "el plazo de bajas de CAN-SPAM está en 316.5" (está en 15 USC 7704(a)(4)); "10DLC exige EIN" (existe la marca Sole Proprietor); "la relación comercial dura 3 meses" (3 tras una consulta y 18 tras una compra). |

---

## 7. Riesgos y preguntas abiertas

### Riesgos

1. **Versiones que cambian rápido.** El adaptador de Cloudflare ya tiene la 15 en beta y wrangler saca versiones casi cada semana. Mitigación: fijar con `~`/`^`, usar Dependabot con grupos y no fusionar una actualización si fallan las revisiones.
2. **Lighthouse.** LHCI está estancado en LH 12.6.1, así que sus resultados no coincidirán con PageSpeed (LH 13). Además, la velocidad en los runners varía. Alternativa: Unlighthouse.
3. **Rate Limiting binding.** No está confirmado en el plan Free. Si falta, el despliegue puede fallar: hay que probarlo en el primer `wrangler deploy` y, si no está, dejar solo el contador de D1 (y la regla WAF para `/api/click`). El binding no se hereda en los entornos con nombre. La regla WAF debe cubrir también `?_action=`.
4. **CSP.** Una CSP mal escrita rompe Turnstile o el formulario sin avisar. Mitigación: una prueba de Playwright que falle ante violaciones de CSP, el endpoint de reportes y el control sintético diario en producción.
5. **Alpine CSP.** El formulario se escribe desde el principio con `Alpine.data()`. Migrarlo después sale caro.
6. **Cuotas de CI.** ~2.000 minutos y 500 MB de artefactos, n/v. Si se agotan, el CI se detiene hasta el mes siguiente. El sintético suma ~60–90 minutos al mes.
7. **Datos no verificados hoy.** Planes de Umami, Zaraz y Analytics Engine; límites de Resend (100 al día y 3.000 al mes según el documento); cuota de Cloudflare Images; estrellas de GitHub; fechas del retiro total de las FAQ (mayo de 2026) y de Verizon. Lista completa en "Pendiente de verificar".
8. **Contenido real.** Las mejoras de confianza (§4.1 #6–7) no se pueden publicar sin seguro, fotos y reseñas reales. Cualquier dato falso, y cualquier reseña o testimonio redactado con IA, es un riesgo legal (§4.4).
9. **Entorno en la nube.** Están bloqueados los hosts de Playwright, `mcp.docs.astro.build`, `docs.astro.build` y `developers.cloudflare.com`, además de las fuentes legales y de correo (le.utah.gov, ecfr.gov, fcc.gov, support.google.com, docs.github.com). El dueño debe permitirlos o Claude no podrá ver el sitio renderizado ni verificar esas fuentes.
10. **Skills de terceros.** Son cadena de suministro y cambian con frecuencia (Impeccable saca versiones casi cada semana). Si nadie revisa las actualizaciones, conviene quedarse solo con las oficiales.
11. **Responsabilidad legal fija.** La TCPA fija $500–$1.500 por mensaje, y esta investigación no pudo abrir fuentes primarias. Mitigación: casilla separada con versión guardada, respuestas P2P manuales, sin SMS automáticos en la v1 y revisión legal de 1 hora (§4.4).
12. **Fallos silenciosos del correo.** Una supresión del Gmail del dueño en Resend, un dominio desverificado, un registro DNS borrado o que `send_email` deje de ser gratis detendrían los avisos sin error visible. Mitigación: §5.3 y §4.2.
13. **El dueño no actualiza los estados.** Sin estados, el reporte y la calibración quedan vacíos. Mitigación: botones de 1–2 clics, lista "requieren acción" y alerta de leads sin contactar. Si Access pide el código cada vez desde el navegador interno de Gmail, se pierde esa ventaja: hay que probarlo en su teléfono.
14. **Atribución parcial.** Algunas apps no envían referrer, el cliente puede borrar la marca de `wa.me` y sessionStorage es por pestaña. Con 30–50 cerrados, la calibración del `lead_score` es solo orientativa.
15. **Seguimientos fuera de la lista de supresión.** Los seguimientos manuales desde Gmail o el teléfono se la saltan. Mitigación: la regla operativa de consultar `/admin` antes de escribir.

### Preguntas para el dueño

1. ¿Qué mejoras de §4.1 a §4.4 aprueba? Recomendación para la v1:
   - de §4.1: #1–6, #8 y #11; la #7 como sección dentro de `/construction/`; las #9–10 para la fase 2;
   - el mínimo legal de §4.4 y la entrega de correo de §5.3;
   - las tablas de leads y la ficha de §4.3.
2. Seguro: ¿límites reales de la póliza general, workers' comp y bond? ¿Puede emitir un COI con "additional insured"?
3. ¿Alguien atiende WhatsApp? ¿En qué horario y con qué tiempo de respuesta realista?
4. ¿Ya existe el perfil de Google Business Profile? ¿Qué categoría tiene y quién lo administra? ¿Sigue mostrando el historial de llamadas, probablemente retirado en 2024?
5. ¿Habrá Google Ads o Local Services Ads más adelante? Eso decide si se usan Zaraz y la importación de conversiones, y cambia la sección de terceros de `/privacy/`.
6. Medición del embudo: ¿endpoint propio (recomendado, $0, sin terceros) o Umami Cloud (panel listo, tercero)?
7. ¿El formulario debe funcionar sin JavaScript? Recomendación: no para varias propiedades; mostrar teléfono, correo y WhatsApp como alternativa.
8. ¿Guardar los leads que abandonan el formulario a medias? Recomendación: no en la v1, por privacidad.
9. ¿Se aplica GPC como recomienda §3.3 (marcar el lead y descartar solo el gclid, sin perder los UTM propios)?
10. ¿ChatGPT en modo manual (recomendado) o por API (de pago)?
11. ¿Claude trabajará en la nube o en una computadora local? Eso decide dónde se activa cada plugin. ¿El dueño puede activar frontend-design y security-guidance en su cuenta y permitir los hosts bloqueados?
12. ¿El repo estará en la cuenta personal o en una organización? ¿Hay un logo en SVG y fotos reales de obras? ¿Cuál es el nombre legal de la empresa, su forma (¿LLC en Utah?) y su EIN?
13. Slugs en español: ¿se mantienen las rutas en inglés bajo `/es/`, que es la decisión por defecto? Los slugs traducidos ayudan algo al SEO en español, pero exigen una tabla de correspondencias.
14. Dirección postal para el pie de los correos comerciales: ¿el domicilio (opción de $0), un apartado de USPS o un buzón CMRA (con costo)?
15. ¿Qué número se publica? Lo recomendado es uno solo en el sitio, en GBP y en los directorios. ¿Es un móvil personal u otro número? ¿Se usará la WhatsApp Business App a mano?
16. ¿Habrá prospección en frío de property managers o contratistas, por llamada, texto o correo? Necesitaría una política propia: los textos en frío no están permitidos sin consentimiento, y los correos en frío deben cumplir CAN-SPAM.
17. Plazos de conservación: ¿24 o 36 meses para las solicitudes no convertidas? ¿5 años para consentimientos y bajas?
18. ¿Hay contratos o términos escritos con clientes particulares, o condiciones en las cotizaciones? Hay que revisar que no tengan cláusulas anti-reseña (CRFA).
19. ¿Se grabarán llamadas o se usarán números de seguimiento?
20. DNS actual de blagalcleaning.com: ¿hay MX, SPF o DMARC de un correo antiguo? ¿Otras herramientas envían como @blagalcleaning.com (QuickBooks, Jobber, Housecall Pro)? Hay que autorizarlas antes de pasar a `quarantine`.
21. Reply-To de la confirmación al cliente: ¿quotes@ (refuerza la marca, pero pasa por el reenvío) o el Gmail directo (un salto menos)? ¿Se configura "Enviar como" quotes@ en Gmail con el SMTP de Resend? Esto último consume cuota y guarda una clave en Gmail.
22. ¿Hay un buzón de Microsoft 365, de un cliente o conocido que dé permiso, para la prueba de bandeja?
23. ¿Quién recibe los fallos de GitHub Actions y los issues del control sintético, y qué le llega al dueño?
24. Medición:
    - ¿Acepta la convención "valor primer año = único + mensual × 12"?
    - ¿Una cotización sin actividad pasa sola a `inactive` a los 45–60 días?
    - ¿Otra persona actualizará estados? Access hoy solo admite el Gmail del dueño.
    - ¿Cuál es el umbral de la alerta "sin contactar" y el horario hábil?
25. ¿Se pide antes del lanzamiento una revisión de 1 hora a un abogado de Utah, o a una de las opciones de bajo costo de §4.4?

### Pendiente de verificar (técnico)

**Stack:**
- `fontProviders.npm({ remote: false })` frente a `local()`.
- Semántica de aislamiento y de `createScheduledController` en `vitest-plugin`.
- `getViteConfig` de Astro con Vitest 5.
- Versiones de `lychee-action` y `wrangler-action`.
- Licencias de HyperUI y Penguin UI.
- `@alpinejs/ui` con el build CSP.
- Licencias de `trailofbits/skills`, `coreyhaines31/marketingskills` y `claude-seo`.
- Modo "live" de Impeccable.
- Región de datos de Umami.

**Legal:**
- Enmiendas de 2025–2026 a Utah 13-61, 13-25a (domingos y festivos), 13-26 (exenciones de registro) y 13-44-202.
- Estado de la regla "revoke-all" de la FCC.
- Multa de la FTC para 2026.
- Estado de la SB 690 y la AB 566 de California.
- Texto actual de la WhatsApp Business Messaging Policy.
- Costos de 10DLC y de toll-free.
- Términos de Turnstile (adenda de privacidad).
- Q&A de la FTC sobre el 465.7(b).
- Utah 45-3.
- Existencia y licencia de `basecamp/policies` y `Automattic/legalmattic`.

**Correo:**
- Hostnames MX, `include:_spf.mx.cloudflare.net` y selector DKIM de Email Routing; SRS y ARC.
- Dominio del rua de DMARC Management.
- Precio, cuota y supresiones de `send_email` en Workers Free.
- Términos de UptimeRobot, Better Stack y Healthchecks.io.
- Minutos y regla de los 60 días de GitHub Actions en 2026.
- Si Gmail ignora el filtro cuando falla DMARC.
- Si un Email Worker recibe `Authentication-Results`.
- Exclusiones de Bot Fight Mode.

**Medición:**
- Métricas e historial de llamadas de GBP en 2026.
- Uso comercial de Google Voice gratis.
- Guía de Google sobre números de seguimiento.
- Límites de Cron Triggers y D1 en Free.
- Duración máxima de la sesión de Access y comportamiento del navegador interno de Gmail en iOS.
- Recorte de Gmail (~102 KB).
- Formato del parámetro `text` de `wa.me`.

---

## Evidencia clave

**Versiones y avisos (registro npm)**
- https://registry.npmjs.org/astro
- https://registry.npmjs.org/@astrojs%2Fcloudflare
- https://github.com/advisories/GHSA-26w7-cxv4-gfx2
- https://registry.npmjs.org/@cloudflare%2Fvitest-pool-workers
- https://registry.npmjs.org/@cloudflare%2Fvitest-plugin
- https://registry.npmjs.org/@alpinejs%2Fcsp
- https://registry.npmjs.org/@alpinejs%2Fui
- https://registry.npmjs.org/npm
- https://registry.npmjs.org/@playwright%2Fmcp
- https://registry.npmjs.org/impeccable
- https://registry.npmjs.org/ui-ux-pro-max-cli
- https://proxy.golang.org/github.com/betterleaks/betterleaks/@latest

**Correo y medición (registro npm, verificado hoy, incluido el contenido de los paquetes)**
- https://registry.npmjs.org/resend (6.34.1: dominios, supresiones, eventos de webhook, códigos de error)
- https://registry.npmjs.org/wrangler (4.152.0: esquema de `send_email`, comandos `wrangler email`)
- https://registry.npmjs.org/@cloudflare%2Fworkers-types (5.20261026.1: sobrecarga builder de `SendEmail`)
- https://registry.npmjs.org/cloudflare (7.3.0: Email Routing, Email Sending, DMARC Management)
- https://registry.npmjs.org/@cloudflare%2Fplaywright
- https://registry.npmjs.org/@playwright%2Ftest
- https://registry.npmjs.org/mailauth
- https://registry.npmjs.org/mimetext
- https://registry.npmjs.org/postal-mime
- https://registry.npmjs.org/simple-statistics
- https://registry.npmjs.org/uptime-kuma

**Astro**
- https://docs.astro.build/en/guides/upgrade-to/v7/
- https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- https://docs.astro.build/en/guides/internationalization/
- https://docs.astro.build/en/reference/font-provider-reference/
- https://alpinejs.dev/advanced/csp
- https://github.com/alpinejs/alpine/blob/main/packages/docs/src/en/advanced/csp.md

**Cloudflare y Resend**
- https://developers.cloudflare.com/turnstile/reference/content-security-policy
- https://developers.cloudflare.com/turnstile/troubleshooting/testing/
- https://developers.cloudflare.com/web-analytics/faq
- https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
- https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/
- https://resend.com/docs/webhooks/verify-webhooks-requests

**Correo (URL canónicas, no abiertas hoy)**
- https://developers.cloudflare.com/email-routing/setup/email-routing-dns-records/
- https://developers.cloudflare.com/email-routing/postmaster/
- https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
- https://developers.cloudflare.com/dmarc-management/
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/dashboard/webhooks/event-types
- https://support.google.com/mail/answer/6579
- https://support.google.com/mail/answer/29436
- https://support.google.com/a/answer/81126
- https://uptimerobot.com/terms/
- https://betterstack.com/pricing

**Legal (URL canónicas, no abiertas hoy)**
- https://le.utah.gov/xcode/Title13/Chapter61/13-61.html
- https://le.utah.gov/xcode/Title13/Chapter44/13-44-S202.html
- https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22575
- https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22577
- https://www.law.cornell.edu/uscode/text/47/227
- https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200
- https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-316
- https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-465
- https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255
- https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- https://www.ftc.gov/business-guidance/resources/soliciting-paying-online-reviews-guide-marketers
- https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
- https://support.google.com/contributionpolicy/answer/7400114
- https://business.whatsapp.com/policy
- https://www.ctia.org/the-wireless-industry/industry-commitments/messaging-interoperability-sms-mms
- Facebook, Inc. v. Duguid, 592 U.S. 395 (2021); Insurance Marketing Coalition v. FCC (11th Cir., 24-ene-2025); McLaughlin Chiropractic v. McKesson (S. Ct., 20-jun-2025)

**Medición (no abiertas hoy)**
- https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric
- https://www.sqlite.org/lang_altertable.html
- https://pubmed.ncbi.nlm.nih.gov/8970487/
- https://www.bmj.com/content/368/bmj.m441

**GitHub y seguridad**
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- https://docs.github.com/en/code-security/how-tos/secure-your-secrets/detect-secret-leaks/enable-secret-scanning
- https://github.blog/changelog/2025-03-04-introducing-github-secret-protection-and-github-code-security/
- https://owasp.org/Top10/2025/

**Calidad**
- https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md
- https://lychee.cli.rs/continuous-integration/github/
- https://github.com/es-tooling/eslint-plugin-jsx-a11y-x

**SEO local y leads**
- https://whitespark.ca/blog/local-businesses-say-goodbye-to-review-snippets-in-google/
- https://developers.google.com/search/blog/2023/08/howto-faq-changes
- https://dfcm.utah.gov/wp-content/uploads/DFCM-Prequalified-Janitorial-Contractors-7.1.26.pdf
- https://cloudfour.com/thinks/building-an-accessible-image-comparison-web-component/
- https://9to5google.com/2023/06/21/google-calendar-free-booking-pages/
- https://textbolt.com/blog/att-email-to-text-alternative/

**UI**
- https://github.com/markmead/hyperui
- https://www.penguinui.com/
- https://lucide.dev/guide/packages/lucide-astro

**Claude**
- https://code.claude.com/docs/en/cloud-environments.md
- https://code.claude.com/docs/en/security-guidance.md
- https://code.claude.com/docs/en/claude-security.md
- https://code.claude.com/docs/en/discover-plugins.md
- https://claude.com/marketplace/plugins/frontend-design
- https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub

**Archivos del proyecto consultados**
- `el documento de diseño (Anexo A)` (§4.5–§4.11, §5, §7.2–§7.6, §8.2–§8.6, §10.2, §11.2–§11.3, §15 y §17)
- `el prompt maestro`