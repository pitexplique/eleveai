# miniature_short_reels.py
# LES DEUX MINIATURES VERTICALES des shorts « nombres réels » du 21/09/2026 :
# « 0,999… = 1 » et « −x est parfois positif ».
#
# ⛔ FICHIER À PART, exprès. Leur place naturelle est le dictionnaire `SHORTS` de
# `miniature_short.py` — mais ce fichier-là était en cours de modification par
# une autre session le même jour. Ici on EMPRUNTE sa machinerie (`construire`,
# `centre`, `frac`, les couleurs) sans y toucher : même fond, même badge, même
# signature, donc la série reste reconnaissable dans la grille.
# 👉 À reverser dans `SHORTS` quand le fichier sera au repos (deux entrées et
# deux fonctions `acc_*`, rien d'autre).
#
# ⭐ La répartition validée le 17/09 : le BADGE nomme la notion (le mot qu'un
# élève cherche), le TITRE porte le paradoxe, le sous-titre le désamorce.
# ⛔ Aucune étiquette de classe : ces deux égalités parlent du collège à l'adulte.
#
# Usage :  python manim/miniature_short_reels.py
# Sortie : manim/miniatures/seconde/maths/fr/<nom>.png

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import W, centre, construire, frac

ORANGE = (234, 110, 20)


def ligne(d, y, morceaux, ecart=26):
    """Pose côte à côte des morceaux (texte, police, couleur) et CENTRE le tout.
    Rend les abscisses de départ : on mesure, on ne devine pas."""
    largeurs = [d.textlength(t, font=f) for t, f, _ in morceaux]
    total = sum(largeurs) + ecart * (len(morceaux) - 1)
    x = (W - total) / 2
    departs = []
    for (t, f, c), l in zip(morceaux, largeurs):
        d.text((x, y), t, font=f, fill=c)
        departs.append(x)
        x += l + ecart
    return departs, total


def acc_0999(d):
    # 1/3 = 0,333…  — la fraction est dessinée, le reste est posé à sa droite.
    f1 = police("ariblk.ttf", 118)
    reste = "= 0,333…"
    l_reste = d.textlength(reste, font=f1)
    l_frac = 110
    total = l_frac + 30 + l_reste
    x0 = (W - total) / 2
    frac(d, x0 + l_frac / 2, 630, 1, 3, 104, BLEU)
    d.text((x0 + l_frac + 30, 690), reste, font=f1, fill=BLEU)

    # × 3, et sa flèche
    centre(d, W // 2 + 70, 950, "× 3", police("ariblk.ttf", 72), NAVY)
    xa = W // 2 - 60
    d.line([(xa, 945), (xa, 1040)], fill=NAVY, width=14)
    d.polygon([(xa - 34, 1030), (xa + 34, 1030), (xa, 1080)], fill=NAVY)

    centre(d, W // 2, 1110, "1 = 0,999…", police("ariblk.ttf", 150), VERT)


def acc_moinsx(d):
    centre(d, W // 2, 640, "x = −3", police("ariblk.ttf", 104), NAVY)
    centre(d, W // 2, 780, "−x = 3", police("ariblk.ttf", 170), VERT)

    # La droite : −3 et 3, de part et d'autre du zéro, et le saut par-dessus.
    y, xg, xd = 1225, 150, 930
    pas = (xd - xg) / 8  # de −4 à 4
    d.line([(xg, y), (xd, y)], fill=NAVY, width=8)
    for k in range(9):
        x = xg + k * pas
        d.line([(x, y - 16), (x, y + 16)], fill=NAVY, width=6)
    x_m3, x_0, x_3 = xg + pas, xg + 4 * pas, xg + 7 * pas
    f = police("ariblk.ttf", 54)
    for x, t in ((x_m3, "−3"), (x_0, "0"), (x_3, "3")):
        centre(d, x, y + 30, t, f, NAVY)
    # l'arc orange passe AU-DESSUS (angles PIL : 180° → 360° = la moitié haute)
    d.arc([x_m3, y - 150, x_3, y + 150], start=180, end=360, fill=ORANGE, width=12)
    d.polygon([(x_3 - 30, y - 62), (x_3 + 30, y - 62), (x_3, y - 14)], fill=ORANGE)
    d.ellipse([x_m3 - 22, y - 22, x_m3 + 22, y + 22], fill=ROUGE)
    d.ellipse([x_3 - 22, y - 22, x_3 + 22, y + 22], fill=VERT)


REELS = {
    "eleveai-maths-seconde-reels-intervalles-short-0999": {
        "badge": "LES NOMBRES RÉELS", "titre": ["0,999… = 1", "PAS UN ARRONDI"], "taille": 96,
        "sous": "deux écritures, un seul nombre", "accroche": acc_0999,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-reels-intervalles-short-moinsx": {
        "badge": "LA VALEUR ABSOLUE", "titre": ["−x EST PARFOIS", "POSITIF"], "taille": 96,
        "sous": "le « − » ne veut pas dire négatif", "accroche": acc_moinsx,
        "dossier": "seconde/maths/fr",
    },
}


def main():
    from PIL import Image
    # ⚠️ La console Windows est en cp1252 : elle ne sait pas écrire « − » (U+2212)
    # et le script mourait APRÈS la première image, sans avoir fait la seconde.
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for nom, spec in REELS.items():
        # ⛔ On MESURE le titre avant de le poser (leçon du 17/09).
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)


if __name__ == "__main__":
    main()
