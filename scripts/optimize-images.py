#!/usr/bin/env python3
from pathlib import Path

try:
    from PIL import Image
except ImportError as error:
    raise SystemExit("Pillow is required: python3 -m pip install Pillow") from error

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
JOBS = {
    "brigadeiro-pattern.png": (360, 360, 80),
    "cheesecake.png": (1024, 1024, 82),
    "choco-cake.png": (686, 386, 82),
    "brigadeiro-mascot.png": (420, 630, 82),
    "experiencia-brigadeiro.png": (1280, 854, 82),
    "pega/brigadeiro.png": (800, 600, 82),
    "pega/brownie.png": (800, 600, 82),
    "pega/bolo-no-pote.png": (800, 600, 82),
    "pega/cheesecake.png": (800, 600, 82),
    "pega/cupcake.png": (800, 600, 82),
    "pega/bolo-recheado.png": (800, 600, 82),
    "mouse/morango.png": (96, 96, 80),
    "mouse/cacau.png": (96, 96, 80),
    "mouse/coco.png": (96, 96, 80),
    "mouse/castanhas.png": (96, 96, 80),
    "mouse/tamara.png": (96, 96, 80),
}

for relative_path, (max_width, max_height, quality) in JOBS.items():
    source = ASSETS / relative_path
    destination = source.with_suffix(".webp")
    with Image.open(source) as opened:
        image = opened.convert("RGBA" if "A" in opened.getbands() else "RGB")
        image.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=quality, method=6, exact=True)
        print(
            f"{destination.relative_to(ROOT)} "
            f"{image.width}x{image.height} {destination.stat().st_size} bytes"
        )
