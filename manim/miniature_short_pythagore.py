# miniature_short_pythagore.py
# LES MINIATURES VERTICALES des shorts jumeaux de la série Pythagore 4e
# (CEINTURE BLANCHE, 12/10/2026). Même machinerie que `miniature_short_signes.py`
# (fond, badge, signature de `miniature_short.py`).
#
# ⭐ L'accroche MONTRE le short, avec ses couleurs : angle droit BLEU,
# hypoténuse / carreaux ORANGE. La ceinture blanche est dessinée.
# ⭐ Rangée À CÔTÉ DE SA VIDÉO : manim/sorties/4e/maths/pythagore/<NN-épisode>/.
#
# Usage :  python manim/miniature_short_pythagore.py [filtre]

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import NAVY, police
from miniature_short import ORANGE, W, construire
from miniature_short_signes import ceinture, centre

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "pythagore"

BLEU_DROIT = (24, 130, 220)
ORANGE_HYP = (236, 110, 20)
TURQUOISE = (94, 200, 190)


def badge_ceinture(d, cx=170, cy=690):
    ceinture(d, cx, cy)
    centre(d, cx, cy + 110, "ceinture", police("arialbd.ttf", 34), NAVY)
    centre(d, cx, cy + 148, "blanche", police("arialbd.ttf", 34), NAVY)


def acc_echelle(d):
    """La case, le sol, l'échelle orange en face de l'angle droit bleu."""
    badge_ceinture(d, cx=880, cy=700)
    sol_y = 1330
    A, C, B = (430, sol_y), (430, 830), (980, sol_y)
    # la case
    d.rectangle([110, 900, 430, sol_y], fill=TURQUOISE, outline=NAVY, width=5)
    d.polygon([(80, 900), (460, 900), (270, 760)], fill=(220, 38, 38), outline=NAVY)
    d.rectangle([180, 1130, 260, sol_y], fill=(124, 45, 18), outline=NAVY, width=3)
    d.line([(40, sol_y), (1040, sol_y)], fill=(120, 130, 145), width=8)
    # l'angle droit, en bleu
    d.line([A, C], fill=BLEU_DROIT, width=12)
    d.line([A, B], fill=BLEU_DROIT, width=12)
    s = 56
    d.rectangle([A[0], A[1] - s, A[0] + s, A[1]], fill=(186, 220, 250), outline=BLEU_DROIT, width=6)
    # l'échelle, en orange
    import math
    dx, dy = C[0] - B[0], C[1] - B[1]
    L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L
    nx, ny = -uy * 22, ux * 22
    for sgn in (1, -1):
        d.line([(B[0] + sgn * nx, B[1] + sgn * ny), (C[0] + sgn * nx, C[1] + sgn * ny)], fill=ORANGE_HYP, width=12)
    k = 50
    while k < L - 20:
        x, y = B[0] + ux * k, B[1] + uy * k
        d.line([(x + nx, y + ny), (x - nx, y - ny)], fill=ORANGE_HYP, width=8)
        k += 62
    centre(d, 330, 1370, "le plus long ?", police("ariblk.ttf", 58), ORANGE_HYP)


def acc_carrelage(d):
    """La terrasse de 16 carreaux orange, le côté bleu marqué « ? »."""
    badge_ceinture(d)
    x0, y0, t = 400, 760, 135
    for i in range(4):
        for j in range(4):
            d.rectangle([x0 + i * t + 5, y0 + j * t + 5, x0 + (i + 1) * t - 5, y0 + (j + 1) * t - 5],
                        fill=ORANGE_HYP, outline=NAVY, width=4)
    d.line([(x0 - 30, y0), (x0 - 30, y0 + 4 * t)], fill=BLEU_DROIT, width=12)
    centre(d, x0 - 95, y0 + 2 * t - 60, "?", police("ariblk.ttf", 100), BLEU_DROIT)
    centre(d, 540, y0 + 4 * t + 22, "16 carreaux", police("ariblk.ttf", 62), ORANGE_HYP)


