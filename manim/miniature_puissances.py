# miniature_puissances.py
# LES MINIATURES de la série PUISSANCES (05/11/2026), 33 vidéos, 13 épisodes.
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN » (machinerie de
#     `miniature_essai_v2.py`), la maths en gros, l'échelle des ceintures ;
#   · short : le piège en gros, 2 lignes de titre, échelle des ceintures blanche
#     (machinerie de `miniature_short.py` et `miniature_short_expression.py`).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/<classe>/maths/puissances/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Mini-notation des maths : « 2^3 » pose un vrai exposant, jusqu'à l'espace ou la
# parenthèse suivante (« 10^−3 », « a^m+n », « (2^3)^2 »).
#
# Usage : python manim/miniature_puissances.py [filtre]

import re
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, ROUGE, VERT, W, police
from miniature_essai_v2 import construire as construire_paysage
from miniature_short import ORANGE, construire as construire_short
from miniature_short_expression import echelle

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
ORANGE_EXP = (234, 88, 12)
JETON = re.compile(r"\^([^\s)]+)")


def morceaux(txt):
    """« 2^3 × 2 » → [("2", False), ("3", True), (" × 2", False)]."""
    out, i = [], 0
    for m in JETON.finditer(txt):
        if m.start() > i:
            out.append((txt[i:m.start()], False))
        out.append((m.group(1), True))
        i = m.end()
    if i < len(txt):
        out.append((txt[i:], False))
    return out


def largeur(d, txt, t):
    f, fe = police("ariblk.ttf", t), police("ariblk.ttf", int(t * 0.58))
    return sum(d.textlength(s, font=fe if e else f) + (int(t * 0.03) if e else 0) for s, e in morceaux(txt))


def ecrire(d, x, y, txt, t, c):
    """Une ligne de maths, exposants orange, posée à gauche en x."""
    f, fe = police("ariblk.ttf", t), police("ariblk.ttf", int(t * 0.58))
    for s, e in morceaux(txt):
        if e:
            x += int(t * 0.03)
            d.text((x, y - int(t * 0.14)), s, font=fe, fill=ORANGE_EXP if c != ROUGE else ROUGE)
            x += d.textlength(s, font=fe)
        else:
            d.text((x, y), s, font=f, fill=c)
            x += d.textlength(s, font=f)


def ajuste(d, txt, t, lmax):
    while t > 30 and largeur(d, txt, t) > lmax:
        t -= 2
    return t


def acc_paysage(haut, bas, ceinture, y0):
    def f(d):
        lmax = 900
        th = ajuste(d, haut, 92, lmax)
        # « + texte » : une autre règle, en vert, sans signe devant (pas un « = » : ce serait faux).
        vert = bas.startswith(("=", "+ "))
        texte = bas[2:] if bas.startswith("+ ") else bas
        tb = ajuste(d, texte, 58, lmax)
        ecrire(d, 56, y0, haut, th, BLEU)
        ecrire(d, 60, y0 + th + 26, texte, tb, VERT if vert else ROUGE)
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


def acc_short(lignes):
    def f(d):
        echelle(d, W // 2, 1190, "blanche", s=0.8)
        for i, (txt, t, c) in enumerate(lignes):
            t = ajuste(d, txt, t, W - 110)
            ecrire(d, (W - largeur(d, txt, t)) / 2, 700 + i * 205, txt, t, c)
    return f


# ép., slug, [(classe, nom de badge, ceinture)], titre paysage, haut, bas, dossier du short,
# titre short, sous-titre short, lignes short
EP = [
    (1, "comprendre", [("4e", "4E", "blanche"), ("3e", "3E", "blanche")],
     ["COMPRENDRE", "LES PUISSANCES"], "3^4 = 3 × 3 × 3 × 3", "pas 3 × 4 !",
     "4e", ["PLIE UNE", "FEUILLE"], "combien de couches au bout de 5 pliages ?",
     [("2^5 = 10 ?", 130, ROUGE), ("non : 2^5 = 32", 120, VERT)]),
    (2, "calculer", [("4e", "4E", "jaune"), ("3e", "3E", "jaune")],
     ["CALCULER", "UNE PUISSANCE"], "(−2)^4 = 16", "mais −2^4 = −16 !",
     "4e", ["CALCULATRICE", "CASSÉE ?"], "elle dit moins 16, elle a raison ?",
     [("−2^4 = −16", 130, ROUGE), ("(−2)^4 = 16", 130, VERT)]),
    (3, "dix", [("4e", "4E", "jaune"), ("3e", "3E", "jaune")],
     ["COMPRENDRE LES", "PUISSANCES DE 10"], "10^6 = 1 000 000", "l'exposant compte les zéros",
     "4e", ["UN MILLIARD", "DE VUES"], "combien de zéros ?",
     [("1 000 000 000", 110, NAVY), ("10^9", 170, BLEU)]),
    (4, "zero-negatif", [("4e", "4E", "orange"), ("seconde", "SECONDE", "jaune")],
     ["PUISSANCE ZÉRO ET", "EXPOSANT NÉGATIF"], "10^0 = 1", "+ 10^−3 = 0,001, pas −1 000",
     "4e", ["2026", "PUISSANCE 0 ?"], "ça fait combien ? un indice : pas 0",
     [("2026^0 = 0 ?", 130, ROUGE), ("non : 2026^0 = 1", 110, VERT)]),
    (5, "notation-scientifique", [("4e", "4E", "verte"), ("3e", "3E", "jaune"), ("seconde", "SECONDE", "jaune")],
     ["COMPRENDRE LA NOTATION", "SCIENTIFIQUE"], "8 × 10^9", "+ 7 × 10^−6 pour un globule rouge",
     "4e", ["8 MILLIARDS", "D'HUMAINS"], "sans aligner les zéros",
     [("8 000 000 000", 110, NAVY), ("8 × 10^9", 150, BLEU)]),
    (6, "comparer", [("4e", "4E", "verte")],
     ["COMPARER EN NOTATION", "SCIENTIFIQUE"], "9 × 10^5 < 2 × 10^6", "l'exposant décide d'abord !",
     "4e", ["QUI GAGNE ?", "9 OU 2 ?"], "pas celui que tu crois",
     [("9 × 10^5", 120, ROUGE), ("2 × 10^6", 120, VERT)]),
    (7, "calcul", [("4e", "4E", "verte"), ("3e", "3E", "verte")],
     ["CALCULER AVEC LES", "PUISSANCES DE 10"], "10^2 × 10^4 = 10^6", "pas 10^8 !",
     "4e", ["LE JEU", "DES ZÉROS"], "on additionne ou on multiplie ?",
     [("10^2 × 10^4 = 10^8 ?", 100, ROUGE), ("Perdu : 10^6", 120, VERT)]),
    (8, "produit-quotient", [("seconde", "SECONDE", "verte")],
     ["PRODUIT ET QUOTIENT", "DE PUISSANCES"], "2^3 × 2^4 = 2^7", "pas 4^7 !",
     "seconde", ["UNE CLÉ", "SECRÈTE"], "combien de clés avec 7 bits ?",
     [("2^3 × 2^4", 130, BLEU), ("= 2^7 = 128", 120, VERT)]),
    (9, "puissance-puissance", [("seconde", "SECONDE", "verte")],
     ["LA PUISSANCE", "D'UNE PUISSANCE"], "(2^3)^2 = 2^6", "pas 2^5 !",
     None, None, None, None),
    (10, "enchainer", [("seconde", "SECONDE", "orange")],
     ["ENCHAÎNER", "LES RÈGLES"], "7^4 × 7^−5 ÷ (7^3)^4", "= 7^−13",
     "seconde", ["LA", "CHECK-LIST"], "une expression géante, une seule puissance",
     [("(2^3)^2 × 2^4 ÷ 2^7", 90, BLEU), ("= 2^3 = 8", 120, VERT)]),
    (11, "defi", [("4e", "4E", "orange")],
     ["DÉFI", "PUISSANCES"], "2^6 = 64", "pas 2 × 6 = 12 !",
     "4e", ["1 000 € OU", "1 CENTIME ?"], "doublé 20 fois : tu choisis quoi ?",
     [("2^20 = 1 048 576", 100, BLEU), ("centimes !", 110, VERT)]),
    (12, "defi", [("3e", "3E", "orange")],
     ["DÉFI", "PUISSANCES"], "10^3 + 10^2 = 10^5 ?", "faux : 1 100",
     "3e", ["ÇA A L'AIR", "FAUX, NON ?"], "vérifie, tu vas être surpris",
     [("2^3 × 3^3", 130, BLEU), ("= 6^3", 130, VERT)]),
    (13, "cinq-regles", [("premiere", "1RE", "jaune"), ("stmg", "STMG", "jaune")],
     ["LES PUISSANCES", "EN 5 RÈGLES"], "a^m × a^n = a^m+n", "+ a^0 = 1 et a^−n = 1/a^n",
     "premiere", ["TU SIGNES", "OU PAS ?"], "la base change-t-elle ?",
     [("2^3 × 2^4 = 4^7 ?", 105, ROUGE), ("non : 2^7", 120, VERT)]),
]
DOSSIER = {1: "01-comprendre", 2: "02-calculer", 3: "03-dix", 4: "04-zero-negatif", 5: "05-notation-scientifique",
           6: "06-comparer", 7: "07-calcul", 8: "08-produit-quotient", 9: "09-puissance-puissance", 10: "10-enchainer",
           11: "11-defi", 12: "12-defi", 13: "13-cinq-regles"}


def minutes(mp4):
    d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                       "-of", "csv=p=0", str(mp4)]))
    return round(d / 60)


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for n, slug, classes, tit, haut, bas, cs, ts, sous, ls in EP:
        rep = DOSSIER[n]
        for classe, b, ceinture in classes:
            nom = f"eleveai-maths-{classe}-puissance-{slug}"
            if filtre not in nom:
                continue
            rel = f"{classe}/maths/puissances/{rep}"
            construire_paysage(nom, {
                "badge": f"MATHS · {b}", "duree": f"EN {minutes(SORTIES / rel / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": rel,
            })
        if cs:
            nom = f"eleveai-maths-{cs}-puissance-{slug}-short"
            if filtre not in nom:
                continue
            ft = police("ariblk.ttf", 96)
            for t in ts:
                if sonde.textlength(t, font=ft) > W - 80:
                    print("⛔ DÉBORDE", t)
            badge_cl = {"4e": "4E", "3e": "3E", "seconde": "SECONDE", "premiere": "1RE"}[cs]
            spec = {"badge": f"PUISSANCES · {badge_cl}", "titre": ts, "taille": 96, "sous": sous, "taille_sous": 44,
                    "couleur_sous": ORANGE, "accroche": acc_short(ls), "dossier": f"{cs}/maths/fr"}
            construire_short(nom, spec)
            shutil.copy(RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png",
                        SORTIES / cs / "maths" / "puissances" / rep / f"{nom}.png")


if __name__ == "__main__":
    main()
