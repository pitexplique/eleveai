# miniature_short_signes.py
# LA MINIATURE VERTICALE du short « Le dauphin et le tableau de signes »
# (seconde, CEINTURE BLANCHE, 11/10/2026). Même machinerie que
# `miniature_short.py` (fond, badge, signature), comme `miniature_short_trigo.py`.
#
# ⭐ L'accroche MONTRE le short : le dauphin bleu dans l'air (+), orange sous
# l'eau (−), et le tableau de signes rempli en dessous. La ceinture blanche est
# dessinée (règle des ceintures, manim/REGLES.md).
# ⭐ Rangée À CÔTÉ DE SA VIDÉO : manim/sorties/seconde/maths/shorts/fr/signes-expression/.
#
# Usage :  python manim/miniature_short_signes.py

import math
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import NAVY, police
from miniature_short import ORANGE, W, construire

RACINE = Path(__file__).resolve().parents[1]
DOSSIER_VIDEO = RACINE / "manim" / "sorties" / "seconde" / "maths" / "shorts" / "fr" / "signes-expression"

BLEU_AIR = (24, 130, 220)
ORANGE_EAU = (236, 110, 20)
MER = (30, 58, 138)
Y_SURFACE = 1000


def h(t):
    return (3 - t) * (t - 1)


def pt(t):
    """Le saut, étiré dans l'air pour qu'il se voie (le fond reste lisible)."""
    v = h(t)
    return 120 + 210 * t, Y_SURFACE - (150 if v > 0 else 50) * v


def dauphin(d, cx, cy, angle, longueur, coul):
    """Le dauphin des vidéos (corps, rostre, aileron, queue), en polygones."""
    s = longueur / 1.4

    def tr(pts):
        ca, sa = math.cos(angle), math.sin(angle)
        return [(cx + s * (x * ca - y * sa), cy - s * (x * sa + y * ca)) for x, y in pts]

    # ⛔ Une ellipse + un grand triangle faisaient un REQUIN : le dauphin a un
    # front bombé, un rostre court, et un petit aileron courbé vers l'arrière.
    contour = [(0.70, -0.02), (0.60, 0.02), (0.52, 0.05), (0.47, 0.12), (0.36, 0.17), (0.18, 0.18),
               (0.06, 0.18), (-0.06, 0.30), (-0.13, 0.33), (-0.10, 0.24), (-0.14, 0.15),
               (-0.32, 0.10), (-0.50, 0.05), (-0.58, 0.03), (-0.68, 0.15), (-0.75, 0.15),
               (-0.65, 0.0), (-0.75, -0.15), (-0.68, -0.15), (-0.58, -0.03), (-0.40, -0.07),
               (-0.15, -0.12), (0.06, -0.13), (0.04, -0.27), (0.10, -0.28), (0.20, -0.12),
               (0.38, -0.10), (0.52, -0.06), (0.62, -0.05)]
    d.polygon(tr(contour), fill=coul)
    ex, ey = tr([(0.40, 0.06)])[0]
    d.ellipse([ex - 6, ey - 6, ex + 6, ey + 6], fill=(11, 16, 32))


def ceinture(d, cx, cy, larg=190, couleur=(255, 255, 255)):
    """Une ceinture dessinée (blanche par défaut), cerclée de bleu nuit (fond clair)."""
    c, o = couleur, NAVY
    d.rectangle([cx - larg / 2, cy - 16, cx + larg / 2, cy + 16], fill=c, outline=o, width=4)
    for sgn in (-1, 1):
        d.polygon([(cx + sgn * 8, cy + 10), (cx + sgn * 44, cy + 92), (cx + sgn * 22, cy + 98), (cx - sgn * 4, cy + 14)],
                  fill=c, outline=o, width=4)
    d.rectangle([cx - 22, cy - 22, cx + 22, cy + 22], fill=c, outline=o, width=4)


def centre(d, cx, y, txt, f, fill):
    d.text((cx - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=fill)


def acc_dauphin(d):
    # la ceinture blanche, en haut à gauche de l'accroche
    ceinture(d, 170, 690)
    centre(d, 170, 800, "ceinture", police("arialbd.ttf", 34), NAVY)
    centre(d, 170, 838, "blanche", police("arialbd.ttf", 34), NAVY)
    # la mer
    d.rectangle([0, Y_SURFACE, W, 1165], fill=MER)
    d.line([(0, Y_SURFACE), (W, Y_SURFACE)], fill=(56, 189, 248), width=6)
    # la trajectoire, en pointillés
    for i in range(0, 80, 2):
        a, b = pt(i / 20), pt((i + 1) / 20)
        d.line([a, b], fill=(200, 210, 225) if h(i / 20) < 0 else NAVY, width=5)
    # les deux dauphins
    x1, y1 = pt(0.45)
    dauphin(d, x1, y1, 0.9, 190, ORANGE_EAU)
    x2, y2 = pt(2.0)
    dauphin(d, x2, y2 - 10, 0.0, 250, BLEU_AIR)
    # les deux signes
    fs = police("arialbd.ttf", 150)
    centre(d, 830, 690, "+", fs, BLEU_AIR)
    centre(d, 830, 985, "−", fs, ORANGE_EAU)
    # le tableau de signes, rempli
    f = police("arialbd.ttf", 46)
    xg, xs, xd, y0, hr = 70, 270, 1010, 1185, 78
    for r in range(2):
        d.rectangle([xg, y0 + r * hr, xd, y0 + (r + 1) * hr], fill=(255, 255, 255), outline=NAVY, width=4)
    d.line([(xs, y0), (xs, y0 + 2 * hr)], fill=NAVY, width=4)
    centre(d, (xg + xs) / 2, y0 + 14, "t (s)", f, NAVY)
    centre(d, (xg + xs) / 2, y0 + hr + 14, "signe", f, NAVY)
    xv = [335, 555, 775, 955]
    for x, v in zip(xv, ["0", "1", "3", "4"]):
        centre(d, x, y0 + 14, v, f, NAVY)
    for x in xv[1:3]:
        d.line([(x, y0 + hr), (x, y0 + 2 * hr)], fill=(150, 165, 185), width=3)
    fsig = police("arialbd.ttf", 60)
    for x, s, c in [((xv[0] + xv[1]) / 2, "−", ORANGE_EAU), (xv[1], "0", NAVY), ((xv[1] + xv[2]) / 2, "+", BLEU_AIR),
                    (xv[2], "0", NAVY), ((xv[2] + xv[3]) / 2, "−", ORANGE_EAU)]:
        if s == "0":
            d.rectangle([x - 22, y0 + hr + 8, x + 22, y0 + 2 * hr - 8], fill=(255, 255, 255))
        centre(d, x, y0 + hr + 4, s, fsig, c)


SHORTS = {
    "eleveai-maths-seconde-signes-short-dauphin": {
        "badge": "TABLEAU DE SIGNES",
        "titre": ["SOUS L'EAU : −", "DANS L'AIR : +"],
        "taille": 92,
        "sous": "le dauphin remplit le tableau",
        "taille_sous": 50,
        "couleur_sous": ORANGE,
        "accroche": acc_dauphin,
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
