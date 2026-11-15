# miniature_solides_cm2.py
# LES MINIATURES des PAYSAGES de la série SOLIDES CM2 (15/11/2026), sur le modèle du périmètre CE2.
# « COMPRENDRE X » + pastille « EN N MIN », la maths en gros, l'échelle des ceintures
# (01 jaune, 02 verte, 03 jaune, 04 verte, 05 verte, 06 bleue). Les miniatures des shorts viennent du film Ti Margo.
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/cm2/maths/solides/<NN-slug>/.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_solides_cm2.py [filtre]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature_angles import BLEU, ROUGE, VERT, ajuste, echelle, minutes, police
from miniature_essai_v2 import construire as construire_paysage

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

# slug, dossier, titre, haut, bas, le bas en vert ?, ceinture
EP = [
    ("reconnaitre", "01-reconnaitre", ["RECONNAÎTRE", "LES SOLIDES"], "ça roule ? une pointe ? 2 bases ?", "prisme, pyramide, cylindre, cône…", True, "jaune"),
    ("sommets-aretes-faces", "02-sommets-aretes-faces", ["SOMMETS, ARÊTES", "ET FACES"], "même ce qu'on ne voit pas", "une pyramide : combien de chaque ?", False, "verte"),
    ("faces", "03-faces", ["LES FACES", "D'UN SOLIDE"], "combien, et de quelles formes ?", "pavé, prisme, pyramide", True, "jaune"),
    ("patron", "04-patron", ["RECONNAÎTRE", "UN PATRON"], "compter les faces, vérifier les bords", "quel solide une fois plié ?", False, "verte"),
    ("patron-construire", "05-patron-construire", ["CONSTRUIRE UN", "PATRON DE CUBE"], "le cube a 11 patrons", "où placer la dernière face ?", True, "verte"),
    ("defi", "06-defi", ["UN DÉFI", "D'AQUARIUM"], "60 × 30 × 40 cm", "combien de joint pour les arêtes ?", False, "bleue"),
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
    for slug, rep, tit, haut, bas, vert, ceint in EP:
        if filtre and filtre != slug:
            continue
        rel = f"cm2/maths/solides/{rep}"
        nom = f"eleveai-maths-cm2-solides-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": "MATHS · CM2", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": acc(haut, bas, vert, ceint), "dossier": rel,
        })


if __name__ == "__main__":
    main()
