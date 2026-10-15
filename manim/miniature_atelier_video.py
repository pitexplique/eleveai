# miniature_atelier_video.py
# LES MINIATURES de « Crée ta vidéo de maths » (10/10/2026, série « Les bases ») :
# l'annonce de l'atelier vidéo (/atelier-video).
# ⭐ Pas une vidéo de chapitre : le titre n'est donc pas « COMPRENDRE … » mais
# l'invitation elle-même. L'accroche montre le geste de l'atelier : une ligne de
# script en français → l'écran qu'elle dessine (12 billes, 3 rangées de 4).
#
# Usage :  python manim/miniature_atelier_video.py [durée]
# Sorties : manim/sorties/bases/maths/{paysage,shorts}/fr/atelier-video/

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, RACINE, VERT, police
import miniature_essai_v2 as paysage
import miniature_short as short

ORANGE = (217, 119, 20)
PANNEAU = (30, 41, 59)


def script_vers_ecran(d, x, y, echelle=1.0):
    """Un panneau de script (2 lignes) → une flèche → un écran noir avec 12 billes."""
    k = echelle
    mono = police("consola.ttf", int(30 * k))
    d.rounded_rectangle([x, y, x + 330 * k, y + 120 * k], radius=int(14 * k), fill=PANNEAU)
    d.text((x + 20 * k, y + 18 * k), "titre : 12 billes", font=mono, fill=(255, 255, 255))
    d.text((x + 20 * k, y + 66 * k), "billes : 3 x 4", font=mono, fill=(255, 255, 255))
    # la flèche
    ax, ay = x + 350 * k, y + 60 * k
    d.line([ax, ay, ax + 70 * k, ay], fill=ORANGE, width=int(8 * k))
    d.polygon([(ax + 90 * k, ay), (ax + 66 * k, ay - 16 * k), (ax + 66 * k, ay + 16 * k)], fill=ORANGE)
    # l'écran et ses billes
    ex, ey = ax + 110 * k, y - 20 * k
    d.rectangle([ex, ey, ex + 300 * k, ey + 169 * k], fill=(0, 0, 0), outline=(255, 255, 255), width=int(3 * k))
    r, pas = 13 * k, 38 * k
    x0, y0 = ex + 150 * k - 1.5 * pas, ey + 85 * k - pas
    for i in range(12):
        cx, cy = x0 + (i % 4) * pas, y0 + (i // 4) * pas
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(88, 166, 255))


def acc_paysage(d):
    """Bande utile : y 356 → 600, x 58 → 920."""
    script_vers_ecran(d, 70, 420, 1.0)
    f = police("ariblk.ttf", 34)
    d.text((70, 555), "en français", font=f, fill=VERT)


def acc_short(d):
    script_vers_ecran(d, 60, 800, 1.2)
    f = police("ariblk.ttf", 52)
    txt = "tu écris, ça s'anime"
    d.text((540 - d.textlength(txt, font=f) / 2, 1060), txt, font=f, fill=VERT)


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    (RACINE / "manim/sorties/bases/maths/paysage/fr/atelier-video").mkdir(parents=True, exist_ok=True)
    paysage.construire("eleveai-maths-bases-atelier-video", {
        "badge": "LES BASES", "duree": sys.argv[1] if len(sys.argv) > 1 else "EN 3 MIN",
        "titre": ["CRÉE TA VIDÉO", "DE MATHS"],
        "accroche": acc_paysage,
    })
    nom = "eleveai-maths-bases-atelier-video-short"
    short.construire(nom, {
        "badge": "LES BASES", "titre": ["CRÉE TA VIDÉO", "DE MATHS"], "taille": 96,
        "sous": "en un clic", "taille_sous": 56, "couleur_sous": ORANGE,
        "accroche": acc_short, "dossier": "bases/maths/fr",
    })
    dst = RACINE / "manim/sorties/bases/maths/shorts/fr/atelier-video"
    dst.mkdir(parents=True, exist_ok=True)
    shutil.copy(short.SORTIE / "bases/maths/fr" / f"{nom}.png", dst / f"{nom}.png")
    print(dst / f"{nom}.png")


if __name__ == "__main__":
    main()
