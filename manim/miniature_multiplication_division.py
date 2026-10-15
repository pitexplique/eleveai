# miniature_multiplication_division.py
# LA MINIATURE de « Une multiplication, deux divisions » (07/10/2026, série « Les bases »).
# ⛔ FICHIER À PART : emprunte `miniature_essai_v2.py` sans y toucher.
# ⭐ Les billes (Frédéric, 07/10 : « j'adore les schémas avec les billes ») :
# le même rectangle de 12, nu, encadré par colonnes, encadré par rangées —
# la promesse du titre en une image.
#
# Usage :  python manim/miniature_multiplication_division.py
# Sortie : à côté de la vidéo, dans manim/sorties/bases/maths/paysage/fr/multiplication-division/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, RACINE, ROUGE, VERT, police
import miniature_essai_v2 as paysage

ORANGE = (217, 119, 20)
PAS = 48
R = 15


def billes(d, cx, cy, cadre=None, couleur=None):
    """12 billes en 3 rangées de 4, centrées sur (cx, cy), encadrées ou non."""
    x0 = cx - 1.5 * PAS
    y0 = cy - PAS
    if cadre == "colonnes":
        for c in range(4):
            x = x0 + c * PAS
            d.rounded_rectangle([x - R - 5, y0 - R - 5, x + R + 5, y0 + 2 * PAS + R + 5],
                                radius=14, outline=couleur, width=5)
    if cadre == "rangees":
        for r in range(3):
            y = y0 + r * PAS
            d.rounded_rectangle([x0 - R - 5, y - R - 5, x0 + 3 * PAS + R + 5, y + R + 5],
                                radius=14, outline=couleur, width=5)
    for r in range(3):
        for c in range(4):
            x, y = x0 + c * PAS, y0 + r * PAS
            d.ellipse([x - R, y - R, x + R, y + R], fill=BLEU)


def acc(d):
    """Bande utile : y 356 → 600, x 58 → 920."""
    f = police("ariblk.ttf", 40)
    for cx, cadre, coul, txt in [
        (190, None, NAVY, "3 × 4 = 12"),
        (490, "colonnes", VERT, "12 : 4 = 3"),
        (790, "rangees", ORANGE, "12 : 3 = 4"),
    ]:
        billes(d, cx, 440, cadre, coul)
        w = d.textlength(txt, font=f)
        d.text((cx - w / 2, 530), txt, font=f, fill=coul)


def acc_short_billes(d):
    """Le short « les billes » : les trois rectangles empilés, en grand."""
    global PAS, R
    PAS, R = 64, 21
    f = police("ariblk.ttf", 52)
    for cy, cadre, coul, txt in [
        (730, None, NAVY, "3 × 4 = 12"),
        (975, "colonnes", VERT, "12 : 4 = 3"),
        (1220, "rangees", ORANGE, "12 : 3 = 4"),
    ]:
        billes(d, 330, cy, cadre, coul)
        d.text((560, cy - 34), txt, font=f, fill=coul)
    PAS, R = 48, 15


def centre(d, y, txt, f, fill):
    d.text((540 - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=fill)


def acc_short_piege(d):
    """La vraie en vert, la fausse en rouge, barrée."""
    f = police("ariblk.ttf", 120)
    centre(d, 760, "12 : 4 = 3", f, VERT)
    centre(d, 1010, "4 : 12 = 3", f, ROUGE)
    w = d.textlength("4 : 12 = 3", font=f)
    x0, x1 = 540 - w / 2, 540 + w / 2
    d.line([(x0, 1150), (x1, 1035)], fill=NAVY, width=12)
    d.line([(x0, 1035), (x1, 1150)], fill=NAVY, width=12)


def acc_short_56(d):
    """La table de 8, et la ligne qui répond."""
    f = police("ariblk.ttf", 56)
    for k in range(1, 8):
        txt = f"8 × {k} = {8 * k}"
        coul = VERT if k == 7 else NAVY
        d.text((180, 730 + (k - 1) * 84), txt, font=f, fill=coul)
    d.rounded_rectangle([160, 730 + 6 * 84 - 14, 620, 730 + 6 * 84 + 78], radius=18, outline=VERT, width=7)


SHORTS = {
    "billes": (["UNE MULTIPLICATION", "DEUX DIVISIONS"], 76, "sans bouger une bille", acc_short_billes),
    "piege": (["LE PIÈGE", "DE LA DIVISION"], 96, "4 : 12 ne fait pas 3", acc_short_piege),
    "56": (["56 : 8", "SANS POSER"], 96, "avec la table de 8", acc_short_56),
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    import shutil
    import miniature_short as short
    dst = RACINE / "manim/sorties/bases/maths/shorts/fr/multiplication-division"
    dst.mkdir(parents=True, exist_ok=True)
    for cle, (titre, taille, sous, accroche) in SHORTS.items():
        nom = f"eleveai-maths-bases-multiplication-division-short-{cle}"
        short.construire(nom, {
            "badge": "LES BASES", "titre": titre, "taille": taille,
            "sous": sous, "taille_sous": 56, "couleur_sous": ORANGE,
            "accroche": accroche, "dossier": "bases/maths/fr",
        })
        shutil.copy(short.SORTIE / "bases/maths/fr" / f"{nom}.png", dst / f"{nom}.png")
        print(dst / f"{nom}.png")
    (RACINE / "manim/sorties/bases/maths/paysage/fr/multiplication-division").mkdir(parents=True, exist_ok=True)
    paysage.construire("eleveai-maths-bases-multiplication-division", {
        "badge": "LES BASES", "duree": sys.argv[1] if len(sys.argv) > 1 else "EN 5 MIN",
        "titre": ["UNE MULTIPLICATION,", "DEUX DIVISIONS"],
        "accroche": acc,
    })


if __name__ == "__main__":
    main()
