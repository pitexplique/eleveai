# miniature_perimetre_cm2.py
# LES MINIATURES des PAYSAGES de la série PÉRIMÈTRE du CM2 (14/11/2026, copie de miniature_aire_cm2.py).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé »).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/cm2/maths/perimetre/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_perimetre_cm2.py [filtre]   (« triangle », « defi »…)

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
    ("comprendre", "01-comprendre", ["COMPRENDRE", "LE PÉRIMÈTRE"], "8 + 5 + 8 + 5 = 26 m",
     "le tour, pas la surface !", True, "jaune", (0, 0)),
    ("triangle", "02-triangle", ["LE PÉRIMÈTRE", "DU TRIANGLE"], "4 + 3,5 + 2,5 = 10 m",
     "80 cm + 1 m : on convertit !", True, "verte", (0, 0)),
    ("quadrilatere", "03-quadrilatere", ["LE PÉRIMÈTRE DU", "RECTANGLE ET DU CARRÉ"], "(100 + 64) × 2 = 328 m",
     "la moitié du tour, puis × 2 !", True, "verte", (0, 0)),
    ("polygone", "04-polygone", ["LE PÉRIMÈTRE", "D'UN POLYGONE"], "1,2 × 6 = 7,2 cm",
     "on compte chaque côté !", True, "verte", (0, 0)),
    ("defi", "05-defi", ["RÉSOUDRE UN DÉFI", "DE PÉRIMÈTRE"], "50 ÷ 2 − 15 = 10 m",
     "retrouver le côté caché !", True, "bleue", (0, 0)),
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
        notion = "perimetre"
        if filtre and filtre not in (slug, f"{notion}-{slug}"):
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
