# ESSAI (25/09) — miniature paysage « hiérarchie inversée », à comparer à l'ancienne.
# La MATHS est l'élément le plus gros ; le titre garde le NOM DU CHAPITRE,
# « COMPRENDRE X » + pastille « EN N MIN » (Frédéric : la géométrie, ainsi
# titrée, a démarré le plus fort et les élèves reconnaissent le chapitre) ; Ti-Margo
# rétrécit au bord, la signature devient une petite pastille, plus de sous-titre
# (illisible à 168 px de large dans les « vidéos suggérées »).
# ⛔ Fichier à part : `miniature.py` n'est pas touché tant que l'essai n'est pas validé.
#
# Usage : python manim/miniature_essai_v2.py [filtre]   → à côté de chaque vidéo,
#   manim/sorties/seconde/maths/paysage/fr/<notion>/ (anciennes : manim/miniatures/essai-v2/avant/)

import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))
from miniature import (AVATAR, RACINE, BLEU, CARREAU_FORT, NAVY, ROUGE, TI_MARGO, VERT, H, W,
                       badge, centre, fond, police)

def titre(d, lignes, taille=84, y0=128, largeur=880):
    # Rétrécit jusqu'à ce que la plus longue ligne tienne à gauche de Ti-Margo.
    while taille > 48 and max(d.textlength(l, font=police("ariblk.ttf", taille))
                              for l in lignes) > largeur:
        taille -= 2
    ft = police("ariblk.ttf", taille)
    for i, l in enumerate(lignes):
        d.text((56, y0 + i * (taille + 14)), l, font=ft, fill=NAVY)


def pastille_duree(d, x, y, txt):
    """La promesse « en N min », en rouge, à côté du badge (la miniature
    géométrie, la mieux partie, l'annonçait déjà)."""
    f = police("ariblk.ttf", 32)
    l = d.textlength(txt, font=f)
    d.rounded_rectangle([x, y, x + l + 52, y + 58], radius=29, fill=ROUGE)
    d.text((x + 26, y + 11), txt, font=f, fill=(255, 255, 255))


def mascotte(img, h=470):
    m = Image.open(TI_MARGO).convert("RGBA")
    w = int(m.width * h / m.height)
    m = m.resize((w, h), Image.LANCZOS)
    img.paste(m, (W - w + 10, H - h - 4), m)


def pastille(img, d):
    """Petite signature : photo ronde + eleveai.fr, en bas à gauche."""
    diam, x, y = 76, 56, H - 76 - 30
    av = Image.open(AVATAR).convert("RGBA")
    s = min(av.size)
    av = av.crop(((av.width - s) // 2, (av.height - s) // 2,
                  (av.width + s) // 2, (av.height + s) // 2)).resize((diam, diam), Image.LANCZOS)
    masque = Image.new("L", (diam, diam), 0)
    ImageDraw.Draw(masque).ellipse([0, 0, diam, diam], fill=255)
    img.paste(av, (x, y), masque)
    d.ellipse([x - 3, y - 3, x + diam + 3, y + diam + 3], outline=NAVY, width=4)
    d.text((x + diam + 16, y + 18), "eleveai.fr", font=police("ariblk.ttf", 34), fill=BLEU)


def acc_devfac(d):
    """L'équation énorme ; dessous, le geste qui perd x = 0."""
    d.text((56, 318), "5x² = 20x", font=police("ariblk.ttf", 140), fill=BLEU)
    f = police("ariblk.ttf", 58)
    d.text((64, 505), "÷ x  →  x = 4", font=f, fill=ROUGE)
    x = 64 + d.textlength("÷ x  →  x = 4", font=f) + 30
    d.text((x, 505), "et 0 ?", font=f, fill=VERT)


def acc_premiers(d):
    """Le nombre énorme, et sa décomposition."""
    # Titre sur 3 lignes (multiples, diviseurs ET premiers) : l'accroche descend.
    f = police("ariblk.ttf", 150)
    d.text((56, 400), "119", font=f, fill=BLEU)
    x = 56 + d.textlength("119", font=f) + 30
    d.text((x, 440), "= 7 × 17", font=police("ariblk.ttf", 90), fill=VERT)


def acc_fonctions_reference(d):
    """Les cinq allures de `miniature.py`, en plus grand : la bande utile va de
    y = 360 (sous le titre) à 600 (au-dessus de la pastille), x = 58 → 920."""
    VIOLET, ORANGE, GRIS = (139, 92, 246), (217, 119, 20), (150, 165, 185)
    cellules = [
        ("x²", BLEU, (-1.55, 1.55), (-0.5, 2.4), lambda x: x * x, [(-1.55, 1.55)]),
        ("1/x", VERT, (-2.3, 2.3), (-2.3, 2.3), lambda x: 1 / x,
         [(-2.3, -0.45), (0.45, 2.3)]),
        ("√x", ROUGE, (-0.7, 3.6), (-0.7, 2.3), lambda x: x ** 0.5, [(0.0, 3.6)]),
        ("x³", VIOLET, (-1.33, 1.33), (-2.4, 2.4), lambda x: x ** 3, [(-1.33, 1.33)]),
        ("|x|", ORANGE, (-1.8, 1.8), (-0.5, 2.0), abs, [(-1.8, 1.8)]),
    ]
    x0, cw, gap, y0, ch = 58, 164, 10, 356, 176
    for i, (nom, coul, (xa, xb), (ya, yb), f, plages) in enumerate(cellules):
        bx = x0 + i * (cw + gap)
        d.rounded_rectangle([bx, y0, bx + cw, y0 + ch], radius=16,
                            fill=(255, 255, 255), outline=CARREAU_FORT, width=3)
        pad = 10
        px0, px1, py0, py1 = bx + pad, bx + cw - pad, y0 + pad, y0 + ch - pad

        def px(x, y, xa=xa, xb=xb, ya=ya, yb=yb, px0=px0, px1=px1, py0=py0, py1=py1):
            return (px0 + (x - xa) / (xb - xa) * (px1 - px0),
                    py1 - (y - ya) / (yb - ya) * (py1 - py0))

        d.line([px(xa, 0), px(xb, 0)], fill=GRIS, width=2)
        d.line([px(0, ya), px(0, yb)], fill=GRIS, width=2)
        for a, b in plages:
            pts = [px(a + (b - a) * k / 48, f(a + (b - a) * k / 48))
                   for k in range(49) if ya <= f(a + (b - a) * k / 48) <= yb]
            if len(pts) > 1:
                d.line(pts, fill=coul, width=9, joint="curve")
        centre(d, bx + cw / 2, y0 + ch + 4, nom, police("ariblk.ttf", 40), NAVY)


def acc_cercle_trigo(d):
    """Le cercle, le point de 3 radians presque tout à gauche, et le paradoxe en
    grand : cos 3 est négatif. Bande utile : y 356 → 600, x 58 → 920."""
    import math
    GRIS = (150, 165, 185)
    cx, cy, r = 190, 480, 108
    d.line([(cx - r - 26, cy), (cx + r + 30, cy)], fill=GRIS, width=4)
    d.line([(cx, cy + r + 20), (cx, cy - r - 26)], fill=GRIS, width=4)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=BLEU, width=9)
    px, py = cx + r * math.cos(3), cy - r * math.sin(3)
    # l'arc parcouru depuis I, un peu à l'extérieur
    d.arc([cx - r - 16, cy - r - 16, cx + r + 16, cy + r + 16], start=-math.degrees(3), end=0,
          fill=(217, 119, 20), width=8)
    d.line([(cx, cy), (px, py)], fill=ROUGE, width=6)
    d.line([(cx, cy), (px, cy)], fill=VERT, width=12)
    d.ellipse([px - 14, py - 14, px + 14, py + 14], fill=ROUGE)
    d.text((360, 372), "cos 3", font=police("ariblk.ttf", 104), fill=NAVY)
    d.text((360, 488), "≈ −0,99", font=police("ariblk.ttf", 104), fill=ROUGE)


def acc_rouge_vert(d):
    """La convention de classe de Frédéric : axe ROUGE = cos, axe VERT = sin.
    Le cercle, un point à π/3, ses deux projections colorées, et les deux mots
    en grand. Bande utile : y 356 → 600, x 58 → 920."""
    import math
    cx, cy, r = 205, 482, 112
    d.line([(cx - r - 28, cy), (cx + r + 34, cy)], fill=ROUGE, width=7)
    d.polygon([(cx + r + 34, cy - 12), (cx + r + 34, cy + 12), (cx + r + 54, cy)], fill=ROUGE)
    d.line([(cx, cy + r + 22), (cx, cy - r - 28)], fill=VERT, width=7)
    d.polygon([(cx - 12, cy - r - 28), (cx + 12, cy - r - 28), (cx, cy - r - 48)], fill=VERT)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=BLEU, width=8)
    t = math.pi / 3
    px, py = cx + r * math.cos(t), cy - r * math.sin(t)
    d.line([(px, py), (px, cy)], fill=(150, 165, 185), width=3)
    d.line([(px, py), (cx, py)], fill=(150, 165, 185), width=3)
    d.line([(cx, cy), (px, cy)], fill=ROUGE, width=14)
    d.line([(cx, cy), (cx, py)], fill=VERT, width=14)
    d.line([(cx, cy), (px, py)], fill=NAVY, width=5)
    d.ellipse([px - 14, py - 14, px + 14, py + 14], fill=(245, 190, 20), outline=NAVY, width=3)
    d.text((400, 372), "cos", font=police("ariblk.ttf", 104), fill=ROUGE)
    d.text((400, 488), "sin", font=police("ariblk.ttf", 104), fill=VERT)


def acc_entier_6e(d):
    """Le nombre énorme, son 2 en orange, et ce qu'il vaut vraiment."""
    f = police("ariblk.ttf", 150)
    d.text((56, 330), "4 ", font=f, fill=BLEU)
    x = 56 + d.textlength("4 ", font=f)
    d.text((x, 330), "2", font=f, fill=(217, 119, 20))
    x += d.textlength("2", font=f)
    d.text((x, 330), "73", font=f, fill=BLEU)
    d.text((64, 520), "le 2 vaut 200", font=police("ariblk.ttf", 58), fill=VERT)


def acc_decimal_6e(d):
    """Le piège le plus fréquent de 6e, en grand, et l'astuce du zéro dessous."""
    d.text((56, 330), "0,5 > 0,45", font=police("ariblk.ttf", 140), fill=BLEU)
    d.text((64, 520), "car 0,5 = 0,50", font=police("ariblk.ttf", 58), fill=VERT)


def acc_decimal_calcul_6e(d):
    """L'addition de l'écran 02 en grand, et la règle de la vidéo dessous."""
    d.text((56, 340), "2,8 + 1,35 = ?", font=police("ariblk.ttf", 112), fill=BLEU)
    d.text((64, 520), "virgule sous virgule", font=police("ariblk.ttf", 58), fill=VERT)


def acc_fraction_calcul_6e(d):
    """Le piège de l'écran 05 en grand : la question, et la fausse réponse barrée."""
    d.text((56, 340), "1/2 + 1/3 = ?", font=police("ariblk.ttf", 118), fill=BLEU)
    d.text((64, 520), "surtout pas 2/5 !", font=police("ariblk.ttf", 58), fill=ROUGE)


def acc_ratio_4e(d):
    """Le ratio en grand, ses deux nombres aux couleurs des deux peintures, et le
    partage des 84 € de la vidéo dessous."""
    f = police("ariblk.ttf", 150)
    d.text((56, 330), "2", font=f, fill=(37, 99, 235))
    x = 56 + d.textlength("2", font=f)
    d.text((x, 330), " : ", font=f, fill=NAVY)
    x += d.textlength(" : ", font=f)
    d.text((x, 330), "3", font=f, fill=(217, 160, 10))
    d.text((64, 520), "84 € = 12 + 24 + 48", font=police("ariblk.ttf", 58), fill=VERT)


def acc_pourcentages_4e(d):
    """Le piège de l'accroche en grand : − 20 % puis + 20 % ne ramène pas à 300."""
    f = police("ariblk.ttf", 92)
    d.text((56, 340), "−20 %", font=f, fill=ROUGE)
    x = 56 + d.textlength("−20 % ", font=f)
    d.text((x, 340), "+20 %", font=f, fill=VERT)
    d.text((64, 490), "300 € → 288 €", font=police("ariblk.ttf", 70), fill=NAVY)


def acc_proportionnalite_4e(d):
    """La relation de la vidéo en grand, et le verdict de l'accroche dessous :
    le bowling est proportionnel, le taxi ne l'est pas."""
    f = police("ariblk.ttf", 130)
    d.text((56, 340), "y = ", font=f, fill=BLEU)
    x = 56 + d.textlength("y = ", font=f)
    d.text((x, 340), "7", font=f, fill=(217, 119, 20))
    x += d.textlength("7", font=f)
    d.text((x, 340), " × x", font=f, fill=BLEU)
    f2 = police("ariblk.ttf", 52)
    d.text((64, 525), "bowling : oui", font=f2, fill=VERT)
    x = 64 + d.textlength("bowling : oui   ", font=f2)
    d.text((x, 525), "taxi : non", font=f2, fill=ROUGE)


