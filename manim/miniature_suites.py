# miniature_suites.py
# LES MINIATURES de la série SUITES du lycée (11/11/2026) : 38 épisodes, paysage + short Manim.
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures ;
#   · short : l'accroche en gros, 2 lignes de titre, l'échelle avec la ceinture DU SHORT.
# Copie adaptée de `miniature_distributivite.py`. Rangées À CÔTÉ DE LEUR VIDÉO :
# manim/sorties/<classe>/maths/suites/<NN-slug>/. La durée « EN N MIN » est lue dans le mp4 :
# relancer après un re-rendu. On ajoute les épisodes au fil de la passe finale.
#
# Usage : python manim/miniature_suites.py [filtre]

import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_essai_v2 import construire as construire_paysage
from miniature_puissances import minutes
from miniature_short import ORANGE, W, construire as construire_short
from miniature_short_expression import echelle

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
BADGE = {"premiere": "1RE", "premiere-spe": "1RE SPÉ", "terminale": "TLE"}

# classe, dossier, ceinture paysage, titre paysage, maths du haut, ligne du bas (« = » ou « + » : en vert,
# sinon en rouge), ceinture short, titre short, sous-titre short, lignes short (texte, taille, couleur)
EP = [
    ("premiere", "01-arith-reconnaitre", "verte",
     ["COMPRENDRE LES SUITES", "ARITHMÉTIQUES"], "40 ; 70 ; 100 ; 130", "+ toujours + 30 : la raison",
     "blanche", ["LE MÊME PAS", "EN 3 SECONDES ?"], "le marathon d'Inès",
     [("10 ; 13 ; 16 ; 19", 120, BLEU), ("+ 3 à chaque fois", 100, VERT)]),
    ("premiere", "02-arith-recurrence", "verte",
     ["COMPRENDRE LA RELATION", "DE RÉCURRENCE"], "u_{n+1} = u_{n} + 300", "pas u_{n} = u_{n+1} + 300 !",
     "blanche", ["REMONTER", "LE TEMPS ?"], "le food truck : + 35 par semaine",
     [("u_{10} = 600", 130, BLEU), ("u_{9} = ?", 130, ROUGE)]),
    ("premiere", "03-arith-notation", "verte",
     ["COMPRENDRE LA NOTATION", "DES SUITES"], "u(n) = u_{n}", "u_{n} n'est pas u × n !",
     "blanche", ["LE PIÈGE", "DE L'ANNÉE"], "on compte les années depuis 2025",
     [("2031 → u_{2031} ?", 115, ROUGE), ("non : u_{6}", 130, VERT)]),
    ("premiere", "04-arith-terme-rang", "verte",
     ["COMPRENDRE COMMENT CALCULER", "UN TERME LOINTAIN"], "u_{20} = 8 + 19 × 4", "= 84 : 19 pas, pas 20",
     "blanche", ["UN PAS", "DE TROP ?"], "de la semaine 1 à la semaine 10",
     [("u_{10} = 20 + 10 × 5 ?", 100, ROUGE), ("9 pas : 20 + 9 × 5", 100, VERT)]),
    ("premiere", "05-arith-explicite", "verte",
     ["COMPRENDRE LA", "FORMULE EXPLICITE"], "u_{n} = 300 + 45n", "= 1 200 : n = 20 mois",
     "blanche", ["LA FORMULE", "EN 10 S ?"], "la trottinette : 120 km + 15 km par jour",
     [("u_{n} = ?", 130, ROUGE), ("120 + 15n", 130, VERT)]),
    ("premiere", "06-arith-variation", "verte",
     ["COMPRENDRE LE SENS", "DE VARIATION"], "r = −25", "+ r < 0 : décroissante",
     "blanche", ["MONTE OU", "DESCEND ?"], "sans rien calculer",
     [("62 ; 61,5 ; 61", 120, BLEU), ("r = −0,5", 130, ROUGE)]),
    ("premiere", "07-arith-graphique", "verte",
     ["COMPRENDRE UNE SUITE", "SUR UN GRAPHIQUE"], "(n ; u_{n}) alignés", "+ arithmétique : une droite",
     "blanche", ["AU PREMIER", "COUP D'ŒIL ?"], "les épisodes de Lina, + 3 par semaine",
     [("(0 ; 4) (1 ; 7) (2 ; 10)", 100, BLEU), ("points alignés", 110, VERT)]),
    ("premiere", "08-arith-interpreter", "verte",
     ["COMPRENDRE CE QUE", "DIT UNE SUITE"], "400 + 150n ≥ 3 000", "+ n = 18 semaines",
     "blanche", ["LA BONNE", "ANNÉE ?"], "l'indice 0, c'est 2026",
     [("u_{9} → 2036 ?", 120, ROUGE), ("non : 2035", 130, VERT)]),
    ("premiere", "09-geo-reconnaitre", "verte",
     ["COMPRENDRE LES SUITES", "GÉOMÉTRIQUES"], "500 ; 1 000 ; 2 000", "+ toujours × 2 : la raison",
     "blanche", ["× LE MÊME", "NOMBRE ?"], "la photo agrandie",
     [("8 ; 12 ; 18 ; 27", 120, BLEU), ("× 1,5 à chaque fois", 100, VERT)]),
    ("premiere", "10-geo-recurrence", "verte",
     ["COMPRENDRE LA RÉCURRENCE", "GÉOMÉTRIQUE"], "u_{n+1} = 1,2 × u_{n}", "pas u_{n} + 20 !",
     "blanche", ["LA BONNE", "RELATION ?"], "1 024 joueurs, la moitié éliminée",
     [("1 024 ; 512 ; 256", 115, BLEU), ("u_{n+1} = 0,5 × u_{n}", 100, VERT)]),
    ("premiere", "11-geo-taux", "verte",
     ["COMPRENDRE LA RAISON", "D'UN POURCENTAGE"], "− 30 % = × 0,7", "deux fois : pas − 60 % !",
     "blanche", ["− 20 %, C'EST", "× COMBIEN ?"], "le smartphone qui perd de la valeur",
     [("− 20 %", 140, ROUGE), ("= × 0,8", 140, VERT)]),
    ("premiere", "12-geo-terme-rang", "verte",
     ["COMPRENDRE COMMENT CALCULER", "UN TERME LOINTAIN"], "u_{12} = 2 000 × 1,1^{12}", "+ ≈ 6 277 abonnés",
     "blanche", ["10 PLIAGES :", "PLUS DE 10 CM ?"], "une feuille de 0,1 mm",
     [("0,1 × 2^{10}", 130, BLEU), ("= 102,4 mm", 130, VERT)]),
    ("premiere", "13-geo-explicite", "verte",
     ["COMPRENDRE LA FORMULE", "EXPLICITE (GÉOMÉTRIQUE)"], "u_{n} = 20 000 × 0,8^{n}", "+ u_{3} = 10 240 € dans 3 ans",
     "blanche", ["LA FORMULE", "EN 5 S ?"], "les nénuphars doublent chaque jour",
     [("u_{n} = 3 × 2^{n}", 130, BLEU), ("u_{0} = 3 et q = 2", 110, VERT)]),
    ("premiere", "14-geo-variation", "verte",
     ["COMPRENDRE LE SENS DE", "VARIATION (GÉOMÉTRIQUE)"], "q = 1,05 > 1", "+ croissante : on compare q à 1",
     "blanche", ["MONTE OU", "DESCEND ?"], "un médicament : − 25 % par heure",
     [("× 0,75", 140, BLEU), ("0,75 < 1 : ça baisse", 100, VERT)]),
    ("premiere", "15-geo-graphique", "verte",
     ["COMPRENDRE UNE SUITE GÉO.", "SUR UN GRAPHIQUE"], "100 ; 200 ; 400 ; 800", "+ la courbe se creuse",
     "blanche", ["RIEN QU'À", "SON DESSIN ?"], "les monstres triplent à chaque vague",
     [("2 ; 6 ; 18 ; 54", 120, BLEU), ("× 3 : ça se creuse", 100, VERT)]),
]


