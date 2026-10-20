// Corre Lighthouse desde los servidores de Google (API de PageSpeed Insights) e incluye datos
// de usuarios reales (CrUX) cuando el sitio tiene tráfico suficiente. Sirve aunque este entorno
// no pueda abrir el sitio directamente. Requiere PAGESPEED_API_KEY.
//
// Uso: node pagespeed.mjs <url> [<url> ...]
import fs from 'node:fs/promises';

const clave = process.env.PAGESPEED_API_KEY;
if (!clave) {
  console.error('Falta PAGESPEED_API_KEY (clave gratuita de Google Cloud con la API de PageSpeed Insights habilitada).');
  process.exit(1);
}
const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('Uso: node pagespeed.mjs <url> [<url> ...]');
  process.exit(1);
}

const filas = [];
await fs.mkdir('resultados/pagespeed', { recursive: true });
for (const url of urls) {
  for (const estrategia of ['mobile', 'desktop']) {
    const q = new URLSearchParams({ url, strategy: estrategia, locale: 'es', key: clave });
    for (const c of ['performance', 'accessibility', 'best-practices', 'seo']) q.append('category', c);
    console.log(`PageSpeed ${estrategia}: ${url}`);
    const r = await fetch(`https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`);
    const json = await r.json();
    if (!r.ok) {
      filas.push(`| ${url} | ${estrategia} | error ${r.status}: ${json.error?.message ?? ''} | | | | | |`);
      continue;
    }
    const nombre = `${new URL(url).pathname.replace(/\W+/g, '_') || 'inicio'}_${estrategia}`;
    await fs.writeFile(`resultados/pagespeed/${nombre}.json`, JSON.stringify(json, null, 2));
    const cat = json.lighthouseResult.categories;
    const campo = json.loadingExperience?.metrics ? json.loadingExperience.overall_category : 'sin datos de campo';
    const lcp = json.lighthouseResult.audits['largest-contentful-paint']?.displayValue;
    const p = (k) => Math.round(cat[k].score * 100);
    filas.push(`| ${url} | ${estrategia} | ${p('performance')} | ${p('accessibility')} | ${p('best-practices')} | ${p('seo')} | ${lcp} | ${campo} |`);
  }
}
const md = ['# PageSpeed Insights', '', '| Página | Formato | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | Usuarios reales (CrUX) |', '|---|---|---|---|---|---|---|---|', ...filas, ''].join('\n');
await fs.writeFile('resultados/pagespeed/resumen.md', md);
console.log(md);