def acc_demi_droite_6e(d):
    """La droite de l'écran 03 en grand : graduée de 0,2 en 0,2, et un point
    entre deux traits écrits — la question de la vidéo, sans la réponse."""
    y, x0, pas = 470, 76, 160
    d.line([(x0, y), (x0 + 5 * pas + 50, y)], fill=NAVY, width=7)
    d.polygon([(x0 + 5 * pas + 50, y - 16), (x0 + 5 * pas + 50, y + 16), (x0 + 5 * pas + 76, y)], fill=NAVY)
    f = police("ariblk.ttf", 44)
    for k, t in enumerate(["0", "0,2", "0,4", "0,6", "0,8", "1"]):
        x = x0 + k * pas
        d.line([(x, y - 20), (x, y + 20)], fill=NAVY, width=6)
        centre(d, x, y + 30, t, f, NAVY)
    xa = x0 + 1.5 * pas
    d.ellipse([xa - 18, y - 18, xa + 18, y + 18], fill=ROUGE)
    centre(d, xa, y - 135, "?", police("ariblk.ttf", 96), ROUGE)


def acc_relatif_5e(d):
    """Le piège de l'accroche en grand : −4 est plus grand que −7."""
    d.text((56, 330), "−4 > −7", font=police("ariblk.ttf", 150), fill=BLEU)
    d.text((64, 520), "et pas l'inverse !", font=police("ariblk.ttf", 58), fill=ROUGE)
    # Le thermomètre (demandé par Frédéric le 08/10) : 0 en haut, −4 au-dessus
    # de −7 — la droite des relatifs, debout. Le liquide s'arrête à −4.
    x, haut, bas, r = 800, 345, 615, 32
    y_de = lambda v: haut + 35 + (0 - v) * 28  # 0 → 380, −4 → 492, −7 → 576
    d.rounded_rectangle([x - 20, haut, x + 20, bas], radius=20, fill=(255, 255, 255), outline=NAVY, width=5)
    d.ellipse([x - r, bas - 10, x + r, bas + 2 * r - 10], fill=ROUGE, outline=NAVY, width=5)
    d.rectangle([x - 10, y_de(-4), x + 10, bas + 10], fill=ROUGE)
    f = police("ariblk.ttf", 34)
    for v in (0, -4, -7):
        y = y_de(v)
        d.line([(x + 20, y), (x + 44, y)], fill=NAVY, width=5)
        d.text((x + 54, y - 22), "0" if v == 0 else f"−{-v}", font=f,
               fill=NAVY if v == 0 else (BLEU if v == -4 else ROUGE))


def acc_litteral_5e(d):
    """Le piège de la réduction en grand : 3x + 2 n'est pas 5x."""
    d.text((56, 330), "3x + 2 = 5x ?", font=police("ariblk.ttf", 120), fill=BLEU)
    d.text((64, 520), "surtout pas !", font=police("ariblk.ttf", 58), fill=ROUGE)


def acc_developper_4e(d):
    """L'accroche de la vidéo : (x + 3)² n'est pas x² + 9, et le carré découpé
    qui montre les deux rectangles de 3x oubliés."""
    d.text((56, 350), "(x + 3)² = x² + 9 ?", font=police("ariblk.ttf", 68), fill=BLEU)
    d.text((64, 520), "il manque 6x !", font=police("ariblk.ttf", 58), fill=ROUGE)
    x0, y0, a, b = 785, 370, 130, 60
    for (x, y, w, h, c, t) in [(x0, y0, a, a, (37, 99, 235), "x²"), (x0 + a, y0, b, a, (217, 119, 20), "3x"),
                               (x0, y0 + a, a, b, (217, 119, 20), "3x"), (x0 + a, y0 + a, b, b, (37, 99, 235), "9")]:
        d.rectangle([x, y, x + w, y + h], fill=c, outline=NAVY, width=4)
        centre(d, x + w / 2, y + h / 2 - 22, t, police("ariblk.ttf", 36), (255, 255, 255))


def acc_equation_4e(d):
    """Le piège de la fiche en grand : 5x = 8 ne donne pas x = 3."""
    d.text((56, 350), "5x = 8  donc  x = 3 ?", font=police("ariblk.ttf", 76), fill=BLEU)
    d.text((64, 500), "non : x = 8 ÷ 5 = 1,6", font=police("ariblk.ttf", 58), fill=ROUGE)


def acc_equation_3e(d):
    """L'accroche : x² = 25 n'a pas qu'une solution."""
    d.text((56, 340), "x² = 25 :  x = 5 ?", font=police("ariblk.ttf", 92), fill=BLEU)
    d.text((64, 510), "il en manque une !", font=police("ariblk.ttf", 58), fill=ROUGE)


def acc_degre2_premiere(d):
    """La forme factorisée et ses deux racines, en grand."""
    d.text((56, 340), "−(x − 2)(x − 8) = 0", font=police("ariblk.ttf", 70), fill=BLEU)
    d.text((64, 480), "x = 2  ou  x = 8", font=police("ariblk.ttf", 62), fill=VERT)


def acc_cosinus_4e(d):
    """La formule en grand, et le contrôle qui attrape le quotient à l'envers."""
    d.text((56, 345), "cos = adjacent ÷ hyp.", font=police("ariblk.ttf", 72), fill=BLEU)
    d.text((64, 495), "toujours entre 0 et 1", font=police("ariblk.ttf", 58), fill=VERT)


def acc_trigo_3e(d):
    """Les trois rapports en un mot de passe : le choix est le chapitre."""
    d.text((56, 340), "CAH  SOH  TOA", font=police("ariblk.ttf", 104), fill=BLEU)
    d.text((64, 500), "sinus, cosinus ou tangente ?", font=police("ariblk.ttf", 54), fill=ROUGE)


def acc_tvi_terminale(d):
    """L'équation sans formule, et la promesse : une solution, prouvée."""
    d.text((56, 340), "x³ + x − 1 = 0", font=police("ariblk.ttf", 96), fill=BLEU)
    d.text((64, 500), "0,68 < α < 0,69", font=police("ariblk.ttf", 62), fill=VERT)


def acc_signes_2de(d):
    """⭐ 11/10/2026 : le tableau du dauphin, rempli en couleurs (+ bleu = dans
    l'air, − orange = sous l'eau), le dauphin au-dessus, et la CEINTURE VERTE
    (règle des ceintures, manim/REGLES.md)."""
    from miniature_short_signes import BLEU_AIR, ORANGE_EAU, ceinture, dauphin
    xg, xs, xd, y0, hr = 56, 250, 800, 400, 84
    f = police("ariblk.ttf", 46)
    for r in range(2):
        d.rectangle([xg, y0 + r * hr, xd, y0 + (r + 1) * hr], fill=(255, 255, 255), outline=NAVY, width=5)
    d.line([(xs, y0), (xs, y0 + 2 * hr)], fill=NAVY, width=5)
    centre(d, (xg + xs) / 2, y0 + 16, "t", f, NAVY)
    centre(d, (xg + xs) / 2, y0 + hr + 16, "h(t)", f, NAVY)
    xv = [300, 470, 640, 765]
    for x, v in zip(xv, ["0", "1", "3", "4"]):
        centre(d, x, y0 + 16, v, f, NAVY)
    fs = police("ariblk.ttf", 62)
    for x, s, c in [((xv[0] + xv[1]) / 2, "−", ORANGE_EAU), (xv[1], "0", NAVY), ((xv[1] + xv[2]) / 2, "+", BLEU_AIR),
                    (xv[2], "0", NAVY), ((xv[2] + xv[3]) / 2, "−", ORANGE_EAU)]:
        centre(d, x, y0 + hr + 4, s, fs, c)
    dauphin(d, 555, 352, 0.0, 190, BLEU_AIR)
    ceinture(d, 880, 345, larg=120, couleur=(34, 197, 94))
    centre(d, 880, 455, "ceinture", police("arialbd.ttf", 26), NAVY)
    centre(d, 880, 485, "verte", police("arialbd.ttf", 26), NAVY)


def acc_isoler_lettre(d):
    """La formule et ses trois visages."""
    d.text((56, 330), "d = v × t", font=police("ariblk.ttf", 96), fill=BLEU)
    d.text((64, 480), "v = d ÷ t     t = d ÷ v", font=police("ariblk.ttf", 56), fill=VERT)


def acc_analyse_graphique_2de(d):
    """⭐ 12/10/2026 : la courbe de la nuit au Piton des Neiges, sa partie sous
    l'axe en orange (il gèle), et ce qu'on y lit : S = ]4 ; 9[. Ceinture verte."""
    import sys as _s
    _s.path.insert(0, str(Path(__file__).resolve().parent / "scripts" / "seconde"))
    from miniature_short_signes import BLEU_AIR, ORANGE_EAU, ceinture
    ys = [6, 4, 3, 2, 0, -1, -2, -3, -2, 0, 3]
    dd = [ys[i + 1] - ys[i] for i in range(10)]
    m = [dd[0]] + [0 if dd[i - 1] * dd[i] <= 0 else 2 / (1 / dd[i - 1] + 1 / dd[i]) for i in range(1, 10)] + [dd[-1]]

    def T(t):
        i = min(int(t), 9)
        s = t - i
        return ((2 * s**3 - 3 * s**2 + 1) * ys[i] + (s**3 - 2 * s**2 + s) * m[i]
                + (-2 * s**3 + 3 * s**2) * ys[i + 1] + (s**3 - s**2) * m[i + 1])
    X0, Y0, UX, UY = 70, 470, 52, 22          # origine (t = 0, T = 0), pixels par unité
    pt = lambda t, y: (X0 + UX * t, Y0 - UY * y)
    d.line([pt(0, 0), pt(10.4, 0)], fill=NAVY, width=4)
    d.line([pt(0, -3.6), pt(0, 6.6)], fill=NAVY, width=4)
    pts = [pt(k / 20, T(k / 20)) for k in range(201)]
    for a, b, k in zip(pts, pts[1:], range(200)):
        d.line([a, b], fill=ORANGE_EAU if 4 * 20 <= k < 9 * 20 else BLEU_AIR, width=9)
    for t in (4, 9):
        x, y = pt(t, 0)
        d.ellipse([x - 9, y - 9, x + 9, y + 9], fill=NAVY)
    d.text((630, 318), "T(t) < 0", font=police("ariblk.ttf", 48), fill=ORANGE_EAU)
    d.text((630, 384), "S = ]4 ; 9[", font=police("ariblk.ttf", 48), fill=VERT)
    ceinture(d, 760, 485, larg=120, couleur=(34, 197, 94))
    centre(d, 760, 590, "ceinture verte", police("arialbd.ttf", 26), NAVY)