def acc_champ(d):
    """Le champ de cannes : les bords BLEUS (70 m), la diagonale ORANGE marquée « ? »."""
    badge_ceinture(d, cx=880, cy=700)
    canne = (63, 125, 32)
    x0, y0, w, h = 150, 800, 640, 480
    d.rectangle([x0, y0, x0 + w, y0 + h], fill=canne, outline=NAVY, width=5)
    for k in range(1, 12):
        d.line([(x0 + 12, y0 + k * 40), (x0 + w - 12, y0 + k * 40)], fill=(163, 217, 119), width=3)
    d.line([(x0, y0 + h), (x0 + w, y0 + h)], fill=BLEU_DROIT, width=14)
    d.line([(x0 + w, y0 + h), (x0 + w, y0)], fill=BLEU_DROIT, width=14)
    d.line([(x0, y0 + h), (x0 + w, y0)], fill=ORANGE_HYP, width=16)
    f = police("ariblk.ttf", 52)
    centre(d, x0 + w / 2, y0 + h + 12, "40 m", f, BLEU_DROIT)
    d.text((x0 + w + 14, y0 + h / 2 - 30), "30 m", font=f, fill=BLEU_DROIT)
    centre(d, x0 + w / 2 - 60, y0 + h / 2 - 120, "?", police("ariblk.ttf", 120), ORANGE_HYP)


def acc_largeur(d):
    """Le champ : la diagonale ORANGE connue (50 m), la largeur BLEUE marquée « ? »."""
    badge_ceinture(d, cx=880, cy=700)
    canne = (63, 125, 32)
    x0, y0, w, h = 150, 800, 640, 480
    d.rectangle([x0, y0, x0 + w, y0 + h], fill=canne, outline=NAVY, width=5)
    for k in range(1, 12):
        d.line([(x0 + 12, y0 + k * 40), (x0 + w - 12, y0 + k * 40)], fill=(163, 217, 119), width=3)
    d.line([(x0 + w, y0 + h), (x0 + w, y0)], fill=BLEU_DROIT, width=16)
    d.line([(x0, y0 + h), (x0 + w, y0)], fill=ORANGE_HYP, width=16)
    f = police("ariblk.ttf", 56)
    d.text((x0 + 120, y0 + 110), "50 m", font=f, fill=(255, 255, 255))
    centre(d, x0 + w / 2, y0 + h + 12, "40 m", f, NAVY)
    d.text((x0 + w + 20, y0 + h / 2 - 70), "?", font=police("ariblk.ttf", 120), fill=BLEU_DROIT)


def acc_corde(d):
    """La corde à 13 nœuds tendue en 3-4-5 ; un « ? » dans le coin de l'angle droit."""
    badge_ceinture(d, cx=880, cy=700)
    corde = (176, 132, 64)
    u = 150
    A = (170, 1330)
    B, C = (A[0] + 4 * u, A[1]), (A[0], A[1] - 3 * u)
    for p, q, c in [(A, B, BLEU_DROIT), (A, C, BLEU_DROIT), (B, C, ORANGE_HYP)]:
        d.line([p, q], fill=c, width=14)
    pts = [(A[0] + k * u, A[1]) for k in range(5)] + [(B[0] + (C[0] - B[0]) * k / 5, B[1] + (C[1] - B[1]) * k / 5) for k in range(1, 6)] + [(A[0], C[1] + k * u) for k in range(1, 4)]
    for x, y in pts:
        d.ellipse([x - 20, y - 20, x + 20, y + 20], fill=corde, outline=NAVY, width=4)
    f = police("ariblk.ttf", 64)
    d.text((A[0] - 80, A[1] - 1.5 * u - 40), "3", font=f, fill=BLEU_DROIT)
    centre(d, A[0] + 2 * u, A[1] + 25, "4", f, BLEU_DROIT)
    d.text((A[0] + 2 * u + 40, A[1] - 1.5 * u - 110), "5", font=f, fill=ORANGE_HYP)
    d.text((A[0] + 40, A[1] - 150), "?", font=police("ariblk.ttf", 110), fill=NAVY)


def acc_dalle(d):
    """La dalle 60-80-100 vue de dessus : la diagonale ORANGE, un « ? » au coin."""
    badge_ceinture(d, cx=880, cy=700)
    u = 7.0
    A = (200, 1360)
    B, C = (A[0] + 60 * u, A[1]), (A[0], A[1] - 80 * u)
    d.polygon([A, B, (B[0], C[1]), C], fill=(209, 213, 219))
    d.line([A, B], fill=BLEU_DROIT, width=14)
    d.line([A, C], fill=BLEU_DROIT, width=14)
    d.line([B, C], fill=ORANGE_HYP, width=14)
    f = police("ariblk.ttf", 60)
    centre(d, (A[0] + B[0]) / 2, A[1] + 12, "60", f, BLEU_DROIT)
    d.text((A[0] - 100, (A[1] + C[1]) / 2 - 35), "80", font=f, fill=BLEU_DROIT)
    d.text(((B[0] + C[0]) / 2 + 30, (B[1] + C[1]) / 2 - 60), "100", font=f, fill=ORANGE_HYP)
    d.text((A[0] + 30, A[1] - 150), "?", font=police("ariblk.ttf", 110), fill=NAVY)


