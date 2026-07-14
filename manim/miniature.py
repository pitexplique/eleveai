# Générateur de miniatures YouTube EleveAI (1280x720) — EN LOT.
# STYLE FIGÉ « cahier » : fond papier à carreaux clair, badge bleu nuit, titre
# bleu nuit (Arial Black), accroche visuelle propre à la notion, Ti-Margo à
# droite, SIGNATURE HUMAINE bas-gauche (photo ronde de Frédéric + eleveai.fr).
#
# REGISTRE : chaque notion = une entrée dans NOTIONS (badge, titre, taille,
# sous-titre, fonction accroche). Ajouter une notion = ajouter une entrée + sa
# fonction accroche.
#
# Usage :
#   python manim/miniature.py            → génère TOUTES les miniatures
#   python manim/miniature.py <nom>      → génère seulement celle-là (préfixe suffit)

import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
AVATAR = RACINE / "public" / "images" / "avatar-frederic-Lacoste.jpg"
SORTIE = RACINE / "manim" / "miniatures"

# ── Charte cahier ──────────────────────────────────────────────────────────────
W, H = 1280, 720
PAPIER = (247, 250, 255)
CARREAU = (214, 228, 246)
CARREAU_FORT = (196, 216, 240)
NAVY = (7, 42, 74)
BLEU = (37, 99, 175)
VERT = (22, 163, 90)
JAUNE = (255, 200, 0)
ROUGE = (211, 47, 47)


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


def a_droite(d, xr, y, txt, f, fill):
    d.text((xr - d.textlength(txt, font=f), y), txt, font=f, fill=fill)


