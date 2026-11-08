# miniature_demi_droite.py
# LES MINIATURES des PAYSAGES de la série « Repérer sur une demi-droite graduée »
# (6e, une paysage par micro) et de la paysage commune CM1/CM2 « decimal_droite »
# (08/11/2026). Même style que la série Décimaux (miniature_decimaux.py) :
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des
# ceintures, avec la ceinture DE LA VIDÉO (blanche, jaune, orange, verte).
# Le short Ti Margo a sa miniature faite par son film (window.tiMargoMiniature).
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_demi_droite.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police
from miniature_angles import ajuste, minutes
from miniature_essai_v2 import construire as construire_paysage
from miniature_short_expression import echelle

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"


def acc(haut, bas, vert, ceinture, y0=352):
    def f(d):
        th = ajuste(d, haut, 92, 900)
        tb = ajuste(d, bas, 58, 900)
        d.text((56, y0), haut, font=police("ariblk.ttf", th), fill=BLEU)
        d.text((60, y0 + th + 26), bas, font=police("ariblk.ttf", tb), fill=VERT if vert else ROUGE)
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


# nom, dossier, badge, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("eleveai-maths-6e-demi-droite-lire", "6e/maths/demi-droite-graduee/01-lire", "MATHS · 6E",
     ["COMPRENDRE", "LIRE UNE ABSCISSE"], "R = 5 km", "on compte les sauts, pas les traits !", False, "blanche"),
    ("eleveai-maths-6e-demi-droite-placer", "6e/maths/demi-droite-graduee/02-placer", "MATHS · 6E",
     ["COMPRENDRE", "PLACER UN DÉCIMAL"], "2,3 : où ?", "2, puis 3 sauts de 0,1 !", True, "jaune"),
    ("eleveai-maths-6e-demi-droite-fraction", "6e/maths/demi-droite-graduee/03-fraction", "MATHS · 6E",
     ["COMPRENDRE", "PLACER UNE FRACTION"], "7/4 > 1", "4 parts par unité, 7 sauts !", True, "orange"),
    ("eleveai-maths-6e-demi-droite-graduer", "6e/maths/demi-droite-graduee/04-graduer", "MATHS · 6E",
     ["COMPRENDRE", "GRADUER UNE DEMI-DROITE"], "0 · 1 · 2 · 3", "toujours le même écart !", True, "orange"),
    ("eleveai-maths-cm1-decimal-droite", "cm1/maths/nombres-decimaux/decimal-droite", "MATHS · CM1",
     ["COMPRENDRE", "LES DÉCIMAUX SUR LA DROITE"], "0,7 : 7 sauts", "0,08 n'est pas au 8e trait !", False, "verte"),
    ("eleveai-maths-cm2-decimal-droite", "cm2/maths/nombres-decimaux/decimal-droite", "MATHS · CM2",
     ["COMPRENDRE", "LES DÉCIMAUX SUR LA DROITE"], "0,7 : 7 sauts", "0,08 n'est pas au 8e trait !", False, "jaune"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for nom, rel, badge, tit, haut, bas, vert, ceinture in EP:
        if filtre and filtre not in nom:
            continue
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": badge, "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc(haut, bas, vert, ceinture), "dossier": rel,
        })


if __name__ == "__main__":
    main()
