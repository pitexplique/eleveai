# miniature_longueur_ce2.py
# LES MINIATURES des PAYSAGES de la série LONGUEURS CE2 (14/11/2026), copie de miniature_contenance_ce2.py.
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures
# (01 blanche, 02-03 jaune, 04 orange, 05-06 jaune, 07 orange, 08 bleue). Les miniatures des shorts viennent du film Ti Margo.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/ce2/maths/longueur/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_longueur_ce2.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import BLEU, ROUGE, VERT, ajuste, echelle, minutes, police
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("unites", "01-unites", ["LES UNITÉS", "DE LONGUEUR"], "km · m · dm · cm · mm", "la bonne unité pour chaque longueur !", True, "blanche"),
    ("relations", "02-relations", ["MÈTRE, DÉCIMÈTRE,", "CENTIMÈTRE"], "1 m = 10 dm = 100 cm", "100 cm, c'est pareil que 1 m !", True, "jaune"),
    ("mesurer", "03-mesurer", ["MESURER", "AVEC UNE RÈGLE"], "on part du 0 !", "pas du bout de la règle", False, "jaune"),
    ("comparer", "04-comparer", ["COMPARER", "DES LONGUEURS"], "1 dm ou 9 cm ?", "d'abord la même unité !", False, "orange"),
    ("choisir_unite", "05-choisir-unite", ["CHOISIR", "LA BONNE UNITÉ"], "cm, m ou km ?", "un nombre court et clair", True, "jaune"),
    ("estimer", "06-estimer", ["ESTIMER", "UNE LONGUEUR"], "un doigt, une main, un pas", "environ combien ? sans règle !", True, "jaune"),
    ("probleme", "07-probleme", ["UN PROBLÈME", "DE LONGUEURS"], "3 m + 250 cm = ?", "on convertit d'abord !", False, "orange"),
    ("defi", "08-defi", ["UN DÉFI", "DE LONGUEURS"], "12 cm = 120 mm = 1 dm et 2 cm", "qui a raison ?", True, "bleue"),
]


def acc(haut, bas, vert, ceinture, y0=352):
    def f(d):
        th = ajuste(d, haut, 92, 900)
        tb = ajuste(d, bas, 58, 900)
        d.text((56, y0), haut, font=police("ariblk.ttf", th), fill=BLEU)
        d.text((60, y0 + th + 26), bas, font=police("ariblk.ttf", tb), fill=VERT if vert else ROUGE)
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for slug, rep, tit, haut, bas, vert, ceint in EP:
        if filtre and filtre != slug:
            continue
        rel = f"ce2/maths/longueur/{rep}"
        nom = f"eleveai-maths-ce2-longueur-{slug.replace('_', '-')}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · CE2", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
