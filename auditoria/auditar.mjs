// Auditoría pasiva de un sitio web: rastrea pocas páginas del mismo dominio como lo haría
// un visitante normal y guarda lo que ve. No hace escaneo de vulnerabilidades.
//
// Uso: node auditar.mjs https://onesourcemvc.com [--max-paginas 15] [--salida resultados/onesourcemvc]
import { chromium, devices } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const inicio = args.find((a) => !a.startsWith('--'));
if (!inicio) {
  console.error('Uso: node auditar.mjs <url> [--max-paginas N] [--salida carpeta] [--sin-lighthouse]');
  process.exit(1);
}
const opcion = (nombre, def) => {
  const i = args.indexOf(nombre);
  return i >= 0 ? args[i + 1] : def;
};
const baseUrl = new URL(inicio);
const maxPaginas = Number(opcion('--max-paginas', 15));
const salida = path.resolve(opcion('--salida', `resultados/${baseUrl.hostname.replace(/^www\./, '')}`));
const conLighthouse = !args.includes('--sin-lighthouse');
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy;
const conProxy = PROXY ? { proxy: { server: PROXY, bypass: 'localhost,127.0.0.1,::1' } } : {};

// Huellas de plataformas y rastreadores, buscadas en el HTML y en las URLs que pide la página.
const PLATAFORMAS = {
  'GoDaddy Website Builder': [/img\d*\.wsimg\.com/, /godaddy/i, /Website Builder/i],
  Wix: [/static\.wixstatic\.com/, /wix\.com/],
  Squarespace: [/squarespace(-cdn)?\.com/],
  WordPress: [/wp-content\//, /wp-includes\//],
  Webflow: [/webflow\.(com|io)/, /website-files\.com/],
  Framer: [/framerusercontent\.com/, /framer\.(com|website)/],
  Shopify: [/cdn\.shopify\.com/],
  'GitHub Pages': [/github\.io/],
  Vercel: [/vercel(\.app|-insights|-scripts)/, /_vercel\//],
  Netlify: [/netlify/],
  'Cloudflare Pages': [/pages\.dev/],
  'Next.js': [/_next\/static/],
  Astro: [/_astro\//],
};
const RASTREADORES = {
  'Google Analytics / gtag': [/google-analytics\.com/, /googletagmanager\.com\/gtag/, /gtag\(/],
  'Google Tag Manager': [/googletagmanager\.com\/gtm\.js/, /GTM-[A-Z0-9]+/],
  'Google Ads': [/googleadservices\.com/, /AW-\d+/, /doubleclick\.net/],
  'Meta Pixel': [/connect\.facebook\.net/, /fbevents\.js/, /fbq\(/],
  'TikTok Pixel': [/analytics\.tiktok\.com/],
  Hotjar: [/hotjar\.com/],
  'Microsoft Clarity': [/clarity\.ms/],
  LinkedIn: [/snap\.licdn\.com/],
  'reCAPTCHA': [/recaptcha/],
};
const AGENDAS = {
  'Jane App': [/janeapp\.com/],
  Calendly: [/calendly\.com/],
  Zocdoc: [/zocdoc\.com/],
  Tebra: [/tebra|kareo/i],
  'Square Appointments': [/squareup\.com\/appointments/],
  Acuity: [/acuityscheduling\.com/],
  Jotform: [/jotform\.com/],
  'Google Forms': [/docs\.google\.com\/forms/],
  WhatsApp: [/wa\.me\/|api\.whatsapp\.com/],
};

const detectar = (catalogo, textos) =>
  Object.entries(catalogo)
    .filter(([, patrones]) => patrones.some((p) => textos.some((t) => p.test(t))))
    .map(([nombre]) => nombre);

const normalizar = (u) => {
  const url = new URL(u);
  url.hash = '';
  return url.href.replace(/\/$/, '');
};

async function leerTexto(contexto, url) {
  try {
    const r = await contexto.request.get(url, { timeout: 20000 });
    return { estado: r.status(), texto: r.ok() ? await r.text() : '' };
  } catch (e) {
    return { estado: 0, texto: '', error: String(e.message || e) };
  }
}

async function analizarPagina(contexto, url, carpeta) {
  const page = await contexto.newPage();
  const peticiones = [];
  const erroresConsola = [];
  page.on('request', (r) => peticiones.push(r.url()));
  page.on('console', (m) => m.type() === 'error' && erroresConsola.push(m.text()));
  const t0 = Date.now();
  const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch((e) => ({ error: e }));
  if (resp?.error) {
    await page.close();
    return { url, error: String(resp.error.message || resp.error).replace(/\x1b\[[0-9;]*m/g, "").split("\n")[0] };
  }
  const html = await page.content();
  const datos = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute('content') ?? null;
    const texto = document.body?.innerText ?? '';
    return {
      urlFinal: location.href,
      lang: document.documentElement.getAttribute('lang'),
      titulo: document.title,
      descripcion: meta('meta[name="description"]'),
      robots: meta('meta[name="robots"]'),
      generador: meta('meta[name="generator"]'),
      viewport: meta('meta[name="viewport"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => [l.hreflang, l.href]),
      og: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map((m) => [m.getAttribute('property'), m.content])),
      h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.trim()),
      h2: [...document.querySelectorAll('h2')].map((h) => h.innerText.trim()).slice(0, 30),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
      enlaces: [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.href, texto: a.innerText.trim().slice(0, 80) })),
      telefonos: [...new Set(texto.match(/\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g) ?? [])],
      correos: [...new Set(texto.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [])],
      formularios: [...document.querySelectorAll('form')].map((f) => ({
        action: f.action,
        method: f.method,
        campos: [...f.querySelectorAll('input,select,textarea')].map((c) => ({
          tipo: c.type || c.tagName.toLowerCase(),
          nombre: c.name || c.id || null,
          etiqueta: c.labels?.[0]?.innerText?.trim() || c.getAttribute('aria-label') || c.placeholder || null,
          requerido: c.required,
        })),
      })),
      iframes: [...document.querySelectorAll('iframe')].map((i) => i.src),
      recursos: [...document.querySelectorAll('script[src],link[href],img[src],source[src]')].map((e) => e.src || e.href),
      imagenesSinAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).map((i) => i.src).slice(0, 50),
      totalImagenes: document.images.length,
      palabras: texto.split(/\s+/).filter(Boolean).length,
      muestraTexto: texto.slice(0, 4000),
      // Indicadores rápidos de español y de avisos legales en el texto visible.
      senalesEspanol: (texto.match(/\b(cita|clínica|médico|servicios|llámenos|accidente|seguro|horario)\b/gi) ?? []).length,
      avisos: {
        privacidad: /privacy|privacidad/i.test(texto),
        hipaa: /hipaa|notice of privacy practices|aviso de prácticas de privacidad/i.test(texto),
        accesibilidad: /accessibility|accesibilidad/i.test(texto),
        idiomas: /language assistance|asistencia (de|en) idiomas|interpreter|intérprete/i.test(texto),
        noDiscriminacion: /nondiscrimination|no discriminación|section 1557|sección 1557/i.test(texto),
        estimadoBuenaFe: /good faith estimate|estimado de buena fe/i.test(texto),
      },
    };
  });
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  const nombre = (new URL(url).pathname.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'inicio').slice(0, 60);
  await page.screenshot({ path: path.join(carpeta, `captura_${nombre}_escritorio.png`), fullPage: true });
  await page.close();

  const terceros = [...new Set(peticiones.map((u) => new URL(u).hostname))].filter((h) => !h.endsWith(baseUrl.hostname.replace(/^www\./, '')));
  return {
    url,
    estado: resp?.status?.() ?? null,
    encabezados: resp?.headers?.() ?? {},
    tiempoCargaMs: Date.now() - t0,
    ...datos,
    // Solo recursos y meta generator: el texto de la página puede mencionar plataformas sin usarlas.
    plataformas: detectar(PLATAFORMAS, [datos.generador ?? '', ...datos.recursos, ...peticiones]),
    rastreadores: detectar(RASTREADORES, [html, ...peticiones]),
    agendas: detectar(AGENDAS, [html, ...peticiones, ...datos.iframes]),
    dominiosTerceros: terceros,
    erroresConsola,
    accesibilidad: axe.violations.map((v) => ({ regla: v.id, impacto: v.impact, descripcion: v.help, nodos: v.nodes.length })),
  };
}