def centre(d, cx, y, txt, f, fill):
    d.text((cx - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=fill)


# ── Accroches par notion (le dessin propre à chaque cours) ─────────────────────
def acc_calcul_pose(d):
    f = police("arialbd.ttf", 62)
    xg, xd, yh = 476, 700, 322
    d.text((xg, yh + 74), "+", font=f, fill=BLEU)
    a_droite(d, xd, yh, "475", f, BLEU)
    a_droite(d, xd, yh + 74, "286", f, BLEU)
    d.rounded_rectangle([xg, yh + 156, xd, yh + 168], radius=6, fill=JAUNE)
    a_droite(d, xd, yh + 178, "761", f, VERT)


def acc_entier(d):
    d.text((360, 300), "4 273", font=police("ariblk.ttf", 96), fill=BLEU)
    d.text((300, 424), "= 4 000 + 200 + 70 + 3", font=police("arialbd.ttf", 38), fill=VERT)


def acc_decimal(d):
    d.text((360, 300), "3,45", font=police("ariblk.ttf", 96), fill=BLEU)
    d.text((320, 424), "= 3 + 0,4 + 0,05", font=police("arialbd.ttf", 40), fill=VERT)


def acc_fraction(d):
    d.text((300, 296), "3/4", font=police("ariblk.ttf", 104), fill=BLEU)
    cx, cy, r = 570, 384, 76
    box = [cx - r, cy - r, cx + r, cy + r]
    d.pieslice(box, start=-90, end=180, fill=BLEU)
    d.ellipse(box, outline=NAVY, width=4)
    d.line([cx - r, cy, cx + r, cy], fill=NAVY, width=3)
    d.line([cx, cy - r, cx, cy + r], fill=NAVY, width=3)


def acc_proportionnalite(d):
    x0, y0, cw, ch = 300, 336, 70, 58
    f = police("ariblk.ttf", 34)
    for r, (vals, col) in enumerate([(["1", "3", "5"], BLEU), (["2", "6", "10"], NAVY)]):
        for c, v in enumerate(vals):
            x, y = x0 + c * cw, y0 + r * ch
            d.rectangle([x, y, x + cw, y + ch], outline=NAVY, width=3)
            centre(d, x + cw / 2, y + 10, v, f, col)
    d.text((x0 + 3 * cw + 20, y0 + 22), "× 2", font=police("ariblk.ttf", 40), fill=VERT)


def acc_pourcentage(d):
    d.text((296, 320), "25 %", font=police("ariblk.ttf", 92), fill=BLEU)
    gx, gy, cs = 566, 336, 15
    for i in range(100):
        r, c = i // 10, i % 10
        x, y = gx + c * cs, gy + r * cs
        d.rectangle([x, y, x + cs, y + cs], fill=(BLEU if i < 25 else PAPIER), outline=CARREAU_FORT, width=1)


def acc_calcul_mental(d):
    d.text((330, 300), "47 + 8", font=police("ariblk.ttf", 92), fill=BLEU)
    d.text((300, 424), "= 50 + 5 = 55", font=police("arialbd.ttf", 40), fill=VERT)


def acc_relatif(d):
    # droite graduée : 0 au centre, un négatif (rouge) à gauche, un positif (vert) à droite.
    y = 400
    x0, x1 = 320, 704
    cx = (x0 + x1) / 2
    d.line([(x0 - 8, y), (x1 + 8, y)], fill=NAVY, width=6)
    d.polygon([(x1 + 8, y), (x1 - 12, y - 12), (x1 - 12, y + 12)], fill=NAVY)
    xg, xd = x0 + 40, x1 - 40
    for x in (xg, cx, xd):
        d.line([(x, y - 13), (x, y + 13)], fill=NAVY, width=5)
    d.ellipse([xg - 15, y - 15, xg + 15, y + 15], fill=ROUGE)
    d.ellipse([xd - 15, y - 15, xd + 15, y + 15], fill=VERT)
    f = police("ariblk.ttf", 54)
    centre(d, xg, y - 84, "-3", f, ROUGE)
    centre(d, cx, y - 80, "0", f, NAVY)
    centre(d, xd, y - 84, "+5", f, VERT)


def acc_fraction_5e(d):
    # deux barres : 6/8 (haut) = 3/4 (bas) — la 5e, c'est simplifier.
    def barre(y, n, den, col):
        x0, w, h = 420, 300, 54
        cw = w / den
        for i in range(den):
            x = x0 + i * cw
            d.rectangle([x, y, x + cw, y + h], fill=(col if i < n else PAPIER), outline=NAVY, width=3)
    barre(360, 6, 8, BLEU)
    barre(436, 3, 4, VERT)
    f = police("ariblk.ttf", 40)
    a_droite(d, 406, 366, "6/8", f, BLEU)
    a_droite(d, 406, 442, "3/4", f, VERT)
    d.text((732, 396), "=", font=police("ariblk.ttf", 52), fill=NAVY)


def acc_litteral(d):
    # 3 boîtes « x » bleues + 2 vertes = 5x (les termes semblables).
    def boite(x, y, col, s=54):
        d.rounded_rectangle([x, y, x + s, y + s], radius=8, fill=col, outline=NAVY, width=3)
        centre(d, x + s / 2, y + 8, "x", police("ariblk.ttf", 34), (255, 255, 255))
    y = 344
    for i in range(3):
        boite(352 + i * 62, y, BLEU)
    d.text((352 + 3 * 62 + 4, y + 6), "+", font=police("ariblk.ttf", 40), fill=NAVY)
    for i in range(2):
        boite(352 + 3 * 62 + 46 + i * 62, y, VERT)
    d.text((352 + 5 * 62 + 52, y + 4), "= 5x", font=police("ariblk.ttf", 44), fill=VERT)


def acc_prop_5e(d):
    # petit tableau de proportionnalité : 3 6 / 9 18 avec ×2.
    x0, y0, cw, ch = 360, 336, 90, 62
    f = police("ariblk.ttf", 34)
    vals = [["3", "6"], ["9", "18"]]
    cols = [BLEU, VERT]
    for r in range(2):
        for c in range(2):
            x, y = x0 + c * cw, y0 + r * ch
            d.rectangle([x, y, x + cw, y + ch], outline=NAVY, width=3)
            centre(d, x + cw / 2, y + 12, vals[r][c], f, cols[r])
    d.text((x0 + 2 * cw + 24, y0 + 18), "× 2", font=police("ariblk.ttf", 40), fill=(176, 84, 20))


def acc_stat_5e(d):
    # petit diagramme en barres : la plus haute surlignée (orange).
    base, x0, bw, gap = 468, 372, 46, 26
    orange = (217, 119, 20)
    bars = [(120, orange), (78, BLEU), (48, BLEU), (66, BLEU)]
    for i, (h, col) in enumerate(bars):
        x = x0 + i * (bw + gap)
        d.rectangle([x, base - h, x + bw, base], fill=col, outline=NAVY, width=3)
    d.line([(x0 - 12, base), (x0 + 4 * (bw + gap), base)], fill=NAVY, width=4)


def acc_proba_5e(d):
    # un dé (face 3, points bleu nuit) + P = 1/6.
    x0, y0, s = 372, 320, 150
    d.rounded_rectangle([x0, y0, x0 + s, y0 + s], radius=18, outline=NAVY, width=6, fill=(235, 243, 255))
    cx, cy = x0 + s / 2, y0 + s / 2
    off, r = s * 0.26, 13
    for px, py in [(-1, -1), (0, 0), (1, 1)]:
        d.ellipse([cx + px * off - r, cy + py * off - r, cx + px * off + r, cy + py * off + r], fill=BLEU)
    d.text((x0 + s + 30, cy - 44), "P =", font=police("arialbd.ttf", 40), fill=NAVY)
    d.text((x0 + s + 132, cy - 60), "1", font=police("ariblk.ttf", 44), fill=VERT)
    d.line([(x0 + s + 128, cy - 6), (x0 + s + 168, cy - 6)], fill=NAVY, width=4)
    d.text((x0 + s + 132, cy + 2), "6", font=police("ariblk.ttf", 44), fill=VERT)


def acc_angle_5e(d):
    # un angle obtus (~120°) avec arc + mesure.
    import math
    orange = (217, 119, 20)
    ox, oy = 430, 462
    L = 230
    d.line([(ox, oy), (ox + L, oy)], fill=BLEU, width=9)  # côté 0°
    L2 = 150
    ex = ox + int(L2 * math.cos(math.radians(120)))
    ey = oy - int(L2 * math.sin(math.radians(120)))
    d.line([(ox, oy), (ex, ey)], fill=BLEU, width=9)      # côté 120°
    d.arc([ox - 66, oy - 66, ox + 66, oy + 66], start=240, end=360, fill=orange, width=8)
    d.text((ox + 30, oy - 118), "120°", font=police("ariblk.ttf", 44), fill=orange)
    d.ellipse([ox - 8, oy - 8, ox + 8, oy + 8], fill=NAVY)


def acc_triangle_5e(d):
    # triangle outline + « 180° » + marques d'angle aux 3 sommets.
    A, B, C = (392, 470), (648, 470), (520, 300)
    for u, v in [(A, B), (B, C), (C, A)]:
        d.line([u, v], fill=BLEU, width=8)
    orange = (217, 119, 20)
    d.arc([A[0] - 4, A[1] - 34, A[0] + 56, A[1] + 26], start=270, end=328, fill=orange, width=5)
    d.arc([B[0] - 56, B[1] - 34, B[0] + 4, B[1] + 26], start=212, end=270, fill=orange, width=5)
    d.arc([C[0] - 30, C[1] - 8, C[0] + 30, C[1] + 52], start=40, end=140, fill=orange, width=5)
    centre(d, 520, 392, "180°", police("ariblk.ttf", 40), VERT)


def acc_sym_centrale(d):
    # une figure F (bleu) et son image F' (rouge) par demi-tour autour de O.
    ox, oy = 560, 420  # centre O
    F = [(430, 350), (508, 350), (430, 430)]
    Fp = [(2 * ox - x, 2 * oy - y) for (x, y) in F]  # symétrique par rapport à O
    d.polygon(F, fill=BLEU, outline=NAVY)
    d.polygon(Fp, fill=(211, 47, 47), outline=NAVY)
    d.line([(430, 350), Fp[0]], fill=CARREAU_FORT, width=2)
    d.ellipse([ox - 9, oy - 9, ox + 9, oy + 9], fill=JAUNE, outline=NAVY, width=2)
    d.text((ox + 14, oy - 6), "O", font=police("arialbd.ttf", 30), fill=NAVY)


def acc_aire_5e(d):
    # un triangle avec base + hauteur (pointillés) + la formule b×h/2.
    orange = (217, 119, 20)
    A, B, C = (392, 460), (620, 460), (470, 320)
    d.polygon([A, B, C], fill=BLEU, outline=NAVY)
    # hauteur en pointillés depuis C
    for y in range(322, 460, 14):
        d.line([(C[0], y), (C[0], min(y + 8, 460))], fill=orange, width=3)
    d.text((378, 468), "base", font=police("arialbd.ttf", 26), fill=NAVY)
    d.text((C[0] + 10, 380), "h", font=police("arialbd.ttf", 26), fill=orange)
    centre(d, 512, 508, "b × h ÷ 2", police("ariblk.ttf", 40), VERT)


def acc_volume_5e(d):
    # un pavé 3D (3 faces) + « aire de base × h ».
    ox, oy, s, dp = 440, 476, 104, 48
    A, B, C, D = (ox, oy - s), (ox + s, oy - s), (ox + s, oy), (ox, oy)
    Ab, Bb, Cb = (ox + dp, oy - s - dp), (ox + s + dp, oy - s - dp), (ox + s + dp, oy - dp)
    d.polygon([A, B, Bb, Ab], fill=(120, 175, 235), outline=NAVY)   # dessus
    d.polygon([B, C, Cb, Bb], fill=(24, 70, 130), outline=NAVY)     # droite
    d.polygon([A, B, C, D], fill=BLEU, outline=NAVY)                # face
    d.polygon([D, C, (C[0] + dp, C[1] - dp), (D[0] + dp, D[1] - dp)], fill=VERT, outline=NAVY)  # base surlignée
    centre(d, 512, 500, "aire de base × h", police("arialbd.ttf", 34), VERT)


def acc_longueur(d):
    d.text((360, 300), "2 m", font=police("ariblk.ttf", 96), fill=BLEU)
    d.text((320, 424), "= 200 cm", font=police("arialbd.ttf", 44), fill=VERT)


def acc_perimetre(d):
    d.rounded_rectangle([372, 296, 636, 404], radius=10, outline=BLEU, width=8)
    d.text((404, 330), "le tour", font=police("arialbd.ttf", 40), fill=NAVY)
    d.text((322, 430), "P = 2 × (L + l)", font=police("arialbd.ttf", 42), fill=VERT)


def acc_aire(d):
    gx, gy, cs = 384, 316, 36
    for r in range(3):
        for c in range(4):
            x, y = gx + c * cs, gy + r * cs
            d.rectangle([x, y, x + cs, y + cs], fill=BLEU, outline=NAVY, width=2)
    d.text((330, 452), "Aire = L × l", font=police("arialbd.ttf", 42), fill=VERT)


def acc_algo(d):
    x0, y, bw, bh, gap = 402, 300, 190, 46, 14
    cols = [(176, 84, 20), BLEU, VERT]
    for i, col in enumerate(cols):
        yy = y + i * (bh + gap)
        d.rounded_rectangle([x0 + (18 if i else 0), yy, x0 + bw, yy + bh], radius=9, fill=col, outline=NAVY, width=2)


def acc_probabilites(d):
    x0, y0, s = 424, 302, 150
    d.rounded_rectangle([x0, y0, x0 + s, y0 + s], radius=18, outline=NAVY, width=6, fill=(235, 243, 255))
    cx, cy = x0 + s / 2, y0 + s / 2
    off, r = s * 0.26, 12
    for px, py in [(-1, -1), (1, -1), (0, 0), (-1, 1), (1, 1)]:
        d.ellipse([cx + px * off - r, cy + py * off - r, cx + px * off + r, cy + py * off + r], fill=BLEU)


def acc_donnees(d):
    base = 466
    x0 = 402
    bw, gap = 52, 70
    bars = [(132, VERT), (74, BLEU), (100, (176, 84, 20))]
    for i, (h, col) in enumerate(bars):
        x = x0 + i * gap
        d.rectangle([x, base - h, x + bw, base], fill=col, outline=NAVY, width=3)
    d.line([(x0 - 14, base), (x0 + 3 * gap, base)], fill=NAVY, width=4)


def acc_symetrie(d):
    ax = 512
    for yy in range(292, 476, 16):
        d.line([(ax, yy), (ax, yy + 9)], fill=JAUNE, width=3)
    d.polygon([(404, 300), (404, 464), (498, 464)], fill=BLEU, outline=NAVY)
    d.polygon([(620, 300), (620, 464), (526, 464)], fill=VERT, outline=NAVY)


def acc_quadrilatere(d):
    x0, y0, s = 400, 304, 150
    d.rectangle([x0, y0, x0 + s, y0 + s], outline=BLEU, width=9)
    d.line([(x0, y0 + 28), (x0 + 28, y0 + 28)], fill=NAVY, width=4)
    d.line([(x0 + 28, y0), (x0 + 28, y0 + 28)], fill=NAVY, width=4)
    d.text((x0 + s + 28, y0 + 48), "carré", font=police("ariblk.ttf", 44), fill=VERT)


def acc_triangle(d):
    A, B, C = (392, 452), (632, 452), (508, 300)
    d.polygon([A, B, C], fill=BLEU)
    for u, v in [(A, B), (B, C), (C, A)]:
        d.line([u, v], fill=NAVY, width=5)
    d.text((452, 398), "180°", font=police("ariblk.ttf", 44), fill=(255, 255, 255))


def acc_angle(d):
    ox, oy = 420, 452
    d.line([(ox, oy), (ox + 214, oy)], fill=BLEU, width=9)
    d.line([(ox, oy), (ox, oy - 196)], fill=BLEU, width=9)
    d.rectangle([ox, oy - 36, ox + 36, oy], outline=NAVY, width=4)
    d.text((ox + 64, oy - 150), "90°", font=police("ariblk.ttf", 58), fill=VERT)


def acc_volume(d):
    ox, oy, s, dp = 420, 420, 80, 40
    A, B, C, D = (ox, oy - s), (ox + s, oy - s), (ox + s, oy), (ox, oy)
    Ab, Bb, Cb = (ox + dp, oy - s - dp), (ox + s + dp, oy - s - dp), (ox + s + dp, oy - dp)
    d.polygon([A, B, Bb, Ab], fill=(120, 175, 235), outline=NAVY)   # dessus
    d.polygon([B, C, Cb, Bb], fill=(24, 70, 130), outline=NAVY)     # droite
    d.polygon([A, B, C, D], fill=BLEU, outline=NAVY)                # face
    d.text((300, 452), "V = L × l × h", font=police("arialbd.ttf", 40), fill=VERT)


# ── LE REGISTRE : une entrée par notion ────────────────────────────────────────
NOTIONS = {
    "eleveai-maths-5e-relatif-nombre": {
        "badge": "MATHS · 5e", "titre": ["LES NOMBRES", "RELATIFS"], "taille": 74,
        "sous": "signe · opposé · comparer", "accroche": acc_relatif,
    },
    "eleveai-maths-5e-fraction-nombre": {
        "badge": "MATHS · 5e", "titre": ["LES", "FRACTIONS"], "taille": 84,
        "sous": "simplifier · comparer", "accroche": acc_fraction_5e,
    },
    "eleveai-maths-5e-litteral-calcul": {
        "badge": "MATHS · 5e", "titre": ["LE CALCUL", "LITTÉRAL"], "taille": 82,
        "sous": "des lettres pour les nombres", "accroche": acc_litteral,
    },
    "eleveai-maths-5e-prop-proportionnalite": {
        "badge": "MATHS · 5e", "titre": ["LA", "PROPORTIONNALITÉ"], "taille": 56,
        "sous": "le coefficient", "accroche": acc_prop_5e,
    },
    "eleveai-maths-5e-stat-statistique": {
        "badge": "MATHS · 5e", "titre": ["LES", "STATISTIQUES"], "taille": 66,
        "sous": "effectif · fréquence · moyenne", "accroche": acc_stat_5e,
    },
    "eleveai-maths-5e-proba-experience": {
        "badge": "MATHS · 5e", "titre": ["LES", "PROBABILITÉS"], "taille": 60,
        "sous": "favorables ÷ possibles", "accroche": acc_proba_5e,
    },
    "eleveai-maths-5e-angle-mesure": {
        "badge": "MATHS · 5e", "titre": ["LES", "ANGLES"], "taille": 84,
        "sous": "aigu · droit · obtus", "accroche": acc_angle_5e,
    },
    "eleveai-maths-5e-triangle-figure": {
        "badge": "MATHS · 5e", "titre": ["LES", "TRIANGLES"], "taille": 78,
        "sous": "nature · construire · 180°", "accroche": acc_triangle_5e,
    },
    "eleveai-maths-5e-sym-centrale": {
        "badge": "MATHS · 5e", "titre": ["LA SYMÉTRIE", "CENTRALE"], "taille": 60,
        "sous": "le demi-tour autour de O", "accroche": acc_sym_centrale,
    },
    "eleveai-maths-5e-aire-surface": {
        "badge": "MATHS · 5e", "titre": ["LES", "AIRES"], "taille": 84,
        "sous": "triangle · parallélogramme", "accroche": acc_aire_5e,
    },
    "eleveai-maths-5e-volume-solide": {
        "badge": "MATHS · 5e", "titre": ["LES", "VOLUMES"], "taille": 84,
        "sous": "pavé · prisme · cylindre", "accroche": acc_volume_5e,
    },
    "eleveai-maths-6e-entier-calcul-pose": {
        "badge": "MATHS · 6e", "titre": ["LE CALCUL", "POSÉ"], "taille": 84,
        "sous": "les 4 opérations, pas à pas", "accroche": acc_calcul_pose,
    },
    "eleveai-maths-6e-entier-nombre": {
        "badge": "MATHS · 6e", "titre": ["LES NOMBRES", "ENTIERS"], "taille": 84,
        "sous": "lire · comparer · encadrer", "accroche": acc_entier,
    },
    "eleveai-maths-6e-decimal-nombre": {
        "badge": "MATHS · 6e", "titre": ["LES NOMBRES", "DÉCIMAUX"], "taille": 84,
        "sous": "lire · comparer · calculer", "accroche": acc_decimal,
    },
    "eleveai-maths-6e-fraction-nombre": {
        "badge": "MATHS · 6e", "titre": ["LES", "FRACTIONS"], "taille": 84,
        "sous": "lire · représenter · comparer", "accroche": acc_fraction,
    },
    "eleveai-maths-6e-prop-proportionnalite": {
        "badge": "MATHS · 6e", "titre": ["LA", "PROPORTIONNALITÉ"], "taille": 60,
        "sous": "reconnaître · le coefficient", "accroche": acc_proportionnalite,
    },
    "eleveai-maths-6e-pourcentage-nombre": {
        "badge": "MATHS · 6e", "titre": ["LES", "POURCENTAGES"], "taille": 78,
        "sous": "comprendre · calculer", "accroche": acc_pourcentage,
    },
    "eleveai-maths-6e-entier-calcul-mental": {
        "badge": "MATHS · 6e", "titre": ["LE CALCUL", "MENTAL"], "taille": 84,
        "sous": "calculer vite, sans calculatrice", "accroche": acc_calcul_mental,
    },
    "eleveai-maths-6e-aire-longueur": {
        "badge": "MATHS · 6e", "titre": ["LES", "LONGUEURS"], "taille": 84,
        "sous": "mesurer · convertir · comparer", "accroche": acc_longueur,
    },
    "eleveai-maths-6e-aire-perimetre": {
        "badge": "MATHS · 6e", "titre": ["LES", "PÉRIMÈTRES"], "taille": 78,
        "sous": "la longueur du tour", "accroche": acc_perimetre,
    },
    "eleveai-maths-6e-aire-surface": {
        "badge": "MATHS · 6e", "titre": ["LES", "AIRES"], "taille": 84,
        "sous": "compter · multiplier · découper", "accroche": acc_aire,
    },
    "eleveai-maths-6e-volume-solide": {
        "badge": "MATHS · 6e", "titre": ["LES", "VOLUMES"], "taille": 84,
        "sous": "compter les cubes", "accroche": acc_volume,
    },
    "eleveai-maths-6e-angle-mesure": {
        "badge": "MATHS · 6e", "titre": ["LES", "ANGLES"], "taille": 84,
        "sous": "reconnaître · mesurer · tracer", "accroche": acc_angle,
    },
    "eleveai-maths-6e-triangle-figure": {
        "badge": "MATHS · 6e", "titre": ["LES", "TRIANGLES"], "taille": 82,
        "sous": "nommer · reconnaître · calculer", "accroche": acc_triangle,
    },
    "eleveai-maths-6e-quadrilatere-figure": {
        "badge": "MATHS · 6e", "titre": ["LES", "QUADRILATÈRES"], "taille": 54,
        "sous": "rectangle · losange · carré", "accroche": acc_quadrilatere,
    },
    "eleveai-maths-6e-sym-axiale": {
        "badge": "MATHS · 6e", "titre": ["LA", "SYMÉTRIE"], "taille": 80,
        "sous": "le miroir des maths", "accroche": acc_symetrie,
    },
    "eleveai-maths-6e-stat-donnee": {
        "badge": "MATHS · 6e", "titre": ["LIRE DES", "DONNÉES"], "taille": 68,
        "sous": "tableau · graphique · camembert", "accroche": acc_donnees,
    },
    "eleveai-maths-6e-proba-experience": {
        "badge": "MATHS · 6e", "titre": ["LES", "PROBABILITÉS"], "taille": 60,
        "sous": "hasard · issue · certain", "accroche": acc_probabilites,
    },
    "eleveai-maths-6e-algo-programmation": {
        "badge": "MATHS · 6e", "titre": ["ALGO &", "SCRATCH"], "taille": 78,
        "sous": "programmer pas à pas", "accroche": acc_algo,
    },
}


# ── Rendu ──────────────────────────────────────────────────────────────────────
def fond():
    img = Image.new("RGB", (W, H), PAPIER)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 34):
        d.line([(x, 0), (x, H)], fill=CARREAU, width=1)
    for y in range(0, H, 34):
        d.line([(0, y), (W, y)], fill=CARREAU, width=1)
    for x in range(0, W, 170):
        d.line([(x, 0), (x, H)], fill=CARREAU_FORT, width=2)
    for y in range(0, H, 170):
        d.line([(0, y), (W, y)], fill=CARREAU_FORT, width=2)
    return img


