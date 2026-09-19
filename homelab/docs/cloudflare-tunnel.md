# Cloudflare Tunnel: publicar los servicios sin abrir puertos

Como en el video ("Cloudflare tunnel, no open ports"): cada nodo abre una conexión **saliente** hacia
Cloudflare y Cloudflare enruta `n8n.agencia.com`, `crm.agencia.com`, etc. hacia el contenedor correcto.
No hay puertos abiertos en el router, el certificado TLS lo pone Cloudflare y es gratis.

## 1. Dominio en Cloudflare
1. Crea una cuenta en https://dash.cloudflare.com y añade tu dominio (plan Free).
2. Cambia los nameservers del dominio a los que te indique Cloudflare (en tu registrador: GoDaddy, Namecheap…).

## 2. Un túnel por nodo
1. https://one.dash.cloudflare.com → **Networks → Tunnels → Create a tunnel → Cloudflared**.
2. Nombre: `agencia-nodo1`. Copia el **token** que aparece en el comando de instalación.
3. En el nodo: pega el token en `stacks/01-node-agent/.env` (`CLOUDFLARE_TUNNEL_TOKEN=...`) y ejecuta `./hl up 01-node-agent`.
   El túnel debe aparecer como **Healthy** en el panel de Cloudflare.
4. Repite con `agencia-nodo2` para el segundo nodo (cada nodo necesita su propio túnel, porque
   cloudflared solo "ve" los contenedores de su propio equipo).

## 3. Public Hostnames (qué dominio va a qué contenedor)
En el túnel → **Public Hostname → Add a public hostname**. El campo *Service* usa el **nombre del contenedor**
y su puerto interno (cloudflared comparte la red Docker `agencia` con todos los stacks):

| Subdominio  | Túnel  | Service (tipo HTTP)       | Stack          |
|-------------|--------|---------------------------|----------------|
| panel       | nodo1  | `http://homepage:3000`    | 00-core        |
| n8n         | nodo1  | `http://n8n:5678`         | 10-n8n         |
| crm         | nodo1  | `http://twenty:3000`      | 20-crm         |
| docs        | nodo1  | `http://docmost:3000`     | 30-docs        |
| nube        | nodo1  | `http://nextcloud:80`     | 40-nextcloud   |
| git         | nodo1  | `http://forgejo:3000`     | 50-git         |
| chat        | nodo2  | `http://chatwoot:3000`    | 60-chatwoot    |
| analitica   | nodo2  | `http://umami:3000`       | 70-analytics   |
| claves      | nodo2  | `http://vaultwarden:80`   | 80-vaultwarden |
| estado      | nodo2  | `http://uptime-kuma:3001` | 90-uptime      |
| ia          | nodo2  | `http://open-webui:8080`  | 95-ia          |

Si todo corre en un solo nodo, todos los hostnames van en el mismo túnel.

## 4. Proteger los paneles internos con Cloudflare Access
Los paneles que no deben ver los clientes (panel, n8n, git, ia, estado…) se protegen con un inicio de sesión
por correo antes de llegar al servicio:

1. **Access → Applications → Add an application → Self-hosted**.
2. Application domain: `n8n.agencia.com` (una aplicación por subdominio, o un comodín `*.agencia.com` y
   excepciones para lo público).
3. Policy → Allow → Include → **Emails ending in** `@agencia.com`. Cloudflare envía un código de un solo uso al correo.

Deja **sin** Access los servicios que usan tus clientes o tus sitios web: `chat` (el widget de Chatwoot se
carga desde los sitios), `analitica` (el script de Umami) y `nube` si compartes archivos con clientes.

## 5. Ajustes útiles
- **SSL/TLS → Full** en el dominio (Cloudflare habla HTTP con cloudflared dentro del túnel; hacia afuera siempre HTTPS).
- Cloudflare (plan Free) limita cada petición a **100 MB**. Para subir archivos grandes a Nextcloud, en el cliente de
  escritorio ajusta `maxChunkSize=50000000` en `nextcloud.cfg`, o usa Nextcloud por la red local.
- `git push` por SSH no pasa por el túnel HTTP: usa remotos **HTTPS** con token de Forgejo, o SSH solo dentro de la LAN (puerto 2222).
- Alternativa avanzada: túnel gestionado por archivo (`cloudflared tunnel create` + `config.yml` con reglas `ingress`)
  si prefieres tener los hostnames versionados en el repo.
