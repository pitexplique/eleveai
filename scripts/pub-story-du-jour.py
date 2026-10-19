# LA STORY INSTAGRAM DU JOUR (19/10/2026), 1080x1920.
#
# Sa fille : « une story publiée par jour » — les élèves n'ont pas tous la même
# heure, et une story reste 24 h : chacun la voit quand il ouvre Instagram.
# ⛔ PAS LA TÊTE DE FRÉDÉRIC : c'est TI MARGO qui parle (conseil de sa fille).
#
# Le contenu est celui du Journal de l'accueil ce jour-là (même défi, même Une) :
# la story renvoie au site, le site confirme la story.
#   1-defi.jpg    le défi du jour, Ti Margo le pose ; on ajoute À LA MAIN le
#                 sticker « Quiz » d'Instagram (A, B, C) à droite de Ti Margo.
#   2-reponse.jpg la réponse du défi d'HIER + la Une du jour (« ce que tu vas
#                 apprendre ») → on revient le lendemain pour savoir.
#
# Usage : python scripts/pub-story-du-jour.py [décalage]   (0 = aujourd'hui, 1 = demain)
#   → pub/instagram/stories/AAAA-MM-JJ/{1-defi,2-reponse}.jpg + a-faire.txt

import json
import subprocess
import sys
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"

W, H = 1080, 1920
# Instagram couvre le haut (~220 px : barre, nom) et le bas (~260 px : réponse).
HAUT_SUR, BAS_SUR = 230, 1640
# 19/10, Frédéric : « quand je télécharge, il ne montre pas toute la photo ».
# Sur un téléphone plus allongé que 9:16, Instagram remplit la hauteur et rogne
# les CÔTÉS (jusqu'à ~135 px de chaque bord) : tout le contenu tient entre G et D.
G, D = 150, W - 150
NAVY = (4, 27, 51)
ENCRE = (15, 23, 42)
GRIS = (71, 85, 105)
ORANGE = (234, 88, 12)
AMBRE = (251, 191, 36)
VERT = (22, 163, 74)
BLANC = (255, 255, 255)
LETTRES = "ABC"
COULEURS = [(37, 99, 235), (219, 39, 119), (234, 88, 12)]


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


NOIR = lambda t: police("ariblk.ttf", t)  # noqa: E731
GRAS = lambda t: police("arialbd.ttf", t)  # noqa: E731


def donnees(decalage):
    sortie = subprocess.run(
        f"npx tsx scripts/story-du-jour-donnees.ts {decalage}",
        cwd=RACINE, shell=True, capture_output=True, text=True, encoding="utf-8", check=True,
    ).stdout
    return json.loads(sortie[sortie.index("{"):])


def fond():
    """Le dégradé chaud des pubs (ambre → rose → bleu ciel), avec trois halos."""
    haut, milieu, bas = (255, 247, 230), (255, 238, 240), (232, 244, 255)
    im = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(im)
    for y in range(H):
        t = y / (H - 1)
        a, b, u = (haut, milieu, t * 2) if t < 0.5 else (milieu, bas, (t - 0.5) * 2)
        d.line([(0, y), (W, y)], fill=tuple(int(a[i] + (b[i] - a[i]) * u) for i in range(3)))
    halos = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dh = ImageDraw.Draw(halos)
    dh.ellipse((-260, -200, 520, 560), fill=(253, 230, 138, 120))
    dh.ellipse((620, 700, 1400, 1460), fill=(254, 205, 211, 110))
    dh.ellipse((-200, 1440, 560, 2140), fill=(186, 230, 253, 120))
    halos = halos.filter(ImageFilter.GaussianBlur(110))
    im.paste(halos, (0, 0), halos)
    return im


def couper(d, texte, f, largeur_max):
    """Coupe le texte en lignes qui tiennent dans largeur_max."""
    # Un calcul ne se coupe pas au milieu : « 3 × 7 » reste sur une ligne.
    for signe in "×÷=":
        texte = texte.replace(f" {signe} ", f" {signe} ")
    lignes, ligne = [], ""
    for mot in texte.split(" "):
        essai = f"{ligne} {mot}".strip()
        if d.textlength(essai, font=f) <= largeur_max:
            ligne = essai
        else:
            lignes.append(ligne)
            ligne = mot
    return lignes + [ligne]


