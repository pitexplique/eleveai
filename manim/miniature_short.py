# miniature_short.py
# LA MINIATURE VERTICALE DES SHORTS — 1080 × 1920, charte « cahier ».
#
# ── POURQUOI CE FICHIER (10/09/2026) ──────────────────────────────────────────
# Frédéric : « on ne fait pas de miniature comme pour les CP écriture, c'est
# peut-être dommage ? ». Vérification faite, les « miniatures portrait » du CP
# (`manim/miniatures/cp/francais/fr/*-portrait.png`) ne sont PAS des miniatures :
# ce sont les pages de garde des vidéos exportées en image, fond noir compris.
# Elles n'apportent donc rien de plus que les trois images que YouTube propose
# tout seul. La vraie miniature « cahier » — papier quadrillé, badge bleu nuit,
# Ti-Margo, la photo de Frédéric — n'existait qu'en 1280 × 720, pour le paysage.
#
# ⚠️ CE QUE ÇA CHANGE, ET CE QUE ÇA NE CHANGE PAS. Dans le FLUX Shorts, personne
# ne voit la vignette : YouTube lance la vidéo. C'est la première seconde qui
# décide (voir l'image à 1 seconde des shorts). La vignette sert AILLEURS —
# l'onglet Shorts de la chaîne, les playlists, les partages — où l'on regarde
# une grille. C'est là qu'une série reconnaissable se gagne.
#
# ⛔ ZONE SÛRE. L'interface de YouTube recouvre le bas de l'image (titre, nom de
# chaîne, boutons) et mord un peu sur le haut. Rien de vital au-dessus de
# y = 190 ni sous y = 1630 — Ti-Margo et la signature peuvent y déborder, ils
# ne portent aucune information.
#
# Usage :
#   python manim/miniature_short.py               → toutes
#   python manim/miniature_short.py puissances    → celles dont le nom contient
#
# Les fichiers sortent dans `manim/miniatures/<dossier>/<nom>.png`.

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import (AVATAR, BLEU, CARREAU, CARREAU_FORT, JAUNE, NAVY, PAPIER,
                       ROUGE, SORTIE, TI_MARGO, VERT, police)

W, H = 1080, 1920
HAUT_SUR, BAS_SUR = 190, 1630

# ⭐ La couleur du SOUS-TITRE, quand on la demande par `couleur_sous`.
# Complémentaire du bleu nuit du titre : c'est le plus fort écart possible sur
# ce fond quadrillé bleu, et elle ne sert nulle part ailleurs dans ces
# vignettes (le rouge marque le caractère qui varie, le vert le résultat juste).
ORANGE = (217, 119, 20)


