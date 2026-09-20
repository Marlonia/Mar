#!/usr/bin/env python3
"""Editor de Reels para Carnaval de Barranquilla en Utah.

Uso rápido (ver README.md):

  python reel.py clip  VIDEO --start 12 --end 27 --title "Cumbia en el desfile" --caption "Nueva York · 2024"
  python reel.py promo examples/promo-demo.json
  python reel.py demo

Produce MP4 verticales 1080x1920 (H.264 + AAC) listos para Instagram Reels,
TikTok y YouTube Shorts.
"""
import argparse
import json
import math
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import overlays  # noqa: E402
from brand import BRAND_NAME, FPS, HEIGHT, WIDTH  # noqa: E402
from ffm import ENCODE, probe, run  # noqa: E402

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
END_DURATION = 2.6   # segundos de la tarjeta final
XFADE = 0.5          # duración del fundido entre partes


# ------------------------------------------------------------------ helpers


def ease_out(t0: float, d: float) -> str:
    """Resto del recorrido (1→0) con frenado suave, como expresión de FFmpeg."""
    return f"pow(1-min(1\\,max(0\\,(t-{t0:.3f})/{d:.3f}))\\,2)"


def fade_in_out(t_in: float, d_in: float, t_out: float, d_out: float) -> str:
    return (f"format=rgba,fade=t=in:st={t_in:.3f}:d={d_in:.3f}:alpha=1,"
            f"fade=t=out:st={t_out:.3f}:d={d_out:.3f}:alpha=1")


def image_input(path: Path, duration: float):
    return ["-loop", "1", "-framerate", str(FPS), "-t", f"{duration:.3f}", "-i", str(path)]


def save(img, name: str, workdir: Path) -> Path:
    path = workdir / name
    img.save(path)
    return path


def parse_srt(path: Path):
    """Lee un .srt sencillo y devuelve [(inicio, fin, texto), ...] en segundos."""
    text = Path(path).read_text(encoding="utf-8-sig")
    cues = []
    pattern = re.compile(r"(\d+):(\d+):(\d+)[,.](\d+)\s*-->\s*(\d+):(\d+):(\d+)[,.](\d+)")
    for block in re.split(r"\n\s*\n", text.strip()):
        lines = [l.strip() for l in block.splitlines() if l.strip()]
        for i, line in enumerate(lines):
            m = pattern.search(line)
            if m:
                v = [int(x) for x in m.groups()]
                start = v[0] * 3600 + v[1] * 60 + v[2] + v[3] / 1000
                end = v[4] * 3600 + v[5] * 60 + v[6] + v[7] / 1000
                body = " ".join(lines[i + 1:])
                if body:
                    cues.append((start, end, body))
                break
    return cues


def audio_graph(has_audio: bool, src_index: int, main_len: float, total_len: float,
                music_index: int | None, music_volume: float):
    """Devuelve (filtros, etiqueta_de_salida)."""
    parts = []
    if has_audio:
        parts.append(f"[{src_index}:a]atrim=0:{main_len:.3f},asetpts=PTS-STARTPTS,"
                     f"afade=t=out:st={max(0, main_len - 1.0):.3f}:d=1.0,apad=whole_dur={total_len:.3f}[asrc]")
    else:
        parts.append(f"anullsrc=r=48000:cl=stereo,atrim=0:{total_len:.3f}[asrc]")
    if music_index is not None:
        parts.append(f"[{music_index}:a]atrim=0:{total_len:.3f},asetpts=PTS-STARTPTS,volume={music_volume},"
                     f"afade=t=in:st=0:d=0.8,afade=t=out:st={max(0, total_len - 1.4):.3f}:d=1.4[amus]")
        parts.append("[asrc][amus]amix=inputs=2:duration=first:normalize=0[aout]")
        return parts, "[aout]"
    return parts, "[asrc]"


def contact_sheet(video: Path, out_png: Path, total: float, every: float = 1.5):
    """Mosaico de fotogramas para revisar el resultado de un vistazo."""
    n = max(1, math.ceil(total / every))
    cols = math.ceil(n / 2)
    run(["-i", video, "-vf", f"fps=1/{every},scale=216:384,tile={cols}x2:padding=8:color=#0F1419",
         "-frames:v", "1", out_png])


def finish(out: Path, total_len: float, no_sheet: bool):
    if not no_sheet:
        contact_sheet(out, out.with_suffix(".sheet.png"), total_len)
    print(f"✓ Listo: {out}  ({total_len:.1f}s)")
    return out