def acc_choix(d):
    """Deux triangles : le petit carré (connu → théorème), le « ? » (cherché → réciproque)."""
    badge_ceinture(d, cx=880, cy=700)
    u = 95
    for x0, connu, mot, coul in [(120, True, "THÉORÈME", ORANGE_HYP), (560, False, "RÉCIPROQUE", (22, 163, 90))]:
        A = (x0, 1250)
        B, C = (A[0] + 4 * u, A[1]), (A[0], A[1] - 3 * u)
        d.polygon([A, B, C], outline=NAVY, width=10)
        if connu:
            d.rectangle([A[0], A[1] - 55, A[0] + 55, A[1]], fill=(186, 220, 250), outline=BLEU_DROIT, width=7)
        else:
            d.text((A[0] + 20, A[1] - 130), "?", font=police("ariblk.ttf", 100), fill=BLEU_DROIT)
        centre(d, A[0] + 2 * u, A[1] + 30, mot, police("ariblk.ttf", 50), coul)


def acc_cube(d):
    """Le cube, un triangle rouge en biais, et un grand « ? »."""
    from miniature_essai_v2 import _cube_pil
    badge_ceinture_orange(d, cx=960, cy=640)
    pt = _cube_pil(d, 150, 1330, 440, triangle="ABG", lw=10)
    cx = sum(pt(n)[0] for n in "ABCDEFGH") / 8
    cy = sum(pt(n)[1] for n in "ABCDEFGH") / 8
    for n in "ABCDEFGH":
        x, y = pt(n)
        dx, dy = x - cx, y - cy
        r = max((dx * dx + dy * dy) ** 0.5, 1)
        centre(d, x + dx / r * 45, y + dy / r * 45 - 26, n, police("arialbd.ttf", 44), NAVY)


def acc_gobelet(d):
    """3e : le gobelet du brevet 2026, sa pointe en pointillés, le triangle OAD
    colorié (angle droit BLEU, hypoténuse ORANGE) ; ceinture ORANGE (13/10)."""
    badge_ceinture_orange(d, cx=900, cy=760)
    cx, yB, yA, yO, rB, rA = 420, 820, 1130, 1420, 300, 135
    d.polygon([(cx - rB, yB), (cx - rA, yA), (cx + rA, yA), (cx + rB, yB)], fill=(186, 230, 253))
    d.line([(cx - rB, yB), (cx - rA, yA)], fill=NAVY, width=8)
    d.line([(cx + rB, yB), (cx + rA, yA)], fill=NAVY, width=8)
    d.ellipse([cx - rB, yB - 60, cx + rB, yB + 60], fill=(56, 189, 248), outline=NAVY, width=8)
    d.ellipse([cx - rA, yA - 26, cx + rA, yA + 26], outline=NAVY, width=5)
    for x1 in (cx - rA, cx + rA):
        for k in range(0, 10, 2):
            d.line([(x1 + (cx - x1) * k / 10, yA + (yO - yA) * k / 10),
                    (x1 + (cx - x1) * (k + 1) / 10, yA + (yO - yA) * (k + 1) / 10)], fill=(100, 116, 139), width=7)
    d.polygon([(cx, yO), (cx, yA), (cx + rA, yA)], fill=(253, 186, 116))
    d.line([(cx, yO), (cx, yA)], fill=BLEU_DROIT, width=14)
    d.line([(cx, yA), (cx + rA, yA)], fill=BLEU_DROIT, width=14)
    d.line([(cx, yO), (cx + rA, yA)], fill=ORANGE_HYP, width=16)
    d.rectangle([cx, yA, cx + 32, yA + 32], outline=BLEU_DROIT, width=7)
    f = police("ariblk.ttf", 60)
    d.text((cx + rA + 30, yA + 90), "8,2", font=f, fill=ORANGE_HYP)
    d.text((cx - 120, yA + 60), "?", font=police("ariblk.ttf", 120), fill=BLEU_DROIT)
    centre(d, cx, yO + 30, "O", police("arialbd.ttf", 56), NAVY)


def badge_ceinture_orange(d, cx=880, cy=700):
    ceinture(d, cx, cy, couleur=(249, 115, 22))
    centre(d, cx, cy + 110, "ceinture", police("arialbd.ttf", 34), NAVY)
    centre(d, cx, cy + 148, "orange", police("arialbd.ttf", 34), NAVY)


