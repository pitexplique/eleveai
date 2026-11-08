"""La carte cadeau imprimable d'un code d'abonnement (contrepartie Ulule « à offrir », 08/11/2026).

    python scripts/carte-cadeau-code.py --code MARGO-7KQ4-X2PD --duree 6
    python scripts/carte-cadeau-code.py --code MARGO-7KQ4-X2PD --duree 12 --de "Papi et Mamie"
    python scripts/carte-cadeau-code.py --csv docs/codes-ulule/<lot>.csv     # une carte par code + un PDF

Format A6 paysage (148 x 105 mm) à 300 ppp : 1748 x 1240 px, à imprimer sans mise à l'échelle.
Sortie dans docs/codes-ulule/cartes/ (ignoré par git : chaque carte porte un code valable).
Le PDF d'un lot met une carte par page, prêt pour l'imprimeur ou l'envoi en pièce jointe.
"""
import argparse
import csv
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parent.parent
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
SORTIE = RACINE / "docs" / "codes-ulule" / "cartes"
POLICES = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"

L, H = 1748, 1240
VERT_FONCE = (6, 95, 70)  # emerald-800
VERT = (16, 150, 105)
VERT_CLAIR = (209, 250, 229)
CREME = (255, 253, 245)
ENCRE = (15, 23, 42)
GRIS = (71, 85, 105)
JAUNE = (250, 204, 21)


def police(nom: str, taille: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(POLICES / nom), taille)


def duree_offerte(mois: int) -> str:
    if mois == 12:
        return "1 an offert"
    return f"{mois} mois offert" + ("s" if mois > 1 else "")


def centre(d: ImageDraw.ImageDraw, x0: int, x1: int, y: int, texte: str, f, couleur) -> None:
    larg = d.textlength(texte, font=f)
    d.text((x0 + (x1 - x0 - larg) / 2, y), texte, font=f, fill=couleur)


def carte(code: str, mois: int, de: str = "") -> Image.Image:
    im = Image.new("RGB", (L, H), CREME)
    d = ImageDraw.Draw(im)

    # Bandeau vert à gauche, Ti Margo debout dessus.
    bande = 640
    d.rectangle([0, 0, bande, H], fill=VERT_CLAIR)
    for i, (cx, cy, r) in enumerate([(80, 90, 40), (575, 70, 26), (590, 1060, 34), (60, 1150, 24), (612, 560, 14)]):
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=JAUNE if i % 2 == 0 else (167, 243, 208))
    margo = Image.open(TI_MARGO).convert("RGBA")
    margo = margo.crop(margo.split()[3].getbbox())
    h_margo = 830
    margo = margo.resize((round(margo.width * h_margo / margo.height), h_margo), Image.LANCZOS)
    im.paste(margo, ((bande - margo.width) // 2, 150), margo)
    centre(d, 0, bande, 1020, "Ti Margo", police("segoeuib.ttf", 50), VERT_FONCE)

    # Le texte à droite.
    x0, x1 = bande + 80, L - 80
    d.text((x0, 95), "Un cadeau pour apprendre", font=police("segoeuib.ttf", 54), fill=GRIS)
    # La durée prend la place qu'il y a, sans toucher le bord.
    taille = 150
    while d.textlength(duree_offerte(mois), font=police("segoeuib.ttf", taille)) > x1 - x0:
        taille -= 4
    d.text((x0, 165 + (150 - taille) // 2), duree_offerte(mois), font=police("segoeuib.ttf", taille), fill=VERT_FONCE)
    d.text((x0, 360), "du suivi famille EleveAI", font=police("segoeuib.ttf", 58), fill=ENCRE)
    f_corps = police("segoeui.ttf", 38)
    d.text((x0, 450), "Des vidéos, et un coach de maths qui suit", font=f_corps, fill=GRIS)
    d.text((x0, 500), "chaque progrès de votre enfant.", font=f_corps, fill=GRIS)

    # « De la part de » : imprimé, ou une ligne à remplir à la main.
    f_de = police("segoeui.ttf", 40)
    d.text((x0, 600), "De la part de :", font=f_de, fill=GRIS)
    xl = x0 + d.textlength("De la part de : ", font=f_de)
    if de:
        d.text((xl, 594), de, font=police("segoeuib.ttf", 46), fill=ENCRE)
    else:
        d.line([xl, 648, x1, 648], fill=(148, 163, 184), width=3)

    # Le code, dans un cadre : police à chasse fixe, rien à confondre.
    yc = 730
    d.rounded_rectangle([x0, yc, x1, yc + 230], radius=36, fill="white", outline=VERT, width=6)
    centre(d, x0, x1, yc + 22, "VOTRE CODE", police("segoeuib.ttf", 34), VERT)
    centre(d, x0, x1, yc + 78, code, police("consolab.ttf", 104), ENCRE)

    # Où l'activer.
    d.text((x0, 1010), "Activez-le sur", font=police("segoeui.ttf", 44), fill=GRIS)
    d.text((x0, 1064), "eleveai.fr/code", font=police("segoeuib.ttf", 84), fill=VERT_FONCE)
    return im


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--code")
    p.add_argument("--duree", type=int, choices=[1, 2, 6, 12])
    p.add_argument("--de", default="", help="« De la part de » imprimé (sinon une ligne à remplir)")
    p.add_argument("--csv", help="le CSV d'un lot de scripts/codes-ulule.mjs")
    p.add_argument("--sortie", default=str(SORTIE))
    a = p.parse_args()

    sortie = Path(a.sortie)
    sortie.mkdir(parents=True, exist_ok=True)
    if a.csv:
        with open(a.csv, encoding="utf-8-sig", newline="") as f:
            lignes = [l for l in csv.DictReader(f) if l["type"] != "classe"]
        if not lignes:
            sys.exit("Aucun code famille ou cadeau dans ce CSV.")
        cartes = []
        for l in lignes:
            im = carte(l["code"], int(l["duree_mois"]), a.de)
            im.save(sortie / f"carte-{l['code']}.png", dpi=(300, 300))
            cartes.append(im)
        pdf = sortie / f"cartes-{Path(a.csv).stem}.pdf"
        cartes[0].save(pdf, save_all=True, append_images=cartes[1:], resolution=300)
        print(f"{len(cartes)} cartes : {sortie}\n  {pdf}")
        return
    if not (a.code and a.duree):
        p.error("--code et --duree, ou --csv")
    png = sortie / f"carte-{a.code}.png"
    im = carte(a.code, a.duree, a.de)
    im.save(png, dpi=(300, 300))
    im.save(png.with_suffix(".pdf"), resolution=300)
    print(png)


if __name__ == "__main__":
    main()
