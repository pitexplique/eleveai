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


def acc_decimal_cm2(d):
    # une barre de 10 parts, 7 coloriées → le sens du décimal en CM2 (0,7).
    x0, y0, w, h = 336, 330, 384, 70
    cw = w / 10
    for i in range(10):
        x = x0 + i * cw
        d.rectangle([x, y0, x + cw, y0 + h], fill=(BLEU if i < 7 else PAPIER), outline=NAVY, width=3)
    d.text((x0 + 60, y0 + h + 22), "7/10 = 0,7", font=police("ariblk.ttf", 52), fill=VERT)


def acc_reperage_cm2(d):
    # un quadrillage 5×5 + le point A(2 ; 3) repéré par ses flèches x/y.
    orange = (217, 119, 20)
    n, u, ox, oy = 5, 52, 384, 452  # oy = ligne du bas (origine)
    for i in range(n + 1):
        d.line([(ox + i * u, oy), (ox + i * u, oy - n * u)], fill=(120, 140, 160), width=1)
        d.line([(ox, oy - i * u), (ox + n * u, oy - i * u)], fill=(120, 140, 160), width=1)
    # axes
    d.line([(ox, oy), (ox + n * u + 8, oy)], fill=BLEU, width=4)
    d.line([(ox, oy), (ox, oy - n * u - 8)], fill=VERT, width=4)
    # point A(2 ; 3)
    ax, ay = ox + 2 * u, oy - 3 * u
    d.ellipse([ax - 9, ay - 9, ax + 9, ay + 9], fill=(239, 68, 68), outline=NAVY, width=2)
    centre(d, ax + 44, ay - 6, "A(2 ; 3)", police("arialbd.ttf", 26), (239, 68, 68))
    centre(d, ox + n * u / 2, oy + 34, "on lit x puis y", police("arialbd.ttf", 28), orange)


def acc_suite_cm2(d):
    # une suite de nombres en cases + flèches « +2 » entre elles.
    # Zone sûre : sous le sous-titre, à gauche du margouillat.
    orange = (217, 119, 20)
    valeurs = ["2", "4", "6", "8", "?"]
    cw, gap = 58, 22
    total = len(valeurs) * cw + (len(valeurs) - 1) * gap
    x0, y = 336, 372
    for i, v in enumerate(valeurs):
        x = x0 + i * (cw + gap)
        manquant = v == "?"
        fill = (237, 233, 254) if manquant else PAPIER
        outline = (139, 92, 246) if manquant else BLEU
        col = (109, 40, 217) if manquant else NAVY
        d.rounded_rectangle([x, y, x + cw, y + cw], radius=12, fill=fill, outline=outline, width=4)
        centre(d, x + cw / 2, y + cw / 2 - 20, v, police("ariblk.ttf", 36), col)
        if i > 0:
            fx = x - gap
            d.line([(fx - 2, y + cw / 2), (fx + gap + 2, y + cw / 2)], fill=orange, width=4)
            centre(d, fx + gap / 2, y - 30, "+2", police("arialbd.ttf", 22), orange)
    centre(d, x0 + total / 2, y + cw + 26, "on cherche la règle", police("arialbd.ttf", 28), VERT)


def acc_probleme_cm2(d):
    # un schéma en barres (méthode de Singapour) : total « ? » = 24 + 13.
    orange = (217, 119, 20)
    x0, y0, w = 336, 326, 380
    # accolade du total
    d.line([(x0, y0), (x0 + w, y0)], fill=NAVY, width=4)
    d.line([(x0, y0 - 8), (x0, y0 + 8)], fill=NAVY, width=4)
    d.line([(x0 + w, y0 - 8), (x0 + w, y0 + 8)], fill=NAVY, width=4)
    centre(d, x0 + w / 2, y0 - 44, "?", police("ariblk.ttf", 44), (211, 47, 47))
    # deux segments
    yb = y0 + 30
    seg1 = int(w * 24 / 37)
    d.rectangle([x0, yb, x0 + seg1, yb + 76], fill=(219, 234, 254), outline=NAVY, width=3)
    d.rectangle([x0 + seg1, yb, x0 + w, yb + 76], fill=(220, 252, 231), outline=NAVY, width=3)
    centre(d, x0 + seg1 / 2, yb + 22, "24", police("ariblk.ttf", 34), NAVY)
    centre(d, x0 + seg1 + (w - seg1) / 2, yb + 22, "13", police("ariblk.ttf", 34), NAVY)
    centre(d, x0 + w / 2, yb + 96, "quelle opération ?", police("arialbd.ttf", 30), orange)


def acc_algorithmique_cm2(d):
    # une pile de blocs Scratch (départ jaune · avancer bleu · répéter orange).
    orange = (217, 119, 20)
    blocs = [
        ("quand je clique", (250, 204, 21), NAVY),
        ("avancer de 10", (59, 130, 246), (255, 255, 255)),
        ("répéter 4 fois", (249, 115, 22), (255, 255, 255)),
    ]
    x0, y, w, h, gap = 348, 344, 300, 48, 12
    for i, (txt, fill, col) in enumerate(blocs):
        yy = y + i * (h + gap)
        d.rounded_rectangle([x0, yy, x0 + w, yy + h], radius=12, fill=fill)
        centre(d, x0 + w / 2, yy + h / 2 - 16, txt, police("arialbd.ttf", 26), col)
    centre(d, x0 + w / 2, y + 3 * (h + gap) + 8, "des blocs dans l'ordre", police("arialbd.ttf", 28), VERT)


def acc_algebre_cm2(d):
    # 3 feuilles (chacune « x ») + 2 pastilles visibles → l'expression 3x + 2.
    orange = (217, 119, 20)
    vert_f = (74, 222, 128)
    cx, cy = 336, 330
    # 3 feuilles cachées (ellipses vertes avec x)
    for i in range(3):
        fx = cx + i * 96
        d.ellipse([fx, cy, fx + 74, cy + 56], fill=vert_f, outline=(22, 101, 52), width=3)
        centre(d, fx + 37, cy + 13, "x", police("ariblk.ttf", 30), NAVY)
    # + 2 pastilles visibles
    px = cx + 3 * 96 + 6
    centre(d, px + 6, cy + 12, "+", police("ariblk.ttf", 34), NAVY)
    for j in range(2):
        vx = px + 40 + j * 42
        d.ellipse([vx, cy + 8, vx + 30, cy + 38], fill=(249, 115, 22), outline=NAVY, width=2)
    # l'expression
    centre(d, cx + 190, cy + 96, "3x + 2", police("ariblk.ttf", 48), (109, 40, 217))
    centre(d, cx + 190, cy + 150, "on écrit avec x", police("arialbd.ttf", 28), orange)