def acc_hypotenuse_4e(d):
    """⭐ 12/10/2026 : Pythagore, épisode 1. Le triangle de la vidéo : l'angle
    droit en BLEU (petit carré), l'hypoténuse en ORANGE, en face ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    orange = (249, 115, 22)
    A, B, C = (420, 590), (720, 590), (420, 375)
    d.polygon([A, B, C], outline=NAVY, width=7)
    s = 38
    d.rectangle([A[0], A[1] - s, A[0] + s, A[1]], fill=(186, 220, 250), outline=BLEU, width=5)
    d.line([B, C], fill=orange, width=16)
    f = police("ariblk.ttf", 40)
    d.text((60, 370), "en face de", font=f, fill=BLEU)
    d.text((60, 420), "l'angle droit", font=f, fill=BLEU)
    d.text((60, 490), "le plus long !", font=police("ariblk.ttf", 44), fill=orange)
    ceinture(d, 860, 330, larg=110, couleur=(250, 204, 21))
    centre(d, 860, 425, "ceinture jaune", police("arialbd.ttf", 24), NAVY)


def acc_expression_comprendre_5e(d):
    """⭐ 13/10/2026 : expression littérale 5e, épisode 1. Le piège de la vidéo :
    si x = 2, 3x n'est pas 32, c'est 3 × 2 ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    d.text((56, 330), "x = 2  →  3x = 32 ?", font=police("ariblk.ttf", 76), fill=BLEU)
    d.text((64, 480), "non : 3 × 2 = 6", font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_jaune(d)


def _ceinture_jaune(d):
    # Frédéric, 13/10 : l'échelle entière, pour situer la ceinture du jour.
    from miniature_short_expression import echelle
    echelle(d, 640, 592, "jaune", s=0.5)


def acc_expression_traduire_5e(d):
    """13/10/2026 : ép. 2, le piège 2(x + 5)."""
    d.text((56, 330), "le double de x augmenté de 5", font=police("ariblk.ttf", 44), fill=BLEU)
    d.text((56, 400), "= 2(x + 5) ?", font=police("ariblk.ttf", 76), fill=BLEU)
    d.text((64, 510), "non : 2x + 5", font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_jaune(d)


def acc_expression_substituer_5e(d):
    """13/10/2026 : ép. 3, le piège x = 4 → 3x = 34."""
    d.text((56, 330), "x = 4  →  3x = 34 ?", font=police("ariblk.ttf", 76), fill=BLEU)
    d.text((64, 480), "non : 3 × 4 = 12", font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_jaune(d)


def acc_expression_reduire_5e(d):
    """13/10/2026 : ép. 4, le piège 3x + 2 = 5x."""
    d.text((56, 330), "3x + 2 = 5x ?", font=police("ariblk.ttf", 100), fill=BLEU)
    d.text((64, 500), "surtout pas !", font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_jaune(d)


def acc_expression_tester_5e(d):
    """13/10/2026 : ép. 5, la balance de 3x + 1 = 10."""
    d.text((56, 330), "3x + 1 = 10", font=police("ariblk.ttf", 92), fill=BLEU)
    d.text((64, 480), "x = 2 ou x = 3 ?", font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_jaune(d)


def acc_expression_developper_5e(d):
    """13/10/2026 : ép. 6, le 3 oublié."""
    d.text((56, 330), "5(x + 3) = 5x + 3 ?", font=police("ariblk.ttf", 78), fill=BLEU)
    d.text((64, 480), "non : 5x + 15", font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_jaune(d)


def _ceinture_orange(d):
    from miniature_short_expression import echelle
    echelle(d, 640, 592, "orange", s=0.5)


def _ceinture_verte(d):
    from miniature_short_expression import echelle
    echelle(d, 640, 592, "verte", s=0.5)


def _piege(d, haut, bas, taille=76):
    d.text((56, 330), haut, font=police("ariblk.ttf", taille), fill=BLEU)
    d.text((64, 480), bas, font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_orange(d)


def acc_expression_comprendre_4e(d):
    _piege(d, "3x × 2 = 5x ?", "non : 6x", 96)


def acc_expression_traduire_4e(d):
    _piege(d, "2(x + 3) ou 2x + 3 ?", "pas la même chose !", 70)


def acc_expression_substituer_4e(d):
    _piege(d, "(−3)² = −9 ?", "non : (−3) × (−3) = 9", 96)


def acc_expression_reduire_4e(d):
    _piege(d, "2x + 3 = 5x ?", "pas la même famille !", 96)


def _piege3(d, haut, bas, taille=76):
    d.text((56, 350), haut, font=police("ariblk.ttf", taille), fill=BLEU)
    d.text((64, 490), bas, font=police("ariblk.ttf", 62), fill=ROUGE)
    _ceinture_verte(d)


def acc_expression_comprendre_3e(d):
    _piege3(d, "4 + 5 + 6 = 15 : hasard ?", "non : toujours 3(n + 1)", 66)


def acc_expression_substituer_3e(d):
    _piege3(d, "2 fois plus vite…", "× 4 pour freiner !", 76)


def acc_expression_reduire_3e(d):
    _piege3(d, "5x − (2x − 3) = 3x − 3 ?", "non : 3x + 3", 62)


def acc_expression_developper_3e(d):
    _piege3(d, "(x + 2)(x + 3) = ?", "4 produits : x² + 5x + 6", 76)


def acc_expression_factoriser_3e(d):
    _piege3(d, "3x + 12 = 3(x + 4)", "le chemin inverse", 76)


def acc_expression_identites_3e(d):
    _piege3(d, "(x + 3)² = x² + 9 ?", "il manque 6x !", 76)


def acc_proba_vocabulaire_3e(d):
    _piege3(d, "Peu probable = impossible ?", "non : le loto n'est pas à 0", 54)


def acc_proba_issue_3e(d):
    _piege3(d, "BANANE : 6 issues ?", "non : 4 lettres, 4 issues", 54)


def acc_proba_equiprobabilite_3e(d):
    _piege3(d, "2 couleurs = 1 chance sur 2 ?", "non : on compte les billes", 54)


def acc_proba_evenement_3e(d):
    _piege3(d, "Plus de 4 ou au moins 4 ?", "5 et 6… ou 4, 5 et 6 !", 54)


def acc_proba_calculer_3e(d):
    _piege3(d, "3 parfums = 1 chance sur 3 ?", "non : 5 bonbons sur 12", 54)


def acc_proba_contraire_3e(d):
    _piege3(d, "Gagner 0,2 → perdre 0,2 ?", "non : 1 − 0,2 = 0,8", 54)


def acc_proba_deux_epreuves_3e(d):
    _piege3(d, "Deux fois pile = 1/2 ?", "non : 1/2 × 1/2 = 1/4", 54)


def acc_proba_defi_3e(d):
    _piege3(d, "7 blancs ou 3 blancs ?", "la proportion gagne : 3/4", 54)


# 15/10/2026 — PROBABILITÉS 4e (13 paysages, ceinture ORANGE) : le piège de l'épisode.
def acc_proba_vocabulaire_4e(d):
    _piege(d, "Rare = impossible ?", "non : le gros lot se gagne", 66)


def acc_proba_issue_4e(d):
    _piege(d, "5 stylos = 5 issues ?", "non : 2 couleurs, 2 issues", 62)


def acc_proba_evenement_4e(d):
    _piege(d, "Contraire de 10 = 1 ?", "non : toutes les autres", 62)


def acc_proba_equiprobabilite_4e(d):
    _piege(d, "2 issues = 1 chance sur 2 ?", "non : la punaise triche", 54)


def acc_proba_calculer_fraction_4e(d):
    _piege(d, "4 gagnants sur 16 ?", "non : 4/20 = 1/5", 66)


def acc_proba_convertir_4e(d):
    _piege(d, "0,5 = 5 % ?", "non : 50 %", 96)


def acc_proba_comparer_4e(d):
    _piege(d, "5 gagnants, c'est mieux ?", "non : 30 % > 25 %", 58)


def acc_proba_defi_4e(d):
    _piege(d, "1 est premier ?", "non : 40 %, pas 50 %", 76)


def acc_proba_frequence_calculer_4e(d):
    _piege(d, "18 piles ÷ 2 ?", "non : 18 ÷ 40 = 45 %", 76)


def acc_proba_frequence_comparer_4e(d):
    _piege(d, "23 % au lieu de 17 % ?", "un écart, c'est normal", 58)


def acc_proba_frequence_repeter_4e(d):
    _piege(d, "Le dé se souvient ?", "non : il n'a pas de mémoire", 66)


def acc_proba_frequence_echantillon_4e(d):
    _piege(d, "3 six sur 5 : truqué ?", "non : trop peu de lancers", 62)


def acc_proba_frequence_defi_4e(d):
    _piege(d, "Exactement 20 fois ?", "non : environ 20", 66)


def acc_carre_racine_4e(d):
    """⭐ 12/10/2026 : Pythagore, épisode 2. Le carrelage de 5 sur 5 (carreaux
    orange, côté bleu), l'aller et le retour écrits ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    orange, bleu_cote = (249, 115, 22), (37, 99, 175)
    x0, y0, t = 110, 345, 46
    for i in range(5):
        for j in range(5):
            d.rectangle([x0 + i * t + 2, y0 + j * t + 2, x0 + (i + 1) * t - 2, y0 + (j + 1) * t - 2],
                        fill=orange, outline=NAVY, width=2)
    d.line([(x0 - 14, y0), (x0 - 14, y0 + 5 * t)], fill=bleu_cote, width=6)
    d.text((x0 - 52, y0 + 5 * t / 2 - 22), "5", font=police("ariblk.ttf", 36), fill=bleu_cote)
    f = police("ariblk.ttf", 64)
    d.text((400, 350), "5² = 25", font=f, fill=orange)
    d.text((400, 455), "√25 = 5", font=f, fill=VERT)
    xr = 400 + d.textlength("√", font=f)
    d.line([(xr, 462), (xr + d.textlength("25", font=f) + 4, 462)], fill=VERT, width=6)
    ceinture(d, 860, 330, larg=110, couleur=(250, 204, 21))
    centre(d, 860, 425, "ceinture jaune", police("arialbd.ttf", 24), NAVY)


def acc_factoriser_4e(d):
    """Le chemin retour : la somme, puis le produit."""
    d.text((56, 340), "6x + 15 = 3(2x + 5)", font=police("ariblk.ttf", 76), fill=BLEU)
    d.text((64, 500), "le chemin à l'envers", font=police("ariblk.ttf", 58), fill=VERT)


def acc_hypotenuse_calcul_4e(d):
    """⭐ 12/10/2026 : Pythagore, épisode 3. Le champ de cannes 40 × 30 vu du ciel,
    les bords BLEUS, la diagonale ORANGE ; le calcul à côté ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    orange, bleu_cote, canne = (249, 115, 22), (37, 99, 175), (63, 125, 32)
    x0, y0, w, h = 70, 330, 280, 210
    d.rectangle([x0, y0, x0 + w, y0 + h], fill=canne, outline=NAVY, width=4)
    for k in range(1, 7):
        d.line([(x0 + 8, y0 + k * 30), (x0 + w - 8, y0 + k * 30)], fill=(163, 217, 119), width=2)
    d.line([(x0, y0 + h), (x0 + w, y0 + h)], fill=bleu_cote, width=9)
    d.line([(x0 + w, y0 + h), (x0 + w, y0)], fill=bleu_cote, width=9)
    d.line([(x0, y0 + h), (x0 + w, y0)], fill=orange, width=11)
    f = police("ariblk.ttf", 30)
    centre(d, x0 + w / 2, y0 + h + 10, "40 m", f, bleu_cote)
    d.text((x0 + w + 12, y0 + h / 2 - 18), "30 m", font=f, fill=bleu_cote)
    g = police("ariblk.ttf", 52)
    d.text((500, 360), "30² + 40²", font=g, fill=NAVY)
    d.text((500, 430), "= 2 500", font=g, fill=orange)
    d.text((500, 505), "√2 500 = 50", font=g, fill=VERT)
    xr = 500 + d.textlength("√", font=g)
    d.line([(xr, 512), (xr + d.textlength("2 500", font=g) + 4, 512)], fill=VERT, width=5)
    ceinture(d, 860, 330, larg=110, couleur=(250, 204, 21))
    centre(d, 860, 425, "ceinture jaune", police("arialbd.ttf", 24), NAVY)


def acc_eau_974(d):
    """⭐ 13/10/2026 : l'eau à La Réunion, 5e, CEINTURE VERTE. La règle de la
    vidéo en très gros (1 mm de pluie sur 1 m² = 1 L), les fuites en orange."""
    from miniature_short_signes import ceinture
    orange = (249, 115, 22)
    f = police("ariblk.ttf", 60)
    d.text((60, 345), "1 mm sur 1 m²", font=f, fill=BLEU)
    d.text((60, 425), "= 1 litre", font=police("ariblk.ttf", 76), fill=BLEU)
    d.text((60, 530), "38 L sur 100 perdus", font=police("ariblk.ttf", 40), fill=orange)
    ceinture(d, 860, 330, larg=110, couleur=(34, 197, 94))
    centre(d, 860, 425, "ceinture verte", police("arialbd.ttf", 24), NAVY)


def acc_rond_point_974(d):
    """⭐ 14/10/2026 : les bouchons au rond-point, Tle, CEINTURE NOIRE. La courbe
    de la vidéo (« superbe », Frédéric) : plate, puis elle explose ; 62 s → 19 s."""
    from miniature_short_expression import echelle
    orange = (249, 115, 22)
    pts = [(40, 1.3), (50, 2.0), (57, 2.6), (67, 4.0), (73, 5.3), (80, 7.9), (83, 9.8),
           (87, 12.8), (91, 18.6), (93, 23.6), (95, 31.4), (98, 43.3), (100, 62.0)]
    X = lambda r: 80 + (r - 40) * 7.2
    Y = lambda w: 540 - w * 2.9
    d.line([(80, 350), (80, 540), (520, 540)], fill=NAVY, width=4)
    d.line([(X(r), Y(w)) for r, w in pts], fill=BLEU, width=9, joint="curve")
    for r, w, c in ((91, 18.6, BLEU), (100, 62.0, orange)):
        d.ellipse([X(r) - 11, Y(w) - 11, X(r) + 11, Y(w) + 11], fill=c)
    d.text((540, 345), "62 s", font=police("ariblk.ttf", 72), fill=orange)
    d.text((540, 430), "→ 19 s", font=police("ariblk.ttf", 56), fill=BLEU)
    d.text((540, 505), "1 voiture sur 10 en moins", font=police("arialbd.ttf", 24), fill=NAVY)
    echelle(d, 640, 592, "noire", s=0.5)


def acc_annonce_probabilites(d):
    """⭐ 14/10/2026 : bande-annonce « Probabilités ». Refaite à sa demande pour
    le VOTE (« donne ton avis ») : les 9 classes, chacune avec sa case à cocher,
    « plus de 300 vidéos », un dé."""
    lignes = [["CM1", "CM2", "6e", "5e", "4e"], ["3e", "2de", "1re", "Tle"]]
    f = police("ariblk.ttf", 40)
    for r, classes in enumerate(lignes):
        y = 352 + r * 70
        for i, cl in enumerate(classes):
            x = 66 + i * 168
            d.rounded_rectangle([x, y + 6, x + 38, y + 44], radius=8, outline=NAVY, width=5,
                                fill=(255, 255, 255))
            d.text((x + 50, y), cl, font=f, fill=BLEU)
    d.text((66, 505), "plus de 300 vidéos", font=police("ariblk.ttf", 50), fill=ROUGE)
    x, y, c = 640, 492, 92
    d.rounded_rectangle([x, y, x + c, y + c], radius=18, fill=(255, 255, 255), outline=NAVY, width=5)
    for px, py in [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]:
        cx, cy = x + c / 2 + px * c * 0.27, y + c / 2 + py * c * 0.27
        d.ellipse([cx - 9, cy - 9, cx + 9, cy + 9], fill=NAVY)


def acc_cote_4e(d):
    """⭐ 13/10/2026 : Pythagore, épisode 4. Le champ de l'épisode 3 à l'envers :
    la diagonale ORANGE connue (50 m), la largeur BLEUE cherchée ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    orange, bleu_cote, canne = (249, 115, 22), (37, 99, 175), (63, 125, 32)
    x0, y0, w, h = 70, 330, 280, 210
    d.rectangle([x0, y0, x0 + w, y0 + h], fill=canne, outline=NAVY, width=4)
    for k in range(1, 7):
        d.line([(x0 + 8, y0 + k * 30), (x0 + w - 8, y0 + k * 30)], fill=(163, 217, 119), width=2)
    d.line([(x0 + w, y0 + h), (x0 + w, y0)], fill=bleu_cote, width=11)
    d.line([(x0, y0 + h), (x0 + w, y0)], fill=orange, width=11)
    f = police("ariblk.ttf", 30)
    d.text((x0 + 60, y0 + 50), "50 m", font=f, fill=(255, 255, 255))
    centre(d, x0 + w / 2, y0 + h + 10, "40 m", f, NAVY)
    d.text((x0 + w + 14, y0 + h / 2 - 30), "?", font=police("ariblk.ttf", 56), fill=bleu_cote)
    g = police("ariblk.ttf", 52)
    d.text((500, 360), "50² − 40²", font=g, fill=NAVY)
    d.text((500, 430), "= 900", font=g, fill=bleu_cote)
    d.text((500, 505), "√900 = 30", font=g, fill=VERT)
    xr = 500 + d.textlength("√", font=g)
    d.line([(xr, 512), (xr + d.textlength("900", font=g) + 4, 512)], fill=VERT, width=5)
    ceinture(d, 860, 330, larg=110, couleur=(250, 204, 21))
    centre(d, 860, 425, "ceinture jaune", police("arialbd.ttf", 24), NAVY)


def acc_gobelet_3e(d):
    """⭐ 13/10/2026 : Pythagore dans un solide, 3e. Le gobelet du brevet 2026,
    sa pointe en pointillés, le triangle OAD colorié ; le calcul ; ceinture VERTE."""
    from miniature_short_signes import ceinture
    orange, bleu, corps = (249, 115, 22), (37, 99, 175), (56, 189, 248)
    cx, yB, yA, yO, rB, rA = 200, 392, 505, 595, 125, 54
    d.polygon([(cx - rB, yB), (cx - rA, yA), (cx + rA, yA), (cx + rB, yB)], fill=(186, 230, 253), outline=NAVY)
    d.line([(cx - rB, yB), (cx - rA, yA)], fill=NAVY, width=5)
    d.line([(cx + rB, yB), (cx + rA, yA)], fill=NAVY, width=5)
    d.ellipse([cx - rB, yB - 30, cx + rB, yB + 30], fill=corps, outline=NAVY, width=5)
    d.ellipse([cx - rA, yA - 12, cx + rA, yA + 12], outline=NAVY, width=3)
    for (x1, y1) in [(cx - rA, yA), (cx + rA, yA)]:
        for k in range(0, 10, 2):
            xa, ya = x1 + (cx - x1) * k / 10, y1 + (yO - y1) * k / 10
            xb, yb = x1 + (cx - x1) * (k + 1) / 10, y1 + (yO - y1) * (k + 1) / 10
            d.line([(xa, ya), (xb, yb)], fill=(100, 116, 139), width=4)
    d.polygon([(cx, yO), (cx, yA), (cx + rA, yA)], fill=(253, 186, 116))
    d.line([(cx, yO), (cx, yA)], fill=bleu, width=8)
    d.line([(cx, yA), (cx + rA, yA)], fill=bleu, width=8)
    d.line([(cx, yO), (cx + rA, yA)], fill=orange, width=9)
    d.rectangle([cx, yA, cx + 16, yA + 16], outline=bleu, width=4)
    f = police("ariblk.ttf", 30)
    d.text((cx + rA + 14, yA + 40), "8,2", font=f, fill=orange)
    d.text((cx - 50, yA + 30), "?", font=police("ariblk.ttf", 48), fill=bleu)
    g = police("ariblk.ttf", 50)
    d.text((440, 360), "8,2² − 1,8²", font=g, fill=NAVY)
    d.text((440, 430), "= 64", font=g, fill=bleu)
    d.text((440, 505), "OA = 8 cm", font=g, fill=VERT)
    ceinture(d, 880, 330, larg=110, couleur=(34, 197, 94))
    centre(d, 880, 425, "ceinture verte", police("arialbd.ttf", 24), NAVY)


def acc_verifier_4e(d):
    """⭐ 13/10/2026 : Pythagore, épisode 5. La corde à 13 nœuds tendue en 3-4-5,
    le plus grand côté ORANGE ; les deux calculs côte à côte ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    orange, bleu_cote, corde = (249, 115, 22), (37, 99, 175), (176, 132, 64)
    u = 62
    A = (90, 560)
    B, C = (A[0] + 4 * u, A[1]), (A[0], A[1] - 3 * u)
    d.line([A, B], fill=bleu_cote, width=9)
    d.line([A, C], fill=bleu_cote, width=9)
    d.line([B, C], fill=orange, width=9)
    pts = [(A[0] + k * u, A[1]) for k in range(5)] + [(B[0] + (C[0] - B[0]) * k / 5, B[1] + (C[1] - B[1]) * k / 5) for k in range(1, 6)] + [(A[0], C[1] + k * u) for k in range(1, 4)]
    for x, y in pts:
        d.ellipse([x - 9, y - 9, x + 9, y + 9], fill=corde, outline=NAVY, width=2)
    f = police("ariblk.ttf", 34)
    d.text((A[0] - 42, A[1] - 1.5 * u - 20), "3", font=f, fill=bleu_cote)
    centre(d, A[0] + 2 * u, A[1] + 8, "4", f, bleu_cote)
    d.text((A[0] + 2 * u + 20, A[1] - 1.5 * u - 50), "5", font=f, fill=orange)
    g = police("ariblk.ttf", 54)
    d.text((440, 370), "5² = 25", font=g, fill=orange)
    d.text((440, 445), "3² + 4² = 25", font=g, fill=bleu_cote)
    d.text((440, 520), "égal ?", font=g, fill=VERT)
    ceinture(d, 840, 330, larg=110, couleur=(250, 204, 21))
    centre(d, 840, 425, "ceinture jaune", police("arialbd.ttf", 24), NAVY)


def acc_reciproque_4e(d):
    """⭐ 13/10/2026 : Pythagore, épisode 6. La dalle 60-80-100, le petit carré
    PROUVÉ, et le début de la copie modèle ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    orange, bleu_cote = (249, 115, 22), (37, 99, 175)
    u = 2.6
    A = (90, 570)
    B, C = (A[0] + 60 * u, A[1]), (A[0], A[1] - 80 * u)
    D = (B[0], C[1])
    d.polygon([A, B, D, C], fill=(209, 213, 219))
    d.line([A, B], fill=bleu_cote, width=9)
    d.line([A, C], fill=bleu_cote, width=9)
    d.line([B, C], fill=orange, width=9)
    s = 30
    d.rectangle([A[0], A[1] - s, A[0] + s, A[1]], fill=(186, 220, 250), outline=bleu_cote, width=5)
    f = police("ariblk.ttf", 26)
    centre(d, (A[0] + B[0]) / 2, A[1] + 6, "60", f, bleu_cote)
    d.text((A[0] - 46, (A[1] + C[1]) / 2 - 14), "80", font=f, fill=bleu_cote)
    d.text(((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2 - 30), "100", font=f, fill=orange)
    g = police("arialbd.ttf", 34)
    d.text((330, 350), "D'une part : 100² = 10 000", font=g, fill=orange)
    d.text((330, 400), "D'autre part : 60² + 80² = 10 000", font=g, fill=bleu_cote)
    d.text((330, 460), "D'après la réciproque…", font=police("ariblk.ttf", 38), fill=VERT)
    d.text((330, 510), "rectangle en A", font=police("ariblk.ttf", 38), fill=VERT)
    ceinture(d, 1150, 60, larg=90, couleur=(250, 204, 21))
    centre(d, 1150, 172, "ceinture jaune", police("arialbd.ttf", 20), NAVY)


def acc_rediger_4e(d):
    """⭐ 13/10/2026 : Pythagore, épisode 7. Les deux triangles : petit carré connu
    → THÉORÈME ; « ? » au coin → RÉCIPROQUE ; ceinture JAUNE."""
    from miniature_short_signes import ceinture
    orange, vert = (249, 115, 22), VERT
    u = 50
    for x0, connu in [(80, True), (420, False)]:
        A = (x0, 530)
        B, C = (A[0] + 4 * u, A[1]), (A[0], A[1] - 3 * u)
        d.polygon([A, B, C], outline=NAVY, width=6)
        if connu:
            d.rectangle([A[0], A[1] - 28, A[0] + 28, A[1]], fill=(186, 220, 250), outline=BLEU, width=4)
        else:
            d.text((A[0] + 14, A[1] - 74), "?", font=police("ariblk.ttf", 56), fill=BLEU)
    f = police("ariblk.ttf", 40)
    d.text((70, 330), "THÉORÈME", font=f, fill=orange)
    d.text((400, 330), "RÉCIPROQUE", font=f, fill=vert)
    centre(d, 180, 548, "je calcule", police("arialbd.ttf", 28), NAVY)
    centre(d, 520, 548, "je prouve", police("arialbd.ttf", 28), NAVY)
    ceinture(d, 1150, 60, larg=90, couleur=(250, 204, 21))
    centre(d, 1150, 172, "ceinture jaune", police("arialbd.ttf", 20), NAVY)


def _cube_pil(d, ox, oy, a, triangle=None, lw=6):
    """Un cube ABCDEFGH en perspective cavalière (PIL), un triangle rouge éventuel."""
    S = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
         "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}
    pt = lambda n: (ox + a * (S[n][0] + 0.32 * S[n][1]), oy - a * (S[n][2] + 0.32 * S[n][1]))
    if triangle:
        d.polygon([pt(n) for n in triangle], fill=(252, 165, 165), outline=(220, 38, 38), width=lw)
    for e in ["AB", "BC", "CD", "DA", "EF", "FG", "GH", "HE", "AE", "BF", "CG", "DH"]:
        cache = "D" in e
        p, q = pt(e[0]), pt(e[1])
        if cache:
            for k in range(0, 10, 2):
                d.line([(p[0] + (q[0] - p[0]) * k / 10, p[1] + (q[1] - p[1]) * k / 10),
                        (p[0] + (q[0] - p[0]) * (k + 1) / 10, p[1] + (q[1] - p[1]) * (k + 1) / 10)], fill=(120, 130, 145), width=3)
        else:
            d.line([p, q], fill=NAVY, width=lw)
    return pt


def acc_defi_cube_4e(d):
    """⭐ 13/10/2026 : le défi du cube, CEINTURE ORANGE. Le cube et un triangle rouge
    en biais (ABG) ; la réponse n'est PAS sur la miniature."""
    from miniature_short_signes import ceinture
    pt = _cube_pil(d, 110, 560, 200, triangle="ABG")
    cx = sum(pt(n)[0] for n in "ABCDEFGH") / 8
    cy = sum(pt(n)[1] for n in "ABCDEFGH") / 8
    for n in "ABCDEFGH":
        x, y = pt(n)
        dx, dy = x - cx, y - cy
        r = max((dx * dx + dy * dy) ** 0.5, 1)
        centre(d, x + dx / r * 26, y + dy / r * 26 - 16, n, police("arialbd.ttf", 26), NAVY)
    d.text((470, 400), "?", font=police("ariblk.ttf", 200), fill=(220, 38, 38))
    ceinture(d, 1150, 60, larg=90, couleur=(249, 115, 22))
    centre(d, 1150, 172, "ceinture orange", police("arialbd.ttf", 20), NAVY)


ESSAIS = {
    # 15/10/2026 — probabilités 4e, 13 paysages, CEINTURE ORANGE (durée arrondie).
    "eleveai-maths-4e-proba-vocabulaire": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["LE VOCABULAIRE", "DES PROBABILITÉS"],
        "accroche": acc_proba_vocabulaire_4e,
        "dossier": "4e/maths/probabilites/01-vocabulaire",
    },
    "eleveai-maths-4e-proba-issue": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["LES ISSUES", "D'UNE EXPÉRIENCE"],
        "accroche": acc_proba_issue_4e,
        "dossier": "4e/maths/probabilites/02-issue",
    },
    "eleveai-maths-4e-proba-evenement": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["CERTAIN, IMPOSSIBLE", "OU CONTRAIRE ?"],
        "accroche": acc_proba_evenement_4e,
        "dossier": "4e/maths/probabilites/03-evenement",
    },
    "eleveai-maths-4e-proba-equiprobabilite": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "L'ÉQUIPROBABILITÉ"],
        "accroche": acc_proba_equiprobabilite_4e,
        "dossier": "4e/maths/probabilites/04-equiprobabilite",
    },
    "eleveai-maths-4e-proba-calculer-fraction": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["CALCULER UNE", "PROBABILITÉ"],
        "accroche": acc_proba_calculer_fraction_4e,
        "dossier": "4e/maths/probabilites/05-calculer-fraction",
    },
    "eleveai-maths-4e-proba-convertir": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["UNE PROBABILITÉ", "EN POURCENTAGE"],
        "accroche": acc_proba_convertir_4e,
        "dossier": "4e/maths/probabilites/06-convertir",
    },
    "eleveai-maths-4e-proba-comparer": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["QUEL JEU EST LE", "PLUS FAVORABLE ?"],
        "accroche": acc_proba_comparer_4e,
        "dossier": "4e/maths/probabilites/07-comparer",
    },
    "eleveai-maths-4e-proba-defi": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["LE DÉFI DES", "PROBABILITÉS"],
        "accroche": acc_proba_defi_4e,
        "dossier": "4e/maths/probabilites/08-defi",
    },
    "eleveai-maths-4e-proba-frequence-calculer": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["LA FRÉQUENCE", "OBSERVÉE"],
        "accroche": acc_proba_frequence_calculer_4e,
        "dossier": "4e/maths/probabilites/09-frequence-calculer",
    },
    "eleveai-maths-4e-proba-frequence-comparer": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["FRÉQUENCE OU", "PROBABILITÉ ?"],
        "accroche": acc_proba_frequence_comparer_4e,
        "dossier": "4e/maths/probabilites/10-frequence-comparer",
    },
    "eleveai-maths-4e-proba-frequence-repeter": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["PLUS ON LANCE,", "MOINS L'ÉCART"],
        "accroche": acc_proba_frequence_repeter_4e,
        "dossier": "4e/maths/probabilites/11-frequence-repeter",
    },
    "eleveai-maths-4e-proba-frequence-echantillon": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["MON DÉ EST-IL", "TRUQUÉ ?"],
        "accroche": acc_proba_frequence_echantillon_4e,
        "dossier": "4e/maths/probabilites/12-frequence-echantillon",
    },
    "eleveai-maths-4e-proba-frequence-defi": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["LE DÉFI DES", "FRÉQUENCES"],
        "accroche": acc_proba_frequence_defi_4e,
        "dossier": "4e/maths/probabilites/13-frequence-defi",
    },
    # 15/10/2026 — probabilités 3e, 01-vocabulaire, CEINTURE VERTE.
    "eleveai-maths-3e-proba-vocabulaire": {
        "badge": "MATHS · 3E", "duree": "EN 3 MIN",
        "titre": ["LE VOCABULAIRE", "DES PROBABILITÉS"],
        "accroche": acc_proba_vocabulaire_3e,
        "dossier": "3e/maths/probabilites/01-vocabulaire",
    },
    # 15/10/2026 — probabilités 3e, 02-issues, CEINTURE VERTE.
    "eleveai-maths-3e-proba-issue": {
        "badge": "MATHS · 3E", "duree": "EN 2 MIN",
        "titre": ["LES ISSUES", "D'UNE EXPÉRIENCE"],
        "accroche": acc_proba_issue_3e,
        "dossier": "3e/maths/probabilites/02-issues",
    },
    # 15/10/2026 — probabilités 3e, 03-equiprobabilite, CEINTURE VERTE.
    "eleveai-maths-3e-proba-equiprobabilite": {
        "badge": "MATHS · 3E", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "L'ÉQUIPROBABILITÉ"],
        "accroche": acc_proba_equiprobabilite_3e,
        "dossier": "3e/maths/probabilites/03-equiprobabilite",
    },
    # 15/10/2026 — probabilités 3e, 04-evenements, CEINTURE VERTE.
    "eleveai-maths-3e-proba-evenement": {
        "badge": "MATHS · 3E", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "LES ÉVÉNEMENTS"],
        "accroche": acc_proba_evenement_3e,
        "dossier": "3e/maths/probabilites/04-evenements",
    },
    # 15/10/2026 — probabilités 3e, 05-calculer, CEINTURE VERTE.
    "eleveai-maths-3e-proba-calculer": {
        "badge": "MATHS · 3E", "duree": "EN 2 MIN",
        "titre": ["CALCULER UNE", "PROBABILITÉ"],
        "accroche": acc_proba_calculer_3e,
        "dossier": "3e/maths/probabilites/05-calculer",
    },
    # 15/10/2026 — probabilités 3e, 06-contraire, CEINTURE VERTE.
    "eleveai-maths-3e-proba-contraire": {
        "badge": "MATHS · 3E", "duree": "EN 2 MIN",
        "titre": ["L'ÉVÉNEMENT", "CONTRAIRE"],
        "accroche": acc_proba_contraire_3e,
        "dossier": "3e/maths/probabilites/06-contraire",
    },
    # 15/10/2026 — probabilités 3e, 07-deux-epreuves, CEINTURE VERTE.
    "eleveai-maths-3e-proba-deux-epreuves": {
        "badge": "MATHS · 3E", "duree": "EN 2 MIN",
        "titre": ["DEUX ÉPREUVES :", "L'ARBRE"],
        "accroche": acc_proba_deux_epreuves_3e,
        "dossier": "3e/maths/probabilites/07-deux-epreuves",
    },
    # 15/10/2026 — probabilités 3e, 08-defis, CEINTURE VERTE.
    "eleveai-maths-3e-proba-defi": {
        "badge": "MATHS · 3E", "duree": "EN 2 MIN",
        "titre": ["LES DÉFIS DES", "PROBABILITÉS"],
        "accroche": acc_proba_defi_3e,
        "dossier": "3e/maths/probabilites/08-defis",
    },
    # 14/10/2026 — BANDE-ANNONCE de la série « Probabilités, de l'école à la terminale » (≈ 1:40).
    "eleveai-annonce-probabilites": {
        "badge": "PROBABILITÉS · CM1 → TLE", "duree": "DONNE TON AVIS",
        "titre": ["QUELLE CLASSE", "EN PREMIER ?"],
        "accroche": acc_annonce_probabilites,
        "dossier": "annonce/probabilites",
    },
    # 13/10/2026 — expression littérale 3e, 01-comprendre, CEINTURE VERTE (≈ 3 min).
    "eleveai-maths-3e-expression-comprendre": {
        "badge": "MATHS · 3E", "duree": "EN 3 MIN",
        "titre": ["À QUOI SERT UNE LETTRE", "EN MATHS ?"],
        "accroche": acc_expression_comprendre_3e,
        "dossier": "3e/maths/expression-litterale/01-comprendre",
    },
    # 13/10/2026 — expression littérale 3e, 02-substituer, CEINTURE VERTE (≈ 3 min).
    "eleveai-maths-3e-expression-substituer": {
        "badge": "MATHS · 3E", "duree": "EN 3 MIN",
        "titre": ["CALCULER UNE", "EXPRESSION LITTÉRALE"],
        "accroche": acc_expression_substituer_3e,
        "dossier": "3e/maths/expression-litterale/02-substituer",
    },
    # 13/10/2026 — expression littérale 3e, 03-reduire, CEINTURE VERTE (≈ 3 min).
    "eleveai-maths-3e-expression-reduire": {
        "badge": "MATHS · 3E", "duree": "EN 3 MIN",
        "titre": ["UN MOINS DEVANT", "UNE PARENTHÈSE"],
        "accroche": acc_expression_reduire_3e,
        "dossier": "3e/maths/expression-litterale/03-reduire",
    },
    # 13/10/2026 — expression littérale 3e, 04-developper, CEINTURE VERTE (≈ 3 min).
    "eleveai-maths-3e-expression-developper": {
        "badge": "MATHS · 3E", "duree": "EN 3 MIN",
        "titre": ["LA DOUBLE", "DISTRIBUTIVITÉ"],
        "accroche": acc_expression_developper_3e,
        "dossier": "3e/maths/expression-litterale/04-developper",
    },
    # 13/10/2026 — expression littérale 3e, 05-factoriser, CEINTURE VERTE (≈ 3 min).
    "eleveai-maths-3e-expression-factoriser": {
        "badge": "MATHS · 3E", "duree": "EN 3 MIN",
        "titre": ["COMPRENDRE", "LA FACTORISATION"],
        "accroche": acc_expression_factoriser_3e,
        "dossier": "3e/maths/expression-litterale/05-factoriser",
    },
    # 13/10/2026 — expression littérale 3e, 06-identites, CEINTURE VERTE (≈ 3 min).
    "eleveai-maths-3e-expression-identites": {
        "badge": "MATHS · 3E", "duree": "EN 3 MIN",
        "titre": ["LES IDENTITÉS", "REMARQUABLES"],
        "accroche": acc_expression_identites_3e,
        "dossier": "3e/maths/expression-litterale/06-identites",
    },
    # 13/10/2026 — expression littérale 4e, 01-comprendre, CEINTURE ORANGE (2:46 → « 3 min »).
    "eleveai-maths-4e-expression-comprendre": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["COMPRENDRE UNE", "EXPRESSION LITTÉRALE"],
        "accroche": acc_expression_comprendre_4e,
        "dossier": "4e/maths/expression-litterale/01-comprendre",
    },
    # 13/10/2026 — expression littérale 4e, 02-traduire, CEINTURE ORANGE (2:38 → « 3 min »).
    "eleveai-maths-4e-expression-traduire": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["TRADUIRE UNE PHRASE", "EN EXPRESSION"],
        "accroche": acc_expression_traduire_4e,
        "dossier": "4e/maths/expression-litterale/02-traduire",
    },
    # 13/10/2026 — expression littérale 4e, 03-substituer, CEINTURE ORANGE (2:32 → « 3 min »).
    "eleveai-maths-4e-expression-substituer": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["CALCULER UNE", "EXPRESSION LITTÉRALE"],
        "accroche": acc_expression_substituer_4e,
        "dossier": "4e/maths/expression-litterale/03-substituer",
    },
    # 13/10/2026 — expression littérale 4e, 04-reduire, CEINTURE ORANGE (2:53 → « 3 min »).
    "eleveai-maths-4e-expression-reduire": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["RÉDUIRE UNE", "EXPRESSION LITTÉRALE"],
        "accroche": acc_expression_reduire_4e,
        "dossier": "4e/maths/expression-litterale/04-reduire",
    },
    # 13/10/2026 — expression littérale 5e, 02-traduire, CEINTURE JAUNE (2:38 → « 3 min »).
    "eleveai-maths-5e-expression-traduire": {
        "badge": "MATHS · 5E", "duree": "EN 3 MIN",
        "titre": ["TRADUIRE UNE PHRASE", "EN EXPRESSION"],
        "accroche": acc_expression_traduire_5e,
        "dossier": "5e/maths/expression-litterale/02-traduire",
    },
    # 13/10/2026 — expression littérale 5e, 03-substituer, CEINTURE JAUNE (2:31 → « 3 min »).
    "eleveai-maths-5e-expression-substituer": {
        "badge": "MATHS · 5E", "duree": "EN 3 MIN",
        "titre": ["CALCULER UNE", "EXPRESSION LITTÉRALE"],
        "accroche": acc_expression_substituer_5e,
        "dossier": "5e/maths/expression-litterale/03-substituer",
    },
    # 13/10/2026 — expression littérale 5e, 04-reduire, CEINTURE JAUNE (2:46 → « 3 min »).
    "eleveai-maths-5e-expression-reduire": {
        "badge": "MATHS · 5E", "duree": "EN 3 MIN",
        "titre": ["RÉDUIRE UNE", "EXPRESSION LITTÉRALE"],
        "accroche": acc_expression_reduire_5e,
        "dossier": "5e/maths/expression-litterale/04-reduire",
    },
    # 13/10/2026 — expression littérale 5e, 05-tester, CEINTURE JAUNE (2:44 → « 3 min »).
    "eleveai-maths-5e-expression-tester": {
        "badge": "MATHS · 5E", "duree": "EN 3 MIN",
        "titre": ["TESTER UNE ÉGALITÉ", "AVEC UNE LETTRE"],
        "accroche": acc_expression_tester_5e,
        "dossier": "5e/maths/expression-litterale/05-tester",
    },
    # 13/10/2026 — expression littérale 5e, 06-developper, CEINTURE JAUNE (2:43 → « 3 min »).
    "eleveai-maths-5e-expression-developper": {
        "badge": "MATHS · 5E", "duree": "EN 3 MIN",
        "titre": ["DÉVELOPPER UNE", "EXPRESSION : k(a + b)"],
        "accroche": acc_expression_developper_5e,
        "dossier": "5e/maths/expression-litterale/06-developper",
    },
    # 13/10/2026 — expression littérale 5e, épisode 1 : comprendre, CEINTURE JAUNE (2:43 → « 3 min »).
    "eleveai-maths-5e-expression-comprendre": {
        "badge": "MATHS · 5E", "duree": "EN 3 MIN",
        "titre": ["COMPRENDRE UNE", "EXPRESSION LITTÉRALE"],
        "accroche": acc_expression_comprendre_5e,
        # Frédéric, 13/10 : la série a SON dossier, un sous-dossier par micro.
        "dossier": "5e/maths/expression-litterale/01-comprendre",
    },
    # 13/10/2026 — Pythagore dans un solide (le gobelet du brevet 2026), 3e, CEINTURE VERTE (3:59 → « 4 min »).
    "eleveai-maths-3e-pythagore-solide": {
        "badge": "MATHS · 3E", "duree": "EN 4 MIN",
        "titre": ["PYTHAGORE DANS", "UN SOLIDE"],
        "accroche": acc_gobelet_3e,
        "dossier": "3e/maths/pythagore/01-gobelet-brevet",
    },
    # 13/10/2026 — Pythagore, le défi du cube, 4e, CEINTURE ORANGE (≈ 1:55 → « 2 min »).
    "eleveai-maths-4e-pythagore-defi-cube": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["COMBIEN DE TRIANGLES", "RECTANGLES DANS UN CUBE ?"],
        "accroche": acc_defi_cube_4e,
        "dossier": "4e/maths/pythagore/08-defi-cube",
    },
    # 13/10/2026 — Pythagore épisode 7 : rédiger, 4e, CEINTURE JAUNE (3:19 → « 3 min »).
    "eleveai-maths-4e-pythagore-rediger": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["THÉORÈME OU", "RÉCIPROQUE ?"],
        "accroche": acc_rediger_4e,
        "dossier": "4e/maths/pythagore/07-rediger",
    },
    # 13/10/2026 — Pythagore épisode 6 : la réciproque (2/2), 4e, CEINTURE JAUNE (≈ 3:32 → « 4 min »).
    "eleveai-maths-4e-pythagore-reciproque": {
        "badge": "MATHS · 4E", "duree": "EN 4 MIN",
        "titre": ["LA RÉCIPROQUE", "DE PYTHAGORE"],
        "accroche": acc_reciproque_4e,
        "dossier": "4e/maths/pythagore/06-reciproque",
    },
    # 13/10/2026 — Pythagore épisode 5 : vérifier une égalité, 4e, CEINTURE JAUNE (≈ 3:32 → « 4 min »).
    "eleveai-maths-4e-pythagore-verifier": {
        "badge": "MATHS · 4E", "duree": "EN 4 MIN",
        "titre": ["VÉRIFIER UNE ÉGALITÉ", "DE PYTHAGORE"],
        "accroche": acc_verifier_4e,
        "dossier": "4e/maths/pythagore/05-verifier",
    },
    # 13/10/2026 — Pythagore épisode 4 : calculer un côté, 4e, CEINTURE JAUNE (≈ 3:06 → « 3 min »).
    "eleveai-maths-4e-pythagore-cote": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["CALCULER UN CÔTÉ", "DE L'ANGLE DROIT"],
        "accroche": acc_cote_4e,
        "dossier": "4e/maths/pythagore/04-cote",
    },
    # 14/10/2026 — les bouchons au rond-point, « Les maths en vrai », Tle, CEINTURE NOIRE (3:35 → « 4 min »).
    "eleveai-maths-974-rond-point-paysage": {
        "badge": "MATHS · TERMINALE", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE", "LES BOUCHONS"],
        "accroche": acc_rond_point_974,
        "dossier": "974/maths/paysage/fr/rond-point",
    },
    # 13/10/2026 — l'eau à La Réunion, « Les maths en vrai », 5e, CEINTURE VERTE (6:21 → « 6 min »).
    "eleveai-maths-974-eau-paysage": {
        "badge": "MATHS · 5E", "duree": "EN 6 MIN",
        "titre": ["COMPRENDRE L'EAU", "À LA RÉUNION"],
        "accroche": acc_eau_974,
        "dossier": "974/maths/paysage/fr/eau",
    },
    # 12/10/2026 — Pythagore épisode 3 : calculer l'hypoténuse, 4e, CEINTURE JAUNE (≈ 3:38 → « 4 min »).
    "eleveai-maths-4e-pythagore-hypotenuse": {
        "badge": "MATHS · 4E", "duree": "EN 4 MIN",
        "titre": ["CALCULER", "L'HYPOTÉNUSE"],
        "accroche": acc_hypotenuse_calcul_4e,
        "dossier": "4e/maths/pythagore/03-hypotenuse-calcul",
    },
    # 12/10/2026 — factoriser, 4e/3e (≈ 3:48 → « 4 min »).
    "eleveai-maths-4e-litteral-factoriser": {
        "badge": "MATHS · 4E ET 3E", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE", "LA FACTORISATION"],
        "accroche": acc_factoriser_4e,
    },
    # 12/10/2026 — Pythagore épisode 2 : carré et racine, 4e, CEINTURE JAUNE (2:33 → « 3 min »).
    "eleveai-maths-4e-pythagore-carre-racine": {
        "badge": "MATHS · 4E", "duree": "EN 3 MIN",
        "titre": ["COMPRENDRE LE CARRÉ", "ET LA RACINE CARRÉE"],
        "accroche": acc_carre_racine_4e,
        "dossier": "4e/maths/pythagore/02-carre-racine",
    },
    # 12/10/2026 — Pythagore épisode 1 : l'hypoténuse, 4e, CEINTURE JAUNE (2:10 → « 2 min »).
    "eleveai-maths-4e-pythagore-reconnaitre": {
        "badge": "MATHS · 4E", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "L'HYPOTÉNUSE"],
        "accroche": acc_hypotenuse_4e,
        # Frédéric, 12/10 : la série Pythagore a SON dossier, un sous-dossier par épisode.
        "dossier": "4e/maths/pythagore/01-hypotenuse",
    },
    # 12/10/2026 — analyse graphique, seconde, CEINTURE VERTE (≈ 4:45 → « 5 min »).
    "eleveai-maths-seconde-analyse-graphique": {
        "badge": "MATHS · SECONDE", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE L'ANALYSE", "GRAPHIQUE"],
        "accroche": acc_analyse_graphique_2de,
    },
    # 12/10/2026 — isoler une lettre, seconde / 1re / STMG (≈ 3:06 → « 3 min »). Titre de Frédéric.
    "eleveai-maths-seconde-isoler-une-lettre": {
        "badge": "MATHS · 2DE, 1RE, STMG", "duree": "EN 3 MIN",
        "titre": ["UNE FORMULE", "= 3 FORMULES"],
        "accroche": acc_isoler_lettre,
    },
    # 11/10/2026 — le tableau de signes, seconde, CEINTURE VERTE (6:17 → « 6 min »).
    "eleveai-maths-seconde-signes-expression": {
        "badge": "MATHS · SECONDE", "duree": "EN 6 MIN",
        "titre": ["COMPRENDRE LE", "TABLEAU DE SIGNES"],
        "accroche": acc_signes_2de,
    },
    # 11/10/2026 — le cosinus, 4e (≈ 5:20 → « 5 min »).
    "eleveai-maths-4e-trigo-cosinus": {
        "badge": "MATHS · 4E", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE", "LE COSINUS"],
        "accroche": acc_cosinus_4e,
    },
    # 11/10/2026 — sinus, cosinus, tangente, 3e (≈ 5:16 → « 5 min »).
    "eleveai-maths-3e-trigo-trigonometrie": {
        "badge": "MATHS · 3E", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE LA", "TRIGONOMÉTRIE"],
        "accroche": acc_trigo_3e,
    },
    # 10/10/2026 — continuité et TVI, terminale spé (≈ 4:20 → « 4 min »).
    "eleveai-maths-terminale-continuite-tvi": {
        "badge": "MATHS · TERMINALE", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE", "LE TVI"],
        "accroche": acc_tvi_terminale,
    },
    # 10/10/2026 — second degré par la forme factorisée, 1re sans spé et STMG (≈ 3:41 → « 4 min »).
    "eleveai-maths-premiere-degre2-forme-factorisee": {
        "badge": "MATHS · 1RE ET STMG", "duree": "EN 4 MIN",
        "titre": ["LE SECOND DEGRÉ", "SANS DISCRIMINANT"],
        "accroche": acc_degre2_premiere,
    },
    # 10/10/2026 — résoudre une équation, 3e (≈ 4:58 → « 5 min »).
    "eleveai-maths-3e-equation-resolution": {
        "badge": "MATHS · 3E", "duree": "EN 5 MIN",
        "titre": ["ÉQUATIONS :", "LE PRODUIT NUL"],
        "accroche": acc_equation_3e,
    },
    # 10/10/2026 — résoudre une équation, 4e (≈ 4:50 → « 5 min »).
    "eleveai-maths-4e-equation-resolution": {
        "badge": "MATHS · 4E", "duree": "EN 5 MIN",
        "titre": ["RÉSOUDRE", "UNE ÉQUATION"],
        "accroche": acc_equation_4e,
    },
    # 09/10/2026 — développer, 4e (≈ 4:21 → « 4 min »).
    "eleveai-maths-4e-litteral-developper": {
        "badge": "MATHS · 4E", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE", "LE DÉVELOPPEMENT"],
        "accroche": acc_developper_4e,
    },
    # 09/10/2026 — le calcul littéral, 5e (4:54 → « 5 min »).
    "eleveai-maths-5e-litteral-calcul": {
        "badge": "MATHS · 5E", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE LE", "CALCUL LITTÉRAL"],
        "accroche": acc_litteral_5e,
    },
    # 08/10/2026 — les nombres relatifs, 5e (3:49 → « 4 min »).
    "eleveai-maths-5e-relatif-nombre": {
        "badge": "MATHS · 5E", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE LES", "NOMBRES RELATIFS"],
        "accroche": acc_relatif_5e,
    },
    # 05/10/2026 — calculer avec les fractions, 6e (4:46 → « 5 min »).
    "eleveai-maths-6e-fraction-calcul": {
        "badge": "MATHS · 6E", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE LE CALCUL", "AVEC LES FRACTIONS"],
        "accroche": acc_fraction_calcul_6e,
    },
    # 05/10/2026 — la demi-droite graduée, 6e (4:13 → « 4 min »).
    "eleveai-maths-6e-demi-droite-graduee": {
        "badge": "MATHS · 6E", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE LA", "DEMI-DROITE GRADUÉE"],
        "accroche": acc_demi_droite_6e,
    },
    # 04/10/2026 — la proportionnalité de 4e (5:42 → « 6 min »).
    "eleveai-maths-4e-prop-proportionnalite": {
        "badge": "MATHS · 4E", "duree": "EN 6 MIN",
        "titre": ["COMPRENDRE LA", "PROPORTIONNALITÉ"],
        "accroche": acc_proportionnalite_4e,
    },
    # 03/10/2026 — la vidéo des pourcentages de 4e (≈ 4:45 → « 5 min »).
    "eleveai-maths-4e-prop-pourcentages": {
        "badge": "MATHS · 4E", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE LES", "POURCENTAGES"],
        "accroche": acc_pourcentages_4e,
    },
    # 02/10/2026 — la première vidéo PARLÉE de 4e. 4:41 → « 5 min ».
    "eleveai-maths-4e-prop-ratio": {
        "badge": "MATHS · 4E", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE", "LES RATIOS"],
        "accroche": acc_ratio_4e,
    },
    # 01/10/2026 — les deux premières vidéos PARLÉES de 6e. 4:10 → « 4 min ».
    "eleveai-maths-6e-entier-nombre": {
        "badge": "MATHS · 6E", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE LES", "NOMBRES ENTIERS"],
        "accroche": acc_entier_6e,
    },
    # Titre de Frédéric : « Tout comprendre sur les décimaux ».
    "eleveai-maths-6e-decimal-nombre": {
        "badge": "MATHS · 6E", "duree": "EN 6 MIN",
        "titre": ["TOUT COMPRENDRE SUR", "LES NOMBRES DÉCIMAUX"],
        "accroche": acc_decimal_6e,
    },
    # 04/10/2026 — calculer avec les décimaux, 6e (≈ 5:52 → « 6 min »).
    "eleveai-maths-6e-decimal-calcul": {
        "badge": "MATHS · 6E", "duree": "EN 6 MIN",
        "titre": ["COMPRENDRE LE CALCUL", "AVEC LES DÉCIMAUX"],
        "accroche": acc_decimal_calcul_6e,
    },
    # 7:57 → « 8 min ». La leçon « rouge et vert » (28/09), plan de Frédéric.
    "eleveai-maths-premiere-trigonometrie-rouge-vert": {
        "badge": "MATHS · 1RE SPÉ", "duree": "EN 8 MIN",
        "titre": ["COMPRENDRE LE", "CERCLE TRIGONOMÉTRIQUE"],
        "accroche": acc_rouge_vert,
    },
    # 6:24 → « 6 min ». Vidéo 1 sur 2 de la trigonométrie de 1re spé (27/09).
    "eleveai-maths-premiere-trigonometrie-cercle": {
        "badge": "MATHS · 1RE SPÉ", "duree": "EN 6 MIN",
        "titre": ["COMPRENDRE LE", "CERCLE TRIGONOMÉTRIQUE"],
        "accroche": acc_cercle_trigo,
    },
    # 8:15 → « 8 min ». ⚠️ Chapitre enseigné en JANVIER : peu de vues avant,
    # c'est le calendrier, pas la miniature.
    "eleveai-maths-seconde-fonctions-reference": {
        "badge": "MATHS · SECONDE", "duree": "EN 8 MIN",
        "titre": ["COMPRENDRE LES", "FONCTIONS DE RÉFÉRENCE"],
        "accroche": acc_fonctions_reference,
    },
    "eleveai-maths-seconde-developpement-factorisation": {
        "badge": "MATHS · SECONDE", "duree": "EN 4 MIN",
        "titre": ["COMPRENDRE :", "DÉVELOPPER, FACTORISER"],
        "accroche": acc_devfac,
    },
    "eleveai-maths-seconde-arithmetique": {
        "badge": "MATHS · SECONDE", "duree": "EN 5 MIN",
        "titre": ["COMPRENDRE", "MULTIPLES, DIVISEURS", "ET NOMBRES PREMIERS"],
        "accroche": acc_premiers,
    },
}