def badge(d, x, y, txt):
    f = police("ariblk.ttf", 32)
    l = d.textlength(txt, font=f)
    d.rounded_rectangle([x, y, x + l + 52, y + 58], radius=29, fill=NAVY)
    d.text((x + 26, y + 11), txt, font=f, fill=(255, 255, 255))


def signature(img, d):
    diam, x, y = 128, 60, 556
    av = Image.open(AVATAR).convert("RGBA")
    s = min(av.size)
    av = av.crop(((av.width - s) // 2, (av.height - s) // 2,
                  (av.width + s) // 2, (av.height + s) // 2)).resize((diam, diam), Image.LANCZOS)
    masque = Image.new("L", (diam, diam), 0)
    ImageDraw.Draw(masque).ellipse([0, 0, diam, diam], fill=255)
    img.paste(av, (x, y), masque)
    d.ellipse([x - 4, y - 4, x + diam + 4, y + diam + 4], outline=NAVY, width=6)
    tx = x + diam + 24
    d.text((tx, y + 16), "Frédéric, ton prof", font=police("arialbd.ttf", 34), fill=NAVY)
    d.text((tx, y + 62), "eleveai.fr", font=police("ariblk.ttf", 40), fill=BLEU)


def construire(nom, spec):
    img = fond()
    d = ImageDraw.Draw(img)

    m = Image.open(TI_MARGO).convert("RGBA")
    h = 636
    w = int(m.width * h / m.height)
    m = m.resize((w, h), Image.LANCZOS)
    img.paste(m, (W - w - 4, H - h - 6), m)

    badge(d, 58, 48, spec["badge"])
    ft = police("ariblk.ttf", spec["taille"])
    d.text((56, 116), spec["titre"][0], font=ft, fill=NAVY)
    d.text((56, 208), spec["titre"][1], font=ft, fill=NAVY)
    d.text((58, 300), spec["sous"], font=police("arialbd.ttf", 32), fill=BLEU)

    spec["accroche"](d)
    signature(img, d)

    os.makedirs(SORTIE, exist_ok=True)
    chemin = SORTIE / f"{nom}.png"
    img.save(chemin, "PNG")
    print(chemin)


def main():
    filtre = sys.argv[1] if len(sys.argv) > 1 else None
    for nom, spec in NOTIONS.items():
        if filtre and filtre not in nom:
            continue
        construire(nom, spec)


if __name__ == "__main__":
    main()
