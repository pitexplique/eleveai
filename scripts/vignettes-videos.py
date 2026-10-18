"""Vignettes légères des vidéos pour la galerie /video (façon YouTube / Netflix).

    python scripts/vignettes-videos.py

1. Pour chaque miniature PNG de manim/sorties (1920 px, ~200 Ko), écrit à côté
   un `<nom>.vignette.webp` de 480 px de large (270 px pour un vertical), ~11 Ko.
2. Pour chaque MP4 SANS PNG voisin (tout le CP, les essais…), prend l'image à
   1 s avec ffmpeg — l'image que montre aussi la publication — et écrit
   `<nom de la vidéo>.vignette.webp` à côté du MP4.
Ne refait que les vignettes absentes ou plus vieilles que leur source.
Ensuite : `scripts/r2-videos.ps1 -Envoyer` puis `node scripts/generer-videos-r2.mjs`.
"""
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

SORTIES = Path(__file__).resolve().parent.parent / "manim" / "sorties"


def ffmpeg() -> str:
    trouve = shutil.which("ffmpeg")
    if trouve:
        return trouve
    paquets = Path(os.environ["LOCALAPPDATA"]) / "Microsoft" / "WinGet" / "Packages"
    for exe in paquets.glob("Gyan.FFmpeg*/**/bin/ffmpeg.exe"):
        return str(exe)
    raise SystemExit("ffmpeg introuvable : winget install --id Gyan.FFmpeg -e")


def a_jour(cible: Path, source: Path) -> bool:
    return cible.exists() and cible.stat().st_mtime >= source.stat().st_mtime


def reduire(im: Image.Image, cible: Path) -> None:
    im = im.convert("RGB")
    largeur = 270 if im.height > im.width else 480
    im.thumbnail((largeur, largeur * 2), Image.LANCZOS)
    im.save(cible, "WEBP", quality=78, method=6)


def utiles(motif: str):
    for f in SORTIES.rglob(motif):
        if "partial_movie_files" not in f.parts and not f.parent.name.startswith("480p"):
            yield f


faites = gardees = 0
for png in utiles("*.png"):
    cible = png.with_name(png.stem + ".vignette.webp")
    if a_jour(cible, png):
        gardees += 1
        continue
    with Image.open(png) as im:
        reduire(im, cible)
    faites += 1

exe = None
images = 0
with tempfile.TemporaryDirectory() as tmp:
    for mp4 in utiles("*.mp4"):
        if mp4.with_suffix(".png").exists():
            continue
        cible = mp4.with_name(mp4.stem + ".vignette.webp")
        if a_jour(cible, mp4):
            gardees += 1
            continue
        exe = exe or ffmpeg()
        cadre = Path(tmp) / "cadre.png"
        r = subprocess.run(
            [exe, "-v", "error", "-y", "-ss", "1", "-i", str(mp4), "-frames:v", "1", str(cadre)],
            capture_output=True,
        )
        if r.returncode or not cadre.exists():  # vidéo de moins d'1 s : première image
            subprocess.run([exe, "-v", "error", "-y", "-i", str(mp4), "-frames:v", "1", str(cadre)], check=True)
        with Image.open(cadre) as im:
            reduire(im, cible)
        cadre.unlink()
        images += 1

print(f"{faites} vignettes de PNG, {images} images tirées des vidéos, {gardees} déjà à jour")
