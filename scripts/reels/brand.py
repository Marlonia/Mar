"""Identidad visual compartida por los Reels: colores, fuentes y zonas seguras.

Los valores de color vienen de tailwind.config.ts (paleta `carnival`), para que
los videos se vean igual que la página web.
"""
from pathlib import Path

HERE = Path(__file__).resolve().parent
FONTS_DIR = HERE / "fonts"

# Lienzo vertical 9:16 para Instagram Reels, TikTok y YouTube Shorts.
WIDTH, HEIGHT, FPS = 1080, 1920, 30

COLORS = {
    "yellow": "#FFC600",
    "red": "#E31E24",
    "blue": "#003DA5",
    "dark": "#0F1419",
    "light": "#F8F9FA",
    "white": "#FFFFFF",
}

# Zonas que la interfaz de Instagram tapa: barra de estado arriba, nombre de
# usuario y descripción abajo, botones de "me gusta" y compartir a la derecha.
SAFE = {"top": 250, "bottom": 430, "left": 64, "right": 150}

FONT_DISPLAY = FONTS_DIR / "PlayfairDisplay-Black.ttf"    # títulos
FONT_ACCENT = FONTS_DIR / "Montserrat-ExtraBold.ttf"      # acentos y botones
FONT_ACCENT_SEMI = FONTS_DIR / "Montserrat-SemiBold.ttf"  # etiquetas
FONT_BODY = FONTS_DIR / "Inter-Medium.ttf"                # texto corrido

BRAND_NAME = "Carnaval de Barranquilla en Utah"
HANDLE = "@carnavalbaq"
SITE = "carnavalba.com"


def rgb(color: str, alpha: int = 255):
    """Convierte '#RRGGBB' en una tupla (r, g, b, a) para Pillow."""
    c = color.lstrip("#")
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4)) + (alpha,)
