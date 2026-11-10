# miniature_distributivite.py
# LES MINIATURES de la série DISTRIBUTIVITÉ 4e (10/11/2026), 10 vidéos, 5 épisodes.
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures ;
#   · short (Manim, pas de dessin animé en 4e) : l'accroche en gros, 2 lignes de titre,
#     l'échelle des ceintures avec la ceinture DU SHORT.
# Même machinerie que `miniature_equations.py` / `miniature_relatifs.py`. Rangées À CÔTÉ DE
# LEUR VIDÉO : manim/sorties/4e/maths/distributivite/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_distributivite.py [filtre]

import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_essai_v2 import construire as construire_paysage
from miniature_puissances import acc_paysage, ajuste, ecrire, largeur, minutes
from miniature_short import ORANGE, W, construire as construire_short
from miniature_short_expression import echelle

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "distributivite"

# dossier, ceinture paysage, titre paysage, maths du haut, ligne du bas (« + » ou « = » : en vert),
# ceinture short, titre short, sous-titre short, lignes short
EP = [
    ("01-simple", "jaune",
     ["COMPRENDRE LA", "DISTRIBUTIVITÉ SIMPLE"], "3(x + 4) = 3x + 12", "pas 3x + 4 !",
     "jaune", ["7 × 13", "DE TÊTE ?"], "en 5 secondes, avec le secret",
     [("7 × 13 = ?", 130, ROUGE), ("7 × 10 + 7 × 3", 105, VERT)]),
    ("02-double", "orange",
     ["COMPRENDRE LA DOUBLE", "DISTRIBUTIVITÉ"], "(x + 4)(x + 2)", "= x² + 6x + 8",
     "orange", ["12 × 13", "EN 4 MORCEAUX"], "l'aire du potager, de tête",
     [("12 × 13 = ?", 130, ROUGE), ("100 + 30 + 20 + 6", 90, VERT)]),
    ("03-reduire", "orange",
     ["COMPRENDRE COMMENT", "DÉVELOPPER ET RÉDUIRE"], "2(x + 3) + 4(x − 1)", "= 6x + 2",
     "orange", ["LE TRI DES", "CHAUSSETTES"], "ça fait 11x ? Non !",
     [("3x + 5 + 2x + 1", 105, BLEU), ("= 11x ?", 130, ROUGE)]),
    ("04-reconnaitre", "jaune",
     ["COMPRENDRE QUAND", "IL FAUT DÉVELOPPER"], "4(x + 2) ou 4x + 8 ?", "+ produit ou somme ?",
     "jaune", ["LE CAISSIER", "A RAISON ?"], "2 places, 2 pop-corn",
     [("2 × 3 + 4", 130, ROUGE), ("ou 2 × (3 + 4) ?", 105, VERT)]),
    ("05-defi", "verte",
     ["DÉFI : COMPRENDRE", "LA DISTRIBUTIVITÉ"], "4 × 2,99 = 11,96", "+ 4 × 3 − 4 × 0,01",
     "orange", ["3 × 19,99 €", "DE TÊTE ?"], "tu as 5 secondes",
     [("3 × 19,99 = ?", 120, ROUGE), ("19,99 = 20 − 0,01", 92, VERT)]),
]


def acc_short(lignes, ceinture):
    """Centrée sur la largeur du SHORT : le W de `miniature.py` est celui de la paysage (1280)."""
    def f(d):
        echelle(d, W // 2, 1190, ceinture, s=0.8)
        for i, (txt, t, c) in enumerate(lignes):
            t = ajuste(d, txt, t, W - 110)
            ecrire(d, (W - largeur(d, txt, t)) / 2, 700 + i * 205, txt, t, c)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for rep, ceinture, tit, haut, bas, sc, ts, sous, ls in EP:
        slug = rep[3:]
        rel = f"4e/maths/distributivite/{rep}"
        nom = f"eleveai-maths-4e-distrib-{slug}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": "MATHS · 4E", "duree": f"EN {minutes(SERIE / rep / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": rel,
            })
        nom += "-short"
        if filtre not in nom:
            continue
        ft = police("ariblk.ttf", 96)
        for t in ts:
            if sonde.textlength(t, font=ft) > W - 80:
                print("⛔ DÉBORDE", t)
        spec = {"badge": "DISTRIBUTIVITÉ · 4E", "titre": ts, "taille": 96, "sous": sous, "taille_sous": 44,
                "couleur_sous": ORANGE, "accroche": acc_short(ls, sc), "dossier": "4e/maths/fr"}
        construire_short(nom, spec)
        shutil.copy(RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png", SERIE / rep / f"{nom}.png")


if __name__ == "__main__":
    main()