# ------------------------------------------------------------------ clip


def cmd_clip(a):
    src = Path(a.video)
    info = probe(src)
    if info["duration"] is None:
        sys.exit(f"No pude leer {src}")
    start = a.start
    end = min(a.end if a.end is not None else info["duration"], info["duration"])
    main_len = end - start
    if main_len <= 1:
        sys.exit("El fragmento debe durar más de 1 segundo.")
    total_len = main_len + END_DURATION - XFADE
    out = Path(a.out) if a.out else OUT / f"{src.stem}-reel-{a.mode}.mp4"
    work = OUT / "_work"
    work.mkdir(parents=True, exist_ok=True)
    print(f"→ Fragmento {start:.1f}s–{end:.1f}s ({main_len:.1f}s) + tarjeta final → {out.name}")

    kicker = a.kicker or BRAND_NAME
    title_png = save(overlays.title_overlay(a.title, kicker), "title.png", work)
    caption_png = save(overlays.caption_overlay(a.caption, a.caption_sub), "caption.png", work)
    stripe_png = save(overlays.stripe_overlay(), "stripe.png", work)
    end_png = save(overlays.end_card(a.end_title, a.cta), "end.png", work)

    inputs = ["-ss", f"{start:.3f}", "-t", f"{main_len:.3f}", "-i", str(src)]   # 0
    inputs += image_input(title_png, main_len)                                   # 1
    inputs += image_input(caption_png, main_len)                                 # 2
    inputs += image_input(stripe_png, main_len)                                  # 3
    inputs += image_input(end_png, END_DURATION)                                 # 4
    next_index = 5

    cues = []
    if a.srt:
        for k, (cs, ce, body) in enumerate(parse_srt(Path(a.srt))):
            cs, ce = cs - start, ce - start          # el SRT se escribe en tiempos del video original
            if ce <= 0 or cs >= main_len:
                continue
            png = save(overlays.subtitle_cue(body), f"cue{k}.png", work)
            inputs += image_input(png, main_len)
            cues.append((next_index, max(0.0, cs), min(main_len, ce)))
            next_index += 1

    music_index = None
    if a.music:
        inputs += ["-i", str(a.music)]
        music_index = next_index
        next_index += 1

    if a.mode == "blur":
        base = ("[0:v]fps=30,setpts=PTS-STARTPTS,split=2[bg][fg];"
                "[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
                "gblur=sigma=42,eq=brightness=-0.10:saturation=1.3[bgb];"
                "[fg]scale=1080:-2:flags=lanczos[fgs];"
                f"[bgb][fgs]overlay=(W-w)/2:(H-h)/2-{a.lift}[v0]")
    else:
        base = ("[0:v]fps=30,setpts=PTS-STARTPTS,"
                "scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,"
                f"crop=1080:1920:(iw-1080)*{a.focus}:(ih-1920)*0.5[v0]")

    graph = [base]
    current = "[v0]"
    for n, (idx, cs, ce) in enumerate(cues):
        graph.append(f"[{idx}:v]format=rgba,fade=t=in:st={cs:.3f}:d=0.2:alpha=1,"
                     f"fade=t=out:st={max(cs, ce - 0.2):.3f}:d=0.2:alpha=1[cue{n}]")
        graph.append(f"{current}[cue{n}]overlay=0:0:enable='between(t\\,{cs:.3f}\\,{ce:.3f})':eof_action=pass[vc{n}]")
        current = f"[vc{n}]"

    t_out = max(0.0, main_len - 0.9)
    graph.append(f"[1:v]{fade_in_out(0.4, 0.5, t_out, 0.4)}[ttl]")
    graph.append(f"[2:v]{fade_in_out(1.1, 0.5, t_out, 0.4)}[cap]")
    graph.append("[3:v]format=rgba[str]")
    graph.append(f"{current}[ttl]overlay=x='-240*{ease_out(0.4, 0.5)}':y=0:eof_action=pass[v1]")
    graph.append(f"[v1][cap]overlay=x=0:y='60*{ease_out(1.1, 0.5)}':eof_action=pass[v2]")
    graph.append("[v2][str]overlay=0:0:eof_action=pass,format=yuv420p,settb=AVTB,fps=30[vmain]")
    graph.append("[4:v]fps=30,format=yuv420p,setpts=PTS-STARTPTS,settb=AVTB,fps=30[vend]")
    graph.append(f"[vmain][vend]xfade=transition=fade:duration={XFADE}:offset={main_len - XFADE:.3f}[vout]")

    audio_parts, alabel = audio_graph(info["audio"], 0, main_len, total_len, music_index, a.music_volume)
    graph += audio_parts

    run(inputs + ["-filter_complex", ";".join(graph), "-map", "[vout]", "-map", alabel,
                  "-t", f"{total_len:.3f}"] + ENCODE + [str(out)])
    return finish(out, total_len, a.no_sheet)


