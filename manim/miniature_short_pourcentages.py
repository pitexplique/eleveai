# miniature_short_pourcentages.py
# LA MINIATURE VERTICALE du short « +20 % puis −20 % » (la tablette de 100
# carrés), série « Les bases », 21/09/2026.
#
# ⛔ FICHIER À PART, comme `miniature_short_reels.py` : `miniature_short.py` était
# en cours de modification par une autre session. On EMPRUNTE sa machinerie sans
# y toucher. 👉 À reverser dans son dictionnaire `SHORTS` quand il sera au repos.
#
# ⭐ Le BADGE nomme la notion (« LES POURCENTAGES », le mot qu'on cherche), le
# TITRE porte le paradoxe, et le dessin est celui du short : la tablette de
# départ, avec ses 4 carrés vides en rouge — ils se comptent même en vignette.
# ⛔ Aucune étiquette de classe : les pourcentages vont de la 6e à la 1re.
#
# Usage :  python manim/miniature_short_pourcentages.py
# Sortie : manim/miniatures/bases/maths/fr/<nom>.png

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import NAVY, ROUGE, VERT, police
from miniature_short import W, centre, construire

CHOCOLAT = (139, 94, 52)


def acc_tablette(d):
    # 10 × 10 carrés ; les 4 du coin haut-droit sont VIDES, cernés de rouge.
    pas, cote = 56, 48
    x0 = (W - (9 * pas + cote)) // 2
    y0 = 640
    for k in range(100):
        rang, col = divmod(k, 10)            # rang 0 = la rangée du HAUT
        x, y = x0 + col * pas, y0 + rang * pas
        if rang == 0 and col >= 6:
            d.rounded_rectangle([x, y, x + cote, y + cote], radius=6, outline=ROUGE, width=7)
        else:
            d.rounded_rectangle([x, y, x + cote, y + cote], radius=6, fill=CHOCOLAT)
    bas = y0 + 9 * pas + cote
    centre(d, W // 2, bas + 34, "il en manque 4", police("ariblk.ttf", 84), ROUGE)


POURCENTAGES = {
    "eleveai-maths-bases-pourcentages-short-tablette": {
        "badge": "LES POURCENTAGES", "titre": ["+20 % PUIS −20 %", "PAS RETOUR À 100"], "taille": 88,
        "sous": "pour cent… de quoi ?", "accroche": acc_tablette,
        "dossier": "bases/maths/fr",
    },
}


def main():
    # ⚠️ La console Windows (cp1252) ne sait pas écrire « − » : sans cette ligne
    # le script meurt sur son propre `print`.
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, spec in POURCENTAGES.items():
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)


if __name__ == "__main__":
    main()
