# miniature_decimaux.py
# LES MINIATURES des PAYSAGES de la série NOMBRES DÉCIMAUX 6e (08/11/2026).
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (verte).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/6e/maths/decimaux/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_decimaux.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import acc_paysage, minutes
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?
EP = [
    ("lire-ecrire", "01-lire-ecrire", ["COMPRENDRE", "LES NOMBRES DÉCIMAUX"], "2,09 et pas 2,9", "le 0 garde la place des dixièmes !", False),
    ("rang", "02-rang", ["COMPRENDRE", "LE RANG D'UN CHIFFRE"], "12,47 s", "le 7 vaut 7 centièmes !", True),
    ("comparer", "03-comparer", ["COMPRENDRE", "COMPARER DES DÉCIMAUX"], "0,7 > 0,65", "plus de chiffres, pas plus grand !", False),
    ("arrondir", "04-arrondir", ["COMPRENDRE", "ARRONDIR UN DÉCIMAL"], "23,7 → 24", "de 5 à 9, on monte !", True),
    ("encadrer", "05-encadrer", ["COMPRENDRE", "ENCADRER, INTERCALER"], "4,7 < 4,75 < 4,8", "il y a toujours un nombre entre !", True),
    ("defi", "06-defi", ["COMPRENDRE", "LES DÉCIMAUX : 3 DÉFIS"], "10,20 = 10,2 ?", "trois portes à ouvrir !", False),
    ("additionner", "07-additionner", ["COMPRENDRE", "ADDITIONNER, SOUSTRAIRE"], "5 − 2,75 = 2,25", "la virgule cachée de 5 !", True),
    ("multiplier", "08-multiplier", ["COMPRENDRE", "DÉCIMAL × ENTIER"], "2,4 × 3 = 7,2", "et pas 72 !", False),
    ("multiplier-decimaux", "09-multiplier-decimaux", ["COMPRENDRE", "DÉCIMAL × DÉCIMAL"], "0,3 × 0,6 = 0,18", "plus petit que les deux !", False),
    ("multiplier-par-01", "10-multiplier-par-01", ["COMPRENDRE", "MULTIPLIER PAR 0,1"], "37 × 0,1 = 3,7", "ça rétrécit !", False),
    ("diviser-par-entier", "11-diviser-par-entier", ["COMPRENDRE", "DÉCIMAL ÷ ENTIER"], "7 ÷ 4 = 1,75", "on continue après la virgule !", True),
    ("calcul-defi", "12-calcul-defi", ["COMPRENDRE", "MOITIÉ, DOUBLE, 10 %"], "10 % de 36 = 3,6", "diviser par 10 !", True),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for slug, rep, tit, haut, bas, vert in EP:
        if filtre and filtre != slug:
            continue
        rel = f"6e/maths/decimaux/{rep}"
        nom = f"eleveai-maths-6e-decimal-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · 6E", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc_paysage(haut, bas, vert), "dossier": rel,
        })


if __name__ == "__main__":
    main()