# ------------------------------------------------------------------ promo


def cmd_promo(a):
    spec_path = Path(a.spec)
    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    slides = spec["slides"]
    if not slides:
        sys.exit("El JSON no tiene diapositivas.")
    end_spec = spec.get("end", {})
    out = Path(a.out) if a.out else OUT / (spec_path.stem + ".mp4")
    work = OUT / "_work"
    work.mkdir(parents=True, exist_ok=True)

    inputs, graph, labels, durations = [], [], [], []
    for i, s in enumerate(slides):
        d = float(s.get("duration", 3.4))
        durations.append(d)
        if s.get("image"):
            img_path = Path(s["image"])
            if not img_path.is_absolute():
                img_path = spec_path.parent / img_path
            bg = overlays.cover_fit(img_path)
        else:
            bg = overlays.background(s.get("bg", "fiesta"))
        bg_png = save(bg, f"slide{i}-bg.jpg", work)
        txt_png = save(overlays.promo_text_overlay(s["headline"], s.get("sub"), s.get("badge")), f"slide{i}-txt.png", work)
        bi, ti = 2 * i, 2 * i + 1
        inputs += image_input(bg_png, d)
        inputs += image_input(txt_png, d)
        frames = int(d * FPS)
        zoom = f"1+0.10*in/{frames}" if i % 2 == 0 else f"1.10-0.10*in/{frames}"
        graph.append(f"[{bi}:v]zoompan=z='{zoom}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={WIDTH}x{HEIGHT}:fps={FPS},"
                     f"format=yuv420p,setpts=PTS-STARTPTS[b{i}]")
        graph.append(f"[{ti}:v]{fade_in_out(0.25, 0.5, max(0.0, d - 0.7), 0.4)}[t{i}]")
        graph.append(f"[b{i}][t{i}]overlay=x=0:y='50*{ease_out(0.25, 0.5)}':eof_action=pass,format=yuv420p,settb=AVTB,fps=30[s{i}]")
        labels.append(f"[s{i}]")

    end_png = save(overlays.end_card(end_spec.get("headline", "¿Quieres bailar con nosotros?"),
                                     end_spec.get("cta", "Inscríbete hoy")), "end.png", work)
    end_index = 2 * len(slides)
    inputs += image_input(end_png, END_DURATION)
    graph.append(f"[{end_index}:v]fps=30,format=yuv420p,setpts=PTS-STARTPTS,settb=AVTB,fps=30[send]")
    labels.append("[send]")
    durations.append(END_DURATION)

    music_index = None
    if a.music:
        inputs += ["-i", str(a.music)]
        music_index = end_index + 1

    # Cadena de transiciones: cada xfade recorta XFADE segundos del total.
    current, elapsed = labels[0], durations[0]
    transition = spec.get("transition", "smoothleft")
    for k in range(1, len(labels)):
        last = k == len(labels) - 1
        offset = elapsed - XFADE
        label = "[vout]" if last else f"[x{k}]"
        graph.append(f"{current}{labels[k]}xfade=transition={'fade' if last else transition}:"
                     f"duration={XFADE}:offset={offset:.3f}{label}")
        current, elapsed = label, offset + durations[k]
    total_len = elapsed

    audio_parts, alabel = audio_graph(False, 0, total_len, total_len, music_index, a.music_volume)
    graph += audio_parts

    run(inputs + ["-filter_complex", ";".join(graph), "-map", "[vout]", "-map", alabel,
                  "-t", f"{total_len:.3f}"] + ENCODE + [str(out)])
    return finish(out, total_len, a.no_sheet)


# ------------------------------------------------------------------ demo


