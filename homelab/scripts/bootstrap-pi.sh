#!/usr/bin/env bash
# Prepara una Raspberry Pi (Raspberry Pi OS 64-bit o Ubuntu Server) como nodo auxiliar:
# DNS con bloqueo de anuncios (AdGuard Home) + agente de monitoreo (Beszel).
# Uso: sudo ./scripts/bootstrap-pi.sh
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "Ejecuta con sudo"; exit 1; }
export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get install -y ca-certificates curl git openssl
command -v docker >/dev/null || curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
[[ -n "${SUDO_USER:-}" ]] && usermod -aG docker "$SUDO_USER"
docker network inspect agencia >/dev/null 2>&1 || docker network create agencia

# AdGuard necesita el puerto 53. En Ubuntu lo ocupa systemd-resolved: apagamos su "stub listener".
if systemctl is-active --quiet systemd-resolved; then
  echo "==> Liberando el puerto 53 (systemd-resolved)"
  mkdir -p /etc/systemd/resolved.conf.d
  printf '[Resolve]\nDNS=1.1.1.1 9.9.9.9\nDNSStubListener=no\n' >/etc/systemd/resolved.conf.d/adguard.conf
  ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
  systemctl restart systemd-resolved
fi

cat <<'TXT'

✅ Pi lista. Ahora:
   1. Asigna una IP fija a la Pi en el router (ej. 192.168.1.53).
   2. cd /opt/homelab/homelab && ./hl env   (en 01-node-agent/.env deja COMPOSE_PROFILES vacío)
   3. ./hl node up pi
   4. Abre http://IP-DE-LA-PI:3053 para el asistente de AdGuard (elige el puerto 3000 para el panel).
   5. En el router, pon la IP de la Pi como servidor DNS: toda la oficina bloquea anuncios y rastreadores.
TXT
