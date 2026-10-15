# miniature_nombres_premiers.py
# LES MINIATURES de « Pourquoi 13 ne se range pas » (07/10/2026, série « Les bases »).
# ⭐ Titre choisi par Frédéric. Les billes : 12 se range en rectangle, 13 déborde
# d'une bille rouge — la question du titre en une image.
#
# Usage :  python manim/miniature_nombres_premiers.py
# Sorties : manim/sorties/bases/maths/{paysage,shorts}/fr/nombres-premiers/

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, RACINE, ROUGE, VERT, police
import miniature_essai_v2 as paysage
import miniature_short as short

ORANGE = (217, 119, 20)


def grille(d, cx, cy, n, par_rangee, pas, r, cadre=None):
    """n billes, `par_rangee` par rangée, centrées sur (cx, cy) ; ce qui dépasse
    d'une rangée complète est en ROUGE, à droite de la dernière rangée."""
    rangees = n // par_rangee
    trop = n - rangees * par_rangee
    x0 = cx - (par_rangee - 1) * pas / 2
    y0 = cy - (rangees - 1) * pas / 2
    if cadre:
        for k in range(rangees):
            y = y0 + k * pas
            d.rounded_rectangle([x0 - r - 6, y - r - 6, x0 + (par_rangee - 1) * pas + r + 6, y + r + 6],
                                radius=14, outline=cadre, width=5)
    for k in range(rangees * par_rangee):
        x, y = x0 + (k % par_rangee) * pas, y0 + (k // par_rangee) * pas
        d.ellipse([x - r, y - r, x + r, y + r], fill=BLEU)
    for k in range(trop):
        x, y = x0 + (par_rangee + 0.5 + k) * pas, y0 + (rangees - 1) * pas
        d.ellipse([x - r, y - r, x + r, y + r], fill=ROUGE)


def acc_paysage(d):
    """Bande utile : y 356 → 600, x 58 → 920."""
    f = police("ariblk.ttf", 44)
    grille(d, 230, 450, 12, 4, 46, 16, cadre=VERT)
    d.text((230 - d.textlength("12", font=f) / 2, 535), "12", font=f, fill=VERT)
    grille(d, 640, 450, 13, 4, 46, 16)
    d.text((620 - d.textlength("13 ?", font=f) / 2, 535), "13 ?", font=f, fill=ROUGE)


def acc_short(d):
    f = police("ariblk.ttf", 64)
    grille(d, 540, 760, 12, 4, 72, 25, cadre=VERT)
    d.text((540 - d.textlength("12", font=f) / 2, 880), "12", font=f, fill=VERT)
    grille(d, 520, 1120, 13, 4, 72, 25)
    d.text((540 - d.textlength("13 ?", font=f) / 2, 1240), "13 ?", font=f, fill=ROUGE)


def acc_short_memoire(d):
    """Les 15 nombres premiers jusqu'à 50, en grille 3 × 5."""
    f = police("ariblk.ttf", 84)
    premiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    for i, n in enumerate(premiers):
        r, c = divmod(i, 3)
        txt = str(n)
        cx, y = 300 + c * 240, 690 + r * 120
        d.text((cx - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=VERT if i % 2 == 0 else NAVY)


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    (RACINE / "manim/sorties/bases/maths/paysage/fr/nombres-premiers").mkdir(parents=True, exist_ok=True)
    paysage.construire("eleveai-maths-bases-nombres-premiers", {
        "badge": "LES BASES", "duree": sys.argv[1] if len(sys.argv) > 1 else "EN 5 MIN",
        "titre": ["POURQUOI 13", "NE SE RANGE PAS"],
        "accroche": acc_paysage,
    })
    nom = "eleveai-maths-bases-nombres-premiers-short"
    short.construire(nom, {
        "badge": "LES BASES", "titre": ["POURQUOI 13", "NE SE RANGE PAS"], "taille": 92,
        "sous": "les nombres premiers", "taille_sous": 56, "couleur_sous": ORANGE,
        "accroche": acc_short, "dossier": "bases/maths/fr",
    })
    dst = RACINE / "manim/sorties/bases/maths/shorts/fr/nombres-premiers"
    dst.mkdir(parents=True, exist_ok=True)
    shutil.copy(short.SORTIE / "bases/maths/fr" / f"{nom}.png", dst / f"{nom}.png")
    print(dst / f"{nom}.png")
    nom = "eleveai-maths-bases-nombres-premiers-short-memoire"
    short.construire(nom, {
        "badge": "LES BASES", "titre": ["DÉFI MÉMOIRE", "15 SECONDES"], "taille": 96,
        "sous": "retiens les nombres premiers", "taille_sous": 52, "couleur_sous": ORANGE,
        "accroche": acc_short_memoire, "dossier": "bases/maths/fr",
    })
    shutil.copy(short.SORTIE / "bases/maths/fr" / f"{nom}.png", dst / f"{nom}.png")
    print(dst / f"{nom}.png")


if __name__ == "__main__":
    main()
