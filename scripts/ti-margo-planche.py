# Assemble les images d'un dossier de contrôle (ou tire les images d'un mp4) en une planche à regarder.
#   python scripts/ti-margo-planche.py <dossier> <sortie.png>
#   python scripts/ti-margo-planche.py <film.mp4> <sortie.png> [nombre d'images, 24 par défaut]
import glob
import os
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw

source, sortie, *reste = sys.argv[1:]
LARGE, HAUT, COLONNES = 240, 427, 6


def assembler(fichiers, legendes):
    global LARGE, HAUT, COLONNES
    # Un film paysage (plus large que haut) : vignettes couchées, 4 par ligne ; le vertical ne change pas
    l0, h0 = Image.open(fichiers[0]).size
    if l0 > h0:
        LARGE, HAUT, COLONNES = 427, 240, 4
    lignes = (len(fichiers) + COLONNES - 1) // COLONNES
    planche = Image.new("RGB", (COLONNES * LARGE, lignes * HAUT), "white")
    for i, f in enumerate(fichiers):
        im = Image.open(f).convert("RGB").resize((LARGE - 4, HAUT - 4))
        ImageDraw.Draw(im).text((4, 4), legendes[i], fill="red")
        planche.paste(im, ((i % COLONNES) * LARGE + 2, (i // COLONNES) * HAUT + 2))
    planche.save(sortie)


if os.path.isdir(source):
    fichiers = sorted(glob.glob(os.path.join(source, "*.png")))
    assembler(fichiers, [os.path.basename(f)[1:-4].lstrip("0") for f in fichiers])
else:
    n = int(reste[0]) if reste else 24
    duree = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", source], capture_output=True, text=True).stdout)
    with tempfile.TemporaryDirectory() as d:
        fichiers, legendes = [], []
        for i in range(n):
            t = duree * (i + 0.5) / n
            f = os.path.join(d, f"{i:03}.png")
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{t:.2f}", "-i", source, "-frames:v", "1", f], check=True)
            fichiers.append(f)
            legendes.append(f"{t:.1f}")
        assembler(fichiers, legendes)
    print(f"durée {duree:.2f} s")