def acc_droite_cm2(d):
    # deux droites perpendiculaires (flèches aux bouts) + l'équerre rouge (angle droit).
    orange = (217, 119, 20)
    cx, cy = 520, 360
    lh, lv = 200, 150
    # droite horizontale (verte) avec flèches
    d.line([(cx - lh, cy), (cx + lh, cy)], fill=VERT, width=6)
    for sx in (cx - lh, cx + lh):
        dirx = -1 if sx < cx else 1
        d.polygon([(sx, cy), (sx - dirx * 16, cy - 9), (sx - dirx * 16, cy + 9)], fill=VERT)
    # droite verticale (bleue) avec flèches
    d.line([(cx, cy - lv), (cx, cy + lv)], fill=BLEU, width=6)
    for sy in (cy - lv, cy + lv):
        diry = -1 if sy < cy else 1
        d.polygon([(cx, sy), (cx - 9, sy - diry * 16), (cx + 9, sy - diry * 16)], fill=BLEU)
    # équerre rouge (petit carré au coin haut-droit)
    s = 30
    d.line([(cx + s, cy), (cx + s, cy - s)], fill=(211, 47, 47), width=5)
    d.line([(cx + s, cy - s), (cx, cy - s)], fill=(211, 47, 47), width=5)
    centre(d, cx, cy + lv + 40, "un angle droit", police("arialbd.ttf", 30), orange)


def acc_figure_plane_cm2(d):
    # un trio de figures : triangle (vert) · carré (bleu) · cercle (orange).
    orange = (217, 119, 20)
    y = 300
    # triangle
    d.polygon([(360, y + 110), (470, y + 110), (415, y)], outline=VERT, width=6)
    # carré
    d.rectangle([500, y, 610, y + 110], outline=BLEU, width=6)
    # petits angles droits (coin haut-gauche du carré)
    d.line([(500, y + 22), (522, y + 22)], fill=(211, 47, 47), width=4)
    d.line([(522, y + 22), (522, y)], fill=(211, 47, 47), width=4)
    # cercle
    d.ellipse([640, y, 750, y + 110], outline=orange, width=6)
    d.line([(695, y + 55), (750, y + 55)], fill=NAVY, width=4)  # rayon
    d.ellipse([691, y + 51, 699, y + 59], fill=(211, 47, 47))   # centre
    centre(d, 555, y + 150, "compte les côtés", police("arialbd.ttf", 30), VERT)


def acc_echelle_cm2(d):
    # deux segments (plan court bleu · réalité long vert) + le ratio 1 cm → 10 m.
    orange = (217, 119, 20)
    x0 = 372
    # plan
    a_droite(d, x0 - 14, 348, "plan", police("arialbd.ttf", 24), (100, 116, 139))
    d.line([(x0, 360), (x0 + 70, 360)], fill=BLEU, width=7)
    d.ellipse([x0 - 5, 355, x0 + 5, 365], fill=NAVY)
    d.ellipse([x0 + 65, 355, x0 + 75, 365], fill=NAVY)
    centre(d, x0 + 35, 372, "1 cm", police("arialbd.ttf", 22), BLEU)
    # réalité
    a_droite(d, x0 - 14, 420, "réel", police("arialbd.ttf", 24), (100, 116, 139))
    d.line([(x0, 432), (x0 + 290, 432)], fill=VERT, width=7)
    d.ellipse([x0 - 5, 427, x0 + 5, 437], fill=NAVY)
    d.ellipse([x0 + 285, 427, x0 + 295, 437], fill=NAVY)
    centre(d, x0 + 145, 444, "10 m", police("arialbd.ttf", 22), VERT)
    centre(d, x0 + 145, 490, "1 cm → 10 m", police("ariblk.ttf", 38), orange)


