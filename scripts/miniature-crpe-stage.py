# miniature-crpe-stage.py
# Les miniatures YouTube de la vidéo d'annonce du stage CRPE de janvier 2027 (25/11/2026).
# Même charte que la pub Instagram (scripts/pub-crpe-instagram.py) : fond clair ambre → bleu,
# Arial Black, orange pour « jusqu'en 3e ». Chiffres : app/formation-crpe/page.tsx.
#   · paysage 1280 × 720 ;
#   · short 1080 × 1920, tout entre y = 215 et y = 1700 (zone sûre de l'onglet Shorts, REGLES.md).
# Usage : python scripts/miniature-crpe-stage.py

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
AVATAR = RACINE / "public" / "images" / "avatar-frederic-visage.webp"
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
SORTIE = RACINE / "manim" / "sorties" / "annonce" / "crpe-stage"

NAVY = (4, 27, 51)
ENCRE = (15, 23, 42)
GRIS = (71, 85, 105)
ORANGE = (234, 88, 12)
AMBRE = (251, 191, 36)
BLANC = (255, 255, 255)
VERT = (22, 163, 74)


def police(nom, t):
    return ImageFont.truetype(str(FONTS / nom), t)


NOIR = lambda t: police("ariblk.ttf", t)  # noqa: E731
GRAS = lambda t: police("arialbd.ttf", t)  # noqa: E731


