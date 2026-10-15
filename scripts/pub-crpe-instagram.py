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

    # ── Les notions de collège qui tombent
    x = marge
    for n in ["Thalès", "Pythagore", "PGCD", "équations", "probabilités"]:
        f = GRAS(k(30))
        if x + largeur(d, n, f) + 52 > W - marge:
            x = marge
            y += k(70)
        x, _ = pilule(d, x, y, n, f, (255, 228, 230), (159, 18, 57), pad_x=24, pad_y=12)
        x += 14
    y += k(100) if story else k(78)

    # ── La carte de l'offre
    haut_carte = k(300)
    carte(im, (marge, y, W - marge, y + haut_carte))
    d = ImageDraw.Draw(im)
    cx = marge + 44
    d.text((cx, y + k(36)), "Le samedi matin, 8 h – 12 h", font=NOIR(k(48)), fill=ENCRE)
    d.text((cx, y + k(104)), "Hôtel Terre-Sainte, Saint-Pierre", font=GRAS(k(36)), fill=GRIS)
    d.text((cx, y + k(170)), "60 €", font=NOIR(k(84)), fill=ORANGE)
    px = cx + largeur(d, "60 € ", NOIR(k(84)))
    d.text((px, y + k(182)), "la matinée, sans forfait", font=GRAS(k(34)), fill=GRIS)
    d.text((px, y + k(228)), "1re séance : samedi 24 octobre", font=GRAS(k(30)), fill=GRIS)
    y += haut_carte + (56 if story else 40)

    # ── L'action : le seul bloc sombre
    # ⭐ 15/10 : le TÉLÉPHONE y entre (« il manque le numéro de téléphone »).
    # C'est un appel qui a lancé cette pub : on donne le numéro, pas seulement
    # le lien, et en blanc sur le bloc sombre, là où l'œil finit.
    haut_cta = k(282)
    carte(im, (marge, y, W - marge, y + haut_cta), fond_c=NAVY + (255,))
    d = ImageDraw.Draw(im)
    d.text((cx, y + k(34)), "Test gratuit : où en êtes-vous ?", font=NOIR(k(44)), fill=BLANC)
    pilule(d, cx, y + k(104), "eleveai.fr/formation-crpe", NOIR(k(38)), AMBRE, NAVY, pad_x=28, pad_y=14)
    d.text((cx, y + k(194)), "Tél. 06 92 74 29 58", font=NOIR(k(48)), fill=AMBRE)
    y += haut_cta

    # ── La signature : un visage, et Ti Margo
    bas = h - (260 if story else 48)
    av = avatar_rond(k(132))
    im.paste(av, (marge, bas - av.height), av)
    tx = marge + av.width + 26
    d.text((tx, bas - k(112)), "Frédéric Lacoste", font=NOIR(k(38)), fill=ENCRE)
    d.text((tx, bas - k(62)), "prof de maths au collège, à La Réunion", font=GRAS(k(30)), fill=GRIS)
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
    d.text((marge + av.width + 18, LH - 40 - 78), "Frédéric Lacoste", font=NOIR(28), fill=ENCRE)
    d.text((marge + av.width + 18, LH - 40 - 40), "prof de maths au collège", font=GRAS(24), fill=GRIS)

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
    d.text((cx, 356), "Test gratuit", font=NOIR(32), fill=BLANC)
    d.text((cx, 400), "15 min pour savoir", font=GRAS(24), fill=(203, 213, 225))
    d.text((cx, 430), "où vous en êtes", font=GRAS(24), fill=(203, 213, 225))
    d.text((cx, 490), "06 92 74 29 58", font=NOIR(34), fill=AMBRE)
    return im.convert("RGB")


if __name__ == "__main__":
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
