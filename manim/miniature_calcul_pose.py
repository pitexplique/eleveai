# miniature_calcul_pose.py
# LES MINIATURES des PAYSAGES de la série CALCUL POSÉ 6e (12/11/2026).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (verte).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/6e/maths/calcul-pose/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_calcul_pose.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import acc_paysage, minutes
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?
EP = [
    ("addition", "01-addition", ["COMPRENDRE", "L'ADDITION POSÉE"], "475 + 286 = 761", "la retenue : j'écris 1, je retiens 1 !", True),
    ("soustraction", "02-soustraction", ["COMPRENDRE", "LA SOUSTRACTION POSÉE"], "632 − 458 = 174", "2 − 8 ? je casse une dizaine !", True),
    ("multiplication", "03-multiplication", ["COMPRENDRE", "LA MULTIPLICATION POSÉE"], "36 × 24 = 864", "et pas 216 : le zéro des dizaines !", False),
    ("division", "04-division", ["COMPRENDRE", "LA DIVISION POSÉE"], "157 ÷ 6 = 26 reste 1", "le reste compte : 27 camionnettes !", True),
    ("verifier", "05-verifier", ["COMPRENDRE", "VÉRIFIER UN CALCUL"], "386 + 247 = 533 ?", "390 + 250 = 640 : trop loin !", False),
]

def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for slug, rep, tit, haut, bas, vert in EP:
        if filtre and filtre != slug:
            continue
        rel = f"6e/maths/calcul-pose/{rep}"
        nom = f"eleveai-maths-6e-calcul-pose-{slug}"
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
