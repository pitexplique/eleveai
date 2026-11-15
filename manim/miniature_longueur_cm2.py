# miniature_longueur_cm2.py
# LES MINIATURES des PAYSAGES de la série LONGUEURS du CM2 (15/11/2026, copie de miniature_aire_cm2.py, semaine PÉRIMÈTRE, AIRE, VOLUME).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé »).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/cm2/maths/longueurs/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_longueur_cm2.py [filtre]   (« comparer », « defi »…)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police  # noqa: E402
from miniature_angles import ajuste, minutes  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?, ceinture, (inutilisé)
EP = [
    ("comparer", "01-comparer", ["COMPARER", "DES LONGUEURS"], "3,5 m > 3,45 m",
     "3,5, c'est 3,50 !", True, "jaune", (0, 0)),
    ("convertir", "02-convertir", ["CONVERTIR", "DES LONGUEURS"], "3,5 km = 3 500 m",
     "le tableau, du km au mm", True, "verte", (0, 0)),
    ("estimer", "03-estimer", ["ESTIMER", "UNE LONGUEUR"], "girafe : 5 m",
     "pas 5 cm, ni 5 km !", True, "jaune", (0, 0)),
    ("defi", "04-defi", ["RÉSOUDRE UN DÉFI", "DE LONGUEURS"], "2,5 km = 2 500 m",
     "d'abord la même unité !", True, "bleue", (0, 0)),
]


def accroche(haut, bas, vert, ceinture, cases, y0=352):
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
    for slug, rep, tit, haut, bas, vert, ceint, cases in EP:
        if filtre and filtre != slug:
            continue
        rel = f"cm2/maths/longueurs/{rep}"
        nom = f"eleveai-maths-cm2-longueur-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · CM2", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": accroche(haut, bas, vert, ceint, cases), "dossier": rel,
        })


if __name__ == "__main__":
    main()
