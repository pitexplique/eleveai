# miniature_factorisation.py
# LES MINIATURES de la série FACTORISATION 4e (13/11/2026), 10 vidéos, 5 épisodes.
# Copie adaptée de `miniature_distributivite.py` :
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures ;
#   · short (Manim, pas de dessin animé en 4e) : l'accroche en gros, 2 lignes de titre,
#     l'échelle des ceintures avec la ceinture DU SHORT.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/4e/maths/factorisation/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_factorisation.py [filtre]

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
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "factorisation"

# dossier, ceinture paysage, titre paysage, maths du haut, ligne du bas (« + » ou « = » : en vert),
# ceinture short, titre short, sous-titre short, lignes short
EP = [
    ("01-commun", "jaune",
     ["COMPRENDRE LE", "FACTEUR COMMUN"], "5x + 10", "= 5 × x + 5 × 2",
     "jaune", ["LE NOMBRE", "CACHÉ"], "tu le trouves en 5 secondes ?",
     [("14, 21 et 35", 130, BLEU), ("un nombre caché ?", 100, ROUGE)]),
    ("02-simple", "jaune",
     ["COMPRENDRE COMMENT", "FACTORISER"], "6x + 18", "= 6(x + 3)",
     "jaune", ["LE RACCOURCI", "DE TÊTE"], "sans poser l'opération",
     [("17 × 6 + 17 × 4", 105, ROUGE), ("= 17 × 10", 130, VERT)]),
    ("03-verifier", "orange",
     ["COMPRENDRE COMMENT", "VÉRIFIER UNE FACTO"], "6(x + 30) = 6x + 30 ?", "+ on développe !",
     "orange", ["TU LE", "CROIS ?"], "ton copain a-t-il raison ?",
     [("4x + 20", 130, BLEU), ("= 4(x + 20) ?", 115, ROUGE)]),
    ("04-maximum", "orange",
     ["COMPRENDRE COMMENT", "FACTORISER AU MAXIMUM"], "2x² + 6x", "= 2x(x + 3)",
     "orange", ["TOUT", "SORTIR"], "beaucoup s'arrêtent trop tôt",
     [("4x² + 8x", 130, BLEU), ("= 4x(x + 2)", 115, VERT)]),
    ("05-defi", "verte",
     ["DÉFI : COMPRENDRE", "LA FACTORISATION"], "8x + 96", "= 8(x + 12)",
     "orange", ["L'ERREUR", "CACHÉE"], "tu vois où il s'est trompé ?",
     [("x² + 6x", 130, BLEU), ("= x(x + 6x) ?", 110, ROUGE)]),
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
        rel = f"4e/maths/factorisation/{rep}"
        nom = f"eleveai-maths-4e-facto-{slug}"
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
        spec = {"badge": "FACTORISATION · 4E", "titre": ts, "taille": 96, "sous": sous, "taille_sous": 44,
                "couleur_sous": ORANGE, "accroche": acc_short(ls, sc), "dossier": "4e/maths/fr"}
        construire_short(nom, spec)
        shutil.copy(RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png", SERIE / rep / f"{nom}.png")


if __name__ == "__main__":
    main()
