# miniature_puissances_5e.py
# LES MINIATURES DES PAYSAGES de la série CARRÉ ET CUBE 5e (notion puissance_simple, 08/11/2026) :
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures. Même machinerie
# que `miniature_relatifs.py`. Celles des shorts sont des dessins Ti Margo, faites par
# `scripts/ti-margo-short.mjs puissances-5e <épisode> miniature`. Rangées À CÔTÉ DE LA VIDÉO.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_puissances_5e.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_essai_v2 import construire as construire_paysage
from miniature_puissances import acc_paysage, minutes

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "5e" / "maths" / "puissance-simple"

# dossier, ceinture, titre, maths du haut, ligne du bas (« + » = en vert)
EP = [
    ("01-notation", "blanche", ["COMPRENDRE LE CARRÉ", "ET LE CUBE"], "5^2 = 5 × 5", "pas 5 × 2 !"),
    ("02-valeurs", "blanche", ["CONNAÎTRE LES CARRÉS", "DE 0 À 12"], "12^2 = 144", "+ l'astuce de la bordure"),
    ("03-ecrire", "jaune", ["ÉCRIRE UN NOMBRE", "AVEC UN EXPOSANT"], "64 = 8^2 = 4^3", "+ carré ou cube ?"),
    ("04-calculer", "jaune", ["CALCULER AVEC", "DES CARRÉS ET DES CUBES"], "3 + 4^2 = 19", "pas 49 !"),
    ("05-litteral", "jaune", ["CALCULER x²", "QUAND ON CONNAÎT x"], "3x^2 = 12 si x = 2", "pas 36 !"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for rep, ceinture, tit, haut, bas in EP:
        nom = f"eleveai-maths-5e-puissance-{rep[3:]}"
        mp4 = SERIE / rep / (nom + ".mp4")
        if filtre in nom and mp4.exists():
            construire_paysage(nom, {
                "badge": "MATHS · 5E", "duree": f"EN {minutes(mp4)} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": f"5e/maths/puissance-simple/{rep}",
            })


if __name__ == "__main__":
    main()
