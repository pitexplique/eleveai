# Photos de profil Instagram (16/10/2026) — 1080x1080, affichées en rond à ~110 px.
# ⛔ Aucun texte : illisible à cette taille. Deux propositions :
#   A — le visage de Frédéric, anneau ambre (la photo source fait 240 px :
#       suffisante à 110-320 px d'affichage, un peu douce si on l'agrandit) ;
#   B — Ti Margo sur le dégradé des pubs (source nette, 1122 px).
# Usage : python scripts/pub-photo-profil.py → pub/instagram/profil/

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

RACINE = Path(__file__).resolve().parents[1]
SORTIE = RACINE / "pub" / "instagram" / "profil"
SORTIE.mkdir(parents=True, exist_ok=True)
T = 1080


def degrade():
    im = Image.new("RGB", (T, T))
    px = im.load()
    a, b = (255, 237, 213), (224, 242, 254)  # ambre pâle → bleu ciel
    for y in range(T):
        t = y / (T - 1)
        c = tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
        for x in range(T):
            px[x, y] = c
    return im


def visage():
    im = Image.new("RGB", (T, T), (251, 191, 36))  # l'anneau ambre = le fond
    src = Image.open(RACINE / "public" / "images" / "avatar-frederic-visage.webp").convert("RGB")
    d = 940
    src = src.resize((d, d), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=2, percent=60))
    masque = Image.new("L", (d, d), 0)
    ImageDraw.Draw(masque).ellipse((0, 0, d, d), fill=255)
    im.paste(src, ((T - d) // 2, (T - d) // 2), masque)
    return im


def ti_margo():
    im = degrade().convert("RGBA")
    tm = Image.open(RACINE / "public" / "cahier-vacances" / "ti-margo.png").convert("RGBA")
    tm = tm.crop(tm.getbbox())  # l'image a des marges transparentes : on les rogne
    # 19/10 : à 760 px, Frédéric : « elle est trop haute » au téléchargement —
    # Instagram recadre plus serré que le rond inscrit. 600 px laisse de la marge
    # tout autour (crayon, pieds, queue compris).
    h = 600
    tm = tm.resize((int(tm.width * h / tm.height), h), Image.LANCZOS)
    im.paste(tm, ((T - tm.width) // 2, (T - h) // 2), tm)
    return im.convert("RGB")


if __name__ == "__main__":
    for nom, f in [("A-visage", visage), ("B-ti-margo", ti_margo)]:
        chemin = SORTIE / f"profil-{nom}-1080.png"
        f().save(chemin, optimize=True)
        print(chemin)