def fond(w, h):
    haut, milieu, bas = (255, 247, 230), (255, 238, 240), (232, 244, 255)
    col = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / (h - 1)
        a, b, u = (haut, milieu, t * 2) if t < 0.5 else (milieu, bas, (t - 0.5) * 2)
        col.putpixel((0, y), tuple(int(a[i] + (b[i] - a[i]) * u) for i in range(3)))
    im = col.resize((w, h))
    halos = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(halos)
    d.ellipse((-w * 0.25, -h * 0.2, w * 0.45, h * 0.5), fill=(253, 230, 138, 120))
    d.ellipse((w * 0.6, h * 0.3, w * 1.3, h * 1.0), fill=(254, 205, 211, 110))
    halos = halos.filter(ImageFilter.GaussianBlur(min(w, h) // 10))
    im.paste(halos, (0, 0), halos)
    return im


def avatar_rond(taille):
    a = Image.open(AVATAR).convert("RGB")
    c = min(a.size)
    a = a.crop(((a.width - c) // 2, (a.height - c) // 2, (a.width + c) // 2, (a.height + c) // 2))
    a = a.resize((taille, taille), Image.LANCZOS)
    masque = Image.new("L", (taille, taille), 0)
    ImageDraw.Draw(masque).ellipse((0, 0, taille, taille), fill=255)
    bord = Image.new("RGBA", (taille + 16, taille + 16), (0, 0, 0, 0))
    ImageDraw.Draw(bord).ellipse((0, 0, taille + 15, taille + 15), fill=AMBRE + (255,))
    bord.paste(a, (8, 8), masque)
    return bord


def margo(hauteur):
    m = Image.open(TI_MARGO).convert("RGBA")
    return m.resize((int(m.width * hauteur / m.height), hauteur), Image.LANCZOS)


def pilule(d, x, y, texte, f, fond_c, texte_c, pad_x=24, pad_y=12, centre=False):
    w = d.textlength(texte, font=f)
    h = f.size + 2 * pad_y
    if centre:
        x = x - (w + 2 * pad_x) / 2
    d.rounded_rectangle((x, y, x + w + 2 * pad_x, y + h), radius=h // 2, fill=fond_c)
    d.text((x + pad_x, y + pad_y - f.size * 0.08), texte, font=f, fill=texte_c)
    return y + h


def texte_ajuste(d, x, y, texte, nom_police, t, largeur_max, couleur, centre=False):
    """Écrit `texte` à la taille `t`, réduite si besoin pour tenir dans `largeur_max`."""
    f = police(nom_police, t)
    while d.textlength(texte, font=f) > largeur_max:
        t -= 2
        f = police(nom_police, t)
    b = d.textbbox((0, 0), texte, font=f)
    if centre:
        x = x - (b[2] - b[0]) / 2
    d.text((x - b[0], y - b[1]), texte, font=f, fill=couleur)
    return y + (b[3] - b[1])


def paysage():
    W, H = 1280, 720
    im = fond(W, H).convert("RGBA")
    d = ImageDraw.Draw(im)
    m = 64
    y = pilule(d, m, 48, "CRPE 2027 · stage intensif", NOIR(30), NAVY, AMBRE)
    y = texte_ajuste(d, m, y + 40, "Les maths du CRPE", "ariblk.ttf", 92, 800, ENCRE)
    y = texte_ajuste(d, m, y + 22, "en 1 semaine", "ariblk.ttf", 92, 800, ORANGE)
    y = texte_ajuste(d, m, y + 42, "Vous enseignerez jusqu'au CM2…", "arialbd.ttf", 38, 760, GRIS)
    y = texte_ajuste(d, m, y + 16, "l'épreuve va jusqu'en 3e !", "ariblk.ttf", 44, 760, ORANGE)
    x = m
    for mot in ("Thalès", "Pythagore", "PGCD", "équations"):
        f = GRAS(30)
        pilule(d, x, y + 40, mot, f, (255, 255, 255, 230), NAVY, pad_x=18, pad_y=10)
        x += d.textlength(mot, font=f) + 36 + 14
    pilule(d, m, H - 112, "Janvier 2027 · 10 places", NOIR(32), ORANGE, BLANC)
    av = avatar_rond(300)
    im.paste(av, (W - av.width - 70, 90), av)
    d.text((W - 70 - av.width / 2 - d.textlength("Frédéric", font=NOIR(34)) / 2, 90 + av.height + 16),
           "Frédéric", font=NOIR(34), fill=ENCRE)
    mg = margo(200)
    im.paste(mg, (W - mg.width - 40, H - mg.height - 24), mg)
    return im.convert("RGB")


def short():
    """⛔ 28/11/2026 (Frédéric : « on corrige tous les points ») : la première
    version disait « Bonne résolution 2027 » alors que le titre YouTube pose la
    question de l'hypoténuse. Celui qui clique pour la question tombait sur une
    pub. La miniature pose maintenant LA MÊME question que le titre, en gros, et
    garde le stage en bas."""
    W, H = 1080, 1920
    im = fond(W, H).convert("RGBA")
    d = ImageDraw.Draw(im)
    cx, L = W // 2, 940
    y = pilule(d, cx, 240, "CRPE 2027 · question du concours", NOIR(42), NAVY, AMBRE, centre=True)
    y = texte_ajuste(d, cx, y + 50, "Triangle rectangle", "ariblk.ttf", 84, L, ENCRE, centre=True)
    # le triangle : 6 cm debout, 8 cm couché, l'angle droit en bas à gauche
    k = 58
    ax, ay = cx - 4 * k, y + 70 + 6 * k
    A, B, C = (ax, ay), (ax + 8 * k, ay), (ax, ay - 6 * k)
    d.polygon([A, B, C], fill=(255, 255, 255, 235))
    d.line([C, A, B], fill=ENCRE, width=12)
    d.line([B, C], fill=ORANGE, width=16)
    d.rectangle((ax, ay - 40, ax + 40, ay), outline=ENCRE, width=6)
    d.text((ax - 200, ay - 3 * k - 40), "6 cm", font=NOIR(64), fill=ENCRE)
    d.text((ax + 4 * k - 85, ay + 18), "8 cm", font=NOIR(64), fill=ENCRE)
    d.text((ax + 4 * k + 40, ay - 3 * k - 150), "?", font=NOIR(150), fill=ORANGE)
    y = ay + 150
    y = texte_ajuste(d, cx, y, "l'hypoténuse ?", "ariblk.ttf", 120, L, ORANGE, centre=True)
    y = texte_ajuste(d, cx, y + 50, "Les maths du CRPE en 1 semaine", "ariblk.ttf", 58, L, ENCRE, centre=True)
    av = avatar_rond(200)
    im.paste(av, (cx - av.width - 40, y + 60), av)
    mg = margo(240)
    im.paste(mg, (cx + 60, y + 40), mg)
    pilule(d, cx, y + 60 + av.height + 50, "Janvier · 10 places", NOIR(56), ORANGE, BLANC, centre=True)
    return im.convert("RGB")


if __name__ == "__main__":
    SORTIE.mkdir(parents=True, exist_ok=True)
    paysage().save(SORTIE / "eleveai-annonce-crpe-stage.png")
    short().save(SORTIE / "eleveai-annonce-crpe-stage-short.png")
    print("Miniatures écrites dans", SORTIE)
