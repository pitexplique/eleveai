# miniature_short_expression.py
# LES MINIATURES VERTICALES des shorts jumeaux de la série « expression
# littérale » (5e/4e/3e, CEINTURE BLANCHE, 13/10/2026). Même machinerie que
# `miniature_short_pythagore.py` (fond, badge, signature de `miniature_short.py`).
#
# ⭐ L'accroche MONTRE le piège du short, en grand, avec la ceinture blanche.
# ⭐ Rangée À CÔTÉ DE SA VIDÉO : manim/sorties/<classe>/maths/expression-litterale/<NN-micro>/.
#
# Usage :  python manim/miniature_short_expression.py [filtre]

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import NAVY, police
from miniature_short import ORANGE, W, construire
from miniature_short_signes import centre

RACINE = Path(__file__).resolve().parents[1]
BLEU = (37, 99, 175)
ROUGE = (220, 38, 38)
VERT = (22, 163, 74)


CEINTURES = [("blanche", (245, 245, 245)), ("jaune", (250, 204, 21)), ("orange", (249, 115, 22)),
             ("verte", (34, 197, 94)), ("bleue", (59, 130, 246)), ("marron", (139, 90, 43)),
             ("noire", (26, 26, 26))]


def _ceinture(d, cx, cy, s, c, o):
    """Une ceinture à l'échelle s (s = 1 : bande de 120 px)."""
    d.rectangle([cx - 60 * s, cy - 10 * s, cx + 60 * s, cy + 10 * s], fill=c, outline=o, width=max(2, int(3 * s)))
    for sg in (-1, 1):
        d.polygon([(cx + sg * 5 * s, cy + 6 * s), (cx + sg * 28 * s, cy + 58 * s),
                   (cx + sg * 14 * s, cy + 62 * s), (cx - sg * 2 * s, cy + 9 * s)],
                  fill=c, outline=o, width=max(2, int(3 * s)))
    d.rectangle([cx - 14 * s, cy - 14 * s, cx + 14 * s, cy + 14 * s], fill=c, outline=o, width=max(2, int(3 * s)))


def echelle(d, cx, cy, nom, s=0.55, pas=None):
    """⭐ Frédéric, 13/10 : « affiche l'ordre des ceintures pour que l'élève sache
    où se situe la sienne ». Les 7 ceintures blanche → noire, celle du jour en
    grand, en couleur et nommée ; les autres pâlies."""
    pas = pas or 150 * s
    x0 = cx - 3 * pas
    for i, (n, c) in enumerate(CEINTURES):
        if n == nom:
            continue
        pale = tuple(int(v * 0.4 + 255 * 0.6) for v in c)
        _ceinture(d, x0 + i * pas, cy, s, pale, (170, 180, 200))
    i = [n for n, _ in CEINTURES].index(nom)
    _ceinture(d, x0 + i * pas, cy - 6 * s, s * 1.5, dict(CEINTURES)[nom], NAVY)
    centre(d, x0 + i * pas, cy + 100 * s, f"ceinture {nom}", police("arialbd.ttf", int(46 * s)), NAVY)


# ⭐ Frédéric, 14/10 : « tout ne doit pas être en ceinture blanche, les faibles
# auront du mal ». Blanche = tout se voit sur le dessin ; jaune = un calcul ou une
# règle ; orange = une règle de signes (négatifs). Défaut : blanche.
CEINTURE_SHORT = {
    "eleveai-maths-4e-expression-comprendre-short": "jaune",
    "eleveai-maths-4e-expression-substituer-short": "orange",
    "eleveai-maths-4e-expression-reduire-short": "jaune",
    "eleveai-maths-3e-expression-comprendre-short": "jaune",
    "eleveai-maths-3e-expression-substituer-short": "jaune",
    "eleveai-maths-3e-expression-reduire-short": "orange",
    "eleveai-maths-3e-expression-developper-short": "jaune",
    "eleveai-maths-3e-expression-identites-short": "jaune",
}
_COURANTE = ["blanche"]


