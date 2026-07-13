# Générateur de miniatures YouTube EleveAI (1280x720).
# STYLE DE LA SÉRIE (choisi le 13/07) : « cahier » — fond papier à carreaux clair,
# badge bleu nuit, titre bleu nuit (Arial Black), addition posée sur les carreaux,
# Ti-Margo à droite, et la SIGNATURE HUMAINE en bas à gauche : photo ronde de
# Frédéric + eleveai.fr (le « prof vrai », pas une marque anonyme).
# Pour une nouvelle notion : changer le bloc « CONTENU » et la fonction accroche().
#
# Usage : python manim/miniature.py  → manim/miniatures/<nom>.png

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
AVATAR = RACINE / "public" / "images" / "avatar-frederic-Lacoste.jpg"
SORTIE = RACINE / "manim" / "miniatures"

# ── CONTENU (à changer d'une notion à l'autre) ─────────────────────────────────
NOM = "eleveai-maths-6e-fraction-nombre"
BADGE = "MATHS · 6e"
TITRE = ["LES", "FRACTIONS"]
TITRE_TAILLE = 84
SOUS_TITRE = "lire · représenter · comparer"

# ── Charte cahier ──────────────────────────────────────────────────────────────
W, H = 1280, 720
PAPIER = (247, 250, 255)
CARREAU = (214, 228, 246)
CARREAU_FORT = (196, 216, 240)
NAVY = (7, 42, 74)
BLEU = (37, 99, 175)
VERT = (22, 163, 90)
JAUNE = (255, 200, 0)


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


def a_droite(d, xr, y, txt, f, fill):
    d.text((xr - d.textlength(txt, font=f), y), txt, font=f, fill=fill)


def fond():
    img = Image.new("RGB", (W, H), PAPIER)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 34):
        d.line([(x, 0), (x, H)], fill=CARREAU, width=1)
    for y in range(0, H, 34):
        d.line([(0, y), (W, y)], fill=CARREAU, width=1)
    for x in range(0, W, 170):
        d.line([(x, 0), (x, H)], fill=CARREAU_FORT, width=2)
    for y in range(0, H, 170):
        d.line([(0, y), (W, y)], fill=CARREAU_FORT, width=2)
    return img


def badge(d, x, y, txt):
    f = police("ariblk.ttf", 32)
    l = d.textlength(txt, font=f)
    d.rounded_rectangle([x, y, x + l + 52, y + 58], radius=29, fill=NAVY)
    d.text((x + 26, y + 11), txt, font=f, fill=(255, 255, 255))


def accroche(d):
    """3/4 dessiné : disque partagé en 4, 3 parts coloriées (spécifique fractions)."""
    d.text((300, 296), "3/4", font=police("ariblk.ttf", 104), fill=BLEU)
    cx, cy, r = 570, 384, 76
    box = [cx - r, cy - r, cx + r, cy + r]
    d.pieslice(box, start=-90, end=180, fill=BLEU)
    d.ellipse(box, outline=NAVY, width=4)
    d.line([cx - r, cy, cx + r, cy], fill=NAVY, width=3)
    d.line([cx, cy - r, cx, cy + r], fill=NAVY, width=3)


def signature(img, d):
    """Photo ronde de Frédéric + eleveai.fr, en bas à gauche."""
    diam, x, y = 128, 60, 556
    av = Image.open(AVATAR).convert("RGBA")
    s = min(av.size)
    av = av.crop(((av.width - s) // 2, (av.height - s) // 2,
                  (av.width + s) // 2, (av.height + s) // 2)).resize((diam, diam), Image.LANCZOS)
    masque = Image.new("L", (diam, diam), 0)
    ImageDraw.Draw(masque).ellipse([0, 0, diam, diam], fill=255)
    img.paste(av, (x, y), masque)
    d.ellipse([x - 4, y - 4, x + diam + 4, y + diam + 4], outline=NAVY, width=6)

    tx = x + diam + 24
    d.text((tx, y + 16), "Frédéric, ton prof", font=police("arialbd.ttf", 34), fill=NAVY)
    d.text((tx, y + 62), "eleveai.fr", font=police("ariblk.ttf", 40), fill=BLEU)


def construire():
    img = fond()
    d = ImageDraw.Draw(img)

    m = Image.open(TI_MARGO).convert("RGBA")
    h = 636
    w = int(m.width * h / m.height)
    m = m.resize((w, h), Image.LANCZOS)
    img.paste(m, (W - w - 4, H - h - 6), m)

    badge(d, 58, 48, BADGE)
    ft = police("ariblk.ttf", TITRE_TAILLE)
    d.text((56, 116), TITRE[0], font=ft, fill=NAVY)
    d.text((56, 208), TITRE[1], font=ft, fill=NAVY)
    d.text((58, 300), SOUS_TITRE, font=police("arialbd.ttf", 32), fill=BLEU)

    accroche(d)
    signature(img, d)

    os.makedirs(SORTIE, exist_ok=True)
    chemin = SORTIE / f"{NOM}.png"
    img.save(chemin, "PNG")
    print(chemin)


if __name__ == "__main__":
    construire()
