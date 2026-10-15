# miniature_notations_geometrie.py
# LES DEUX MINIATURES des notations en géométrie (30/09/2026, série « Les bases »).
# ⛔ FICHIER À PART : emprunte `miniature_essai_v2.py` (paysage) et
# `miniature_short.py` (vertical) sans y toucher.
# ⭐ Le code couleur des vidéos : ROUGE = ça s'arrête (crochet), VERT = ça continue
# (parenthèse). Les trois notations en gros, chacune sur son dessin.
#
# Usage :  python manim/miniature_notations_geometrie.py
# Sorties : à côté de chaque vidéo, dans manim/sorties/bases/maths/…

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import NAVY, ROUGE, VERT, RACINE, police
import miniature_essai_v2 as paysage
import miniature_short as short


def notation(d, x, y, morceaux, f):
    for t, c in morceaux:
        d.text((x, y), t, font=f, fill=c)
        x += d.textlength(t, font=f)
    return x


def ligne(d, xa, xb, y, gauche, droite, xmin, xmax, ep=7, lettres=True, f=None):
    d.line([(xa, y), (xb, y)], fill=NAVY, width=ep)
    if gauche:
        d.line([(xmin, y), (xa, y)], fill=VERT, width=ep)
    else:
        d.line([(xa, y - 26), (xa, y + 26)], fill=ROUGE, width=ep + 5)
    if droite:
        d.line([(xb, y), (xmax, y)], fill=VERT, width=ep)
    else:
        d.line([(xb, y - 26), (xb, y + 26)], fill=ROUGE, width=ep + 5)
    for x in (xa, xb):
        d.line([(x - 11, y - 11), (x + 11, y + 11)], fill=NAVY, width=5)
        d.line([(x - 11, y + 11), (x + 11, y - 11)], fill=NAVY, width=5)
    if lettres:
        d.text((xa - 14, y - 78), "A", font=f, fill=NAVY)
        d.text((xb - 14, y - 78), "B", font=f, fill=NAVY)


TROIS = [
    (True, True, [("(", VERT), ("AB", NAVY), (")", VERT)]),
    (False, True, [("[", ROUGE), ("AB", NAVY), (")", VERT)]),
    (False, False, [("[", ROUGE), ("AB", NAVY), ("]", ROUGE)]),
]


def acc_paysage(d):
    """Les trois notations côte à côte, chacune au-dessus de son petit dessin.
    Bande utile : y 356 → 600, x 58 → 920."""
    f = police("ariblk.ttf", 92)
    for i, (g, dr, morceaux) in enumerate(TROIS):
        x0 = 60 + i * 290
        notation(d, x0 + 10, 372, morceaux, f)
        ligne(d, x0 + 50, x0 + 190, 560, g, dr, x0, x0 + 250, lettres=False)


def acc_short(d):
    """Trois lignes, mêmes lettres, et leur notation à droite."""
    fl, fn = police("ariblk.ttf", 44), police("ariblk.ttf", 96)
    for i, (g, dr, morceaux) in enumerate(TROIS):
        y = 820 + i * 230
        ligne(d, 150, 390, y, g, dr, 70, 480, ep=9, f=fl)
        notation(d, 560, y - 62, morceaux, fn)


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    # 4:48 → « 5 min »
    paysage.construire("eleveai-maths-bases-notations-geometrie", {
        "badge": "LA GÉOMÉTRIE", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE LES", "NOTATIONS EN GÉOMÉTRIE"],
        "accroche": acc_paysage,
    })

    nom = "eleveai-maths-bases-notations-geometrie-short"
    short.construire(nom, {
        "badge": "LA GÉOMÉTRIE", "titre": ["MÊMES LETTRES", "3 DESSINS"], "taille": 100,
        "sous": "tu sais pourquoi ?", "taille_sous": 60, "couleur_sous": (217, 119, 20),
        "accroche": acc_short,
        "dossier": "bases/maths/fr",
    })
    src = short.SORTIE / "bases/maths/fr" / f"{nom}.png"
    dst = RACINE / "manim/sorties/bases/maths/shorts/fr/notations-geometrie" / f"{nom}.png"
    shutil.copy(src, dst)
    print(dst)


if __name__ == "__main__":
    main()
