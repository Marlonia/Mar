# Hardware: qué comprar y en qué orden

Precios aproximados (USD, 2026) para orientarte; verifica antes de comprar. Consumo eléctrico de un mini PC:
10-15 W (≈ $2/mes). El equipo del video: Beelink (nodo 1), Lenovo ThinkCentre Tiny (nodo 2), tres Raspberry Pi
(4B 8 GB, 4B 4 GB y Pi 5), pantalla táctil y un QNAP TVS-h877AX con 6 discos WD Red Pro de 12 TB (72 TB).
Para una agencia sobra con mucho menos.

## Fase 1 · Un solo nodo (todo el software cabe aquí) — ≈ $450-550
| Pieza | Recomendación | ≈ USD |
|-------|---------------|-------|
| Mini PC | Beelink SER8 / SER5 Max, Minisforum UM790, o ThinkCentre M720q usado. Ryzen 7 o i5, **32 GB RAM**, NVMe 1 TB | 350-450 |
| UPS (batería) | 600-800 VA para apagar bien ante cortes de luz | 70-100 |
| Disco externo | 2-4 TB USB para las copias de seguridad de la fase 1 | 60-100 |

Sistema operativo: **Ubuntu Server 24.04 LTS** o Debian 12 (64 bits), sin escritorio. IP fija en el router.

## Fase 2 · Segundo nodo + Raspberry Pi — ≈ $250-350
| Pieza | Recomendación | ≈ USD |
|-------|---------------|-------|
| Nodo 2 | ThinkCentre Tiny / OptiPlex Micro / EliteDesk Mini usado, 16-32 GB RAM | 120-200 |
| Raspberry Pi | Pi 5 (4-8 GB) o Pi 4B, caja con ventilador, fuente oficial, microSD 32 GB A2 | 80-120 |
| Pantalla táctil 7" (opcional) | Raspberry Pi Touch Display 2 para el panel NETOPS en la pared | 60-80 |

Con dos nodos repartes la carga (Chatwoot es el servicio más pesado) y si uno se cae no se cae todo.

## Fase 3 · NAS (almacenamiento y copias) — ≈ $500-900
| Pieza | Recomendación | ≈ USD |
|-------|---------------|-------|
| NAS 2 bahías | Synology DS224+ o QNAP TS-264 | 300-400 |
| Discos NAS | 2 × 4-8 TB **WD Red Plus** o Seagate IronWolf, en espejo (RAID 1) | 200-400 |
| Alternativa | PC viejo con **TrueNAS** o el propio nodo 2 con 2 discos en espejo | 0-200 |

El NAS guarda las copias nocturnas de `backup.sh` (por NFS/SMB) y puede ser almacenamiento externo de Nextcloud.
Empieza con el disco USB de la fase 1 y pasa al NAS cuando el negocio lo justifique.

## Fase 4 · Laboratorio de IA (opcional)
Para modelos de 7-14B con buena velocidad: GPU NVIDIA con 12-16 GB de VRAM (RTX 4060 Ti 16 GB / 5060 Ti) en un
equipo de sobremesa, o un mini PC con 64 GB de RAM para modelos medianos en CPU. Sin GPU, los modelos de 3-8B ya
sirven para redactar, resumir y clasificar.

## Red
- Router con **DHCP reservations** para todos los nodos (IP fija).
- Switch gigabit de 5-8 puertos si el router se queda sin puertos (≈ $20).
- Los servicios salen a internet por Cloudflare Tunnel: **no abras puertos** en el router.
