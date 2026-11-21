# miniature_entier.py
# LES MINIATURES des PAYSAGES de la série NOMBRES ENTIERS, du CM1 à la 6e (21/11/2026, poste 2).
# Copie de miniature_masse.py : « <TITRE> » + pastille « EN N MIN », la maths en gros, l'échelle des
# ceintures (celle de l'épisode). Les miniatures des SHORTS viennent du film Ti Margo
# (window.tiMargoMiniature, mention « Dessin animé »), puis du gabarit A
# (scripts/miniatures-shorts-grille.py).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/<classe>/maths/entiers/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_entier.py [filtre]   (ex. « cm1-entier-lire », ou « cm1 »)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police  # noqa: E402
from miniature_angles import ajuste, minutes  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# classe, slug, dossier, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("cm1", "lire", "01-lire", ["LIRE LES", "GRANDS NOMBRES"], "« douze mille trente »",
     "= 12 030 : le zéro garde la place", True, "verte"),
    ("cm1", "comparer", "02-comparer", ["COMPARER DES", "GRANDS NOMBRES"], "9 876 ou 10 234 ?",
     "on compte d'abord les chiffres !", True, "verte"),
    ("cm1", "decomposer", "03-decomposer", ["DÉCOMPOSER", "UN NOMBRE"], "7 306 = 7 000 + 300 + 6",
     "un rang vide ne s'écrit pas !", True, "verte"),
    ("cm1", "arrondir", "04-arrondir", ["ARRONDIR", "UN NOMBRE"], "4 682 : 4 600 ou 4 700 ?",
     "on regarde le chiffre d'après !", True, "verte"),
    ("cm1", "multiple", "05-multiple", ["LES", "MULTIPLES"], "42, multiple de 6 ?",
     "7 paquets pleins, sans reste !", True, "verte"),
    # ⛔ ceinture BLEUE : le défi est le cran au-dessus de la paysage verte du niveau.
    ("cm1", "defi", "06-defi", ["LE DÉFI", "DES NOMBRES"], "Mystère entre 3 900 et 4 000",
     "les indices, un par un !", True, "bleue"),
    # ── Le 12ᵉ épisode : le CM2 seul (⛔ `entier_multiple` est SÉPARÉ, pas de `aussi`) ──
    ("cm2", "multiple", "01-multiple", ["LES CRITÈRES", "DE DIVISIBILITÉ"], "51 408, multiple de 3 ?",
     "on additionne les chiffres !", True, "verte"),
    # ── Lot B : la 6e (notion `entier_nombre`, pas de `aussi`) ──
    ("6e", "rang", "01-rang", ["LES RANGS", "D'UN NOMBRE"], "Dans 5 482 : le chiffre des dizaines ?",
     "on compte depuis la droite !", True, "verte"),
    ("6e", "comparer", "02-comparer", ["COMPARER DES", "NOMBRES ENTIERS"], "2 305 ou 2 350 ?",
     "on compare par la gauche !", True, "verte"),
    ("6e", "encadrer", "03-encadrer", ["ENCADRER", "UN NOMBRE"], "582 est entre 500 et 600",
     "les bornes finissent par 0 !", True, "verte"),
    ("6e", "decomposer", "04-decomposer", ["DÉCOMPOSER", "UN NOMBRE"], "507 = 500 + 7 ou 500 + 70 ?",
     "chaque chiffre vaut son rang !", True, "verte"),
    # ⛔ ceinture BLEUE : le défi est le cran au-dessus de la paysage verte du niveau.
    ("6e", "defi", "05-defi", ["LE DÉFI", "DES NOMBRES"], "De 1 041 à 2 000, il manque ?",
     "on avance par étapes rondes !", True, "bleue"),
]

# ⛔ Le badge garde la casse de la classe : « MATHS · 6e », jamais « MATHS · 6E »
# (c'est la forme de tout le reste du registre, manim/miniature.py).
BADGE = {"cm1": "CM1", "cm2": "CM2", "6e": "6e"}


def accroche(haut, bas, vert, ceinture, y0=352):
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
    for classe, slug, rep, tit, haut, bas, vert, ceint in EP:
        nom = f"eleveai-maths-{classe}-entier-{slug}"
        if filtre and filtre not in nom:
            continue
        rel = f"{classe}/maths/entiers/{rep}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": f"MATHS · {BADGE.get(classe, classe.upper())}", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": accroche(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