# 17/10/2026 — TEST YouTube PROBABILITÉS : 5 classes × épisodes 1 et 2 (CM1, CM2 blanche ;
# 2de bleue ; 1re spé marron ; Tle spé noire). Le piège de l'épisode + l'échelle ENTIÈRE.
def _piege_test(ceinture, haut, bas, t_haut=66, t_bas=58):
    def f(d):
        from miniature_short_expression import echelle
        # rétrécit jusqu'à tenir à gauche de Ti-Margo
        th, tb = t_haut, t_bas
        while th > 40 and d.textlength(haut, font=police("ariblk.ttf", th)) > 880:
            th -= 2
        while tb > 36 and d.textlength(bas, font=police("ariblk.ttf", tb)) > 880:
            tb -= 2
        d.text((56, 350), haut, font=police("ariblk.ttf", th), fill=BLEU)
        d.text((64, 490), bas, font=police("ariblk.ttf", tb), fill=ROUGE)
        # blanche/jaune : nommée à gauche, elle toucherait « eleveai.fr » → échelle décalée
        echelle(d, 700 if ceinture in ("blanche", "jaune") else 640, 592, ceinture, s=0.5)
    return f


ESSAIS.update({
    "eleveai-maths-cm1-proba-vocabulaire": {
        "badge": "MATHS · CM1", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE CERTAIN,", "POSSIBLE, IMPOSSIBLE"],
        "accroche": _piege_test("blanche", "1 bille bleue : impossible ?", "non : elle est là, c'est possible !"),
        "dossier": "cm1/maths/probabilites/01-vocabulaire",
    },
    "eleveai-maths-cm1-proba-hasard": {
        "badge": "MATHS · CM1", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "LE HASARD"],
        "accroche": _piege_test("blanche", "6, 6, 6… encore un 6 ?", "le dé n'a pas de mémoire !", 76),
        "dossier": "cm1/maths/probabilites/02-hasard",
    },
    "eleveai-maths-cm2-proba-vocabulaire": {
        "badge": "MATHS · CM2", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "LES CHANCES AU DÉ"],
        "accroche": _piege_test("blanche", "3 chances sur 6… ou sur 3 ?", "sur 6 : on compte TOUS les cas"),
        "dossier": "cm2/maths/probabilites/01-vocabulaire",
    },
    "eleveai-maths-cm2-proba-hasard": {
        "badge": "MATHS · CM2", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "LE HASARD"],
        "accroche": _piege_test("blanche", "Pile 4 fois : face, plus sûr ?", "non : toujours 1 chance sur 2"),
        "dossier": "cm2/maths/probabilites/02-hasard",
    },
    "eleveai-maths-seconde-proba-vocabulaire": {
        "badge": "MATHS · 2DE", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE UNIVERS,", "ISSUE, ÉVÉNEMENT"],
        "accroche": _piege_test("bleue", "11 totaux = 11 chances égales ?", "non : le 7 sort 6 fois plus que le 2"),
        "dossier": "seconde/maths/probabilites/01-vocabulaire",
    },
    "eleveai-maths-seconde-proba-modele": {
        "badge": "MATHS · 2DE", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE UNE", "LOI DE PROBABILITÉ"],
        "accroche": _piege_test("bleue", "Dé truqué : P(pair) = 3/6 ?", "non : 4/7", 72, 68),
        "dossier": "seconde/maths/probabilites/02-loi-de-probabilite",
    },
    "eleveai-maths-premiere-proba-conditionnelle": {
        "badge": "MATHS · 1RE SPÉ", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE LES PROBAS", "CONDITIONNELLES"],
        "accroche": _piege_test("marron", "P(S sachant D) = 45/200 ?", "non : on divise par 120"),
        "dossier": "premiere/maths/probabilites/01-conditionnelle",
    },
    "eleveai-maths-premiere-proba-registres": {
        "badge": "MATHS · 1RE SPÉ", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE « PARMI »", "ET « SACHANT QUE »"],
        "accroche": _piege_test("marron", "30 % ou 60 % ?", "parmi QUI ? le groupe en indice", 80),
        "dossier": "premiere/maths/probabilites/02-parmi-sachant",
    },
    "eleveai-maths-terminale-proba-arbre": {
        "badge": "MATHS · TLE SPÉ", "duree": "EN 3 MIN",
        "titre": ["COMPRENDRE", "L'ARBRE PONDÉRÉ"],
        "accroche": _piege_test("noire", "0,3 + 0,2 ?", "non : 0,6 × 0,3 + 0,4 × 0,2", 80),
        "dossier": "terminale/maths/probabilites/01-arbre-pondere",
    },
    "eleveai-maths-terminale-proba-formule": {
        "badge": "MATHS · TLE SPÉ", "duree": "EN 3 MIN",
        "titre": ["COMPRENDRE LA FORMULE", "ET L'INVERSION"],
        "accroche": _piege_test("noire", "Test fiable à 95 %…", "et seulement 33 % de malades !"),
        "dossier": "terminale/maths/probabilites/02-formule-et-inversion",
    },
})

