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


def badge(d, cx, y, txt):
    f = police("ariblk.ttf", 34)
    l = d.textlength(txt, font=f)
    x = cx - (l + 56) / 2
    d.rounded_rectangle([x, y, x + l + 56, y + 62], radius=31, fill=NAVY)
    d.text((x + 28, y + 12), txt, font=f, fill=(255, 255, 255))


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
    d.rectangle([250, 570, 530, 850], outline=BLEU, width=6)
    d.rectangle([358, 678, 422, 742], fill=JAUNE)
    d.rectangle([680, 690, 810, 820], outline=VERT, width=6)
    d.rectangle([713, 723, 777, 787], fill=JAUNE)
    centre(d, 390, 870, "48 millions", police("arialbd.ttf", 36), BLEU)
    centre(d, 745, 840, "500 000", police("arialbd.ttf", 36), VERT)
    centre(d, W // 2, 960, "même carré jaune", police("ariblk.ttf", 44), NAVY)
    centre(d, W // 2, 1030, "même précision", police("ariblk.ttf", 52), VERT)


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


SHORTS = {
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

    badge(d, W // 2, HAUT_SUR + 20, spec["badge"])

    ft = police("ariblk.ttf", spec["taille"])
    centre(d, W // 2, 320, spec["titre"][0], ft, NAVY)
    centre(d, W // 2, 320 + spec["taille"] + 26, spec["titre"][1], ft, NAVY)
    centre(d, W // 2, 320 + 2 * (spec["taille"] + 26) + 6,
           spec["sous"], police("arialbd.ttf", 40), BLEU)

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
