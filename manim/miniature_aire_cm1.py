# miniature_aire_cm1.py
# LES MINIATURES des PAYSAGES de la série AIRE du CM1 (13/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé »).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/cm1/maths/aire/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_aire_cm1.py [filtre]   (aire : « composer » ; périmètre : « perimetre-triangle »)

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
    ("comprendre", "01-comprendre", ["COMPRENDRE", "CE QU'EST UNE AIRE"], "15 carreaux, sans trou",
     "l'aire, c'est l'intérieur !", True, "jaune", (5, 3)),
    ("unite", "02-unite", ["COMPARER", "DES AIRES"], "12 cases ou 10 cases ?",
     "avec la même unité !", True, "jaune", (4, 3)),
    ("carre-rectangle", "03-carre-rectangle", ["CALCULER L'AIRE", "D'UN RECTANGLE"], "4 × 6 = 24 m²",
     "rangées × carreaux par rangée", True, "verte", (6, 4)),
    ("composer", "04-composer", ["CALCULER L'AIRE", "D'UNE FIGURE EN L"], "12 + 6 = 18 m²",
     "on coupe en rectangles !", True, "verte", (6, 3)),
    ("defi", "05-defi", ["CALCULER L'AIRE", "EN ENLEVANT UN TROU"], "24 − 4 = 20 m²",
     "on enlève la fenêtre !", True, "bleue", (6, 4)),
    # Série PÉRIMÈTRE du CM1 (9e champ : la notion, sinon « aire ») ; python manim/miniature_aire_cm1.py perimetre-triangle
    ("triangle", "01-triangle", ["CALCULER LE PÉRIMÈTRE", "D'UN TRIANGLE"], "20 + 25 + 25 = 70 cm",
     "on ajoute les 3 côtés !", True, "jaune", (0, 0), "perimetre"),
    ("quadrilatere", "02-quadrilatere", ["CALCULER LE PÉRIMÈTRE", "D'UN RECTANGLE"], "(60 + 40) × 2 = 200 cm",
     "la moitié du tour, × 2 !", True, "jaune", (0, 0), "perimetre"),
    ("polygone", "03-polygone", ["CALCULER LE PÉRIMÈTRE", "D'UN POLYGONE"], "50 × 8 = 400 cm",
     "une croix sur chaque côté !", True, "verte", (0, 0), "perimetre"),
    ("defi", "04-defi", ["RÉSOUDRE UN DÉFI", "DE PÉRIMÈTRE"], "3 tours : 140 × 3 = 420 m",
     "un tour, puis × le nombre de tours !", True, "bleue", (0, 0), "perimetre"),
    # Série CONTENANCE du CM1 ; python manim/miniature_aire_cm1.py contenance-comparer
    ("comparer", "01-comparer", ["COMPARER", "DES CONTENANCES"], "1 L = 100 cL > 75 cL",
     "même unité, puis on compare !", True, "jaune", (0, 0), "contenance"),
    ("convertir", "02-convertir", ["CONVERTIR", "L, cL ET mL"], "2 L = 200 cL",
     "1 L = 100 cL, 1 cL = 10 mL", True, "verte", (0, 0), "contenance"),
    ("estimer", "03-estimer", ["ESTIMER", "UNE CONTENANCE"], "une citerne ≈ 3 000 L",
     "on compare à des repères !", True, "jaune", (0, 0), "contenance"),
    ("defi", "04-defi", ["RÉSOUDRE UN DÉFI", "DE CONTENANCE"], "2 L = 200 cL = 8 pots de 25 cL",
     "on convertit, puis on partage !", True, "bleue", (0, 0), "contenance"),
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
        rel = f"cm1/maths/{notion}/{rep}"
        nom = f"eleveai-maths-cm1-{notion}-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · CM1", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": accroche(haut, bas, vert, ceint, cases), "dossier": rel,
        })


if __name__ == "__main__":
    main()