def acc_probabilite_cm2(d):
    # un dé (face 5) + un sac de billes (3 rouges · 2 bleues · 1 verte).
    orange = (217, 119, 20)
    # dé
    dx, dy, ds = 356, 352, 116
    d.rounded_rectangle([dx, dy, dx + ds, dy + ds], radius=16, fill=PAPIER, outline=NAVY, width=4)
    for (px, py) in [(0.28, 0.28), (0.72, 0.28), (0.5, 0.5), (0.28, 0.72), (0.72, 0.72)]:
        cxp, cyp = dx + px * ds, dy + py * ds
        d.ellipse([cxp - 10, cyp - 10, cxp + 10, cyp + 10], fill=NAVY)
    # billes (2 rangées de 3)
    couleurs = [(239, 68, 68), (239, 68, 68), (239, 68, 68), (59, 130, 246), (59, 130, 246), (34, 197, 94)]
    bx, by, r = 540, 356, 26
    for i, col in enumerate(couleurs):
        cxb = bx + (i % 3) * (2 * r + 16)
        cyb = by + (i // 3) * (2 * r + 16)
        d.ellipse([cxb, cyb, cxb + 2 * r, cyb + 2 * r], fill=col, outline=NAVY, width=3)
    centre(d, 512, dy + ds + 44, "certain · possible · impossible", police("arialbd.ttf", 30), orange)


def acc_graphique_cm2(d):
    # un diagramme en barres (4 barres de hauteurs différentes) + axes.
    orange = (217, 119, 20)
    bx, by = 360, 452  # origine (bas-gauche)
    haut = 150
    d.line([(bx, by), (bx + 320, by)], fill=(255, 255, 255), width=4)  # axe x
    d.line([(bx, by), (bx, by - haut - 20)], fill=(255, 255, 255), width=4)  # axe y
    valeurs = [12, 9, 7, 10]
    cols = [(191, 219, 254), (254, 205, 211), (187, 247, 208), (253, 230, 138)]
    bw = 60
    for i, (v, col) in enumerate(zip(valeurs, cols)):
        x = bx + 18 + i * (bw + 16)
        h = v * (haut / 12)
        d.rectangle([x, by - h, x + bw, by], fill=col, outline=NAVY, width=2)
    centre(d, bx + 160, by + 40, "la plus haute = le plus", police("arialbd.ttf", 28), orange)


def acc_tableau_cm2(d):
    # un petit tableau 4×4 avec la case du croisement (bananes × mercredi) surlignée.
    orange = (217, 119, 20)
    data = [["", "L", "M", "M"],
            ["An", "18", "24", "20"],
            ["Ba", "30", "28", "35"],
            ["Ma", "12", "15", "18"]]
    cw, ch, x0, y0 = 88, 58, 336, 256
    for r in range(4):
        for c in range(4):
            x, y = x0 + c * cw, y0 + r * ch
            head = (r == 0 or c == 0)
            hit = (r == 2 and c == 3)  # bananes × mercredi
            fill = VERT if hit else ((28, 51, 71) if head else PAPIER)
            d.rectangle([x, y, x + cw, y + ch], fill=fill, outline=NAVY, width=2)
            col = (255, 255, 255) if (head or hit) else NAVY
            centre(d, x + cw / 2, y + ch / 2 - 2, data[r][c], police("arialbd.ttf", 26), col)
    centre(d, x0 + 2 * cw, y0 + 4 * ch + 30, "une case = ligne × colonne", police("arialbd.ttf", 28), orange)


def acc_longueur_cm2(d):
    # une règle graduée + le rappel 1 m = 100 cm.
    orange = (217, 119, 20)
    x0, x1, y = 300, 724, 340
    d.rectangle([x0, y, x1, y + 54], fill=(18, 51, 51), outline=NAVY, width=3)
    for i in range(21):
        gx = x0 + (x1 - x0) * i / 20
        h = 24 if i % 5 == 0 else 13
        d.line([(gx, y), (gx, y + h)], fill=(255, 255, 255), width=2)
    centre(d, (x0 + x1) / 2, y + 104, "1 m = 100 cm  ·  1 km = 1000 m", police("arialbd.ttf", 30), orange)


def acc_contenance_cm2(d):
    # un bocal rempli aux 3/4 + le rappel 1 L = 1000 mL.
    orange = (217, 119, 20)
    x0, y0, w, h = 452, 272, 120, 180
    niveau = y0 + h * 0.28  # rempli à ~72 %
    d.rectangle([x0, niveau, x0 + w, y0 + h], fill=BLEU, outline=NAVY, width=2)
    # contour du bocal (3 côtés, ouvert en haut)
    d.line([(x0, y0), (x0, y0 + h)], fill=(255, 255, 255), width=5)
    d.line([(x0, y0 + h), (x0 + w, y0 + h)], fill=(255, 255, 255), width=5)
    d.line([(x0 + w, y0), (x0 + w, y0 + h)], fill=(255, 255, 255), width=5)
    centre(d, x0 + w / 2, y0 + h + 40, "1 L = 1000 mL", police("ariblk.ttf", 40), orange)


def acc_masse_cm2(d):
    # une balance à fléau qui penche + le rappel 1 kg = 1000 g.
    orange = (217, 119, 20)
    cx, cy = 512, 360
    d.line([(cx - 70, cy + 90), (cx + 70, cy + 90)], fill=(255, 255, 255), width=6)  # socle
    d.line([(cx, cy + 90), (cx, cy - 30)], fill=(255, 255, 255), width=6)            # colonne
    dy = 26
    left = (cx - 120, cy - 30 + dy)
    right = (cx + 120, cy - 30 - dy)
    d.line([left, right], fill=BLEU, width=6)  # fléau penché vers la droite
    for (px, py), col in ((left, (148, 163, 184)), (right, VERT)):
        d.line([(px, py), (px - 34, py + 44)], fill=(255, 255, 255), width=2)
        d.line([(px, py), (px + 34, py + 44)], fill=(255, 255, 255), width=2)
        d.arc([px - 40, py + 20, px + 40, py + 70], start=0, end=180, fill=col, width=5)
    centre(d, cx, cy + 130, "1 kg = 1000 g", police("ariblk.ttf", 40), orange)


def acc_pourcentage_cm2(d):
    # une grille de 100 cases, 50 coloriées → 50 % = la moitié.
    gx, gy, cs = 388, 300, 25
    for r in range(10):
        for c in range(10):
            x, y = gx + c * cs, gy + r * cs
            fill = BLEU if r < 5 else PAPIER
            d.rectangle([x, y, x + cs, y + cs], fill=fill, outline=NAVY, width=1)
    centre(d, gx + 5 * cs, gy + 10 * cs + 32, "50 % = 50/100 = la moitié", police("arialbd.ttf", 30), VERT)


def acc_duree_cm2(d):
    # une horloge qui montre 7 h 15 + le rappel 1 h = 60 min.
    import math
    orange = (217, 119, 20)
    cx, cy, r = 512, 372, 92
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(11, 27, 43), outline=NAVY, width=5)
    for k in range(12):
        ang = math.radians(90 - k * 30)
        x1, y1 = cx + (r - 12) * math.cos(ang), cy - (r - 12) * math.sin(ang)
        x2, y2 = cx + r * math.cos(ang), cy - r * math.sin(ang)
        d.line([(x1, y1), (x2, y2)], fill=(255, 255, 255), width=3)
    # aiguille des heures (vers ~7) et des minutes (vers 3 = 15 min)
    ah = math.radians(90 - (7 + 15 / 60) * 30)
    am = math.radians(90 - 15 * 6)
    d.line([(cx, cy), (cx + 0.5 * r * math.cos(ah), cy - 0.5 * r * math.sin(ah))], fill=BLEU, width=7)
    d.line([(cx, cy), (cx + 0.82 * r * math.cos(am), cy - 0.82 * r * math.sin(am))], fill=(239, 68, 68), width=5)
    d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=JAUNE)
    centre(d, cx, cy + r + 34, "7 h 15   ·   1 h = 60 min", police("arialbd.ttf", 30), VERT)


