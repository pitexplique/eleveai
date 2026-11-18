# miniature_plier_deplier.py
# La miniature du SHORT défi 4e « Plier, déplier » (puissances, épisode 14,
# 18/11/2026), même machinerie que `miniature_puissances.py` (style cahier,
# titre 2 lignes, maths en gros) mais ceinture ORANGE.
# Usage : python manim/miniature_plier_deplier.py

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT  # noqa: E402
from miniature_puissances import RACINE, SORTIES, ajuste, ecrire, largeur  # noqa: E402
from miniature_short import ORANGE, W, construire as construire_short  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

NOM = "eleveai-maths-4e-puissance-plier-deplier-short"
LIGNES = [("2^−1 = −2 ?", 130, ROUGE), ("non : 2^−1 = 1/2", 104, VERT)]


def accroche(d):
    echelle(d, W // 2, 1190, "orange", s=0.8)
    for i, (txt, t, c) in enumerate(LIGNES):
        t = ajuste(d, txt, t, W - 110)
        ecrire(d, (W - largeur(d, txt, t)) / 2, 700 + i * 205, txt, t, c)


def main():
    spec = {"badge": "PUISSANCES · 4E", "titre": ["PLIE, DÉPLIE", "ET COMPTE"], "taille": 96,
            "sous": "une part de feuille, c'est quelle puissance ?", "taille_sous": 44,
            "couleur_sous": ORANGE, "accroche": accroche, "dossier": "4e/maths/fr"}
    construire_short(NOM, spec)
    shutil.copy(RACINE / "manim" / "miniatures" / spec["dossier"] / f"{NOM}.png",
                SORTIES / "4e" / "maths" / "puissances" / "14-plier-deplier" / f"{NOM}.png")


if __name__ == "__main__":
    main()
