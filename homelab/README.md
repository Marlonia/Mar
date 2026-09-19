# 🖥️ Homelab de la Agencia

Un "mini centro de datos" en la oficina que corre, en contenedores Docker, las herramientas por las que
normalmente se paga suscripción: automatizaciones, CRM, documentación, archivos, chat con clientes,
analítica, contraseñas, git… y un panel tipo **NETOPS** para verlo todo de un vistazo.

Está inspirado en el homelab del video de @erik.py (6 nodos, 132 contenedores y unos **$360/mes** que no paga),
pero dimensionado para una agencia: **empieza en un solo mini PC** y crece a dos nodos, una Raspberry Pi y un NAS
sin cambiar nada de lo que ya está montado.

> Todo sale a internet por **Cloudflare Tunnel**: sin abrir puertos en el router y con TLS gratis.
> Los paneles internos se protegen con **Cloudflare Access** (código al correo de la agencia).

## Arquitectura

```
                    internet
                       │
             ┌─────────▼──────────┐
             │  Cloudflare        │  DNS · TLS · Tunnel · Access (login por correo)
             └───┬────────────┬───┘
   túnel nodo 1  │            │  túnel nodo 2            (conexiones SALIENTES: 0 puertos abiertos)
 ┌───────────────▼──┐     ┌───▼──────────────┐     ┌──────────────────┐     ┌───────────────┐
 │ NODO 1 · mini PC │     │ NODO 2 · mini PC │     │ RASPBERRY PI     │     │ NAS           │
 │ cloudflared      │     │ cloudflared      │     │ AdGuard Home DNS │     │ copias        │
 │ Homepage NETOPS  │     │ Chatwoot         │     │ agente Beszel    │     │ nocturnas     │
 │ Portainer·Beszel │     │ Umami            │     │ (pantalla táctil │     │ archivos      │
 │ n8n · Twenty CRM │     │ Vaultwarden      │     │  con el panel)   │     │ Nextcloud     │
 │ Docmost·Nextcloud│     │ Uptime Kuma      │     └──────────────────┘     └───────────────┘
 │ Forgejo          │     │ Ollama + WebUI   │
 └──────────────────┘     └──────────────────┘
          └────────── red local de la oficina (IPs fijas) ──────────┘
```

Cada nodo corre `01-node-agent` (túnel + agente de monitoreo) y los stacks que le toquen según `nodes/*.stacks`.
Todos los stacks comparten la red Docker `agencia`, así cloudflared llega a cada contenedor por su nombre.

## Servicios y lo que reemplazan

| Stack | Servicio | Reemplaza a | Ref. USD/mes | Subdominio | Puerto LAN |
|-------|----------|-------------|-------------:|------------|-----------:|
| `00-core` | **Homepage** (panel NETOPS), Portainer, Beszel | — | — | panel | 3000 · 9443 · 8090 |
| `01-node-agent` | cloudflared + agente Beszel | ngrok / VPN | — | — | — |
| `10-n8n` | **n8n** automatizaciones | Zapier | 29.99 | n8n | 5678 |
| `20-crm` | **Twenty** CRM | HubSpot Starter | 20 | crm | 3010 |
| `30-docs` | **Docmost** wiki/docs | Notion Plus | 12 /usuario | docs | 3011 |
| `40-nextcloud` | **Nextcloud** archivos, calendario, contactos, Talk | Dropbox 2 TB | 11.99 | nube | 8081 |
| `50-git` | **Forgejo** git | GitHub Team | 4 /usuario | git | 3014 · ssh 2222 |
| `60-chatwoot` | **Chatwoot** chat web + WhatsApp + Instagram | Intercom | 39 | chat | 3013 |
| `70-analytics` | **Umami** analítica web | Plausible | 9 | analitica | 3012 |
| `80-vaultwarden` | **Vaultwarden** contraseñas (apps Bitwarden) | 1Password | 5.99 | claves | 8082 |
| `90-uptime` | **Uptime Kuma** avisos de caídas | UptimeRobot | ~7 | estado | 3001 |
| `95-ia` | **Ollama + Open WebUI** IA local (opcional) | ChatGPT Plus | 20 | ia | 3015 |
| `pi-adguard` | **AdGuard Home** DNS sin anuncios (Pi) | NextDNS | 1.99 | — | 53 · 3053 |

Precios de referencia de los planes de entrada (los del video más los planes públicos); los "por usuario" se
multiplican por el tamaño del equipo. Los puertos LAN son únicos, así que **todo puede correr en un solo nodo**.

## Hardware

