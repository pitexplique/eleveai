# miniature_volume_6e.py
# LES MINIATURES des PAYSAGES de la série VOLUME ET SOLIDES de la 6e (15/11/2026), sur le modèle des solides CM1.
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures
# (volume : 01 jaune, 02 verte, 03 jaune, 04 jaune, 05 bleue ; vision : 01 jaune, 02 verte, 03 verte, 04 bleue).
# ⛔ Jamais la réponse d'un défi sur la miniature. Les miniatures des shorts viennent du film Ti Margo.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/6e/maths/volume/<NN-slug>/ et .../vision-espace/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_volume_6e.py [filtre]   (filtre : slug « unite » ou id « 6e-vision-defi »)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import BLEU, ROUGE, VERT, ajuste, echelle, minutes, police
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
REP = {"volume": "volume", "vision": "vision-espace"}

# notion, slug, dossier, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("volume", "unite", "01-unite", ["L'UNITÉ", "DE VOLUME"], "1 cube de 1 cm = 1 cm³", "cm, cm², cm³ : ne plus confondre !", True, "jaune"),
    ("volume", "compter", "02-compter", ["COMPTER", "LES CUBES"], "une couche, puis les couches", "longueur × largeur × hauteur", True, "verte"),
    ("volume", "comparer", "03-comparer", ["COMPARER", "DES VOLUMES"], "on compte les cubes de chacun", "la plus haute est-elle la plus grande ?", False, "jaune"),
    ("volume", "assemblage", "04-assemblage", ["ASSEMBLER", "DES VOLUMES"], "coller = additionner", "aucun cube ne disparaît !", True, "jaune"),
    ("volume", "defi", "05-defi", ["UN DÉFI", "DE VOLUMES"], "ce qui manque ? combien de couches ?", "étape par étape !", True, "bleue"),
    ("vision", "vues", "01-vues", ["LES QUATRE", "VUES"], "de face, de dessus, de côté", "le dessus compte les colonnes !", False, "jaune"),
    ("vision", "representation", "02-representation", ["LA PERSPECTIVE", "CAVALIÈRE"], "face avant + traits en biais", "les arêtes cachées en pointillés", True, "verte"),
    ("vision", "patron-pave", "03-patron-pave", ["LE PATRON", "DU PAVÉ"], "6 faces, 3 paires", "quelles mesures pour chaque face ?", False, "verte"),
    ("vision", "defi", "04-defi", ["UN DÉFI", "DANS L'ESPACE"], "cubes cachés, cube peint", "sauras-tu voir ce qu'on ne voit pas ?", False, "bleue"),
]


def acc(haut, bas, vert, ceinture, y0=352):
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
    for k, slug, rep, tit, haut, bas, vert, ceint in EP:
        idt = f"6e-{k}-{slug}"
        if filtre and filtre not in (slug, idt):
            continue
        rel = f"6e/maths/{REP[k]}/{rep}"
        nom = f"eleveai-maths-{idt}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · 6e", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
