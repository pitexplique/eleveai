# miniature_graphiques_1re.py
# LES MINIATURES PAYSAGE de la série GRAPHIQUES (automatismes 1re, + STMG pour 01-02), 24/11/2026.
# Copie de `miniature_evolutions_lycee.py` : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros,
# l'échelle des ceintures. Le short (croissance) est fait par scripts/miniatures-shorts-grille.py (gabarit A).
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_graphiques_1re.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_puissances import acc_paysage, minutes  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
BADGE = {"premiere": "MATHS · 1RE", "stmg": "MATHS · STMG"}

# num, slug, ceinture, classes, titre, maths du haut, ligne du bas
EP = [
    ("01", "appartenance", "jaune", ["premiere", "stmg"], ["UN POINT EST-IL", "SUR LA COURBE ?"], "−3² + 4 × 3 = 3", "+ (3 ; 3) est dessus !"),
    ("02", "variations", "jaune", ["premiere", "stmg"], ["COMPRENDRE LE", "TABLEAU DE VARIATIONS"], "max 800 en x = 4", "+ les x, pas les y !"),
    ("03", "croissance", "orange", ["premiere"], ["LIRE UNE", "CROISSANCE"], "10, 20, 40, 80", "+ ça accélère !"),
    ("04", "histogramme", "jaune", ["premiere"], ["COMPRENDRE", "L'HISTOGRAMME"], "17 ÷ 50 = 34 %", "+ une barre = un effectif"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for num, slug, ceinture, classes, tit, haut, bas in EP:
        for classe in classes:
            rep = f"{classe}/maths/graphiques/{num}-{slug}"
            nom = f"eleveai-maths-{classe}-graph-{slug}"
            mp4 = SORTIES / rep / (nom + ".mp4")
            if filtre not in nom or not mp4.exists():
                continue
            construire_paysage(nom, {
                "badge": BADGE[classe], "duree": f"EN {minutes(mp4)} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": rep,
            })
            print(rep, nom)


if __name__ == "__main__":
    main()
