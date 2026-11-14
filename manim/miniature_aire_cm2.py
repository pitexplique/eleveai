# miniature_aire_cm2.py
# LES MINIATURES des PAYSAGES de la série AIRE du CM2 (14/11/2026, copie de miniature_aire_cm1.py, semaine PÉRIMÈTRE, AIRE, VOLUME).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé »).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/cm2/maths/aire/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_aire_cm2.py [filtre]   (« composer », « defi »…)

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
    ("comprendre", "01-comprendre", ["COMPRENDRE", "L'AIRE"], "3 × 4 = 2 × 6 = 12",
     "même aire, pas le même tour !", True, "jaune", (0, 0)),
    ("unites", "02-unites", ["CHOISIR", "L'UNITÉ D'AIRE"], "cm²  dm²  m²  km²",
     "un timbre ou une bâche ?", True, "verte", (0, 0)),
    ("convertir-unites", "03-convertir-unites", ["CONVERTIR", "DES AIRES"], "1 dm² = 100 cm²",
     "× 100, pas × 10 !", True, "bleue", (0, 0)),
    ("carre-rectangle", "04-carre-rectangle", ["L'AIRE DU CARRÉ", "ET DU RECTANGLE"], "2 × 1,5 = 3 m²",
     "longueur × largeur, même unité", True, "verte", (0, 0)),
    ("triangle-rectangle", "05-triangle-rectangle", ["L'AIRE DU", "TRIANGLE RECTANGLE"], "12 × 8 ÷ 2 = 48",
     "la moitié du rectangle !", True, "verte", (0, 0)),
    ("composer", "06-composer", ["CALCULER L'AIRE", "D'UNE FIGURE COMPOSÉE"], "60 − 8 = 52 m²",
     "on découpe ou on retire !", True, "verte", (0, 0)),
    ("defi", "07-defi", ["RÉSOUDRE UN DÉFI", "D'AIRES"], "48 ÷ 6 = 8 m",
     "retrouver le côté !", True, "bleue", (0, 0)),
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
        notion = notion[0] if notion else "aire"
        if filtre and filtre not in (slug, f"{notion}-{slug}"):
            continue
        if notion != "aire" and filtre == slug:  # « defi » seul = l'aire ; le périmètre se demande « perimetre-defi »
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
