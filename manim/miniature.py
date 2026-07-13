# Générateur de miniatures YouTube EleveAI (1280x720).
# Charte : titre jaune (ou blanc craie), badge cyan, Ti-Margo, accroche calcul.
# Usage : python manim/miniature.py  → écrit dans manim/miniatures/
#   - <nom>.png       variante 1 (résultat)
#   - <nom>-v2.png    variante 2 (question / curiosité)
#   - <nom>-v3.png    variante 3 (tableau d'école)

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
SORTIE = RACINE / "manim" / "miniatures"
BASE = "eleveai-maths-6e-entier-calcul-pose"

W, H = 1280, 720
JAUNE = (255, 215, 0)
CYAN = (45, 212, 238)
NAVY = (4, 24, 46)
BLANC = (245, 249, 255)
VERT = (52, 211, 153)


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


def fond(top, bot, halo=True):
    img = Image.new("RGB", (W, H), top)
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3)))
    if halo:
        h = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(h).ellipse([-200, -260, 520, 360], fill=(45, 212, 238, 38))
        img = Image.alpha_composite(img.convert("RGBA"), h).convert("RGB")
    return img


def margo(height, flip=False):
    m = Image.open(TI_MARGO).convert("RGBA")
    w = int(m.width * height / m.height)
    m = m.resize((w, height), Image.LANCZOS)
    if flip:
        m = m.transpose(Image.FLIP_LEFT_RIGHT)
    return m


def a_droite(d, x_droite, y, txt, font, fill):
    d.text((x_droite - d.textlength(txt, font=font), y), txt, font=font, fill=fill)


def badge(d, x, y, txt, bg=CYAN, fg=NAVY):
    f = police("ariblk.ttf", 34)
    l = d.textlength(txt, font=f)
    d.rounded_rectangle([x, y, x + l + 56, y + 62], radius=31, fill=bg)
    d.text((x + 28, y + 12), txt, font=f, fill=fg)


# ── Variante 1 : le résultat (navy, Ti-Margo à droite) ─────────────────────────
def variante1():
    img = fond((6, 40, 74), (11, 58, 102))
    d = ImageDraw.Draw(img)
    m = margo(660)
    img.paste(m, (W - m.width - 8, H - m.height - 10), m)

    badge(d, 64, 54, "MATHS · 6e")
    ft = police("ariblk.ttf", 96)
    d.text((60, 140), "LE CALCUL", font=ft, fill=JAUNE)
    d.text((60, 240), "POSÉ", font=ft, fill=JAUNE)

    f = police("arialbd.ttf", 74)
    xg, yh, xd = 150, 378, 400
    d.text((xg - 92, yh + 88), "+", font=f, fill=BLANC)
    a_droite(d, xd, yh, "475", f, BLANC)
    a_droite(d, xd, yh + 88, "286", f, BLANC)
    d.rounded_rectangle([xg - 104, yh + 178, xd, yh + 190], radius=6, fill=JAUNE)
    a_droite(d, xd, yh + 200, "761", f, VERT)

    d.text((64, 668), "eleveai.fr", font=police("arialbd.ttf", 32), fill=CYAN)
    return img


# ── Variante 2 : la question (navy, Ti-Margo à gauche qui pointe) ──────────────
def variante2():
    img = fond((6, 40, 74), (11, 58, 102))
    d = ImageDraw.Draw(img)
    m = margo(680, flip=True)
    img.paste(m, (-40, H - m.height - 6), m)

    xr = 1216
    badge(d, 640, 60, "MATHS · 6e")
    ft = police("ariblk.ttf", 92)
    a_droite(d, xr, 150, "LE CALCUL", ft, JAUNE)
    a_droite(d, xr, 248, "POSÉ", ft, JAUNE)

    fq = police("ariblk.ttf", 96)
    txt, q = "475 + 286 = ", "?"
    lq = d.textlength(q, font=fq)
    lt = d.textlength(txt, font=fq)
    d.text((xr - lt - lq, 430), txt, font=fq, fill=BLANC)
    d.text((xr - lq, 424), q, font=police("ariblk.ttf", 120), fill=JAUNE)

    a_droite(d, xr, 604, "Je pose, je calcule, je vérifie", police("arialbd.ttf", 34), CYAN)
    return img


# ── Variante 3 : le tableau d'école (fond craie vert, Ti-Margo à droite) ───────
def variante3():
    img = fond((16, 46, 34), (10, 30, 22), halo=False)
    d = ImageDraw.Draw(img)
    # liseré clair facon cadre de tableau
    d.rectangle([10, 10, W - 11, H - 11], outline=(120, 170, 140), width=6)
    m = margo(640)
    img.paste(m, (W - m.width - 20, H - m.height - 16), m)

    badge(d, 60, 54, "MATHS · 6e", bg=JAUNE, fg=(16, 46, 34))
    ft = police("ariblk.ttf", 100)
    d.text((58, 132), "LE CALCUL", font=ft, fill=BLANC)
    d.text((58, 236), "POSÉ", font=ft, fill=BLANC)

    # les 4 opérations, chacune sa couleur
    fo = police("ariblk.ttf", 118)
    ops = [("+", (56, 189, 248)), ("−", (250, 204, 21)), ("×", (248, 113, 113)), ("÷", (52, 211, 153))]
    x = 66
    for sym, col in ops:
        d.text((x, 392), sym, font=fo, fill=col)
        x += 132
    d.text((70, 556), "les 4 opérations, pas à pas", font=police("arialbd.ttf", 40), fill=(200, 230, 210))
    d.text((70, 666), "eleveai.fr", font=police("arialbd.ttf", 30), fill=JAUNE)
    return img


def construire():
    os.makedirs(SORTIE, exist_ok=True)
    for nom, fn in [(f"{BASE}.png", variante1), (f"{BASE}-v2.png", variante2), (f"{BASE}-v3.png", variante3)]:
        fn().save(SORTIE / nom, "PNG")
        print(SORTIE / nom)


if __name__ == "__main__":
    construire()