def acc_calcul_cm2(d):
    # une addition posée avec retenue : 487 + 268 = 755.
    orange = (217, 119, 20)
    xr = [452, 512, 572]  # colonnes centaines / dizaines / unités
    # retenues (petit, en haut)
    for x in (xr[0], xr[1]):
        centre(d, x, 300, "1", police("arialbd.ttf", 26), orange)
    for i, c in enumerate("487"):
        centre(d, xr[i], 336, c, police("ariblk.ttf", 48), NAVY)
    centre(d, xr[0] - 58, 388, "+", police("ariblk.ttf", 44), orange)
    for i, c in enumerate("268"):
        centre(d, xr[i], 388, c, police("ariblk.ttf", 48), NAVY)
    d.line([(xr[0] - 44, 424), (xr[2] + 30, 424)], fill=NAVY, width=4)
    for i, c in enumerate("755"):
        centre(d, xr[i], 456, c, police("ariblk.ttf", 48), VERT)


def acc_entier_cm2(d):
    # le tableau de numération : 4 colonnes (M · C · D · U) avec 4 273 dedans.
    cols = ["M", "C", "D", "U"]
    chiffres = ["4", "2", "7", "3"]
    cw, x0, y0, h = 96, 320, 322, 84
    for i in range(4):
        x = x0 + i * cw
        centre(d, x + cw / 2, y0 - 30, cols[i], police("arialbd.ttf", 30), VERT)
        d.rectangle([x, y0, x + cw, y0 + h], fill=PAPIER, outline=NAVY, width=3)
        centre(d, x + cw / 2, y0 + h / 2 - 4, chiffres[i], police("ariblk.ttf", 56), BLEU)
    centre(d, x0 + 2 * cw, y0 + h + 34, "4 273 = 4 000 + 200 + 70 + 3", police("arialbd.ttf", 30), VERT)


def acc_symetrie_cm2(d):
    # un axe vertical (miroir) + une figure en L bleue et son image verte.
    ax = 512
    for yy in range(300, 476, 15):
        d.line([(ax, yy), (ax, yy + 8)], fill=JAUNE, width=3)
    gauche = [(404, 312), (404, 462), (474, 462), (474, 386), (450, 386), (450, 312)]
    d.polygon(gauche, fill=BLEU, outline=NAVY)
    droite = [(2 * ax - x, y) for (x, y) in gauche]
    d.polygon(droite, fill=VERT, outline=NAVY)


def acc_angle_cm2(d):
    # les trois familles côte à côte : aigu (vert), droit (bleu + équerre), obtus (orange).
    import math
    L = 76
    orange = (217, 119, 20)

    def un_angle(ox, oy, deg, col, lab, equerre=False):
        d.line([(ox, oy), (ox + L, oy)], fill=col, width=7)
        ex = ox + L * math.cos(math.radians(deg))
        ey = oy - L * math.sin(math.radians(deg))
        d.line([(ox, oy), (ex, ey)], fill=col, width=7)
        d.arc([ox - 30, oy - 30, ox + 30, oy + 30], start=360 - deg, end=360, fill=col, width=5)
        if equerre:
            d.rectangle([ox, oy - 22, ox + 22, oy], outline=col, width=3)
        d.ellipse([ox - 6, oy - 6, ox + 6, oy + 6], fill=NAVY)
        centre(d, ox, oy + 20, lab, police("ariblk.ttf", 30), col)

    un_angle(376, 402, 40, VERT, "aigu")
    un_angle(524, 402, 90, BLEU, "droit", equerre=True)
    un_angle(672, 402, 130, orange, "obtus")


def acc_solide_cm2(d):
    # un cube en perspective, ses sommets marqués + la légende 6 · 8 · 12.
    ox, oy, s, dp = 512, 476, 132, 54
    A, B, C, D = (ox, oy - s), (ox + s, oy - s), (ox + s, oy), (ox, oy)
    Ab, Bb, Cb = (ox + dp, oy - s - dp), (ox + s + dp, oy - s - dp), (ox + s + dp, oy - dp)
    d.polygon([A, B, Bb, Ab], fill=(120, 175, 235), outline=NAVY)   # dessus
    d.polygon([B, C, Cb, Bb], fill=(24, 70, 130), outline=NAVY)     # côté droit
    d.polygon([A, B, C, D], fill=BLEU, outline=NAVY)                # face avant
    for sx, sy in (A, B, C, D, Ab, Bb, Cb):
        d.ellipse([sx - 7, sy - 7, sx + 7, sy + 7], fill=NAVY, outline=(255, 255, 255), width=2)
    centre(d, ox + (s + dp) / 2, oy + 16, "6 faces · 8 sommets · 12 arêtes", police("arialbd.ttf", 30), VERT)


def acc_aire_cm2(d):
    # une grille 4 × 3 remplie (la surface) + A = 4 × 3 = 12 cm².
    gx, gy, cs = 388, 322, 42
    for r in range(3):
        for c in range(4):
            x, y = gx + c * cs, gy + r * cs
            d.rectangle([x, y, x + cs, y + cs], fill=BLEU, outline=PAPIER, width=2)
    d.text((gx - 24, gy + 3 * cs + 20), "A = 4 × 3 = 12 cm²", font=police("arialbd.ttf", 38), fill=VERT)


def acc_perimetre_cm2(d):
    # un rectangle dont le TOUR est surligné (vert) + P = 2 × (L + l).
    x0, y0, w, h = 372, 318, 272, 150
    d.rectangle([x0, y0, x0 + w, y0 + h], outline=VERT, width=10)
    d.text((x0 + 44, y0 + 48), "le tour", font=police("ariblk.ttf", 40), fill=NAVY)
    d.text((x0 - 20, y0 + h + 22), "P = 2 × (L + l)", font=police("ariblk.ttf", 40), fill=BLEU)


def acc_proportionnalite_cm2(d):
    # un petit tableau de proportionnalité : 2 6 / 4 12 avec × 3.
    x0, y0, cw, ch = 352, 330, 96, 66
    f = police("ariblk.ttf", 34)
    vals = [["2", "6"], ["4", "12"]]
    cols = [BLEU, VERT]
    for r in range(2):
        for c in range(2):
            x, y = x0 + c * cw, y0 + r * ch
            d.rectangle([x, y, x + cw, y + ch], outline=NAVY, width=3)
            centre(d, x + cw / 2, y + 14, vals[r][c], f, cols[r])
    d.text((x0 + 2 * cw + 24, y0 + 24), "× 3", font=police("ariblk.ttf", 42), fill=(176, 84, 20))


