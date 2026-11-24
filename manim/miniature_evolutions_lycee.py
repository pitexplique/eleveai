# miniature_evolutions_lycee.py
# LES MINIATURES PAYSAGE de la série ÉVOLUTIONS EN POURCENTAGE (automatismes 1re + STMG, + 2de pour 11-13),
# 23/11/2026. Copie de `miniature_affines_3e.py` : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros,
# l'échelle des ceintures. Une miniature par classe (badge MATHS · 1RE / STMG / 2DE).
# Les SHORTS sont faits par scripts/miniatures-shorts-grille.py (gabarit A) sur les 8 shorts 1re ; le PNG est
# ensuite copié tel quel pour les shorts STMG / 2de (même mp4).
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_evolutions_lycee.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_puissances import acc_paysage, minutes  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
BADGE = {"premiere": "MATHS · 1RE", "stmg": "MATHS · STMG", "seconde": "MATHS · 2DE"}
NUM_2DE = {"calculer-taux": "03", "successives": "04", "reciproque": "05"}

# num, slug, ceinture, titre, maths du haut, ligne du bas
EP = [
    ("07", "additif", "jaune", ["COMPRENDRE LE", "COEFFICIENT D'UNE HAUSSE"], "+ 2 % = × 1,02", "+ pas × 1,2 !"),
    ("08", "diminution", "jaune", ["COMPRENDRE LE", "COEFFICIENT D'UNE BAISSE"], "− 30 % = × 0,7", "+ pas × 0,3 !"),
    ("09", "valeur-finale", "jaune", ["CALCULER UNE", "VALEUR D'ARRIVÉE"], "12 000 × 1,15", "= 13 800 abonnés"),
    ("10", "valeur-initiale", "orange", ["RETROUVER UNE", "VALEUR DE DÉPART"], "60 ÷ 1,2 = 50 €", "+ pas 60 − 20 % !"),
    ("11", "calculer-taux", "jaune", ["CALCULER UN", "TAUX D'ÉVOLUTION"], "(2,4 − 3) ÷ 3", "= − 20 %"),
    ("12", "successives", "orange", ["COMPRENDRE LES ÉVOLUTIONS", "SUCCESSIVES"], "0,7 × 0,8 = 0,56", "+ − 44 %, pas − 50 %"),
    ("13", "reciproque", "bleue", ["COMPRENDRE L'ÉVOLUTION", "RÉCIPROQUE"], "1 ÷ 0,8 = 1,25", "+ après − 20 % : + 25 %"),
    ("14", "compensation", "orange", ["LE PIÈGE DE LA", "COMPENSATION"], "1,2 × 0,8 = 0,96", "+ + 20 % puis − 20 % = − 4 %"),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for num, slug, ceinture, tit, haut, bas in EP:
        for classe in ["premiere", "stmg"] + (["seconde"] if slug in NUM_2DE else []):
            n = NUM_2DE[slug] if classe == "seconde" else num
            rep = f"{classe}/maths/proportionnalite/{n}-evo-{slug}"
            nom = f"eleveai-maths-{classe}-prop-evo-{slug}"
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
