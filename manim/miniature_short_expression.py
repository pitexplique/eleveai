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
