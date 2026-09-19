#!/usr/bin/env bash
# Crea los archivos .env (global y por stack) a partir de los .env.example.
#  - Nunca sobrescribe un .env existente.
#  - Sustituye __GENERAR__ por un secreto aleatorio distinto en cada aparición.
#  - Sustituye __DOMINIO__, __DOMINIO_CORREO__, __TZ__ y __CORREO_ADMIN__ con los valores del .env global.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

command -v openssl >/dev/null || { echo "Necesito openssl para generar secretos (apt install openssl)"; exit 1; }

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "📝 Creado .env global. Edítalo (dominio, zona horaria, carpeta de backups) y vuelve a ejecutar ./hl env"
  exit 0
fi
# shellcheck disable=SC1091
set -a; source ./.env; set +a
: "${DOMINIO:?Define DOMINIO en .env}"

for ejemplo in stacks/*/.env.example; do
  dir=$(dirname "$ejemplo"); destino="$dir/.env"
  if [[ -f "$destino" ]]; then echo "✔ $destino ya existe, no se toca"; continue; fi
  cp "$ejemplo" "$destino"; chmod 600 "$destino"
  sed -i \
    -e "s|__DOMINIO_CORREO__|${DOMINIO_CORREO:-$DOMINIO}|g" \
    -e "s|__DOMINIO__|${DOMINIO}|g" \
    -e "s|__TZ__|${TZ:-UTC}|g" \
    -e "s|__CORREO_ADMIN__|${CORREO_ADMIN:-admin@$DOMINIO}|g" "$destino"
  while grep -q __GENERAR__ "$destino"; do
    secreto=$(openssl rand -hex 32)
    sed -i "0,/__GENERAR__/s//$secreto/" "$destino"
  done
  echo "🔐 Creado $destino con secretos nuevos"
done
echo "Listo. Revisa cada stacks/*/.env (tokens de Cloudflare, IPs, SMTP) antes de levantar los servicios."