def badge_ceinture(d, cx=None, cy=None, nom=None):
    """L'échelle des shorts, sous l'accroche, avec la ceinture du short en cours."""
    echelle(d, W // 2, 1190, nom or _COURANTE[0], s=0.8)


def lignes(d, items, y0=600, pas=185):
    """Des lignes centrées : (texte, taille, couleur)."""
    for i, (txt, taille, coul) in enumerate(items):
        centre(d, W // 2, y0 + i * pas, txt, police("ariblk.ttf", taille), coul)


def acc_comprendre_4e(d):
    badge_ceinture(d, cx=190, cy=1210)
    lignes(d, [("7a − 2", 150, BLEU), ("7a  |  −2", 96, VERT), ("2 termes", 70, ORANGE)])


def acc_traduire_4e(d):
    badge_ceinture(d, cx=190, cy=1210)
    lignes(d, [("2(a + b)", 130, VERT), ("ou", 60, NAVY), ("2a + b ?", 130, ROUGE)])


def acc_substituer_4e(d):
    badge_ceinture(d, cx=190, cy=1210)
    lignes(d, [("(−3)²", 150, BLEU), ("= 9", 110, VERT), ("ou −9 ?", 110, ROUGE)])


def acc_reduire_4e(d):
    badge_ceinture(d, cx=190, cy=1210)
    lignes(d, [("3x × 2x", 130, BLEU), ("= 6x ?", 110, ROUGE), ("non : 6x²", 100, VERT)])


def _s(classe, k, dossier, titre, sous, acc, taille=96):
    return f"eleveai-maths-{classe}-expression-{k}-short", {
        "badge": f"MATHS · {classe.upper()}", "titre": titre, "taille": taille,
        "sous": sous, "taille_sous": 44, "couleur_sous": ORANGE, "accroche": acc,
        "dossier": f"{classe}/maths/fr", "sortie": f"{classe}/maths/expression-litterale/{dossier}",
    }


SHORTS = dict([
    _s("4e", "comprendre", "01-comprendre", ["COMBIEN DE", "TERMES ?"], "le signe reste collé à son terme", acc_comprendre_4e),
    _s("4e", "traduire", "02-traduire", ["LE DOUBLE", "DE LA SOMME"], "ou la somme du double ?", acc_traduire_4e),
    _s("4e", "substituer", "03-substituer", ["MOINS 3", "AU CARRÉ"], "9 ou −9 ? le piège des parenthèses", acc_substituer_4e),
    _s("4e", "reduire", "04-reduire", ["FOIS", "OU PLUS ?"], "3x × 2x n'est pas 6x", acc_reduire_4e),
])


def _acc(lignes_):
    def f(d):
        badge_ceinture(d)
        lignes(d, lignes_)
    return f


def _s5(k, dossier, titre, sous, lignes_, taille=96):
    """Les 7 shorts de 5e (rendus le 09/10, nom « litteral-calcul »)."""
    return f"eleveai-maths-5e-litteral-calcul-short-{k}", {
        "badge": "MATHS · 5E", "titre": titre, "taille": taille, "sous": sous, "taille_sous": 44,
        "couleur_sous": ORANGE, "accroche": _acc(lignes_), "dossier": "5e/maths/fr",
        "sortie": f"5e/maths/expression-litterale/{dossier}",
    }


SHORTS.update(dict([
    _s5("comprendre", "01-comprendre", ["SI x = 2,", "3x = ?"], "le piège des chiffres collés", [("3x = 32 ?", 120, ROUGE), ("non : 3 × 2 = 6", 90, VERT)]),
    _s5("traduire", "02-traduire", ["LE TRIPLE DE n", "DIMINUÉ DE 4"], "comment l'écrire ?", [("3(n − 4) ?", 110, ROUGE), ("non : 3n − 4", 100, VERT)], 84),
    _s5("substituer", "03-substituer", ["x = −2 :", "5 − 3x = ?"], "attention au négatif", [("−1 ?", 120, ROUGE), ("non : 11", 110, VERT)]),
    _s5("reduire", "04-reduire", ["2x + 3 + 4x + 1", "= 10x ?"], "les x avec les x", [("10x ?", 120, ROUGE), ("non : 6x + 4", 100, VERT)], 76),
    _s5("tester", "05-tester", ["x + x = x × x", "TOUJOURS ?"], "un exemple ne suffit pas", [("x = 2 : 4 = 4", 90, VERT), ("x = 3 : 6 ≠ 9", 90, ROUGE)], 84),
    _s5("developper", "06-developper", ["5(x − 2)", "= 5x − 2 ?"], "le 2 aussi est multiplié", [("5x − 2 ?", 110, ROUGE), ("non : 5x − 10", 100, VERT)]),
    _s5("defi", "07-defi", ["LE PÉRIMÈTRE", "DU RECTANGLE"], "réponds en commentaire !", [("x + 3 + x ?", 100, ROUGE), ("il manque 2 côtés !", 70, ORANGE)], 84),
    _s("3e", "comprendre", "01-comprendre", ["TOUJOURS UN", "MULTIPLE DE 3 ?"], "trois nombres qui se suivent", _acc([("4 + 5 + 6", 130, BLEU), ("= 15 = 3 × 5", 96, VERT), ("et toujours ?", 70, ORANGE)]), 84),
    _s("3e", "substituer", "02-substituer", ["FREINER", "À 100 KM/H"], "deux fois plus vite…", _acc([("50 km/h : 25 m", 90, BLEU), ("100 km/h : 100 m", 90, ROUGE), ("× 4 !", 110, VERT)])),
    _s("3e", "reduire", "03-reduire", ["LE PIÈGE", "DU MOINS"], "devant une parenthèse", _acc([("5x − (2x − 3)", 96, BLEU), ("= 3x − 3 ?", 100, ROUGE), ("non : 3x + 3", 90, VERT)])),
    _s("3e", "developper", "04-developper", ["COMBIEN DE", "MORCEAUX ?"], "la double distributivité", _acc([("(x + 2)(x + 3)", 96, BLEU), ("4 produits", 90, ORANGE), ("x² + 5x + 6", 100, VERT)])),
    _s("3e", "factoriser", "05-factoriser", ["RANGER", "EN RANGÉES"], "factoriser, c'est ça", _acc([("3x + 12", 130, BLEU), ("= 3(x + 4)", 110, VERT), ("le facteur commun", 70, ORANGE)])),
    _s("3e", "identites", "06-identites", ["LE CARRÉ", "OUBLIÉ"], "les deux rectangles oubliés", _acc([("(x + 3)²", 130, BLEU), ("= x² + 9 ?", 100, ROUGE), ("il manque 6x !", 90, VERT)])),
]))


def acc_annonce_probabilites_short(d):
    """⭐ 14/10/2026 : short de la bande-annonce « Probabilités ». Titre choisi par
    Frédéric : « Probabilités : quelle classe en premier ? Donne ton avis ! » →
    la miniature montre le QUESTIONNAIRE : les classes avec leur case à cocher."""
    colonnes = [("école", ["CM1", "CM2"]), ("collège", ["6e", "5e", "4e", "3e"]),
                ("lycée", ["2de", "1re", "Tle"])]
    f_tete, f_cl = police("arialbd.ttf", 40), police("ariblk.ttf", 58)
    for k, (tete, classes) in enumerate(colonnes):
        x = 120 + k * 315
        d.text((x, 655), tete, font=f_tete, fill=ORANGE)
        for i, cl in enumerate(classes):
            y = 720 + i * 92
            d.rounded_rectangle([x, y + 8, x + 58, y + 66], radius=10, outline=NAVY, width=6,
                                fill=(255, 255, 255))
            d.text((x + 80, y), cl, font=f_cl, fill=BLEU)
    # le dé, petit, en haut à droite de la liste
    x, y, c = 880, 990, 120
    d.rounded_rectangle([x, y, x + c, y + c], radius=24, fill=(255, 255, 255), outline=NAVY, width=6)
    for px, py in [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]:
        cx, cy = x + c / 2 + px * c * 0.27, y + c / 2 + py * c * 0.27
        d.ellipse([cx - 11, cy - 11, cx + 11, cy + 11], fill=NAVY)
    badge_ceinture(d)


# 14/10/2026 — la BANDE-ANNONCE « Probabilités, de l'école à la terminale ».
SHORTS["eleveai-annonce-probabilites-short"] = {
    "badge": "PROBABILITÉS · CM1 → TLE", "titre": ["QUELLE CLASSE", "EN PREMIER ?"], "taille": 96,
    "sous": "donne ton avis en commentaire !", "taille_sous": 44, "couleur_sous": ORANGE,
    "accroche": acc_annonce_probabilites_short,
    "dossier": "annonce/fr", "sortie": "annonce/probabilites",
}

# 15/10/2026 — PROBABILITÉS 3e : les 8 shorts jumeaux.
SHORTS["eleveai-maths-3e-proba-vocabulaire-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['GAGNER AU', 'LOTO ?'], "taille": 92, "sous": "impossible… ou peu probable ?", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("le loto", 90, BLEU), ("tout près de 0", 80, ORANGE), ("mais pas 0 !", 90, VERT)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/01-vocabulaire",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-vocabulaire-short"] = "blanche"
SHORTS["eleveai-maths-3e-proba-issue-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['LE CHAPEAU', 'À LETTRES'], "taille": 92, "sous": "combien de résultats ?", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("B A N A N E", 100, BLEU), ("6 étiquettes", 80, ORANGE), ("4 issues !", 100, VERT)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/02-issues",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-issue-short"] = "blanche"
SHORTS["eleveai-maths-3e-proba-equiprobabilite-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['TU PARIES', 'SUR QUOI ?'], "taille": 92, "sous": "la roue de la kermesse", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("4 couleurs", 100, BLEU), ("= 1/4 chacune ?", 90, ROUGE), ("rouge : 1/2 !", 100, VERT)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/03-equiprobabilite",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-equiprobabilite-short"] = "jaune"
SHORTS["eleveai-maths-3e-proba-evenement-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['PLUS DE 4', 'OU AU MOINS 4 ?'], "taille": 92, "sous": "un seul mot change tout", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("plus de 4 :", 90, BLEU), ("5 et 6", 100, VERT), ("au moins 4 : 4, 5, 6", 70, ORANGE)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/04-evenements",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-evenement-short"] = "blanche"
SHORTS["eleveai-maths-3e-proba-calculer-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['1 CHANCE', 'SUR 3 ?'], "taille": 92, "sous": "le paquet de bonbons", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("3 parfums", 100, BLEU), ("= 1/3 ?", 100, ROUGE), ("non : 5/12", 100, VERT)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/05-calculer",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-calculer-short"] = "jaune"
SHORTS["eleveai-maths-3e-proba-contraire-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['PLUIE', 'OU SEC ?'], "taille": 92, "sous": "70 % de pluie demain…", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("70 % de pluie", 90, BLEU), ("et sec ?", 100, ORANGE), ("30 %", 130, VERT)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/06-contraire",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-contraire-short"] = "jaune"
SHORTS["eleveai-maths-3e-proba-deux-epreuves-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['DEUX FOIS', 'PILE ?'], "taille": 92, "sous": "1 chance sur 2… vraiment ?", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("pile, pile", 100, BLEU), ("= 1/2 ?", 100, ROUGE), ("non : 1/4", 110, VERT)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/07-deux-epreuves",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-deux-epreuves-short"] = "jaune"
SHORTS["eleveai-maths-3e-proba-defi-short"] = {
    "badge": "PROBABILITÉS · 3E", "titre": ['BOÎTE A', 'OU BOÎTE B ?'], "taille": 92, "sous": "tu veux un bonbon blanc", "taille_sous": 44,
    "couleur_sous": ORANGE, "accroche": _acc([("A : 7/13", 100, BLEU), ("B : 3/4", 100, BLEU), ("B gagne !", 100, VERT)]), "dossier": "3e/maths/fr",
    "sortie": "3e/maths/probabilites/08-defis",
}
CEINTURE_SHORT["eleveai-maths-3e-proba-defi-short"] = "jaune"

# 15/10/2026 — PROBABILITÉS 4e : les 13 shorts jumeaux (blanche si tout se voit, jaune dès un calcul).
_PROBA_4E = [
    ("01-vocabulaire", "vocabulaire", "blanche", ['HASARD', 'OU PAS ?'], "tu as 3 secondes",
     [("pièce : hasard", 80, BLEU), ("soleil : pas hasard", 70, ORANGE), ("et ton contrôle ?", 76, VERT)]),
    ("02-issue", "issue", "blanche", ['LE TIROIR', 'MYSTÈRE'], "5 noires, 1 rouge",
     [("6 chaussettes", 90, BLEU), ("= 6 issues ?", 90, ROUGE), ("non : 2 !", 110, VERT)]),
    ("03-evenement", "evenement", "blanche", ['LE CONTRAIRE', 'DE 6 ?'], "au dé",
     [("contraire de 6", 86, BLEU), ("= 1 ?", 110, ROUGE), ("1, 2, 3, 4, 5 !", 86, VERT)]),
    ("04-equiprobabilite", "equiprobabilite", "blanche", ['POINTE', 'EN HAUT ?'], "1 chance sur 2… vraiment ?",
     [("la punaise", 100, BLEU), ("= 1/2 ?", 110, ROUGE), ("non !", 120, VERT)]),
    ("05-calculer-fraction", "calculer-fraction", "jaune", ['3 BLEUS,', '1 ROUGE'], "1 chance sur 3 ?",
     [("1 rouge", 100, BLEU), ("= 1/3 ?", 110, ROUGE), ("non : 1/4", 110, VERT)]),
    ("06-convertir", "convertir", "jaune", ['1 SUR 4', '= 4 % ?'], "un quart en pourcentage",
     [("1 ÷ 4 = 0,25", 90, BLEU), ("× 100", 100, ORANGE), ("25 % !", 120, VERT)]),
    ("07-comparer", "comparer", "jaune", ['QUELLE', 'TOMBOLA ?'], "5 gagnants ou 1 seul ?",
     [("A : 5/20", 100, BLEU), ("B : 1/3", 100, BLEU), ("B gagne !", 100, VERT)]),
    ("08-defi", "defi", "jaune", ['SUR QUOI', 'TU PARIES ?'], "la roue de 1 à 10",
     [("pair : 5/10", 96, BLEU), ("plus de 6 : 4/10", 80, ORANGE), ("pair gagne !", 96, VERT)]),
    ("09-frequence-calculer", "frequence-calculer", "jaune", ['LE', 'BOUCHON'], "30 fois sur 50",
     [("30/50", 110, BLEU), ("30 ÷ 50 = 0,6", 90, ORANGE), ("60 % !", 120, VERT)]),
    ("10-frequence-comparer", "frequence-comparer", "jaune", ['5 PILES', 'SUR 10 ?'], "c'est sûr ?",
     [("1/2 = 50 %", 96, BLEU), ("10 lancers…", 90, ORANGE), ("7 piles !", 110, VERT)]),
    ("11-frequence-repeter", "frequence-repeter", "blanche", ['600', 'LANCERS !'], "regarde les barres",
     [("10 lancers : désordre", 70, ORANGE), ("600 lancers :", 90, BLEU), ("≈ 100 chacune", 90, VERT)]),
    ("12-frequence-echantillon", "frequence-echantillon", "jaune", ['MON DÉ', 'EST TRUQUÉ ?'], "3 six sur 5 lancers",
     [("3 six sur 5", 100, BLEU), ("truqué ?", 100, ROUGE), ("trop peu !", 110, VERT)]),
    ("13-frequence-defi", "frequence-defi", "jaune", ['LA', 'PUNAISE'], "620 fois sur 1 000",
     [("620/1 000", 100, BLEU), ("sur 100 lancers ?", 80, ORANGE), ("≈ 62 fois", 110, VERT)]),
]
for _dos, _ep, _c, _titre, _sous, _acc4 in _PROBA_4E:
    _nom = f"eleveai-maths-4e-proba-{_ep}-short"
    SHORTS[_nom] = {
        "badge": "PROBABILITÉS · 4E", "titre": _titre, "taille": 92, "sous": _sous, "taille_sous": 44,
        "couleur_sous": ORANGE, "accroche": _acc(_acc4), "dossier": "4e/maths/fr",
        "sortie": f"4e/maths/probabilites/{_dos}",
    }
    CEINTURE_SHORT[_nom] = _c

# 17/10/2026 — TEST YouTube PROBABILITÉS : les 10 shorts (CM1, CM2 blanche ; 2de jaune ;
# 1re spé et Tle spé orange). (classe, badge, sortie, nom, ceinture, titre, sous, lignes)
_PROBA_TEST = [
    ("cm1", "CM1", "cm1/maths/probabilites/01-vocabulaire", "vocabulaire", "blanche", ["LES YEUX", "FERMÉS"],
     "quelle bille vas-tu tirer ?", [("3 rouges : rouge ?", 84, BLEU), ("certain !", 110, VERT), ("verte ? impossible", 80, ROUGE)]),
    ("cm1", "CM1", "cm1/maths/probabilites/02-hasard", "hasard", "blanche", ["6… 6…", "6 !"],
     "et le prochain lancer ?", [("trois 6 de suite", 90, BLEU), ("encore 6 ?", 100, ROUGE), ("le dé oublie tout !", 76, VERT)]),
    ("cm2", "CM2", "cm2/maths/probabilites/01-vocabulaire", "vocabulaire", "blanche", ["FAIRE 6", "POUR REJOUER"],
     "tu as combien de chances ?", [("6 : 1 chance sur 6", 80, BLEU), ("pair : 3 sur 6", 90, ORANGE), ("3 fois plus !", 100, VERT)]),
    ("cm2", "CM2", "cm2/maths/probabilites/02-hasard", "hasard", "blanche", ["10 PILES", "DE SUITE"],
     "tu paries sur quoi ?", [("pile × 10", 110, BLEU), ("face, plus sûr ?", 90, ROUGE), ("toujours 1 sur 2 !", 80, VERT)]),
    ("seconde", "2DE", "seconde/maths/probabilites/01-vocabulaire", "vocabulaire", "jaune", ["7 OU 12 :", "TU PARIES ?"],
     "deux dés, on additionne", [("12 : 6 + 6", 100, BLEU), ("1 seule façon", 84, ROUGE), ("7 : 6 façons !", 100, VERT)]),
    ("seconde", "2DE", "seconde/maths/probabilites/02-loi-de-probabilite", "modele", "jaune", ["LE DÉ", "TRUQUÉ"],
     "le 6 sort 2 fois plus : 1 chance sur 6 ?", [("5p + 2p = 1", 100, BLEU), ("p = 1/7", 100, ORANGE), ("le 6 : 2/7 !", 100, VERT)]),
    ("premiere", "1RE SPÉ", "premiere/maths/probabilites/01-conditionnelle", "conditionnelle", "orange", ["90 % DES", "FOOTBALLEURS…"],
     "…donc 90 % des garçons jouent au foot ?", [("90 % des foot", 90, BLEU), ("≠ 90 % des garçons", 76, ROUGE), ("parmi QUI ?", 100, VERT)], 84),
    ("premiere", "1RE SPÉ", "premiere/maths/probabilites/02-parmi-sachant", "registres", "orange", ["LE CAR", "EN RETARD"],
     "60 % des retards sous la pluie…", [("retards : 60 % pluie", 74, BLEU), ("pluie : 30 % retard", 74, ORANGE), ("pas pareil !", 100, VERT)]),
    ("terminale", "TLE SPÉ", "terminale/maths/probabilites/01-arbre-pondere", "arbre", "orange", ["LE GARDIEN", "DE BUT"],
     "il arrête 25 % des tirs ?", [("(30 % + 20 %) ÷ 2 ?", 72, ROUGE), ("0,6×0,3 + 0,4×0,2", 72, BLEU), ("= 0,26 !", 110, VERT)]),
    ("terminale", "TLE SPÉ", "terminale/maths/probabilites/02-formule-et-inversion", "formule", "orange", ["TEST", "POSITIF"],
     "le test de la dengue", [("test fiable à 95 %", 80, BLEU), ("malade à 95 % ?", 90, ROUGE), ("non : ≈ 33 % !", 100, VERT)]),
]
for _t in _PROBA_TEST:
    _cl, _bd, _sortie, _ep, _c, _titre, _sous, _lg = _t[:8]
    _nom = f"eleveai-maths-{_cl}-proba-{_ep}-short"
    SHORTS[_nom] = {
        "badge": f"PROBABILITÉS · {_bd}", "titre": _titre, "taille": _t[8] if len(_t) > 8 else 92, "sous": _sous,
        "taille_sous": 44, "couleur_sous": ORANGE, "accroche": _acc(_lg), "dossier": f"{_cl}/maths/fr", "sortie": _sortie,
    }
    CEINTURE_SHORT[_nom] = _c

# 17/10/2026 — même TEST, suite : STMG et 1re tronc commun (jaune), écologie / business.
_PROBA_TEST_2 = [
    ("stmg", "STMG", "stmg/maths/probabilites/01-reconnaitre", "reconnaitre", "jaune", ["80 % DES", "BIEN TRIÉS…"],
     "…donc 80 % du plastique est bien trié ?", [("bien triés : 80 % plastique", 64, BLEU), ("plastique : 40 % trié ?", 72, ORANGE), ("parmi QUI ?", 100, VERT)], 88),
    ("stmg", "STMG", "stmg/maths/probabilites/02-notation", "notation", "jaune", ["60 %", "REVIENNENT…"],
     "…parmi ceux qui ont laissé un avis", [("parmi les avis", 90, BLEU), ("A en indice", 96, ORANGE), ("R sachant A = 0,6", 80, VERT)], 88),
    ("premiere-commun", "1RE", "premiere-commun/maths/probabilites/01-entre-0-et-1", "encadrement", "jaune", ["120 %", "RENTABLE !"],
     "le panneau solaire… tu signes ?", [("120 % ?", 120, ROUGE), ("max : 100 %", 100, BLEU), ("du marketing !", 96, VERT)]),
    ("premiere-commun", "1RE", "premiere-commun/maths/probabilites/02-contraire", "contraire", "jaune", ["30 %", "DE PLUIE"],
     "donc 70 % de beau temps ?", [("70 % : pas de pluie", 80, BLEU), ("≠ beau temps", 96, ROUGE), ("nuageux ?", 110, VERT)]),
]
for _t in _PROBA_TEST_2:
    _cl, _bd, _sortie, _ep, _c, _titre, _sous, _lg = _t[:8]
    _nom = f"eleveai-maths-{_cl}-proba-{_ep}-short"
    SHORTS[_nom] = {
        "badge": f"PROBABILITÉS · {_bd}", "titre": _titre, "taille": _t[8] if len(_t) > 8 else 92, "sous": _sous,
        "taille_sous": 44, "couleur_sous": ORANGE, "accroche": _acc(_lg), "dossier": f"{_cl}/maths/fr", "sortie": _sortie,
    }
    CEINTURE_SHORT[_nom] = _c


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
        _COURANTE[0] = CEINTURE_SHORT.get(nom, "blanche")
        construire(nom, spec)
        source = RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png"
        cible = RACINE / "manim" / "sorties" / spec["sortie"] / f"{nom}.png"
        shutil.copy(source, cible)
        print(cible)


if __name__ == "__main__":
    main()
