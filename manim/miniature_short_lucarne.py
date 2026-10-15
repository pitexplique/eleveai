# miniature_short_lucarne.py
# LA MINIATURE VERTICALE du short « Coup franc à 30 m : la lucarne »
# (France – Turquie, 25/09/2026), série « Les maths en vrai ».
#
# ⛔ FICHIER À PART, comme `miniature_short_pourcentages.py` : `miniature_short.py`
# a des modifications en cours d'une autre session. On EMPRUNTE sa machinerie.
# 👉 À reverser dans son dictionnaire `SHORTS` quand il sera au repos.
#
# ⭐ Le BADGE porte le match (le mot qu'on tape ce soir), le TITRE le défi, et le
# dessin est celui du short : le mur rouge, le but, la parabole qui finit sous
# la barre. Pas d'équation sur la vignette (leçon du dauphin, 15/09).
#
# Usage :  python manim/miniature_short_lucarne.py
# Sortie : manim/miniatures/maths-en-vrai/maths/fr/<nom>.png

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import ORANGE, W, centre, construire

TIR = lambda x: -0.012 * x * x + 0.432 * x


def acc_lucarne(d):
    x0, x1 = 110, 930            # 0 → 34 m
    sol = 1180
    ex = (x1 - x0) / 34
    ey = 105                     # 1 m de hauteur
    P = lambda x, y: (x0 + x * ex, sol - y * ey)
    d.line([(x0 - 20, sol), (x1 + 40, sol)], fill=NAVY, width=6)
    # le mur, à 9,15 m, haut de 2,25 m
    d.rectangle([P(8.6, 2.25), P(9.7, 0)], fill=ROUGE)
    centre(d, P(9.15, 0)[0], sol + 14, "mur", police("ariblk.ttf", 36), ROUGE)
    # le but : poteau, barre, filet
    d.line([P(30, 0), P(30, 2.44)], fill=NAVY, width=14)
    d.line([P(30, 2.44), P(32.2, 2.44)], fill=NAVY, width=14)
    d.line([P(32.2, 2.44), P(34, 0)], fill=(120, 130, 150), width=4)
    centre(d, P(31, 0)[0], sol + 14, "but", police("ariblk.ttf", 36), NAVY)
    # la trajectoire, du pied du tireur à la lucarne
    pts = [P(x, TIR(x)) for x in [i * 30 / 80 for i in range(81)]]
    d.line(pts, fill=BLEU, width=14, joint="curve")
    bx, by = P(30, TIR(30))
    r = 26
    d.ellipse([bx - r, by - r, bx + r, by + r], fill=(255, 255, 255), outline=NAVY, width=6)
    # l'angle de départ, dessiné au pied de la courbe
    import math
    # ⛔ Les échelles diffèrent (24 px/m en x, 105 en y) : l'arc suit la pente
    # DESSINÉE, sinon il passerait sous la courbe. L'étiquette dit la vraie valeur.
    a = math.atan(0.432 * ey / ex)
    ox, oy = P(0, 0)
    # ⛔ Brouillon : « 23° » à 140 px mordait sur le mur. Arc plus serré, texte plus près.
    d.arc([ox - 85, oy - 85, ox + 85, oy + 85], start=-math.degrees(a), end=0, fill=VERT, width=9)
    d.text((ox + 98, oy - 66), "23°", font=police("ariblk.ttf", 48), fill=VERT)
    centre(d, W // 2, 1250, "au-dessus du mur, sous la barre", police("arialbd.ttf", 40), NAVY)
    centre(d, W // 2, 1310, "une seule courbe", police("ariblk.ttf", 52), VERT)


LUCARNE = {
    "eleveai-maths-seconde-second-degre-short-lucarne": {
        "badge": "FRANCE – TURQUIE", "taille_badge": 50,
        # ⭐ 25/09 : « l'important c'est l'angle de 23° et la vitesse » — en TITRE.
        "titre": ["23° ET 80 KM/H", "= LA LUCARNE"], "taille": 92,
        "sous": "coup franc à 30 mètres", "taille_sous": 56, "couleur_sous": ORANGE,
        "accroche": acc_lucarne,
        "dossier": "maths-en-vrai/maths/fr",
    },
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, spec in LUCARNE.items():
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)


if __name__ == "__main__":
    main()