def paragraphe(d, x, y, texte, f, couleur, largeur_max, interligne=1.22):
    for ligne in couper(d, texte, f, largeur_max):
        d.text((x, y), ligne, font=f, fill=couleur)
        y += int(f.size * interligne)
    return y


def ti_margo(hauteur, miroir=False):
    tm = Image.open(TI_MARGO).convert("RGBA")
    tm = tm.crop(tm.getbbox())
    tm = tm.resize((int(tm.width * hauteur / tm.height), hauteur), Image.LANCZOS)
    return tm.transpose(Image.FLIP_LEFT_RIGHT) if miroir else tm


def bulle(im, boite, texte, f, pointe_vers):
    """Une bulle blanche arrondie dont la pointe va vers (x, y)."""
    d = ImageDraw.Draw(im)
    x0, y0, x1, y1 = boite
    ombre = Image.new("RGBA", im.size, (0, 0, 0, 0))
    ImageDraw.Draw(ombre).rounded_rectangle((x0 + 6, y0 + 10, x1 + 6, y1 + 10), radius=44, fill=(15, 23, 42, 40))
    ombre = ombre.filter(ImageFilter.GaussianBlur(14))
    im.paste(ombre, (0, 0), ombre)
    px, py = pointe_vers
    base = (x0 + x1) // 2 if px > x1 else x0 + 120
    d.polygon([(base - 34, y1 - 4), (base + 34, y1 - 4), (px, py)], fill=BLANC)
    d.rounded_rectangle(boite, radius=44, fill=BLANC)
    ty = y0 + 30
    for ligne in texte.split("\n"):
        d.text(((x0 + x1 - d.textlength(ligne, font=f)) / 2, ty), ligne, font=f, fill=ENCRE)
        ty += int(f.size * 1.2)


def entete(d, donnee):
    f = GRAS(34)
    texte = f"LE JOURNAL D'ELEVEAI  ·  N° {donnee['numero']}"
    d.text(((W - d.textlength(texte, font=f)) / 2, HAUT_SUR), texte, font=f, fill=ORANGE)
    f2 = GRAS(32)
    d.text(((W - d.textlength(donnee["date"], font=f2)) / 2, HAUT_SUR + 48), donnee["date"], font=f2, fill=GRIS)


def pied(d):
    f = NOIR(46)
    texte = "eleveai.fr"
    w = d.textlength(texte, font=f)
    x, y = (W - w) / 2 - 40, BAS_SUR + 120
    d.rounded_rectangle((x, y, x + w + 80, y + 86), radius=43, fill=AMBRE)
    d.text((x + 40, y + 14), texte, font=f, fill=NAVY)


def story_defi(donnee):
    im = fond().convert("RGBA")
    d = ImageDraw.Draw(im)
    entete(d, donnee)
    defi = donnee["defi"]

    # Ti Margo à gauche, sa bulle à droite.
    tm = ti_margo(420)
    im.paste(tm, (G, 370), tm)
    bulle(im, (G + 330, 390, D, 600), "Le défi\ndu jour !", NOIR(62), (G + 290, 560))
    d = ImageDraw.Draw(im)

    # La classe, puis la question en grand dans une carte blanche.
    y = 830
    fc = GRAS(36)
    etiquette = f"Niveau {defi['classe']}"
    wc = d.textlength(etiquette, font=fc)
    d.rounded_rectangle((G, y, G + wc + 52, y + 62), radius=31, fill=NAVY)
    d.text((G + 26, y + 11), etiquette, font=fc, fill=BLANC)
    y += 90
    fq = NOIR(44) if len(defi["question"]) < 90 else NOIR(38)
    hauteur_q = len(couper(d, defi["question"], fq, D - G - 80)) * int(fq.size * 1.22)
    d.rounded_rectangle((G, y, D, y + hauteur_q + 60), radius=36, fill=BLANC)
    y = paragraphe(d, G + 40, y + 30, defi["question"], fq, ENCRE, D - G - 80) + 60

    # Les trois choix, A B C.
    fl, fch = NOIR(42), GRAS(44)
    for i, choix in enumerate(defi["choix"]):
        d.rounded_rectangle((G, y, D, y + 96), radius=48, fill=BLANC, outline=COULEURS[i], width=5)
        d.ellipse((G + 14, y + 12, G + 86, y + 84), fill=COULEURS[i])
        d.text((G + 50 - d.textlength(LETTRES[i], font=fl) / 2, y + 20), LETTRES[i], font=fl, fill=BLANC)
        d.text((G + 112, y + 24), choix, font=fch, fill=ENCRE)
        y += 114

    fr = GRAS(38)
    texte = "La réponse demain, dans la story !"
    d.text(((W - d.textlength(texte, font=fr)) / 2, y + 16), texte, font=fr, fill=ORANGE)
    pied(d)
    return im.convert("RGB"), y


