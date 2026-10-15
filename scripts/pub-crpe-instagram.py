# La pub Instagram de la formation CRPE (15/10/2026) : un post 1080x1350 et
# une story 1080x1920, dans les couleurs de /formation-crpe (ambre, rose,
# orange, un seul bloc bleu nuit pour l'action).
#
# ⭐ L'ACCROCHE EST L'ARGUMENT DE LA PAGE : on se prépare à enseigner jusqu'au
# CM2, mais l'épreuve de maths va jusqu'en troisième. C'est le malentendu qui
# fait arrêter le pouce, et il est vrai.
# ⛔ AUCUN CHIFFRE INVENTÉ (taux d'admis, avis…) : la première promotion n'a
# pas fini. Prix, lieu, horaires : ceux de la page, rien d'autre.
#
# Usage : python scripts/pub-crpe-instagram.py
#   → pub/instagram/crpe/carrousel-{1,2,3}-…-1080x1350.png (à publier en premier)
#   → pub/instagram/crpe/post-1080x1350.png
#   → pub/instagram/crpe/story-1080x1920.png
#   (la légende à coller est à côté : pub/instagram/crpe/legende.md)

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
# Le visage recadré : la photo entière ne montre qu'une silhouette à 130 px.
AVATAR = RACINE / "public" / "images" / "avatar-frederic-visage.webp"
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
SORTIE = RACINE / "pub" / "instagram" / "crpe"

W = 1080
NAVY = (4, 27, 51)
ENCRE = (15, 23, 42)
GRIS = (71, 85, 105)
ORANGE = (234, 88, 12)
ORANGE_CLAIR = (253, 186, 116)
AMBRE = (251, 191, 36)
BLANC = (255, 255, 255)


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


NOIR = lambda t: police("ariblk.ttf", t)  # noqa: E731
GRAS = lambda t: police("arialbd.ttf", t)  # noqa: E731


