#!/usr/bin/env bash
# Copia de seguridad de todos los stacks que estén corriendo en este nodo.
# Por cada stack guarda: volcado de la base de datos (servicio "db": Postgres o MariaDB),
# un .tgz por cada volumen Docker y un .tgz de la carpeta del stack (.env + configuraciones).
# Destino: $BACKUP_DIR/<fecha>/<stack>/   (BACKUP_DIR y BACKUP_KEEP_DAYS se definen en homelab/.env)
# Programar cada noche:  0 3 * * * /opt/homelab/homelab/scripts/backup.sh >> /var/log/homelab-backup.log 2>&1
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
# shellcheck disable=SC1091
[[ -f .env ]] && { set -a; source ./.env; set +a; }
DEST_BASE="${BACKUP_DIR:-./backups}"
KEEP="${BACKUP_KEEP_DAYS:-14}"
FECHA=$(date +%Y-%m-%d_%H%M)
DEST="$DEST_BASE/$FECHA"
mkdir -p "$DEST"
chmod 700 "$DEST_BASE" 2>/dev/null || true
echo "🗄  $(date '+%F %T') · Backup → $DEST"

for compose_file in stacks/*/docker-compose.yml; do
  dir=$(dirname "$compose_file"); stack=$(basename "$dir")
  proyecto=$(echo "$stack" | tr '[:upper:]' '[:lower:]')   # nombre de proyecto de Compose = carpeta
  filtro="label=com.docker.compose.project=$proyecto"
  [[ $(docker ps -q --filter "$filtro" | wc -l) -gt 0 ]] || continue
  salida="$DEST/$stack"; mkdir -p "$salida"
  echo "==> $stack"

  # 1) Base de datos (si el stack tiene un servicio llamado "db")
  db=$(docker ps -q --filter "$filtro" --filter "label=com.docker.compose.service=db" | head -n1 || true)
  if [[ -n "$db" ]]; then
    imagen=$(docker inspect --format '{{.Config.Image}}' "$db")
    case "$imagen" in
      *postgres*|*pgvector*)
        usuario=$(docker exec "$db" printenv POSTGRES_USER 2>/dev/null || echo postgres)
        docker exec "$db" pg_dumpall -U "$usuario" | gzip > "$salida/db-postgres.sql.gz"
        echo "   base de datos (postgres) ✔" ;;
      *mariadb*|*mysql*)
        docker exec "$db" sh -c 'exec mariadb-dump --databases "$MYSQL_DATABASE" -uroot -p"$MYSQL_ROOT_PASSWORD"' | gzip > "$salida/db-mariadb.sql.gz"
        echo "   base de datos (mariadb) ✔" ;;
      *) echo "   db: imagen desconocida ($imagen); solo se copia el volumen" ;;
    esac
  fi

  # 2) Volúmenes con nombre del stack
  for vol in $(docker volume ls -q --filter "$filtro"); do
    docker run --rm -v "$vol:/src:ro" -v "$salida:/dest" alpine tar czf "/dest/vol-$vol.tgz" -C /src .
    echo "   volumen $vol ✔"
  done

  # 3) Carpeta del stack: .env, configuraciones y datos en bind mounts
  tar czf "$salida/stack-$stack.tgz" -C stacks "$stack"
done

# Retención
find "$DEST_BASE" -mindepth 1 -maxdepth 1 -type d -mtime +"$KEEP" -exec rm -rf {} +
echo "✅ $(date '+%F %T') · Backup terminado ($(du -sh "$DEST" | cut -f1)). Copias con más de $KEEP días eliminadas."
