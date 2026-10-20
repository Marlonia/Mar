# Kit de auditoría web de RootBiz

Auditoría **pasiva** de un sitio: abre unas pocas páginas como un visitante normal, con una pausa entre cada una, y guarda lo que ve. No hace escaneo de vulnerabilidades. Para pruebas de seguridad activas hace falta la autorización escrita del dueño del sitio.

Herramientas, todas de código abierto:

| Herramienta | Qué revisa |
|---|---|
| Playwright (Chromium) | Rastreo, capturas de escritorio y móvil, formularios, enlaces, recursos de terceros, encabezados |
| axe-core | Fallos de accesibilidad WCAG 2.1 A/AA en cada página |
| Lighthouse | Rendimiento, accesibilidad, buenas prácticas y SEO, en móvil y escritorio |
| Detector propio (`auditar.mjs`) | Plataforma (GoDaddy, Wix, WordPress…), rastreadores (Google Analytics, Meta Pixel…), agenda en línea (Jane App, Calendly…), avisos legales (privacidad, HIPAA, accesibilidad, idiomas, estimado de buena fe), señales de español, datos estructurados, robots.txt y sitemap |

## Uso

```bash
cd auditoria
npm install
node auditar.mjs https://onesourcemvc.com --max-paginas 15
```

Los resultados quedan en `resultados/onesourcemvc.com/`:

- `resumen.md`: lectura rápida.
- `resultado.json`: todos los datos.
- Capturas de pantalla.

`--sin-lighthouse` acelera la prueba.

## Lighthouse desde los servidores de Google

`pagespeed.mjs` usa la API de PageSpeed Insights. Funciona aunque este entorno no pueda abrir el sitio, y agrega datos de usuarios reales (CrUX) si el sitio tiene tráfico suficiente.

```bash
npm run pagespeed -- https://onesourcemvc.com https://onesourcemvc.com/schedule-now
```

## Segunda opinión con un modelo de OpenAI

`segunda-opinion.mjs` envía el informe y el resumen automático a la API de OpenAI y guarda la respuesta en `segunda-opinion/`.

```bash
OPENAI_MODEL=<modelo> npm run segunda-opinion -- "../reports/Auditoría One Medical Taylorsville.md" resultados/onesourcemvc.com/resumen.md
```

Si `OPENAI_MODEL` no está definido, el script lista los modelos disponibles en tu cuenta. `OPENAI_REASONING=high` sube el esfuerzo de razonamiento en los modelos que lo admiten.

## Qué hay que habilitar en el entorno de Claude Code

En el menú del entorno, en la barra de título de la sesión, entra en **Edit**:

1. **Network access → Allowed domains**: agrega
   - `onesourcemvc.com` y `www.onesourcemvc.com`
   - `img1.wsimg.com`, para las imágenes de GoDaddy
   - `api.openai.com`

   Deja marcada la casilla de gestores de paquetes.
2. **Secretos o variables de entorno**: agrega
   - `OPENAI_API_KEY`
   - Opcional: `PAGESPEED_API_KEY`, una clave gratuita de Google Cloud para la API de PageSpeed Insights.
3. Abre una **sesión nueva**: los secretos se cargan al iniciar la sesión.

Nunca pegues claves en el chat ni las subas al repositorio.
