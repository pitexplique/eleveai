# miniature_short_diagonale.py
# LES MINIATURES VERTICALES des trois shorts « Diagonale des Fous 2026 »
# (09/10/2026) : la vitesse du vainqueur (4e), l'heure d'arrivée (6e), le
# tracé sans Cilaos (4e, pourcentages).
#
# ⛔ FICHIER À PART, comme `miniature_short_6e_nombres.py` : on EMPRUNTE la
# machinerie de `miniature_short.py` sans toucher à son dictionnaire.
# ⭐ Chaque vignette s'enregistre À CÔTÉ DE SA VIDÉO, dans manim/sorties/.
#
# Usage :  python manim/miniature_short_diagonale.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import ORANGE, W, centre, construire

JAUNE = (217, 160, 10)


def acc_vitesse(d):
    centre(d, W // 2, 690, "180 km ÷ 23,5 h", police("ariblk.ttf", 84), NAVY)
    centre(d, W // 2, 830, "≈ 7,7 km/h", police("ariblk.ttf", 140), VERT)
    centre(d, W // 2, 1040, "lent ?", police("ariblk.ttf", 90), ORANGE)


def acc_duree(d):
    centre(d, W // 2, 680, "jeudi 22 h", police("ariblk.ttf", 110), NAVY)
    centre(d, W // 2, 830, "+ 23 h 31", police("ariblk.ttf", 110), BLEU)
    centre(d, W // 2, 990, "= 45 h 31 ?", police("ariblk.ttf", 100), ROUGE)


def acc_cilaos(d):
    centre(d, W // 2, 690, "+2,9 % de km", police("ariblk.ttf", 100), VERT)
    centre(d, W // 2, 850, "−2,9 % de montée", police("ariblk.ttf", 84), ROUGE)
    centre(d, W // 2, 1020, "plus dur ?", police("ariblk.ttf", 90), ORANGE)


def acc_cachees(d):
    centre(d, W // 2, 680, "tableau : +6 419 m", police("ariblk.ttf", 84), VERT)
    centre(d, W // 2, 820, "officiel : +10 200 m", police("ariblk.ttf", 84), NAVY)
    centre(d, W // 2, 990, "où sont les 3 800 ?", police("ariblk.ttf", 80), ORANGE)


_S = "../sorties/{}/maths/shorts/fr/{}"
COURTS = {
    "eleveai-maths-4e-grandeur-composee-short-diagonale": {
        "badge": "DIAGONALE DES FOUS", "titre": ["LE VAINQUEUR", "EST LENT ?"], "taille": 96,
        "sous": "la vitesse, ça ne dit pas tout", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_vitesse, "dossier": _S.format("4e", "grandeur-composee"),
    },
    "eleveai-maths-6e-duree-temps-short-diagonale": {
        "badge": "DIAGONALE DES FOUS", "titre": ["IL ARRIVE", "QUAND ?"], "taille": 110,
        "sous": "départ jeudi 22 h", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_duree, "dossier": _S.format("6e", "duree-temps"),
    },
    "eleveai-maths-4e-prop-pourcentages-short-diagonale": {
        "badge": "DIAGONALE DES FOUS", "titre": ["SANS CILAOS :", "PLUS DUR ?"], "taille": 96,
        "sous": "le même pourcentage, deux fois", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_cilaos, "dossier": _S.format("4e", "prop-pourcentages"),
    },
    "eleveai-maths-5e-relatif-nombre-short-montees-cachees": {
        "badge": "DIAGONALE DES FOUS", "titre": ["3 800 M DE", "MONTÉES CACHÉES"], "taille": 82,
        "sous": "35 points, une addition de relatifs", "taille_sous": 46, "couleur_sous": ORANGE,
        "accroche": acc_cachees, "dossier": _S.format("5e", "relatif-nombre"),
    },
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for nom, spec in COURTS.items():
        if filtre not in nom:
            continue
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)


if __name__ == "__main__":
    main()