async function capturaMovil(navegador, url, carpeta) {
  const ctx = await navegador.newContext({ ...devices['iPhone 13'], ...conProxy });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.screenshot({ path: path.join(carpeta, 'captura_inicio_movil.png'), fullPage: true });
  await ctx.close();
}

async function correrLighthouse(url, formato) {
  const chrome = await launch({
    chromePath: CHROME,
    chromeFlags: ['--headless=new', '--no-sandbox', ...(PROXY ? [`--proxy-server=${PROXY}`] : [])],
  });
  try {
    const r = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      locale: 'es',
      formFactor: formato,
      screenEmulation: formato === 'desktop' ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false } : undefined,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    const lhr = r.lhr;
    const fallos = Object.values(lhr.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative')
      .map((a) => ({ id: a.id, titulo: a.title, puntaje: a.score, valor: a.displayValue ?? null }));
    return {
      url,
      formato,
      puntajes: Object.fromEntries(Object.entries(lhr.categories).map(([k, c]) => [k, Math.round(c.score * 100)])),
      metricas: Object.fromEntries(
        ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].map((id) => [id, lhr.audits[id]?.displayValue]),
      ),
      fallos,
    };
  } finally {
    await chrome.kill();
  }
}

function resumenMarkdown(r) {
  const l = [];
  l.push(`# Auditoría automática: ${r.sitio}`, '', `Fecha: ${r.fecha}. Páginas analizadas: ${r.paginas.length}.`, '');
  l.push('## Sitio', '');
  l.push(`- robots.txt: estado ${r.robots.estado}`, `- sitemap.xml: estado ${r.sitemap.estado}, ${r.sitemap.urls.length} URLs`);
  const unir = (k) => [...new Set(r.paginas.flatMap((p) => p[k] ?? []))];
  l.push(`- Plataformas detectadas: ${unir('plataformas').join(', ') || 'ninguna'}`);
  l.push(`- Rastreadores detectados: ${unir('rastreadores').join(', ') || 'ninguno'}`);
  l.push(`- Agenda / formularios externos: ${unir('agendas').join(', ') || 'ninguno'}`);
  l.push(`- Teléfonos en el sitio: ${unir('telefonos').join(', ') || 'ninguno'}`);
  l.push(`- Correos en el sitio: ${unir('correos').join(', ') || 'ninguno'}`);
  const enc = r.paginas[0]?.encabezados ?? {};
  const seguridad = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy'];
  l.push(`- Encabezados de seguridad ausentes en la portada: ${seguridad.filter((h) => !enc[h]).join(', ') || 'ninguno'}`);
  l.push(`- Servidor: ${enc.server ?? 'no indicado'}`, '');
  l.push('## Páginas', '');
  for (const p of r.paginas) {
    if (p.error) {
      l.push(`### ${p.url}`, '', `Error: ${p.error}`, '');
      continue;
    }
    l.push(`### ${p.url}`, '');
    l.push(`- Estado ${p.estado}, carga ${p.tiempoCargaMs} ms, ${p.palabras} palabras, lang="${p.lang ?? ''}"`);
    l.push(`- Título: ${p.titulo || '(vacío)'}`, `- Descripción: ${p.descripcion || '(falta)'}`);
    l.push(`- H1: ${p.h1.length ? p.h1.join(' | ') : '(falta)'}`, `- Canonical: ${p.canonical || '(falta)'}`);
    l.push(`- hreflang: ${p.hreflang.length ? p.hreflang.map((h) => h[0]).join(', ') : '(ninguno)'}`);
    l.push(`- Datos estructurados (JSON-LD): ${p.jsonLd.length}`);
    l.push(`- Imágenes sin alt: ${p.imagenesSinAlt.length} de ${p.totalImagenes}`);
    l.push(`- Señales de español en el texto: ${p.senalesEspanol}`);
    l.push(`- Avisos encontrados: ${Object.entries(p.avisos).filter(([, v]) => v).map(([k]) => k).join(', ') || 'ninguno'}`);
    for (const f of p.formularios) {
      l.push(`- Formulario → ${f.method.toUpperCase()} ${f.action}: ${f.campos.map((c) => c.etiqueta || c.nombre || c.tipo).join(', ')}`);
    }
    if (p.accesibilidad.length) {
      l.push(`- Fallos de accesibilidad (axe, WCAG 2.1 AA): ${p.accesibilidad.map((a) => `${a.regla} [${a.impacto}, ${a.nodos}]`).join('; ')}`);
    }
    if (p.erroresConsola.length) l.push(`- Errores de consola: ${p.erroresConsola.length}`);
    l.push('');
  }
  if (r.lighthouse.length) {
    l.push('## Lighthouse', '', '| Página | Formato | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS |', '|---|---|---|---|---|---|---|---|');
    for (const x of r.lighthouse) {
      if (x.error) {
        l.push(`| ${x.url} | ${x.formato} | error: ${x.error} | | | | | |`);
        continue;
      }
      const s = x.puntajes;
      l.push(`| ${x.url} | ${x.formato} | ${s.performance} | ${s.accessibility} | ${s['best-practices']} | ${s.seo} | ${x.metricas['largest-contentful-paint']} | ${x.metricas['cumulative-layout-shift']} |`);
    }
    l.push('');
  }
  return l.join('\n');
}

