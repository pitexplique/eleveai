# miniature_solides_cm1.py
# LES MINIATURES des PAYSAGES de la série SOLIDES ET ESPACE CM1 (14/11/2026), sur le modèle du périmètre CE2.
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures
# (01 verte, 02 verte, 03 bleue). Les miniatures des shorts viennent du film Ti Margo.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/cm1/maths/solides/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_solides_cm1.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import BLEU, ROUGE, VERT, ajuste, echelle, minutes, police
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("prisme", "01-prisme", ["LE PRISME", "DROIT"], "2 bases pareilles + des rectangles", "faces, sommets, arêtes : sans se tromper !", True, "verte"),
    ("patron", "02-patron", ["RECONNAÎTRE", "UN PATRON"], "le cube a 11 patrons", "quel dessin devient quel solide ?", False, "verte"),
    ("defi", "03-defi", ["UN DÉFI", "DE CUBES"], "étage par étage, colonne par colonne", "combien de cubes cachés ?", True, "bleue"),
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
        rel = f"cm1/maths/solides/{rep}"
        nom = f"eleveai-maths-cm1-solides-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · CM1", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
