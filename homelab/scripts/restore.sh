#!/usr/bin/env bash
# Restaura un stack desde una copia hecha con backup.sh.
# Uso: ./scripts/restore.sh <fecha> <stack>       ej: ./scripts/restore.sh 2026-09-19_0300 10-n8n
# Restaura la carpeta del stack y los volúmenes; si hay volcado SQL, la base de datos se importa desde él
# (es más fiable que el volumen copiado "en caliente"). Prueba la restauración en un equipo de pruebas primero.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
# shellcheck disable=SC1091
[[ -f .env ]] && { set -a; source ./.env; set +a; }
FECHA="${1:?fecha de la copia}"; STACK="${2:?stack}"
ORIGEN="${BACKUP_DIR:-./backups}/$FECHA/$STACK"
[[ -d "$ORIGEN" ]] || { echo "No existe $ORIGEN"; exit 1; }
proyecto=$(echo "$STACK" | tr '[:upper:]' '[:lower:]')
filtro="label=com.docker.compose.project=$proyecto"
hay_sql=false; [[ -f "$ORIGEN/db-postgres.sql.gz" || -f "$ORIGEN/db-mariadb.sql.gz" ]] && hay_sql=true

echo "==> Apagando $STACK"
./hl down "$STACK" || true

echo "==> Carpeta del stack"
tar xzf "$ORIGEN/stack-$STACK.tgz" -C stacks

echo "==> Volúmenes"
for f in "$ORIGEN"/vol-*.tgz; do
  [[ -e "$f" ]] || continue
  vol=$(basename "$f" .tgz); vol=${vol#vol-}
  if $hay_sql && [[ "$vol" == "${proyecto}_db_data" ]]; then echo "   $vol: se omite, la BD se importa del SQL"; continue; fi
  docker volume create --label "com.docker.compose.project=$proyecto" "$vol" >/dev/null
  docker run --rm -v "$vol:/dest" -v "$ORIGEN:/src:ro" alpine sh -c "rm -rf /dest/* /dest/..?* /dest/.[!.]* 2>/dev/null; tar xzf /src/$(basename "$f") -C /dest"
  echo "   $vol ✔"
done

echo "==> Levantando $STACK"
./hl up "$STACK"

if $hay_sql; then
  db=""
  for _ in $(seq 1 30); do
    db=$(docker ps -q --filter "$filtro" --filter "label=com.docker.compose.service=db" | head -n1 || true)
    [[ -n "$db" ]] && docker exec "$db" sh -c 'pg_isready -U "${POSTGRES_USER:-postgres}" >/dev/null 2>&1 || healthcheck.sh --connect >/dev/null 2>&1' && break
    sleep 3
  done
  [[ -n "$db" ]] || { echo "No encuentro el contenedor db"; exit 1; }
  if [[ -f "$ORIGEN/db-postgres.sql.gz" ]]; then
    echo "==> Importando Postgres"
    usuario=$(docker exec "$db" printenv POSTGRES_USER 2>/dev/null || echo postgres)
    gunzip -c "$ORIGEN/db-postgres.sql.gz" | docker exec -i "$db" psql -q -U "$usuario" -d postgres >/dev/null
  else
    echo "==> Importando MariaDB"
    gunzip -c "$ORIGEN/db-mariadb.sql.gz" | docker exec -i "$db" sh -c 'exec mariadb -uroot -p"$MYSQL_ROOT_PASSWORD"'
  fi
  ./hl restart "$STACK"
fi
echo "✅ Restauración de $STACK terminada"
