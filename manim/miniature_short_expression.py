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
