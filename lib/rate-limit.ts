// Rate limit en memoria por IP (ventana deslizante). En Vercel cada instancia
// serverless tiene su propia memoria, así que es best-effort — suficiente para
// el tráfico de la academia. Si crece, migrar a un contador compartido (Redis).
const requestLog = new Map<string, number[]>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);

  if (requestLog.size > 10_000) {
    requestLog.clear();
  }
  return false;
}

export function clientIpFrom(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
