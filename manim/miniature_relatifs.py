# miniature_relatifs.py
# LES MINIATURES DES PAYSAGES de la série RELATIFS 4e (07/11/2026) : « COMPRENDRE X » +
# pastille « EN N MIN », la maths en gros, l'échelle des ceintures. Même machinerie que
# `miniature_equations.py`. Celles des shorts sont des dessins Ti Margo, faites par
# `scripts/ti-margo-short.mjs relatifs <épisode> miniature`. Rangées À CÔTÉ DE LA VIDÉO.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_relatifs.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_essai_v2 import construire as construire_paysage
from miniature_puissances import acc_paysage, minutes

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "relatifs"

# dossier, ceinture, titre, maths du haut, ligne du bas (« + » = en vert)
EP = [
    ("01-addition", "jaune", ["COMPRENDRE COMMENT", "ADDITIONNER DES RELATIFS"], "(−5) + (−4) = −9", "pas +9 !"),
    ("02-soustraction", "orange", ["COMPRENDRE COMMENT", "SOUSTRAIRE DES RELATIFS"], "5 − (−3) = 8", "+ enlever peut faire monter"),
    ("03-multiplication", "orange", ["COMPRENDRE POURQUOI", "MOINS PAR MOINS FAIT PLUS"], "(−5) × (−2) = 10", "+ la preuve par le glacier"),
    ("04-division", "orange", ["COMPRENDRE COMMENT", "DIVISER DES RELATIFS"], "(−20) ÷ (−5) = 4", "+ la même règle que multiplier"),
    ("05-calcul", "verte", ["COMPRENDRE L'ORDRE", "DES OPÉRATIONS"], "−3 × 4 + 5 = −7", "pas −27 !"),
    ("06-probleme", "verte", ["COMPRENDRE UN PROBLÈME", "AVEC DES RELATIFS"], "−2 + 7 = 5", "+ traduire, calculer, répondre"),
    ("07-defi", "verte", ["DÉFI : COMPRENDRE", "LES SIGNES DES RELATIFS"], "(−2) × (−3) × (−1)", "+ 3 moins : négatif"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for rep, ceinture, tit, haut, bas in EP:
        nom = f"eleveai-maths-4e-relatif-{rep[3:]}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": "MATHS · 4E", "duree": f"EN {minutes(SERIE / rep / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": f"4e/maths/relatifs/{rep}",
            })


if __name__ == "__main__":
    main()