# 17/10/2026 — même TEST, suite : STMG et 1re tronc commun (bleue), écologie / business.
ESSAIS.update({
    "eleveai-maths-stmg-proba-reconnaitre": {
        "badge": "MATHS · STMG", "duree": "EN 3 MIN",
        "titre": ["COMPRENDRE LES PROBAS", "CONDITIONNELLES"],
        "accroche": _piege_test("bleue", "150 sur 200 ou sur 500 ?", "tout dépend du mot PARMI"),
        "dossier": "stmg/maths/probabilites/01-reconnaitre",
    },
    "eleveai-maths-stmg-proba-notation": {
        "badge": "MATHS · STMG", "duree": "EN 2 MIN",
        "titre": ["ÉCRIRE UNE PROBA", "CONDITIONNELLE"],
        "accroche": _piege_test("bleue", "T sachant R = R sachant T ?", "non : 0,7 et 0,8, deux groupes !"),
        "dossier": "stmg/maths/probabilites/02-notation",
    },
    "eleveai-maths-premiere-commun-proba-encadrement": {
        "badge": "MATHS · 1RE", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE : UNE PROBA", "EST ENTRE 0 ET 1"],
        "accroche": _piege_test("bleue", "120 % de chances ?", "IMPOSSIBLE : jamais plus que 1", 80),
        "dossier": "premiere-commun/maths/probabilites/01-entre-0-et-1",
    },
    "eleveai-maths-premiere-commun-proba-contraire": {
        "badge": "MATHS · 1RE", "duree": "EN 2 MIN",
        "titre": ["COMPRENDRE", "L'ÉVÉNEMENT CONTRAIRE"],
        "accroche": _piege_test("bleue", "Contraire d’en avance = en retard ?", "non : « pas en avance » !"),
        "dossier": "premiere-commun/maths/probabilites/02-contraire",
    },
})

