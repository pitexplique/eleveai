# miniature_short_maths_reelles.py
# LA MINIATURE VERTICALE du short d'annonce « Maths réelles » (03/11/2026,
# CEINTURE BLANCHE) : l'étiquette du jean, 100 € → −30 % → +30 % → ? € (la réponse n'est pas dévoilée).
# Même machinerie que `miniature_short_loi_normale_ia.py` (fond, badge,
# signature, Ti-Margo de `miniature_short.py`), rangée À CÔTÉ DE LA VIDÉO,
# avec sa vignette .vignette.webp (270 px, comme scripts/vignettes-videos.py).
#
# Usage :  python manim/miniature_short_maths_reelles.py

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import NAVY, police
from miniature_short import ORANGE, W, construire
from miniature_short_expression import echelle
from miniature_short_signes import centre

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

ROUGE = (220, 38, 38)
VERT = (22, 163, 74)
DENIM = (59, 91, 146)
PAPIER = (254, 243, 199)


def etiquette(d, x, y, txt, couleur, barre=False):
    d.polygon([(x, y + 70), (x + 50, y), (x + 370, y), (x + 370, y + 140), (x + 50, y + 140)], fill=PAPIER,
              outline=ORANGE, width=6)
    d.ellipse([x + 32, y + 58, x + 56, y + 82], fill=(255, 255, 255), outline=ORANGE, width=4)
    f = police("ariblk.ttf", 72)
    l = d.textlength(txt, font=f)
    cx = x + 215
    d.text((cx - l / 2, y + 22), txt, font=f, fill=couleur)
    if barre:
        d.line([(cx - l / 2 - 10, y + 75), (cx + l / 2 + 10, y + 75)], fill=ROUGE, width=10)


def acc_jean(d):
    echelle(d, W // 2, 700, "blanche", s=0.6)
    # le jean
    x, y = 90, 860
    d.rectangle([x, y, x + 300, y + 50], fill=(37, 60, 102))
    d.polygon([(x, y + 50), (x + 300, y + 50), (x + 315, y + 400), (x + 180, y + 400), (x + 150, y + 180),
               (x + 120, y + 400), (x - 15, y + 400)], fill=DENIM)
    # les deux étiquettes : 100 € barré, puis « ? € »
    etiquette(d, 470, 860, "100 €", NAVY, barre=True)
    f = police("ariblk.ttf", 60)
    d.text((520, 1020), "−30 %  +30 %", font=f, fill=ORANGE)
    etiquette(d, 470, 1110, "? €", ORANGE)
    centre(d, W // 2, 1285, "VRAI OU FAUX ?", police("ariblk.ttf", 66), ROUGE)


SHORTS = {
    "eleveai-maths-actu-maths-reelles-short": {
        "badge": "MATHS RÉELLES",
        "titre": ["−30 % PUIS +30 %", "= 100 € ?"],
        "taille": 96,
        "sous": "le piège des soldes",
        "taille_sous": 52,
        "couleur_sous": ORANGE,
        "accroche": acc_jean,
        "dossier": "actu/maths/fr",
        "rangement": "actu/maths/shorts/fr/maths-reelles",
    },
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, spec in SHORTS.items():
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)
        source = RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png"
        cible = SORTIES / spec["rangement"] / f"{nom}.png"
        cible.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(source, cible)
        with Image.open(cible) as im:
            im = im.convert("RGB")
            im.thumbnail((270, 540), Image.LANCZOS)
            im.save(cible.with_name(cible.stem + ".vignette.webp"), "WEBP", quality=78, method=6)
        print(cible)


if __name__ == "__main__":
    main()