def acc_division_cm2(d):
    # une potence : 37 | 5, quotient 7, reste 2 (le cœur du cours CM2).
    f = police("arialbd.ttf", 60)
    cx, cy = 452, 344
    a_droite(d, cx - 6, cy, "37", f, BLEU)
    d.line([(cx + 18, cy - 8), (cx + 18, cy + 130)], fill=NAVY, width=5)
    d.text((cx + 40, cy), "5", font=f, fill=BLEU)
    d.line([(cx + 18, cy + 74), (cx + 120, cy + 74)], fill=NAVY, width=5)
    d.text((cx + 40, cy + 82), "7", font=f, fill=VERT)
    d.text((cx - 6, cy + 150), "reste 2", font=police("arialbd.ttf", 40), fill=(217, 119, 20))


def acc_multiplication_cm2(d):
    # la multiplication posée 247 × 4 = 988 (le cœur du cours CM2).
    f = police("arialbd.ttf", 62)
    xd, yh = 664, 322
    a_droite(d, xd, yh, "247", f, BLEU)
    d.text((452, yh + 74), "×", font=f, fill=BLEU)
    a_droite(d, xd, yh + 74, "4", f, BLEU)
    d.rounded_rectangle([452, yh + 156, xd, yh + 168], radius=6, fill=JAUNE)
    a_droite(d, xd, yh + 178, "988", f, VERT)


def acc_fraction_cm2(d):
    # une barre de 4 parts, 3 coloriées → 3/4 (le sens de la fraction en CM2).
    x0, y0, w, h = 340, 336, 376, 78
    cw = w / 4
    for i in range(4):
        x = x0 + i * cw
        d.rectangle([x, y0, x + cw, y0 + h], fill=(BLEU if i < 3 else PAPIER), outline=NAVY, width=3)
    d.text((x0 + 96, y0 + h + 20), "3 sur 4 = 3/4", font=police("ariblk.ttf", 48), fill=VERT)


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


def acc_algo_5e(d):
    # blocs Scratch empilés (répéter + avancer + tourner) + un petit carré tracé.
    orange = (217, 119, 20)
    x0, y0, bw, bh, gap = 360, 320, 210, 46, 14
    cols = [orange, BLEU, VERT]
    labels = ["répéter 4 fois", "avancer", "tourner 90°"]
    f = police("arialbd.ttf", 24)
    for i, (col, lab) in enumerate(zip(cols, labels)):
        yy = y0 + i * (bh + gap)
        xx = x0 + (18 if i else 0)
        d.rounded_rectangle([xx, yy, xx + bw - (18 if i else 0), yy + bh], radius=9, fill=col, outline=NAVY, width=2)
        d.text((xx + 14, yy + 10), lab, font=f, fill=(255, 255, 255))
    # petit carré « tracé »
    sx, sy, s = 616, 400, 66
    d.line([(sx, sy), (sx + s, sy), (sx + s, sy - s), (sx, sy - s), (sx, sy)], fill=BLEU, width=6, joint="curve")


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


def acc_eau_974(d):
    # l'effet de foehn en un dessin : montagne, nuage + pluie à l'Est, soleil à l'Ouest.
    import math
    orange = (217, 119, 20)
    # la montagne (coupe de l'île)
    d.polygon([(330, 508), (430, 468), (520, 346), (610, 468), (710, 508)], fill=(90, 106, 128), outline=NAVY)
    # la mer
    d.rectangle([310, 508, 730, 530], fill=BLEU)
    # le soleil à l'Ouest (gauche)
    sx, sy, sr = 366, 372, 26
    d.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=JAUNE)
    for a in range(0, 360, 45):
        x1 = sx + int((sr + 6) * math.cos(math.radians(a)))
        y1 = sy + int((sr + 6) * math.sin(math.radians(a)))
        x2 = sx + int((sr + 18) * math.cos(math.radians(a)))
        y2 = sy + int((sr + 18) * math.sin(math.radians(a)))
        d.line([(x1, y1), (x2, y2)], fill=JAUNE, width=4)
    # le nuage à l'Est (droite) + la pluie
    cx, cy = 628, 372
    for dx, dy, r in [(-26, 6, 20), (0, -6, 26), (26, 6, 20)]:
        d.ellipse([cx + dx - r, cy + dy - r, cx + dx + r, cy + dy + r], fill=(120, 132, 150), outline=NAVY)
    for i in range(5):
        x = cx - 34 + i * 17
        d.line([(x, cy + 34), (x - 6, cy + 58)], fill=BLEU, width=5)
    # « 20 × plus » : le chiffre qui accroche
    d.text((430, 536), "20 × plus de pluie à l'Est !", font=police("arialbd.ttf", 30), fill=orange)