def vignette(url):
    try:
        requete = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})  # R2 refuse Python nu
        with urllib.request.urlopen(requete, timeout=20) as r:
            return Image.open(BytesIO(r.read())).convert("RGB")
    except Exception as e:  # pas de réseau : la story se fait sans l'image
        print(f"  (vignette absente : {e})")
        return None


def story_reponse(hier, donnee):
    im = fond().convert("RGBA")
    d = ImageDraw.Draw(im)
    entete(d, donnee)
    defi = hier["defi"]

    tm = ti_margo(300, miroir=True)
    im.paste(tm, (D - tm.width, 340), tm)
    bulle(im, (G, 360, G + 520, 540), "La réponse\nd'hier !", NOIR(56), (D - tm.width + 30, 480))
    d = ImageDraw.Draw(im)

    y = 690
    fq = GRAS(34)
    y = paragraphe(d, G, y, defi["question"], fq, GRIS, D - G) + 24
    bonne = defi["choix"][defi["bonne"]]
    d.rounded_rectangle((G, y, D, y + 104), radius=52, fill=VERT)
    texte = f"{LETTRES[defi['bonne']]}.  {bonne}"
    fb = NOIR(48)
    d.text(((W - d.textlength(texte, font=fb)) / 2, y + 22), texte, font=fb, fill=BLANC)
    y = paragraphe(d, G, y + 130, defi["explication"], GRAS(36), ENCRE, D - G) + 46

    # La Une du jour : ce que tu vas apprendre aujourd'hui.
    une = donnee["une"]
    d.text((G, y), "AUJOURD'HUI SUR ELEVEAI.FR", font=GRAS(32), fill=ORANGE)
    y += 50
    if une.get("utile"):
        y = paragraphe(d, G, y, une["utile"], GRAS(36), ENCRE, D - G) + 24
    v = vignette(une["vignette"]) if une.get("vignette") else None
    if v:
        lv = D - G
        hv = int(v.height * lv / v.width)
        if y + hv > BAS_SUR - 40:  # trop haute : on la réduit
            hv = BAS_SUR - 40 - y
            lv = int(v.width * hv / v.height)
        v = v.resize((lv, hv), Image.LANCZOS)
        masque = Image.new("L", v.size, 0)
        ImageDraw.Draw(masque).rounded_rectangle((0, 0, *v.size), radius=30, fill=255)
        im.paste(v, ((W - lv) // 2, y), masque)
        y += hv + 24
    pied(d)
    return im.convert("RGB")


if __name__ == "__main__":
    decalage = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    jour, hier = donnees(decalage), donnees(decalage - 1)
    dossier = RACINE / "pub" / "instagram" / "stories" / jour["iso"]
    dossier.mkdir(parents=True, exist_ok=True)
    defi_img, bas_defi = story_defi(jour)
    # JPG : le format qu'Instagram attend pour une story (en PNG jusqu'au 19/10).
    for vieux in dossier.glob("*.png"):
        vieux.unlink()
    defi_img.save(dossier / "1-defi.jpg", quality=92)
    story_reponse(hier, jour).save(dossier / "2-reponse.jpg", quality=92)
    d = jour["defi"]
    (dossier / "a-faire.txt").write_text(
        f"STORY DU {jour['date'].upper()}\n\n"
        "1. Publier 1-defi.jpg, puis ajouter le sticker « Quiz » avec juste A, B, C\n"
        "   (les choix sont déjà écrits sur l'image) ; le poser dans le vide à droite\n"
        "   de Ti Margo, sous sa bulle.\n"
        f"   Bonne réponse : {LETTRES[d['bonne']]}. {d['choix'][d['bonne']]}\n"
        "2. Publier 2-reponse.jpg (la réponse d'hier + la Une du jour).\n"
        "3. Option : sticker « Lien » vers eleveai.fr sur la 2.\n",
        encoding="utf-8-sig",
    )
    print(dossier)
    if bas_defi > BAS_SUR:
        print(f"  ⚠️ les choix descendent à {bas_defi} px : la barre d'Instagram peut les couvrir")
