# miniature_contenance_cm2.py
# LES MINIATURES des PAYSAGES de la série CONTENANCE du CM2 (15/11/2026, copie de miniature_aire_cm2.py, semaine PÉRIMÈTRE, AIRE, VOLUME).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé »).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/cm2/maths/contenance/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_contenance_cm2.py [filtre]   (« comparer », « defi »…)

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
    ("comparer", "01-comparer", ["COMPARER", "DES CONTENANCES"], "2,5 L = 250 cL > 240 cL",
     "la même unité d'abord !", True, "jaune", (0, 0)),
    ("convertir", "02-convertir", ["CONVERTIR", "DES CONTENANCES"], "0,2 L = 200 mL",
     "× 10 à chaque colonne !", True, "verte", (0, 0)),
    ("estimer", "03-estimer", ["ESTIMER", "UNE CONTENANCE"], "6 mL, 6 L ou 60 L ?",
     "un repère, la bonne unité !", True, "jaune", (0, 0)),
    ("defi", "04-defi", ["RÉSOUDRE UN DÉFI", "DE CONTENANCES"], "120 × 25 cL = 30 L",
     "en étapes, même unité !", True, "bleue", (0, 0)),
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
    for slug, rep, tit, haut, bas, vert, ceint, cases, *notion in EP:
        notion = notion[0] if notion else "contenance"
        if filtre and filtre != slug:
            continue
        rel = f"cm2/maths/{notion}/{rep}"
        nom = f"eleveai-maths-cm2-{notion}-{slug}"
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
