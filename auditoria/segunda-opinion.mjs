// Pide a un modelo de OpenAI una segunda opinión independiente sobre la auditoría.
// Requiere OPENAI_API_KEY en el entorno. El modelo se elige con OPENAI_MODEL; si falta,
// el script lista los modelos disponibles para la cuenta y termina.
//
// Uso: node segunda-opinion.mjs <informe.md> [resumen-automatico.md ...]
import fs from 'node:fs/promises';
import path from 'node:path';

const clave = process.env.OPENAI_API_KEY;
if (!clave) {
  console.error('Falta OPENAI_API_KEY. Agrégala como secreto del entorno y abre una sesión nueva.');
  process.exit(1);
}
const api = (ruta, cuerpo) =>
  fetch(`https://api.openai.com/v1/${ruta}`, {
    method: cuerpo ? 'POST' : 'GET',
    headers: { authorization: `Bearer ${clave}`, 'content-type': 'application/json' },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  }).then(async (r) => {
    const json = await r.json();
    if (!r.ok) throw new Error(`${r.status}: ${json.error?.message ?? JSON.stringify(json)}`);
    return json;
  });

const modelo = process.env.OPENAI_MODEL;
if (!modelo) {
  const { data } = await api('models');
  console.log('Define OPENAI_MODEL con uno de estos modelos de tu cuenta:\n');
  console.log(data.map((m) => m.id).sort().join('\n'));
  process.exit(1);
}

const archivos = process.argv.slice(2);
if (!archivos.length) {
  console.error('Uso: node segunda-opinion.mjs <informe.md> [resumen-automatico.md ...]');
  process.exit(1);
}
const documentos = await Promise.all(archivos.map(async (f) => `### Archivo: ${path.basename(f)}\n\n${await fs.readFile(f, 'utf8')}`));

const instrucciones = `Eres un auditor independiente de presencia digital y cumplimiento para clínicas médicas pequeñas en Estados Unidos.
Otra IA (Claude) y una agencia web llamada RootBiz prepararon la auditoría adjunta de una clínica en Taylorsville, Utah.
Tu trabajo es dar una segunda opinión crítica, en español:

1. Hallazgos que confirmas, que pones en duda y por qué. Señala inferencias presentadas como hechos.
2. Riesgos o temas importantes que faltan (técnicos, SEO local, conversión, reputación, HIPAA, accesibilidad, idiomas, publicidad, leyes de Utah).
3. Recomendaciones de la propuesta RootBiz que cambiarías de prioridad, que sobran o que son riesgosas.
4. Tu propio diagnóstico en 10 puntos, ordenados por impacto para el negocio.
5. Preguntas para el dueño que agregarías.

No inventes datos sobre la clínica: si no puedes verificar algo, dilo. Distingue entre lo que sabes con certeza y lo que crees.`;

const cuerpo = { model: modelo, instructions: instrucciones, input: documentos.join('\n\n---\n\n') };
if (process.env.OPENAI_REASONING) cuerpo.reasoning = { effort: process.env.OPENAI_REASONING };

console.log(`Consultando ${modelo}...`);
const r = await api('responses', cuerpo);
const texto = (r.output ?? [])
  .filter((o) => o.type === 'message')
  .flatMap((o) => o.content ?? [])
  .filter((c) => c.type === 'output_text')
  .map((c) => c.text)
  .join('\n');

await fs.mkdir('segunda-opinion', { recursive: true });
const destino = path.join('segunda-opinion', `${modelo.replace(/[^\w.-]/g, '_')}_${new Date().toISOString().slice(0, 10)}.md`);
await fs.writeFile(destino, `# Segunda opinión de ${modelo}\n\nFecha: ${new Date().toISOString()}\nArchivos revisados: ${archivos.join(', ')}\n\n${texto}\n`);
console.log(`Listo: ${destino}`);
