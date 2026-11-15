# 5e_miniatures_aire_volume.py
# LES MINIATURES des PAYSAGES de la série 5e « Aire, volume et conversions » (2e poste, 15/11/2026),
# copie de miniature_aire_cm2.py (style « cahier » : « TITRE » + pastille « EN N MIN », la maths en gros,
# l'échelle des ceintures avec celle de l'épisode).
# Les miniatures des shorts viennent du film Ti Margo (window.tiMargoMiniature, mention « Dessin animé ») :
#   node scripts/ti-margo-short.mjs <série> <épisode> miniature
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/5e/maths/<aire|volume|conversion>/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/5e_miniatures_aire_volume.py [filtre]   (« aire-defi », « volume-pave »…)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police  # noqa: E402
from miniature_angles import ajuste, minutes  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# nom (après « eleveai-maths-5e- »), dossier (sous 5e/maths/), titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("aire-comprendre", "aire/01-comprendre", ["COMPRENDRE", "L'AIRE"], "4 × 3 = 6 × 2 = 12 m²",
     "même aire, pas le même tour !", True, "jaune"),
    ("aire-triangle", "aire/02-triangle", ["L'AIRE", "DU TRIANGLE"], "8 × 5 ÷ 2 = 20 m²",
     "la moitié du rectangle !", True, "verte"),
    ("aire-parallelogramme", "aire/03-parallelogramme", ["L'AIRE DU", "PARALLÉLOGRAMME"], "6 × 4 = 24 cm²",
     "sans diviser par 2 !", True, "verte"),
    ("aire-composer", "aire/04-composer", ["L'AIRE D'UNE", "FIGURE COMPOSÉE"], "24 + 6 = 30 m²",
     "on découpe ou on enlève !", True, "verte"),
    ("aire-defi", "aire/05-defi", ["DÉFIS", "SUR LES AIRES"], "24 × 2 ÷ 8 = 6 dm",
     "on remonte la formule !", True, "bleue"),
    ("patron-prisme-cylindre", "volume/01-patron-prisme-cylindre", ["LE PATRON", "DU CYLINDRE"],
     "2 × π × r", "le rectangle fait le tour !", True, "verte"),
    ("volume-comprendre", "volume/02-volume-comprendre", ["COMPRENDRE", "LE VOLUME"], "24 cubes = 24 dm³",
     "on compte en cubes !", True, "jaune"),
    ("volume-pave", "volume/03-volume-pave", ["LE VOLUME", "DU PAVÉ DROIT"], "6 × 4 × 3 = 72 m³",
     "on multiplie, on n'additionne pas !", False, "verte"),
    ("volume-prisme", "volume/04-volume-prisme", ["LE VOLUME", "DU PRISME DROIT"], "1,5 × 3 = 4,5 m³",
     "aire de la base × hauteur", True, "verte"),
    ("volume-cylindre", "volume/05-volume-cylindre", ["LE VOLUME", "DU CYLINDRE"], "π × r × r × h",
     "le rayon, pas le diamètre !", False, "bleue"),
    ("volume-assemblage", "volume/06-volume-assemblage", ["LE VOLUME", "D'UN ASSEMBLAGE"], "40 + 30 = 70 cm³",
     "on additionne ou on creuse !", True, "bleue"),
    ("volume-unite", "volume/07-volume-unite", ["LES UNITÉS", "DE VOLUME"], "1 m³ = 1 000 L",
     "× 1 000, pas × 10 !", False, "verte"),
    ("volume-defi", "volume/08-volume-defi", ["DÉFIS", "SUR LES VOLUMES"], "6,28 m³ = 6 280 L",
     "on convertit à la fin !", True, "bleue"),
    ("conversion-decimal", "conversion/01-decimal", ["CONVERTIR", "AVEC UNE VIRGULE"], "0,5 g = 500 mg",
     "plus petit : on multiplie !", True, "jaune"),
    ("conversion-duree", "conversion/02-duree", ["CONVERTIR", "UNE DURÉE"], "135 min = 2 h 15 min",
     "1 h = 60 min, pas 100 !", False, "verte"),
    ("conversion-avant-calcul", "conversion/03-avant-calcul", ["CONVERTIR", "AVANT DE CALCULER"],
     "120 cm − 45 cm = 75 cm", "la même unité d'abord !", True, "verte"),
    ("conversion-coherence", "conversion/04-coherence", ["UN RÉSULTAT", "COHÉRENT ?"], "2,4 kg = 24 g ?",
     "impossible : on refait !", False, "bleue"),
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
    for slug, rep, tit, haut, bas, vert, ceint in EP:
        if filtre and filtre != slug:
            continue
        rel = f"5e/maths/{rep}"
        nom = f"eleveai-maths-5e-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · 5e", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": accroche(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