def acc_lait_974(d):
    # une vache + une flèche vers un fromage : le lait qui se transforme.
    import math
    orange = (217, 119, 20)
    rose = (232, 120, 160)
    # le pré
    d.rectangle([310, 486, 500, 530], fill=(90, 170, 100))
    # la vache (blanche à taches, tête à droite)
    bx, by = 340, 400  # coin haut-gauche du corps
    d.rounded_rectangle([bx, by, bx + 150, by + 80], radius=22, fill=(255, 255, 255), outline=NAVY, width=3)
    for sx, sy, sr in [(bx + 40, by + 30, 16), (bx + 95, by + 45, 13), (bx + 70, by + 18, 10)]:
        d.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=NAVY)
    for lx in (bx + 25, bx + 60, bx + 95, bx + 128):
        d.rectangle([lx, by + 80, lx + 10, by + 108], fill=(255, 255, 255), outline=NAVY, width=2)
    d.ellipse([bx + 140, by + 8, bx + 190, by + 68], fill=(255, 255, 255), outline=NAVY, width=3)  # tête
    d.ellipse([bx + 168, by + 34, bx + 196, by + 58], fill=rose, outline=NAVY, width=2)  # museau
    d.ellipse([bx + 60, by + 66, bx + 84, by + 84], fill=rose)  # pis
    # flèche
    d.line([(bx + 205, by + 40), (bx + 265, by + 40)], fill=orange, width=8)
    d.polygon([(bx + 265, by + 28), (bx + 285, by + 40), (bx + 265, by + 52)], fill=orange)
    # le fromage (meule jaune à trous)
    fx, fy = bx + 300, by + 6
    d.ellipse([fx, fy, fx + 130, fy + 40], fill=JAUNE, outline=orange, width=3)
    d.rectangle([fx, fy + 20, fx + 130, fy + 66], fill=JAUNE, outline=orange, width=3)
    d.ellipse([fx, fy + 46, fx + 130, fy + 86], fill=JAUNE, outline=orange, width=3)
    for hx, hy, hr in [(fx + 40, fy + 46, 7), (fx + 85, fy + 56, 9), (fx + 62, fy + 34, 6)]:
        d.ellipse([hx - hr, hy - hr, hx + hr, hy + hr], fill=orange)
    d.text((360, 540), "10 litres de lait → 1 kg de fromage", font=police("arialbd.ttf", 28), fill=BLEU)


def acc_cyclone_974(d):
    # une spirale de cyclone (bras + œil) + le record « 1 692 mm ».
    import math
    cx, cy = 470, 400
    for k in range(3):
        offset = k * 2 * math.pi / 3
        pts = []
        for i in range(46):
            t = 0.35 + (3.05 - 0.35) * i / 45
            r = 30 * math.exp(0.30 * t)
            a = 1.5 * t + offset
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
        d.line(pts, fill=BLEU, width=9, joint="curve")
    d.ellipse([cx - 26, cy - 26, cx + 26, cy + 26], fill=NAVY, outline=(255, 255, 255), width=4)
    d.text((300, 512), "record du monde : 1 692 mm / 24 h", font=police("arialbd.ttf", 28), fill=VERT)


