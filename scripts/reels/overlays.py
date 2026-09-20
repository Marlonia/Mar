"""Capas PNG transparentes (títulos, subtítulos, tarjeta final) y fondos.

Todo se dibuja con Pillow al tamaño del lienzo (1080x1920) para que FFmpeg
solo tenga que superponerlas sobre el video.
"""
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

from brand import (BRAND_NAME, COLORS, FONT_ACCENT, FONT_ACCENT_SEMI, FONT_BODY,
                   FONT_DISPLAY, HANDLE, HEIGHT, SAFE, SITE, WIDTH, rgb)


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def new_layer() -> Image.Image:
    return Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))


def wrap_lines(draw, text, font, max_width):
    """Parte un texto en líneas que quepan en max_width píxeles."""
    lines, current = [], ""
    for word in text.split():
        candidate = (current + " " + word).strip()
        if not current or draw.textlength(candidate, font=font) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_lines(img, xy, lines, font, fill, line_height, align="left", shadow=True):
    """Dibuja varias líneas con una sombra suave. Devuelve la Y final."""
    x, y = xy
    draw = ImageDraw.Draw(img)

    def line_x(line):
        if align == "center":
            return x - draw.textlength(line, font=font) / 2
        return x

    if shadow:
        shadow_layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow_layer)
        for i, line in enumerate(lines):
            sd.text((line_x(line) + 4, y + 6 + i * line_height), line, font=font, fill=(0, 0, 0, 180))
        img.alpha_composite(shadow_layer.filter(ImageFilter.GaussianBlur(7)))
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(lines):
        draw.text((line_x(line), y + i * line_height), line, font=font, fill=fill)
    return y + len(lines) * line_height


def pill(img, text, xy, bg, fg, size=30, pad=(26, 14), align="left"):
    """Etiqueta con fondo redondeado. Devuelve la caja ocupada."""
    font = load_font(FONT_ACCENT_SEMI, size)
    draw = ImageDraw.Draw(img)
    tw = draw.textlength(text, font=font)
    w, h = tw + pad[0] * 2, size + pad[1] * 2
    x, y = xy
    if align == "center":
        x = x - w / 2
    box = (x, y, x + w, y + h)
    draw.rounded_rectangle(box, radius=h / 2, fill=rgb(bg))
    draw.text((x + pad[0], y + pad[1] - 3), text, font=font, fill=rgb(fg))
    return box


def stripes(img, y, height=18, width=WIDTH, x=0):
    """Franja tricolor de la marca."""
    draw = ImageDraw.Draw(img)
    h = height / 3
    for i, name in enumerate(("yellow", "red", "blue")):
        draw.rectangle((x, y + i * h, x + width, y + (i + 1) * h), fill=rgb(COLORS[name]))


# ---------------------------------------------------------------- capas


def title_overlay(title: str, kicker: str = BRAND_NAME) -> Image.Image:
    """Etiqueta con el nombre de la academia y un título grande, arriba a la izquierda."""
    img = new_layer()
    draw = ImageDraw.Draw(img)
    x, y = SAFE["left"] + 8, SAFE["top"] + 24
    box = pill(img, kicker.upper(), (x, y), COLORS["yellow"], COLORS["dark"])
    y = box[3] + 30
    font = load_font(FONT_DISPLAY, 84)
    lines = wrap_lines(draw, title, font, WIDTH - x - SAFE["right"])
    draw_lines(img, (x, y), lines, font, rgb(COLORS["white"]), 96)
    return img


def caption_overlay(text: str, sub: str | None = None) -> Image.Image:
    """Tercio inferior: barra roja de acento, texto principal y línea secundaria."""
    img = new_layer()
    draw = ImageDraw.Draw(img)
    font = load_font(FONT_ACCENT, 54)
    font_sub = load_font(FONT_BODY, 38)
    bar_x = SAFE["left"] + 8
    x = bar_x + 34
    max_w = WIDTH - x - SAFE["right"]
    lines = wrap_lines(draw, text, font, max_w)
    sub_lines = wrap_lines(draw, sub, font_sub, max_w) if sub else []
    block_h = len(lines) * 64 + (len(sub_lines) * 46 + 14 if sub_lines else 0)
    y0 = HEIGHT - SAFE["bottom"] - block_h - 30
    draw.rounded_rectangle((bar_x, y0 - 4, bar_x + 12, y0 + block_h + 4), radius=6, fill=rgb(COLORS["red"]))
    y = draw_lines(img, (x, y0), lines, font, rgb(COLORS["white"]), 64)
    if sub_lines:
        draw_lines(img, (x, y + 14), sub_lines, font_sub, rgb(COLORS["light"], 235), 46)
    return img


