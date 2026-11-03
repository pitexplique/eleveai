# miniature_short_loi_normale_ia.py
# LES MINIATURES VERTICALES de deux shorts du 01/11/2026 :
# - « L'escalier et la cloche » (Tle, CEINTURE NOIRE) : la binomiale en marches
#   et la cloche de la loi normale par-dessus ;
# - « L'IA est meilleure que nous en maths, à quoi ça sert ? » (actu, BLANCHE).
# Même machinerie que `miniature_short_pythagore.py` (fond, badge, signature,
# Ti-Margo de `miniature_short.py`), rangées À CÔTÉ DE LEUR VIDÉO : la
# publication automatique refuse un short sans miniature (01/11).
#
# Usage :  python manim/miniature_short_loi_normale_ia.py [filtre]

import math
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

BLEU = (37, 99, 175)
VERT = (22, 163, 74)
OR = (234, 179, 8)


def acc_escalier(d):
    """Les marches de B(16 ; 1/2) centrée réduite, la cloche orange par-dessus."""
    echelle(d, W // 2, 700, "noire", s=0.6)
    n, x0, x1, base = 16, 90, 990, 1300
    pas_px = (x1 - x0) / (n + 1)
    echelle_y = 1100  # pixels par unité de densité (la cloche sous les ceintures)
    for k in range(n + 1):
        p = math.comb(n, k) / 2 ** n
        h = p / (2 / math.sqrt(n)) * echelle_y
        xa = x0 + k * pas_px
        d.rectangle([xa, base - h, xa + pas_px, base], fill=(147, 197, 253), outline=BLEU, width=3)
    # la cloche : 1/√(2π) e^(−x²/2), sur la même échelle
    pts = []
    for i in range(201):
        x = -4.2 + 8.4 * i / 200
        y = math.exp(-x * x / 2) / math.sqrt(2 * math.pi)
        px = (x0 + x1) / 2 + x * pas_px * math.sqrt(n) / 2
        pts.append((px, base - y * echelle_y))
    d.line(pts, fill=ORANGE, width=12, joint="curve")
    d.line([(60, base), (W - 60, base)], fill=NAVY, width=6)
    centre(d, W // 2, base + 18, "l'escalier devient une cloche", police("ariblk.ttf", 46), ORANGE)


def acc_ia(d):
    """La puce « IA » avec sa médaille d'or, et l'élève qui s'en sert."""
    echelle(d, W // 2, 700, "blanche", s=0.6)
    # la puce
    cx, cy, a = 300, 1030, 250
    for i in range(5):
        o = -a / 2 + 25 + i * (a - 50) / 4
        d.line([(cx + o, cy - a / 2 - 40), (cx + o, cy + a / 2 + 40)], fill=(120, 130, 145), width=10)
        d.line([(cx - a / 2 - 40, cy + o), (cx + a / 2 + 40, cy + o)], fill=(120, 130, 145), width=10)
    d.rounded_rectangle([cx - a / 2, cy - a / 2, cx + a / 2, cy + a / 2], radius=28, fill=NAVY)
    centre(d, cx, cy - 62, "IA", police("ariblk.ttf", 110), (255, 255, 255))
    # la médaille d'or
    mx, my, r = 300, 1290, 62
    d.polygon([(mx - 50, my - 140), (mx - 10, my - 60), (mx + 10, my - 60), (mx + 50, my - 140)], fill=(220, 38, 38))
    d.ellipse([mx - r, my - r, mx + r, my + r], fill=OR, outline=NAVY, width=5)
    centre(d, mx, my - 30, "1", police("ariblk.ttf", 52), NAVY)
    # la flèche vers ce que TOI tu en fais
    f = police("ariblk.ttf", 58)
    d.text((560, 880), "et toi,", font=f, fill=NAVY)
    d.text((560, 960), "tu en fais", font=f, fill=NAVY)
    d.text((560, 1040), "quoi ?", font=f, fill=ORANGE)
    g = police("ariblk.ttf", 50)
    d.text((560, 1170), "l'IA est", font=g, fill=VERT)
    d.text((560, 1235), "un outil", font=g, fill=VERT)


SHORTS = {
    "eleveai-maths-terminale-loi-normale-escalier-short": {
        "badge": "LOI NORMALE · TLE",
        "titre": ["300 RANGÉES", "DE CLOUS ?"],
        "taille": 104,
        "sous": "l'escalier va dessiner quoi ?",
        "taille_sous": 52,
        "couleur_sous": ORANGE,
        "accroche": acc_escalier,
        "dossier": "terminale/maths/fr",
        "rangement": "terminale/maths/probabilites/loi-normale-escalier",
    },
    "eleveai-maths-actu-ia-maths-short": {
        "badge": "MATHS · ACTU",
        "titre": ["L'IA, MÉDAILLE", "D'OR EN MATHS"],
        "taille": 92,
        "sous": "alors, à quoi ça sert d'apprendre ?",
        "taille_sous": 48,
        "couleur_sous": ORANGE,
        "accroche": acc_ia,
        "dossier": "actu/maths/fr",
        "rangement": "actu/maths/shorts/fr/ia-maths",
    },
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, spec in SHORTS.items():
        if filtre not in nom:
            continue
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)
        source = RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png"
        cible = SORTIES / spec["rangement"] / f"{nom}.png"
        shutil.copy(source, cible)
        print(cible)


if __name__ == "__main__":
    main()
