# miniature_decomposition.py
# LA MINIATURE de « Décomposer en facteurs premiers » (08/10/2026, série « Les bases »).
# ⭐ L'arbre de 60 et ses briques : la leçon en une image.
#
# Usage :  python manim/miniature_decomposition.py ["EN 5 MIN"]
# Sortie : manim/sorties/bases/maths/paysage/fr/decomposition/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import NAVY, RACINE, VERT, police
import miniature_essai_v2 as paysage

ORANGE = (217, 119, 20)
VIOLET = (109, 40, 217)
COUL = {2: VERT, 3: ORANGE, 5: VIOLET}


def acc(d):
    """Bande utile : y 356 → 600, x 58 → 920. L'arbre à gauche, les briques à droite."""
    f = police("ariblk.ttf", 44)
    fp = police("ariblk.ttf", 40)

    def nombre(x, y, n, premier=False):
        coul = COUL[n] if premier else NAVY
        w = d.textlength(str(n), font=f)
        if premier:
            d.ellipse([x - 32, y - 32, x + 32, y + 32], outline=coul, width=5)
        d.text((x - w / 2, y - 27), str(n), font=f, fill=coul)

    racine, g, dr = (260, 380), (160, 470), (360, 470)
    feuilles = [(110, 560, 2), (210, 560, 3), (310, 560, 2), (410, 560, 5)]
    for a, b in [(racine, g), (racine, dr)]:
        d.line([(a[0], a[1] + 28), (b[0], b[1] - 28)], fill=NAVY, width=4)
    for x, y, _ in feuilles:
        par = g if x < 260 else dr
        d.line([(par[0], par[1] + 28), (x, y - 32)], fill=NAVY, width=4)
    nombre(*racine, 60)
    nombre(*g, 6)
    nombre(*dr, 10)
    for x, y, p in feuilles:
        nombre(x, y, p, premier=True)

    # les briques, empilées comme un mur
    for i, p in enumerate((2, 2, 3, 5)):
        x0, y0 = 540 + (i % 2) * 170, 400 + (i // 2) * 100
        d.rounded_rectangle([x0, y0, x0 + 150, y0 + 80], radius=12, fill=(240, 248, 240), outline=COUL[p], width=6)
        w = d.textlength(str(p), font=fp)
        d.text((x0 + 75 - w / 2, y0 + 14), str(p), font=fp, fill=COUL[p])


def acc_short(d):
    """Le short : 60 en haut, et le mur de briques 2, 2, 3, 5."""
    f = police("ariblk.ttf", 140)
    fb = police("ariblk.ttf", 80)
    d.text((540 - d.textlength("60 =", font=f) / 2, 650), "60 =", font=f, fill=NAVY)
    for i, p in enumerate((2, 2, 3, 5)):
        x0, y0 = 250 + (i % 2) * 300, 860 + (i // 2) * 190
        d.rounded_rectangle([x0, y0, x0 + 270, y0 + 160], radius=18, fill=(240, 248, 240), outline=COUL[p], width=8)
        w = d.textlength(str(p), font=fb)
        d.text((x0 + 135 - w / 2, y0 + 30), str(p), font=fb, fill=COUL[p])


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    (RACINE / "manim/sorties/bases/maths/paysage/fr/decomposition").mkdir(parents=True, exist_ok=True)
    paysage.construire("eleveai-maths-bases-decomposition", {
        "badge": "LES BASES", "duree": sys.argv[1] if len(sys.argv) > 1 else "EN 5 MIN",
        "titre": ["DÉCOMPOSER EN", "FACTEURS PREMIERS"],
        "accroche": acc,
    })
    import shutil
    import miniature_short as short
    nom = "eleveai-maths-bases-decomposition-short"
    short.construire(nom, {
        "badge": "LES BASES", "titre": ["60 BILLES", "CASSÉES EN BRIQUES"], "taille": 74,
        "sous": "décomposer en facteurs premiers", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_short, "dossier": "bases/maths/fr",
    })
    dst = RACINE / "manim/sorties/bases/maths/shorts/fr/decomposition"
    dst.mkdir(parents=True, exist_ok=True)
    shutil.copy(short.SORTIE / "bases/maths/fr" / f"{nom}.png", dst / f"{nom}.png")
    print(dst / f"{nom}.png")


if __name__ == "__main__":
    main()
