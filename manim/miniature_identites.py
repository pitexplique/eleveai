# miniature_identites.py
# LES MINIATURES de la série IDENTITÉS REMARQUABLES 4e (22/11/2026), 10 vidéos, 5 épisodes.
# Copie de `miniature_factorisation.py` :
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures ;
#   · short (Manim, pas de dessin animé en 4e) : l'accroche en gros, 2 lignes de titre,
#     l'échelle des ceintures avec la ceinture DU SHORT.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/4e/maths/identites/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_identites.py [filtre]

import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_puissances import acc_paysage, ajuste, ecrire, largeur, minutes  # noqa: E402
from miniature_short import ORANGE, W, construire as construire_short  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "identites"

# dossier, ceinture paysage, titre paysage, maths du haut, ligne du bas (« + » ou « = » : en vert),
# ceinture short, titre short, sous-titre short, lignes short
EP = [
    ("01-lier", "jaune",
     ["COMPRENDRE LE", "CARRÉ D'UNE SOMME"], "(x + 4)²", "= x² + 8x + 16",
     "jaune", ["SEULEMENT", "25 ?"], "son aire gagne combien ?",
     [("(x + 5)²", 130, BLEU), ("= x² + 25 ?", 120, ROUGE)]),
    ("02-reconnaitre", "jaune",
     ["COMPRENDRE LES", "3 IDENTITÉS"], "(a + b)(a − b)", "= a² − b²",
     "jaune", ["49 × 51", "DE TÊTE"], "en 3 secondes ?",
     [("(50 − 1)(50 + 1)", 105, BLEU), ("= 2 499", 130, VERT)]),
    ("03-developper", "orange",
     ["COMPRENDRE COMMENT", "DÉVELOPPER (a + b)²"], "(x + 2)²", "= x² + 4x + 4",
     "orange", ["LE CARRÉ", "PIÉGÉ"], "ça commence par 2x² ?",
     [("(2x + 3)²", 130, BLEU), ("= 2x² + … ?", 115, ROUGE)]),
    ("04-choisir", "orange",
     ["IDENTITÉ OU DOUBLE", "DISTRIBUTIVITÉ ?"], "(x + 5)(x − 2)", "= x² + 3x − 10",
     "orange", ["LE BON", "OUTIL"], "il y a plus rapide !",
     [("(x + 6)(x − 6)", 115, BLEU), ("= x² − 36", 130, VERT)]),
    ("05-defi", "verte",
     ["DÉFI : LES ERREURS", "DES IDENTITÉS"], "(x + 5)² = x² + 25", "+ faux !",
     "orange", ["VRAI", "OU FAUX ?"], "on vérifie avec des nombres",
     [("(2 + 8)²", 130, BLEU), ("= 2² + 8² ?", 120, ROUGE)]),
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
        rel = f"4e/maths/identites/{rep}"
        nom = f"eleveai-maths-4e-identites-{slug}"
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
        spec = {"badge": "IDENTITÉS · 4E", "titre": ts, "taille": 96, "sous": sous, "taille_sous": 44,
                "couleur_sous": ORANGE, "accroche": acc_short(ls, sc), "dossier": "4e/maths/fr"}
        construire_short(nom, spec)
        shutil.copy(RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png", SERIE / rep / f"{nom}.png")


if __name__ == "__main__":
    main()
