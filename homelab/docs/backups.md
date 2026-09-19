# Copias de seguridad

Regla 3-2-1: tres copias, en dos medios distintos, una fuera de la oficina.

## 1. Copia nocturna local (scripts/backup.sh)
Guarda por cada stack: volcado SQL de la base de datos, un `.tgz` por volumen Docker y la carpeta del stack
(`.env` + configuraciones). Destino: `BACKUP_DIR/<fecha>/<stack>/` con retención de `BACKUP_KEEP_DAYS` días.

```bash
# Probar a mano
./hl backup

# Programar a las 3:00 en cada nodo (crontab -e)
0 3 * * * /opt/homelab/homelab/scripts/backup.sh >> /var/log/homelab-backup.log 2>&1
```

### Montar el NAS como destino
```bash
sudo apt install nfs-common            # o cifs-utils para SMB
sudo mkdir -p /mnt/nas
# NFS (Synology/QNAP/TrueNAS exportan carpetas por NFS):
echo "192.168.1.20:/volume1/backups  /mnt/nas  nfs  defaults,_netdev,nofail  0 0" | sudo tee -a /etc/fstab
sudo mount -a
```
Y en `homelab/.env`: `BACKUP_DIR=/mnt/nas/backups/homelab`. En la fase 1, un disco USB montado en `/mnt/backup` sirve igual.

## 2. Copia fuera de la oficina
Sube la carpeta de copias, cifrada, a un almacenamiento barato con [restic](https://restic.net) o
[rclone](https://rclone.org): Backblaze B2 (~$6/TB/mes), Cloudflare R2 o un segundo NAS en casa de una socia.

```bash
sudo apt install restic
export RESTIC_REPOSITORY=b2:agencia-backups:homelab RESTIC_PASSWORD='frase-larga-guardada-en-vaultwarden'
restic init                                       # solo la primera vez
restic backup /mnt/nas/backups/homelab            # añadir al cron después de backup.sh
restic forget --keep-daily 14 --keep-weekly 8 --keep-monthly 12 --prune
```

## 3. Restaurar
```bash
./scripts/restore.sh 2026-09-19_0300 10-n8n
```
Apaga el stack, restaura carpeta y volúmenes, importa la base de datos desde el SQL y vuelve a levantarlo.
**Prueba una restauración al menos una vez** (por ejemplo en el nodo 2) antes de confiar en las copias.

## Qué NO cubre
- Los secretos de `stacks/*/.env` van dentro de `stack-*.tgz`: protege la carpeta de copias (solo root, disco cifrado o restic).
- Los archivos de Nextcloud viven en el volumen `40-nextcloud_nextcloud_data`; si usas almacenamiento externo en el NAS, respáldalo aparte.