def stripe_overlay(height: int = 18) -> Image.Image:
    img = new_layer()
    stripes(img, 0, height)
    return img


def end_card(headline: str = "¿Quieres bailar con nosotros?", cta: str = "Inscríbete hoy",
             site: str = SITE, handle: str = HANDLE, kicker: str = BRAND_NAME) -> Image.Image:
    """Tarjeta final opaca con llamada a la acción."""
    img = Image.new("RGBA", (WIDTH, HEIGHT), rgb(COLORS["dark"]))
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse((-350, 250, 750, 1350), fill=rgb(COLORS["blue"], 190))
    g.ellipse((450, 950, 1550, 2050), fill=rgb(COLORS["red"], 130))
    g.ellipse((250, -300, 1150, 500), fill=rgb(COLORS["yellow"], 70))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(170)))
    stripes(img, HEIGHT - 18, 18)

    draw = ImageDraw.Draw(img)
    cx = WIDTH / 2
    y = 640
    box = pill(img, kicker.upper(), (cx, y), COLORS["yellow"], COLORS["dark"], align="center")
    y = box[3] + 44
    font = load_font(FONT_DISPLAY, 94)
    lines = wrap_lines(draw, headline, font, WIDTH - 180)
    y = draw_lines(img, (cx, y), lines, font, rgb(COLORS["white"]), 108, align="center") + 50

    # Botón de llamada a la acción.
    font_cta = load_font(FONT_ACCENT, 50)
    tw = draw.textlength(cta, font=font_cta)
    bw, bh = tw + 120, 118
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((cx - bw / 2, y, cx + bw / 2, y + bh), radius=bh / 2, fill=rgb(COLORS["yellow"]))
    draw.text((cx - tw / 2, y + 30), cta, font=font_cta, fill=rgb(COLORS["dark"]))
    y += bh + 56

    font_site = load_font(FONT_BODY, 44)
    draw_lines(img, (cx, y), [site], font_site, rgb(COLORS["white"], 235), 54, align="center")
    font_handle = load_font(FONT_ACCENT_SEMI, 42)
    draw_lines(img, (cx, y + 62), [handle], font_handle, rgb(COLORS["yellow"]), 52, align="center")
    return img


def promo_text_overlay(headline: str, sub: str | None = None, badge: str | None = None) -> Image.Image:
    """Texto centrado para una diapositiva del Reel de anuncios."""
    img = new_layer()
    draw = ImageDraw.Draw(img)
    cx = WIDTH / 2
    font = load_font(FONT_DISPLAY, 104)
    lines = wrap_lines(draw, headline, font, WIDTH - 150)
    font_sub = load_font(FONT_ACCENT_SEMI, 44)
    sub_lines = wrap_lines(draw, sub, font_sub, WIDTH - 170) if sub else []
    total = len(lines) * 116 + (len(sub_lines) * 56 + 30 if sub_lines else 0) + (110 if badge else 0)
    y = (HEIGHT - total) / 2 - 40
    if badge:
        box = pill(img, badge.upper(), (cx, y), COLORS["yellow"], COLORS["dark"], size=32, align="center")
        y = box[3] + 40
    y = draw_lines(img, (cx, y), lines, font, rgb(COLORS["white"]), 116, align="center")
    if sub_lines:
        draw_lines(img, (cx, y + 30), sub_lines, font_sub, rgb(COLORS["white"], 235), 56, align="center")
    return img


# ---------------------------------------------------------------- fondos


def gradient(w, h, c0, c1, angle=0):
    """Degradado lineal entre dos colores, opcionalmente inclinado."""
    scale = 1.7 if angle else 1.0
    gw, gh = int(w * scale), int(h * scale)
    base = Image.new("RGBA", (gw, gh))
    draw = ImageDraw.Draw(base)
    r0, g0, b0, _ = rgb(c0)
    r1, g1, b1, _ = rgb(c1)
    for y in range(gh):
        t = y / (gh - 1)
        draw.line((0, y, gw, y), fill=(round(r0 + (r1 - r0) * t), round(g0 + (g1 - g0) * t), round(b0 + (b1 - b0) * t), 255))
    if angle:
        base = base.rotate(angle, resample=Image.BICUBIC)
        left, top = (base.width - w) // 2, (base.height - h) // 2
        base = base.crop((left, top, left + w, top + h))
    return base


