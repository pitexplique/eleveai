# Générateur de miniatures YouTube EleveAI (1280x720).
# STYLE DE LA SÉRIE (choisi le 13/07) : « tableau d'école » — fond vert ardoise,
# liseré clair, badge jaune, titre blanc (Arial Black), accroche, Ti-Margo à droite.
# Pour une nouvelle notion : copier ce fichier, changer les variables du bloc
# « CONTENU » et la fonction accroche(). Sortie nommée comme la vidéo.
#
# Usage : python manim/miniature.py  → manim/miniatures/<nom>.png

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
SORTIE = RACINE / "manim" / "miniatures"

# ── CONTENU (à changer d'une notion à l'autre) ─────────────────────────────────
NOM = "eleveai-maths-6e-entier-calcul-pose"
BADGE = "MATHS · 6e"
TITRE = ["LE CALCUL", "POSÉ"]

# ── Charte tableau d'école ─────────────────────────────────────────────────────
W, H = 1280, 720
VERT_TOP = (16, 46, 34)
VERT_BOT = (10, 30, 22)
CADRE = (120, 170, 140)
JAUNE = (255, 215, 0)
BLANC = (245, 249, 255)
CRAIE = (200, 230, 210)


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


def fond():
    img = Image.new("RGB", (W, H), VERT_TOP)
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(VERT_TOP[i] + (VERT_BOT[i] - VERT_TOP[i]) * t) for i in range(3)))
    d.rectangle([10, 10, W - 11, H - 11], outline=CADRE, width=6)
    return img


def badge(d, x, y, txt):
    f = police("ariblk.ttf", 34)
    l = d.textlength(txt, font=f)
    d.rounded_rectangle([x, y, x + l + 56, y + 62], radius=31, fill=JAUNE)
    d.text((x + 28, y + 12), txt, font=f, fill=VERT_TOP)


def accroche(d, x, y):
    """Les 4 opérations posées, chacune sa couleur (spécifique calcul posé)."""
    fo = police("ariblk.ttf", 118)
    ops = [("+", (56, 189, 248)), ("−", (250, 204, 21)), ("×", (248, 113, 113)), ("÷", (52, 211, 153))]
    xi = x
    for sym, col in ops:
        d.text((xi, y), sym, font=fo, fill=col)
        xi += 132
    d.text((x + 4, y + 164), "les 4 opérations, pas à pas", font=police("arialbd.ttf", 40), fill=CRAIE)


def construire():
    img = fond()
    d = ImageDraw.Draw(img)

    m = Image.open(TI_MARGO).convert("RGBA")
    h = 640
    w = int(m.width * h / m.height)
    m = m.resize((w, h), Image.LANCZOS)
    img.paste(m, (W - w - 20, H - h - 16), m)

    badge(d, 60, 54, BADGE)
    ft = police("ariblk.ttf", 100)
    d.text((58, 132), TITRE[0], font=ft, fill=BLANC)
    d.text((58, 236), TITRE[1], font=ft, fill=BLANC)

    accroche(d, 66, 392)
    d.text((70, 666), "eleveai.fr", font=police("arialbd.ttf", 30), fill=JAUNE)

    os.makedirs(SORTIE, exist_ok=True)
    chemin = SORTIE / f"{NOM}.png"
    img.save(chemin, "PNG")
    print(chemin)


if __name__ == "__main__":
    construire()
