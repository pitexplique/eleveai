# miniature_short_4e_ratios.py
# LES MINIATURES VERTICALES des cinq shorts des ratios de 4e (02/10/2026),
# un par micro-compétence : simplifier, le calcul a/2 = b/3, trois nombres,
# partager, l'écart.
#
# ⛔ FICHIER À PART, comme `miniature_short_6e_nombres.py` : on EMPRUNTE la
# machinerie de `miniature_short.py` sans toucher à son dictionnaire.
# ⭐ Le BADGE nomme le chapitre, le TITRE porte la question du short.
# ⭐ Chaque vignette s'enregistre À CÔTÉ DE SA VIDÉO :
# manim/sorties/4e/maths/shorts/fr/prop-ratio/.
#
# Usage :  python manim/miniature_short_4e_ratios.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import ORANGE, W, centre, construire


def barre(d, x, y, l, texte_police, texte, couleur):
    """Un texte barré d'un trait rouge, centré en x."""
    centre(d, x, y, texte, texte_police, couleur)
    larg = d.textlength(texte, font=texte_police)
    h = texte_police.size
    d.line([(x - larg / 2 - 10, y + h * 0.75), (x + larg / 2 + 10, y + h * 0.35)], fill=ROUGE, width=l)


def acc_simplifier(d):
    centre(d, W // 2, 700, "2 : 10", police("ariblk.ttf", 170), BLEU)
    centre(d, W // 2, 900, "÷ 2", police("ariblk.ttf", 80), NAVY)
    centre(d, W // 2, 1010, "= 1 : 5", police("ariblk.ttf", 150), VERT)


def acc_quotients(d):
    barre(d, W // 2, 720, 12, police("ariblk.ttf", 140), "43 kg", ROUGE)
    centre(d, W // 2, 930, "une part = 20 kg", police("ariblk.ttf", 66), NAVY)
    centre(d, W // 2, 1030, "100 kg", police("ariblk.ttf", 160), VERT)


def acc_trois(d):
    centre(d, W // 2, 700, "1 : 2 : 4", police("ariblk.ttf", 150), BLEU)
    centre(d, W // 2, 900, "sable = 12 kg", police("ariblk.ttf", 70), NAVY)
    centre(d, W // 2, 1020, "6 · 12 · 24", police("ariblk.ttf", 130), VERT)


def acc_partager(d):
    barre(d, W // 2, 720, 12, police("ariblk.ttf", 120), "30 + 30", ROUGE)
    centre(d, W // 2, 930, "5 parts de 12 €", police("ariblk.ttf", 66), NAVY)
    centre(d, W // 2, 1030, "24 + 36", police("ariblk.ttf", 150), VERT)


def acc_ecart(d):
    centre(d, W // 2, 700, "4 : 3", police("ariblk.ttf", 170), BLEU)
    centre(d, W // 2, 910, "l'écart = 1 part = 5", police("ariblk.ttf", 62), NAVY)
    centre(d, W // 2, 1010, "35 en tout", police("ariblk.ttf", 120), VERT)


DOSSIER = "../sorties/4e/maths/shorts/fr/prop-ratio"

COURTS = {
    "eleveai-maths-4e-prop-ratio-short-simplifier": {
        "badge": "LES RATIOS", "titre": ["2 POUR 10", "OU 1 POUR 5 ?"], "taille": 96,
        "sous": "lequel est le plus sucré ?", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_simplifier, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-ratio-short-quotients": {
        "badge": "LES RATIOS", "titre": ["40 KG DE CIMENT,", "COMBIEN DE SABLE ?"], "taille": 80,
        "sous": "ciment : sable = 2 : 5", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_quotients, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-ratio-short-trois": {
        "badge": "LES RATIOS", "titre": ["UN SEUL NOMBRE", "SUFFIT"], "taille": 96,
        "sous": "un ratio à trois nombres", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_trois, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-ratio-short-partager": {
        "badge": "LES RATIOS", "titre": ["60 € SELON 2 : 3,", "30 € CHACUN ?"], "taille": 88,
        "sous": "partager juste", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_partager, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-ratio-short-ecart": {
        "badge": "LES RATIOS", "titre": ["5 FILLES DE PLUS :", "COMBIEN EN TOUT ?"], "taille": 80,
        "sous": "filles : garçons = 4 : 3", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_ecart, "dossier": DOSSIER,
    },
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, spec in COURTS.items():
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)


if __name__ == "__main__":
    main()