def acc_volcan_974(d):
    # un cône de volcan + gerbe de lave (rouge/orange) + coulée.
    orange = (255, 106, 0)
    rouge = (211, 47, 47)
    # cône
    d.polygon([(360, 500), (455, 330), (545, 330), (640, 500)], fill=(61, 43, 36), outline=(150, 150, 150))
    # gerbe de lave
    for i, dx in enumerate(range(-36, 37, 12)):
        x = 500 + dx
        h = 70 - abs(dx) // 2
        col = rouge if i % 2 else orange
        d.line([(x, 330), (x + dx // 3, 330 - h)], fill=col, width=6)
    for gx, gy in [(482, 258), (516, 250), (500, 240)]:
        d.ellipse([gx - 6, gy - 6, gx + 6, gy + 6], fill=JAUNE)
    # coulée qui descend
    d.line([(540, 350), (600, 430), (640, 495)], fill=orange, width=12, joint="curve")
    d.text((330, 520), "1 100 °C · le volcan fabrique l'île", font=police("arialbd.ttf", 27), fill=orange)


def acc_requin_974(d):
    # un requin GENTIL (souriant) + le renversement « 100 M vs 10 ».
    bleu = (110, 144, 176)
    ventre = (201, 220, 235)
    cx, cy = 470, 400
    # corps
    d.ellipse([cx - 130, cy - 52, cx + 130, cy + 52], fill=bleu)
    d.ellipse([cx - 108, cy + 6, cx + 108, cy + 40], fill=ventre)
    # queue
    d.polygon([(cx - 120, cy), (cx - 190, cy - 46), (cx - 158, cy), (cx - 190, cy + 46)], fill=bleu)
    # dorsale
    d.polygon([(cx - 10, cy - 46), (cx + 26, cy - 104), (cx + 52, cy - 46)], fill=bleu)
    # oeil + sourire
    d.ellipse([cx + 78, cy - 22, cx + 104, cy + 4, ], fill=(255, 255, 255))
    d.ellipse([cx + 88, cy - 16, cx + 102, cy - 2], fill=(0, 0, 0))
    d.arc([cx + 74, cy - 6, cx + 118, cy + 30], start=200, end=340, fill=(0, 0, 0), width=3)
    d.text((300, 512), "requins : 10  ·  humains : 100 000 000", font=police("arialbd.ttf", 26), fill=ROUGE)


def acc_canne_974(d):
    # de la canne (tiges vertes) + une flèche vers un morceau de sucre + une ampoule.
    vert = (139, 195, 74)
    vertf = (85, 139, 47)
    orange = (255, 160, 0)
    # 3 tiges de canne
    for i, x in enumerate((360, 392, 424)):
        d.rounded_rectangle([x, 330, x + 14, 470], radius=6, fill=vert)
        for yy in range(350, 460, 26):
            d.line([(x, yy), (x + 14, yy)], fill=vertf, width=3)
        d.polygon([(x + 7, 330), (x - 18, 292), (x + 5, 322)], fill=vertf)
        d.polygon([(x + 7, 330), (x + 32, 296), (x + 9, 322)], fill=vertf)
    # flèche
    d.line([(470, 400), (528, 400)], fill=orange, width=8)
    d.polygon([(528, 388), (548, 400), (528, 412)], fill=orange)
    # morceau de sucre (cube)
    d.polygon([(566, 396), (606, 372), (646, 396), (606, 420)], fill=(242, 228, 196), outline=(180, 160, 120))
    d.rectangle([566, 396, 646, 440], fill=(242, 228, 196), outline=(180, 160, 120))
    d.polygon([(566, 440), (606, 464), (646, 440), (606, 416)], fill=(224, 208, 172), outline=(180, 160, 120))
    # petite ampoule (le "et de la lumière")
    d.ellipse([672, 372, 712, 412], fill=JAUNE, outline=orange, width=3)
    d.rectangle([684, 408, 700, 424], fill=(150, 150, 150))
    d.text((300, 512), "du sucre... ET de la lumière", font=police("arialbd.ttf", 28), fill=vertf)


def acc_barrage_974(d):
    # la falaise + la conduite forcée qui plonge + la turbine + l'ampoule :
    # l'eau qui tombe devient la lumière (l'épisode Takamaka).
    import math
    gris = (108, 117, 125)
    grisf = (73, 80, 87)
    orange = (255, 160, 0)
    # (décalé à droite : le dessin recouvrait le sous-titre, vu au 1er rendu)
    # la falaise (versant sombre)
    d.polygon([(400, 300), (500, 300), (630, 470), (400, 470)], fill=grisf, outline=gris)
    # la forêt au sommet (3 sapins)
    for x in (418, 450, 482):
        d.polygon([(x - 14, 302), (x, 268), (x + 14, 302)], fill=(85, 139, 47))
    # la conduite forcée : tube gris + âme bleue
    d.line([(470, 310), (610, 452)], fill=gris, width=18)
    d.line([(470, 310), (610, 452)], fill=BLEU, width=9)
    # la turbine : roue à rayons
    cx, cy, r = 650, 452, 34
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=BLEU, width=6)
    for k in range(4):
        a = k * math.pi / 4
        d.line([(cx - r * math.cos(a), cy - r * math.sin(a)),
                (cx + r * math.cos(a), cy + r * math.sin(a))], fill=BLEU, width=5)
    # la flèche vers l'ampoule
    d.line([(690, 430), (734, 402)], fill=orange, width=7)
    d.polygon([(728, 390), (750, 392), (738, 410)], fill=orange)
    # l'ampoule
    d.ellipse([742, 358, 786, 402], fill=JAUNE, outline=orange, width=3)
    d.rectangle([756, 398, 772, 414], fill=(150, 150, 150))
    d.text((386, 512), "l'eau tombe de 500 m → l'île s'allume", font=police("arialbd.ttf", 27), fill=BLEU)


# ── LE REGISTRE : une entrée par notion ────────────────────────────────────────
NOTIONS = {
    "eleveai-maths-974-barrage-takamaka": {
        "badge": "L'ÎLE DE LA RÉUNION · EN VRAI", "titre": ["LE BARRAGE", "DE TAKAMAKA"], "taille": 62,
        "sous": "l'eau qui allume l'île", "accroche": acc_barrage_974,
    },
    "eleveai-maths-974-canne-sucre-reunion": {
        "badge": "L'ÎLE DE LA RÉUNION · EN VRAI", "titre": ["LA CANNE", "À SUCRE"], "taille": 78,
        "sous": "du champ au sucre, par des hommes", "accroche": acc_canne_974,
    },
    "eleveai-maths-974-requin-reunion": {
        "badge": "L'ÎLE DE LA RÉUNION · EN VRAI", "titre": ["LES", "REQUINS"], "taille": 84,
        "sous": "la peur, le vrai risque, l'océan", "accroche": acc_requin_974,
    },
    "eleveai-maths-974-volcan-reunion": {
        "badge": "L'ÎLE DE LA RÉUNION · EN VRAI", "titre": ["LE PITON DE", "LA FOURNAISE"], "taille": 62,
        "sous": "un volcan qui fabrique l'île", "accroche": acc_volcan_974,
    },
    "eleveai-maths-974-cyclone-reunion": {
        "badge": "L'ÎLE DE LA RÉUNION · EN VRAI", "titre": ["LES", "CYCLONES"], "taille": 82,
        "sous": "l'œil, les vents, le record du monde", "accroche": acc_cyclone_974,
    },
    "eleveai-maths-974-lait-reunion": {
        "badge": "L'ÎLE DE LA RÉUNION · EN VRAI", "titre": ["LE LAIT DE", "L'ÎLE DE LA RÉUNION"], "taille": 52,
        "sous": "du pré des hauts à ton yaourt", "accroche": acc_lait_974,
    },
    "eleveai-maths-974-circulation-eau": {
        "badge": "L'ÎLE DE LA RÉUNION · EN VRAI", "titre": ["L'EAU DE", "L'ÎLE DE LA RÉUNION"], "taille": 52,
        "sous": "de l'océan à ton robinet", "accroche": acc_eau_974,
    },
    "eleveai-maths-cm2-nombre-entier": {
        "badge": "MATHS · CM2", "titre": ["LES NOMBRES", "ENTIERS"], "taille": 84,
        "sous": "numération · comparer · arrondir", "accroche": acc_entier_cm2,
    },
    "eleveai-maths-cm2-nombre-decimal": {
        "badge": "MATHS · CM2", "titre": ["LES NOMBRES", "DÉCIMAUX"], "taille": 84,
        "sous": "dixièmes · comparer · arrondir", "accroche": acc_decimal_cm2,
    },
    "eleveai-maths-cm2-calcul": {
        "badge": "MATHS · CM2", "titre": ["LE", "CALCUL"], "taille": 84,
        "sous": "posé · décimaux · priorités", "accroche": acc_calcul_cm2,
    },
    "eleveai-maths-cm2-duree": {
        "badge": "MATHS · CM2", "titre": ["LES", "DURÉES"], "taille": 84,
        "sous": "l'heure · convertir · calculer", "accroche": acc_duree_cm2,
    },
    "eleveai-maths-cm2-pourcentage": {
        "badge": "MATHS · CM2", "titre": ["LES", "POURCENTAGES"], "taille": 66,
        "sous": "sur 100 · fractions · réductions", "accroche": acc_pourcentage_cm2,
    },
    "eleveai-maths-cm2-masse": {
        "badge": "MATHS · CM2", "titre": ["LES", "MASSES"], "taille": 84,
        "sous": "estimer · comparer · convertir", "accroche": acc_masse_cm2,
    },
    "eleveai-maths-cm2-contenance": {
        "badge": "MATHS · CM2", "titre": ["LES", "CONTENANCES"], "taille": 68,
        "sous": "litre · millilitre · convertir", "accroche": acc_contenance_cm2,
    },
    "eleveai-maths-cm2-longueur": {
        "badge": "MATHS · CM2", "titre": ["LES", "LONGUEURS"], "taille": 78,
        "sous": "mm · cm · m · km", "accroche": acc_longueur_cm2,
    },
    "eleveai-maths-cm2-tableau": {
        "badge": "MATHS · CM2", "titre": ["LIRE UN", "TABLEAU"], "taille": 78,
        "sous": "ligne · colonne · total", "accroche": acc_tableau_cm2,
    },
    "eleveai-maths-cm2-graphique": {
        "badge": "MATHS · CM2", "titre": ["LIRE UN", "GRAPHIQUE"], "taille": 74,
        "sous": "barres · bâtons · camembert", "accroche": acc_graphique_cm2,
    },
    "eleveai-maths-cm2-reperage": {
        "badge": "MATHS · CM2", "titre": ["LE", "REPÉRAGE"], "taille": 84,
        "sous": "quadrillage · coordonnées (x ; y)", "accroche": acc_reperage_cm2,
    },
    "eleveai-maths-cm2-suite": {
        "badge": "MATHS · CM2", "titre": ["LES", "SUITES"], "taille": 84,
        "sous": "trouver la règle · continuer", "accroche": acc_suite_cm2,
    },
    "eleveai-maths-cm2-probleme": {
        "badge": "MATHS · CM2", "titre": ["RÉSOUDRE UN", "PROBLÈME"], "taille": 60,
        "sous": "comprendre · calculer · rédiger", "accroche": acc_probleme_cm2,
    },
    "eleveai-maths-cm2-algorithmique": {
        "badge": "MATHS · CM2", "titre": ["L'ALGO-", "RITHMIQUE"], "taille": 64,
        "sous": "programmer avec Scratch", "accroche": acc_algorithmique_cm2,
    },
    "eleveai-maths-cm2-algebre": {
        "badge": "MATHS · CM2", "titre": ["LES DÉBUTS", "DE L'ALGÈBRE"], "taille": 62,
        "sous": "le nombre inconnu x", "accroche": acc_algebre_cm2,
    },
    "eleveai-maths-cm2-droite": {
        "badge": "MATHS · CM2", "titre": ["LES", "DROITES"], "taille": 84,
        "sous": "parallèles · perpendiculaires", "accroche": acc_droite_cm2,
    },
    "eleveai-maths-cm2-figure-plane": {
        "badge": "MATHS · CM2", "titre": ["LES FIGURES", "PLANES"], "taille": 64,
        "sous": "triangle · carré · cercle", "accroche": acc_figure_plane_cm2,
    },
    "eleveai-maths-cm2-echelle": {
        "badge": "MATHS · CM2", "titre": ["LES", "ÉCHELLES"], "taille": 84,
        "sous": "du plan à la réalité", "accroche": acc_echelle_cm2,
    },
    "eleveai-maths-cm2-probabilite": {
        "badge": "MATHS · CM2", "titre": ["LES", "PROBABILITÉS"], "taille": 62,
        "sous": "le hasard · les chances", "accroche": acc_probabilite_cm2,
    },
    "eleveai-maths-cm2-fraction": {
        "badge": "MATHS · CM2", "titre": ["LES", "FRACTIONS"], "taille": 84,
        "sous": "lire · dessiner · placer", "accroche": acc_fraction_cm2,
    },
    "eleveai-maths-cm2-multiplication": {
        "badge": "MATHS · CM2", "titre": ["LA", "MULTIPLICATION"], "taille": 60,
        "sous": "tables · de tête · en colonnes", "accroche": acc_multiplication_cm2,
    },
    "eleveai-maths-cm2-division": {
        "badge": "MATHS · CM2", "titre": ["LA", "DIVISION"], "taille": 84,
        "sous": "partager · quotient · reste", "accroche": acc_division_cm2,
    },
    "eleveai-maths-cm2-proportionnalite": {
        "badge": "MATHS · CM2", "titre": ["LA", "PROPORTIONNALITÉ"], "taille": 56,
        "sous": "le coefficient · le retour à l'unité", "accroche": acc_proportionnalite_cm2,
    },
    "eleveai-maths-cm2-perimetre": {
        "badge": "MATHS · CM2", "titre": ["LES", "PÉRIMÈTRES"], "taille": 78,
        "sous": "la longueur du tour", "accroche": acc_perimetre_cm2,
    },
    "eleveai-maths-cm2-aire": {
        "badge": "MATHS · CM2", "titre": ["LES", "AIRES"], "taille": 84,
        "sous": "la surface · en cm²", "accroche": acc_aire_cm2,
    },
    "eleveai-maths-cm2-symetrie": {
        "badge": "MATHS · CM2", "titre": ["LA SYMÉTRIE", "AXIALE"], "taille": 64,
        "sous": "le miroir · l'axe", "accroche": acc_symetrie_cm2,
    },
    "eleveai-maths-cm2-angle": {
        "badge": "MATHS · CM2", "titre": ["LES", "ANGLES"], "taille": 84,
        "sous": "aigu · droit · obtus", "accroche": acc_angle_cm2,
    },
    "eleveai-maths-cm2-solide": {
        "badge": "MATHS · CM2", "titre": ["LES", "SOLIDES"], "taille": 84,
        "sous": "cube · pavé · cylindre · boule", "accroche": acc_solide_cm2,
    },
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
    "eleveai-maths-5e-algo-programmation": {
        "badge": "MATHS · 5e", "titre": ["ALGO &", "SCRATCH"], "taille": 78,
        "sous": "variables · tests · boucles", "accroche": acc_algo_5e,
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


def macaron_nou_la_fe(img, d):
    # Macaron « à notre sauce » — PAS le logo officiel Nou la Fé (marque déposée).
    # On garde le slogan créole (libre) dans NOTRE charte : rond bleu nuit + jaune.
    cx, cy, r = 1198, 76, 58
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=NAVY, outline=(255, 255, 255), width=4)
    d.ellipse([cx - r + 9, cy - r + 9, cx + r - 9, cy + r - 9], outline=JAUNE, width=2)
    # bloc centré sur le DIAMÈTRE : « LA FÉ » pile au milieu du cercle.
    centre(d, cx, cy - 36, "NOU", police("ariblk.ttf", 23), (255, 255, 255))
    centre(d, cx, cy - 12, "LA FÉ", police("ariblk.ttf", 23), JAUNE)
    centre(d, cx, cy + 16, "fait péi", police("arialbd.ttf", 17), (255, 255, 255))


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
    if "EN VRAI" in spec.get("badge", ""):
        macaron_nou_la_fe(img, d)

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
