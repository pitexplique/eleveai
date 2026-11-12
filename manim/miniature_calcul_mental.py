# miniature_calcul_mental.py
# LES MINIATURES des PAYSAGES de la série CALCUL MENTAL 6e (12/11/2026), calquée sur miniature_calcul_pose.py.
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (verte).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/6e/maths/calcul-mental/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_calcul_mental.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import acc_paysage, minutes
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?
EP = [
    ("addition", "01-addition", ["COMPRENDRE", "L'ADDITION DE TÊTE"], "56 + 8 = 64", "je passe par 60 : 56 + 4 + 4 !", True),
    ("soustraction", "02-soustraction", ["COMPRENDRE", "LA SOUSTRACTION DE TÊTE"], "121 − 38 = 83", "121 − 40, puis + 2 : on corrige !", True),
    ("multiplication", "03-multiplication", ["COMPRENDRE", "LA MULTIPLICATION DE TÊTE"], "18 × 5 = 90", "× 10, puis la moitié !", True),
    ("division", "04-division", ["COMPRENDRE", "LA DIVISION DE TÊTE"], "56 ÷ 8 = 7", "la table de 8, à l'envers !", True),
    ("astuces", "05-astuces", ["COMPRENDRE", "LES ASTUCES DE CALCUL"], "99 + 47 = 146", "100 + 47 − 1 : en 2 secondes !", True),
    ("defi", "06-defi", ["RÉUSSIR", "LE DÉFI DU CALCUL MENTAL"], "100 − 4 × 5 − 38 = ?", "de tête, en étapes faciles !", True),
]

def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for slug, rep, tit, haut, bas, vert in EP:
        if filtre and filtre != slug:
            continue
        rel = f"6e/maths/calcul-mental/{rep}"
        nom = f"eleveai-maths-6e-mental-{slug}"
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