SHORTS = {
    # 13/10/2026 — 3e, Pythagore dans un solide : le gobelet du brevet, CEINTURE ORANGE.
    "eleveai-maths-3e-pythagore-solide-short": {
        "badge": "PYTHAGORE · 3E",
        "titre": ["LE TRIANGLE", "CACHÉ"],
        "taille": 110,
        "sous": "dans le gobelet du brevet 2026",
        "taille_sous": 44,
        "couleur_sous": ORANGE,
        "accroche": acc_gobelet,
        "dossier": "3e/maths/fr",
        "serie": "3e/maths/pythagore",
        "episode": "01-gobelet-brevet",
    },
    "eleveai-maths-4e-pythagore-defi-cube-short": {
        "badge": "LE DÉFI DU CUBE",
        "titre": ["COMBIEN DE TRIANGLES", "RECTANGLES ?"],
        "taille": 70,
        "sous": "dans un cube : réponds en commentaire !",
        "taille_sous": 40,
        "couleur_sous": ORANGE,
        "accroche": acc_cube,
        "dossier": "4e/maths/fr",
        "episode": "08-defi-cube",
    },
    "eleveai-maths-4e-pythagore-rediger-short": {
        "badge": "PYTHAGORE · 4E",
        "titre": ["THÉORÈME OU", "RÉCIPROQUE ?"],
        "taille": 92,
        "sous": "lequel écrire au contrôle ?",
        "taille_sous": 48,
        "couleur_sous": ORANGE,
        "accroche": acc_choix,
        "dossier": "4e/maths/fr",
        "episode": "07-rediger",
    },
    "eleveai-maths-4e-pythagore-reciproque-short": {
        "badge": "PYTHAGORE · 4E",
        "titre": ["60, 80, 100 :", "COIN DROIT ?"],
        "taille": 100,
        "sous": "la dalle du maçon, sans équerre",
        "taille_sous": 46,
        "couleur_sous": ORANGE,
        "accroche": acc_dalle,
        "dossier": "4e/maths/fr",
        "episode": "06-reciproque",
    },
    "eleveai-maths-4e-pythagore-verifier-short": {
        "badge": "PYTHAGORE · 4E",
        "titre": ["3, 4, 5 :", "ANGLE DROIT ?"],
        "taille": 104,
        "sous": "la corde à 13 nœuds des bâtisseurs",
        "taille_sous": 44,
        "couleur_sous": ORANGE,
        "accroche": acc_corde,
        "dossier": "4e/maths/fr",
        "episode": "05-verifier",
    },
    "eleveai-maths-4e-pythagore-cote-short": {
        "badge": "PYTHAGORE · 4E",
        "titre": ["DIAGONALE 50 M", "LARGEUR : ?"],
        "taille": 92,
        "sous": "la largeur cachée du champ",
        "taille_sous": 48,
        "couleur_sous": ORANGE,
        "accroche": acc_largeur,
        "dossier": "4e/maths/fr",
        "episode": "04-cote",
    },
    "eleveai-maths-4e-pythagore-hypotenuse-short": {
        "badge": "PYTHAGORE · 4E",
        "titre": ["BORDS : 70 M", "DIAGONALE : ?"],
        "taille": 96,
        "sous": "le raccourci du champ de cannes",
        "taille_sous": 46,
        "couleur_sous": ORANGE,
        "accroche": acc_champ,
        "dossier": "4e/maths/fr",
        "episode": "03-hypotenuse-calcul",
    },
    "eleveai-maths-4e-pythagore-reconnaitre-short": {
        "badge": "PYTHAGORE · 4E",
        "titre": ["QUEL CÔTÉ EST", "LE PLUS LONG ?"],
        "taille": 92,
        "sous": "l'échelle contre la case",
        "taille_sous": 50,
        "couleur_sous": ORANGE,
        "accroche": acc_echelle,
        "dossier": "4e/maths/fr",
        "episode": "01-hypotenuse",
    },
    "eleveai-maths-4e-pythagore-carre-racine-short": {
        "badge": "PYTHAGORE · 4E",
        "titre": ["16 CARREAUX", "EN CARRÉ"],
        "taille": 104,
        "sous": "combien sur un côté ?",
        "taille_sous": 54,
        "couleur_sous": ORANGE,
        "accroche": acc_carrelage,
        "dossier": "4e/maths/fr",
        "episode": "02-carre-racine",
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
        serie = RACINE / "manim" / "sorties" / spec["serie"] if spec.get("serie") else SERIE
        cible = serie / spec["episode"] / f"{nom}.png"
        shutil.copy(source, cible)
        print(cible)


if __name__ == "__main__":
    main()
