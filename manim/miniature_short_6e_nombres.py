# miniature_short_6e_nombres.py
# LES MINIATURES VERTICALES des trois shorts de 6e du 01/10/2026 : le zéro qui
# garde la place (entiers), « 0,45 ou 0,5 ? » et « 12 cm et un petit bout »
# (décimaux).
#
# ⛔ FICHIER À PART, comme `miniature_short_pourcentages.py` : on EMPRUNTE la
# machinerie de `miniature_short.py` sans toucher à son dictionnaire.
# ⭐ Le BADGE nomme le chapitre, le TITRE porte la question du short.
# ⭐ Chaque vignette s'enregistre À CÔTÉ DE SA VIDÉO (Frédéric, 01/10 : « mets
# les vidéos dans le même répertoire que les miniatures ») :
# manim/sorties/6e/maths/shorts/fr/<notion>/.
#
# Usage :  python manim/miniature_short_6e_nombres.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_short import ORANGE, W, centre, construire

GRIS = (150, 165, 185)


def acc_zero_entier(d):
    f = police("ariblk.ttf", 200)
    morceaux = [("1 ", BLEU), ("0", ORANGE), ("42", BLEU)]
    larg = sum(d.textlength(t, font=f) for t, _ in morceaux)
    x = (W - larg) / 2
    for t, c in morceaux:
        d.text((x, 700), t, font=f, fill=c)
        x += d.textlength(t, font=f)
    centre(d, W // 2, 960, "sans le zéro :", police("arialbd.ttf", 56), NAVY)
    centre(d, W // 2, 1040, "142", police("ariblk.ttf", 160), ROUGE)


def acc_zero_decimal(d):
    centre(d, W // 2, 700, "0,5 = 0,50", police("ariblk.ttf", 130), VERT)
    centre(d, W // 2, 900, "50 > 45", police("ariblk.ttf", 110), BLEU)
    centre(d, W // 2, 1080, "donc 0,5 > 0,45", police("ariblk.ttf", 76), NAVY)


def acc_origine_decimal(d):
    # la règle de 12 à 13 cm, ses dix morceaux, le crayon qui s'arrête au 4e
    x0, x1, y = 140, 940, 900
    d.rectangle([x0 - 30, y, x1 + 30, y + 130], fill=(235, 238, 242), outline=NAVY, width=4)
    for k in range(11):
        x = x0 + (x1 - x0) * k / 10
        h = 70 if k in (0, 10) else 38
        d.line([(x, y), (x, y + h)], fill=NAVY, width=6 if k in (0, 10) else 3)
    centre(d, x0, y + 145, "12", police("ariblk.ttf", 44), NAVY)
    centre(d, x1, y + 145, "13", police("ariblk.ttf", 44), NAVY)
    bout = x0 + (x1 - x0) * 0.4
    d.line([(x0, y + 14), (bout, y + 14)], fill=VERT, width=18)
    d.rectangle([60, y - 110, bout - 70, y - 30], fill=ORANGE)
    d.polygon([(bout - 70, y - 110), (bout - 70, y - 30), (bout, y - 70)], fill=(245, 214, 160))
    d.polygon([(bout - 24, y - 84), (bout - 24, y - 56), (bout, y - 70)], fill=(70, 70, 70))
    centre(d, W // 2, 1150, "12,4 cm", police("ariblk.ttf", 150), VERT)


# ── 04/10/2026 : les cinq shorts de « Calculer avec les décimaux » ──────────

def acc_calcul_addition(d):
    f = police("ariblk.ttf", 150)
    centre(d, W // 2, 680, "2,80", f, BLEU)
    centre(d, W // 2, 860, "+ 1,35", f, BLEU)
    d.line([(220, 1040), (860, 1040)], fill=NAVY, width=10)
    centre(d, W // 2, 1070, "4,15", f, VERT)


def acc_calcul_dixieme(d):
    centre(d, W // 2, 690, "0,1 × 0,1", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 880, "≠ 0,2", police("ariblk.ttf", 120), ROUGE)
    centre(d, W // 2, 1060, "= 0,01", police("ariblk.ttf", 150), VERT)


def acc_calcul_01(d):
    centre(d, W // 2, 700, "250 × 0,1", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 900, "= 25", police("ariblk.ttf", 170), VERT)
    centre(d, W // 2, 1110, "plus PETIT !", police("ariblk.ttf", 90), ROUGE)


def acc_calcul_partage(d):
    centre(d, W // 2, 700, "4,80 € ÷ 4", police("ariblk.ttf", 120), BLEU)
    centre(d, W // 2, 900, "= 1,20 €", police("ariblk.ttf", 150), VERT)
    centre(d, W // 2, 1100, "chacun", police("ariblk.ttf", 80), NAVY)


def acc_calcul_defi(d):
    centre(d, W // 2, 700, "3,7 × 2,9", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 890, "= 107,3 ?", police("ariblk.ttf", 130), ROUGE)
    centre(d, W // 2, 1090, "≈ 4 × 3 = 12", police("ariblk.ttf", 90), VERT)


_CALCUL = "../sorties/6e/maths/shorts/fr/decimal-calcul"

COURTS_CALCUL = {
    "eleveai-maths-6e-decimal-calcul-short-addition": {
        "badge": "CALCULER AVEC LES DÉCIMAUX", "titre": ["2,8 + 1,35", "= ?"], "taille": 110,
        "sous": "virgule sous virgule", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_calcul_addition, "dossier": _CALCUL,
    },
    "eleveai-maths-6e-decimal-calcul-short-dixieme": {
        "badge": "CALCULER AVEC LES DÉCIMAUX", "titre": ["0,1 × 0,1", "= 0,2 ?"], "taille": 110,
        "sous": "beaucoup se trompent", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_calcul_dixieme, "dossier": _CALCUL,
    },
    "eleveai-maths-6e-decimal-calcul-short-01": {
        "badge": "CALCULER AVEC LES DÉCIMAUX", "titre": ["MULTIPLIER,", "ÇA GRANDIT ?"], "taille": 96,
        "sous": "pas toujours !", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_calcul_01, "dossier": _CALCUL,
    },
    "eleveai-maths-6e-decimal-calcul-short-partage": {
        "badge": "CALCULER AVEC LES DÉCIMAUX", "titre": ["4,80 € POUR", "4 AMIS"], "taille": 100,
        "sous": "combien pour chacun ?", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_calcul_partage, "dossier": _CALCUL,
    },
    "eleveai-maths-6e-decimal-calcul-short-defi": {
        "badge": "CALCULER AVEC LES DÉCIMAUX", "titre": ["107,3 ?", "IMPOSSIBLE !"], "taille": 104,
        "sous": "sans poser le calcul", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_calcul_defi, "dossier": _CALCUL,
    },
}

COURTS_AVANT = {
    "eleveai-maths-6e-entier-nombre-short-zero": {
        "badge": "LES NOMBRES ENTIERS", "titre": ["UN ZÉRO,", "ÇA VAUT RIEN ?"], "taille": 96,
        "sous": "alors pourquoi on le garde ?", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_zero_entier,
        "dossier": "../sorties/6e/maths/shorts/fr/entier-nombre",
    },
    "eleveai-maths-6e-decimal-nombre-short-zero": {
        "badge": "LES NOMBRES DÉCIMAUX", "titre": ["0,45 OU 0,5 :", "LE PLUS GRAND ?"], "taille": 92,
        "sous": "45 > 5… et pourtant", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_zero_decimal,
        "dossier": "../sorties/6e/maths/shorts/fr/decimal-nombre",
    },
    "eleveai-maths-6e-decimal-nombre-short-origine": {
        "badge": "LES NOMBRES DÉCIMAUX", "titre": ["12 CM ET UN", "PETIT BOUT"], "taille": 96,
        "sous": "d'où vient la virgule ?", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_origine_decimal,
        "dossier": "../sorties/6e/maths/shorts/fr/decimal-nombre",
    },
}

# ── 05/10/2026 : les quatre shorts de « La demi-droite graduée » ────────────

def _droite(d, x0, x1, y, n, etiquettes, epais=7):
    """Une demi-droite : n écarts entre x0 et x1, la flèche au bout, des étiquettes
    {rang du trait: texte} sous les traits."""
    d.line([(x0, y), (x1 + 60, y)], fill=NAVY, width=epais)
    d.polygon([(x1 + 60, y - 16), (x1 + 60, y + 16), (x1 + 88, y)], fill=NAVY)
    for k in range(n + 1):
        x = x0 + (x1 - x0) * k / n
        d.line([(x, y - 22), (x, y + 22)], fill=NAVY, width=6)
        if k in etiquettes:
            centre(d, x, y + 36, etiquettes[k], police("ariblk.ttf", 54), NAVY)
    return lambda k: x0 + (x1 - x0) * k / n


def acc_droite_lire(d):
    x = _droite(d, 110, 900, 820, 5, {0: "0", 5: "10"})
    d.ellipse([x(3) - 22, 798, x(3) + 22, 842], fill=ORANGE)
    centre(d, x(3), 700, "A", police("ariblk.ttf", 70), ORANGE)
    centre(d, W // 2, 960, "A = 3 ?  FAUX", police("ariblk.ttf", 84), ROUGE)
    centre(d, W // 2, 1090, "A = 6", police("ariblk.ttf", 150), VERT)


def acc_droite_placer(d):
    x = _droite(d, 110, 900, 820, 10, {0: "1", 10: "2"})
    d.line([(x(0), 820), (x(7), 820)], fill=VERT, width=16)
    d.ellipse([x(7) - 24, 796, x(7) + 24, 844], fill=VERT)
    centre(d, W // 2, 990, "1,7", police("ariblk.ttf", 200), VERT)


def acc_droite_fraction(d):
    x = _droite(d, 110, 900, 860, 8, {0: "0", 4: "1", 8: "2"})
    d.ellipse([x(5) - 24, 836, x(5) + 24, 884], fill=VERT)
    centre(d, x(5), 630, "5", police("ariblk.ttf", 70), VERT)
    d.line([(x(5) - 34, 722), (x(5) + 34, 722)], fill=VERT, width=7)
    centre(d, x(5), 728, "4", police("ariblk.ttf", 70), VERT)
    centre(d, W // 2, 1010, "5/4 > 1", police("ariblk.ttf", 160), VERT)


def acc_droite_graduer(d):
    x0, x1, y = 130, 950, 820
    d.line([(x0, y), (x1, y)], fill=NAVY, width=9)
    for k in range(5):
        xk = x0 + (x1 - x0) * k / 4
        bout = k in (0, 4)
        d.line([(xk, y - (40 if bout else 55)), (xk, y + (40 if bout else 55))],
               fill=NAVY if bout else ORANGE, width=9 if bout else 12)
    centre(d, W // 2, 940, "4 parts", police("ariblk.ttf", 110), BLEU)
    centre(d, W // 2, 1080, "3 traits !", police("ariblk.ttf", 130), ORANGE)


_DROITE = "../sorties/6e/maths/shorts/fr/demi-droite-graduee"

COURTS_DROITE = {
    "eleveai-maths-6e-demi-droite-short-lire": {
        "badge": "LA DEMI-DROITE GRADUÉE", "titre": ["SUR LE 3E TRAIT,", "C'EST 3 ?"], "taille": 92,
        "sous": "le piège du pas", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_droite_lire, "dossier": _DROITE,
    },
    "eleveai-maths-6e-demi-droite-short-placer": {
        "badge": "LA DEMI-DROITE GRADUÉE", "titre": ["OÙ PLACER", "1,7 ?"], "taille": 110,
        "sous": "entre 1 et 2… mais où ?", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_droite_placer, "dossier": _DROITE,
    },
    "eleveai-maths-6e-demi-droite-short-fraction": {
        "badge": "LA DEMI-DROITE GRADUÉE", "titre": ["5/4, PLUS PETIT", "QUE 1 ?"], "taille": 96,
        "sous": "beaucoup le croient", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_droite_fraction, "dossier": _DROITE,
    },
    "eleveai-maths-6e-demi-droite-short-graduer": {
        "badge": "LA DEMI-DROITE GRADUÉE", "titre": ["4 PARTS =", "4 TRAITS ?"], "taille": 110,
        "sous": "le piège du segment", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_droite_graduer, "dossier": _DROITE,
    },
}

# ── 05/10/2026 : les quatre shorts de « Calculer avec les fractions » ───────

def acc_frac_quantite(d):
    centre(d, W // 2, 690, "18 ÷ 3 = 6", police("ariblk.ttf", 120), BLEU)
    centre(d, W // 2, 880, "2 × 6 = 12", police("ariblk.ttf", 120), ORANGE)
    centre(d, W // 2, 1080, "pas 27 !", police("ariblk.ttf", 110), ROUGE)


def acc_frac_additionner(d):
    centre(d, W // 2, 690, "1/2 + 1/3", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 880, "≠ 2/5", police("ariblk.ttf", 120), ROUGE)
    centre(d, W // 2, 1060, "= 5/6", police("ariblk.ttf", 150), VERT)


def acc_frac_multiplier(d):
    centre(d, W // 2, 690, "3 × 2/5", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 880, "≠ 6/15", police("ariblk.ttf", 120), ROUGE)
    centre(d, W // 2, 1060, "= 6/5", police("ariblk.ttf", 150), VERT)


def acc_frac_defi(d):
    centre(d, W // 2, 690, "1/4 + 1/6", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 880, "= 5/12", police("ariblk.ttf", 120), ORANGE)
    centre(d, W // 2, 1060, "reste 7/12", police("ariblk.ttf", 120), VERT)


_FRAC = "../sorties/6e/maths/shorts/fr/fraction-calcul"

COURTS_FRACTIONS = {
    "eleveai-maths-6e-fraction-calcul-short-quantite": {
        "badge": "CALCULER AVEC LES FRACTIONS", "titre": ["LES 2/3", "DE 18 ?"], "taille": 110,
        "sous": "je divise, puis je multiplie", "taille_sous": 44, "couleur_sous": ORANGE,
        "accroche": acc_frac_quantite, "dossier": _FRAC,
    },
    "eleveai-maths-6e-fraction-calcul-short-additionner": {
        "badge": "CALCULER AVEC LES FRACTIONS", "titre": ["1/2 + 1/3", "= 2/5 ?"], "taille": 110,
        "sous": "beaucoup se trompent", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_frac_additionner, "dossier": _FRAC,
    },
    "eleveai-maths-6e-fraction-calcul-short-multiplier": {
        "badge": "CALCULER AVEC LES FRACTIONS", "titre": ["3 × 2/5", "= 6/15 ?"], "taille": 110,
        "sous": "le bas ne bouge pas", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_frac_multiplier, "dossier": _FRAC,
    },
    "eleveai-maths-6e-fraction-calcul-short-defi": {
        "badge": "CALCULER AVEC LES FRACTIONS", "titre": ["IL RESTE", "QUOI ?"], "taille": 110,
        "sous": "le gâteau de Leïla et Léo", "taille_sous": 44, "couleur_sous": ORANGE,
        "accroche": acc_frac_defi, "dossier": _FRAC,
    },
}

# ── 08/10/2026 : le short des nombres relatifs de 5e (même machinerie) ─────


def acc_relatif_comparer(d):
    # la droite −10 → 2, les deux points, puis la réponse en grand
    _droite(d, 110, 970, 760, 12, {0: "−10", 5: "−5", 10: "0", 12: "2"})
    for k, c in ((0, ROUGE), (8, VERT)):
        x = 110 + k * (970 - 110) / 12
        d.ellipse([x - 22, 738, x + 22, 782], fill=c)
    centre(d, W // 2, 930, "−2 > −10", police("ariblk.ttf", 140), VERT)
    centre(d, W // 2, 1110, "loin du 0 = plus petit", police("ariblk.ttf", 60), NAVY)


COURTS_RELATIFS = {
    "eleveai-maths-5e-relatif-nombre-short-comparer": {
        "badge": "LES NOMBRES RELATIFS", "titre": ["−10 OU −2 :", "LE PLUS GRAND ?"], "taille": 92,
        "sous": "10 > 2… et pourtant", "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": acc_relatif_comparer,
        "dossier": "../sorties/5e/maths/shorts/fr/relatif-nombre",
    },
}



def acc_relatif_lire(d):
    centre(d, W // 2, 690, "3 degrés sous 0", police("ariblk.ttf", 70), NAVY)
    centre(d, W // 2, 820, "−3", police("ariblk.ttf", 220), ROUGE)
    centre(d, W // 2, 1100, "pas 3 !", police("ariblk.ttf", 80), ORANGE)


def acc_relatif_signe(d):
    centre(d, W // 2, 640, "0", police("ariblk.ttf", 300), (217, 160, 10))
    centre(d, W // 2, 1000, "ni positif,", police("ariblk.ttf", 72), VERT)
    centre(d, W // 2, 1090, "ni négatif", police("ariblk.ttf", 72), ROUGE)


def acc_relatif_placer(d):
    pos = _droite(d, 110, 970, 820, 5, {0: "−4", 1: "−3", 2: "−2", 3: "−1", 4: "0", 5: "1"})
    x = pos(1.5)
    d.ellipse([x - 24, 796, x + 24, 844], fill=ROUGE)
    centre(d, x, 690, "−2,5", police("ariblk.ttf", 80), ROUGE)
    centre(d, W // 2, 1020, "entre −3 et −2", police("ariblk.ttf", 70), VERT)


def acc_relatif_oppose(d):
    centre(d, W // 2, 700, "−6", police("ariblk.ttf", 170), ROUGE)
    centre(d, W // 2, 900, "↓", police("arialbd.ttf", 90), NAVY)
    centre(d, W // 2, 990, "+6", police("ariblk.ttf", 170), VERT)


def acc_relatif_distance(d):
    pos = _droite(d, 110, 970, 780, 16, {0: "−8", 8: "0", 16: "8"})
    d.ellipse([pos(0) - 22, 758, pos(0) + 22, 802], fill=ROUGE)
    d.line([(pos(0), 900), (pos(8), 900)], fill=(37, 99, 235), width=8)
    centre(d, (pos(0) + pos(8)) / 2, 915, "8", police("ariblk.ttf", 80), (37, 99, 235))
    centre(d, W // 2, 1050, "pas −8 !", police("ariblk.ttf", 80), ORANGE)


def acc_relatif_defi(d):
    pos = _droite(d, 110, 970, 780, 7, {1: "−4", 5: "0", 6: "1"})
    for k, c, t in ((1, ROUGE, "A"), (6, VERT, "B")):
        d.ellipse([pos(k) - 22, 758, pos(k) + 22, 802], fill=c)
        centre(d, pos(k), 660, t, police("ariblk.ttf", 70), c)
    centre(d, W // 2, 930, "4 + 1 = 5", police("ariblk.ttf", 110), VERT)
    centre(d, W // 2, 1090, "pas 3 !", police("ariblk.ttf", 70), ORANGE)


_REL = "../sorties/5e/maths/shorts/fr/relatif-nombre"
for _n, _t, _sous, _acc, _tl in [
    ("lire", ["3 DEGRÉS SOUS 0 :", "ÇA S'ÉCRIT COMMENT ?"], "le signe qui change tout", acc_relatif_lire, 70),
    ("signe", ["ZÉRO : POSITIF", "OU NÉGATIF ?"], "ni l'un ni l'autre", acc_relatif_signe, 92),
    ("placer", ["OÙ PLACER", "−2,5 ?"], "le mauvais côté…", acc_relatif_placer, 100),
    ("oppose", ["L'OPPOSÉ", "DE −6 ?"], "le miroir du zéro", acc_relatif_oppose, 100),
    ("distance", ["LA DISTANCE À 0", "DE −8 ?"], "une distance négative ?", acc_relatif_distance, 92),
    ("defi", ["A À −4, B À +1 :", "QUELLE DISTANCE ?"], "4 − 1 = 3 ? non !", acc_relatif_defi, 84),
]:
    COURTS_RELATIFS[f"eleveai-maths-5e-relatif-nombre-short-{_n}"] = {
        "badge": "LES NOMBRES RELATIFS", "titre": _t, "taille": _tl,
        "sous": _sous, "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": _acc, "dossier": _REL,
    }

# ── 08/10/2026 : « Les nombres relatifs, c'est ta course » (Diagonale des Fous)
def acc_relatif_diagonale(d):
    # le profil Saint-Pierre → Nez-de-Bœuf → Hell-Bourg → Maïdo → La Possession
    pts = [(0, 0), (30, 2070), (86, 930), (138, 2190), (160, 0)]
    xy = [(110 + km / 160 * 860, 900 - alt / 2190 * 300) for km, alt in pts]
    d.line([(90, 900), (990, 900)], fill=(37, 99, 235), width=5)
    for (a, b), (_, a0), (_, a1) in zip(zip(xy, xy[1:]), pts, pts[1:]):
        d.line([a, b], fill=VERT if a1 > a0 else ROUGE, width=12)
    for x, y in xy:
        d.ellipse([x - 16, y - 16, x + 16, y + 16], fill=NAVY)
    centre(d, W // 2, 960, "+2 070 −1 140 +1 260 −2 190", police("ariblk.ttf", 50), NAVY)
    centre(d, W // 2, 1060, "= 0", police("ariblk.ttf", 130), (217, 160, 10))


COURTS_RELATIFS["eleveai-maths-5e-relatif-nombre-short-diagonale"] = {
    "badge": "LES NOMBRES RELATIFS", "titre": ["DIAGONALE DES FOUS :", "MONTER = + ?"], "taille": 70,
    "sous": "10 200 m de montée… et 0", "taille_sous": 48, "couleur_sous": ORANGE,
    "accroche": acc_relatif_diagonale, "dossier": _REL,
}



# ── 09/10/2026 : les sept shorts du calcul littéral de 5e ──────────────────


def _lit(haut, bas, pied, c_haut=BLEU, c_bas=VERT, t_haut=150, t_bas=110):
    def acc(d):
        centre(d, W // 2, 690, haut, police("ariblk.ttf", t_haut), c_haut)
        centre(d, W // 2, 900, bas, police("ariblk.ttf", t_bas), c_bas)
        centre(d, W // 2, 1090, pied, police("ariblk.ttf", 64), ORANGE)
    return acc


COURTS_LITTERAL = {}
_LIT = "../sorties/5e/maths/shorts/fr/litteral-calcul"
for _n, _t, _sous, _acc, _tl in [
    ("comprendre", ["x = 2 :", "3x = 32 ?"], "le signe caché", _lit("3x", "= 3 × 2 = 6", "pas 32 !"), 100),
    ("traduire", ["LE TRIPLE DE n", "DIMINUÉ DE 4"], "dans quel ordre ?", _lit("3n − 4", "pas 3(n − 4)", "on lit dans l'ordre", t_bas=90, c_bas=ROUGE), 84),
    ("substituer", ["x = −2 :", "5 − 3x = ?"], "le négatif oublié", _lit("5 − 3 × (−2)", "= 11", "pas −1 !", t_haut=100), 100),
    ("reduire", ["2x + 3 + 4x + 1", "= 10x ?"], "on ne mélange pas tout", _lit("6x + 4", "les x avec les x", "pas 10x !", t_bas=80), 80),
    ("tester", ["VRAI POUR 2,", "VRAI POUR TOUS ?"], "x + x = x × x", _lit("x = 3 :", "6 ≠ 9", "le contre-exemple", c_haut=NAVY, c_bas=ROUGE), 88),
    ("developper", ["5(x − 2)", "= 5x − 2 ?"], "le 2 oublié", _lit("5(x − 2)", "= 5x − 10", "le 5 multiplie TOUT", t_haut=130, t_bas=100), 100),
    ("defi", ["LE PÉRIMÈTRE", "DU RECTANGLE ?"], "x + 3 de long, x de large", _lit("2(x + 3) + 2x", "= 4x + 6", "pas x + 3 + x !", t_haut=100, t_bas=110), 92),
]:
    COURTS_LITTERAL[f"eleveai-maths-5e-litteral-calcul-short-{_n}"] = {
        "badge": "LE CALCUL LITTÉRAL", "titre": _t, "taille": _tl,
        "sous": _sous, "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": _acc, "dossier": _LIT,
    }



# ── 11/10/2026 : les cinq shorts du TVI (terminale spé) ────────────────────
COURTS_TVI = {}
_TVI = "../sorties/terminale/maths/shorts/fr/continuite-tvi"
for _n, _t, _sous, _acc, _tl in [
    ("continuite", ["DE −1 À 1 :", "ELLE TOUCHE 0 ?"], "pas toujours…", _lit("un saut", "= pas de 0", "il faut la continuité", c_haut=ROUGE, c_bas=ROUGE, t_haut=130, t_bas=90), 92),
    ("appliquer", ["UNE SOLUTION,", "SANS LA CALCULER"], "x³ + x − 1 = 0", _lit("f(0) = −1", "f(1) = 1", "donc une solution", c_haut=ROUGE, t_haut=110, t_bas=110), 88),
    ("unicite", ["AU MOINS UNE", "OU UNE SEULE ?"], "le piège du bac", _lit("f' > 0", "UNIQUE", "strictement monotone", t_haut=130, t_bas=120), 92),
    ("rediger", ["LE TVI AU BAC :", "4 LIGNES"], "tous les points", _lit("1 2 3 4", "corollaire du TVI", "on le cite !", t_haut=150, t_bas=70), 92),
    ("defi", ["α AU CENTIÈME", "SANS FORMULE ?"], "le balayage", _lit("0,68 < α", "< 0,69", "changement de signe", t_haut=120, t_bas=120), 92),
]:
    COURTS_TVI[f"eleveai-maths-terminale-continuite-tvi-short-{_n}"] = {
        "badge": "LE TVI · TERMINALE", "taille_badge": 58, "titre": _t, "taille": _tl,
        "sous": _sous, "taille_sous": 48, "couleur_sous": ORANGE,
        "accroche": _acc, "dossier": _TVI,
    }

COURTS_MAIDO = {
    "eleveai-maths-3e-pente-maido-short": {
        "badge": "DIAGONALE DES FOUS", "taille_badge": 52, "titre": ["LE MAÏDO :", "100 % = MUR ?"], "taille": 100,
        "sous": "profil officiel 2025", "taille_sous": 44, "couleur_sous": ORANGE,
        "accroche": _lit("100 % = 45°", "Maïdo : 23 %", "à peine 13°", t_haut=110, t_bas=100),
        "dossier": "../sorties/3e/maths/shorts/fr/pente-maido",
    },
}

COURTS = {**COURTS_AVANT, **COURTS_CALCUL, **COURTS_DROITE, **COURTS_FRACTIONS, **COURTS_RELATIFS, **COURTS_LITTERAL, **COURTS_TVI, **COURTS_MAIDO}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for nom, spec in COURTS.items():
        if filtre not in nom:
            continue
        ft = police("ariblk.ttf", spec["taille"])
        for t in spec["titre"]:
            l = sonde.textlength(t, font=ft)
            print(f"  titre « {t} » : {l:.0f} px / {W}" + ("   ⛔ DÉBORDE" if l > W - 80 else ""))
        construire(nom, spec)


if __name__ == "__main__":
    main()
