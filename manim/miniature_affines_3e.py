# miniature_affines_3e.py
# LES MINIATURES PAYSAGE de la série FONCTIONS AFFINES 3e (22/11/2026), 9 épisodes
# du dossier fonctions-affines. Copie de `miniature_identites_3e.py` :
#   · paysage : « COMPRENDRE X » (ou équivalent court) + pastille « EN N MIN », la maths en gros, l'échelle des ceintures.
# Les SHORTS sont faits par scripts/miniatures-shorts-grille.py (gabarit A, sans « Dessin animé »).
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_affines_3e.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_puissances import acc_paysage, minutes  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "3e" / "maths" / "fonctions-affines"

# dossier, slug, ceinture, titre, maths du haut, ligne du bas
EP = [
    ("01-reconnaitre", "reconnaitre", "jaune",
     ["RECONNAÎTRE UNE", "FONCTION AFFINE"], "f(x) = ax + b", "+ sa courbe : une droite"),
    ("02-coeff-directeur", "coeff-directeur", "orange",
     ["COMPRENDRE LE", "COEFFICIENT DIRECTEUR"], "f(x) = 3x + 10", "+ a = 3 : + 3 à chaque pas"),
    ("03-ordonnee-origine", "ordonnee-origine", "orange",
     ["COMPRENDRE L'ORDONNÉE", "À L'ORIGINE"], "f(x) = 45x + 300", "+ b = f(0) = 300"),
    ("04-calcul-image", "calcul-image", "jaune",
     ["CALCULER L'IMAGE", "D'UN NOMBRE"], "f(x) = −3x + 5", "+ f(−2) = 11"),
    ("05-expression", "expression", "verte",
     ["TROUVER L'EXPRESSION", "D'UNE FONCTION AFFINE"], "f(2) = 70 ; f(5) = 160", "+ f(x) = 30x + 10"),
    ("06-graphique", "graphique", "verte",
     ["LIRE UNE FONCTION", "SUR UN GRAPHIQUE"], "f(4) = 400", "+ f(x) = 50x + 200"),
    ("07-tracer", "tracer", "orange",
     ["TRACER UNE", "FONCTION AFFINE"], "f(x) = 20x + 30", "+ (0 ; 30) et (5 ; 130)"),
    ("08-probleme", "probleme", "verte",
     ["RÉSOUDRE UN PROBLÈME :", "QUEL TARIF CHOISIR ?"], "9x = 5x + 24", "+ x = 6 séances"),
    ("09-defi", "defi", "bleue",
     ["DÉFIS FONCTIONS", "AFFINES : BREVET"], "−40x + 1 200 = 20x", "+ x = 20 minutes"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for rep, slug, ceinture, tit, haut, bas in EP:
        nom = f"eleveai-maths-3e-affine-{slug}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": "MATHS · 3E", "duree": f"EN {minutes(SERIE / rep / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352),
                "dossier": f"3e/maths/fonctions-affines/{rep}",
            })


if __name__ == "__main__":
    main()
