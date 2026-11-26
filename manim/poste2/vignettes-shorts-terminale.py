# Vignettes des shorts de terminale (espace + produit scalaire), limitees a NOS fichiers.
#
# POURQUOI PAS LA RECETTE DU DEPOT TELLE QUELLE (26/11/2026) :
# scripts/vignettes-videos.py prend l'image a 1 s. Sur ces shorts, 1 s tombe en pleine
# ECRITURE de l'accroche : la phrase est coupee au milieu et les deux tiers de l'image sont
# vides. Ce n'est pas une vignette noire -- le controle de luminance ne le voit pas (ces
# shorts ont un fond sombre : 5 a 22 de moyenne, comme les shorts de 4e deja en ligne).
#
# CE QU'ON PREND A LA PLACE : l'instant le plus ENCRE de la fenetre [2 s ; 10 s], c'est-a-dire
# l'ecran « idee » une fois ecrit en entier, juste avant l'ecran question. La fenetre s'arrete
# a 10 s expres : apres, l'ecran question est plus rempli et donnerait la reponse en vignette.
# L'image reste PRISE DANS LA VIDEO, jamais redessinee (regle du depot).
# Le choix se controle a l'oeil sur la planche contact : --planche.
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageStat

RACINE = Path(__file__).resolve().parent.parent.parent
SORTIES = RACINE / "manim" / "sorties" / "terminale" / "maths" / "geometrie"
GEOMETRIE = ["espace-vecteurs", "espace-repere-coordonnees", "espace-droite-parametrique",
             "espace-plan-equation", "espace-position-relative", "espace-defi"]
PRODUIT_SCALAIRE = ["ps-espace-norme-distance", "ps-espace-orthogonalite", "ps-espace-plan-normal",
                    "ps-espace-angle", "ps-espace-calculer", "ps-espace-defi"]
FENETRE = [round(2 + 0.5 * i, 1) for i in range(17)]  # 2,0 s -> 10,0 s
SEUIL_ENCRE = 40  # luminance a partir de laquelle un pixel compte comme « ecrit »


def encre(im: Image.Image) -> int:
    return sum(1 for p in im.convert("L").getdata() if p > SEUIL_ENCRE)


def une(mp4: Path, tmp: Path):
    """Rend la vignette et l'instant retenu, ou None si le mp4 manque."""
    meilleur, score = None, -1
    for s in FENETRE:
        c = tmp / "c.png"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(s), "-i", str(mp4),
                        "-frames:v", "1", str(c)], check=True)
        with Image.open(c) as im:
            petite = im.convert("RGB")
            petite.thumbnail((270, 540), Image.LANCZOS)
            n = encre(petite)
            if n > score:
                meilleur, score, garde = s, n, petite.copy()
    cible = mp4.with_name(mp4.stem + ".vignette.webp")
    garde.save(cible, "WEBP", quality=78, method=6)
    return meilleur, score, cible, garde


lot = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "tout"
micros = {"geometrie": GEOMETRIE, "ps": PRODUIT_SCALAIRE}.get(lot, GEOMETRIE + PRODUIT_SCALAIRE)
images, absents = [], []
with tempfile.TemporaryDirectory() as t:
    tmp = Path(t)
    for m in micros:
        mp4 = SORTIES / m / f"eleveai-maths-terminale-{m}-short.mp4"
        if not mp4.exists():
            absents.append(m)
            continue
        s, n, cible, im = une(mp4, tmp)
        lum = ImageStat.Stat(im.convert("L")).mean[0]
        images.append((m, s, n, lum, cible, im))
        print(f"  {m:30s} instant {s:4.1f} s  encre {n:6d} px  luminance {lum:5.1f}  "
              f"{cible.stat().st_size} octets")

print(f"\n{len(images)} vignettes ecrites, {len(absents)} shorts absents")
if absents:
    print("  ABSENTS : " + ", ".join(absents))

if images:  # planche contact : le choix se REGARDE, il ne se mesure pas
    L, H, M = 270, 480, 8
    planche = Image.new("RGB", (L * len(images) + M * (len(images) + 1), H + M * 2 + 20), (40, 40, 46))
    d = ImageDraw.Draw(planche)
    for i, (m, s, n, lum, cible, im) in enumerate(images):
        planche.paste(im, (M + i * (L + M), M))
        d.text((M + i * (L + M) + 4, H + M + 3), f"{m}  {s} s", fill=(240, 240, 120))
    out = RACINE / "manim" / "poste2" / f"planche-vignettes-shorts-{lot}.png"
    planche.save(out)
    print("  planche : " + out.as_posix())
