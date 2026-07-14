# Habillage de la chaîne YouTube EleveAI : bannière + photo de profil.
# Même charte « cahier » que les miniatures (manim/miniature.py) pour que la
# chaîne soit visuellement unifiée avec toutes les vignettes.
#
# Bannière : 2560×1440 (exigence YouTube), mais SEULE la bande centrale
# 1546×423 est visible sur tous les appareils (la « safe zone ») → tout ce qui
# compte vit dedans ; le reste = décor (carreaux + gribouillis de cahier).
# Photo de profil : 800×800, affichée RONDE par YouTube → tout centré.
#
# Usage : python manim/chaine_youtube.py
# Sorties : manim/chaine/banniere-youtube.png + manim/chaine/avatar-youtube.png

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
AVATAR = RACINE / "public" / "images" / "avatar-frederic-Lacoste.jpg"
SORTIE = RACINE / "manim" / "chaine"

# ── Charte cahier (identique aux miniatures) ───────────────────────────────────
PAPIER = (247, 250, 255)
CARREAU = (214, 228, 246)
CARREAU_FORT = (196, 216, 240)
NAVY = (7, 42, 74)
BLEU = (37, 99, 175)
VERT = (22, 163, 90)
JAUNE = (255, 200, 0)
ORANGE = (234, 124, 32)


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


def fond_cahier(w, h, pas=34):
    img = Image.new("RGB", (w, h), PAPIER)
    d = ImageDraw.Draw(img)
    for x in range(0, w, pas):
        d.line([(x, 0), (x, h)], fill=CARREAU, width=1)
    for y in range(0, h, pas):
        d.line([(0, y), (w, y)], fill=CARREAU, width=1)
    for x in range(0, w, pas * 5):
        d.line([(x, 0), (x, h)], fill=CARREAU_FORT, width=2)
    for y in range(0, h, pas * 5):
        d.line([(0, y), (w, y)], fill=CARREAU_FORT, width=2)
    return img


def photo_ronde(img, source, cx, cy, diam, contour=NAVY, epaisseur=8):
    av = Image.open(source).convert("RGBA")
    s = min(av.size)
    av = av.crop(((av.width - s) // 2, (av.height - s) // 2,
                  (av.width + s) // 2, (av.height + s) // 2)).resize((diam, diam), Image.LANCZOS)
    masque = Image.new("L", (diam, diam), 0)
    ImageDraw.Draw(masque).ellipse([0, 0, diam, diam], fill=255)
    img.paste(av, (cx - diam // 2, cy - diam // 2), masque)
    d = ImageDraw.Draw(img)
    d.ellipse([cx - diam // 2 - epaisseur // 2, cy - diam // 2 - epaisseur // 2,
               cx + diam // 2 + epaisseur // 2, cy + diam // 2 + epaisseur // 2],
              outline=contour, width=epaisseur)


def gribouillis(d, alpha_col):
    """Doodles de cahier hors zone sûre (visibles sur grand écran seulement)."""
    f = police("arialbd.ttf", 60)
    fb = police("ariblk.ttf", 72)
    # à gauche
    d.text((150, 300), "47 + 8 = 55", font=f, fill=alpha_col)
    d.text((200, 1020), "180°", font=fb, fill=alpha_col)
    d.polygon([(180, 700), (420, 700), (300, 545)], outline=alpha_col, width=5)
    # à droite
    d.text((2160, 320), "2 m = 200 cm", font=f, fill=alpha_col)
    cx, cy, r = 2300, 1060, 90
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=alpha_col, width=5)
    d.pieslice([cx - r, cy - r, cx + r, cy + r], start=-90, end=0, fill=alpha_col)
    d.text((2110, 700), "P = 4 × c", font=f, fill=alpha_col)
    # petits carreaux d'aire
    for i in range(3):
        for j in range(2):
            x, y = 120 + i * 46, 850 + j * 46
            d.rectangle([x, y, x + 46, y + 46], outline=alpha_col, width=4)


def banniere():
    W, H = 2560, 1440
    SW, SH = 1546, 423                      # zone sûre YouTube
    sx, sy = (W - SW) // 2, (H - SH) // 2   # 507, 508

    img = fond_cahier(W, H)
    d = ImageDraw.Draw(img)

    # décor hors zone sûre : gribouillis de cahier très clairs
    gribouillis(d, (167, 199, 231))

    # ── tout l'essentiel DANS la zone sûre ────────────────────────────────────
    # Ti-Margo à droite de la bande
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 400
    mw = int(m.width * mh / m.height)
    m = m.resize((mw, mh), Image.LANCZOS)
    img.paste(m, (sx + SW - mw - 10, sy + SH - mh - 8), m)

    # photo ronde de Frédéric à gauche
    photo_ronde(img, AVATAR, sx + 120, sy + SH // 2, 210)

    # bloc texte centré entre la photo et Ti-Margo
    tx = sx + 265
    d.text((tx, sy + 52), "Eleve", font=police("ariblk.ttf", 130), fill=NAVY)
    l_eleve = d.textlength("Eleve", font=police("ariblk.ttf", 130))
    d.text((tx + l_eleve, sy + 52), "AI", font=police("ariblk.ttf", 130), fill=VERT)

    d.text((tx + 6, sy + 208), "Comprendre, s'entraîner, réussir", font=police("arialbd.ttf", 52), fill=BLEU)

    # ligne « matière · niveaux · 974 » sur un bandeau navy arrondi
    bt = "Maths · du CP à la Terminale · fait à La Réunion"
    fbt = police("arialbd.ttf", 40)
    lbt = d.textlength(bt, font=fbt)
    bx, by = tx + 6, sy + 300
    d.rounded_rectangle([bx, by, bx + lbt + 56, by + 70], radius=35, fill=NAVY)
    d.text((bx + 28, by + 13), bt, font=fbt, fill=(255, 255, 255))

    # « Frédéric, ton prof » sous la photo
    d.text((sx + 30, sy + SH // 2 + 118), "Frédéric,", font=police("arialbd.ttf", 34), fill=NAVY)
    d.text((sx + 30, sy + SH // 2 + 158), "ton prof", font=police("arialbd.ttf", 34), fill=NAVY)

    os.makedirs(SORTIE, exist_ok=True)
    chemin = SORTIE / "banniere-youtube.png"
    img.save(chemin, "PNG")
    print(chemin)


def avatar():
    S = 800
    img = fond_cahier(S, S, pas=40)
    d = ImageDraw.Draw(img)

    # anneau navy plein cadre (YouTube recadre en rond : tout doit être centré)
    d.ellipse([14, 14, S - 14, S - 14], outline=NAVY, width=18)

    # Ti-Margo centré, plein cadre
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 640
    mw = int(m.width * mh / m.height)
    m = m.resize((mw, mh), Image.LANCZOS)
    img.paste(m, ((S - mw) // 2, (S - mh) // 2 - 30), m)

    # « eleveai.fr » en bas, dans le cercle
    f = police("ariblk.ttf", 64)
    t = "eleveai.fr"
    lt = d.textlength(t, font=f)
    d.rounded_rectangle([(S - lt) / 2 - 26, 636, (S + lt) / 2 + 26, 726], radius=45, fill=NAVY)
    d.text(((S - lt) / 2, 648), t, font=f, fill=(255, 255, 255))

    chemin = SORTIE / "avatar-youtube.png"
    img.save(chemin, "PNG")
    print(chemin)


if __name__ == "__main__":
    banniere()
    avatar()