def fond(h):
    """Dégradé ambre → rose pâle → bleu ciel, avec trois halos doux."""
    haut, milieu, bas = (255, 247, 230), (255, 238, 240), (232, 244, 255)
    im = Image.new("RGB", (W, h))
    px = im.load()
    for y in range(h):
        t = y / (h - 1)
        a, b, u = (haut, milieu, t * 2) if t < 0.5 else (milieu, bas, (t - 0.5) * 2)
        c = tuple(int(a[i] + (b[i] - a[i]) * u) for i in range(3))
        for x in range(W):
            px[x, y] = c
    halos = Image.new("RGBA", (W, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(halos)
    d.ellipse((-260, -200, 520, 560), fill=(253, 230, 138, 120))
    d.ellipse((620, h * 0.35, 1400, h * 0.35 + 760), fill=(254, 205, 211, 110))
    d.ellipse((-200, h * 0.75, 560, h * 0.75 + 700), fill=(186, 230, 253, 120))
    halos = halos.filter(ImageFilter.GaussianBlur(110))
    im.paste(halos, (0, 0), halos)
    return im


def largeur(d, texte, f):
    return d.textlength(texte, font=f)


def pilule(d, x, y, texte, f, fond_c, texte_c, pad_x=26, pad_y=14):
    w = largeur(d, texte, f)
    hauteur = f.size + 2 * pad_y
    d.rounded_rectangle((x, y, x + w + 2 * pad_x, y + hauteur), radius=hauteur // 2, fill=fond_c)
    d.text((x + pad_x, y + pad_y - f.size * 0.08), texte, font=f, fill=texte_c)
    return x + w + 2 * pad_x, y + hauteur


def avatar_rond(taille):
    a = Image.open(AVATAR).convert("RGB")
    c = min(a.size)
    a = a.crop(((a.width - c) // 2, (a.height - c) // 2, (a.width + c) // 2, (a.height + c) // 2))
    a = a.resize((taille, taille), Image.LANCZOS)
    masque = Image.new("L", (taille, taille), 0)
    ImageDraw.Draw(masque).ellipse((0, 0, taille, taille), fill=255)
    bord = Image.new("RGBA", (taille + 16, taille + 16), (0, 0, 0, 0))
    ImageDraw.Draw(bord).ellipse((0, 0, taille + 15, taille + 15), fill=(253, 230, 138, 255))
    bord.paste(a, (8, 8), masque)
    return bord


def carte(im, box, rayon=36, fond_c=(255, 255, 255, 240)):
    ombre = Image.new("RGBA", im.size, (0, 0, 0, 0))
    ImageDraw.Draw(ombre).rounded_rectangle(
        (box[0], box[1] + 10, box[2], box[3] + 10), radius=rayon, fill=(15, 23, 42, 40)
    )
    ombre = ombre.filter(ImageFilter.GaussianBlur(18))
    im.paste(ombre, (0, 0), ombre)
    ImageDraw.Draw(im).rounded_rectangle(box, radius=rayon, fill=fond_c)


def composer(h):
    story = h > 1500
    # Le post (4:5) a 570 px de moins que la story : tout s'y resserre.
    k = (lambda v: int(v * 0.93)) if story else (lambda v: int(v * 0.85))
    im = fond(h).convert("RGBA")
    d = ImageDraw.Draw(im)
    marge = 72
    # Une story garde ~250 px libres en haut et en bas (barre de profil,
    # champ de réponse) : rien d'important n'y va.
    y = 250 if story else 70

    # ── Le titre : « CRPE · épreuve de maths · La Réunion » EN PLUS GROS
    # (Frédéric, 15/10 : « mets le plus gros »). C'est ce qu'on lit en un quart
    # de seconde en faisant défiler : le concours, la matière, l'île. Chaque
    # ligne prend toute la largeur utile.
    # ⭐ Puis « toute la 90 % de la largeur » : chaque ligne est agrandie
    # jusqu'à faire 90 % de l'image, et centrée — au pixel près, mesuré sur
    # l'encre réelle (textbbox), pas sur l'avance typographique.
    cible = int(W * 0.9)

    def ligne(texte, couleur, y):
        t = 40
        while True:
            b = d.textbbox((0, 0), texte, font=NOIR(t + 2))
            if b[2] - b[0] > cible:
                break
            t += 2
        f = NOIR(t)
        b = d.textbbox((0, 0), texte, font=f)
        d.text(((W - (b[2] - b[0])) / 2 - b[0], y - b[1]), texte, font=f, fill=couleur)
        return y + (b[3] - b[1])

    y = ligne("CRPE 2027", NAVY, y) + k(26)
    y = ligne("ÉPREUVE DE MATHS", ORANGE, y) + k(22)
    y = ligne("LA RÉUNION · 974", (13, 148, 136), y) + k(30)

    # ── L'accroche, désormais en second
    d.text((marge, y), "Vous enseignerez jusqu'au CM2.", font=NOIR(k(46)), fill=ENCRE)
    y += k(62)
    t = "L'épreuve, elle, va jusqu'en 3e."
    debut = "L'épreuve, elle, va jusqu'en 3"
    d.text((marge, y), debut, font=NOIR(k(46)), fill=ORANGE)
    x3 = marge + largeur(d, debut, NOIR(k(46)))
    d.text((x3 + 2, y), "e", font=NOIR(k(26)), fill=ORANGE)
    d.text((x3 + 3 + largeur(d, "e", NOIR(k(26))), y), ".", font=NOIR(k(46)), fill=ORANGE)
    y += k(80)

    # ── Les notions de collège qui tombent — STORY SEULEMENT depuis que
    # l'encadré bleu porte le déroulé : le post (4:5) n'a plus la place, et
    # l'accroche y dit déjà « jusqu'en 3e ».
    if story:
        x = marge
        for n in ["Thalès", "Pythagore", "PGCD", "équations", "probabilités"]:
            f = GRAS(k(30))
            if x + largeur(d, n, f) + 52 > W - marge:
                x = marge
                y += k(70)
            x, _ = pilule(d, x, y, n, f, (255, 228, 230), (159, 18, 57), pad_x=24, pad_y=12)
            x += 14
        y += k(84)
    else:
        y += k(4)

    # ── La carte de l'offre
    haut_carte = k(288)
    carte(im, (marge, y, W - marge, y + haut_carte))
    d = ImageDraw.Draw(im)
    cx = marge + 44
    d.text((cx, y + k(36)), "Le samedi matin, 8 h – 12 h", font=NOIR(k(48)), fill=ENCRE)
    d.text((cx, y + k(104)), "Hôtel Terre-Sainte, Saint-Pierre", font=GRAS(k(36)), fill=GRIS)
    d.text((cx, y + k(170)), "60 €", font=NOIR(k(84)), fill=ORANGE)
    px = cx + largeur(d, "60 € ", NOIR(k(84)))
    d.text((px, y + k(182)), "la matinée, sans forfait", font=GRAS(k(34)), fill=GRIS)
    d.text((px, y + k(228)), "1re séance : samedi 24 octobre", font=GRAS(k(30)), fill=GRIS)
    y += haut_carte + (40 if story else 26)

    # ── L'action : le seul bloc sombre
    # ⭐ 15/10 : le TÉLÉPHONE y entre (« il manque le numéro de téléphone »).
    # C'est un appel qui a lancé cette pub : on donne le numéro, pas seulement
    # le lien, et en blanc sur le bloc sombre, là où l'œil finit.
    # ⭐ 15/10, encore : « en encadré bleu il ne faut pas mettre test gratuit,
    # il faut mettre le déroulé et la philosophie de la séance ».
    haut_cta = k(392)
    carte(im, (marge, y, W - marge, y + haut_cta), fond_c=NAVY + (255,))
    d = ImageDraw.Draw(im)
    # ⭐ SA PHILOSOPHIE, MOT POUR MOT (Frédéric, 15/10) : « ce présenter, ce
    # sentir bien, savoir ce qui bloque, résoudre ». Quatre temps, dans cet
    # ordre — ne pas les reformuler.
    d.text((cx, y + k(30)), "Ma philosophie", font=NOIR(k(44)), fill=BLANC)
    temps = ["Se présenter", "Se sentir bien", "Savoir ce qui bloque", "Résoudre"]
    for i, l in enumerate(temps):
        ly = y + k(96) + i * k(50)
        r = k(18)
        d.ellipse((cx, ly + k(2), cx + 2 * r, ly + k(2) + 2 * r), fill=AMBRE)
        f = NOIR(k(25))
        n = str(i + 1)
        d.text((cx + r - largeur(d, n, f) / 2, ly + k(4)), n, font=f, fill=NAVY)
        d.text((cx + 2 * r + k(18), ly - k(2)), l, font=NOIR(k(36)), fill=BLANC if i < 3 else AMBRE)
    fin, _ = pilule(d, cx, y + k(306), "eleveai.fr/formation-crpe", NOIR(k(32)), AMBRE, NAVY,
                    pad_x=22, pad_y=12)
    d.text((fin + k(26), y + k(310)), "06 92 74 29 58", font=NOIR(k(40)), fill=BLANC)
    y += haut_cta

    # ── La signature : un visage, et Ti Margo
    bas = h - (260 if story else 48)
    av = avatar_rond(k(132))
    im.paste(av, (marge, bas - av.height), av)
    tx = marge + av.width + 26
    # 15/10 : « concepteur d'eleveai.fr » sous le nom (demande de Frédéric).
    d.text((tx, bas - k(136)), "Frédéric Lacoste", font=NOIR(k(38)), fill=ENCRE)
    d.text((tx, bas - k(88)), "prof de maths au collège, à La Réunion", font=GRAS(k(30)), fill=GRIS)
    d.text((tx, bas - k(50)), "concepteur d'eleveai.fr", font=GRAS(k(30)), fill=ORANGE)
    tm = Image.open(TI_MARGO).convert("RGBA")
    tm_h = k(190)
    tm = tm.resize((int(tm.width * tm_h / tm.height), tm_h), Image.LANCZOS)
    im.paste(tm, (W - marge - tm.width + 10, bas - tm_h + 6), tm)

    return im.convert("RGB"), y, bas - av.height


def composer_partage():
    """La même pub en 1200x630 : l'image de partage de /formation-crpe
    (WhatsApp, Facebook) et le visuel du bandeau de l'accueil.

    ⚠️ Elle va dans public/ — c'est la seule des trois que le site SERT.
    """
    LW, LH = 1200, 630
    im = fond(LH).resize((LW, LH), Image.LANCZOS).convert("RGBA")
    d = ImageDraw.Draw(im)
    marge = 56
    gauche = 640  # largeur de la colonne du titre

    def ligne(texte, couleur, y, cible):
        t = 20
        while d.textbbox((0, 0), texte, font=NOIR(t + 2))[2] - d.textbbox((0, 0), texte, font=NOIR(t + 2))[0] <= cible:
            t += 2
        f = NOIR(t)
        b = d.textbbox((0, 0), texte, font=f)
        d.text((marge - b[0], y - b[1]), texte, font=f, fill=couleur)
        return y + (b[3] - b[1])

    y = 58
    y = ligne("CRPE 2027", NAVY, y, gauche) + 20
    y = ligne("ÉPREUVE DE MATHS", ORANGE, y, gauche) + 16
    y = ligne("LA RÉUNION · 974", (13, 148, 136), y, gauche) + 30
    d.text((marge, y), "Vous enseignerez jusqu'au CM2.", font=NOIR(30), fill=ENCRE)
    d.text((marge, y + 40), "L'épreuve, elle, va jusqu'en 3e.", font=NOIR(30), fill=ORANGE)

    # La signature, en bas à gauche
    av = avatar_rond(92)
    im.paste(av, (marge, LH - 40 - av.height), av)
    d.text((marge + av.width + 18, LH - 40 - 96), "Frédéric Lacoste", font=NOIR(28), fill=ENCRE)
    d.text((marge + av.width + 18, LH - 40 - 60), "prof de maths au collège", font=GRAS(22), fill=GRIS)
    d.text((marge + av.width + 18, LH - 40 - 32), "concepteur d'eleveai.fr", font=GRAS(22), fill=ORANGE)

    # La colonne de droite : l'offre, puis l'action
    x0, x1 = gauche + marge + 50, LW - marge
    carte(im, (x0, 58, x1, 300), rayon=28)
    d = ImageDraw.Draw(im)
    cx = x0 + 30
    d.text((cx, 84), "Le samedi matin", font=NOIR(32), fill=ENCRE)
    d.text((cx, 124), "8 h – 12 h, Saint-Pierre", font=GRAS(26), fill=GRIS)
    d.text((cx, 172), "60 €", font=NOIR(64), fill=ORANGE)
    d.text((cx, 250), "1re séance : sam. 24 oct.", font=GRAS(24), fill=GRIS)
    carte(im, (x0, 330, x1, LH - 40), rayon=28, fond_c=NAVY + (255,))
    d = ImageDraw.Draw(im)
    # Sa philosophie, comme sur le post (15/10) — plus de « Test gratuit » ici.
    d.text((cx, 350), "Ma philosophie", font=NOIR(30), fill=BLANC)
    for i, l in enumerate(["1. Se présenter", "2. Se sentir bien", "3. Savoir ce qui bloque", "4. Résoudre"]):
        d.text((cx, 392 + i * 30), l, font=GRAS(25), fill=(226, 232, 240))
    d.text((cx, 522), "06 92 74 29 58", font=NOIR(34), fill=AMBRE)
    return im.convert("RGB")


# ═══ LE CARROUSEL (15/10/2026) ════════════════════════════════════════════
# Une image = une idée. Le post unique portait tout (titre, accroche, offre,
# philosophie, contact) : trop pour les deux secondes qu'on donne à une image
# en faisant défiler. Le carrousel coupe en trois, et Instagram le pousse
# davantage parce qu'on le fait glisser.
#
# ⭐ LA PHILOSOPHIE, SES QUATRE TEMPS MOT POUR MOT (« se présenter, se sentir
# bien, savoir ce qui bloque, résoudre »), chacun suivi de trois mots de
# concret. Les détails 3 et 4 viennent de la page (épreuve d'entrée, copies
# corrigées) ; le 2 dit en clair ce que « se sentir bien » vise : la peur des
# maths de beaucoup de candidats — c'est ce qui le distingue d'une prépa.
PHILOSOPHIE = [
    ("Se présenter", "on se connaît, on se lance"),
    ("Se sentir bien", "la peur des maths, on commence par là"),
    ("Savoir ce qui bloque", "une épreuve d'entrée, corrigée sur place"),
    ("Résoudre", "vos copies, corrigées une à une"),
]
H_CAR = 1350


def titre_large(d, texte, couleur, y, cible, larg=W):
    """Une ligne agrandie jusqu'à `cible` px d'encre, centrée sur `larg`."""
    t = 30
    while d.textbbox((0, 0), texte, font=NOIR(t + 2))[2] - d.textbbox((0, 0), texte, font=NOIR(t + 2))[0] <= cible:
        t += 2
    f = NOIR(t)
    b = d.textbbox((0, 0), texte, font=f)
    d.text(((larg - (b[2] - b[0])) / 2 - b[0], y - b[1]), texte, font=f, fill=couleur)
    return y + (b[3] - b[1])


def pastille(d, x, y, n, r, f):
    d.ellipse((x, y, x + 2 * r, y + 2 * r), fill=AMBRE)
    b = d.textbbox((0, 0), n, font=f)
    d.text((x + r - (b[2] - b[0]) / 2 - b[0], y + r - (b[3] - b[1]) / 2 - b[1]), n, font=f, fill=NAVY)


def glisser(d, n):
    """« 1/3  Glissez → » en bas à droite : le geste à faire, dit."""
    f = GRAS(30)
    texte = f"{n}/3   Glissez →" if n < 3 else "3/3"
    x = W - 72 - largeur(d, texte, f)
    d.text((x, H_CAR - 92), texte, font=f, fill=GRIS)


def signature(im, d, x, bas, taille=112):
    av = avatar_rond(taille)
    im.paste(av, (x, bas - av.height), av)
    tx = x + av.width + 22
    d.text((tx, bas - av.height + 8), "Frédéric Lacoste", font=NOIR(32), fill=ENCRE)
    d.text((tx, bas - av.height + 50), "prof de maths au collège, à La Réunion", font=GRAS(26), fill=GRIS)
    d.text((tx, bas - av.height + 84), "concepteur d'eleveai.fr", font=GRAS(26), fill=ORANGE)


def carrousel_1():
    """L'accroche. Rien d'autre : le titre, le malentendu, les notions."""
    im = fond(H_CAR).convert("RGBA")
    d = ImageDraw.Draw(im)
    cible = int(W * 0.9)
    y = 110
    y = titre_large(d, "CRPE 2027", NAVY, y, cible) + 28
    y = titre_large(d, "ÉPREUVE DE MATHS", ORANGE, y, cible) + 24
    y = titre_large(d, "LA RÉUNION · 974", (13, 148, 136), y, cible) + 110
    d.text((72, y), "Vous enseignerez", font=NOIR(66), fill=ENCRE)
    d.text((72, y + 78), "jusqu'au CM2.", font=NOIR(66), fill=ENCRE)
    y += 196
    d.text((72, y), "L'épreuve, elle,", font=NOIR(74), fill=ORANGE)
    d.text((72, y + 86), "va jusqu'en 3", font=NOIR(74), fill=ORANGE)
    x3 = 72 + largeur(d, "va jusqu'en 3", NOIR(74))
    d.text((x3 + 2, y + 86), "e", font=NOIR(40), fill=ORANGE)
    d.text((x3 + 4 + largeur(d, "e", NOIR(40)), y + 86), ".", font=NOIR(74), fill=ORANGE)
    y += 220
    x = 72
    for n in ["Thalès", "Pythagore", "PGCD", "équations", "probabilités"]:
        x, _ = pilule(d, x, y, n, GRAS(28), (255, 228, 230), (159, 18, 57), pad_x=22, pad_y=12)
        x += 12
    tm = Image.open(TI_MARGO).convert("RGBA")
    tm = tm.resize((int(tm.width * 170 / tm.height), 170), Image.LANCZOS)
    im.paste(tm, (60, H_CAR - 60 - 170), tm)
    glisser(d, 1)
    return im.convert("RGB")


def carrousel_2():
    """La philosophie : la peur d'abord, puis les quatre temps."""
    im = fond(H_CAR).convert("RGBA")
    d = ImageDraw.Draw(im)
    d.text((72, 96), "Peur de l'épreuve de maths ?", font=NOIR(52), fill=ENCRE)
    d.text((72, 166), "C'est normal. Ma philosophie :", font=NOIR(44), fill=ORANGE)
    y = 270
    for i, (titre, detail) in enumerate(PHILOSOPHIE):
        dernier = i == len(PHILOSOPHIE) - 1
        haut = 178
        carte(im, (72, y, W - 72, y + haut), rayon=32,
              fond_c=(NAVY + (255,)) if dernier else (255, 255, 255, 240))
        d = ImageDraw.Draw(im)
        pastille(d, 104, y + 50, str(i + 1), 38, NOIR(40))
        d.text((206, y + 36), titre, font=NOIR(52), fill=AMBRE if dernier else ENCRE)
        d.text((206, y + 106), detail, font=GRAS(34), fill=(226, 232, 240) if dernier else GRIS)
        y += haut + 26
    signature(im, d, 72, H_CAR - 56)
    glisser(d, 2)
    return im.convert("RGB")


def carrousel_3():
    """Le pratique : la date, le lieu, le prix, le téléphone."""
    im = fond(H_CAR).convert("RGBA")
    d = ImageDraw.Draw(im)
    d.text((72, 96), "1re séance", font=NOIR(58), fill=ORANGE)
    y = titre_large(d, "SAMEDI 24 OCTOBRE", NAVY, 196, int(W * 0.9)) + 60
    carte(im, (72, y, W - 72, y + 430), rayon=36)
    d = ImageDraw.Draw(im)
    cx = 116
    d.text((cx, y + 40), "8 h – 12 h, le samedi matin", font=NOIR(46), fill=ENCRE)
    d.text((cx, y + 104), "Hôtel Terre-Sainte, Saint-Pierre", font=GRAS(38), fill=GRIS)
    d.text((cx, y + 180), "60 €", font=NOIR(110), fill=ORANGE)
    px = cx + largeur(d, "60 € ", NOIR(110))
    d.text((px, y + 196), "la matinée, café compris", font=GRAS(34), fill=GRIS)
    d.text((px, y + 244), "sans forfait : vous payez", font=GRAS(34), fill=GRIS)
    d.text((px, y + 288), "les samedis où vous venez", font=GRAS(34), fill=GRIS)
    d.text((cx, y + 362), "Groupe de 5 à 15 · 14 samedis jusqu'à fin mars", font=GRAS(30), fill=(13, 148, 136))
    y += 430 + 40
    carte(im, (72, y, W - 72, y + 300), rayon=36, fond_c=NAVY + (255,))
    d = ImageDraw.Draw(im)
    d.text((cx, y + 36), "Réservez votre place", font=NOIR(44), fill=BLANC)
    d.text((cx, y + 100), "06 92 74 29 58", font=NOIR(76), fill=AMBRE)
    d.text((cx, y + 210), "Test gratuit (15 min) : lien en bio", font=GRAS(32), fill=(203, 213, 225))
    tm = Image.open(TI_MARGO).convert("RGBA")
    tm = tm.resize((int(tm.width * 160 / tm.height), 160), Image.LANCZOS)
    im.paste(tm, (60, H_CAR - 60 - 160), tm)
    d.text((60 + tm.width + 24, H_CAR - 60 - 100), "eleveai.fr/formation-crpe", font=NOIR(38), fill=NAVY)
    glisser(d, 3)
    return im.convert("RGB")


if __name__ == "__main__":
    for i, f in enumerate([carrousel_1, carrousel_2, carrousel_3], start=1):
        nom = ["accroche", "philosophie", "pratique"][i - 1]
        chemin = SORTIE / f"carrousel-{i}-{nom}-1080x1350.png"
        f().save(chemin, optimize=True)
        print(chemin)
    for h, nom in [(1350, "post"), (1920, "story")]:
        im, fin_cta, debut_signature = composer(h)
        # garde-fou : la signature ne doit jamais chevaucher le bloc d'action
        assert fin_cta + 20 < debut_signature, (nom, fin_cta, debut_signature)
        chemin = SORTIE / f"{nom}-1080x{h}.png"
        im.save(chemin, optimize=True)
        print(chemin)
    # L image de partage en JPG : WhatsApp et Facebook lisent mal le webp en aperçu.
    chemin = RACINE / "public" / "images" / "formation-crpe-partage-1200x630.jpg"
    composer_partage().save(chemin, quality=88, optimize=True)
    print(chemin)
