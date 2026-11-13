# miniature_perimetre_ce2.py
# LES MINIATURES des PAYSAGES de la série PÉRIMÈTRE CE2 (13/11/2026).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures
# (01 blanche, 02 jaune, 03 orange). Les miniatures des shorts viennent du film Ti Margo.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/ce2/maths/perimetre/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_perimetre_ce2.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import BLEU, ROUGE, VERT, ajuste, echelle, minutes, police
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("comprendre", "01-comprendre", ["COMPRENDRE", "LE PÉRIMÈTRE"], "8 + 5 + 8 + 5 = 26 m", "le tour du jardin, côté après côté !", True, "blanche"),
    ("polygone", "02-polygone", ["LE PÉRIMÈTRE", "D'UN POLYGONE"], "6 côtés : 22 m", "on n'oublie aucun côté !", False, "jaune"),
    ("comparer", "03-comparer", ["COMPARER", "DES PÉRIMÈTRES"], "120 m ou 130 m ?", "on calcule chaque tour !", True, "orange"),
]


def acc(haut, bas, vert, ceinture, y0=352):
    def f(d):
        th = ajuste(d, haut, 92, 900)
        tb = ajuste(d, bas, 58, 900)
        d.text((56, y0), haut, font=police("ariblk.ttf", th), fill=BLEU)
        d.text((60, y0 + th + 26), bas, font=police("ariblk.ttf", tb), fill=VERT if vert else ROUGE)
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for slug, rep, tit, haut, bas, vert, ceint in EP:
        if filtre and filtre != slug:
            continue
        rel = f"ce2/maths/perimetre/{rep}"
        nom = f"eleveai-maths-ce2-perimetre-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · CE2", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
