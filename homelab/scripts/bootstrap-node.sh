#!/usr/bin/env bash
# Prepara un servidor Debian/Ubuntu recién instalado para ser un nodo del homelab:
# Docker + Compose, red compartida "agencia", firewall básico, actualizaciones de seguridad automáticas.
# Uso:  sudo ./scripts/bootstrap-node.sh [zona-horaria]      ej: sudo ./scripts/bootstrap-node.sh America/Denver
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "Ejecuta con sudo"; exit 1; }
TZ_DESEADA="${1:-}"
USUARIO="${SUDO_USER:-}"
export DEBIAN_FRONTEND=noninteractive

echo "==> Paquetes base"
apt-get update -y
apt-get install -y ca-certificates curl gnupg git htop ufw unattended-upgrades openssl

if [[ -n "$TZ_DESEADA" ]]; then
  echo "==> Zona horaria: $TZ_DESEADA"
  timedatectl set-timezone "$TZ_DESEADA"
fi

if ! command -v docker >/dev/null; then
  echo "==> Instalando Docker con el script oficial (get.docker.com)"
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker
if [[ -n "$USUARIO" ]]; then
  usermod -aG docker "$USUARIO"
  echo "   $USUARIO añadido al grupo docker (cierra y vuelve a abrir la sesión para que aplique)"
fi

echo "==> Red compartida 'agencia' (la usan todos los stacks y cloudflared)"
docker network inspect agencia >/dev/null 2>&1 || docker network create agencia

echo "==> Límite de tamaño de logs de Docker (para que no llenen el disco)"
if [[ ! -f /etc/docker/daemon.json ]]; then
  cat >/etc/docker/daemon.json <<'JSON'
{ "log-driver": "json-file", "log-opts": { "max-size": "20m", "max-file": "3" } }
JSON
  systemctl restart docker
fi

echo "==> Actualizaciones de seguridad automáticas"
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "==> Firewall: SSH y tráfico desde la red local"
ufw --force reset >/dev/null
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
for red in 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16; do ufw allow from "$red"; done
ufw --force enable
# Ojo: Docker publica puertos saltándose ufw. La protección real es NO abrir puertos en el router:
# los servicios salen a internet solo por Cloudflare Tunnel.

cat <<'TXT'

✅ Nodo listo. Siguientes pasos (como tu usuario normal):
   git clone <url-del-repo> /opt/homelab && cd /opt/homelab/homelab
   ./hl env                # crea el .env global → edítalo → ./hl env otra vez
   ./hl up 01-node-agent   # túnel de Cloudflare + agente de monitoreo
   ./hl node up nodo1      # todos los stacks del nodo
TXT