await fs.mkdir(salida, { recursive: true });
const navegador = await chromium.launch({ executablePath: CHROME });
const contexto = await navegador.newContext({
  viewport: { width: 1350, height: 940 },
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36 auditoria-rootbiz',
  ...conProxy,
});

const robots = await leerTexto(contexto, new URL('/robots.txt', baseUrl).href);
const sitemap = await leerTexto(contexto, new URL('/sitemap.xml', baseUrl).href);
const urlsSitemap = [...sitemap.texto.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

const pendientes = [normalizar(baseUrl.href), ...urlsSitemap.map(normalizar)];
const vistas = new Set();
const paginas = [];
const mismoSitio = (u) => new URL(u).hostname.replace(/^www\./, '') === baseUrl.hostname.replace(/^www\./, '');
while (pendientes.length && paginas.length < maxPaginas) {
  const url = pendientes.shift();
  if (vistas.has(url)) continue;
  vistas.add(url);
  console.log(`Analizando ${url}`);
  const p = await analizarPagina(contexto, url, salida);
  paginas.push(p);
  for (const e of p.enlaces ?? []) {
    if (/^https?:/.test(e.href) && mismoSitio(e.href) && !/\.(pdf|jpg|jpeg|png|gif|webp|svg|zip)$/i.test(e.href)) {
      const n = normalizar(e.href);
      if (!vistas.has(n)) pendientes.push(n);
    }
  }
  await new Promise((res) => setTimeout(res, 1000)); // pausa cortés entre páginas
}
await capturaMovil(navegador, baseUrl.href, salida);
await navegador.close();

// Revisión de enlaces internos rotos con peticiones HEAD/GET simples.
const ctxEnlaces = await (await chromium.launch({ executablePath: CHROME })).newContext(conProxy);
const internos = [...new Set(paginas.flatMap((p) => (p.enlaces ?? []).map((e) => e.href)).filter((h) => /^https?:/.test(h) && mismoSitio(h)))];
const rotos = [];
for (const href of internos) {
  const { estado } = await leerTexto(ctxEnlaces, href);
  if (estado >= 400 || estado === 0) rotos.push({ href, estado });
}

const lighthouseRes = [];
if (conLighthouse) {
  const objetivos = [baseUrl.href, ...paginas.filter((p) => /schedule|cita|agenda|contact/i.test(p.url)).map((p) => p.url)].slice(0, 3);
  for (const url of objetivos) {
    for (const formato of ['mobile', 'desktop']) {
      console.log(`Lighthouse ${formato}: ${url}`);
      lighthouseRes.push(await correrLighthouse(url, formato).catch((e) => ({ url, formato, error: String(e.message || e) })));
    }
  }
}

const resultado = {
  sitio: baseUrl.href,
  fecha: new Date().toISOString(),
  robots: { estado: robots.estado, contenido: robots.texto.slice(0, 3000) },
  sitemap: { estado: sitemap.estado, urls: urlsSitemap },
  paginas,
  enlacesRotos: rotos,
  lighthouse: lighthouseRes,
};
await fs.writeFile(path.join(salida, 'resultado.json'), JSON.stringify(resultado, null, 2));
await fs.writeFile(path.join(salida, 'resumen.md'), resumenMarkdown(resultado) + (rotos.length ? `\n## Enlaces rotos\n\n${rotos.map((r) => `- ${r.href} (${r.estado})`).join('\n')}\n` : ''));
console.log(`Listo: ${salida}/resumen.md`);
process.exit(0);
