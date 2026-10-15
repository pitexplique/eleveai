# miniature_short_trigo.py
# LA MINIATURE VERTICALE du short « valeurs remarquables » (trigonométrie 1re
# spé, 27/09/2026). Même machinerie que `miniature_short.py` (fond, badge,
# signature), sans toucher à ce fichier, comme `miniature_short_reels.py`.
#
# ⭐ Le badge nomme la notion, le titre porte la promesse, l'accroche MONTRE la
# ligne √0/2 … √4/2 et ce qu'elle devient.
# ⭐ Rangée À CÔTÉ DE SA VIDÉO (Frédéric, 27/09 : « range les shorts et
# miniature ensemble ») : manim/sorties/premiere/maths/shorts/fr/trigonometrie/.
#
# Usage :  python manim/miniature_short_trigo.py

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import ORANGE, W, construire

RACINE = Path(__file__).resolve().parents[1]
DOSSIER_VIDEO = RACINE / "manim" / "sorties" / "premiere" / "maths" / "shorts" / "fr" / "trigonometrie"

# ⚠️ Arial Black n'a pas de « √ » : les fractions de cette vignette sont en Arial gras.
COLS = [140, 340, 540, 740, 940]


def frac_txt(d, cx, y, num, den, taille, coul):
    f = police("arialbd.ttf", taille)
    ln, ld = d.textlength(num, font=f), d.textlength(den, font=f)
    larg = max(ln, ld) + 20
    d.text((cx - ln / 2, y), num, font=f, fill=coul)
    yb = y + taille * 1.15
    d.line([(cx - larg / 2, yb), (cx + larg / 2, yb)], fill=coul, width=7)
    d.text((cx - ld / 2, yb + taille * 0.12), den, font=f, fill=coul)


def nombre(d, cx, y, txt, taille, coul):
    f = police("arialbd.ttf", taille)
    d.text((cx - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=coul)


def acc_valeurs(d):
    # La ligne magique : √0/2 … √4/2.
    for k, cx in enumerate(COLS):
        frac_txt(d, cx, 700, f"√{k}", "2", 76, ORANGE)
    # La flèche qui descend.
    d.line([(W // 2, 930), (W // 2, 1030)], fill=NAVY, width=14)
    d.polygon([(W // 2 - 36, 1020), (W // 2 + 36, 1020), (W // 2, 1072)], fill=NAVY)
    # Ce qu'elle devient : les sinus.
    sinus = [None, ("1", "2"), ("√2", "2"), ("√3", "2"), None]
    entiers = ["0", None, None, None, "1"]
    for i, cx in enumerate(COLS):
        if sinus[i]:
            frac_txt(d, cx, 1110, sinus[i][0], sinus[i][1], 76, VERT)
        else:
            nombre(d, cx, 1160, entiers[i], 96, VERT)


def fleche(d, x0, y0, x1, y1, coul, ep=14, pointe=46):
    """Une flèche épaisse de (x0, y0) à (x1, y1), pointe pleine."""
    import math
    a = math.atan2(y1 - y0, x1 - x0)
    xb, yb = x1 - pointe * math.cos(a), y1 - pointe * math.sin(a)
    d.line([(x0, y0), (xb, yb)], fill=coul, width=ep)
    n = pointe * 0.6
    d.polygon([(x1, y1), (xb + n * math.sin(a), yb - n * math.cos(a)), (xb - n * math.sin(a), yb + n * math.cos(a))], fill=coul)


def acc_vent(d):
    """LE SENS DU VENT (Frédéric, 28/09 : « refais la miniature du short avec le
    sens du vent »). Le cercle à sa convention (axe ROUGE = cos, VERT = sin),
    « TOI » qui avance vers la droite, et deux vents : celui qui t'aide (π/6,
    cos > 0) et celui qui te freine (2π/3, cos < 0)."""
    import math
    cx, cy, r = 540, 1060, 330
    GRIS = (150, 165, 185)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=BLEU, width=8)
    fleche(d, cx - r - 40, cy, cx + r + 70, cy, ROUGE, ep=9, pointe=34)      # axe des cosinus
    fleche(d, cx, cy + r + 40, cx, cy - r - 60, VERT, ep=9, pointe=34)       # axe des sinus
    fleche(d, cx, cy, cx + 230, cy, NAVY, ep=20, pointe=54)                  # toi
    nombre(d, cx + 125, cy + 28, "TOI", 50, NAVY)
    # le vent qui AIDE, à π/6
    a = math.pi / 6
    fleche(d, cx, cy, cx + 0.93 * r * math.cos(a), cy - 0.93 * r * math.sin(a), BLEU, ep=16, pointe=52)
    # ⛔ à cy − 270, « cos > 0 » touchait le cercle : on remonte.
    nombre(d, cx + 330, cy - 400, "il t'aide", 46, BLEU)
    nombre(d, cx + 330, cy - 340, "cos > 0", 58, ROUGE)
    # le vent qui FREINE, à 2π/3
    a = 2 * math.pi / 3
    fleche(d, cx, cy, cx + 0.93 * r * math.cos(a), cy - 0.93 * r * math.sin(a), GRIS, ep=16, pointe=52)
    nombre(d, cx - 330, cy - 390, "il te freine", 46, GRIS)
    nombre(d, cx - 330, cy - 330, "cos < 0", 58, GRIS)


SHORTS = {
    "eleveai-maths-premiere-trigonometrie-short-valeurs": {
        "badge": "TRIGONOMÉTRIE",
        "titre": ["10 VALEURS ?", "UNE LIGNE SUFFIT"],
        "taille": 84,
        "sous": "sinus et cosinus de 0 à π/2",
        "taille_sous": 48,
        "couleur_sous": ORANGE,
        "accroche": acc_valeurs,
        "dossier": "premiere/maths/fr",
    },
    "eleveai-maths-premiere-trigonometrie-short-vent": {
        "badge": "LE COSINUS",
        "titre": ["POSITIF OU NÉGATIF ?", "DEMANDE AU VENT"],
        "taille": 72,  # ⛔ à 80, « POSITIF OU NÉGATIF ? » débordait (1016 px)
        "sous": "le cosinus, c'est le vent qui te pousse",
        "taille_sous": 46,
        "couleur_sous": ORANGE,
        "accroche": acc_vent,
        "dossier": "premiere/maths/fr",
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
        DOSSIER_VIDEO.mkdir(parents=True, exist_ok=True)
        shutil.copy(source, DOSSIER_VIDEO / f"{nom}.png")
        print(DOSSIER_VIDEO / f"{nom}.png")


if __name__ == "__main__":
    main()
