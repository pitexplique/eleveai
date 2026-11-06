# miniature_equations.py
# LES MINIATURES de la série ÉQUATIONS 4e (06/11/2026), 16 vidéos, 8 épisodes.
#   · paysage : « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures ;
#   · short : l'accroche en gros, 2 lignes de titre, échelle des ceintures blanche.
# Même machinerie que `miniature_puissances.py`. Rangées À CÔTÉ DE LEUR VIDÉO :
# manim/sorties/4e/maths/equations/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_equations.py [filtre]

import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, NAVY, ROUGE, VERT, police
from miniature_essai_v2 import construire as construire_paysage
from miniature_puissances import acc_paysage, ajuste, ecrire, largeur, minutes
from miniature_short import ORANGE, W, construire as construire_short
from miniature_short_expression import echelle

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "equations"

# dossier, ceinture paysage, titre paysage, maths du haut, ligne du bas (« + » = en vert),
# titre short, sous-titre short, lignes short
EP = [
    ("01-reconnaitre", "blanche",
     ["COMPRENDRE", "CE QU'EST UNE ÉQUATION"], "3x + 2 = 11", "+ un signe = et une lettre",
     ["ÉQUATION", "OU PAS ?"], "3 secondes à chaque fois",
     [("3x + 5", 130, ROUGE), ("x + 4 = 9", 130, VERT)]),
    ("02-traduire", "jaune",
     ["COMPRENDRE COMMENT", "TRADUIRE EN ÉQUATION"], "3x = 21", "pas x + 3 = 21 !",
     ["TRADUIS", "AVANT MOI !"], "une phrase devient une équation",
     [("le triple de x vaut 21", 76, NAVY), ("3x = 21", 130, VERT)]),
    ("03-resoudre-simple", "jaune",
     ["COMPRENDRE COMMENT", "RÉSOUDRE UNE ÉQUATION"], "5x = 8", "x = 1,6, pas 3 !",
     ["LE SAC", "MYSTÈRE"], "combien de billes dans le sac ?",
     [("x + 4 = 9", 130, BLEU), ("x = ?", 130, ROUGE)]),
    ("04-resoudre-reduction", "orange",
     ["COMPRENDRE COMMENT", "RÉDUIRE POUR RÉSOUDRE"], "2x + 3x = 15", "+ 5x = 15, donc x = 3",
     ["2 PAQUETS", "+ 3 PAQUETS"], "15 cartes : combien par paquet ?",
     [("2x + 3x = 15", 120, BLEU), ("5x = 15", 130, VERT)]),
    ("05-resoudre-distributivite", "verte",
     ["COMPRENDRE LES ÉQUATIONS", "AVEC PARENTHÈSES"], "2(x + 3) = 14", "+ x = 4, par deux routes",
     ["QUI TROUVE", "LE BON x ?"], "deux élèves, une même équation",
     [("2(x + 3) = 14", 115, BLEU), ("diviser ou développer ?", 76, ROUGE)]),
    ("06-verifier", "orange",
     ["COMPRENDRE COMMENT", "VÉRIFIER UNE SOLUTION"], "2 × 4 + 1 = 9", "+ x = 4 est bien solution",
     ["DÉTECTEUR", "DE MENSONGES"], "vrai ou faux ?",
     [("5x = 8", 130, BLEU), ("donc x = 3 ?", 115, ROUGE)]),
    ("07-defi", "verte",
     ["DÉFI : COMPRENDRE", "LES ÉQUATIONS"], "2x + 3 = 11", "x = 4 : juste, mais il a tort !",
     ["BONNE RÉPONSE", "ET IL A TORT"], "comment est-ce possible ?",
     [("x = 4", 130, VERT), ("2 + 3 + 4 = 9 ?", 105, ROUGE)]),
    ("08-probleme", "verte",
     ["COMPRENDRE UN PROBLÈME", "AVEC UNE ÉQUATION"], "4x + 6 = 58", "+ 13 arbres par rangée",
     ["JE DEVINE", "TON NOMBRE"], "ce n'est pas de la magie",
     [("3x + 2 = 17", 120, BLEU), ("x = 5", 130, VERT)]),
]


def acc_short(lignes):
    """Centrée sur la largeur du SHORT : le W de `miniature.py` est celui de la paysage (1280)."""
    def f(d):
        echelle(d, W // 2, 1190, "blanche", s=0.8)
        for i, (txt, t, c) in enumerate(lignes):
            t = ajuste(d, txt, t, W - 110)
            ecrire(d, (W - largeur(d, txt, t)) / 2, 700 + i * 205, txt, t, c)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for rep, ceinture, tit, haut, bas, ts, sous, ls in EP:
        slug = rep[3:]
        rel = f"4e/maths/equations/{rep}"
        nom = f"eleveai-maths-4e-equation-{slug}"
        if filtre in nom:
            construire_paysage(nom, {
                "badge": "MATHS · 4E", "duree": f"EN {minutes(SERIE / rep / (nom + '.mp4'))} MIN",
                "titre": tit, "accroche": acc_paysage(haut, bas, ceinture, 352), "dossier": rel,
            })
        nom += "-short"
        if filtre not in nom:
            continue
        ft = police("ariblk.ttf", 96)
        for t in ts:
            if sonde.textlength(t, font=ft) > W - 80:
                print("⛔ DÉBORDE", t)
        spec = {"badge": "ÉQUATIONS · 4E", "titre": ts, "taille": 96, "sous": sous, "taille_sous": 44,
                "couleur_sous": ORANGE, "accroche": acc_short(ls), "dossier": "4e/maths/fr"}
        construire_short(nom, spec)
        shutil.copy(RACINE / "manim" / "miniatures" / spec["dossier"] / f"{nom}.png", SERIE / rep / f"{nom}.png")


if __name__ == "__main__":
    main()