import re

# Arial Black n'a pas les indices Unicode (ₙ₊₁) : on écrit « u_{n+1} » et « q^{n} », dessinés
# plus petits, abaissés (indice) ou montés (exposant), dans la couleur de la ligne.
JETON = re.compile(r"([_^])\{([^}]*)\}")


def morceaux(txt):
    out, i = [], 0
    for m in JETON.finditer(txt):
        if m.start() > i:
            out.append((txt[i:m.start()], ""))
        out.append((m.group(2), m.group(1)))
        i = m.end()
    if i < len(txt):
        out.append((txt[i:], ""))
    return out


def largeur(d, txt, t):
    f, fe = police("ariblk.ttf", t), police("ariblk.ttf", int(t * 0.6))
    return sum(d.textlength(s, font=fe if e else f) + (int(t * 0.04) if e else 0) for s, e in morceaux(txt))


def ecrire(d, x, y, txt, t, c):
    f, fe = police("ariblk.ttf", t), police("ariblk.ttf", int(t * 0.6))
    for s, e in morceaux(txt):
        if e:
            x += int(t * 0.02)
            d.text((x, y + (int(t * 0.5) if e == "_" else -int(t * 0.12))), s, font=fe, fill=c)
            x += d.textlength(s, font=fe) + int(t * 0.02)
        else:
            d.text((x, y), s, font=f, fill=c)
            x += d.textlength(s, font=f)


