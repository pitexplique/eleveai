# miniature_short_4e_pourcentages.py
# LES MINIATURES VERTICALES des cinq shorts des pourcentages de 4e (03/10/2026),
# un par micro-compétence : retrouver un taux, 30 % de tête, le coefficient,
# l'évolution, + 10 % puis + 10 %.
#
# ⛔ FICHIER À PART, comme `miniature_short_4e_ratios.py` : on EMPRUNTE la
# machinerie de `miniature_short.py` sans toucher à son dictionnaire.
# ⭐ Chaque vignette s'enregistre À CÔTÉ DE SA VIDÉO :
# manim/sorties/4e/maths/shorts/fr/prop-pourcentages/.
#
# Usage :  python manim/miniature_short_4e_pourcentages.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import ORANGE, W, centre, construire
from miniature_short_4e_ratios import barre


def acc_taux(d):
    barre(d, W // 2, 700, 12, police("ariblk.ttf", 140), "18 %", ROUGE)
    centre(d, W // 2, 900, "18/25 = 72/100", police("ariblk.ttf", 80), NAVY)
    centre(d, W // 2, 1020, "72 %", police("ariblk.ttf", 170), VERT)


def acc_mental(d):
    centre(d, W // 2, 690, "10 % = 7 €", police("ariblk.ttf", 110), BLEU)
    centre(d, W // 2, 880, "30 % = 3 × 7", police("ariblk.ttf", 100), NAVY)
    centre(d, W // 2, 1030, "21 €", police("ariblk.ttf", 170), VERT)


def acc_coefficient(d):
    barre(d, W // 2, 700, 12, police("ariblk.ttf", 140), "× 0,05", ROUGE)
    centre(d, W // 2, 900, "+ 5 % = 105 %", police("ariblk.ttf", 80), NAVY)
    centre(d, W // 2, 1020, "× 1,05", police("ariblk.ttf", 170), VERT)


def acc_evolution(d):
    centre(d, W // 2, 690, "800 → 1 000", police("ariblk.ttf", 120), BLEU)
    barre(d, W // 2, 880, 10, police("ariblk.ttf", 100), "+ 20 %", ROUGE)
    centre(d, W // 2, 1030, "+ 25 %", police("ariblk.ttf", 170), VERT)


def acc_defi(d):
    centre(d, W // 2, 690, "100 → 110 → 99", police("ariblk.ttf", 104), BLEU)
    barre(d, W // 2, 880, 10, police("ariblk.ttf", 100), "= 100 ?", ROUGE)
    centre(d, W // 2, 1030, "− 1 %", police("ariblk.ttf", 170), ROUGE)


DOSSIER = "../sorties/4e/maths/shorts/fr/prop-pourcentages"

COURTS = {
    "eleveai-maths-4e-prop-pourcentages-short-taux": {
        "badge": "LES POURCENTAGES", "titre": ["18 SUR 25,", "COMBIEN DE % ?"], "taille": 96,
        "sous": "pas 18 % !", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_taux, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-pourcentages-short-mental": {
        "badge": "LES POURCENTAGES", "titre": ["30 % DE 70 €", "DE TÊTE ?"], "taille": 96,
        "sous": "en 5 secondes", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_mental, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-pourcentages-short-coefficient": {
        "badge": "LES POURCENTAGES", "titre": ["+ 5 % :", "× 0,05 ?"], "taille": 100,
        "sous": "le coefficient part de 1", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_coefficient, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-pourcentages-short-evolution": {
        "badge": "LES POURCENTAGES", "titre": ["+ 20 % OU", "+ 25 % ?"], "taille": 100,
        "sous": "800 → 1 000 abonnés", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_evolution, "dossier": DOSSIER,
    },
    "eleveai-maths-4e-prop-pourcentages-short-defi": {
        "badge": "LES POURCENTAGES", "titre": ["+ 10 % PUIS − 10 %", "RETOUR AU DÉPART ?"], "taille": 80,
        "sous": "le piège, pas à pas", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_defi, "dossier": DOSSIER,
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