# 19/10/2026 — lycée, bloc A, lot 1 : 4 micros COMMUNES à la STMG et à la 1re
# tronc commun (une voix, deux rendus, une miniature par classe).
for _cl, _bd in (("stmg", "STMG"), ("premiere-commun", "1RE")):
    for _k, _dos, _titre, _haut, _bas, _c in (
        ("tableau", "03-tableau", ["COMPRENDRE LES PROBAS", "AVEC UN TABLEAU"],
         "48 sur 200 ?", "non : 48 sur 80, la ligne D !", "bleue"),
        ("distinguer", "04-distinguer", ["NE PLUS CONFONDRE", "TROIS PROBABILITÉS"],
         "Même 120 en haut…", "trois réponses : 0,24 · 0,4 · 0,6", "bleue"),
        ("interpreter", "05-interpreter", ["COMPRENDRE UNE PROBA", "CONDITIONNELLE EN PHRASE"],
         "75 % dans l'autre sens ?", "non : une maison sur deux !", "bleue"),
        ("faux-positifs", "06-faux-positifs", ["COMPRENDRE", "LES FAUX POSITIFS"],
         "Le détecteur sonne…", "défectueux ? seulement 0,16 !", "marron"),
    ):
        ESSAIS[f"eleveai-maths-{_cl}-proba-{_k}"] = {
            "badge": f"MATHS · {_bd}", "duree": "EN 3 MIN", "titre": _titre,
            "accroche": _piege_test(_c, _haut, _bas),
            "dossier": f"{_cl}/maths/probabilites/{_dos}",
        }