def ajuste(d, txt, t, lmax):
    while t > 30 and largeur(d, txt, t) > lmax:
        t -= 2
    return t


def acc_paysage(haut, bas, ceinture, y0):
    """Comme `miniature_puissances.acc_paysage`, avec nos indices."""
    def f(d):
        lmax = 860
        th = ajuste(d, haut, 92, lmax)
        vert = bas.startswith(("=", "+ "))
        texte = bas[2:] if bas.startswith("+ ") else bas
        tb = ajuste(d, texte, 58, lmax)
        ecrire(d, 56, y0, haut, th, BLEU)
        ecrire(d, 60, y0 + th + 40, texte, tb, VERT if vert else ROUGE)
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


def acc_short(lignes, ceinture):
    """Centrée sur la largeur du SHORT : le W de `miniature.py` est celui de la paysage (1280)."""
    def f(d):
        echelle(d, W // 2, 1190, ceinture, s=0.8)
        for i, (txt, t, c) in enumerate(lignes):
            t = ajuste(d, txt, t, W - 110)
            ecrire(d, (W - largeur(d, txt, t)) / 2, 700 + i * 205, txt, t, c)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for classe, rep, ceinture, tit, haut, bas, sc, ts, sous, ls in EP:
        slug = rep[3:]
        rel = f"{classe}/maths/suites/{rep}"
        serie = SORTIES / rel
        nom = f"eleveai-maths-{classe}-suite-{slug}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": f"MATHS · {BADGE[classe]}", "duree": f"EN {minutes(serie / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": rel,
            })
        nom += "-short"
        if filtre not in nom:
            continue
        ft = police("ariblk.ttf", 96)
        for t in ts:
            if sonde.textlength(t, font=ft) > W - 80:
                print("⛔ DÉBORDE", t)
        spec = {"badge": f"SUITES · {BADGE[classe]}", "titre": ts, "taille": 96, "sous": sous, "taille_sous": 44,
                "couleur_sous": ORANGE, "accroche": acc_short(ls, sc), "dossier": f"{classe}/maths/fr"}
        construire_short(nom, spec)
        shutil.copy(RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png", serie / f"{nom}.png")


if __name__ == "__main__":
    main()
