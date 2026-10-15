# miniature_short_analyse.py
# LA MINIATURE VERTICALE du short « Ne te trompe pas d'axe » (analyse graphique,
# seconde, CEINTURE BLANCHE, 12/10/2026). Même machinerie que miniature_short.py.
# L'accroche MONTRE la lecture : 22 h en bas → la courbe → 3 °C à gauche.
# Rangée à côté de sa vidéo : manim/sorties/seconde/maths/shorts/fr/analyse-graphique/.
#
# Usage :  python manim/miniature_short_analyse.py

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import NAVY, VERT, police
from miniature_short import ORANGE, W, construire
from miniature_short_signes import BLEU_AIR, ceinture, centre

RACINE = Path(__file__).resolve().parents[1]
DOSSIER_VIDEO = RACINE / "manim" / "sorties" / "seconde" / "maths" / "shorts" / "fr" / "analyse-graphique"

YS = [6, 4, 3, 2, 0, -1, -2, -3, -2, 0, 3]
DD = [YS[i + 1] - YS[i] for i in range(10)]
M = [DD[0]] + [0 if DD[i - 1] * DD[i] <= 0 else 2 / (1 / DD[i - 1] + 1 / DD[i]) for i in range(1, 10)] + [DD[-1]]


def T(t):
    i = min(int(t), 9)
    s = t - i
    return ((2 * s**3 - 3 * s**2 + 1) * YS[i] + (s**3 - 2 * s**2 + s) * M[i]
            + (-2 * s**3 + 3 * s**2) * YS[i + 1] + (s**3 - s**2) * M[i + 1])


def acc_nuit(d):
    X0, Y0, UX, UY = 150, 1010, 78, 50       # t = 0, T = 0
    pt = lambda t, y: (X0 + UX * t, Y0 - UY * y)
    GRIS = (205, 215, 230)
    for t in range(0, 11):
        d.line([pt(t, -3.5), pt(t, 6.5)], fill=GRIS, width=2)
    for y in range(-3, 7):
        d.line([pt(0, y), pt(10.4, y)], fill=GRIS, width=2)
    d.line([pt(0, -3.5), pt(10.4, -3.5)], fill=NAVY, width=5)
    d.line([pt(0, -3.5), pt(0, 6.5)], fill=NAVY, width=5)
    f = police("arialbd.ttf", 30)
    for t, h in {0: "20 h", 2: "22 h", 4: "0 h", 6: "2 h", 8: "4 h", 10: "6 h"}.items():
        centre(d, pt(t, -3.5)[0], pt(t, -3.5)[1] + 10, h, f, NAVY)
    for y in (-3, 0, 3, 6):
        d.text((pt(0, y)[0] - 70, pt(0, y)[1] - 18), f"{y} °".replace("-", "−"), font=f, fill=NAVY)
    pts = [pt(k / 20, T(k / 20)) for k in range(201)]
    d.line(pts, fill=BLEU_AIR, width=9, joint="curve")
    # la lecture : 22 h → la courbe → 3 °C
    for a, b in ((pt(2, -3.5), pt(2, 3)), (pt(2, 3), pt(0, 3))):
        x0, y0 = a
        x1, y1 = b
        n = 14
        for k in range(0, n, 2):
            d.line([(x0 + (x1 - x0) * k / n, y0 + (y1 - y0) * k / n), (x0 + (x1 - x0) * (k + 1) / n, y0 + (y1 - y0) * (k + 1) / n)], fill=ORANGE, width=7)
    x, y = pt(2, 3)
    d.ellipse([x - 13, y - 13, x + 13, y + 13], fill=ORANGE)
    centre(d, 540, 1250, "22 h  →  3 °C", police("ariblk.ttf", 70), VERT)
    ceinture(d, 610, 720, larg=150)
    centre(d, 610, 835, "ceinture", police("arialbd.ttf", 30), NAVY)
    centre(d, 610, 870, "blanche", police("arialbd.ttf", 30), NAVY)


SHORTS = {
    "eleveai-maths-seconde-analyse-graphique-short-nuit": {
        "badge": "LECTURE GRAPHIQUE",
        "titre": ["NE TE TROMPE", "PAS D'AXE !"],
        "taille": 96,
        "sous": "l'heure en bas, la température à gauche",
        "taille_sous": 44,
        "couleur_sous": ORANGE,
        "accroche": acc_nuit,
        "dossier": "seconde/maths/fr",
    },
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, spec in SHORTS.items():
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)
        source = RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png"
        DOSSIER_VIDEO.mkdir(parents=True, exist_ok=True)
        shutil.copy(source, DOSSIER_VIDEO / f"{nom}.png")
        print(DOSSIER_VIDEO / f"{nom}.png")


if __name__ == "__main__":
    main()