# 19/10/2026 — lot 5 : variables aléatoires, communes STMG / 1re SPÉ.
for _cl, _dosc, _bd in (("stmg", "stmg", "STMG"), ("premiere", "premiere", "1RE SPÉ")):
    for _k, _dos, _titre, _haut, _bas in (
        ("va-notation", "23-va-notation", ["COMPRENDRE", "X = a ET X ≤ a"], "X ≤ 2, c'est X = 2 ?", "non : 0 ET 2 !"),
        ("va-loi", "24-va-loi", ["DRESSER LA LOI", "D'UNE VARIABLE ALÉATOIRE"], "0, 1, 2 piles : 1/3 chacun ?", "non : 0,25 · 0,5 · 0,25"),
        ("va-esperance", "25-va-esperance", ["COMPRENDRE", "L'ESPÉRANCE"], "(0 + 2 + 10) ÷ 3 = 4 ?", "FAUX : E(X) = 1,6 !"),
        ("va-equitable", "26-va-equitable", ["UN JEU", "EST-IL ÉQUITABLE ?"], "5 × 0,2 = 1 € de gain ?", "non : la mise !"),
        ("va-moyenne", "27-va-moyenne", ["L'ESPÉRANCE,", "UNE MOYENNE"], "1,6 € à chaque partie ?", "non : à long terme !"),
    ):
        ESSAIS[f"eleveai-maths-{_cl}-proba-{_k}"] = {
            "badge": f"MATHS · {_bd}", "duree": "EN 3 MIN", "titre": _titre,
            "accroche": _piege_test("bleue", _haut, _bas),
            "dossier": f"{_dosc}/maths/probabilites/{_dos}",
        }

