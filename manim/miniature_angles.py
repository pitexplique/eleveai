# miniature_angles.py
# LES MINIATURES de la série ANGLES 6e (06/11/2026), 12 vidéos, 6 épisodes.
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures ;
#   · short : le piège en gros, 2 lignes de titre, échelle des ceintures blanche.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/6e/maths/angles/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_angles.py [filtre]

import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, W, police
from miniature_essai_v2 import construire as construire_paysage
from miniature_short import ORANGE, construire as construire_short
from miniature_short_expression import echelle

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
W_SHORT = 1080  # W est la largeur des paysages


def ajuste(d, txt, t, lmax):
    while t > 30 and d.textlength(txt, font=police("ariblk.ttf", t)) > lmax:
        t -= 2
    return t


def acc_paysage(haut, bas, vert=False, y0=352):
    def f(d):
        th = ajuste(d, haut, 92, 900)
        tb = ajuste(d, bas, 58, 900)
        d.text((56, y0), haut, font=police("ariblk.ttf", th), fill=BLEU)
        d.text((60, y0 + th + 26), bas, font=police("ariblk.ttf", tb), fill=VERT if vert else ROUGE)
        echelle(d, 690, 592, "verte", s=0.5)
    return f


def acc_short(lignes):
    def f(d):
        echelle(d, W_SHORT // 2, 1190, "blanche", s=0.8)
        for i, (txt, t, c) in enumerate(lignes):
            t = ajuste(d, txt, t, W_SHORT - 110)
            f_ = police("ariblk.ttf", t)
            d.text(((W_SHORT - d.textlength(txt, font=f_)) / 2, 700 + i * 205), txt, font=f_, fill=c)
    return f


# slug, dossier, titre paysage, haut, bas, le bas en vert ?, titre short, sous-titre short, lignes short
EP = [
    ("reconnaitre", "01-reconnaitre", ["COMPRENDRE", "CE QU'EST UN ANGLE"], "L'angle RST", "le sommet : S, au milieu !", False,
     ["DES ANGLES", "DANS L'ALPHABET"], "combien dans la lettre N ?",
     [("V : 1 angle", 120, BLEU), ("Z : 2 angles", 120, VERT)]),
    ("droit", "02-droit", ["COMPRENDRE", "L'ANGLE DROIT"], "90° pile", "pas 89°, même s'il est penché !", False,
     ["PAS D'ÉQUERRE ?", "DÉCHIRE UNE FEUILLE"], "plie-la deux fois",
     [("180° ÷ 2", 130, BLEU), ("= 90° pile", 130, VERT)]),
    ("comparer", "03-comparer", ["COMPARER", "DES ANGLES"], "120° > 70°", "même avec des côtés plus courts !", False,
     ["LA LOUPE", "GROSSIT TOUT ?"], "même les angles ?",
     [("30° × 3 = 90° ?", 120, ROUGE), ("non : toujours 30°", 100, VERT)]),
    ("mesurer", "04-mesurer", ["MESURER", "UN ANGLE"], "55° ou 125° ?", "pars du bon 0 sur le rapporteur !", False,
     ["UN RAPPORTEUR", "DANS L'HORLOGE"], "quel angle à 4 heures ?",
     [("1 h : 30°", 130, BLEU), ("2 h : 60°", 130, VERT)]),
    ("tracer", "05-tracer", ["TRACER", "UN ANGLE"], "4 gestes", "un côté d'abord, pas le rapporteur !", False,
     ["UN SEUL ANGLE", "POUR UN FLOCON"], "quel repère ensuite ?",
     [("60°, puis 120°", 120, BLEU), ("6 branches !", 130, VERT)]),
    ("defi", "06-defi", ["TROUVER UN ANGLE", "SANS RAPPORTEUR"], "180 − 110 = 70°", "+ 3 règles à connaître", True,
     ["L'ANGLE ENTRE", "LES PALES"], "quel angle sur une éolienne ?",
     [("360 ÷ 3", 150, BLEU), ("= 120°", 150, VERT)]),
]


def minutes(mp4):
    d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                       "-of", "csv=p=0", str(mp4)]))
    return round(d / 60)


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for slug, rep, tit, haut, bas, vert, ts, sous, ls in EP:
        rel = f"6e/maths/angles/{rep}"
        nom = f"eleveai-maths-6e-angle-{slug}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": "MATHS · 6E", "duree": f"EN {minutes(SORTIES / rel / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, vert), "dossier": rel,
            })
        nom += "-short"
        if filtre not in nom:
            continue
        t = 96
        while any(sonde.textlength(x, font=police("ariblk.ttf", t)) > W_SHORT - 90 for x in ts):
            t -= 2
        spec = {"badge": "ANGLES · 6E", "titre": ts, "taille": t, "sous": sous, "taille_sous": 44,
                "couleur_sous": ORANGE, "accroche": acc_short(ls), "dossier": "6e/maths/fr"}
        construire_short(nom, spec)
        shutil.copy(RACINE / "manim" / "miniatures" / "6e" / "maths" / "fr" / f"{nom}.png", SORTIES / rel / f"{nom}.png")


if __name__ == "__main__":
    main()