def centre(d, cx, y, txt, f, fill):
    d.text((cx - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=fill)


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


def badge(d, cx, y, txt, taille=34):
    """⭐ LA TAILLE EST UN PARAMÈTRE (17/09/2026). Frédéric, sur les deux
    miniatures « essence » : « mets prix de l'essence en gros ». Le badge porte
    ici le mot que les gens TAPENT dans la recherche — il doit se voir de loin
    dans une grille. Agrandir `badge()` pour tout le monde aurait décalé le badge
    de toutes les miniatures déjà publiées : la valeur par défaut reste 34, et
    seules les entrées qui le demandent changent.
    ⚠️ Le badge grandit VERS LE BAS, et la première ligne du titre est posée en
    dur à y = 320 : au-delà d'une soixantaine, il faut descendre le titre."""
    f = police("ariblk.ttf", taille)
    l = d.textlength(txt, font=f)
    haut = taille + 28
    x = cx - (l + 56) / 2
    d.rounded_rectangle([x, y, x + l + 56, y + haut], radius=haut // 2, fill=NAVY)
    d.text((x + 28, y + (haut - taille) // 2 - 4), txt, font=f, fill=(255, 255, 255))


def signature(img, d, sig="Frédéric, ton prof"):
    """En bas, CENTRÉE — et volontairement dans la bande que l'interface mord :
    elle n'a rien de vital, elle signe."""
    diam, y = 108, 1508
    x = 96
    av = Image.open(AVATAR).convert("RGBA")
    s = min(av.size)
    av = av.crop(((av.width - s) // 2, (av.height - s) // 2,
                  (av.width + s) // 2, (av.height + s) // 2)).resize((diam, diam), Image.LANCZOS)
    masque = Image.new("L", (diam, diam), 0)
    ImageDraw.Draw(masque).ellipse([0, 0, diam, diam], fill=255)
    img.paste(av, (x, y), masque)
    d.ellipse([x - 4, y - 4, x + diam + 4, y + diam + 4], outline=NAVY, width=6)
    tx = x + diam + 22
    d.text((tx, y + 8), sig, font=police("arialbd.ttf", 34), fill=NAVY)
    d.text((tx, y + 54), "eleveai.fr", font=police("ariblk.ttf", 42), fill=BLEU)


# ══════════════════════════════════════════════════════════════════════════════
#  LES ACCROCHES — le cœur de l'image, au CENTRE de la zone sûre.
#  ⚠️ Un short se juge dans une grille de vignettes hautes de quelques
#  centimètres : trois éléments au plus, et le plus gros porte le message.
# ══════════════════════════════════════════════════════════════════════════════

def acc_puissances_parenthese(d):
    centre(d, W // 2, 700, "(7³)⁴", police("ariblk.ttf", 190), BLEU)
    centre(d, W // 2, 980, "3 × 4", police("ariblk.ttf", 104), VERT)
    centre(d, W // 2, 1110, "pas 3 + 4", police("ariblk.ttf", 96), ROUGE)


def acc_racine_somme(d):
    centre(d, W // 2, 700, "√9 + √16", police("ariblk.ttf", 138), BLEU)
    centre(d, W // 2, 900, "≠", police("ariblk.ttf", 130), ROUGE)
    centre(d, W // 2, 1070, "√25", police("ariblk.ttf", 138), ROUGE)


def acc_racine_simplifier(d):
    centre(d, W // 2, 720, "√50", police("ariblk.ttf", 168), JAUNE)
    centre(d, W // 2, 950, "=", police("ariblk.ttf", 96), NAVY)
    centre(d, W // 2, 1080, "5√2", police("ariblk.ttf", 168), VERT)


def acc_racine_negatif(d):
    """⚠️ La ligne du bas ne REPETE PAS le titre (« ça n'existe pas ») : elle
    donne la RAISON. Une vignette qui dit deux fois la même chose gâche sa
    moitié basse — et c'est la raison qui donne envie d'ouvrir."""
    centre(d, W // 2, 700, "√−9", police("ariblk.ttf", 190), ROUGE)
    # la barre qui dit « impossible »
    d.line([(300, 830), (780, 760)], fill=ROUGE, width=16)
    centre(d, W // 2, 1010, "aucun carré", police("ariblk.ttf", 86), NAVY)
    centre(d, W // 2, 1120, "n'est négatif", police("ariblk.ttf", 86), NAVY)


def acc_repere_diagonales(d):
    """Le parallélogramme et ses deux diagonales — une figure se reconnait en
    petit, là où une formule ne se lit plus."""
    A, B, C, D = (300, 1090), (700, 990), (790, 760), (390, 850)
    for p, q in ((A, B), (B, C), (C, D), (D, A)):
        d.line([p, q], fill=NAVY, width=7)
    d.line([A, C], fill=VERT, width=14)
    d.line([B, D], fill=ROUGE, width=14)
    for p in (A, B, C, D):
        d.ellipse([p[0] - 12, p[1] - 12, p[0] + 12, p[1] + 12], fill=BLEU)
    centre(d, W // 2, 640, "les DIAGONALES", police("ariblk.ttf", 78), NAVY)
    centre(d, W // 2, 1180, "pas les côtés", police("ariblk.ttf", 72), ROUGE)


def acc_ir_double_produit(d):
    centre(d, W // 2, 690, "(3 + 4)²", police("ariblk.ttf", 116), JAUNE)
    centre(d, W // 2, 870, "49 ≠ 25", police("ariblk.ttf", 128), ROUGE)
    centre(d, W // 2, 1060, "il manque 24", police("ariblk.ttf", 76), NAVY)


def acc_ir_difference(d):
    centre(d, W // 2, 700, "x² − 9", police("ariblk.ttf", 150), JAUNE)
    centre(d, W // 2, 900, "=", police("ariblk.ttf", 90), NAVY)
    centre(d, W // 2, 1030, "(x−3)(x+3)", police("ariblk.ttf", 104), VERT)


def acc_ir_calcul_mental(d):
    centre(d, W // 2, 680, "99²", police("ariblk.ttf", 190), JAUNE)
    centre(d, W // 2, 950, "9 801", police("ariblk.ttf", 150), VERT)
    centre(d, W // 2, 1140, "de tête", police("ariblk.ttf", 82), NAVY)


def acc_eq_retournement(d):
    centre(d, W // 2, 690, "−2x > 6", police("ariblk.ttf", 128), JAUNE)
    centre(d, W // 2, 880, "x < −3", police("ariblk.ttf", 128), VERT)
    centre(d, W // 2, 1070, "le sens se retourne", police("ariblk.ttf", 64), ROUGE)


def acc_eq_balance(d):
    centre(d, W // 2, 700, "5x − 3 = 12", police("ariblk.ttf", 104), JAUNE)
    centre(d, W // 2, 900, "↓", police("ariblk.ttf", 90), NAVY)
    centre(d, W // 2, 1030, "x = 3", police("ariblk.ttf", 140), VERT)


def acc_eq_probleme(d):
    for i, (txt, coul) in enumerate([("1. nommer", NAVY), ("2. traduire", NAVY),
                                     ("3. résoudre", NAVY), ("4. répondre", VERT)]):
        centre(d, W // 2, 680 + i * 118, txt, police("ariblk.ttf", 76), coul)


def acc_fv_dissymetrie(d):
    centre(d, W // 2, 680, "IMAGE", police("ariblk.ttf", 96), VERT)
    centre(d, W // 2, 790, "unique", police("ariblk.ttf", 68), VERT)
    centre(d, W // 2, 940, "ANTÉCÉDENT", police("ariblk.ttf", 78), ROUGE)
    centre(d, W // 2, 1050, "0, 1, 2, ou plus", police("ariblk.ttf", 58), ROUGE)


def acc_fr_carre(d):
    """⭐ LE PARADOXE EN CHIFFRES, et la parabole qui le rend vrai.

    Les deux inégalités sont vraies toutes les deux : c'est le « attends,
    quoi ? » qui fait arrêter le pouce. Et sous elles, la branche gauche qui
    descend — le dessin qui explique, comme sur la vignette de la leçon
    (Frédéric, 23/09 : « fais des dessins de fonctions de référence »).
    ⚠️ Zone libre : de y = 640 (sous le sous-titre) à y = 1350 (Ti-Margo, haut
    560 px, commence à 1352). La parabole tient entre 1040 et 1330.
    """
    # ⭐ LES MÊMES SYMBOLES SUR LES DEUX LIGNES (Frédéric, 23/09 : « j'aurais
    # mieux mis (−3)² > (−2)² »). Le premier jet concluait « 9 > 4 » : exact,
    # mais il demande au lecteur de savoir d'où sortent 9 et 4. Avec les carrés
    # écrits, le retournement se voit sans rien calculer — et la vignette dit
    # alors EXACTEMENT ce que montre la première seconde du short.
    # ⭐ ÉQUILIBRE (Frédéric, 23/09 : « et aussi un équilibre pour l'œil
    # humain ! »). La bande libre va de y ≈ 600 (sous le sous-titre) à
    # y ≈ 1480 (la signature) : le bloc doit être CENTRÉ dedans, pas tassé en
    # haut. Avant, il finissait vers 1335 et laissait un tiers de carte vide.
    centre(d, W // 2, 690, "−3 < −2", police("ariblk.ttf", 108), NAVY)
    centre(d, W // 2, 832, "et pourtant", police("arialbd.ttf", 50), BLEU)

    # La ligne est longue : on cherche le plus gros corps qui tient dans 880 px.
    # ⛔ 960 px la faisait descendre jusqu'au sommet de la branche gauche.
    carres = "(−3)² > (−2)²"
    taille = 132
    while taille > 40 and d.textlength(carres, font=police("ariblk.ttf", taille)) > 880:
        taille -= 2
    centre(d, W // 2, 910, carres, police("ariblk.ttf", taille), ROUGE)

    # La branche gauche, celle qui descend, tracée puis pointée.
    X0, X1, Y0, Y1 = 250, 830, 1345, 1090          # boîte (y inversé)

    def px(x, y):
        return (X0 + (x + 3) / 6 * (X1 - X0), Y0 - y / 9.6 * (Y0 - Y1))

    d.line([px(-3, 0), px(3, 0)], fill=(150, 165, 185), width=3)
    d.line([px(0, 0), px(0, 9.6)], fill=(150, 165, 185), width=3)
    pts = [px(-3 + 6 * i / 60, (-3 + 6 * i / 60) ** 2) for i in range(61)]
    d.line(pts, fill=BLEU, width=9, joint="curve")
    for x in (-3, -2):
        cx, cy = px(x, x * x)
        d.ellipse([cx - 13, cy - 13, cx + 13, cy + 13], fill=ROUGE)


def acc_fr_carte(d):
    """⭐ LA CARTE DE LA SÉRIE : les cinq courbes côte à côte, en vertical.
    Reprend la vignette paysage que Frédéric a validée le 23/09 (« fais des
    dessins de fonctions de référence ») — mais en 3 + 2, parce qu'en une seule
    rangée chaque boîte tomberait à 190 px et la silhouette ne se lirait plus.
    ⚠️ Rien sous y = 1300 : Ti-Margo commence à 1352.
    """
    VIOLET, ORANGE_C, GRIS = (139, 92, 246), (217, 119, 20), (150, 165, 185)
    cellules = [
        ("x²", BLEU, (-1.55, 1.55), (-0.5, 2.4), lambda x: x * x, [(-1.55, 1.55)]),
        ("1/x", VERT, (-2.3, 2.3), (-2.3, 2.3), lambda x: 1 / x,
         [(-2.3, -0.45), (0.45, 2.3)]),
        ("√x", ROUGE, (-0.7, 3.6), (-0.7, 2.3), lambda x: x ** 0.5, [(0.0, 3.6)]),
        ("x³", VIOLET, (-1.33, 1.33), (-2.4, 2.4), lambda x: x ** 3, [(-1.33, 1.33)]),
        ("|x|", ORANGE_C, (-1.8, 1.8), (-0.5, 2.0), abs, [(-1.8, 1.8)]),
    ]
    CW, CH = 290, 250
    places = [(215, 620), (540, 620), (865, 620), (378, 950), (703, 950)]

    for (nom, coul, (xa, xb), (ya, yb), f, plages), (cx, top) in zip(cellules, places):
        bx0, by0, bx1, by1 = cx - CW // 2, top, cx + CW // 2, top + CH
        d.rounded_rectangle([bx0, by0, bx1, by1], radius=18,
                            fill=(255, 255, 255), outline=CARREAU_FORT, width=3)
        pad = 18
        px0, px1, py0, py1 = bx0 + pad, bx1 - pad, by0 + pad, by1 - pad

        def px(x, y, xa=xa, xb=xb, ya=ya, yb=yb, px0=px0, px1=px1, py0=py0, py1=py1):
            return (px0 + (x - xa) / (xb - xa) * (px1 - px0),
                    py1 - (y - ya) / (yb - ya) * (py1 - py0))

        d.line([px(xa, 0), px(xb, 0)], fill=GRIS, width=3)
        d.line([px(0, ya), px(0, yb)], fill=GRIS, width=3)
        for a, b in plages:
            pts = [px(a + (b - a) * k / 48, f(a + (b - a) * k / 48))
                   for k in range(49) if ya <= f(a + (b - a) * k / 48) <= yb]
            if len(pts) > 1:
                d.line(pts, fill=coul, width=9, joint="curve")
        centre(d, cx, by1 + 10, nom, police("ariblk.ttf", 46), NAVY)


def acc_geo_pente(d):
    """Le panneau et le triangle : 12 %, et l'angle qui n'est pas 12."""
    centre(d, W // 2, 640, "12 %", police("ariblk.ttf", 150), ORANGE)
    centre(d, W // 2, 820, "n'est PAS 12°", police("ariblk.ttf", 72), ROUGE)
    X0, Y0, X1, Y1 = 250, 1150, 830, 1080
    d.line([(X0, Y0), (X1, Y0)], fill=NAVY, width=7)
    d.line([(X1, Y0), (X1, Y1)], fill=ROUGE, width=7)
    d.line([(X0, Y0), (X1, Y1)], fill=BLEU, width=9)
    d.rectangle([X1 - 22, Y0 - 22, X1, Y0], outline=NAVY, width=3)
    d.text((X0 + 34, Y0 - 62), "α", font=police("ariblk.ttf", 40), fill=VERT)
    centre(d, W // 2, 1200, "α = 6,8°", police("ariblk.ttf", 62), VERT)


def acc_geo_projete(d):
    """La droite, le point, et la perpendiculaire — plus courte que l'oblique."""
    Y = 1120
    d.line([(190, Y), (890, Y)], fill=NAVY, width=7)
    Mx, My, Hx, Ax = 400, 760, 400, 760
    d.ellipse([Mx - 14, My - 14, Mx + 14, My + 14], fill=(217, 119, 20))
    d.text((Mx - 16, My - 76), "M", font=police("ariblk.ttf", 46), fill=(217, 119, 20))
    d.line([(Mx, My), (Hx, Y)], fill=VERT, width=11)
    d.line([(Mx, My), (Ax, Y)], fill=ROUGE, width=7)
    d.rectangle([Hx, Y - 26, Hx + 26, Y], outline=VERT, width=4)
    d.text((Hx - 20, Y + 16), "H", font=police("ariblk.ttf", 40), fill=VERT)
    d.text((Ax - 16, Y + 16), "A", font=police("ariblk.ttf", 40), fill=ROUGE)
    centre(d, W // 2, 650, "LE PLUS COURT", police("ariblk.ttf", 82), NAVY)
    centre(d, W // 2, 1230, "c'est la perpendiculaire",
           police("arialbd.ttf", 46), VERT)


def acc_geo_enclos(d):
    """60 m de clôture, une rivière — et deux largeurs qui donnent la même aire."""
    d.line([(280, 700), (800, 700)], fill=BLEU, width=14)
    centre(d, 540, 640, "la rivière", police("arialbd.ttf", 38), BLEU)
    d.line([(300, 700), (300, 920)], fill=VERT, width=9)
    d.line([(300, 920), (780, 920)], fill=(217, 119, 20), width=9)
    d.line([(780, 920), (780, 700)], fill=VERT, width=9)
    d.text((228, 780), "x", font=police("ariblk.ttf", 52), fill=VERT)
    d.text((800, 780), "x", font=police("ariblk.ttf", 52), fill=VERT)
    centre(d, 540, 940, "60 − 2x", police("ariblk.ttf", 46), (217, 119, 20))
    centre(d, W // 2, 1050, "450 m²", police("ariblk.ttf", 104), VERT)
    centre(d, W // 2, 1190, "15 m × 30 m", police("arialbd.ttf", 48), NAVY)


def acc_fr_racine(d):
    """⭐ LA SEULE QUI REFUSE. Deux lignes qui s'opposent — une image qui existe,
    une qui n'existe pas — puis la demi-branche qui part de l'origine et ne
    repart jamais vers la gauche. C'est le geste d'ouverture de la leçon.
    """
    f = police("ariblk.ttf", 96)
    centre(d, W // 2, 660, "√4  =  2", f, VERT)

    # « √−1 : AUCUNE » — le moins en rouge, comme sur la carte de |x|.
    g = police("ariblk.ttf", 84)
    gauche, moins, droite = "√", "−1", "  :  AUCUNE"
    lg, lm = d.textlength(gauche, font=g), d.textlength(moins, font=g)
    ld = d.textlength(droite, font=g)
    x = W // 2 - (lg + lm + ld) / 2
    d.text((x, 820), gauche, font=g, fill=NAVY)
    d.text((x + lg, 820), moins, font=g, fill=ROUGE)
    d.text((x + lg + lm, 820), droite, font=g, fill=ROUGE)

    centre(d, W // 2, 990, "aucun carré n'est négatif",
           police("arialbd.ttf", 48), BLEU)

    # La demi-branche : elle part de l'origine, monte, et rien à gauche.
    X0, X1, Y0, Y1 = 250, 830, 1330, 1090
    d.line([(X0, Y0), (X1, Y0)], fill=(150, 165, 185), width=3)
    xo = X0 + 150
    d.line([(xo, Y0 + 14), (xo, Y1 - 14)], fill=(150, 165, 185), width=3)
    pts = []
    for i in range(61):
        t = i / 60
        pts.append((xo + t * (X1 - xo), Y0 - (t ** 0.5) * (Y0 - Y1)))
    d.line(pts, fill=ROUGE, width=10, joint="curve")
    d.ellipse([xo - 13, Y0 - 13, xo + 13, Y0 + 13], fill=ROUGE)
    # La croix : rien à gauche de zéro.
    for a, b in (((-1, -1), (1, 1)), ((-1, 1), (1, -1))):
        d.line([(xo - 90 + a[0] * 26, Y0 - 60 + a[1] * 26),
                (xo - 90 + b[0] * 26, Y0 - 60 + b[1] * 26)], fill=ROUGE, width=9)


def acc_fr_inverse(d):
    """Le paradoxe, sur le modèle du carré : « 2 < 3 ET POURTANT 1/2 > 1/3 ».
    Le DÉNOMINATEUR en rouge : c'est lui qui varie (Frédéric, 23/09).
    ⛔ 24/09 : l'ancienne accroche « 1 < 2 mais aussi 1/1 > 1/2 » ne surprenait
    personne (3 vues à la mi-journée) ; le carré, qui affiche un « et
    pourtant », était à 235. Le « > » passe en ROUGE : c'est lui qui se retourne.
    """
    centre(d, W // 2, 700, "2 < 3", police("ariblk.ttf", 110), NAVY)
    centre(d, W // 2, 840, "et pourtant", police("arialbd.ttf", 50), BLEU)
    # ⛔ Les deux fractions se LISENT ENSEMBLE : écartées de 480 px, le « > »
    # flottait tout seul au milieu et on ne comparait plus rien.
    # ⛔ 92 px, pas plus : à 104 le « 1 » recouvrait la barre de fraction.
    _fraction(d, 405, 1060, "1", "2", 92)
    centre(d, 540, 1030, ">", police("ariblk.ttf", 92), ROUGE)
    _fraction(d, 675, 1060, "1", "3", 92)
    centre(d, W // 2, 1280, "l'ordre s'inverse", police("arialbd.ttf", 52), ROUGE)


def _fraction(d, cx, cy, haut, bas, taille):
    """Une fraction empilée, dénominateur en ROUGE, barre tracée."""
    f = police("ariblk.ttf", taille)
    lh, lb = d.textlength(haut, font=f), d.textlength(bas, font=f)
    demi = max(lh, lb) / 2 + 12
    centre(d, cx, cy - taille - 18, haut, f, NAVY)
    d.rounded_rectangle([cx - demi, cy - 7, cx + demi, cy + 7], radius=7, fill=NAVY)
    centre(d, cx, cy + 22, bas, f, ROUGE)


def acc_fr_cube(d):
    """Les mêmes deux nombres, deux exposants — et l'exposant en ROUGE."""
    # ⛔ Positions MESURÉES, pas écrites en dur : à 612 px l'exposant flottait
    # loin de sa parenthèse et ne se lisait plus comme une puissance.
    def ligne(cy, base, exp, suite, taille=84, t_exp=52):
        f, fe = police("ariblk.ttf", taille), police("ariblk.ttf", t_exp)
        lb, le, ls = (d.textlength(base, font=f), d.textlength(exp, font=fe),
                      d.textlength(suite, font=f))
        x = W // 2 - (lb + le + 22 + ls) / 2
        d.text((x, cy), base, font=f, fill=NAVY)
        d.text((x + lb + 4, cy - 26), exp, font=fe, fill=ROUGE)
        d.text((x + lb + le + 22, cy), suite, font=f, fill=NAVY)

    ligne(700, "(−4)", "2", "=  16")
    ligne(870, "(−4)", "3", "= −64")
    centre(d, W // 2, 1050, "l'ordre se retourne,", police("arialbd.ttf", 48), ROUGE)
    centre(d, W // 2, 1120, "puis ne bouge plus", police("arialbd.ttf", 48), VERT)
    centre(d, W // 2, 1250, "un seul caractère change",
           police("arialbd.ttf", 44), BLEU)


def acc_fr_absolue(d):
    """Deux nombres, une seule image — et le moins en ROUGE, celui qui saute."""
    f = police("ariblk.ttf", 104)
    centre(d, W // 2, 690, "| 4 |  =  4", f, VERT)
    # « | −4 | = 4 » : le moins se pose à part, en rouge.
    texte_g, texte_d = "| ", "4 |  =  4"
    lg = d.textlength(texte_g, font=f)
    lm = d.textlength("−", font=f)
    ld = d.textlength(texte_d, font=f)
    x = W // 2 - (lg + lm + ld) / 2
    d.text((x, 840), texte_g, font=f, fill=NAVY)
    d.text((x + lg, 840), "−", font=f, fill=ROUGE)
    d.text((x + lg + lm, 840), texte_d, font=f, fill=NAVY)
    centre(d, W // 2, 1040, "deux nombres différents",
           police("arialbd.ttf", 50), BLEU)
    centre(d, W // 2, 1118, "LA MÊME IMAGE", police("ariblk.ttf", 62), ROUGE)
    # Le V, petit, sous le texte.
    # ⛔ Le V descend SOUS « LA MÊME IMAGE » : remonté à 1215 il passait
    # dedans. Et il reste à gauche de x = 700 — Ti-Margo commence vers 720.
    X0, X1, Y0, Y1 = 385, 695, 1352, 1242
    d.line([(X0, Y0), (X1, Y0)], fill=(150, 165, 185), width=3)
    d.line([((X0 + X1) // 2, Y0 + 10), ((X0 + X1) // 2, Y1 - 10)],
           fill=(150, 165, 185), width=3)
    d.line([(X0, Y1), ((X0 + X1) // 2, Y0), (X1, Y1)], fill=BLEU, width=9,
           joint="curve")


def acc_fv_image(d):
    centre(d, W // 2, 690, "f(4)", police("ariblk.ttf", 150), JAUNE)
    centre(d, W // 2, 900, "4² − 2×4", police("ariblk.ttf", 88), NAVY)
    centre(d, W // 2, 1040, "= 8", police("ariblk.ttf", 130), VERT)


def acc_fv_lecture(d):
    centre(d, W // 2, 680, "l'image", police("ariblk.ttf", 72), VERT)
    centre(d, W // 2, 780, "je MONTE", police("ariblk.ttf", 88), VERT)
    centre(d, W // 2, 940, "l'antécédent", police("ariblk.ttf", 66), ROUGE)
    centre(d, W // 2, 1040, "je TRAVERSE", police("ariblk.ttf", 82), ROUGE)


def acc_py_egal(d):
    centre(d, W // 2, 690, "x = x + 1", police("ariblk.ttf", 112), JAUNE)
    centre(d, W // 2, 880, "=  range", police("ariblk.ttf", 82), VERT)
    centre(d, W // 2, 1000, "== compare", police("ariblk.ttf", 82), ROUGE)


def acc_py_boucles(d):
    centre(d, W // 2, 670, "for", police("ariblk.ttf", 92), VERT)
    centre(d, W // 2, 780, "= POUR", police("ariblk.ttf", 62), VERT)
    centre(d, W // 2, 930, "while", police("ariblk.ttf", 92), ROUGE)
    centre(d, W // 2, 1040, "= TANT QUE", police("ariblk.ttf", 62), ROUGE)


def acc_py_tracer(d):
    f = police("ariblk.ttf", 62)
    for i, (a, b) in enumerate([("i", "s"), ("1", "2"), ("2", "6"), ("3", "12"), ("4", "20")]):
        coul = BLEU if i == 0 else (VERT if i == 4 else NAVY)
        d.text((420, 660 + i * 74), a, font=f, fill=coul)
        d.text((600, 660 + i * 74), b, font=f, fill=coul)
    d.line([(400, 728), (700, 728)], fill=BLEU, width=4)


def acc_974_fait(d):
    centre(d, W // 2, 660, "26°", police("ariblk.ttf", 130), JAUNE)
    centre(d, W // 2, 800, "à Saint-Gilles", police("ariblk.ttf", 52), JAUNE)
    centre(d, W // 2, 930, "11°", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 1070, "au Maïdo", police("ariblk.ttf", 52), BLEU)


def acc_974_antecedent(d):
    centre(d, W // 2, 680, "20 °C", police("ariblk.ttf", 128), JAUNE)
    centre(d, W // 2, 850, "à quelle", police("ariblk.ttf", 68), NAVY)
    centre(d, W // 2, 950, "altitude ?", police("ariblk.ttf", 68), NAVY)
    centre(d, W // 2, 1090, "923 m", police("ariblk.ttf", 96), VERT)


def acc_974_pourquoi(d):
    centre(d, W // 2, 670, "plus près", police("ariblk.ttf", 76), JAUNE)
    centre(d, W // 2, 770, "du soleil", police("ariblk.ttf", 76), JAUNE)
    centre(d, W // 2, 920, "et plus", police("ariblk.ttf", 76), BLEU)
    centre(d, W // 2, 1020, "FROID", police("ariblk.ttf", 110), BLEU)


def acc_974_eau(d):
    """Le bac de 1 m² et la bouteille : 1 mm = 1 L, puis la question des 30 mm."""
    centre(d, W // 2, 660, "1 mm", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 810, "de pluie sur 1 m²", police("ariblk.ttf", 52), NAVY)
    centre(d, W // 2, 940, "= 1 litre", police("ariblk.ttf", 110), BLEU)
    centre(d, W // 2, 1090, "et 30 mm ?", police("ariblk.ttf", 72), ROUGE)


def acc_974_rond_point(d):
    """14/10/2026 : 18 billes orange en file devant le rond-point ; l'échelle
    des ceintures dessous (blanche)."""
    from miniature_short_expression import badge_ceinture
    orange = (249, 115, 22)
    y = 720
    d.rectangle([60, y - 26, 860, y + 26], fill=(70, 70, 70))
    d.ellipse([840, y - 95, 1030, y + 95], outline=(70, 70, 70), width=46)
    for k in range(18):
        x = 830 - k * 42
        d.ellipse([x - 17, y - 17, x + 17, y + 17], fill=orange)
    centre(d, W // 2, 880, "18 voitures", police("ariblk.ttf", 110), ROUGE)
    centre(d, W // 2, 1000, "sans accident,", police("ariblk.ttf", 52), NAVY)
    centre(d, W // 2, 1070, "sans feu rouge", police("ariblk.ttf", 52), NAVY)
    badge_ceinture(d, nom="blanche")


# ── PISA 2025 : un sujet national, sans série ─────────────────────────────────
# ⛔ Badge « PISA 2025 » — c'est le mot que tout le monde tape la semaine de la
# publication, et un sujet national ne prend ni classe ni île.
# ⭐ La première ligne est un PARADOXE : c'est ce qui a fait 852 vues le 11/09.

def acc_pisa_ia(d):
    # ⚠️ La ligne du bas ne répète pas le sous-titre : le sous-titre dit la
    # vitesse, l'accroche pose la question.
    centre(d, W // 2, 650, "3x + 7 = 22", police("ariblk.ttf", 92), BLEU)
    centre(d, W // 2, 770, "x = 5", police("ariblk.ttf", 120), VERT)
    centre(d, W // 2, 940, "alors pourquoi", police("ariblk.ttf", 60), NAVY)
    centre(d, W // 2, 1030, "L'APPRENDRE ?", police("ariblk.ttf", 74), ROUGE)


def acc_pisa_favorises(d):
    centre(d, W // 2, 630, "534", police("ariblk.ttf", 150), VERT)
    centre(d, W // 2, 810, "les favorisés : parmi les meilleurs", police("arialbd.ttf", 42), NAVY)
    centre(d, W // 2, 900, "100 points", police("ariblk.ttf", 110), ROUGE)
    centre(d, W // 2, 1040, "d'écart avec les autres", police("arialbd.ttf", 42), NAVY)


def acc_pisa_ecart(d):
    centre(d, W // 2, 640, "2022 : 474", police("ariblk.ttf", 72), NAVY)
    centre(d, W // 2, 740, "2025 : 458", police("ariblk.ttf", 96), ROUGE)
    centre(d, W // 2, 900, "l'écart entre", police("arialbd.ttf", 44), NAVY)
    centre(d, W // 2, 960, "les bons et les faibles :", police("arialbd.ttf", 44), NAVY)
    centre(d, W // 2, 1030, "INCHANGÉ", police("ariblk.ttf", 96), VERT)


def acc_pisa_croire(d):
    centre(d, W // 2, 630, "81 %", police("ariblk.ttf", 170), VERT)
    centre(d, W // 2, 840, "pensent pouvoir", police("arialbd.ttf", 50), NAVY)
    centre(d, W // 2, 900, "progresser", police("arialbd.ttf", 50), NAVY)
    centre(d, W // 2, 1000, "record de l'OCDE", police("ariblk.ttf", 60), BLEU)


# ── « QUI A RAISON ? » : le prix de l'essence ─────────────────────────────────
# ⭐ LA MINIATURE REDESSINE LA BARRE DE LA VIDÉO. C'est le même objet, à la même
# échelle : dans la grille de l'onglet Shorts, les deux épisodes se reconnaissent
# avant même qu'on lise le titre.
# ⚠️ Deux tranches ici, trois dans la vidéo (accise et TVA y sont séparées) : à
# 62 pixels de haut, une tranche de TVA serait un liseré. La miniature dit le
# partage, la vidéo dit le détail.
# Chiffres : Commission européenne, Euro-super 95, France, 14/09/2026.

def acc_essence_litre(d):
    x0, x1 = 240, 410
    bas, total = 1105, 425
    h_carb = round(total * 1.120 / 2.172)      # 219 px
    d.rectangle([x0, bas - h_carb, x1, bas], fill=BLEU)
    d.rectangle([x0, bas - total, x1, bas - h_carb], fill=ROUGE)
    d.rectangle([x0, bas - total, x1, bas], outline=NAVY, width=4)

    d.text((x1 + 55, bas - total - 18), "2,17 €", font=police("ariblk.ttf", 96), fill=NAVY)
    d.text((x1 + 58, bas - total + 105), "1,05 €", font=police("ariblk.ttf", 54), fill=ROUGE)
    d.text((x1 + 58, bas - total + 172), "d'impôt", font=police("arialbd.ttf", 42), fill=NAVY)
    d.text((x1 + 58, bas - total + 265), "1,12 €", font=police("ariblk.ttf", 54), fill=BLEU)
    d.text((x1 + 58, bas - total + 332), "de carburant", font=police("arialbd.ttf", 42), fill=NAVY)


# ── « QUI A RAISON ? » : la fiche de paie (20/09/2026) ────────────────────────
# ⭐ La miniature redessine la barre du short : bleu = le net, rouge = les
# prélèvements, à l'échelle (2 759 € et 2 464 € sur 5 223 €, OCDE 2025). Les deux
# pourcentages sont ceux de la MÊME tranche rouge — c'est tout le paradoxe.

def acc_paie_deux(d):
    x0, x1 = 150, 320
    bas, total = 1180, 480
    h_net = round(total * 2759 / 5223)          # 254 px
    d.rectangle([x0, bas - h_net, x1, bas], fill=BLEU)
    d.rectangle([x0, bas - total, x1, bas - h_net], fill=ROUGE)
    d.rectangle([x0, bas - total, x1, bas], outline=NAVY, width=4)

    d.text((x1 + 50, bas - total - 22), "47 %", font=police("ariblk.ttf", 110), fill=ROUGE)
    d.text((x1 + 56, bas - total + 108), "de ce que tu coûtes", font=police("arialbd.ttf", 40), fill=NAVY)
    d.text((x1 + 50, bas - total + 222), "89 %", font=police("ariblk.ttf", 110), fill=BLEU)
    d.text((x1 + 56, bas - total + 352), "de ce que tu touches", font=police("arialbd.ttf", 40), fill=NAVY)

    # Le verdict du short, en deux couleurs : c'est lui qui fait cliquer, et il
    # est exact — le chiffre est juste, ce qu'on lui fait dire ne l'est pas.
    f = police("ariblk.ttf", 92)
    oui, non = "OUI", "… ET NON"
    l_oui, l_non = d.textlength(oui, font=f), d.textlength(non, font=f)
    x = (W - (l_oui + 28 + l_non)) / 2
    d.text((x, 1215), oui, font=f, fill=VERT)
    d.text((x + l_oui + 28, 1215), non, font=f, fill=ROUGE)


def acc_paie_vingt(d):
    """Deux barres à la MÊME échelle, depuis zéro : l'écart est petit, et il doit
    le rester à l'image. Le gros chiffre dit l'unité — des POINTS."""
    f = police("arialbd.ttf", 44)
    x0, larg_100 = 250, 1000
    for an, p, y, coul in (("2005", 50.5, 700, NAVY), ("2025", 47.2, 850, ROUGE)):
        l = round(larg_100 * p / 100)
        d.rectangle([x0, y, x0 + l, y + 70], fill=coul)
        d.text((100, y + 12), an, font=f, fill=NAVY)
        d.text((x0 + l + 22, y + 12), f"{p:.1f} %".replace(".", ","), font=f, fill=NAVY)
    centre(d, W // 2, 990, "−3,3 points", police("ariblk.ttf", 96), VERT)
    centre(d, W // 2, 1115, "France, salaire moyen · OCDE", police("arialbd.ttf", 36), NAVY)


# ── La mimolette : moyenne et écart type (28/09/2026) ──────────────────────────
# ⭐ Le sachet de la vidéo, son « 200 g », et ce que la balance dit : 225. Le
# paradoxe se voit sans rien lire d'autre.

def acc_mimolette(d):
    """⭐ Frédéric, 28/09 : « le principal, c'est pas l'argent qu'on gagne » —
    c'est que les maths servent DEUX fois : ton budget, et un métier. Deux
    cartes côte à côte, une par usage."""
    ORANGE_M = (234, 124, 32)
    blanc = (255, 255, 255)
    for x0, coul in ((70, VERT), (560, BLEU)):
        d.rounded_rectangle([x0, 690, x0 + 450, 1300], radius=30, fill=blanc, outline=coul, width=6)
    # Gauche : TON BUDGET — le sachet de 200 g qui en pèse 225.
    cx = 295
    centre(d, cx, 715, "TON BUDGET", police("ariblk.ttf", 48), VERT)
    x0, y0 = cx - 95, 800
    d.rounded_rectangle([x0, y0, x0 + 190, y0 + 230], radius=26, fill=ORANGE_M, outline=NAVY, width=4)
    d.rectangle([x0 + 5, y0 + 5, x0 + 185, y0 + 26], fill=(255, 235, 205))
    centre(d, cx, y0 + 85, "200 g", police("ariblk.ttf", 48), NAVY)
    # ⛔ 225 g donnait +12,5 %, pas +20 % : c'est le PLUS LOURD (240) qui fait +20.
    centre(d, cx, 1050, "pesé : 240 g", police("arialbd.ttf", 40), NAVY)
    centre(d, cx, 1120, "+20 %", police("ariblk.ttf", 76), VERT)
    centre(d, cx, 1215, "même prix", police("arialbd.ttf", 38), NAVY)
    # Droite : UN MÉTIER — consultant, à la journée.
    cx = 785
    centre(d, cx, 715, "UN MÉTIER", police("ariblk.ttf", 48), BLEU)
    centre(d, cx, 810, "consultant", police("arialbd.ttf", 44), NAVY)
    centre(d, cx, 880, "1 000 €", police("ariblk.ttf", 92), BLEU)
    centre(d, cx, 990, "2 000 €", police("ariblk.ttf", 92), BLEU)
    centre(d, cx, 1110, "par jour", police("ariblk.ttf", 56), NAVY)
    centre(d, cx, 1200, "(écart type)", police("arialbd.ttf", 36), NAVY)


def acc_essence_pays(d):
    """⭐ Les deux barres qui portent le paradoxe : la plus longue est la moins
    rouge. On ne met que France et Malte — à deux, l'œil compare ; à cinq, il
    lit un tableau, et une miniature ne se lit pas, elle se voit."""
    f = police("arialbd.ttf", 40)
    x0, larg_max, vmax = 250, 560, 2.45
    for nom, prix, part, y in (("France", 2.172, 48.4, 640),
                               ("Malte", 1.340, 56.3, 790)):
        l = round(larg_max * prix / vmax)
        lt = round(l * part / 100)
        d.rectangle([x0, y, x0 + l - lt, y + 66], fill=BLEU)
        d.rectangle([x0 + l - lt, y, x0 + l, y + 66], fill=ROUGE)
        d.rectangle([x0, y, x0 + l, y + 66], outline=NAVY, width=3)
        d.text((60, y + 12), nom, font=f, fill=NAVY)
        d.text((x0 + l + 22, y + 12), f"{prix:.2f} €".replace(".", ","), font=f, fill=NAVY)

    # ⛔ LE BAS NE RÉPÈTE PAS LE TITRE. Premier jet : « le plus taxé d'Europe =
    # LE MOINS CHER », mot pour mot le titre affiché juste au-dessus — la moitié
    # de l'image ne disait rien de neuf. Un chiffre que le titre ne donne pas,
    # lui, fait cliquer (2,172 − 1,340 = 0,832).
    centre(d, W // 2, 925, "rouge = l'impôt", police("arialbd.ttf", 38), ROUGE)
    centre(d, W // 2, 1000, "83 centimes d'écart", police("ariblk.ttf", 62), VERT)
    centre(d, W // 2, 1080, "sur le même litre", police("arialbd.ttf", 44), NAVY)


# ── « LES MATHS EN VRAI » : à quoi servent les fonctions ──────────────────────

def _courbe(d, f, a, b, box, coul, ep=12, n=80):
    """Trace y = f(x) dans une boîte (x0, y0, x1, y1, xmin, xmax, ymax), y inversé."""
    x0, y0, x1, y1, xmin, xmax, ymax = box
    pts = [(x0 + (x - xmin) / (xmax - xmin) * (x1 - x0), y1 - min(f(x), ymax) / ymax * (y1 - y0))
           for x in [a + (b - a) * i / n for i in range(n + 1)]]
    d.line(pts, fill=coul, width=ep, joint="curve")


def acc_fonc_combien(d):
    box = (230, 640, 850, 960, 0, 10, 110)
    d.line([(230, 960), (850, 960)], fill=NAVY, width=4)
    _courbe(d, lambda x: 0.1 * 2 ** x, 0, 10, box, JAUNE)
    d.ellipse([836, 646, 864, 674], fill=VERT)
    centre(d, W // 2, 1000, "presque rien… puis TOUT", police("ariblk.ttf", 50), ROUGE)


def acc_fonc_quand(d):
    import math
    box = (230, 640, 850, 960, 0, 14, 1800)
    d.line([(230, 960), (850, 960)], fill=NAVY, width=4)
    _courbe(d, lambda x: 0.1 * 2 ** x, 0, 14, box, JAUNE)
    xm = 230 + math.log(10_000) / math.log(2) / 14 * 620
    ym = 960 - 1000 / 1800 * 320
    for i in range(230, int(xm), 26):
        d.line([(i, ym), (min(i + 14, xm), ym)], fill=BLEU, width=5)
    for j in range(int(ym), 960, 26):
        d.line([(xm, j), (xm, min(j + 14, 960))], fill=BLEU, width=5)
    centre(d, W // 2, 1000, "≈ 13,3 jours", police("ariblk.ttf", 60), BLEU)


def acc_fonc_jusquou(d):
    VIOLET = (139, 92, 246)
    box = (230, 620, 850, 960, 0.8, 10, 1.25)
    d.line([(230, 960), (850, 960)], fill=NAVY, width=4)
    d.line([(230, 620), (230, 960)], fill=NAVY, width=4)
    _courbe(d, lambda x: 1 / x, 0.8, 10, box, VIOLET)
    centre(d, W // 2, 1000, "1/x ne touche jamais 0", police("ariblk.ttf", 52), VIOLET)


# ── « QUI A RAISON ? » : les sondages ─────────────────────────────────────────
# ⛔⛔ AUCUN NOM DE CANDIDAT sur ces vignettes. Les noms d'INSTITUTS sont la
# partie vérifiable et peuvent rester ; le reste transformerait une chaîne
# d'élèves en tribune électorale.

def segment(d, x_centre, demi_largeur, y, coul, ep=9, cap=16):
    """Un intervalle de confiance : le trait et ses deux bornes. C'est le
    schéma de toute la série — un score est un SEGMENT, pas un point."""
    d.line([(x_centre - demi_largeur, y), (x_centre + demi_largeur, y)], fill=coul, width=ep)
    for x in (x_centre - demi_largeur, x_centre + demi_largeur):
        d.line([(x, y - cap), (x, y + cap)], fill=coul, width=ep)
    r = 11
    d.ellipse([x_centre - r, y - r, x_centre + r, y + r], fill=NAVY)


def acc_sond_mille(d):
    # La grande population et la petite : la MÊME cuillère jaune dans les deux.
    # ⚠️ Assez grandes pour se comparer dans une grille de vignettes : à 220 px
    # de côté, le carré jaune n'était plus qu'un grain.
    # ⚠️ Descendu de 70 px : le sous-titre du gabarit descend jusqu'à ~590 et
    # « et ça suffit » mordait sur le haut du grand carré.
    d.rectangle([250, 640, 530, 920], outline=BLEU, width=6)
    d.rectangle([358, 748, 422, 812], fill=JAUNE)
    d.rectangle([680, 760, 810, 890], outline=VERT, width=6)
    d.rectangle([713, 793, 777, 857], fill=JAUNE)
    centre(d, 390, 940, "48 millions", police("arialbd.ttf", 36), BLEU)
    centre(d, 745, 910, "500 000", police("arialbd.ttf", 36), VERT)
    centre(d, W // 2, 1030, "même carré jaune", police("ariblk.ttf", 44), NAVY)
    centre(d, W // 2, 1100, "même précision", police("ariblk.ttf", 52), VERT)


def acc_sond_trois(d):
    # Les trois segments, et la bande où ils se croisent : 0,1 point.
    for y, dx, cx, coul in ((650, 150, 430, VERT), (760, 165, 690, BLEU), (870, 200, 660, NAVY)):
        segment(d, cx, dx, y, coul)
    d.rectangle([576, 610, 588, 910], fill=JAUNE)
    centre(d, W // 2, 950, "ils se croisent", police("arialbd.ttf", 40), NAVY)
    centre(d, W // 2, 1010, "sur 0,1 point", police("ariblk.ttf", 54), ROUGE)


def acc_sond_racine(d):
    f = police("ariblk.ttf", 46)
    for i, (n, m, coul) in enumerate([("1 000", "± 3 pt", BLEU),
                                      ("4 000", "± 1,5 pt", VERT),
                                      ("9 000", "± 1 pt", NAVY)]):
        y = 640 + i * 92
        d.text((300, y), n, font=f, fill=coul)
        d.text((620, y), m, font=f, fill=coul)
    centre(d, W // 2, 950, "9 × plus de monde", police("arialbd.ttf", 40), NAVY)
    centre(d, W // 2, 1010, "pour 1 point", police("ariblk.ttf", 52), ROUGE)


def acc_sond_avis(d):
    """⭐ L'ARGUMENT DE LA VIDÉO EN UNE IMAGE : le large flou orange (± 3 points)
    et, dedans, le trait vert de ton poids (0,1 point). On voit le rapport de
    trente sans lire un chiffre — et c'est ça qui dissout la contradiction
    « voter ou être sondé »."""
    # ⚠️ Pas d'orange dans la palette des vignettes : on le pose ici plutôt que
    # d'élargir la charte pour une image. C'est l'ORANGE_RETENUE de la vidéo,
    # pour que la miniature et l'écran disent la même chose de la même couleur.
    ORANGE = (249, 115, 22)
    # ⚠️ Le sous-titre du gabarit descend jusqu'à ~580 : le libellé du flou posé
    # à 570 lui rentrait dedans. Tout le bloc descend de 90 px, ce qui remplit
    # au passage le vide qui restait au-dessus de la signature.
    # le flou : 6 points de large
    d.rectangle([250, 700, 830, 880], fill=(253, 224, 187), outline=ORANGE, width=5)
    centre(d, 540, 655, "le flou du sondage : 6 points", police("arialbd.ttf", 36), ORANGE)
    # toi : 0,1 point, à la MÊME échelle — 1/60 de la largeur du flou
    d.rectangle([535, 678, 545, 902], fill=VERT)
    centre(d, 540, 925, "toi : 0,1 point", police("ariblk.ttf", 42), VERT)
    centre(d, W // 2, 1020, "un énorme poids", police("arialbd.ttf", 42), NAVY)
    centre(d, W // 2, 1090, "sur un nombre qui tremble", police("ariblk.ttf", 44), ROUGE)


def acc_sond_avance(d):
    # ⚠️ Chaque segment porte SON étiquette, et ils sont espacés de 140 px : au
    # premier tirage ils étaient à 120 px l'un de l'autre sous un texte commun,
    # et le bleu se confondait avec la ligne du dessus.
    f = police("arialbd.ttf", 34)
    centre(d, 300, 640, "34 %", f, BLEU)
    segment(d, 590, 210, 660, BLEU)
    centre(d, 300, 780, "33,5 %", f, ROUGE)
    segment(d, 570, 210, 800, ROUGE)
    centre(d, W // 2, 900, "INDISCERNABLES", police("ariblk.ttf", 54), ROUGE)


# ── « LES BASES » : les fractions ─────────────────────────────────────────────
# ⛔ Badge « LES BASES » et RIEN d'autre : la série n'a pas de classe, et une
# vignette est le premier endroit où une étiquette s'installe sans y penser.

def frac(d, cx, y, num, den, taille, coul):
    """Une fraction dessinée — il n'y a pas de glyphe pour ça, et « 3/4 » écrit
    en ligne ne se lit pas de loin dans une grille de vignettes."""
    f = police("ariblk.ttf", taille)
    ln, ld = d.textlength(str(num), font=f), d.textlength(str(den), font=f)
    larg = max(ln, ld) + 24
    d.text((cx - ln / 2, y), str(num), font=f, fill=coul)
    yb = y + taille * 1.12
    d.line([(cx - larg / 2, yb), (cx + larg / 2, yb)], fill=coul, width=max(6, taille // 14))
    d.text((cx - ld / 2, yb + taille * 0.16), str(den), font=f, fill=coul)
    return yb + taille * 1.28  # le bas de la fraction


def acc_fr_definition(d):
    frac(d, W // 2, 590, 3, 4, 150, BLEU)
    centre(d, W // 2, 1010, "un partage", police("ariblk.ttf", 66), NAVY)
    centre(d, W // 2, 1100, "ET un nombre", police("ariblk.ttf", 66), VERT)


def acc_fr_zero(d):
    bas = frac(d, W // 2, 620, "a", 0, 150, ROUGE)
    d.line([(330, bas + 20), (750, 600)], fill=ROUGE, width=16)
    centre(d, W // 2, 1090, "JAMAIS", police("ariblk.ttf", 110), ROUGE)


def acc_fr_egales(d):
    # ⚠️ Chaque terme est POSÉ à une abscisse choisie, jamais collé au précédent :
    # au premier tirage le « = 1 » chevauchait le 4/4 et sortait par la droite.
    frac(d, 250, 620, 3, 3, 100, BLEU)
    centre(d, 400, 660, "=", police("ariblk.ttf", 80), NAVY)
    frac(d, 550, 620, 4, 4, 100, BLEU)
    centre(d, 700, 660, "=", police("ariblk.ttf", 80), NAVY)
    centre(d, 860, 600, "1", police("ariblk.ttf", 150), VERT)
    centre(d, W // 2, 1050, "toujours", police("ariblk.ttf", 72), NAVY)


def acc_fr_simplifier(d):
    frac(d, 320, 620, 6, 8, 130, NAVY)
    # ⛔ La flèche est DESSINÉE : « → » n'existe pas dans Arial Black et la
    # substitution rendait un trait fin, invisible dans une grille.
    y = 750
    d.line([(490, y), (610, y)], fill=JAUNE, width=18)
    d.polygon([(600, y - 34), (660, y), (600, y + 34)], fill=JAUNE)
    frac(d, 780, 620, 3, 4, 130, VERT)
    centre(d, W // 2, 1060, "même valeur", police("ariblk.ttf", 68), NAVY)


def acc_fr_ecritures(d):
    frac(d, 190, 610, 1, 5, 104, BLEU)
    centre(d, 330, 650, "=", police("ariblk.ttf", 70), NAVY)
    centre(d, 500, 630, "0,2", police("ariblk.ttf", 96), NAVY)
    centre(d, 680, 650, "=", police("ariblk.ttf", 70), NAVY)
    centre(d, 870, 630, "20 %", police("ariblk.ttf", 88), VERT)
    centre(d, W // 2, 990, "le MÊME", police("ariblk.ttf", 72), JAUNE)
    centre(d, W // 2, 1080, "nombre", police("ariblk.ttf", 72), JAUNE)


def acc_fr_multiplier(d):
    frac(d, 330, 600, 2, 3, 120, BLEU)
    centre(d, W // 2, 670, "×", police("ariblk.ttf", 110), NAVY)
    frac(d, 750, 600, 3, 4, 120, BLEU)
    centre(d, W // 2, 1000, "ça passe", police("ariblk.ttf", 72), VERT)
    centre(d, W // 2, 1090, "TOUT DROIT", police("ariblk.ttf", 82), VERT)


def acc_fr_additionner(d):
    frac(d, 260, 590, 1, 2, 108, NAVY)
    centre(d, 390, 650, "+", police("ariblk.ttf", 96), NAVY)
    frac(d, 520, 590, 1, 3, 108, NAVY)
    centre(d, 650, 650, "=", police("ariblk.ttf", 96), NAVY)
    frac(d, 800, 590, 2, 5, 108, ROUGE)
    d.line([(700, 930), (900, 560)], fill=ROUGE, width=14)
    centre(d, W // 2, 1010, "NON", police("ariblk.ttf", 120), ROUGE)
    centre(d, W // 2, 1140, "et voici pourquoi", police("ariblk.ttf", 58), NAVY)


def acc_fr_ordre(d):
    # L'expression est centrée sur W/2, pas sur la marge gauche : au premier
    # tirage elle laissait le tiers droit de la vignette vide.
    frac(d, 290, 600, 2, 5, 96, NAVY)
    centre(d, 415, 640, "−", police("ariblk.ttf", 86), NAVY)
    frac(d, 540, 600, 3, 5, 96, NAVY)
    centre(d, 665, 640, "×", police("ariblk.ttf", 86), JAUNE)
    frac(d, 790, 600, 1, 3, 96, NAVY)
    centre(d, W // 2, 960, "× AVANT −", police("ariblk.ttf", 96), VERT)
    centre(d, W // 2, 1085, "toujours", police("ariblk.ttf", 64), NAVY)


def acc_dauphin_baleine(d):
    """Les deux sauts DESSINÉS : le dauphin haut et court en bleu, la baleine
    longue et basse en vert. Pas une équation sur la vignette — mesuré le 15/09
    sur la chaîne : ce sont les vignettes à fait réel et à paradoxe qui font des
    vues, pas celles à formule."""
    x0, x1 = 150, 930          # 0 → 12 m
    y0 = 1120                   # le sol
    ech_x = (x1 - x0) / 12
    ech_y = 78                  # 1 m de hauteur
    d.line([(x0, y0), (x1 + 20, y0)], fill=NAVY, width=6)
    for f, coul, x_max in (((lambda x: -0.5 * x * x + 3 * x), BLEU, 6),
                           ((lambda x: -0.1 * x * x + 1.2 * x), VERT, 12)):
        pts = [(x0 + x * ech_x, y0 - f(x) * ech_y) for x in [i * x_max / 60 for i in range(61)]]
        d.line(pts, fill=coul, width=16, joint="curve")
    centre(d, x0 + 3 * ech_x, y0 - 4.5 * ech_y - 70, "dauphin", police("ariblk.ttf", 40), BLEU)
    centre(d, x0 + 10.9 * ech_x, y0 - 3.0 * ech_y, "baleine", police("ariblk.ttf", 40), VERT)
    centre(d, W // 2, 1150, "12 m contre 6 m… mais 3,6 m de haut contre 4,5", police("arialbd.ttf", 34), NAVY)


SHORTS = {
    # ⭐ LE SECOND DEGRÉ EN VRAI (15/09/2026) — badge « Les maths en vrai », et
    # non « Maths · Première » : Frédéric a montré la page « Populaires » de la
    # chaîne, les vignettes à étiquette de classe plafonnent à un tiers des vues
    # des vignettes à fait réel. Le paradoxe est dans le TITRE, pas la formule.
    "eleveai-maths-en-vrai-second-degre-short-dauphin": {
        "badge": "LES MATHS EN VRAI", "titre": ["LA BALEINE SAUTE", "PLUS LOIN…"], "taille": 84,
        "sous": "mais le dauphin monte plus haut", "accroche": acc_dauphin_baleine,
        "dossier": "maths-en-vrai/maths/fr",
    },
    "eleveai-maths-en-vrai-fonctions-short-combien": {
        "badge": "LES MATHS EN VRAI", "titre": ["100 VUES…", "102 400"], "taille": 96,
        "sous": "dans 10 jours, en doublant", "accroche": acc_fonc_combien,
        "dossier": "maths-en-vrai/maths/fr",
    },
    "eleveai-maths-en-vrai-fonctions-short-quand": {
        "badge": "LES MATHS EN VRAI", "titre": ["LE MILLION", "3 JOURS APRÈS"], "taille": 80,
        "sous": "après les 100 000 vues", "accroche": acc_fonc_quand,
        "dossier": "maths-en-vrai/maths/fr",
    },
    "eleveai-maths-en-vrai-fonctions-short-jusquou": {
        "badge": "LES MATHS EN VRAI", "titre": ["JAMAIS", "ZÉRO"], "taille": 116,
        "sous": "une part qui rétrécit sans fin", "accroche": acc_fonc_jusquou,
        "dossier": "maths-en-vrai/maths/fr",
    },
    "eleveai-maths-actu-sondages-short-avis": {
        "badge": "QUI A RAISON ?", "titre": ["TON AVIS PÈSE", "48 000 × PLUS"], "taille": 84,
        "sous": "et se noie quand même", "accroche": acc_sond_avis,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-sondages-short-mille": {
        "badge": "QUI A RAISON ?", "titre": ["1 000 POUR", "48 MILLIONS"], "taille": 88,
        "sous": "et ça suffit", "accroche": acc_sond_mille,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-sondages-short-trois": {
        "badge": "QUI A RAISON ?", "titre": ["30, 34, 34,5", "LA MÊME SEMAINE"], "taille": 78,
        "sous": "trois instituts, un candidat", "accroche": acc_sond_trois,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-sondages-short-racine": {
        "badge": "QUI A RAISON ?", "titre": ["4 × PLUS DE GENS", "2 × PLUS PRÉCIS"], "taille": 74,
        "sous": "la racine carrée décide du budget", "accroche": acc_sond_racine,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-sondages-short-avance": {
        "badge": "QUI A RAISON ?", "titre": ["0,5 POINT", "N'EST PAS UNE AVANCE"], "taille": 70,
        "sous": "ce que le titre ne dit pas", "accroche": acc_sond_avance,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-definition": {
        "badge": "LES BASES", "titre": ["C'EST QUOI", "UNE FRACTION ?"], "taille": 82,
        "sous": "deux réponses, pas une", "accroche": acc_fr_definition,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-zero": {
        "badge": "LES BASES", "titre": ["DIVISER", "PAR ZÉRO"], "taille": 96,
        "sous": "pourquoi c'est interdit", "accroche": acc_fr_zero,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-egales": {
        "badge": "LES BASES", "titre": ["3/3, 4/4,", "100/100"], "taille": 92,
        "sous": "ça fait toujours 1", "accroche": acc_fr_egales,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-simplifier": {
        "badge": "LES BASES", "titre": ["SIMPLIFIER", "UNE FRACTION"], "taille": 84,
        "sous": "le haut ET le bas", "accroche": acc_fr_simplifier,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-ecritures": {
        "badge": "LES BASES", "titre": ["FRACTION,", "DÉCIMAL, %"], "taille": 88,
        "sous": "trois écritures, un nombre", "accroche": acc_fr_ecritures,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-multiplier": {
        "badge": "LES BASES", "titre": ["MULTIPLIER", "DEUX FRACTIONS"], "taille": 78,
        "sous": "le calcul le plus facile", "accroche": acc_fr_multiplier,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-additionner": {
        "badge": "LES BASES", "titre": ["1/2 + 1/3", "N'EST PAS 2/5"], "taille": 84,
        "sous": "l'erreur la plus courante", "accroche": acc_fr_additionner,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-bases-fractions-short-ordre": {
        "badge": "LES BASES", "titre": ["LA QUESTION", "DU BREVET"], "taille": 86,
        "sous": "presque tout le monde se trompe", "accroche": acc_fr_ordre,
        "dossier": "bases/maths/fr",
    },
    "eleveai-maths-974-eau-short-millimetre": {
        "badge": "LES MATHS EN VRAI", "titre": ["PLUS D'EAU", "À LA RIVIÈRE ?"], "taille": 84,
        "sous": "1 mm de pluie, c'est combien ?", "accroche": acc_974_eau,
        "dossier": "974/maths/fr",
    },
    "eleveai-maths-974-rond-point-short-hasard": {
        "badge": "LES MATHS EN VRAI", "titre": ["POURQUOI CE", "BOUCHON ?"], "taille": 92,
        "sous": "le coupable : le hasard", "accroche": acc_974_rond_point,
        "dossier": "974/maths/shorts/fr/rond-point",
    },
    "eleveai-maths-974-temperature-altitude": {
        "badge": "LES MATHS EN VRAI", "titre": ["15 DEGRÉS", "D'ÉCART"], "taille": 92,
        "sous": "sur la même île, le même matin", "accroche": acc_974_fait,
        "dossier": "974/maths/fr",
    },
    "eleveai-maths-974-temperature-altitude-short-antecedent": {
        "badge": "LES MATHS EN VRAI", "titre": ["OÙ FAIT-IL", "20 DEGRÉS ?"], "taille": 88,
        "sous": "une équation, et un lieu réel", "accroche": acc_974_antecedent,
        "dossier": "974/maths/fr",
    },
    "eleveai-maths-974-temperature-altitude-short-pourquoi": {
        "badge": "LES MATHS EN VRAI", "titre": ["POURQUOI IL", "FAIT FROID"], "taille": 84,
        "sous": "en haut de la montagne", "accroche": acc_974_pourquoi,
        "dossier": "974/maths/fr",
    },
    "eleveai-maths-actu-pisa-2025-short-ia": {
        "badge": "PISA 2025", "titre": ["L'IA RÉSOUT", "L'ÉQUATION"], "taille": 84,
        "sous": "en 1 seconde, sans se tromper", "accroche": acc_pisa_ia,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-pisa-2025-short-favorises": {
        "badge": "PISA 2025", "titre": ["PARMI LES MEILLEURS", "ET POURTANT MOYENNE"], "taille": 58,
        "sous": "la France et ses favorisés", "accroche": acc_pisa_favorises,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-pisa-2025-short-ecart": {
        "badge": "PISA 2025", "titre": ["−16 POINTS", "EN MATHS"], "taille": 92,
        "sous": "et pourtant l'écart n'a pas bougé", "accroche": acc_pisa_ecart,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-pisa-2025-short-croire": {
        "badge": "PISA 2025", "titre": ["ILS", "DÉGRINGOLENT ?"], "taille": 84,
        "sous": "c'est ce qu'on leur dit", "accroche": acc_pisa_croire,
        "dossier": "actu/maths/fr",
    },
    # ⭐ BADGE « PRIX DE L'ESSENCE », pas « Qui a raison ? » : le badge porte le
    # mot que les gens TAPENT, la rubrique se grave dans la playlist et la
    # description. Même choix qu'en septembre pour PISA.
    "eleveai-maths-actu-essence-short-litre": {
        "badge": "PRIX DE L'ESSENCE", "taille_badge": 58, "titre": ["OÙ VA", "VOTRE ARGENT ?"], "taille": 84,
        # ⛔ PAS « trois parts » : la vidéo en montre trois (carburant, accise,
        # TVA), la miniature deux — l'annonce ne collait pas à l'image.
        "sous": "presque la moitié en impôt", "accroche": acc_essence_litre,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-essence-short-pays": {
        "badge": "PRIX DE L'ESSENCE", "taille_badge": 58, "titre": ["LE PLUS TAXÉ", "LE MOINS CHER"], "taille": 76,
        "sous": "cinq pays, cinq stratégies", "accroche": acc_essence_pays,
        "dossier": "actu/maths/fr",
    },
    # ⭐ BADGE « SARAH KNAFO » : le nom que les gens tapent en septembre 2026
    # (Frédéric, 20/09 : « elle fait le buzz, il faut apporter une réponse
    # mathématique »). Le titre est la question de la rubrique ; le sous-titre
    # nomme la notion ; l'image porte le paradoxe et le verdict.
    # ⛔ On ne lui prête AUCUNE phrase : seulement la question, et ses deux nombres
    # dans la vidéo.
    "eleveai-maths-actu-paie-short-deux": {
        "badge": "SARAH KNAFO", "taille_badge": 58, "titre": ["A-T-ELLE", "RAISON ?"], "taille": 96,
        "sous": "fiche de paie : les pourcentages vérifiés", "accroche": acc_paie_deux,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-paie-short-vingt-ans": {
        "badge": "FICHE DE PAIE", "taille_badge": 58, "titre": ["20 ANS", "DE PRÉLÈVEMENTS"], "taille": 76,
        "sous": "en points ou en pour cent ?", "accroche": acc_paie_vingt,
        "dossier": "actu/maths/fr",
    },
    "eleveai-maths-actu-mimolette-short": {
        # ⭐ Frédéric, 28/09 : « il faut mettre comment gagner 1000, 2000 voire plus ».
        # puis : « le principal, c'est pas l'argent… fais-en une synthèse ».
        "badge": "MOYENNE · ÉCART TYPE", "taille_badge": 46, "titre": ["LES MATHS", "ÇA RAPPORTE"], "taille": 96,
        "sous": "la preuve par la mimolette", "taille_sous": 50, "couleur_sous": ORANGE,
        "accroche": acc_mimolette, "dossier": "actu/maths/fr",
    },
    "eleveai-maths-seconde-python-short-egal": {
        "badge": "MATHS · SECONDE", "titre": ["LE SIGNE =", "EN PYTHON"], "taille": 88,
        "sous": "il range, il ne compare pas", "accroche": acc_py_egal,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-python-short-boucles": {
        "badge": "MATHS · SECONDE", "titre": ["QUELLE", "BOUCLE ?"], "taille": 96,
        "sous": "combien de fois, ou jusqu'à quand", "accroche": acc_py_boucles,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-python-short-tracer": {
        "badge": "MATHS · SECONDE", "titre": ["TRACER UN", "PROGRAMME"], "taille": 90,
        "sous": "ne devine pas, note", "accroche": acc_py_tracer,
        "dossier": "seconde/maths/fr",
    },
    # ⭐ 23/09/2026 : le short de la notion « fonctions de référence ».
    "eleveai-maths-seconde-fonctions-reference-short-carre": {
        "badge": "MATHS · SECONDE", # ⭐⭐ PHRASE POÉTIQUE (Frédéric, 23/09). « Toucher le fond » dit d'un
        # mot le minimum en zéro — la cause de tout le reste — et se lit aussi
        # au sens courant. ⛔ Et ça DÉDOUBLONNE : trois cartes sur quatre
        # parlaient de l'ordre, celle-ci prend le creux, qui n'est qu'à elle.
        "titre": ["LA FONCTION CARRÉ", "TOUCHE LE FOND EN ZÉRO"], "taille": 56,
        "sous": "et l'ordre s'inverse à gauche", "accroche": acc_fr_carre,
        "taille_sous": 58, "couleur_sous": ORANGE, "dossier": "seconde/maths/fr",
    },
    # ⭐ 24/09/2026 : les trois shorts de la géométrie plane.
    "eleveai-maths-seconde-geometrie-short-pente": {
        "badge": "MATHS · SECONDE", "titre": ["UNE PENTE DE 12 %", "N'EST PAS 12 DEGRÉS"], "taille": 56,
        "sous": "ton compteur mesure l'hypoténuse", "taille_sous": 52,
        "couleur_sous": ORANGE, "accroche": acc_geo_pente,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-geometrie-short-projete": {
        "badge": "MATHS · SECONDE", "titre": ["LE CHEMIN LE PLUS COURT", "VERS UNE DROITE"], "taille": 50,
        "sous": "et sa démonstration en une ligne", "taille_sous": 52,
        "couleur_sous": ORANGE, "accroche": acc_geo_projete,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-geometrie-short-enclos": {
        "badge": "MATHS · SECONDE", "titre": ["60 m DE CLÔTURE", "LE PLUS GRAND ENCLOS"], "taille": 54,
        "sous": "ce n'est pas le carré", "taille_sous": 52,
        "couleur_sous": ORANGE, "accroche": acc_geo_enclos,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonctions-reference-short-racine": {
        "badge": "MATHS · SECONDE", "titre": ["LA RACINE CARRÉE", "REFUSE LES NÉGATIFS"], "taille": 58,
        "sous": "−1 n'a tout simplement pas d'image", "taille_sous": 58,
        "couleur_sous": ORANGE, "accroche": acc_fr_racine,
        "dossier": "seconde/maths/fr",
    },
    # ⛔ LA CARTE DE CLÔTURE EST DISTINCTE DE CELLE D'OUVERTURE : identiques,
    # elles donnent l'impression que la vidéo recommence. Même dessin — les cinq
    # courbes sont ce qu'on veut laisser à l'écran — mais un titre qui dit qu'on
    # conclut, et un sous-titre qui EST le résumé.
    "eleveai-maths-seconde-fonctions-reference-short-resume": {
        "badge": "MATHS · SECONDE", "titre": ["LES CINQ", "EN UN COUP D'ŒIL"], "taille": 76,
        "sous": "deux refusent, deux retournent", "taille_sous": 58,
        "couleur_sous": ORANGE, "accroche": acc_fr_carte,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonctions-reference-short-carte": {
        "badge": "MATHS · SECONDE", "titre": ["LES FONCTIONS", "DE RÉFÉRENCE"], "taille": 76,
        "sous": "cinq fonctions, cinq questions", "taille_sous": 58,
        "couleur_sous": ORANGE, "accroche": acc_fr_carte,
        "dossier": "seconde/maths/fr",
    },
    # ⛔⛔ LE TITRE EST UNE PHRASE QUI CONTIENT LA FONCTION, pas son nom posé
    # seul. Frédéric, 23/09, devant les quatre : « j'aime bien la première
    # miniature car c'est une phrase incluant la fonction ». « LA FONCTION
    # INVERSE » nomme mais n'apprend rien ; « LA FONCTION INVERSE DÉCROÎT PAR
    # MORCEAUX » nomme ET enseigne, en une ligne lisible à 300 px.
    # ⛔ LE TITRE NOMME LA FONCTION (Frédéric, 23/09 : « il faut rajouter aux
    # miniatures le nom des fonctions »). « LA RÈGLE TOMBE EN PANNE » accroche,
    # mais un élève qui cherche « fonction inverse » ne reconnaît rien, et
    # projeté en classe ça ne dit pas de quoi on parle. Le nom passe en titre,
    # l'accroche descend en sous-titre. Voir [[vignette-nommer-la-notion]].
    "eleveai-maths-seconde-fonctions-reference-short-inverse": {
        "badge": "MATHS · SECONDE", # ⭐⭐ LE JEU DE MOTS EST DE FRÉDÉRIC (23/09) : « la fonction inverse
        # l'ordre des choses » se lit DEUX FOIS — le nom de la fonction, puis
        # ce qu'elle fait. C'est la forme la plus aboutie de sa règle « une
        # phrase incluant la fonction » : ici le nom EST le verbe.
        # ⚠️ Vrai sur chaque morceau seulement — le sous-titre le dit.
        "titre": ["LA FONCTION INVERSE", "L'ORDRE DES CHOSES"], "taille": 60,
        "sous": "la règle tombe en traversant zéro", "accroche": acc_fr_inverse,
        "taille_sous": 58, "couleur_sous": ORANGE, "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonctions-reference-short-cube": {
        "badge": "MATHS · SECONDE", # ⭐⭐ « Se retourner » : ne jamais décroître, et ne jamais regarder en
        # arrière. Répond au carré, qui lui se retourne — c'est exactement la
        # confusion que la fiche signale entre les deux.
        "titre": ["LE CUBE MONTE", "SANS JAMAIS SE RETOURNER"], "taille": 56,
        "sous": "il garde le signe de son nombre", "accroche": acc_fr_cube,
        "taille_sous": 58, "couleur_sous": ORANGE, "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonctions-reference-short-absolue": {
        "badge": "MATHS · SECONDE", # ⭐ « Efface les choses négatives » (Frédéric, 23/09) plutôt que
        # « efface le signe » : le second décrit une opération, le premier dit
        # le RÉSULTAT — après elle, il ne reste plus rien de négatif. Et « les
        # choses » fait écho à « l'ordre des choses » du short inverse : la
        # série se tient par sa langue autant que par son gabarit.
        # ⛔ La coupe tombe après « EFFACE » : en 27 caractères sur une seule
        # ligne, le titre déborderait du cadre (le gabarit ne borne QUE le
        # sous-titre).
        "titre": ["LA VALEUR ABSOLUE EFFACE", "LES CHOSES NÉGATIVES"], "taille": 56,
        "sous": "deux nombres, la même image",
        "accroche": acc_fr_absolue, "taille_sous": 58, "couleur_sous": ORANGE, "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonction-vocabulaire-short-dissymetrie": {
        "badge": "MATHS · SECONDE", "titre": ["IMAGE OU", "ANTÉCÉDENT ?"], "taille": 84,
        "sous": "tout le monde les confond", "accroche": acc_fv_dissymetrie,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonction-vocabulaire-short-image": {
        "badge": "MATHS · SECONDE", "titre": ["CALCULER", "UNE IMAGE"], "taille": 90,
        "sous": "il suffit de remplacer", "accroche": acc_fv_image,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonction-vocabulaire-short-lecture": {
        "badge": "MATHS · SECONDE", "titre": ["LIRE SUR", "UNE COURBE"], "taille": 90,
        "sous": "deux gestes différents", "accroche": acc_fv_lecture,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-equations-inequations-short-retournement": {
        "badge": "MATHS · SECONDE", "titre": ["DIVISER PAR", "UN NÉGATIF"], "taille": 82,
        "sous": "l'exception qui coûte des points", "accroche": acc_eq_retournement,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-equations-inequations-short-balance": {
        "badge": "MATHS · SECONDE", "titre": ["RÉSOUDRE UNE", "ÉQUATION"], "taille": 82,
        "sous": "la balance, en trois gestes", "accroche": acc_eq_balance,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-equations-inequations-short-probleme": {
        "badge": "MATHS · SECONDE", "titre": ["METTRE EN", "ÉQUATION"], "taille": 88,
        "sous": "la méthode en quatre étapes", "accroche": acc_eq_probleme,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-identites-remarquables-short-doubleproduit": {
        "badge": "MATHS · SECONDE", "titre": ["LE DOUBLE", "PRODUIT"], "taille": 90,
        "sous": "celui qu'on oublie", "accroche": acc_ir_double_produit,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-identites-remarquables-short-difference": {
        "badge": "MATHS · SECONDE", "titre": ["FACTORISER", "x² − 9"], "taille": 84,
        "sous": "une différence de carrés", "accroche": acc_ir_difference,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-identites-remarquables-short-calculmental": {
        "badge": "MATHS · SECONDE", "titre": ["99² DE TÊTE", "EN 3 SECONDES"], "taille": 68,
        "sous": "l'astuce du nombre rond", "accroche": acc_ir_calcul_mental,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-puissances-short": {
        "badge": "MATHS · SECONDE", "titre": ["LES", "PUISSANCES"], "taille": 96,
        "sous": "la parenthèse multiplie", "accroche": acc_puissances_parenthese,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-racine-carree-2de-short-somme": {
        "badge": "MATHS · SECONDE", "titre": ["LA RACINE", "CARRÉE"], "taille": 96,
        "sous": "le piège de la somme", "accroche": acc_racine_somme,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-racine-carree-2de-short-simplifier": {
        "badge": "MATHS · SECONDE", "titre": ["SIMPLIFIER", "UNE RACINE"], "taille": 84,
        "sous": "sortir le plus grand carré", "accroche": acc_racine_simplifier,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-racine-carree-2de-short-negatif": {
        # ⚠️ Le titre de la vignette dit la MÊME phrase que le titre YouTube :
        # « Pourquoi √(−9) n'existe pas ». Deux formulations pour une seule
        # vidéo, et le spectateur ne sait plus s'il a déjà vu celle-là.
        "badge": "MATHS · SECONDE", "titre": ["POURQUOI", "√−9 N'EXISTE PAS"], "taille": 72,
        "sous": "un carré est toujours positif", "accroche": acc_racine_negatif,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-repere-coordonnees-short": {
        "badge": "MATHS · SECONDE", "titre": ["PARALLÉLO-", "GRAMME ?"], "taille": 84,
        "sous": "compare les diagonales", "accroche": acc_repere_diagonales,
        "dossier": "seconde/maths/fr",
    },
}


def construire(nom, spec):
    img = fond()
    d = ImageDraw.Draw(img)

    # Ti-Margo en bas à droite, à cheval sur la bande que l'interface recouvre.
    m = Image.open(TI_MARGO).convert("RGBA")
    h = 560
    w = int(m.width * h / m.height)
    m = m.resize((w, h), Image.LANCZOS)
    img.paste(m, (W - w - 10, H - h - 8), m)

    t_badge = spec.get("taille_badge", 34)
    badge(d, W // 2, HAUT_SUR + 20, spec["badge"], t_badge)

    # ⛔ LE TITRE DESCEND D'AUTANT QUE LE BADGE A GRANDI. Le y = 320 était écrit
    # en dur : avec un badge de 58, sa moitié basse passait sous la première
    # ligne du titre.
    y_titre = 320 + max(0, t_badge - 34)
    ft = police("ariblk.ttf", spec["taille"])
    centre(d, W // 2, y_titre, spec["titre"][0], ft, NAVY)
    centre(d, W // 2, y_titre + spec["taille"] + 26, spec["titre"][1], ft, NAVY)
    # ⭐ `taille_sous` (Frédéric, 23/09 : « on grossit un peu ta question »).
    # Le sous-titre porte l'accroche ; à 40 il se lisait à peine dans la grille
    # Shorts, où la carte tombe à 300 px de large. Défaut inchangé à 40 pour
    # les vignettes déjà validées — on ne grossit que celles qui le demandent.
    # ⛔ Et il se RÉTRÉCIT tout seul s'il dépasse : une accroche longue en gros
    # corps sortirait du cadre sans prévenir.
    t_sous = spec.get("taille_sous", 40)
    while t_sous > 24 and d.textlength(spec["sous"],
                                       font=police("arialbd.ttf", t_sous)) > W - 120:
        t_sous -= 2
    # ⭐ `couleur_sous` (Frédéric, 23/09 : « grossis-le un peu et trouve une
    # couleur de contraste »). En BLEU sous un titre bleu nuit, le sous-titre
    # se fondait dans le titre : deux bleus l'un sur l'autre ne font qu'un
    # bloc. ORANGE est la complémentaire du bleu — c'est le plus fort écart
    # possible sur ce fond quadrillé, et il ne sert nulle part ailleurs dans
    # ces vignettes (le rouge marque le caractère qui varie, le vert le juste).
    centre(d, W // 2, y_titre + 2 * (spec["taille"] + 26) + 6,
           spec["sous"], police("arialbd.ttf", t_sous),
           spec.get("couleur_sous", BLEU))

    spec["accroche"](d)
    signature(img, d, spec.get("sig", "Frédéric, ton prof"))

    dossier = SORTIE / spec["dossier"] if spec.get("dossier") else SORTIE
    os.makedirs(dossier, exist_ok=True)
    chemin = dossier / f"{nom}.png"
    img.save(chemin, "PNG")
    print(chemin)


def main():
    filtre = sys.argv[1] if len(sys.argv) > 1 else None
    for nom, spec in SHORTS.items():
        if filtre and filtre not in nom:
            continue
        construire(nom, spec)


if __name__ == "__main__":
    main()
