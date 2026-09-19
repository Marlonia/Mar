# Primer arranque de cada servicio

Orden recomendado: `01-node-agent` → `00-core` → el resto. Espera 1-2 minutos tras cada `./hl up` (descarga de imágenes).
Todo lo que dice "LAN" se abre con la IP del nodo dentro de la oficina; lo público va por `https://<sub>.agencia.com`.

## 00-core
- **Homepage** (LAN `:3000`, `panel.`): edita `stacks/00-core/homepage/*.yaml`; los cambios se aplican solos.
  Si dice *Host not allowed*, añade el host a `HOMEPAGE_ALLOWED_HOSTS` en `.env` y `./hl up core`.
- **Portainer** (LAN `https://IP:9443`): crea la cuenta administradora en los primeros 5 minutos
  (si expira: `docker restart portainer`).
- **Beszel** (LAN `:8090`): crea la cuenta → **Add system** → nombre `nodo1`, host `IP del nodo`, puerto `45876`.
  Copia la *public key* a `stacks/01-node-agent/.env` (`BESZEL_AGENT_KEY`) en **cada** nodo y `./hl up 01-node-agent`.

## 10-n8n
Primera visita → crea la cuenta *owner*. Guarda `N8N_ENCRYPTION_KEY` en Vaultwarden. Los webhooks usan
`https://n8n.agencia.com/webhook/...`. Ideas: formulario web → CRM + WhatsApp; nuevo cliente → carpeta en Nextcloud + tarea.

## 20-crm (Twenty)
Primera visita → crea el workspace y tu usuario. Importa contactos desde CSV. API y webhooks en *Settings → Developers*
(úsalos desde n8n).

## 30-docs (Docmost)
Primera visita → crea el workspace y la cuenta administradora; invita al equipo por correo (configura SMTP en el `.env`
si quieres invitaciones automáticas; si no, comparte el enlace de invitación).

## 40-nextcloud
Se instala solo con `NEXTCLOUD_ADMIN_USER/PASSWORD` del `.env`. Después:
1. *Apps* → activa **Calendar**, **Contacts**, **Talk** (videollamadas) y **Deck** (tableros).
2. Instala el cliente de escritorio en los equipos del equipo apuntando a `https://nube.agencia.com`.
3. Ajustes → *Overview* muestra avisos de configuración; casi todos se resuelven con
   `./hl compose nextcloud exec -u www-data app php occ <comando>` (ej. `db:add-missing-indices`).

## 50-git (Forgejo)
Primera visita → instalador (la base de datos ya viene rellena) → crea la cuenta administradora al final.
Luego en `.env` pon `FORGEJO_DISABLE_REGISTRATION=true` y `./hl up git`. Para clonar por internet usa HTTPS + token
(*Settings → Applications → Generate token*).

## 60-chatwoot
1. `./hl compose chatwoot run --rm rails bundle exec rails db:chatwoot_prepare` (crea la base de datos; tarda unos minutos).
2. `./hl up chatwoot` → abre `https://chat.agencia.com/app/auth/signup` y crea la cuenta y el primer *inbox*.
3. En `.env` pon `ENABLE_ACCOUNT_SIGNUP=false` y `./hl up chatwoot`.
4. Si el proceso de preparación creó una cuenta de demostración (`john@acme.inc`), elimínala desde `/super_admin`.
5. *Inboxes*: **Website** (widget para los sitios de los clientes), **WhatsApp** (API de WhatsApp Cloud), **Instagram/Facebook**.

## 70-analytics (Umami)
Usuario `admin`, contraseña `umami` → cámbiala. *Add website* → copia el `<script>` en el `<head>` de cada sitio
(para el sitio de la academia va en `app/layout.tsx`).

## 80-vaultwarden
1. Regístrate en `https://claves.agencia.com` con un correo `@agencia.com` (solo ese dominio puede registrarse).
2. Instala las apps/extensiones de **Bitwarden** y en *Self-hosted* pon `https://claves.agencia.com`.
3. Panel de administración: `/admin` con `VW_ADMIN_TOKEN`. Para no guardar el token en claro, genera un hash con
   `docker exec -it vaultwarden /vaultwarden hash` y pégalo en `.env` entre comillas simples.
4. Activa 2FA en todas las cuentas. Guarda aquí las claves de este homelab (Cloudflare, `.env`, NAS).

## 90-uptime (Uptime Kuma)
Primera visita → cuenta administradora. Añade un monitor HTTP por cada sitio de cliente y por cada servicio del
homelab; en *Notifications* conecta Telegram, WhatsApp (CallMeBot), correo o Discord. Puedes publicar una
*Status Page* pública para tus clientes.

## 95-ia (Ollama + Open WebUI)
`./hl compose ia exec ollama ollama pull llama3.2:3b` (rápido en CPU) o `qwen2.5:7b` (mejor, necesita ~8 GB de RAM libre).
Primera cuenta en Open WebUI = administradora; las demás quedan *pendientes* hasta que las apruebes.

## pi-adguard
`http://IP-PI:3053` → asistente → interfaz de administración en el puerto **3000**, DNS en el 53 → crea usuario.
En el router pon la IP de la Pi como DNS primario. En AdGuard → *Filters* activa listas como *AdGuard DNS filter*
y *OISD*. Añade en *DNS rewrites* `*.agencia.com → IP del nodo` si quieres que en la oficina los servicios se
resuelvan directo sin salir a internet.
