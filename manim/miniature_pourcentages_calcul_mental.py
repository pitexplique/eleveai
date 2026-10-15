# miniature_pourcentages_calcul_mental.py
# LES DEUX MINIATURES des pourcentages de tête (30/09/2026, série « Les bases ») :
# la paysage (1280 × 720) et le short (1080 × 1920).
#
# ⛔ FICHIER À PART : on EMPRUNTE la machinerie de `miniature_essai_v2.py` (paysage,
# « COMPRENDRE X » + pastille « EN N MIN ») et de `miniature_short.py` (vertical)
# sans y toucher — d'autres sessions les modifient.
# ⭐ Paysage : le chapitre en titre (on le cherche par son nom), la maths en gros —
# le 0 barré de 80. Short : la question de l'accroche, l'étiquette −30 %.
# ⛔ Aucune étiquette de classe (série « Les bases »).
#
# Usage :  python manim/miniature_pourcentages_calcul_mental.py
# Sorties : à côté de chaque vidéo, dans manim/sorties/bases/maths/…

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, ROUGE, VERT, RACINE, police
import miniature_essai_v2 as paysage
import miniature_short as short

GRIS = (43, 43, 43)


# ── la paysage ──────────────────────────────────────────────────────────────

def acc_paysage(d):
    """« 10 % de 80 = 8 », le 0 barré en rouge. Bande utile : y 356 → 600."""
    f = police("ariblk.ttf", 118)
    x, y = 56, 350
    d.text((x, y + 30), "10 % de ", font=police("ariblk.ttf", 70), fill=NAVY)
    x += d.textlength("10 % de ", font=police("ariblk.ttf", 70))
    d.text((x, y), "8", font=f, fill=BLEU)
    x += d.textlength("8", font=f)
    d.text((x, y), "0", font=f, fill=ROUGE)
    l0 = d.textlength("0", font=f)
    d.line([(x - 6, y + 150), (x + l0 + 6, y + 30)], fill=ROUGE, width=12)
    x += l0 + 24
    d.text((x, y), "= 8 €", font=f, fill=VERT)
    d.text((60, 516), "20 % = 16 €   5 % = 4 €", font=police("ariblk.ttf", 50), fill=NAVY)


# ── le short ────────────────────────────────────────────────────────────────

def acc_short(d):
    """L'étiquette de l'accroche, dessinée, et le « −30 % » en rouge."""
    cx, cy, l, h = short.W // 2 + 30, 820, 560, 250
    d.polygon([(cx - l // 2, cy - h // 2), (cx + l // 2, cy - h // 2), (cx + l // 2, cy + h // 2),
               (cx - l // 2, cy + h // 2), (cx - l // 2 - 110, cy)], fill=GRIS, outline=NAVY)
    d.line([(cx - l // 2, cy - h // 2), (cx + l // 2, cy - h // 2), (cx + l // 2, cy + h // 2),
            (cx - l // 2, cy + h // 2), (cx - l // 2 - 110, cy), (cx - l // 2, cy - h // 2)],
           fill=NAVY, width=10)
    d.ellipse([cx - l // 2 - 50, cy - 22, cx - l // 2 - 6, cy + 22], outline=(255, 255, 255), width=6)
    short.centre(d, cx + 20, cy - 92, "80 €", police("ariblk.ttf", 160), (255, 255, 255))
    short.centre(d, short.W // 2, 1010, "−30 %", police("ariblk.ttf", 230), ROUGE)


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    # 4:21 → « 4 min »
    paysage.construire("eleveai-maths-bases-pourcentages-calcul-mental", {
        "badge": "LES POURCENTAGES", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE LES", "POURCENTAGES DE TÊTE"],
        "accroche": acc_paysage,
    })

    nom = "eleveai-maths-bases-pourcentages-short-calcul-mental"
    short.construire(nom, {
        "badge": "LES POURCENTAGES", "titre": ["10 %, 20 %, 30 %", "DE TÊTE"], "taille": 96,
        "sous": "tu paies combien ?", "taille_sous": 60, "couleur_sous": (217, 119, 20),
        "accroche": acc_short,
        "dossier": "bases/maths/fr",
    })
    # ⭐ et une copie À CÔTÉ DU MP4, comme la tablette
    src = short.SORTIE / "bases/maths/fr" / f"{nom}.png"
    dst = RACINE / "manim/sorties/bases/maths/shorts/fr/pourcentages" / f"{nom}.png"
    shutil.copy(src, dst)
    print(dst)


if __name__ == "__main__":
    main()
