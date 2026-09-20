# Editor de Reels

Convierte grabaciones de la academia en videos verticales (1080x1920) listos
para Instagram Reels, TikTok y YouTube Shorts, con los colores y las fuentes de
la página web. Todo corre en la computadora, sin servicios de pago.

## Requisitos

- Python 3.10 o superior.
- `pip install -r requirements.txt` instala Pillow y un FFmpeg completo. Si ya
  tienes FFmpeg instalado, se usa ese; también puedes fijar la ruta con la
  variable de entorno `FFMPEG_BIN`.

## Dos tipos de Reel

### 1. Reel de baile (`clip`)

Toma un fragmento de un video real, lo pasa a vertical, le pone la etiqueta de
la academia, un título, un pie de texto, subtítulos opcionales y una tarjeta
final con llamada a la acción.

```bash
python reel.py clip grabacion.mp4 --start 12 --end 27 \
  --title "Cumbia en el Hispanic Day Parade" \
  --caption "Nueva York · Octubre 2024" --caption-sub "Grupo de adultos" \
  --srt subtitulos.srt --music cancion.mp3
```

Opciones importantes:

| Opción | Qué hace |
|---|---|
| `--mode blur` | El video completo sobre un fondo difuminado del mismo video. No se pierde nada de la imagen. Es el modo por defecto. |
| `--mode crop` | Recorte a pantalla completa. Usa `--focus 0.3` para conservar la parte izquierda o `0.7` la derecha. |
| `--srt` | Subtítulos en formato SRT, con los tiempos del video original. Se dibujan con el estilo de la marca. |
| `--music` | Mezcla una canción con el audio original. Recuerda que en Instagram conviene añadir música desde la app para usar su catálogo con licencia. |
| `--end-title`, `--cta` | Texto y botón de la tarjeta final. |

### 2. Reel de anuncios (`promo`)

Diapositivas con texto sobre fondos de la marca o sobre fotos propias, con
movimiento de cámara suave y transiciones. Se describe en un JSON:

```json
{
  "slides": [
    {"bg": "fiesta", "badge": "Nuevo grupo", "headline": "Clases de Cumbia", "sub": "Sábados 10:00 AM", "duration": 3.4},
    {"image": "fotos/ensayo.jpg", "badge": "Niños y adultos", "headline": "Mapalé y Garabato", "duration": 3.4}
  ],
  "end": {"headline": "¿Quieres bailar con nosotros?", "cta": "Inscríbete hoy"}
}
```

```bash
python reel.py promo mi-anuncio.json --music cancion.mp3
```

Fondos disponibles: `fiesta` (amarillo a rojo), `noche` (azul a negro) y
`carnaval` (rojo a azul). Con `"image"` se usa una foto propia.

### Demo sin material

```bash
python reel.py demo
```

Genera un video horizontal de relleno y produce tres Reels de muestra en
`out/`: baile en modo `blur`, baile en modo `crop` y el anuncio. Junto a cada
MP4 queda un mosaico `.sheet.png` con fotogramas para revisarlo de un vistazo.

## Cómo está hecho

- `brand.py`: colores de `tailwind.config.ts`, fuentes y zonas seguras que la
  interfaz de Instagram tapa.
- `overlays.py`: dibuja con Pillow las capas de texto, la tarjeta final, los
  subtítulos y los fondos.
- `reel.py`: arma el grafo de filtros de FFmpeg y codifica en H.264 + AAC.
- `fonts/`: Montserrat, Playfair Display e Inter, las mismas de la web, bajo
  licencia SIL Open Font License (ver `OFL-*.txt`).

Los resultados se guardan en `out/`, que no se sube al repositorio.