| Fase | Qué | ≈ USD | Qué ganas |
|------|-----|------:|-----------|
| 1 | Mini PC (Ryzen 7 / i5, **32 GB RAM**, NVMe 1 TB) + UPS + disco USB para copias | 450-550 | Todo el software en un equipo |
| 2 | Segundo mini PC usado (ThinkCentre Tiny) + Raspberry Pi (+ pantalla táctil 7") | 250-350 | Reparto de carga, DNS sin anuncios, panel en la pared |
| 3 | NAS de 2 bahías con 2 discos NAS en espejo | 500-900 | Copias fiables y archivos de Nextcloud fuera del nodo |
| 4 | GPU NVIDIA 16 GB (opcional) | 400-500 | Modelos de IA grandes en local |

Detalle y modelos concretos en [docs/hardware.md](docs/hardware.md). Con lo que se ahorra en suscripciones,
la fase 1 se paga sola en unos 3-4 meses.

## Puesta en marcha

### 0. Requisitos
- Un dominio propio (`agencia.com`) gestionado en Cloudflare (plan gratis).
- Nodo con Ubuntu Server 24.04 / Debian 12 e IP fija en el router.

### 1. Preparar el nodo
```bash
sudo apt install -y git
git clone https://github.com/marlonia/Mar.git /opt/homelab && cd /opt/homelab/homelab
sudo ./scripts/bootstrap-node.sh America/Denver     # Docker, red "agencia", firewall, actualizaciones
# cierra sesión y vuelve a entrar (grupo docker)
```

### 2. Configurar
```bash
./hl env            # crea homelab/.env → edita DOMINIO, TZ, BACKUP_DIR
./hl env            # ahora crea stacks/*/.env con secretos aleatorios
```
Revisa `stacks/00-core/.env` (IPs de los nodos) y `stacks/40-nextcloud/.env` (dominios de confianza).

### 3. Túnel de Cloudflare
Sigue [docs/cloudflare-tunnel.md](docs/cloudflare-tunnel.md): crea el túnel `agencia-nodo1`, pega el token en
`stacks/01-node-agent/.env` y da de alta los subdominios de la tabla de arriba.

### 4. Levantar los servicios
```bash
./hl up 01-node-agent        # túnel + agente de monitoreo
./hl up core                 # panel NETOPS, Portainer, Beszel
./hl node up nodo1           # todo lo del nodo 1 (o ./hl up n8n, ./hl up crm… uno a uno)
./hl ps
```
Y el primer acceso a cada servicio (usuarios iniciales, pasos únicos como el `db:chatwoot_prepare` de Chatwoot)
está en [docs/servicios.md](docs/servicios.md).

### 5. Segundo nodo, Raspberry Pi y pantalla
- Nodo 2: repite 1-4 con `./hl node up nodo2` y su propio túnel `agencia-nodo2`.
- Pi: `sudo ./scripts/bootstrap-pi.sh` → `./hl node up pi` → asistente de AdGuard → IP de la Pi como DNS del router.
- Pantalla táctil con el panel NETOPS: `./scripts/kiosk-pi.sh http://IP-NODO1:3000` en una Pi con escritorio.

### 6. Copias de seguridad
`./hl backup` a mano y luego en cron cada noche hacia el NAS o disco USB; copia cifrada fuera de la oficina con
restic. Todo en [docs/backups.md](docs/backups.md).

## Operación diaria

```bash
./hl ps                      # qué corre y desde cuándo
./hl logs chatwoot           # logs en vivo de un stack
./hl update n8n              # actualizar un servicio (pull + reinicio); haz backup antes
./hl compose crm exec server sh   # entrar a un contenedor
./hl node down nodo1         # apagar todo (p. ej. antes de mover el equipo)
```
- El panel (`panel.agencia.com`) muestra estado y CPU/RAM de cada servicio; Beszel, la salud de cada nodo;
  Uptime Kuma avisa por Telegram/WhatsApp si algo se cae.
- Actualiza una vez al mes, un stack cada vez, con copia previa. Nada se actualiza solo a propósito.

## Seguridad: lista de control

- [ ] Ningún puerto abierto en el router; solo Cloudflare Tunnel.
- [ ] Cloudflare Access delante de panel, n8n, git, estado, ia, Portainer (si lo publicas).
- [ ] Registro cerrado en todos los servicios tras crear las cuentas (Chatwoot, Forgejo, Vaultwarden por dominio).
- [ ] 2FA activado en Cloudflare, Vaultwarden, Nextcloud, Forgejo y n8n.
- [ ] Secretos (`.env`, `N8N_ENCRYPTION_KEY`, token de Cloudflare) guardados en Vaultwarden.
- [ ] Copias nocturnas funcionando y **una restauración probada**.
- [ ] SSH solo con llave (`PasswordAuthentication no`), actualizaciones automáticas activas (las deja el bootstrap).
- [ ] UPS conectado; nodos con IP fija.

## 💸 Lo que la agencia deja de pagar

| Nodo | Servicios | USD/mes |
|------|-----------|--------:|
| Nodo 1 | n8n, Twenty, Docmost, Nextcloud, Forgejo | 78 |
| Nodo 2 | Chatwoot, Umami, Vaultwarden, Uptime Kuma, IA local | 81 |
| Raspberry Pi | AdGuard Home | 2 |
| **Total** | con 1 usuario en los planes por usuario | **≈ 161/mes · ≈ 1,930/año** |
| **Total** | con un equipo de 5 (Notion y GitHub por usuario) | **≈ 225/mes · ≈ 2,700/año** |

Frente a ≈ $500-550 de hardware en la fase 1 y ≈ $2-4/mes de luz.

## Siguientes pasos y opcionales

- **WhatsApp e Instagram en Chatwoot**: con la API de WhatsApp Cloud (Meta) y la app de Facebook de la agencia.
- **Formularios de los sitios → CRM**: un webhook de n8n recibe el formulario de contacto de cada sitio (como el de
  la academia) y crea el contacto en Twenty, avisa por WhatsApp y abre una conversación en Chatwoot.
- **Analítica en los sitios**: script de Umami en cada web de cliente y panel compartido con ellos.
- **Status page pública** de Uptime Kuma para mostrar a los clientes que sus sitios están arriba.
- Servicios extra del video que aquí no hacen falta: Home Assistant (domótica de la oficina) y un foro
  tipo Discourse para comunidad; se añaden como un stack más.

## Estructura de la carpeta

```
homelab/
├── hl                    # CLI: ./hl up|down|logs|update|node|backup …
├── .env.example          # configuración global (dominio, zona horaria, backups)
├── nodes/*.stacks        # qué stacks corren en cada nodo
├── stacks/<stack>/       # docker-compose.yml + .env.example por servicio
│   └── 00-core/homepage/ # configuración del panel NETOPS
├── scripts/              # bootstrap-node, bootstrap-pi, init-env, backup, restore, kiosk-pi
└── docs/                 # cloudflare-tunnel, servicios, hardware, backups
```
