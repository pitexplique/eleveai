# miniature_divisibilite.py
# LES MINIATURES DES PAYSAGES de la série DIVISIBILITÉ ET NOMBRES PREMIERS 4e (08/11/2026) :
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures. Même
# machinerie que `miniature_relatifs.py`. Celles des shorts sont des dessins Ti Margo, faites par
# `scripts/ti-margo-short.mjs <série> <épisode> miniature`. Rangées À CÔTÉ DE LA VIDÉO.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_divisibilite.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_essai_v2 import construire as construire_paysage
from miniature_puissances import acc_paysage, minutes

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "divisibilite"

# dossier, préfixe, ceinture, titre, maths du haut, ligne du bas (« + » = en vert)
EP = [
    ("01-multiple", "div", "jaune", ["COMPRENDRE", "MULTIPLE ET DIVISEUR"], "42 = 6 × 7", "+ 42 multiple de 6, 6 diviseur de 42"),
    ("02-critere-2-5-10", "div", "jaune", ["COMPRENDRE LES CRITÈRES", "PAR 2, 5 ET 10"], "3 640 → 0", "+ seul le dernier chiffre compte"),
    ("03-critere-3-9", "div", "orange", ["COMPRENDRE LES CRITÈRES", "PAR 3 ET 9"], "4 + 2 + 7 + 5 = 18", "+ 4 275 divisible par 9"),
    ("04-euclidienne", "div", "orange", ["COMPRENDRE LA", "DIVISION EUCLIDIENNE"], "47 = 6 × 7 + 5", "+ reste plus petit que 6"),
    ("05-diviseurs", "div", "orange", ["COMPRENDRE COMMENT", "LISTER LES DIVISEURS"], "36 → 9 diviseurs", "+ par paires : 1 × 36, 2 × 18…"),
    ("06-probleme", "div", "verte", ["COMPRENDRE LES PROBLÈMES", "DE DIVISIBILITÉ"], "48 et 36 → 12 kits", "+ diviseur ou multiple commun ?"),
    ("07-defi", "div", "verte", ["DÉFI : COMPRENDRE", "LES CRITÈRES"], "2 ? 6 divisible par 9", "+ le chiffre caché : 216"),
    ("08-definition", "premier", "orange", ["COMPRENDRE LES", "NOMBRES PREMIERS"], "2, 3, 5, 7, 11, 13…", "1 n'est pas premier !"),
    ("09-determiner", "premier", "verte", ["COMPRENDRE COMMENT", "RECONNAÎTRE UN PREMIER"], "91 = 7 × 13", "pas premier !"),
    ("10-decomposer", "premier", "verte", ["COMPRENDRE LA", "DÉCOMPOSITION EN PREMIERS"], "84 = 2 × 2 × 3 × 7", "+ une seule décomposition"),
    ("11-defi", "premier", "verte", ["DÉFI : COMPRENDRE", "LE NOMBRE DE DIVISEURS"], "36 = 2 × 2 × 3 × 3", "+ 3 × 3 = 9 diviseurs"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for rep, pre, ceinture, tit, haut, bas in EP:
        nom = f"eleveai-maths-4e-{pre}-{rep[3:]}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": "MATHS · 4E", "duree": f"EN {minutes(SERIE / rep / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": f"4e/maths/divisibilite/{rep}",
            })


if __name__ == "__main__":
    main()
