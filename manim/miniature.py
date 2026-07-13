# Générateur de miniatures YouTube EleveAI (1280x720).
# Charte : fond navy, titre jaune, badge cyan, Ti-Margo à droite, accroche calcul.
# Usage : python manim/miniature.py  → écrit dans manim/miniatures/<nom>.png

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
SORTIE = RACINE / "manim" / "miniatures"

W, H = 1280, 720
BG_TOP = (6, 40, 74)
BG_BOT = (11, 58, 102)
JAUNE = (255, 215, 0)
CYAN = (45, 212, 238)
NAVY = (4, 24, 46)
BLANC = (245, 249, 255)
VERT = (52, 211, 153)


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


def fond():
    img = Image.new("RGB", (W, H), BG_TOP)
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line(
            [(0, y), (W, y)],
            fill=tuple(int(BG_TOP[i] + (BG_BOT[i] - BG_TOP[i]) * t) for i in range(3)),
        )
    # halo doux en haut à gauche
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    hd.ellipse([-200, -260, 520, 360], fill=(45, 212, 238, 40))
    img.paste(Image.alpha_composite(img.convert("RGBA"), halo).convert("RGB"), (0, 0))
    return img


def texte_droite(d, x_droite, y, txt, font, fill):
    l = d.textlength(txt, font=font)
    d.text((x_droite - l, y), txt, font=font, fill=fill)


def calcul_pose(d, x_gauche, y_haut):
    """Une addition posée en gros : 475 + 286 = 761 (761 en vert)."""
    f = police("arialbd.ttf", 74)
    x_droite = x_gauche + 250
    d.text((x_gauche - 92, y_haut + 88), "+", font=f, fill=BLANC)
    texte_droite(d, x_droite, y_haut, "475", f, BLANC)
    texte_droite(d, x_droite, y_haut + 88, "286", f, BLANC)
    d.rounded_rectangle(
        [x_gauche - 104, y_haut + 178, x_droite, y_haut + 190], radius=6, fill=JAUNE
    )
    texte_droite(d, x_droite, y_haut + 200, "761", f, VERT)


def badge(d, x, y, txt):
    f = police("ariblk.ttf", 34)
    l = d.textlength(txt, font=f)
    d.rounded_rectangle([x, y, x + l + 56, y + 62], radius=31, fill=CYAN)
    d.text((x + 28, y + 12), txt, font=f, fill=NAVY)


def construire():
    img = fond()
    d = ImageDraw.Draw(img)

    # Ti-Margo, bas-droite
    margo = Image.open(TI_MARGO).convert("RGBA")
    h_cible = 660
    w_cible = int(margo.width * h_cible / margo.height)
    margo = margo.resize((w_cible, h_cible), Image.LANCZOS)
    img.paste(margo, (W - w_cible - 8, H - h_cible - 10), margo)

    # Badge
    badge(d, 64, 54, "MATHS · 6e")

    # Titre jaune, Arial Black, deux lignes
    ft = police("ariblk.ttf", 96)
    d.text((60, 140), "LE CALCUL", font=ft, fill=JAUNE)
    d.text((60, 240), "POSÉ", font=ft, fill=JAUNE)

    # Accroche calcul posé
    calcul_pose(d, 150, 378)

    # Wordmark
    fw = police("arialbd.ttf", 32)
    d.text((64, 668), "eleveai.fr", font=fw, fill=CYAN)

    os.makedirs(SORTIE, exist_ok=True)
    chemin = SORTIE / "eleveai-maths-6e-entier-calcul-pose.png"
    img.save(chemin, "PNG")
    print(chemin)


if __name__ == "__main__":
    construire()
