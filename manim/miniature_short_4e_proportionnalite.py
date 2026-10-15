# miniature_short_4e_proportionnalite.py
# LES MINIATURES VERTICALES des huit shorts de la proportionnalité de 4e
# (04/10/2026), un par micro-compétence.
#
# ⛔ FICHIER À PART, comme `miniature_short_4e_pourcentages.py` : on EMPRUNTE la
# machinerie de `miniature_short.py` sans toucher à son dictionnaire.
# ⭐ Chaque vignette s'enregistre À CÔTÉ DE SA VIDÉO :
# manim/sorties/4e/maths/shorts/fr/prop-proportionnalite/.
#
# Usage :  python manim/miniature_short_4e_proportionnalite.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import ORANGE, W, centre, construire
from miniature_short_4e_ratios import barre


def acc_reconnaitre(d):
    centre(d, W // 2, 690, "30 € → 40 €", police("ariblk.ttf", 120), BLEU)
    centre(d, W // 2, 880, "30 ÷ 1 ≠ 40 ÷ 2", police("ariblk.ttf", 90), NAVY)
    centre(d, W // 2, 1030, "NON", police("ariblk.ttf", 170), ROUGE)


def acc_tableau(d):
    barre(d, W // 2, 700, 12, police("ariblk.ttf", 150), "8 €", ROUGE)
    centre(d, W // 2, 900, "5 × 2", police("ariblk.ttf", 100), NAVY)
    centre(d, W // 2, 1020, "10 €", police("ariblk.ttf", 170), VERT)


def acc_graphique(d):
    centre(d, W // 2, 690, "droite", police("ariblk.ttf", 120), BLEU)
    centre(d, W // 2, 860, "+", police("ariblk.ttf", 100), NAVY)
    centre(d, W // 2, 1000, "(0 ; 0)", police("ariblk.ttf", 160), VERT)


def acc_unite(d):
    barre(d, W // 2, 700, 12, police("ariblk.ttf", 140), "5 ÷ 6", ROUGE)
    centre(d, W // 2, 900, "6 ÷ 5 = 1,20 €", police("ariblk.ttf", 84), NAVY)
    centre(d, W // 2, 1020, "9,60 €", police("ariblk.ttf", 160), VERT)


def acc_croix(d):
    barre(d, W // 2, 700, 10, police("ariblk.ttf", 110), "4 167 L", ROUGE)
    centre(d, W // 2, 900, "250 × 6 ÷ 100", police("ariblk.ttf", 90), NAVY)
    centre(d, W // 2, 1020, "15 L", police("ariblk.ttf", 170), VERT)


def acc_probleme(d):
    barre(d, W // 2, 700, 12, police("ariblk.ttf", 140), "70 min", ROUGE)
    centre(d, W // 2, 900, "record du monde", police("ariblk.ttf", 80), NAVY)
    centre(d, W // 2, 1020, "≈ 2 h", police("ariblk.ttf", 170), VERT)


def acc_relation(d):
    barre(d, W // 2, 700, 12, police("ariblk.ttf", 130), "y = x + 4", ROUGE)
    centre(d, W // 2, 900, "6 ÷ 2 = 15 ÷ 5 = 3", police("ariblk.ttf", 74), NAVY)
    centre(d, W // 2, 1020, "y = 3 × x", police("ariblk.ttf", 150), VERT)


def acc_defi(d):
    centre(d, W // 2, 690, "3 peintres : 6 h", police("ariblk.ttf", 96), BLEU)
    barre(d, W // 2, 860, 10, police("ariblk.ttf", 96), "6 peintres : 12 h", ROUGE)
    centre(d, W // 2, 1030, "3 h", police("ariblk.ttf", 170), VERT)


DOSSIER = "../sorties/4e/maths/shorts/fr/prop-proportionnalite"
B = "LA PROPORTIONNALITÉ"


def spec(titre, taille, sous, acc):
    return {"badge": B, "titre": titre, "taille": taille, "sous": sous, "taille_sous": 48,
            "couleur_sous": ORANGE, "accroche": acc, "dossier": DOSSIER}


COURTS = {
    "eleveai-maths-4e-prop-proportionnalite-short-reconnaitre": spec(
        ["+ 10 € CHAQUE MOIS", "PROPORTIONNEL ?"], 80, "régulier ≠ proportionnel", acc_reconnaitre),
    "eleveai-maths-4e-prop-proportionnalite-short-tableau": spec(
        ["3 COOKIES : 6 €", "5 COOKIES : 8 € ?"], 84, "on n'ajoute pas", acc_tableau),
    "eleveai-maths-4e-prop-proportionnalite-short-graphique": spec(
        ["UNE DROITE", "SUFFIT-ELLE ?"], 100, "proportionnel sur un graphique", acc_graphique),
    "eleveai-maths-4e-prop-proportionnalite-short-unite": spec(
        ["5 CROISSANTS : 6 €", "ET 8 ?"], 84, "passer par l'unité", acc_unite),
    "eleveai-maths-4e-prop-proportionnalite-short-croix": spec(
        ["6 L POUR 100 KM", "ET 250 KM ?"], 90, "le produit en croix", acc_croix),
    "eleveai-maths-4e-prop-proportionnalite-short-probleme": spec(
        ["UN MARATHON", "EN 70 MIN ?"], 100, "quand le produit en croix ment", acc_probleme),
    "eleveai-maths-4e-prop-proportionnalite-short-relation": spec(
        ["Y = X + 4 ?", "LE PIÈGE"], 100, "trouver la relation", acc_relation),
    "eleveai-maths-4e-prop-proportionnalite-short-defi": spec(
        ["6 PEINTRES :", "12 HEURES ?"], 100, "le piège du produit en croix", acc_defi),
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, s in COURTS.items():
        ft = police("ariblk.ttf", s["taille"])
        for t in s["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, s)


if __name__ == "__main__":
    main()