def confetti(img, n=150, seed=7, colors=("yellow", "red", "blue", "white")):
    """Papelitos de carnaval semitransparentes."""
    rnd = random.Random(seed)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    for _ in range(n):
        color = rgb(COLORS[rnd.choice(colors)], rnd.randint(80, 200))
        w, h = rnd.randint(16, 52), rnd.randint(8, 24)
        piece = Image.new("RGBA", (w * 2, h * 2), (0, 0, 0, 0))
        ImageDraw.Draw(piece).rounded_rectangle((w // 2, h // 2, w // 2 + w, h // 2 + h), radius=5, fill=color)
        piece = piece.rotate(rnd.uniform(0, 180), resample=Image.BICUBIC, expand=True)
        layer.alpha_composite(piece, (rnd.randint(-60, img.width), rnd.randint(-60, img.height)))
    img.alpha_composite(layer.filter(ImageFilter.GaussianBlur(0.8)))
    return img


def vignette(img, strength=150):
    layer = Image.new("RGBA", img.size, (0, 0, 0, strength))
    ImageDraw.Draw(layer).ellipse((img.width * 0.05, img.height * 0.05, img.width * 0.95, img.height * 0.95), fill=(0, 0, 0, 0))
    img.alpha_composite(layer.filter(ImageFilter.GaussianBlur(220)))
    return img


BACKGROUNDS = {
    "fiesta": ("#FFC600", "#E31E24", 18, 11),
    "noche": ("#003DA5", "#0F1419", -14, 23),
    "carnaval": ("#E31E24", "#003DA5", 24, 37),
}


def background(kind: str, w: int = 1296, h: int = 2304) -> Image.Image:
    """Fondo generado con los colores de la marca. Un poco más grande que el
    lienzo para que el movimiento de cámara (Ken Burns) no pierda calidad."""
    c0, c1, angle, seed = BACKGROUNDS.get(kind, BACKGROUNDS["fiesta"])
    img = gradient(w, h, c0, c1, angle)
    rings = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rings)
    rnd = random.Random(seed)
    for _ in range(4):
        cx, cy, r = rnd.randint(0, w), rnd.randint(0, h), rnd.randint(220, 520)
        rd.ellipse((cx - r, cy - r, cx + r, cy + r), outline=rgb(COLORS["white"], 70), width=rnd.randint(18, 40))
    img.alpha_composite(rings.filter(ImageFilter.GaussianBlur(22)))
    confetti(img, seed=seed)
    vignette(img)
    return img.convert("RGB")


def cover_fit(path: Path, w: int = 1296, h: int = 2304) -> Image.Image:
    """Abre una foto, respeta su orientación EXIF y la recorta para cubrir w x h."""
    img = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    return ImageOps.fit(img, (w, h), method=Image.LANCZOS, centering=(0.5, 0.45))


# ---------------------------------------------------------------- subtítulos y relleno


def subtitle_cue(text: str) -> Image.Image:
    """Una frase de subtítulo centrada en una caja oscura redondeada."""
    img = new_layer()
    draw = ImageDraw.Draw(img)
    font = load_font(FONT_ACCENT, 46)
    lines = wrap_lines(draw, text, font, WIDTH - 2 * SAFE["left"] - 120)
    line_h = 58
    pad_x, pad_y = 34, 22
    text_w = max(draw.textlength(line, font=font) for line in lines)
    box_w, box_h = text_w + pad_x * 2, len(lines) * line_h + pad_y * 2
    cx = WIDTH / 2
    # Entre el borde inferior del video (modo blur) y el pie de texto.
    y0 = HEIGHT - SAFE["bottom"] - 200 - box_h
    draw.rounded_rectangle((cx - box_w / 2, y0, cx + box_w / 2, y0 + box_h), radius=22, fill=(15, 20, 25, 205))
    draw_lines(img, (cx, y0 + pad_y - 2), lines, font, rgb(COLORS["yellow"]), line_h, align="center", shadow=False)
    return img


def placeholder_text(w: int, h: int, title: str, sub: str) -> Image.Image:
    """Texto grande para el video de relleno de la demo."""
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font = load_font(FONT_ACCENT, 120)
    font_sub = load_font(FONT_ACCENT_SEMI, 54)
    draw_lines(img, (w / 2, h / 2 - 130), wrap_lines(draw, title, font, w - 200), font, rgb(COLORS["white"]), 134, align="center")
    draw_lines(img, (w / 2, h / 2 + 50), [sub], font_sub, rgb(COLORS["white"], 230), 64, align="center")
    return img