def cmd_demo(a):
    """Genera un video horizontal de relleno y produce los tres Reels de muestra."""
    OUT.mkdir(parents=True, exist_ok=True)
    work = OUT / "_work"
    work.mkdir(parents=True, exist_ok=True)
    src = OUT / "demo-fuente-16x9.mp4"
    text_png = save(overlays.placeholder_text(1920, 1080, "AQUÍ VA TU VIDEO", "grabación horizontal de la academia"),
                    "placeholder.png", work)
    print("→ Generando video horizontal de relleno (aquí iría la grabación real)")
    run(["-f", "lavfi", "-i",
         "gradients=size=1920x1080:duration=12:speed=0.02:nb_colors=3:c0=#FFC600:c1=#E31E24:c2=#003DA5:rate=30",
         "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
         "-loop", "1", "-framerate", "30", "-t", "12", "-i", str(text_png),
         "-filter_complex",
         ("[0:v]drawbox=x='mod(t*260\\,2200)-280':y=700:w=200:h=200:color=white@0.25:t=fill,"
          "drawbox=x='1920-mod(t*180\\,2300)':y=300:w=140:h=140:color=#0F1419@0.35:t=fill[bg];"
          "[bg][2:v]overlay=0:0:eof_action=pass,format=yuv420p[v]"),
         "-map", "[v]", "-map", "1:a", "-t", "12",
         "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", str(src)])

    srt = HERE / "examples" / "subtitulos-demo.srt"
    common = dict(video=str(src), start=1.0, end=11.0, title="Cumbia en el Hispanic Day Parade",
                  kicker=None, caption="Nueva York · Octubre 2024", caption_sub="Grupo de adultos, nivel intermedio",
                  end_title="¿Quieres bailar con nosotros?", cta="Inscríbete hoy", srt=str(srt),
                  music=None, music_volume=0.35, lift=90, focus=0.5, out=None, no_sheet=False)
    outs = []
    for mode in ("blur", "crop"):
        args = argparse.Namespace(mode=mode, **common)
        args.out = str(OUT / f"demo-reel-baile-{mode}.mp4")
        outs.append(cmd_clip(args))
    outs.append(cmd_promo(argparse.Namespace(spec=str(HERE / "examples" / "promo-demo.json"),
                                             out=str(OUT / "demo-reel-anuncio.mp4"), music=None,
                                             music_volume=0.35, no_sheet=False)))
    print("\nReels de muestra:")
    for o in outs:
        print("  ", o)


# ------------------------------------------------------------------ CLI


def build_parser():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("clip", help="Convierte un fragmento de un video en un Reel vertical")
    c.add_argument("video")
    c.add_argument("--start", type=float, default=0.0, help="segundo inicial")
    c.add_argument("--end", type=float, help="segundo final (por defecto, el fin del video)")
    c.add_argument("--mode", choices=["blur", "crop"], default="blur",
                   help="blur: video completo sobre fondo difuminado; crop: recorte a pantalla completa")
    c.add_argument("--focus", type=float, default=0.5, help="en modo crop, punto horizontal a conservar (0 izq, 1 der)")
    c.add_argument("--lift", type=int, default=90, help="en modo blur, cuánto subir el video para dejar sitio al texto")
    c.add_argument("--title", default="Carnaval de Barranquilla")
    c.add_argument("--kicker", default=None, help="etiqueta pequeña sobre el título")
    c.add_argument("--caption", default="")
    c.add_argument("--caption-sub", default=None)
    c.add_argument("--end-title", default="¿Quieres bailar con nosotros?")
    c.add_argument("--cta", default="Inscríbete hoy")
    c.add_argument("--srt", help="archivo de subtítulos .srt, con tiempos del video original")
    c.add_argument("--music", help="pista de música (mp3/m4a) para mezclar")
    c.add_argument("--music-volume", type=float, default=0.35)
    c.add_argument("--out")
    c.add_argument("--no-sheet", action="store_true", help="no generar el mosaico de fotogramas")
    c.set_defaults(func=cmd_clip)

    r = sub.add_parser("promo", help="Reel de anuncios a partir de un JSON con diapositivas")
    r.add_argument("spec")
    r.add_argument("--music")
    r.add_argument("--music-volume", type=float, default=0.35)
    r.add_argument("--out")
    r.add_argument("--no-sheet", action="store_true")
    r.set_defaults(func=cmd_promo)

    d = sub.add_parser("demo", help="Genera los Reels de muestra con material de relleno")
    d.set_defaults(func=cmd_demo)
    return p


def main(argv=None):
    a = build_parser().parse_args(argv)
    a.func(a)


if __name__ == "__main__":
    main()
