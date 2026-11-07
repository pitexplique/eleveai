# miniature_triangles.py
# LES MINIATURES des PAYSAGES de la série TRIANGLES 6e (07/11/2026).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (verte).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/6e/maths/triangles/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_triangles.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import acc_paysage, minutes
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?
EP = [
    ("nommer", "01-nommer", ["COMPRENDRE", "LE NOM D'UN TRIANGLE"], "ABC = BCA", "mais AB n'est qu'un côté !", False),
    ("sommet-cote", "02-sommet-cote", ["COMPRENDRE", "SOMMETS ET CÔTÉS"], "[BC] en face de A", "le côté opposé ne touche pas A !", False),
    ("type-cote", "03-type-cote", ["COMPRENDRE", "ISOCÈLE, ÉQUILATÉRAL"], "6 cm ou 6,5 cm ?", "on mesure, jamais à l'œil !", False),
    ("type-angle", "04-type-angle", ["COMPRENDRE", "ACUTANGLE, OBTUSANGLE"], "Le plus grand angle", "c'est lui qui décide !", True),
    ("defi", "05-defi", ["COMPRENDRE", "RECTANGLE ISOCÈLE"], "Deux noms à la fois", "+ un dessin ne prouve rien !", False),
    ("somme-angle", "06-somme-angle", ["COMPRENDRE", "LA SOMME DES ANGLES"], "40 + 60 + 80 = 180°", "pour tous les triangles !", True),
    ("angle-manquant", "07-angle-manquant", ["COMPRENDRE", "L'ANGLE QUI MANQUE"], "180 − 110 = 70°", "sans rapporteur !", True),
    ("possible-ou-non", "08-possible-ou-non", ["COMPRENDRE", "QUAND UN TRIANGLE EXISTE"], "2 cm, 3 cm, 6 cm ?", "les baguettes ne se touchent pas !", False),
    ("propriete-defi", "09-propriete-defi", ["COMPRENDRE", "LES TRIANGLES IMPOSSIBLES"], "90° + 90° = 180°", "plus rien pour le troisième angle !", False),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for slug, rep, tit, haut, bas, vert in EP:
        if filtre not in slug:
            continue
        rel = f"6e/maths/triangles/{rep}"
        nom = f"eleveai-maths-6e-triangle-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · 6E", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc_paysage(haut, bas, vert), "dossier": rel,
        })


if __name__ == "__main__":
    main()
