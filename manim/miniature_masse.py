# miniature_masse.py
# LES MINIATURES des PAYSAGES de la série MASSES, du CP au CM2 (16/11/2026, session masses).
# « COMPARER X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures (celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé »).
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/<classe>/maths/masse/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_masse.py [filtre]   (ex. « ce2-masse-comparer », ou « ce2 »)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police  # noqa: E402
from miniature_angles import ajuste, minutes  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# classe, slug, dossier, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("ce2", "comparer", "03-comparer", ["COMPARER", "DES MASSES"], "1 kg = 1 000 g > 900 g",
     "même unité, puis on compare !", True, "jaune"),
    ("cp", "lexique", "01-lexique", ["LOURD", "OU LÉGER ?"], "On soupèse !",
     "gros ne veut pas dire lourd", False, "blanche"),
    ("cp", "comparer", "02-comparer", ["COMPARER", "DES MASSES"], "Le plateau qui descend",
     "porte le plus lourd !", True, "blanche"),
    ("cp", "estimer", "03-estimer", ["RANGER", "DES MASSES"], "Du plus léger au plus lourd",
     "on compare deux par deux !", True, "blanche"),
    ("cp", "defi", "04-defi", ["LE DÉFI", "DES MASSES"], "Deux pesées, trois colis",
     "la taille ne dit pas la masse !", True, "blanche"),
    ("ce1", "kg-g", "01-kg-g", ["LE KILOGRAMME", "ET LE GRAMME"], "kg pour le lourd, g pour le léger",
     "un colis : 3 kg, une lettre : 20 g", True, "blanche"),
    ("ce1", "relation", "02-relation", ["1 kg", "= 1 000 g"], "Deux sacs de 500 g",
     "font 1 kg !", True, "blanche"),
    ("ce1", "estimer", "03-estimer", ["ESTIMER", "UNE MASSE"], "1 g : un trombone",
     "1 kg : une brique de lait", True, "blanche"),
    ("ce1", "probleme", "04-probleme", ["PROBLÈMES", "DE MASSES"], "Plein 1 kg, vide 300 g",
     "les poissons : 700 g", True, "blanche"),
    ("ce1", "defi", "05-defi", ["LE DÉFI", "DES MASSES"], "5 quilles de 200 g",
     "= 1 000 g = 1 kg !", True, "jaune"),
    ("ce2", "unites", "01-unites", ["g, kg", "OU TONNE ?"], "Un conteneur : 20 t",
     "1 t = 1 000 kg", True, "jaune"),
    ("ce2", "relations", "02-relations", ["1 kg 200 g", "= ? g"], "1 kg = 1 000 g",
     "1 000 + 200 = 1 200 g", True, "jaune"),
    ("ce2", "choisir-unite", "04-choisir-unite", ["g, kg", "OU t ?"], "Un camion : 12 t",
     "un letchi : 20 g", True, "jaune"),
    ("ce2", "estimer", "05-estimer", ["3 g, 3 kg", "OU 30 kg ?"], "Un bébé ≈ 3 briques",
     "de lait : 3 kg", True, "jaune"),
    ("ce2", "probleme", "06-probleme", ["23 kg", "AU PLUS !"], "18 kg + 3 kg = 21 kg",
     "la valise passe !", True, "jaune"),
    ("ce2", "defi", "07-defi", ["COMBIEN PÈSE", "LE SAVON ?"], "500 g + 200 g + 200 g",
     "= 900 g", True, "orange"),
    ("cm1", "comparer", "01-comparer", ["2 kg 50 g", "OU 2 500 g ?"], "Tout en grammes :",
     "2 050 g < 2 500 g", True, "jaune"),
    ("cm1", "mesurer", "02-mesurer", ["LIRE", "UNE BALANCE"], "3 petits traits après 400",
     "= 460 g", True, "jaune"),
    ("cm1", "convertir", "03-convertir", ["2 kg", "= ? g"], "On multiplie par 1 000",
     "2 kg = 2 000 g", True, "verte"),
    ("cm1", "estimer", "04-estimer", ["3 g, 3 kg", "OU 3 t ?"], "1 g = un trombone",
     "un colibri : environ 3 g", True, "jaune"),
    ("cm1", "defi", "05-defi", ["1 t AU PLUS :", "COMBIEN DE SACS ?"], "1 t = 1 000 kg",
     "1 000 ÷ 25 = 40 sacs", True, "bleue"),
]


def accroche(haut, bas, vert, ceinture, y0=352):
    def f(d):
        th = ajuste(d, haut, 92, 900)
        tb = ajuste(d, bas, 58, 900)
        d.text((56, y0), haut, font=police("ariblk.ttf", th), fill=BLEU)
        d.text((60, y0 + th + 26), bas, font=police("ariblk.ttf", tb), fill=VERT if vert else ROUGE)
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for classe, slug, rep, tit, haut, bas, vert, ceint in EP:
        nom = f"eleveai-maths-{classe}-masse-{slug}"
        if filtre and filtre not in nom:
            continue
        rel = f"{classe}/maths/masse/{rep}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": f"MATHS · {classe.upper()}", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": accroche(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
