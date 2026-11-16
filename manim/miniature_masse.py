# miniature_masse.py
# LES MINIATURES des PAYSAGES de la série MASSES, du CP au CM2 (16/11/2026, session masses).
# « COMPARER X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé »).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/<classe>/maths/masse/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_masse.py [filtre]   (ex. « ce2-masse-comparer », ou « ce2 »)

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
    ("ce2", "comparer", "03-comparer", ["COMPARER", "DES MASSES"], "1 kg = 1 000 g > 900 g",
     "même unité, puis on compare !", True, "jaune"),
    ("cp", "lexique", "01-lexique", ["LOURD", "OU LÉGER ?"], "On soupèse !",
     "gros ne veut pas dire lourd", False, "blanche"),
    ("cp", "comparer", "02-comparer", ["COMPARER", "DES MASSES"], "Le plateau qui descend",
     "porte le plus lourd !", True, "blanche"),
]


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
        nom = f"eleveai-maths-{classe}-masse-{slug}"
        if filtre and filtre not in nom:
            continue
        rel = f"{classe}/maths/masse/{rep}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": f"MATHS · {classe.upper()}", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": accroche(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
