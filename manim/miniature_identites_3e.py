# miniature_identites_3e.py
# LES MINIATURES PAYSAGE de la série IDENTITÉS REMARQUABLES 3e (22/11/2026), épisodes 07 et 08
# du dossier expression-litterale. Copie de `miniature_identites.py` (4e) :
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures.
# Les SHORTS sont faits par scripts/miniatures-shorts-grille.py (gabarit A, sans « Dessin animé »).
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_identites_3e.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_puissances import acc_paysage, minutes  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "3e" / "maths" / "expression-litterale"

# dossier, slug, ceinture, titre, maths du haut, ligne du bas
EP = [
    ("07-factoriser-identite", "factoriser", "verte",
     ["COMPRENDRE COMMENT", "FACTORISER x² − 9"], "x² − 9", "= (x − 3)(x + 3)"),
    ("08-resoudre-identite", "resoudre", "verte",
     ["RÉSOUDRE (x − 2)² = 25", "EN FACTORISANT"], "(x − 2)² = 25", "+ x = 7 ou x = −3"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for rep, slug, ceinture, tit, haut, bas in EP:
        nom = f"eleveai-maths-3e-identites-{slug}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": "MATHS · 3E", "duree": f"EN {minutes(SERIE / rep / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352),
                "dossier": f"3e/maths/expression-litterale/{rep}",
            })


if __name__ == "__main__":
    main()
