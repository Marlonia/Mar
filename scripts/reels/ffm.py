"""Utilidades para invocar FFmpeg desde Python."""
import os
import re
import shlex
import shutil
import subprocess
import sys


def ffmpeg_bin() -> str:
    """Busca ffmpeg: variable FFMPEG_BIN, luego el PATH, luego imageio-ffmpeg."""
    env = os.environ.get("FFMPEG_BIN")
    if env:
        return env
    found = shutil.which("ffmpeg")
    if found:
        return found
    try:
        import imageio_ffmpeg  # type: ignore
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit(
            "No encontré ffmpeg. Instálalo con `pip install imageio-ffmpeg` "
            "o define la variable FFMPEG_BIN con la ruta al binario."
        )


# Ajustes de salida compatibles con Instagram, TikTok y YouTube Shorts.
ENCODE = [
    "-c:v", "libx264", "-preset", "medium", "-crf", "20",
    "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p", "-r", "30",
    "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "160k", "-ar", "48000",
]


def run(args, quiet=True):
    """Ejecuta ffmpeg. Con FFMPEG_VERBOSE=1 muestra el progreso y los avisos."""
    quiet = quiet and not os.environ.get("FFMPEG_VERBOSE")
    cmd = [ffmpeg_bin(), "-hide_banner", "-nostdin", "-y", "-loglevel", "error" if quiet else "info"]
    if not quiet:
        cmd.append("-stats")
    cmd += [str(a) for a in args]
    shown = " ".join(shlex.quote(str(a)) for a in args)
    print("  $ ffmpeg " + (shown if len(shown) < 400 else shown[:400] + " …"))
    subprocess.run(cmd, check=True)


def probe(path):
    """Duración, presencia de audio y tamaño, leyendo la cabecera que imprime ffmpeg."""
    p = subprocess.run([ffmpeg_bin(), "-hide_banner", "-i", str(path)], capture_output=True, text=True)
    err = p.stderr
    m = re.search(r"Duration: (\d+):(\d+):(\d+\.?\d*)", err)
    duration = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3]) if m else None
    m2 = re.search(r"Video:.*?\b(\d{2,5})x(\d{2,5})\b", err)
    size = (int(m2[1]), int(m2[2])) if m2 else None
    return {"duration": duration, "audio": "Audio:" in err, "size": size}


def esc_filter_path(path) -> str:
    """Escapa una ruta para usarla dentro de un filtro (subtitles=, fontfile=)."""
    return str(path).replace("\\", "/").replace(":", "\\:").replace("'", "\\'")