# 19/10/2026 — lot 4 : Bernoulli et répétitions (STMG / 1re).
for _cl, _bd in (("stmg", "STMG"), ("premiere-commun", "1RE")):
    for _k, _dos, _titre, _haut, _bas, _c in (
        ("bern-epreuve", "18-bern-epreuve", ["COMPRENDRE", "L'ÉPREUVE DE BERNOULLI"],
         "Un dé : 6 issues…", "« 6 ou pas 6 » : 2 issues !", "bleue"),
        ("bern-repetition", "19-bern-repetition", ["RÉPÉTER", "UNE ÉPREUVE"],
         "3 lancers : 6 résultats ?", "non : 2 × 2 × 2 = 8 !", "bleue"),
        ("bern-arbre", "20-bern-arbre", ["L'ARBRE DE", "TROIS ÉPREUVES"],
         "2 graines sur 3 : 1 chemin ?", "non : 3 chemins !", "bleue"),
        ("bern-calculer", "21-bern-calculer", ["CALCULER SUR", "UNE RÉPÉTITION"],
         "Exactement 2 : 0,128 ?", "non : 3 × 0,128 = 0,384 !", "bleue"),
        ("au-moins-un", "22-au-moins-un", ["« AU MOINS UN » :", "L'ASTUCE"],
         "0,1 + 0,1 + 0,1 ?", "non : 1 − 0,729 = 0,271 !", "bleue"),
    ):
        ESSAIS[f"eleveai-maths-{_cl}-proba-{_k}"] = {
            "badge": f"MATHS · {_bd}", "duree": "EN 3 MIN", "titre": _titre,
            "accroche": _piege_test(_c, _haut, _bas),
            "dossier": f"{_cl}/maths/probabilites/{_dos}",
        }

# 19/10/2026 — lot 3 : indépendance et tirages avec / sans remise (STMG / 1re).
for _cl, _bd in (("stmg", "STMG"), ("premiere-commun", "1RE")):
    for _k, _dos, _titre, _haut, _bas, _c in (
        ("indep-definition", "13-indep-definition", ["COMPRENDRE", "L'INDÉPENDANCE"],
         "Indépendants = sans rapport ?", "non : 0,25 = 0,25 !", "bleue"),
        ("indep-produit", "14-indep-produit", ["COMPRENDRE", "LA RÈGLE DU PRODUIT"],
         "P(A ∩ B) = P(A) × P(B) ?", "SEULEMENT si indépendants !", "bleue"),
        ("indep-justifier", "15-indep-justifier", ["PROUVER", "L'INDÉPENDANCE"],
         "Un seul nombre suffit ?", "non : 0,24 contre 0,24 !", "bleue"),
        ("indep-incompatible", "16-indep-incompatible", ["INDÉPENDANTS OU", "INCOMPATIBLES ?"],
         "Incompatibles = indépendants ?", "presque le CONTRAIRE !", "bleue"),
        ("remise", "17-remise", ["AVEC OU", "SANS REMISE"],
         "0,3 × 0,3 sans remise ?", "FAUX : 3/10 × 2/9 !", "bleue"),
    ):
        ESSAIS[f"eleveai-maths-{_cl}-proba-{_k}"] = {
            "badge": f"MATHS · {_bd}", "duree": "EN 3 MIN", "titre": _titre,
            "accroche": _piege_test(_c, _haut, _bas),
            "dossier": f"{_cl}/maths/probabilites/{_dos}",
        }

# 19/10/2026 — lot 2 : les 6 micros d'ARBRE PONDÉRÉ communes STMG / 1re.
for _cl, _bd in (("stmg", "STMG"), ("premiere-commun", "1RE")):
    for _k, _dos, _titre, _haut, _bas, _c in (
        ("arbre-lire", "07-arbre-lire", ["COMPRENDRE", "UN ARBRE PONDÉRÉ"],
         "Le 0,6 de l'arbre = P(A) ?", "non : P sachant E !", "bleue"),
        ("arbre-completer", "08-arbre-completer", ["COMPLÉTER", "UN ARBRE PONDÉRÉ"],
         "0,3 sur la branche ?", "non : 0,3 ÷ 0,4 = 0,75 !", "bleue"),
        ("arbre-construire", "09-arbre-construire", ["CONSTRUIRE", "UN ARBRE PONDÉRÉ"],
         "Croissant ou matin d'abord ?", "le « parmi » décide !", "bleue"),
        ("chemin", "10-chemin", ["COMPRENDRE", "LA PROBA D'UN CHEMIN"],
         "0,6 + 0,7 = 1,3 ?", "IMPOSSIBLE : on multiplie !", "bleue"),
        ("somme-chemins", "11-somme-chemins", ["COMPRENDRE LES", "PROBAS TOTALES"],
         "(0,1 + 0,4) ÷ 2 ?", "FAUX : 0,07 + 0,12 = 0,19", "bleue"),
        ("arbre-tableau", "12-arbre-tableau", ["DE L'ARBRE", "AU TABLEAU"],
         "360 sur 510 ?", "nulle part sur l'arbre !", "marron"),
    ):
        ESSAIS[f"eleveai-maths-{_cl}-proba-{_k}"] = {
            "badge": f"MATHS · {_bd}", "duree": "EN 3 MIN", "titre": _titre,
            "accroche": _piege_test(_c, _haut, _bas),
            "dossier": f"{_cl}/maths/probabilites/{_dos}",
        }


# 17/10/2026 — Grand Raid, Diagonale des Fous : les marches de 25 cm (6e, verte).
ESSAIS["eleveai-maths-6e-aire-longueur-convertir-diagonale"] = {
    "badge": "MATHS · 6E", "duree": "EN 3 MIN",
    "titre": ["COMPRENDRE LES", "CONVERSIONS"],
    "accroche": _piege_test("verte", "1000 m ÷ 25 cm = 40 marches ?", "non : 4000 ! (Diagonale des Fous)"),
    "dossier": "6e/maths/paysage/fr/aire-longueur-convertir",
}

# 18/10/2026 — même TEST, suite : CM1 et CM2, épisodes 3, 4, 5 (blanche ; défis jaune).
ESSAIS.update({
    "eleveai-maths-cm1-proba-comparer": {
        "badge": "MATHS · CM1", "duree": "EN 2 MIN",
        "titre": ["COMPARER", "DES CHANCES"],
        "accroche": _piege_test("blanche", "5 fraises, c'est plus que 2…", "et pourtant le petit sac gagne !"),
        "dossier": "cm1/maths/probabilites/03-comparer",
    },
    "eleveai-maths-cm1-proba-roue": {
        "badge": "MATHS · CM1", "duree": "EN 2 MIN",
        "titre": ["COMPTER", "LES CHANCES"],
        "accroche": _piege_test("blanche", "3 couleurs : 1 chance sur 3 ?", "non : 4 parts, le bleu 2 sur 4"),
        "dossier": "cm1/maths/probabilites/04-roue-de-sac",
    },
    "eleveai-maths-cm1-proba-defi": {
        "badge": "MATHS · CM1", "duree": "EN 2 MIN",
        "titre": ["LE GRAND DÉFI", "DU HASARD"],
        "accroche": _piege_test("jaune", "1 rouge sur 4 parts…", "combien pour faire jeu égal ?", 76),
        "dossier": "cm1/maths/probabilites/05-defis",
    },
    "eleveai-maths-cm2-proba-comparer": {
        "badge": "MATHS · CM2", "duree": "EN 2 MIN",
        "titre": ["COMPARER", "DES CHANCES"],
        "accroche": _piege_test("blanche", "4 gagnants, c'est plus que 2…", "mais 4 sur 20 contre 8 sur 20 !"),
        "dossier": "cm2/maths/probabilites/03-comparer",
    },
    "eleveai-maths-cm2-proba-roue": {
        "badge": "MATHS · CM2", "duree": "EN 2 MIN",
        "titre": ["COMPTER", "LES CHANCES"],
        "accroche": _piege_test("blanche", "Ne pas tomber sur le bleu ?", "8 − 4 = 4 : 4 chances sur 8"),
        "dossier": "cm2/maths/probabilites/04-roue-de-sac",
    },
    "eleveai-maths-cm2-proba-defi": {
        "badge": "MATHS · CM2", "duree": "EN 2 MIN",
        "titre": ["LE GRAND DÉFI", "DES PROBABILITÉS"],
        "accroche": _piege_test("jaune", "2 sur 6 ou 3 sur 12 ?", "ramène au même total !", 76),
        "dossier": "cm2/maths/probabilites/05-defis",
    },
})

# 18/10/2026 — même TEST, suite : la série PROBABILITÉS 6e, 9 épisodes (1-3 blanche, 4-9 jaune).
_P6 = "6e/maths/probabilites/"
ESSAIS.update({
    "eleveai-maths-6e-proba-vocabulaire": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["COMPRENDRE", "LA PROBABILITÉ"],
        "accroche": _piege_test("blanche", "Plus que certain ?", "non : jamais plus que 1 !", 76),
        "dossier": _P6 + "01-vocabulaire",
    },
    "eleveai-maths-6e-proba-comparer": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["COMPARER DES", "PROBABILITÉS"],
        "accroche": _piege_test("blanche", "3 couleurs = 1 chance sur 3 ?", "non : on compte les parts !"),
        "dossier": _P6 + "02-comparer",
    },
    "eleveai-maths-6e-proba-issue": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["COMPRENDRE", "LES ISSUES"],
        "accroche": _piege_test("blanche", "3 couleurs = 3 issues ?", "non : 5 parts, 5 issues !"),
        "dossier": _P6 + "03-issues",
    },
    "eleveai-maths-6e-proba-estimer": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["CALCULER UNE", "PROBABILITÉ"],
        "accroche": _piege_test("jaune", "Faire 6 : 6 sur 1 ?", "non : 1 sur 6, jamais plus que 1", 76),
        "dossier": _P6 + "04-calculer",
    },
    "eleveai-maths-6e-proba-lire": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["LIRE UNE", "SITUATION"],
        "accroche": _piege_test("jaune", "5 gagnants, 50 perdants…", "5 sur 50 ? non : 5 sur 55 !", 72, 62),
        "dossier": _P6 + "05-lire",
    },
    "eleveai-maths-6e-proba-defi": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["LES DÉFIS", "DES PROBABILITÉS"],
        "accroche": _piege_test("jaune", "Plus grand que 6 avec un dé ?", "impossible : la probabilité est 0 !"),
        "dossier": _P6 + "06-defis",
    },
    "eleveai-maths-6e-proba-frequence-calculer": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["COMPRENDRE", "LA FRÉQUENCE"],
        "accroche": _piege_test("jaune", "18 six : 18/100 ou 100/18 ?", "18/100 : jamais plus que 1 !", 72),
        "dossier": _P6 + "07-frequence",
    },
    "eleveai-maths-6e-proba-frequence-comparer": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["OBSERVÉ", "OU CALCULÉ ?"],
        "accroche": _piege_test("jaune", "13 six sur 60 : dé truqué ?", "non : le hasard fait varier"),
        "dossier": _P6 + "08-observe-calcule",
    },
    "eleveai-maths-6e-proba-frequence-repeter": {
        "badge": "MATHS · 6E", "duree": "EN 2 MIN", "titre": ["RÉPÉTER", "BEAUCOUP"],
        "accroche": _piege_test("jaune", "7 piles sur 10 : face va rattraper ?", "non : la pièce n'a pas de mémoire"),
        "dossier": _P6 + "09-repeter",
    },
})


def construire(nom, spec):
    img = fond()
    d = ImageDraw.Draw(img)
    mascotte(img)
    badge(d, 58, 44, spec["badge"])
    if spec.get("duree"):
        lb = d.textlength(spec["badge"], font=police("ariblk.ttf", 32)) + 52
        pastille_duree(d, 58 + lb + 16, 44, spec["duree"])
    titre(d, spec["titre"])
    spec["accroche"](d)
    pastille(img, d)
    # ⭐ UN SEUL endroit : À CÔTÉ DE LA VIDÉO (Frédéric, 25/09 : « comme ça la vidéo est avec
    # la miniature ») : sorties/seconde/maths/paysage/fr/<notion>/.
    # 27/09 : la classe se lit dans le nom (seconde, premiere…), plus en dur.
    classe, notion = nom.removeprefix("eleveai-maths-").split("-", 1)
    pres_video = RACINE / "manim" / "sorties" / classe / "maths" / "paysage" / "fr" / notion
    if spec.get("dossier"):
        pres_video = RACINE / "manim" / "sorties" / spec["dossier"]
    if pres_video.is_dir():
        img.save(pres_video / f"{nom}.png", "PNG")
        print(pres_video / f"{nom}.png")


if __name__ == "__main__":
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for nom, spec in ESSAIS.items():
        if filtre in nom:
            construire(nom, spec)
